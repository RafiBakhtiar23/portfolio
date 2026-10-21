/* Rafi portfolio — motion system (v6, performance pass).
   Concept: the site is one HTTP request lifecycle (REQUEST → ROUTE → HANDLERS → QUERY → RESPONSE).
   Rules of this file: no always-on loops, no layout reads inside hot paths, nothing animates off-screen.
   Everything degrades gracefully: no JS / reduced motion = plain static page. */
import { root, reduce, fine, lite, $, clamp, mk, wait, trackPointer } from './util.js';

if (!reduce) main();
else setupProjectClicks(); // reduced motion still needs the whole project card to be clickable

function main() {
  root.classList.add('motion-on', 'motion-ready');
  if (lite) root.classList.add('lite');
  document.addEventListener('visibilitychange', () => root.classList.toggle('tab-hidden', document.hidden));

  autoTag();
  $('[data-lines]').forEach(splitLines);
  const wordGroups = $('[data-words]').map(splitWords);

  const progress = mk('div', 'progress');
  const spot = mk('div', 'spot');
  document.body.append(progress, spot);

  setupProjectClicks();
  pauseOffscreen('.hero-stage, .hero-art, .hero-bottom, .project-art');
  setupDust();
  setupMarquee();
  setupScroll(wordGroups, progress);

  // Mouse-only effects are a separate chunk: phones and low-end devices never download them.
  if (fine && !lite) import('./desktop-fx.js').then((m) => m.default(spot)).catch(() => {});

  intro().then(startObserving);
}

/* ---------- tagging & text splitting ---------- */
function autoTag() {
  if (!document.querySelector('.case-page')) return;
  const rise = (sel, step = 0) => $(sel).forEach((el, i) => {
    el.setAttribute('data-anim', 'rise');
    if (step) el.style.setProperty('--d', i * step + 'ms');
  });
  rise('.case-back, .case-page > .eyebrow');
  rise('.case-lead');
  $('.case-lead').forEach((el) => el.style.setProperty('--d', '300ms'));
  $('.case-title').forEach((el) => el.setAttribute('data-lines', ''));
  $('.case-hero-visual').forEach((el) => { el.setAttribute('data-anim', 'clip'); el.style.setProperty('--d', '200ms'); });
  rise('.case-meta');
  rise('.case-section');
  $('.case-section h2').forEach((el) => el.setAttribute('data-lines', ''));
  $('.case-feature-grid article').forEach((el, i) => {
    el.setAttribute('data-anim', 'rise');
    el.setAttribute('data-spot', '');
    el.style.setProperty('--d', (i % 2) * 90 + 'ms');
  });
  rise('.case-bottom');
  $('.case-back').forEach((el) => el.setAttribute('data-anim', 'fade'));
  $('.button').forEach((el) => el.setAttribute('data-magnetic', ''));
}

function splitLines(el) {
  const groups = [[]];
  [...el.childNodes].forEach((n) => (n.nodeName === 'BR' ? groups.push([]) : groups[groups.length - 1].push(n)));
  // Join the lines with a space: textContent alone would glue them together ("RafiBakhtiar.").
  el.setAttribute('aria-label', groups.map((g) => g.map((n) => n.textContent).join('')).join(' ').replace(/\s+/g, ' ').trim());
  el.textContent = '';
  groups.forEach((g, i) => {
    const ln = mk('span', 'ln');
    const inner = mk('span');
    inner.setAttribute('aria-hidden', 'true');
    inner.style.setProperty('--i', i);
    g.forEach((n) => inner.appendChild(n));
    ln.appendChild(inner);
    el.appendChild(ln);
  });
}

function splitWords(el) {
  const text = el.textContent.trim();
  el.textContent = '';
  const ws = text.split(/\s+/).map((w) => {
    const s = mk('span', 'w');
    s.textContent = w + ' ';
    el.appendChild(s);
    return s;
  });
  return { el, ws };
}

