/* Utshab Kumar Ghosh — portfolio scripts.
   Everything is plain vanilla JS; each feature checks for its elements
   first, so this single file safely serves every page. */
(function () {
  "use strict";

  /* ---------- theme toggle (initial theme is set inline in <head>) ---------- */
  var themeBtn = document.querySelector(".theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var root = document.documentElement;
      var next = root.dataset.theme === "light" ? "dark" : "light";
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* private mode: theme just won't persist */
      }
    });
  }

  /* ---------- mobile nav ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
  }

  /* ---------- scroll progress + back-to-top ---------- */
  var progress = document.querySelector(".scroll-progress");
  var toTop = document.querySelector(".back-to-top");
  if (progress || toTop) {
    var onScroll = function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var y = window.scrollY || doc.scrollTop;
      if (progress) progress.style.width = max > 0 ? (y / max) * 100 + "%" : "0";
      if (toTop) toTop.classList.toggle("show", y > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- highlight the nav link of the section in view ---------- */
  var sections = document.querySelectorAll("main section[id]");
  var menuLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (sections.length && menuLinks.length && "IntersectionObserver" in window) {
    var byId = {};
    menuLinks.forEach(function (a) {
      byId[a.getAttribute("href").slice(1)] = a;
    });
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = byId[entry.target.id];
          if (link && entry.isIntersecting) {
            menuLinks.forEach(function (a) {
              a.classList.remove("active");
            });
            link.classList.add("active");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(function (s) {
      spy.observe(s);
    });
  }

  /* ---------- reveal-on-scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    var revealer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      revealer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* ---------- filter bars (projects on index, certificates on gallery) ---------- */
  document.querySelectorAll("[data-filter-bar]").forEach(function (bar) {
    var targets = document.querySelectorAll(bar.dataset.filterBar);
    bar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      bar.querySelectorAll(".filter-btn").forEach(function (b) {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      var want = btn.dataset.filter;
      targets.forEach(function (item) {
        var tags = (item.dataset.tags || "").split(" ");
        item.hidden = want !== "all" && tags.indexOf(want) === -1;
      });
    });
  });

  /* ---------- gallery lightbox (native <dialog>) ---------- */
  var lightbox = document.getElementById("lightbox");
  if (lightbox && typeof lightbox.showModal === "function") {
    var lbImg = lightbox.querySelector("img");
    var lbCaption = lightbox.querySelector(".lightbox-bar p");
    var lbOpener = null;
    document.querySelectorAll(".gallery-item button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var img = btn.querySelector("img");
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lbCaption.textContent = btn.closest(".gallery-item").dataset.title || img.alt;
        lbOpener = btn;
        lightbox.showModal();
      });
    });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) lightbox.close(); // click on backdrop
    });
    lightbox.querySelector(".lightbox-close").addEventListener("click", function () {
      lightbox.close();
    });
    lightbox.addEventListener("close", function () {
      if (lbOpener) lbOpener.focus(); // hand keyboard focus back to the opening thumbnail
    });
  } else if (lightbox) {
    // very old browser without <dialog>: open the image directly instead
    document.querySelectorAll(".gallery-item button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        window.open(btn.querySelector("img").src, "_blank", "noopener");
      });
    });
  }

  /* ---------- footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- GitHub contribution calendar (index only) ---------- */
  var ghCalendar = document.querySelector(".gh-calendar");
  if (ghCalendar && typeof GitHubCalendar !== "undefined") {
    GitHubCalendar(ghCalendar, "utshabkg", { responsive: true, tooltips: true })
      .catch(function () {
        ghCalendar.innerHTML =
          '<p class="gh-fallback">Contribution graph is unavailable right now — ' +
          'see it live on <a href="https://github.com/utshabkg" target="_blank" rel="noopener">GitHub</a>.</p>';
      });
  }
})();
