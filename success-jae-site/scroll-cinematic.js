/* ============================================================
   SUCCESS JAE — scroll engine
   Canvas frame-sequence scrub sections + scroll reveals + counters.
   Driven from the Lenis rAF loop so it's robust to any scroll source.
   ============================================================ */
function initScrub(cfg) {
  const section = document.querySelector(cfg.section);
  const canvas  = section.querySelector("canvas");
  const ctx     = canvas.getContext("2d", { alpha: false });
  const lines   = [...section.querySelectorAll(".reveal-line")];
  const fill    = section.querySelector(".progress-fill");
  const bgFill  = cfg.bg || "#0a0807";
  const images  = [];
  let firstDrawn = false;

  // Preload every frame; paint frame 0 as soon as it lands.
  for (let i = 0; i < cfg.frameCount; i++) {
    const img = new Image();
    img.src = cfg.framePath(i + 1);
    img.onload = () => { if (!firstDrawn) { firstDrawn = true; draw(0); } };
    images[i] = img;
  }

  let current = -1;

  function draw(index) {
    const img = images[index];
    if (!img || !img.complete || !img.naturalWidth) return;
    const cw = canvas.clientWidth, ch = canvas.clientHeight;
    const ir = img.naturalWidth / img.naturalHeight, cr = cw / ch;
    let dw, dh, dx, dy;
    if (ir > cr) { dh = ch; dw = ch * ir; dx = (cw - dw) / 2; dy = 0; }
    else         { dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2; }
    ctx.fillStyle = bgFill; ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = canvas.clientWidth  * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw(current < 0 ? 0 : current);
  }

  function update() {
    const rect = section.getBoundingClientRect();
    if (rect.bottom < -window.innerHeight || rect.top > window.innerHeight) return;
    const scrollable = rect.height - window.innerHeight;
    const p = Math.min(Math.max(-rect.top / scrollable, 0), 1);

    const idx = Math.min(cfg.frameCount - 1, Math.floor(p * (cfg.frameCount - 1)));
    if (idx !== current) { current = idx; draw(idx); }

    if (fill) fill.style.width = (p * 100).toFixed(2) + "%";

    for (const el of lines) {
      const a = parseFloat(el.dataset.in), b = parseFloat(el.dataset.out);
      const mid = (a + b) / 2, half = (b - a) / 2;
      let o = 1 - Math.abs(p - mid) / half;
      o = Math.max(0, Math.min(1, o));
      el.style.opacity = o.toFixed(3);
      el.style.transform = `translate(-50%, calc(-50% + ${(1 - o) * 34}px))`;
    }
  }

  window.addEventListener("resize", resize);
  resize();
  return { update, resize };
}

function animateCount(el) {
  const target = parseFloat(el.dataset.count), suffix = el.dataset.suffix || "";
  const dur = 1600, t0 = performance.now();
  function step(t) {
    const k = Math.min((t - t0) / dur, 1), eased = 1 - Math.pow(1 - k, 3);
    el.textContent = (target % 1 === 0 ? Math.round(target * eased) : (target * eased).toFixed(1)) + suffix;
    if (k < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

document.addEventListener("DOMContentLoaded", () => {
  const scrubs = (window.SCRUB_SECTIONS || [])
    .filter((c) => document.querySelector(c.section))
    .map(initScrub);

  const hasLenis = typeof Lenis !== "undefined";
  const lenis = hasLenis ? new Lenis({ lerp: 0.085, smoothWheel: true }) : null;
  window.__lenis = lenis;

  function raf(t) {
    if (lenis) lenis.raf(t);
    scrubs.forEach((s) => s.update());
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Scroll reveals + stat counters.
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      if (e.target.classList.contains("stat-num")) animateCount(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: 0.25 });
  document.querySelectorAll(".reveal, .stat-num").forEach((el) => io.observe(el));

  // Fade the hero scroll hint once we move.
  const fadeHint = (y) => document.querySelectorAll(".scroll-hint")
    .forEach((h) => (h.style.opacity = y > 60 ? "0" : "1"));
  if (lenis) lenis.on("scroll", ({ scroll }) => fadeHint(scroll));
  else window.addEventListener("scroll", () => fadeHint(window.scrollY));

  // Smooth-scroll for in-page anchors via Lenis when available.
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (ev) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      ev.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -70 });
      else target.scrollIntoView({ behavior: "smooth" });
    });
  });
});