/* ---------- intro (once per session, home only) ---------- */
async function intro() {
  const loader = document.getElementById('loader');
  if (!loader || !root.classList.contains('has-loader')) { loader && loader.remove(); return; }
  const count = loader.querySelector('.loader-count');
  const status = loader.querySelector('.loader-status');
  const t0 = performance.now(), dur = 600;
  let skip = false;
  loader.addEventListener('click', () => { skip = true; });
  addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') skip = true; });
  await new Promise((res) => {
    (function f(t) {
      const p = skip ? 1 : clamp((t - t0) / dur, 0, 1);
      const e = 1 - Math.pow(1 - p, 3);
      count.textContent = String(Math.round(e * 100)).padStart(3, '0');
      if (p < 1) requestAnimationFrame(f); else res();
    })(t0);
  });
  status.textContent = '200 OK';
  loader.classList.add('ok');
  await wait(220);
  loader.classList.add('done');
  try { sessionStorage.setItem('rb-seen', '1'); } catch (e) {}
  setTimeout(() => loader.remove(), 1000);
  await wait(150);
}

/* ---------- enter + exit animations (both directions) ---------- */
function startObserving() {
  root.classList.remove('has-loader');
  if (!('IntersectionObserver' in window)) { $('[data-anim],[data-lines]').forEach((e) => e.classList.add('is-in')); return; }
  const apply = (el, en) => {
    if (en.isIntersecting) {
      el.classList.add('is-in');
      el.classList.remove('out-up', 'out-down');
    } else {
      const up = en.boundingClientRect.top < 0;
      el.classList.remove('is-in');
      el.classList.toggle('out-up', up);
      el.classList.toggle('out-down', !up);
    }
  };
  const opts = { threshold: 0.12, rootMargin: '0px 0px -6% 0px' };
  const io = new IntersectionObserver((entries) => entries.forEach((en) => apply(en.target, en)), opts);

  // Elements that start fully clipped (data-anim="clip") can never "intersect" while clipped,
  // so they would stay hidden forever. Watch their parent instead and reveal them with it.
  const clipMap = new Map();
  $('[data-anim="clip"]').forEach((el) => {
    const host = el.parentElement;
    if (!host) { io.observe(el); return; }
    if (!clipMap.has(host)) clipMap.set(host, []);
    clipMap.get(host).push(el);
  });
  const cio = new IntersectionObserver((entries) => entries.forEach((en) => (clipMap.get(en.target) || []).forEach((el) => apply(el, en))), { threshold: 0.05, rootMargin: '0px 0px -6% 0px' });
  clipMap.forEach((_, host) => cio.observe(host));

  $('[data-anim]:not([data-anim="clip"]),[data-lines]').forEach((el) => io.observe(el));
}


function setupProjectClicks() {
  $('.project-card').forEach((card) => {
    const art = card.querySelector('.project-art');
    const link = card.querySelector('.project-arrow');
    if (art && link) art.addEventListener('click', () => link.click());
  });
}

/* ---------- CSS loops only run while their element is on screen ---------- */
function pauseOffscreen(selector) {
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((en) => en.forEach((e) => e.target.classList.toggle('off', !e.isIntersecting)), { rootMargin: '80px' });
  $(selector).forEach((el) => io.observe(el));
}

