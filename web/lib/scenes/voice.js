// Escena 2D "voice": onda de voz (ver lib/SPEC.md).
// Lienzo con dos bandas: tono (línea de entonación) y volumen (barras de la onda). Un cabezal recorre la frase en bucle;
// la frase aparece debajo con marcas de pausa y la palabra que "suena" resaltada.
import { esc, reduce, loop } from '../kit.js';

const MODES = {
  plana: { n: 'Voz plana', amp: 0.42, vary: 0.04, pitch: 0.06, lift: 0, rate: 1, pause: 0.3, gap: 0.08 },
  expresiva: { n: 'Voz expresiva', amp: 0.62, vary: 0.45, pitch: 0.95, lift: 0.05, rate: 1, pause: 0.45, gap: 0.1 },
  fuerte: { n: 'Volumen fuerte', amp: 0.97, vary: 0.12, pitch: 0.45, lift: 0.28, rate: 1, pause: 0.35, gap: 0.08 },
  suave: { n: 'Volumen suave', amp: 0.2, vary: 0.12, pitch: 0.25, lift: -0.25, rate: 0.95, pause: 0.4, gap: 0.1 },
  rapida: { n: 'Ritmo rápido', amp: 0.55, vary: 0.2, pitch: 0.3, lift: 0.1, rate: 1.9, pause: 0.06, gap: 0.02 },
  pausas: { n: 'Con pausas', amp: 0.58, vary: 0.3, pitch: 0.6, lift: 0, rate: 0.95, pause: 1.25, gap: 0.12 },
};
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const lerp = (a, b, f) => a + (b - a) * f;
const sylCount = (w) => Math.max(1, (String(w).toLowerCase().match(/[aeiouáéíóúü]+/g) || []).length);
const hash = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

