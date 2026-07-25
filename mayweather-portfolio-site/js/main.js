(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------------------------------------------------------
     Nav: fade in once the hero has been scrolled past
     --------------------------------------------------------- */
  const nav = document.getElementById("siteNav");
  const hero = document.getElementById("hero");

  if (nav && hero) {
    const navObserver = new IntersectionObserver(
      ([entry]) => {
        nav.classList.toggle("is-visible", !entry.isIntersecting);
      },
      { rootMargin: "-70% 0px 0px 0px" }
    );
    navObserver.observe(hero);
  }

  /* ---------------------------------------------------------
     Fade-and-rise: reveal [data-fade] elements as they enter
     --------------------------------------------------------- */
  const fadeTargets = document.querySelectorAll("[data-fade]");

  if (prefersReducedMotion) {
    fadeTargets.forEach((el) => el.classList.add("in-view"));
  } else if ("IntersectionObserver" in window) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    fadeTargets.forEach((el) => fadeObserver.observe(el));
  } else {
    fadeTargets.forEach((el) => el.classList.add("in-view"));
  }

  /* ---------------------------------------------------------
     Hero parallax: slow drift of the hero image on scroll
     --------------------------------------------------------- */
  const parallaxEl = document.querySelector("[data-parallax] img");

  if (parallaxEl && !prefersReducedMotion) {
    let ticking = false;

    const updateParallax = () => {
      const offset = window.scrollY * 0.25;
      parallaxEl.style.transform = `translate3d(0, ${offset}px, 0)`;
      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updateParallax);
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  /* ---------------------------------------------------------
     Horizontal-scroll sections: translate vertical wheel
     input into horizontal movement while hovering the track.
     The tracks remain natively scrollable (touch, trackpad,
     keyboard) without this enhancement.
     --------------------------------------------------------- */
  if (!prefersReducedMotion) {
    document
      .querySelectorAll(".career__track, .locations__track")
      .forEach((track) => {
        track.addEventListener(
          "wheel",
          (event) => {
            const atHorizontalEdgeStart = track.scrollLeft <= 0;
            const atHorizontalEdgeEnd =
              track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
            const scrollingDown = event.deltaY > 0;

            // Let the page scroll normally once the track has been
            // fully traversed in the scroll direction.
            if (
              (scrollingDown && atHorizontalEdgeEnd) ||
              (!scrollingDown && atHorizontalEdgeStart)
            ) {
              return;
            }

            if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
              event.preventDefault();
              track.scrollLeft += event.deltaY;
            }
          },
          { passive: false }
        );
      });
  }
})();
