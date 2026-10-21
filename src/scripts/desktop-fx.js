/* Desktop-only effects (mouse pointer, not low-end). Loaded on demand so phones never download this. */
import { root, $, lerp, mk, trackPointer } from './util.js';

export default function desktopFx(spot) {
  cursor(spot);
  tilt();
  magnetic();
  spotlight();
  scramble();
}

function cursor(spot) {
  const dot = mk('div', 'cursor-dot');
  const ring = mk('div', 'cursor-ring');
  const label = mk('span');
  ring.append(label);
  document.body.append(dot, ring);
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, raf = 0;

  // One write per frame, and the loop stops itself as soon as the ring catches up.
  const frame = () => {
    rx = lerp(rx, mx, 0.18); ry = lerp(ry, my, 0.18);
    dot.style.transform = `translate3d(${mx}px,${my}px,0)`;
    ring.style.transform = `translate3d(${rx.toFixed(1)}px,${ry.toFixed(1)}px,0)`;
    spot.style.transform = `translate3d(${mx}px,${my}px,0)`;
    raf = Math.abs(mx - rx) > 0.2 || Math.abs(my - ry) > 0.2 ? requestAnimationFrame(frame) : 0;
  };
  addEventListener('pointermove', (e) => {
    mx = e.clientX; my = e.clientY;
    root.classList.add('has-cursor');
    if (!raf) raf = requestAnimationFrame(frame);
  }, { passive: true });
  root.addEventListener('pointerleave', () => root.classList.remove('has-cursor'));
  document.addEventListener('pointerover', (e) => {
    const t = e.target;
    if (!t || !t.closest) return;
    const c = t.closest('[data-cursor]');
    const l = t.closest('a,button');
    ring.classList.toggle('big', !!c);
    ring.classList.toggle('link', !c && !!l);
    if (c) label.textContent = c.dataset.cursor;
  });
}

function tilt() {
  $('[data-tilt]').forEach((el) => {
    trackPointer(el, (e, r) => {
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      const s = el.style;
      s.setProperty('--ry', (px * 9).toFixed(2) + 'deg');
      s.setProperty('--rx', (-py * 7).toFixed(2) + 'deg');
      s.setProperty('--px', px.toFixed(3));
      s.setProperty('--py', py.toFixed(3));
      s.setProperty('--gx', ((px + 0.5) * 100).toFixed(1) + '%');
      s.setProperty('--gy', ((py + 0.5) * 100).toFixed(1) + '%');
    }, () => {
      const s = el.style;
      s.setProperty('--rx', '0deg'); s.setProperty('--ry', '0deg');
      s.setProperty('--px', '0'); s.setProperty('--py', '0');
    });
  });
}

function magnetic() {
  $('[data-magnetic]').forEach((el) => {
    trackPointer(el, (e, r) => {
      el.style.setProperty('--tx', ((e.clientX - r.left - r.width / 2) * 0.28).toFixed(1) + 'px');
      el.style.setProperty('--ty', ((e.clientY - r.top - r.height / 2) * 0.4).toFixed(1) + 'px');
    }, () => {
      el.style.setProperty('--tx', '0px'); el.style.setProperty('--ty', '0px');
    });
  });
}

function spotlight() {
  $('[data-spot]').forEach((host) => {
    const target = host.dataset.spotTarget ? host.querySelector(host.dataset.spotTarget) : host;
    if (!target) return;
    // The rect of the *target* is what the glow is measured against.
    let rect = null;
    host.addEventListener('pointerenter', () => { rect = null; });
    trackPointer(host, (e) => {
      if (!rect) rect = target.getBoundingClientRect();
      target.style.setProperty('--cx', (e.clientX - rect.left).toFixed(0) + 'px');
      target.style.setProperty('--cy', (e.clientY - rect.top).toFixed(0) + 'px');
    });
    addEventListener('scroll', () => { rect = null; }, { passive: true });
  });
}

function scramble() {
  const chars = '01/<>{}[]#$%&*+=';
  const run = (el) => {
    const txt = el.dataset.text || (el.dataset.text = el.textContent);
    let f = 0; const total = 16;
    clearInterval(el._t);
    el._t = setInterval(() => {
      f++;
      el.textContent = [...txt].map((ch, i) => (ch === ' ' ? ' ' : i < (txt.length * f) / total ? ch : chars[(Math.random() * chars.length) | 0])).join('');
      if (f >= total) { clearInterval(el._t); el.textContent = txt; }
    }, 28);
  };
  $('.topbar nav a, [data-scramble]').forEach((el) => {
    if (el.children.length) return;
    el.addEventListener('pointerenter', () => run(el));
  });
}
