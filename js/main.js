/* Harbour Health Partners — small bits of navigation behaviour.
   The site works without JavaScript; this only improves the menus. */
(function () {
  "use strict";

  // Mobile menu
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Services dropdown
  var subToggles = document.querySelectorAll(".submenu-toggle");

  function closeAllSubmenus(except) {
    subToggles.forEach(function (btn) {
      if (btn !== except) btn.setAttribute("aria-expanded", "false");
    });
  }

  subToggles.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      closeAllSubmenus(btn);
      btn.setAttribute("aria-expanded", open ? "false" : "true");
    });
  });

  // Close on outside click or Escape
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".has-submenu")) closeAllSubmenus();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    closeAllSubmenus();
    if (nav && nav.classList.contains("open")) {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }
  });
})();