/* ---------- gold dust (hero canvas) ---------- */
function setupDust() {
  const host = document.querySelector('.hero-art');
  if (!host) return;
  const c = mk('canvas', 'dust');
  c.setAttribute('aria-hidden', 'true');
  host.append(c);
  const ctx = c.getContext('2d');
  if (!ctx) return;

  const N = lite ? 24 : fine ? 56 : 32;
  const P = Array.from({ length: N }, () => {
    const a = Math.random() * 0.5 + 0.25;
    return { x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.00018, vy: (Math.random() - 0.5) * 0.00018, r: Math.random() * 1.3 + 0.4, fs: `rgba(232,205,151,${a.toFixed(2)})` };
  });
  const LINK = 72, LINK2 = LINK * LINK;
  const buckets = [[], [], [], []];
  const ptr = { x: -999, y: -999 };
  let w = 0, h = 0, on = false, raf = 0, last = 0;

  const fit = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = host.clientWidth; h = host.clientHeight;
    c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
    c.style.width = w + 'px'; c.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  fit();
  new ResizeObserver(fit).observe(host);
  if (fine) trackPointer(host, (e, r) => { ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top; }, () => { ptr.x = ptr.y = -999; });

  function frame(t) {
    raf = 0;
    if (!on || document.hidden) return;
    raf = requestAnimationFrame(frame);
    if (t - last < 32) return;               // ~30 fps is plenty for slow dust
    const k = Math.min((t - last) / 16.7, 3); last = t;

    for (const p of P) {
      const dx = p.x * w - ptr.x, dy = p.y * h - ptr.y, d2 = dx * dx + dy * dy;
      if (d2 < 14400 && d2 > 0) { const d = Math.sqrt(d2); p.vx += (dx / d) * 0.00006 * k; p.vy += (dy / d) * 0.00006 * k; }
      const f = 1 - 0.015 * k;
      p.vx = p.vx * f + (Math.random() - 0.5) * 0.00002;
      p.vy = p.vy * f + (Math.random() - 0.5) * 0.00002;
      p.x += p.vx * k; p.y += p.vy * k;
      if (p.x < 0) p.x = 1; else if (p.x > 1) p.x = 0;
      if (p.y < 0) p.y = 1; else if (p.y > 1) p.y = 0;
    }

    ctx.clearRect(0, 0, w, h);
    buckets.forEach((b) => { b.length = 0; });
    for (let i = 0; i < N; i++) {
      const a = P[i], ax = a.x * w, ay = a.y * h;
      for (let j = i + 1; j < N; j++) {
        const b = P[j], bx = b.x * w, by = b.y * h, dx = ax - bx, dy = ay - by, d2 = dx * dx + dy * dy;
        if (d2 < LINK2) buckets[Math.min(3, ((1 - Math.sqrt(d2) / LINK) * 4) | 0)].push(ax, ay, bx, by);
      }
      ctx.fillStyle = a.fs;
      ctx.beginPath(); ctx.arc(ax, ay, a.r, 0, 6.2832); ctx.fill();
    }
    ctx.lineWidth = 0.6;
    for (let q = 0; q < 4; q++) {
      const s = buckets[q];
      if (!s.length) continue;
      ctx.strokeStyle = `rgba(214,184,128,${(((q + 1) / 4) * 0.16).toFixed(3)})`;
      ctx.beginPath();
      for (let i = 0; i < s.length; i += 4) { ctx.moveTo(s[i], s[i + 1]); ctx.lineTo(s[i + 2], s[i + 3]); }
      ctx.stroke();
    }
  }
  const start = () => { if (on && !raf && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(frame); } };
  new IntersectionObserver((en) => { on = en[0].isIntersecting; start(); }).observe(host);
  document.addEventListener('visibilitychange', start);
}

/* ---------- velocity-reactive marquee (runs only while visible) ---------- */
function setupMarquee() {
  const wrap = document.querySelector('.marquee');
  const track = document.querySelector('.marquee-track');
  if (!wrap || !track) return;
  const copies = 4;
  const base = track.innerHTML;
  track.innerHTML = base.repeat(copies);
  let x = 0, vel = 0, lastY = scrollY, set = 0, visible = false, raf = 0;
  const measure = () => { set = track.scrollWidth / copies; };
  measure();
  new ResizeObserver(measure).observe(track);

  function tick() {
    raf = 0;
    if (!visible || document.hidden) return;
    raf = requestAnimationFrame(tick);
    const y = scrollY; const dy = y - lastY; lastY = y;
    vel = vel + (dy - vel) * 0.1;
    x -= 0.7 + vel * 0.4;
    if (set > 0) { if (x < -set) x += set; if (x > 0) x -= set; }
    track.style.transform = `translate3d(${x.toFixed(1)}px,0,0) skewX(${clamp(-vel * 0.3, -9, 9).toFixed(2)}deg)`;
  }
  const start = () => { if (visible && !raf && !document.hidden) { lastY = scrollY; raf = requestAnimationFrame(tick); } };
  new IntersectionObserver((en) => { visible = en[0].isIntersecting; start(); }).observe(wrap);
  document.addEventListener('visibilitychange', start);
}

