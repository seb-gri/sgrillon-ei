/* Mémorise la langue choisie via le sélecteur FR / EN (localStorage, aucune transmission). */
(function () {
  var KEY = "sgrillon-lang";
  var links = document.querySelectorAll("[data-lang]");
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
      try { localStorage.setItem(KEY, this.getAttribute("data-lang")); } catch (e) { /* stockage indisponible */ }
    });
  }
})();
