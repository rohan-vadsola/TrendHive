(function () {
  "use strict";

  /*--------------------------------------------------------------
  # Header scroll toggle
  --------------------------------------------------------------*/
  function toggleScrolled() {
    const body = document.querySelector("body");
    const header = document.querySelector("#header");

    if (
      !header.classList.contains("scroll-up-sticky") &&
      !header.classList.contains("sticky-top") &&
      !header.classList.contains("fixed-top")
    )
      return;

    window.scrollY > 100
      ? body.classList.add("scrolled")
      : body.classList.remove("scrolled");
  }
  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /*--------------------------------------------------------------
  # Mobile navigation
  --------------------------------------------------------------*/
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToggle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToggle);
  }

  // Close mobile nav on menu link click
  document.querySelectorAll("#navmenu a").forEach((navLink) => {
    navLink.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToggle();
      }
    });
  });

  /*--------------------------------------------------------------
  # Preloader
  --------------------------------------------------------------*/
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /*--------------------------------------------------------------
  # Scroll to top button
  --------------------------------------------------------------*/
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /*--------------------------------------------------------------
  # Animate on Scroll (AOS)
  --------------------------------------------------------------*/
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /*--------------------------------------------------------------
  # Product detail features
  --------------------------------------------------------------*/
  function productDetailFeatures() {
    // Thumbnail click
    function initThumbnailClick() {
      const thumbnails = document.querySelectorAll(".pdpage-thumbnail-item");
      const mainImage = document.getElementById("pdpage-main-image");

      if (!thumbnails.length || !mainImage) return;

      thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener("click", function () {
          const imageSrc = this.getAttribute("data-image");

          mainImage.src = imageSrc;
          mainImage.setAttribute("data-zoom", imageSrc);

          thumbnails.forEach((item) => item.classList.remove("active"));
          this.classList.add("active");
        });
      });
    }

    // Prev/Next navigation
    function initImageNavigation() {
      const prevButton = document.querySelector(".pdpage-prev-btn");
      const nextButton = document.querySelector(".pdpage-next-btn");

      if (!prevButton || !nextButton) return;

      const thumbnails = Array.from(
        document.querySelectorAll(".pdpage-thumbnail-item")
      );
      if (!thumbnails.length) return;

      function navigateImage(direction) {
        const activeIndex = thumbnails.findIndex((thumb) =>
          thumb.classList.contains("active")
        );
        if (activeIndex === -1) return;

        let newIndex =
          direction === "prev"
            ? activeIndex === 0
              ? thumbnails.length - 1
              : activeIndex - 1
            : activeIndex === thumbnails.length - 1
            ? 0
            : activeIndex + 1;

        thumbnails[newIndex].click();
      }

      prevButton.addEventListener("click", () => navigateImage("prev"));
      nextButton.addEventListener("click", () => navigateImage("next"));
    }

    // Keyboard navigation
    function addKeyboardNavigation() {
      document.addEventListener("keydown", function (e) {
        if (!document.querySelector(".pdpage-gallery-container")) return;

        if (e.key === "ArrowLeft") {
          const prevBtn = document.querySelector(".pdpage-prev-btn");
          if (prevBtn) prevBtn.click();
        } else if (e.key === "ArrowRight") {
          const nextBtn = document.querySelector(".pdpage-next-btn");
          if (nextBtn) nextBtn.click();
        }
      });
    }

    initThumbnailClick();
    initImageNavigation();
    addKeyboardNavigation();
  }
  productDetailFeatures();

  /*--------------------------------------------------------------
  # Pure Counter
  --------------------------------------------------------------*/
  if (document.querySelector(".purecounter")) {
    new PureCounter();
  }

  /*--------------------------------------------------------------
  # FAQ Toggle
  --------------------------------------------------------------*/
  document
    .querySelectorAll(
      ".faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header"
    )
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active");
      });
    });

  /*--------------------------------------------------------------
  # Product Filtering
  --------------------------------------------------------------*/
  document.addEventListener("DOMContentLoaded", () => {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const products = document.querySelectorAll(".products-container .col-xl-3");

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        products.forEach((product) => {
          const category = product.getAttribute("data-category");
          product.style.display =
            filter === "all" || category === filter ? "block" : "none";
        });
      });
    });
  });
})();
