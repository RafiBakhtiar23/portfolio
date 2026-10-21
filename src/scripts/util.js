/* Shared helpers for the motion scripts. */
export const root = document.documentElement;
/* The visitor can also switch effects off with the footer button (stored as rb-fx=off). Treated like reduced motion. */
const fxOff = () => { try { return localStorage.getItem('rb-fx') === 'off'; } catch (e) { return false; } };
export const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches || fxOff();
export const fine = matchMedia('(pointer: fine)').matches;

const nav = navigator;
/* "lite" = save-data on, or a clearly low-end device. Lite mode trims decoration, never content. */
export const lite =
  Boolean(nav.connection && nav.connection.saveData) ||
  (typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 2) ||
  (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 2);

export const $ = (s, c = document) => [...c.querySelectorAll(s)];
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const wait = (ms) => new Promise((r) => setTimeout(r, ms));
export const mk = (tag, cls) => { const e = document.createElement(tag); if (cls) e.className = cls; return e; };

/* Bounding rects are cached per element and only re-read after the page scrolled. */
let scrollStamp = 0;
addEventListener('scroll', () => { scrollStamp++; }, { passive: true });

/* Pointer tracking: at most one callback per frame, one rect read per frame, no work after leave. */
export function trackPointer(el, onMove, onLeave) {
  let rect = null, stamp = -1, ev = null, queued = false;
  const getRect = () => {
    if (!rect || stamp !== scrollStamp) { rect = el.getBoundingClientRect(); stamp = scrollStamp; }
    return rect;
  };
  el.addEventListener('pointerenter', () => { rect = null; });
  el.addEventListener('pointermove', (e) => {
    ev = e;
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; if (ev) onMove(ev, getRect()); });
  }, { passive: true });
  el.addEventListener('pointerleave', () => { ev = null; if (onLeave) onLeave(); });
}
