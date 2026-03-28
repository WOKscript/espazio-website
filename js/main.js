/* ============================================
   ESPAZIO — Arts + Food + History
   Main JavaScript
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  initPageLoader();
  initNavbar();
  initMobileNav();
  initMenuTabs();
  initHoursHighlight();
  initScrollReveal();
});

/* ---------- PAGE LOADER ---------- */
function initPageLoader() {
  const loader = document.getElementById("pageLoader");
  if (!loader) return;

  window.setTimeout(() => {
    loader.classList.add("is-hidden");
    document.body.classList.remove("is-loading");
  }, 3000);
}

/* ---------- NAVBAR SCROLL ---------- */
function initNavbar() {
  const nav = document.getElementById("navbar");
  if (!nav) return;

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 80);
  });
}

/* ---------- MOBILE NAVIGATION ---------- */
function initMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const spans = hamburger.querySelectorAll("span");
    const isOpen = navLinks.classList.contains("open");

    spans[0].style.transform = isOpen
      ? "rotate(45deg) translate(5px, 5px)"
      : "";
    spans[1].style.opacity = isOpen ? "0" : "1";
    spans[2].style.transform = isOpen
      ? "rotate(-45deg) translate(5px, -5px)"
      : "";
  });

  // Close on link click
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      const spans = hamburger.querySelectorAll("span");
      spans.forEach((s) => {
        s.style.transform = "";
        s.style.opacity = "1";
      });
    });
  });
}

/* ---------- MENU TABS ---------- */
function initMenuTabs() {
  const tabs = document.querySelectorAll(".menu-tab");
  const panels = document.querySelectorAll(".menu-panel");
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Deactivate all
      tabs.forEach((t) => t.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));

      // Activate selected
      tab.classList.add("active");
      const panel = document.getElementById("panel-" + tab.dataset.tab);
      if (panel) panel.classList.add("active");
    });
  });
}

/* ---------- HOURS HIGHLIGHT ---------- */
function initHoursHighlight() {
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  const rows = document.querySelectorAll(".hours-row");

  rows.forEach((row) => {
    row.classList.remove("today", "before-today");

    if (parseInt(row.dataset.day, 10) === today) {
      row.classList.add("today");

      const previousRow = row.previousElementSibling;
      if (previousRow && previousRow.classList.contains("hours-row")) {
        previousRow.classList.add("before-today");
      }
    }
  });
}

/* ---------- SCROLL REVEAL ---------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("visible"), i * 100);
        }
      });
    },
    { threshold: 0.1 }
  );

  reveals.forEach((el) => observer.observe(el));
}
