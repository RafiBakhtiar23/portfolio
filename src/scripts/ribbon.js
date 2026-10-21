/* Living gold background for the whole hero (canvas, no libraries).
   - ~44 flowing gold threads + drifting gold dust, drawn full-bleed behind the intro text.
   - Interactive: threads bend away from the mouse / finger, dust scatters, a soft glow follows the pointer,
     and scrolling pushes the waves along.
   Static fallback = public/hero-lines.webp (CSS background on .hero-bg) for reduced motion, low-end devices or if canvas fails.
   Cost control: ~30 fps, paused when off-screen or tab hidden, fewer lines on touch devices. */
(function () {
  const host = document.querySelector('.hero-bg');
  if (!host) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  try { if (localStorage.getItem('rb-fx') === 'off') return; } catch (e) {}
  const nav = navigator;
  const lite = Boolean(nav.connection && nav.connection.saveData) ||
    (typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 2) ||
    (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 2);
  if (lite) return;

  const c = document.createElement('canvas');
  c.className = 'ribbon';
  c.setAttribute('aria-hidden', 'true');
  const ctx = c.getContext('2d');
  if (!ctx) return;
  host.appendChild(c);

  const fine = matchMedia('(pointer: fine)').matches;
  const N = fine ? 44 : 26, M = fine ? 120 : 64, B = 5;
  const mask = document.createElement('canvas');
  const mctx = mask.getContext('2d');
  const dust = Array.from({ length: fine ? 46 : 24 }, () => ({
    x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.00012, vy: -Math.random() * 0.00018 - 0.00003, by: -Math.random() * 0.00016 - 0.00004,
    r: Math.random() * 1.4 + 0.5, ph: Math.random() * 6.28,
  }));
  const lum = Array.from({ length: N }, (_, i) => { const t = i / (N - 1); return 0.3 + 0.7 * Math.exp(-Math.pow((t - 0.5) / 0.3, 2)); });

  let w = 0, h = 0, on = false, raf = 0, last = 0, time = 0, narrow = false;
  // pointer in canvas pixels; `str` eases 0..1 so the effect fades in and out smoothly
  const ptr = { x: 0, y: 0, tx: 0, ty: 0, str: 0, tstr: 0 };
  let scrollPush = 0, scrollSmooth = 0, lastScroll = scrollY;

  const fit = () => {
    const dpr = Math.min(devicePixelRatio || 1, fine ? 2 : 1.5);
    w = host.clientWidth; h = host.clientHeight;
    narrow = w < 700;
    c.width = mask.width = Math.round(w * dpr);
    c.height = mask.height = Math.round(h * dpr);
    c.style.width = w + 'px'; c.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    mctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // painted once: keep the left (text side) calm, bring the full glow to the right, fade top and bottom edges
    mctx.globalCompositeOperation = 'source-over';
    mctx.clearRect(0, 0, w, h);
    const hg = mctx.createLinearGradient(0, 0, w, 0);
    if (narrow) { hg.addColorStop(0, 'rgba(0,0,0,.55)'); hg.addColorStop(1, 'rgba(0,0,0,.7)'); }
    else { hg.addColorStop(0, 'rgba(0,0,0,.16)'); hg.addColorStop(0.34, 'rgba(0,0,0,.3)'); hg.addColorStop(0.64, 'rgba(0,0,0,1)'); hg.addColorStop(1, 'rgba(0,0,0,1)'); }
    mctx.fillStyle = hg; mctx.fillRect(0, 0, w, h);
    mctx.globalCompositeOperation = 'destination-in';
    const vg = mctx.createLinearGradient(0, 0, 0, h);
    vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(0.16, 'rgba(0,0,0,1)'); vg.addColorStop(0.84, 'rgba(0,0,0,1)'); vg.addColorStop(1, 'rgba(0,0,0,0)');
    mctx.fillStyle = vg; mctx.fillRect(0, 0, w, h);
    mctx.globalCompositeOperation = 'source-over';
  };
  fit();
  new ResizeObserver(fit).observe(host);

  // one cheap listener: store the latest position, the frame loop does the rest
  const setPtr = (e) => {
    const r = host.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const inside = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
    ptr.tstr = inside ? 1 : 0;
    if (inside) { ptr.tx = x; ptr.ty = y; if (!ptr.str) { ptr.x = x; ptr.y = y; } }
    start();
  };
  addEventListener('pointermove', setPtr, { passive: true });
  addEventListener('pointerdown', setPtr, { passive: true });
  addEventListener('pointerup', () => { if (!fine) ptr.tstr = 0; }, { passive: true });
  addEventListener('pointercancel', () => { ptr.tstr = 0; }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => { ptr.tstr = 0; });
  addEventListener('scroll', () => { scrollPush += (scrollY - lastScroll) * 0.0016; lastScroll = scrollY; }, { passive: true });

  function frame(ts) {
    raf = 0;
    if (!on || document.hidden) return;
    raf = requestAnimationFrame(frame);
    if (ts - last < 32) return;
    const dt = Math.min((ts - last) / 1000, 0.1); last = ts;
    time += dt;
    ptr.x += (ptr.tx - ptr.x) * 0.1; ptr.y += (ptr.ty - ptr.y) * 0.1; ptr.str += (ptr.tstr - ptr.str) * 0.07;
    scrollSmooth += (scrollPush - scrollSmooth) * 0.08;
    const tt = time * 0.5 + scrollSmooth * 3;

    const R = Math.min(w, h) * (fine ? 0.3 : 0.38), R2 = R * R, push = (fine ? 46 : 60) * ptr.str;
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineJoin = 'round';
    const paths = Array.from({ length: B }, () => new Path2D());
    for (let i = 0; i < N; i++) {
      const t = i / (N - 1);
      const y0 = 0.16 + 0.68 * t;
      const amp = 0.17 * Math.pow(Math.sin(Math.PI * t), 0.8) + 0.03;
      const ph = 2.2 * t;
      const p = paths[Math.min(B - 1, (lum[i] * B) | 0)];
      for (let k = 0; k <= M; k++) {
        const x = -0.1 + 1.2 * (k / M);
        const y = y0
          + amp * Math.sin(x * 5.2 + ph * 3.0 + 0.8 + tt * 1.1) * Math.exp(-Math.pow(x - 0.66, 2) * 1.5)
          + 0.07 * Math.sin(x * 2.1 - ph + tt * 0.45)
          + 0.10 * (t - 0.5) * Math.sin(x * 3.3 + tt * 0.66) * x;
        let X = x * w, Y = y * h;
        if (push > 0.5) {
          const dx = X - ptr.x, dy = Y - ptr.y, d2 = dx * dx + dy * dy;
          if (d2 < R2 * 4) { const f = Math.exp(-d2 / R2); const d = Math.sqrt(d2) + 1; X += (dx / d) * f * push * 0.5; Y += (dy / d) * f * push; }
        }
        if (k === 0) p.moveTo(X, Y); else p.lineTo(X, Y);
      }
    }
    for (let b = 0; b < B; b++) {
      const f = (b + 1) / B;
      ctx.strokeStyle = `rgba(${(110 + 120 * f) | 0},${(80 + 92 * f) | 0},${(36 + 58 * f) | 0},.14)`;
      ctx.lineWidth = 3.2; ctx.stroke(paths[b]);
      ctx.strokeStyle = `rgba(${(120 + 120 * f) | 0},${(88 + 92 * f) | 0},${(40 + 60 * f) | 0},${0.35 + 0.5 * f})`;
      ctx.lineWidth = 0.9; ctx.stroke(paths[b]);
    }

    // soft light under the pointer
    if (ptr.str > 0.02) {
      const g = ctx.createRadialGradient(ptr.x, ptr.y, 0, ptr.x, ptr.y, R * 0.9);
      g.addColorStop(0, `rgba(240,212,155,${(0.16 * ptr.str).toFixed(3)})`); g.addColorStop(1, 'rgba(240,212,155,0)');
      ctx.fillStyle = g; ctx.fillRect(ptr.x - R, ptr.y - R, R * 2, R * 2);
    }

    // gold dust: drifts upward, twinkles, scatters away from the pointer
    for (const d of dust) {
      const px = d.x * w, py = d.y * h;
      if (ptr.str > 0.05) {
        const dx = px - ptr.x, dy = py - ptr.y, d2 = dx * dx + dy * dy;
        if (d2 < 22500 && d2 > 1) { const dd = Math.sqrt(d2); d.vx += (dx / dd) * 0.00009 * ptr.str; d.vy += (dy / dd) * 0.00009 * ptr.str; }
      }
      d.vx *= 0.985; d.vy = d.vy * 0.985 + d.by * 0.015;
      d.x += d.vx * dt * 60; d.y += d.vy * dt * 60;
      if (d.x < 0) d.x = 1; else if (d.x > 1) d.x = 0;
      if (d.y < 0) { d.y = 1; d.x = Math.random(); } else if (d.y > 1) d.y = 0;
      const a = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(time * 1.4 + d.ph));
      ctx.fillStyle = `rgba(240,214,160,${a.toFixed(2)})`;
      ctx.beginPath(); ctx.arc(d.x * w, d.y * h, d.r, 0, 6.2832); ctx.fill();
    }

    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(mask, 0, 0, w, h);
    ctx.globalCompositeOperation = 'source-over';
    host.classList.add('live'); // hide the static image only after the first real frame
  }
  function start() { if (on && !raf && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  new IntersectionObserver((en) => { on = en[0].isIntersecting; start(); }).observe(host);
  document.addEventListener('visibilitychange', start);
})();
