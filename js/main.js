(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var hero = document.querySelector("[data-hero]");
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  function updateHeader() {
    if (!header || !hero) return;
    var threshold = Math.max(hero.getBoundingClientRect().bottom - header.offsetHeight, 0);
    // when hero bottom is still below the nav, we are over the hero
    if (hero.getBoundingClientRect().bottom > header.offsetHeight + 8) {
      header.classList.add("is-over-hero");
    } else {
      header.classList.remove("is-over-hero");
    }
  }

  if (hero && header) {
    header.classList.add("is-over-hero");
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);
  }

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("nav-open", open);
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      });
    });
  }

  // Lightbox for gallery
  var lb = document.querySelector(".lb");
  if (lb) {
    var lbImg = lb.querySelector("img");
    var items = Array.prototype.slice.call(document.querySelectorAll("[data-gallery]"));
    var index = 0;

    function show(i) {
      if (!items.length) return;
      index = (i + items.length) % items.length;
      var a = items[index];
      var src = a.getAttribute("data-full") || a.getAttribute("href");
      var alt = a.getAttribute("data-alt") || a.querySelector("img")?.alt || "";
      lbImg.src = src;
      lbImg.alt = alt;
      lb.classList.add("is-open");
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function hide() {
      lb.classList.remove("is-open");
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    items.forEach(function (a, i) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        show(i);
      });
    });
    lb.querySelector(".lb-close").addEventListener("click", hide);
    lb.querySelector(".lb-prev").addEventListener("click", function () { show(index - 1); });
    lb.querySelector(".lb-next").addEventListener("click", function () { show(index + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) hide(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") hide();
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    });
  }
  // O nás accordion (proposal)
  var accRoot = document.querySelector(".about-accordion");
  if (accRoot) {
    accRoot.querySelectorAll("[data-acc]").forEach(function (item) {
      var btn = item.querySelector(".about-acc-btn");
      if (!btn) return;
      btn.addEventListener("click", function () {
        var open = item.classList.contains("is-open");
        accRoot.querySelectorAll("[data-acc].is-open").forEach(function (other) {
          if (other === item) return;
          other.classList.remove("is-open");
          var b = other.querySelector(".about-acc-btn");
          if (b) b.setAttribute("aria-expanded", "false");
        });
        item.classList.toggle("is-open", !open);
        btn.setAttribute("aria-expanded", open ? "false" : "true");
      });
    });
  }

})();