/* ---------- one rAF-throttled scroll pipeline ---------- */
function setupScroll(wordGroups, progress) {
  const topbar = document.querySelector('.topbar');
  const railLinks = $('.rail a').map((a) => ({ a, el: document.querySelector(a.getAttribute('href')) })).filter((s) => s.el);
  const railFill = document.querySelector('.rail-line i');
  const navLinks = $('.topbar nav a[href^="#"]').map((a) => ({ a, el: document.querySelector(a.getAttribute('href')) })).filter((s) => s.el);
  const heroArt = document.querySelector('.hero-art');
  let ticking = false, lastY = scrollY, heroOn = true, docH = root.scrollHeight;
  new ResizeObserver(() => { docH = root.scrollHeight; }).observe(document.body);

  // Which section is under the middle of the screen: an observer instead of measuring every frame.
  const sectionEls = [...new Set([...railLinks, ...navLinks].map((s) => s.el))];
  if ('IntersectionObserver' in window && sectionEls.length) {
    const secIO = new IntersectionObserver((en) => {
      let cur = null;
      en.forEach((e) => { if (e.isIntersecting) cur = e.target; });
      if (!cur) return;
      railLinks.forEach((s) => s.a.classList.toggle('on', s.el === cur));
      navLinks.forEach((s) => s.a.classList.toggle('active', s.el === cur));
    }, { rootMargin: '-50% 0px -50% 0px' });
    sectionEls.forEach((el) => secIO.observe(el));
  }

  // Manifesto words: only measure groups that are near the screen.
  const near = new Set();
  const byEl = new Map(wordGroups.map((g) => { g.n = 0; return [g.el, g]; }));
  if ('IntersectionObserver' in window && wordGroups.length) {
    const wio = new IntersectionObserver((en) => {
      en.forEach((e) => { const g = byEl.get(e.target); if (e.isIntersecting) near.add(g); else near.delete(g); });
      schedule();
    }, { rootMargin: '25% 0px 25% 0px' });
    wordGroups.forEach((g) => wio.observe(g.el));
  } else {
    wordGroups.forEach((g) => near.add(g));
  }
  if (heroArt && 'IntersectionObserver' in window) new IntersectionObserver((en) => { heroOn = en[0].isIntersecting; }).observe(heroArt);

  const update = () => {
    ticking = false;
    const y = scrollY, vh = innerHeight;

    // 1) reads
    const reads = [];
    near.forEach((g) => reads.push([g, g.el.getBoundingClientRect()]));

    // 2) writes
    const max = docH - vh;
    const p = max > 0 ? clamp(y / max, 0, 1) : 0;
    progress.style.transform = `scaleX(${p.toFixed(4)})`;
    if (railFill) railFill.style.transform = `scaleY(${p.toFixed(4)})`;

    const dy = y - lastY;
    if (topbar && Math.abs(dy) > 4) { topbar.classList.toggle('hide', dy > 0 && y > 160); lastY = y; }

    if (heroArt && heroOn) {
      heroArt.style.setProperty('--sr', (y * 0.05).toFixed(2));
      heroArt.style.setProperty('--sy', clamp(y * 0.1, 0, 90).toFixed(1));
    }

    reads.forEach(([g, r]) => {
      const t = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.3), 0, 1);
      const n = Math.round(t * g.ws.length * 1.08);
      if (n === g.n) return;
      const from = Math.min(n, g.n), to = Math.min(Math.max(n, g.n), g.ws.length);
      for (let i = from; i < to; i++) g.ws[i].classList.toggle('lit', i < n);
      g.n = n;
    });
  };
  function schedule() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  update();
}