export default function (el) {
  const st = document.createElement('div');
  st.className = 'stage sc-stage sc-2d sc-voice' + (reduce ? ' sc-reduce' : '');
  el.appendChild(st);
  const cv = document.createElement('canvas'); st.appendChild(cv);
  const ctx = cv.getContext('2d');
  const tag = document.createElement('div'); tag.className = 'sc-tag'; st.appendChild(tag);
  const txt = document.createElement('div'); txt.className = 'sc-vo-text'; st.appendChild(txt);

  let W = 0, H = 0, S = null, words = [], pauses = [], mode = MODES.expresiva, modeKey = 'expresiva';
  let cur = null; // parámetros actuales (se interpolan hacia mode)
  let bars = [], barsT = [], pitchY = [], pitchT = [], N = 0, tl = null, play = 0, rest = 0, t = 0;
  const spans = [];

  function fit() {
    const r = st.getBoundingClientRect(); W = r.width; H = r.height;
    const d = Math.min(devicePixelRatio || 1, 2); cv.width = Math.round(W * d); cv.height = Math.round(H * d); ctx.setTransform(d, 0, 0, d, 0, 0);
    N = Math.max(20, Math.floor((W - 70) / (W < 480 ? 5 : 6)));
    if (bars.length !== N) { bars = new Array(N).fill(0); pitchY = new Array(N).fill(0); }
    target(); if (reduce) snap(); draw();
  }

  /** línea de tiempo: [{w, a, b}] y pausas [{t0, t1}] con los parámetros p */
  function timeline(p) {
    let x = 0.25; const W2 = [], P = [];
    words.forEach((w, i) => {
      const d = (0.16 + 0.13 * sylCount(w)) / p.rate;
      W2.push({ a: x, b: x + d, s: sylCount(w), i }); x += d;
      if (pauses.indexOf(i) >= 0 && i < words.length - 1) { const pl = Math.max(p.pause, 0.18 / p.rate); P.push({ a: x, b: x + pl, i }); x += pl; }
      else x += p.gap;
    });
    return { W: W2, P, T: x + 0.2 };
  }
  function target() {
    if (!words.length) { barsT = new Array(N).fill(0); pitchT = new Array(N).fill(0); tl = { W: [], P: [], T: 1, scale: 1 }; return; }
    const p = mode;
    tl = timeline(p);
    const ref = timeline(MODES.expresiva).T;
    tl.scale = Math.max(tl.T, ref * 1.02);
    const q = /\?\s*$/.test(S.text || ''), ex = /!\s*$/.test(S.text || '');
    // tono por palabra (patrón expresivo sembrado por índice)
    const wp = tl.W.map((w, i) => {
      const arc = Math.sin((i / Math.max(1, tl.W.length - 1)) * Math.PI) * 0.5 - 0.1;
      let v = arc + (hash(i + 3) - 0.5) * 0.9;
      if (i === tl.W.length - 1) v = q ? 0.9 : ex ? 0.7 : -0.55;
      return clamp(p.lift + v * p.pitch, -1, 1);
    });
    barsT = new Array(N); pitchT = new Array(N);
    for (let k = 0; k < N; k++) {
      const tt = ((k + 0.5) / N) * tl.scale;
      let a = 0.035 + hash(k) * 0.025, pitch = null;
      for (const w of tl.W) {
        if (tt >= w.a && tt <= w.b) {
          const u = (tt - w.a) / (w.b - w.a);
          const env = (0.4 + 0.6 * Math.abs(Math.sin(Math.PI * u * w.s))) * Math.pow(Math.sin(Math.PI * u), 0.35);
          const emph = 1 + p.vary * (hash(w.i * 7 + 1) * 2 - 0.7);
          a = Math.max(a, p.amp * emph * env * (0.8 + 0.2 * hash(k * 3 + 1)));
          pitch = wp[w.i] + (u - 0.5) * 0.25 * p.pitch;
          break;
        }
      }
      barsT[k] = clamp(a, 0, 1);
      pitchT[k] = pitch;
    }
    // interpolar el tono en huecos para que la línea sea continua (los huecos se dibujan punteados)
    let last = null;
    for (let k = 0; k < N; k++) { if (pitchT[k] == null) pitchT[k] = { gap: true, v: last == null ? p.lift : last }; else { last = pitchT[k]; pitchT[k] = { gap: false, v: pitchT[k] }; } }
  }
  function snap() { for (let k = 0; k < N; k++) { bars[k] = barsT[k] || 0; pitchY[k] = pitchT[k] ? pitchT[k].v : 0; } play = tl ? tl.scale : 0; }

  function renderText() {
    txt.innerHTML = '';
    spans.length = 0;
    words.forEach((w, i) => {
      const s = document.createElement('span'); s.className = 'sc-vo-w'; s.textContent = w; txt.appendChild(s); spans.push(s);
      if (pauses.indexOf(i) >= 0 && i < words.length - 1) { const m = document.createElement('i'); m.className = 'sc-vo-p'; m.textContent = '‖'; m.title = 'pausa'; txt.appendChild(m); }
      txt.appendChild(document.createTextNode(' '));
    });
  }

  function draw() {
    if (!W || !H) return;
    ctx.clearRect(0, 0, W, H);
    const th = txt.offsetHeight || 40;
    const x0 = W < 480 ? 50 : 62, x1 = W - 14;
    const top = 40, pH = clamp((H - top - th - 20) * 0.28, 32, 60);
    const wTop = top + pH + 14, wBot = H - th - 14, mid = (wTop + wBot) / 2, half = (wBot - wTop) / 2;
    const bw = (x1 - x0) / N;
    const px = x0 + (play / (tl ? tl.scale : 1)) * (x1 - x0);
    // rótulos de banda
    ctx.font = '600 11px "IBM Plex Sans", system-ui, sans-serif'; ctx.fillStyle = '#7F8E9A'; ctx.textAlign = 'left';
    ctx.fillText('Tono', 10, top + pH / 2 + 4); ctx.fillText('Volumen', 10, mid + 4);
    if (W < 480) { ctx.clearRect(0, mid - 10, x0 - 2, 20); ctx.fillText('Vol.', 10, mid + 4); }
    // guías
    ctx.strokeStyle = 'rgba(154,168,179,.14)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x0, top + pH / 2); ctx.lineTo(x1, top + pH / 2); ctx.moveTo(x0, mid); ctx.lineTo(x1, mid); ctx.stroke();
    ctx.setLineDash([2, 4]); ctx.beginPath(); ctx.moveTo(x0, wTop); ctx.lineTo(x1, wTop); ctx.moveTo(x0, wBot); ctx.lineTo(x1, wBot); ctx.stroke(); ctx.setLineDash([]);
    // pausas
    if (tl) tl.P.forEach((p) => {
      const a = x0 + (p.a / tl.scale) * (x1 - x0), b = x0 + (p.b / tl.scale) * (x1 - x0);
      ctx.fillStyle = 'rgba(231,180,96,.08)'; ctx.fillRect(a, top, b - a, wBot - top);
      ctx.fillStyle = '#E7B460'; ctx.font = '700 13px "IBM Plex Sans", sans-serif'; ctx.textAlign = 'center';
      if (b - a > 10) ctx.fillText('‖', (a + b) / 2, wBot - 4);
    });
    // barras (simétricas)
    const live = !reduce;
    for (let k = 0; k < N; k++) {
      const x = x0 + k * bw, on = x + bw / 2 <= px;
      let a = bars[k];
      if (live) a *= 1 + 0.08 * Math.sin(t * 9 + k * 0.7);
      const hh = Math.max(1.5, a * half);
      const g = on ? (a > 0.8 ? '#F2A65A' : '#4FC3C1') : 'rgba(79,195,193,.3)';
      ctx.fillStyle = g;
      const w = Math.max(1.5, bw - 2);
      roundRect(x + (bw - w) / 2, mid - hh, w, hh * 2, Math.min(w / 2, 2));
    }
    // tono
    ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    const pyAt = (k) => top + pH / 2 - clamp(pitchY[k], -1, 1) * (pH / 2 - 4);
    for (let k = 1; k < N; k++) {
      const gap = pitchT[k] && pitchT[k].gap;
      const xa = x0 + (k - 0.5) * bw, xb = x0 + (k + 0.5) * bw;
      ctx.strokeStyle = xb <= px ? '#E7B460' : 'rgba(231,180,96,.35)';
      ctx.globalAlpha = gap ? 0.35 : 1;
      ctx.beginPath(); ctx.moveTo(xa, pyAt(k - 1)); ctx.lineTo(xb, pyAt(k)); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    // cabezal
    if (tl && play > 0 && play < tl.scale) {
      const gr = ctx.createLinearGradient(px - 18, 0, px, 0); gr.addColorStop(0, 'rgba(127,178,234,0)'); gr.addColorStop(1, 'rgba(127,178,234,.18)');
      ctx.fillStyle = gr; ctx.fillRect(px - 18, top - 4, 18, wBot - top + 8);
      ctx.strokeStyle = '#E6ECF1'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(px, top - 4); ctx.lineTo(px, wBot + 4); ctx.stroke();
      ctx.fillStyle = '#E6ECF1'; ctx.beginPath(); ctx.arc(px, top - 4, 3.5, 0, Math.PI * 2); ctx.fill();
    }
    // palabra activa
    if (tl) {
      let on = -1;
      tl.W.forEach((w, i) => { if (play >= w.a && play <= w.b + 0.05) on = i; });
      spans.forEach((s, i) => { s.classList.toggle('sc-on', i === on); s.classList.toggle('sc-said', !reduce && tl.W[i] && play > tl.W[i].b); });
    }
  }
  function roundRect(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); ctx.fill(); }

  const stop = reduce ? null : loop((dt) => {
    t += dt;
    const f = 1 - Math.exp(-dt * 5);
    for (let k = 0; k < N; k++) { bars[k] = lerp(bars[k], barsT[k] || 0, f); pitchY[k] = lerp(pitchY[k], pitchT[k] ? pitchT[k].v : 0, f); }
    if (tl) {
      if (rest > 0) { rest -= dt; if (rest <= 0) play = 0; }
      else { play += dt; if (play >= tl.scale) { play = tl.scale; rest = 1.3; } }
    }
    draw();
  });

  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(fit) : null;
  if (ro) ro.observe(st);

  return {
    set(state, prev) {
      S = state;
      const nw = String(state.text || '').split(/\s+/).filter(Boolean);
      const np = [].concat(state.pauses || []).map(Number);
      const changedText = nw.join(' ') !== words.join(' ') || np.join() !== pauses.join();
      words = nw; pauses = np;
      modeKey = MODES[state.mode] ? state.mode : 'expresiva';
      mode = MODES[modeKey];
      if (changedText) renderText();
      txt.dataset.mode = modeKey;
      tag.textContent = mode.n;
      st.dataset.mode = modeKey;
      if (!W) fit(); else target();
      if (!prev || reduce) snap();
      if (prev) { play = 0; rest = 0; }
      if (reduce) draw();
    },
    dispose() { if (stop) stop(); if (ro) ro.disconnect(); st.remove(); },
  };
}
