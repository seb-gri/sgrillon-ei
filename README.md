# sgrillon.fr — site vitrine

Site vitrine de l'entreprise individuelle de Sébastien Grillon : formation, conseil et outils numériques en analyse de données appliquée au sport.

Site statique bilingue (français par défaut, anglais), sans framework ni bundler, hébergé sur GitHub Pages avec le domaine personnalisé `sgrillon.fr`.

## Arborescence

```
.
├── index.html            Redirection racine vers /fr/ (ou /en/ si mémorisé)
├── 404.html              Page d'erreur
├── CNAME                 Domaine personnalisé GitHub Pages (sgrillon.fr)
├── robots.txt
├── sitemap.xml           14 URL avec alternates hreflang
├── .nojekyll             Désactive le traitement Jekyll côté GitHub
├── assets/
│   ├── style.css         Feuille de style unique
│   ├── site.js           Mémorisation de la langue (localStorage)
│   └── favicon.svg
├── fr/                   Version française
│   ├── index.html        Accueil
│   ├── formation.html
│   ├── conseil.html
│   ├── projets.html
│   ├── a-propos.html
│   ├── contact.html
│   └── mentions-legales.html
└── en/                   Version anglaise
    ├── index.html        Home
    ├── training.html
    ├── consulting.html
    ├── projects.html
    ├── about.html
    ├── contact.html
    └── legal.html
```

Correspondance des pages FR / EN :

| Français | Anglais |
|---|---|
| `fr/index.html` | `en/index.html` |
| `fr/formation.html` | `en/training.html` |
| `fr/conseil.html` | `en/consulting.html` |
| `fr/projets.html` | `en/projects.html` |
| `fr/a-propos.html` | `en/about.html` |
| `fr/contact.html` | `en/contact.html` |
| `fr/mentions-legales.html` | `en/legal.html` |

## Principes

- HTML, CSS et JavaScript sans dépendance. Aucune étape de build : ce qui est dans le dépôt est ce qui est servi.
- Polices système, pas de tracking, pas de cookies. La seule donnée stockée côté navigateur est la langue choisie (`localStorage`, clé `sgrillon-lang`).
- Chaque page déclare `lang`, un `canonical` et des balises `hreflang` vers son équivalent dans l'autre langue.
- Les chemins sont absolus (`/fr/...`, `/assets/...`), ce qui suppose que le site est servi à la racine d'un domaine.

## Prévisualiser en local

Les chemins absolus ne fonctionnent pas en ouvrant les fichiers directement. Lancez un serveur local à la racine du dépôt :

```sh
python3 -m http.server 8000
```

Puis ouvrez <http://localhost:8000/>.

## Mettre à jour le contenu

1. Modifiez la page française dans `fr/` et son équivalent anglais dans `en/`.
2. Conservez l'en-tête et le pied de page identiques entre les pages (copiez-collez depuis une page existante si besoin).
3. Si vous ajoutez ou renommez une page :
   - créez-la dans les deux langues ;
   - mettez à jour les balises `<link rel="alternate" hreflang="...">` et `<link rel="canonical">` dans son `<head>` ;
   - mettez à jour les deux liens du sélecteur de langue (`nav.lang-switch`, présent dans l'en-tête et le pied de page) ;
   - ajoutez-la au menu de navigation des 14 pages si elle doit y figurer ;
   - ajoutez ses deux URL dans `sitemap.xml`.
4. Les éléments restant à compléter sont balisés `<mark class="todo">` et apparaissent sur fond jaune. Pour les lister :

   ```sh
   grep -rn 'class="todo"' fr en
   ```

5. Commitez sur `main` et poussez : GitHub Pages redéploie en une à deux minutes.

## Ajouter une traduction

Exemple pour l'espagnol (`es`) :

1. Copiez `en/` en `es/` et traduisez chaque page. Conservez les mêmes noms de fichiers que l'anglais ou choisissez des noms localisés, mais restez cohérent.
2. Dans chaque page du site (les trois langues), ajoutez `<link rel="alternate" hreflang="es" href="https://sgrillon.fr/es/...">` dans le `<head>` et un troisième lien dans les deux `nav.lang-switch` (en-tête et pied de page) avec `data-lang="es"`, `hreflang="es"`, `lang="es"`, un `aria-label` dans la langue cible et un drapeau SVG inline.
3. Dans `index.html` (racine), acceptez la nouvelle valeur dans la redirection (`localStorage.getItem("sgrillon-lang") === "es"`).
4. Ajoutez les URL dans `sitemap.xml` avec leurs alternates.
5. Adaptez `404.html` si vous le souhaitez.

## Déploiement sur GitHub Pages

### 1. Pousser le dépôt

```sh
git push -u origin main
```

Le dépôt doit être public.

### 2. Activer GitHub Pages

Sur GitHub : **Settings → Pages**.

- **Source** : *Deploy from a branch*.
- **Branch** : `main`, dossier `/ (root)`. Enregistrez.

Le site est disponible quelques minutes plus tard sur `https://seb-gri.github.io/sgrillon-ei/` (adresse temporaire, les chemins absolus ne fonctionneront correctement qu'avec le domaine personnalisé).

### 3. Enregistrements DNS chez OVH

Dans l'espace client OVH, **Noms de domaine → sgrillon.fr → Zone DNS**. Supprimez d'abord les enregistrements `A` et `AAAA` existants sur la racine (`@`) et tout enregistrement `A` ou `CNAME` existant sur `www` (OVH en crée par défaut vers ses pages de parking). Puis créez :

| Sous-domaine | Type | Cible | TTL |
|---|---|---|---|
| (vide, racine) | A | `185.199.108.153` | 3600 |
| (vide, racine) | A | `185.199.109.153` | 3600 |
| (vide, racine) | A | `185.199.110.153` | 3600 |
| (vide, racine) | A | `185.199.111.153` | 3600 |
| `www` | CNAME | `seb-gri.github.io.` | 3600 |

Facultatif, pour l'IPv6 :

| Sous-domaine | Type | Cible |
|---|---|---|
| (vide, racine) | AAAA | `2606:50c0:8000::153` |
| (vide, racine) | AAAA | `2606:50c0:8001::153` |
| (vide, racine) | AAAA | `2606:50c0:8002::153` |
| (vide, racine) | AAAA | `2606:50c0:8003::153` |

Ne touchez pas aux enregistrements `MX`, `SPF`/`TXT` et `DKIM` liés à la messagerie OVH.

Propagation : généralement moins d'une heure, jusqu'à 24 h au maximum. Vérification :

```sh
dig +short sgrillon.fr A
dig +short www.sgrillon.fr CNAME
```

### 4. Brancher le domaine et forcer le HTTPS

Toujours dans **Settings → Pages**, section **Custom domain** :

1. Saisissez `sgrillon.fr` et enregistrez. Le fichier `CNAME` du dépôt contient déjà cette valeur ; GitHub le réécrit à l'identique.
2. Attendez que la vérification DNS passe au vert (*DNS check successful*). GitHub demande ensuite un certificat Let's Encrypt, ce qui prend de quelques minutes à une heure.
3. Cochez **Enforce HTTPS** dès que la case devient active.

`www.sgrillon.fr` est alors redirigé automatiquement vers `https://sgrillon.fr`.

Recommandé : dans les paramètres du compte GitHub (**Settings → Pages → Add a domain**), vérifiez le domaine `sgrillon.fr` via l'enregistrement `TXT` proposé. Cela empêche qu'un autre compte GitHub revendique le domaine.

### Mettre à jour le site

Chaque push sur `main` redéploie le site. Aucun pipeline à configurer.
