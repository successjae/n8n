/* ==========================================================================
   Peace Beloved Clothing — theme.js
   Minimal, dependency-free progressive enhancement.
   ========================================================================== */
(function () {
  'use strict';

  var doc = document;

  /* --------------------------------------------------------------------------
     Mobile navigation
  -------------------------------------------------------------------------- */
  function initMobileNav() {
    var toggle = doc.querySelector('[data-mobile-nav-toggle]');
    var drawer = doc.querySelector('[data-mobile-nav]');
    if (!toggle || !drawer) return;

    var closeEls = drawer.querySelectorAll('[data-mobile-nav-close]');
    var lastFocused = null;

    function open() {
      lastFocused = doc.activeElement;
      drawer.setAttribute('data-open', 'true');
      toggle.setAttribute('aria-expanded', 'true');
      doc.body.classList.add('pb-no-scroll');
      var firstLink = drawer.querySelector('a, button');
      if (firstLink) firstLink.focus();
      doc.addEventListener('keydown', onKeydown);
    }

    function close() {
      drawer.setAttribute('data-open', 'false');
      toggle.setAttribute('aria-expanded', 'false');
      doc.body.classList.remove('pb-no-scroll');
      doc.removeEventListener('keydown', onKeydown);
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    function onKeydown(e) {
      if (e.key === 'Escape') close();
    }

    toggle.addEventListener('click', function () {
      if (drawer.getAttribute('data-open') === 'true') close();
      else open();
    });

    closeEls.forEach(function (el) {
      el.addEventListener('click', close);
    });
  }

  /* --------------------------------------------------------------------------
     Header scroll state (adds .pb-header--scrolled)
  -------------------------------------------------------------------------- */
  function initHeaderScroll() {
    var header = doc.querySelector('[data-header]');
    if (!header) return;
    var threshold = 24;
    var ticking = false;

    function update() {
      if (window.scrollY > threshold) header.classList.add('pb-header--scrolled');
      else header.classList.remove('pb-header--scrolled');
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  /* --------------------------------------------------------------------------
     Scroll reveal
  -------------------------------------------------------------------------- */
  function initReveal() {
    var els = doc.querySelectorAll('.pb-reveal');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    els.forEach(function (el) { observer.observe(el); });
  }

  /* --------------------------------------------------------------------------
     Cart count refresh (keeps header badge in sync after quick add)
  -------------------------------------------------------------------------- */
  function refreshCartCount() {
    fetch(window.Shopify && window.Shopify.routes ? window.Shopify.routes.root + 'cart.js' : '/cart.js', {
      headers: { Accept: 'application/json' }
    })
      .then(function (r) { return r.json(); })
      .then(function (cart) {
        doc.querySelectorAll('[data-cart-count]').forEach(function (el) {
          el.textContent = cart.item_count;
          el.hidden = cart.item_count === 0;
        });
      })
      .catch(function () { /* silent — native cart still works */ });
  }

  /* --------------------------------------------------------------------------
     Quick add (optional enhancement) — submits the product form via AJAX.
     Falls back to a normal form POST if fetch/JSON is unavailable.
  -------------------------------------------------------------------------- */
  function initQuickAdd() {
    doc.querySelectorAll('[data-quick-add-form]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        if (!window.fetch) return; // native submit fallback
        e.preventDefault();
        var button = form.querySelector('[type="submit"]');
        var original = button ? button.textContent : '';
        if (button) { button.setAttribute('aria-disabled', 'true'); button.textContent = 'Adding…'; }

        var url = (window.Shopify && window.Shopify.routes ? window.Shopify.routes.root : '/') + 'cart/add.js';
        fetch(url, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(form)
        })
          .then(function (r) { return r.json().then(function (data) { return { ok: r.ok, data: data }; }); })
          .then(function (res) {
            if (button) { button.removeAttribute('aria-disabled'); }
            if (res.ok) {
              if (button) { button.textContent = 'Added ✓'; }
              refreshCartCount();
              setTimeout(function () { if (button) button.textContent = original; }, 1600);
            } else {
              if (button) button.textContent = 'Choose options';
              window.location.href = form.getAttribute('data-product-url') || '/cart';
            }
          })
          .catch(function () {
            if (button) { button.removeAttribute('aria-disabled'); button.textContent = original; }
            form.submit();
          });
      });
    });
  }

  /* --------------------------------------------------------------------------
     Product gallery (thumbnail → main image swap)
  -------------------------------------------------------------------------- */
  function initProductGallery() {
    var gallery = doc.querySelector('[data-product-gallery]');
    if (!gallery) return;
    var main = gallery.querySelector('[data-gallery-main]');
    var thumbs = gallery.querySelectorAll('[data-gallery-thumb]');
    if (!main || !thumbs.length) return;

    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        var full = thumb.getAttribute('data-full');
        var alt = thumb.getAttribute('data-alt') || '';
        if (full) {
          main.src = full;
          main.alt = alt;
        }
        thumbs.forEach(function (t) { t.setAttribute('aria-current', 'false'); });
        thumb.setAttribute('aria-current', 'true');
      });
    });
  }

  /* --------------------------------------------------------------------------
     Quantity stepper
  -------------------------------------------------------------------------- */
  function initQuantity() {
    doc.querySelectorAll('[data-qty]').forEach(function (wrap) {
      var input = wrap.querySelector('input');
      if (!input) return;
      wrap.querySelectorAll('[data-qty-btn]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var step = btn.getAttribute('data-qty-btn') === 'up' ? 1 : -1;
          var min = parseInt(input.min, 10) || 1;
          var value = (parseInt(input.value, 10) || min) + step;
          input.value = Math.max(min, value);
          input.dispatchEvent(new Event('change', { bubbles: true }));
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     Boot
  -------------------------------------------------------------------------- */
  function init() {
    initMobileNav();
    initHeaderScroll();
    initReveal();
    initQuickAdd();
    initProductGallery();
    initQuantity();
  }

  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-init when the Shopify theme editor injects/updates sections.
  doc.addEventListener('shopify:section:load', function () {
    initMobileNav();
    initHeaderScroll();
    initReveal();
    initQuickAdd();
    initProductGallery();
    initQuantity();
  });
})();
