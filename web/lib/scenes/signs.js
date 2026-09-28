// Escena 2D "signs": ciudad de signos (ver lib/SPEC.md).
// Calle nocturna con letreros sobre postes. highlight ilumina un tipo (verbal / no verbal); pick hace zoom a uno.
// Se dibuja en píxeles reales (viewBox = tamaño del escenario) para que el texto sea nítido.
import { esc, reduce } from '../kit.js';

const KC = { verbal: '#E7B460', noverbal: '#4FC3C1' };
const KN = { verbal: 'Verbal', noverbal: 'No verbal' };
const KD = { verbal: 'usa palabras', noverbal: 'imagen, color o gesto' };
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

/* ---------- iconos en una caja de -50..50 (centro 0,0); w = ancho relativo ---------- */
const ICON = {
  pare: () => '<path d="M-20.7-50h41.4L50-20.7v41.4L20.7 50h-41.4L-50 20.7v-41.4z" fill="#C8302A" stroke="#fff" stroke-width="5" stroke-linejoin="round"/>' +
    '<text y="9" text-anchor="middle" font-size="27" font-weight="800" fill="#fff" letter-spacing="1" font-family="Bricolage Grotesque,IBM Plex Sans,sans-serif">PARE</text>',
  bus: () => '<rect x="-46" y="-46" width="92" height="92" rx="12" fill="#1F5FA8" stroke="#fff" stroke-width="4"/>' +
    '<rect x="-25" y="-30" width="50" height="50" rx="8" fill="#fff"/><rect x="-19" y="-23" width="38" height="18" rx="3" fill="#1F5FA8"/>' +
    '<rect x="-19" y="4" width="8" height="5" rx="2" fill="#1F5FA8"/><rect x="11" y="4" width="8" height="5" rx="2" fill="#1F5FA8"/>' +
    '<rect x="-22" y="19" width="10" height="11" rx="3" fill="#fff"/><rect x="12" y="19" width="10" height="11" rx="3" fill="#fff"/>',
  bano: () => '<rect x="-46" y="-46" width="92" height="92" rx="12" fill="#2E6FB5" stroke="#fff" stroke-width="4"/>' +
    '<line x1="0" y1="-32" x2="0" y2="34" stroke="#fff" stroke-width="3"/>' +
    '<circle cx="-21" cy="-24" r="7" fill="#fff"/><rect x="-30" y="-14" width="18" height="24" rx="5" fill="#fff"/><rect x="-28" y="8" width="6" height="24" rx="3" fill="#fff"/><rect x="-20" y="8" width="6" height="24" rx="3" fill="#fff"/>' +
    '<circle cx="21" cy="-24" r="7" fill="#fff"/><path d="M21-15 34 14H8z" fill="#fff" stroke="#fff" stroke-width="4" stroke-linejoin="round"/><rect x="14" y="12" width="5" height="20" rx="2.5" fill="#fff"/><rect x="23" y="12" width="5" height="20" rx="2.5" fill="#fff"/>',
  semaforo: () => '<rect x="-22" y="-50" width="44" height="100" rx="12" fill="#1B242C" stroke="#56636F" stroke-width="3"/>' +
    '<circle class="sc-sg-l sc-sg-r" cy="-29" r="11" fill="#E0463C"/><circle class="sc-sg-l sc-sg-y" cy="0" r="11" fill="#F2B233"/><circle class="sc-sg-l sc-sg-g" cy="29" r="11" fill="#35C26B"/>',
  mano: () => '<circle r="46" fill="#F4F7FA" stroke="#4FC3C1" stroke-width="4"/>' +
    '<g class="sc-sg-wave" fill="#E3A77E" stroke="#8C5A3C" stroke-width="2.2" stroke-linejoin="round">' +
    '<rect x="-17" y="-34" width="9" height="34" rx="4.5"/><rect x="-7" y="-39" width="9" height="39" rx="4.5"/><rect x="3" y="-37" width="9" height="37" rx="4.5"/><rect x="13" y="-30" width="8.5" height="30" rx="4.25"/>' +
    '<path d="M-19-6h41v16c0 12-9 22-21 22s-20-9-20-20z"/><rect x="-33" y="-10" width="9" height="26" rx="4.5" transform="rotate(-38 -28 3)"/></g>',
  flecha: () => '<rect x="-48" y="-34" width="96" height="68" rx="10" fill="#2F7D32" stroke="#fff" stroke-width="4"/><path d="M-30-7h28v-15l30 22-30 22V7h-28z" fill="#fff"/>',
  prohibido: () => '<circle r="46" fill="#fff"/><g transform="rotate(-8)"><rect x="-28" y="-6" width="46" height="12" fill="#E8E2D6" stroke="#333" stroke-width="2"/><rect x="18" y="-6" width="10" height="12" fill="#E07A2E"/>' +
    '<path d="M-28-14c-6-8 4-12-1-20" fill="none" stroke="#777" stroke-width="3" stroke-linecap="round"/></g>' +
    '<circle r="41" fill="none" stroke="#C8302A" stroke-width="10"/><line x1="-29" y1="-29" x2="29" y2="29" stroke="#C8302A" stroke-width="10"/>',
  wifi: () => '<rect x="-46" y="-46" width="92" height="92" rx="46" fill="#243B55" stroke="#7FB2EA" stroke-width="4"/>' +
    '<g fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"><path d="M-30-6a43 43 0 0 1 60 0"/><path d="M-19 6a27 27 0 0 1 38 0"/><path d="M-8 17a11 11 0 0 1 16 0"/></g><circle cy="27" r="5" fill="#fff"/>',
  cruce: () => '<path d="M0-52 52 0 0 52-52 0z" fill="#F2C230" stroke="#1B1B1B" stroke-width="4" stroke-linejoin="round"/>' +
    '<g fill="#1B1B1B"><circle cx="3" cy="-25" r="6.5"/><path d="M-1-16h9l6 16 9 5-2 5-12-6-3-6-3 13 10 12-5 4-12-14-5 16h-6l7-26 1-10-7 6-2 9-5-1 3-12z"/></g>',
  basura: () => '<rect x="-46" y="-46" width="92" height="92" rx="12" fill="#2F7D32" stroke="#fff" stroke-width="4"/>' +
    '<path d="M-17-17h34l-4 44h-26z" fill="#fff"/><rect x="-22" y="-26" width="44" height="7" rx="3" fill="#fff"/><rect x="-7" y="-32" width="14" height="6" rx="2" fill="#fff"/>' +
    '<g stroke="#2F7D32" stroke-width="3" stroke-linecap="round"><line x1="-7" y1="-9" x2="-6" y2="19"/><line x1="0" y1="-9" x2="0" y2="19"/><line x1="7" y1="-9" x2="6" y2="19"/></g>',
};
const ICW = { semaforo: 0.5, flecha: 1, texto: 1.5 };

/** letrero con palabras (tipo "texto"): tablero ancho con el rótulo */
function textBoard(label) {
  const t = String(label || 'Texto');
  const words = t.split(/\s+/);
  let lines = [t];
  if (t.length > 11 && words.length > 1) { let best = 1, bd = 1e9; for (let i = 1; i < words.length; i++) { const a = words.slice(0, i).join(' ').length, b = words.slice(i).join(' ').length; if (Math.abs(a - b) < bd) { bd = Math.abs(a - b); best = i; } } lines = [words.slice(0, best).join(' '), words.slice(best).join(' ')]; }
  const longest = Math.max(...lines.map((l) => l.length));
  const fs = clamp(128 / Math.max(4, longest), 12, 26) * (lines.length > 1 ? 0.95 : 1);
  const lh = fs * 1.12, y0 = -((lines.length - 1) * lh) / 2 + fs * 0.36;
  return '<rect x="-73" y="-36" width="146" height="72" rx="8" fill="#F6EFDF" stroke="#8A5A2B" stroke-width="5"/>' +
    '<rect x="-66" y="-29" width="132" height="58" rx="4" fill="none" stroke="#C9B48E" stroke-width="1.5"/>' +
    lines.map((l, i) => '<text y="' + (y0 + i * lh).toFixed(1) + '" text-anchor="middle" font-size="' + fs.toFixed(1) + '" font-weight="700" fill="#2A2018" font-family="Literata,Georgia,serif">' + esc(l) + '</text>').join('');
}

function iconSvg(it) {
  if (it.icon === 'texto' || !ICON[it.icon]) return textBoard(it.icon === 'texto' || !it.icon ? it.label : it.label);
  return ICON[it.icon]();
}

/* ---------- decorado de la ciudad ---------- */
function rnd(seed) { let s = seed; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
function skyline(W, gy) {
  const r = rnd(7);
  let back = '', front = '', win = '';
  for (let x = -20; x < W + 20;) { const w = 34 + r() * 50, h = 40 + r() * 70; back += '<rect x="' + x.toFixed(0) + '" y="' + (gy - h - 30).toFixed(0) + '" width="' + w.toFixed(0) + '" height="' + (h + 30) + '" fill="#18242F"/>'; x += w + 2; }
  for (let x = -10; x < W + 20;) {
    const w = 40 + r() * 46, h = 30 + r() * 60, y = gy - h;
    front += '<rect x="' + x.toFixed(0) + '" y="' + y.toFixed(0) + '" width="' + w.toFixed(0) + '" height="' + h.toFixed(0) + '" fill="#1E2D3A"/>';
    for (let wy = y + 10; wy < gy - 12; wy += 14) for (let wx = x + 7; wx < x + w - 10; wx += 13) {
      const q = r();
      if (q < 0.3) win += '<rect class="' + (q < 0.07 ? 'sc-twinkle' : '') + '" style="--d:' + (3 + q * 30).toFixed(1) + 's;--dl:' + (-q * 20).toFixed(1) + 's" x="' + wx.toFixed(0) + '" y="' + wy.toFixed(0) + '" width="6" height="7" rx="1" fill="' + (q < 0.18 ? '#F2C66D' : '#8FB3D6') + '" opacity="' + (q < 0.18 ? 0.75 : 0.35) + '"/>';
    }
    x += w + 6 + r() * 14;
  }
  return back + front + win;
}

export default function (el) {
  const st = document.createElement('div');
  st.className = 'stage sc-stage sc-2d sc-signs' + (reduce ? ' sc-reduce' : '');
  el.appendChild(st);
  const tag = document.createElement('div'); tag.className = 'sc-tag'; tag.style.opacity = 0; st.appendChild(tag);
  const note = document.createElement('div'); note.className = 'legend sc-note sc-leg';
  note.innerHTML = '<span><i class="dot" style="background:' + KC.verbal + '"></i>Verbal: palabras</span><span><i class="dot" style="background:' + KC.noverbal + '"></i>No verbal: imagen, color, gesto</span>';
  el.appendChild(note);
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg'); svg.setAttribute('class', 'sc-sg-svg'); st.appendChild(svg);

  let S = null, W = 0, H = 0, L = null, key = '';

  function layout() {
    const items = (S && S.items) || [];
    const n = Math.max(1, items.length);
    const m = W < 420 ? 14 : 22, slot = (W - 2 * m) / n;
    const gy = Math.round(H * 0.72);
    const units = items.map((it) => (it.icon === 'texto' || !ICON[it.icon] ? ICW.texto : ICW[it.icon] || 1));
    const tot = units.reduce((a, b) => a + b, 0) || 1;
    let s = Math.min(H * 0.22, ((W - 2 * m) / (tot + n * 0.16)) * 0.98);
    s = clamp(s, 30, 78);
    // posiciones proporcionales al ancho de cada letrero
    const used = units.reduce((a, u) => a + u * s, 0), gap = (W - 2 * m - used) / n;
    let x = m + gap / 2;
    const P = items.map((it, i) => { const w = units[i] * s, cx = x + w / 2; x += w + gap; const top = gy - s * (1.55 + (i % 2) * 0.22) - (it.icon === 'semaforo' ? s * 0.1 : 0); return { cx, cy: top + s / 2, s, w, gy }; });
    return { m, slot, gy, P, showLabels: slot >= 44 };
  }

  function build() {
    const r = st.getBoundingClientRect(); W = Math.round(r.width); H = Math.round(r.height);
    if (!W || !H) return;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    L = layout();
    const { gy, P } = L;
    const items = S.items || [];
    let h = '<defs><linearGradient id="sc-sg-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#101C26"/><stop offset="1" stop-color="#1D2E3B"/></linearGradient>' +
      '<radialGradient id="sc-sg-lamp"><stop offset="0" stop-color="#F7D58A" stop-opacity=".35"/><stop offset="1" stop-color="#F7D58A" stop-opacity="0"/></radialGradient></defs>';
    h += '<g class="sc-sg-bg">' + '<rect x="-' + W + '" y="-' + H + '" width="' + W * 3 + '" height="' + H * 3 + '" fill="url(#sc-sg-sky)"/>' +
      '<circle cx="' + (W * 0.86) + '" cy="' + (H * 0.14) + '" r="' + (H * 0.045) + '" fill="#E9E4D0" opacity=".85"/>' +
      '<g class="sc-sg-cloud sc-drive" style="--d:70s;--x0:-' + (W * 0.3) + 'px;--x1:' + (W * 1.1) + 'px"><ellipse cx="0" cy="' + (H * 0.12) + '" rx="' + (W * 0.09) + '" ry="' + (H * 0.022) + '" fill="#2A3B49" opacity=".7"/></g>' +
      skyline(W, gy) + '</g>';
    // acera, calle y cebra
    h += '<g class="sc-sg-street"><rect x="-' + W + '" y="' + gy + '" width="' + W * 3 + '" height="' + (H * 0.07) + '" fill="#34444F"/>' +
      '<rect x="-' + W + '" y="' + (gy + H * 0.07) + '" width="' + W * 3 + '" height="3" fill="#56636F"/>' +
      '<rect x="-' + W + '" y="' + (gy + H * 0.07 + 3) + '" width="' + W * 3 + '" height="' + H + '" fill="#1A242C"/>';
    const ry = gy + H * 0.07 + 3, rh = H - ry, mid = ry + rh * 0.5;
    h += '<line x1="-' + W + '" x2="' + W * 2 + '" y1="' + mid + '" y2="' + mid + '" stroke="#C9A34A" stroke-width="2" stroke-dasharray="18 14" opacity=".7"/>';
    const zx = W * 0.5 - 30;
    for (let i = 0; i < 6; i++) h += '<rect x="' + (zx + i * 11) + '" y="' + (ry + 3) + '" width="6" height="' + (rh - 6) + '" fill="#E6ECF1" opacity=".13"/>';
    // carros
    const car = (c, dir, y, d, dl) => '<g class="sc-drive" style="--d:' + d + 's;--dl:' + dl + 's;--x0:' + (dir > 0 ? -80 : W + 80) + 'px;--x1:' + (dir > 0 ? W + 80 : -80) + 'px"><g transform="translate(0 ' + y + ') scale(' + dir + ' 1)">' +
      '<rect x="-26" y="-11" width="52" height="13" rx="5" fill="' + c + '"/><path d="M-15-11l6-8h17l8 8z" fill="' + c + '"/><path d="M-11-12l4-5h6v5zM1-12v-5h6l4 5z" fill="#9CC3E0" opacity=".7"/>' +
      '<circle cx="-15" cy="2" r="4.5" fill="#0B1116"/><circle cx="15" cy="2" r="4.5" fill="#0B1116"/><rect x="23" y="-8" width="4" height="4" rx="1" fill="#FFE8A8"/><path d="M27-7l24-5v12z" fill="#FFE8A8" opacity=".12"/></g></g>';
    h += car('#C0453A', 1, mid - rh * 0.12, 11, -2) + car('#E7B460', -1, mid + rh * 0.3, 14, -9) + car('#4F8FCF', 1, mid - rh * 0.12, 11, -7.5);
    h += '</g>';
    // letreros
    h += '<g class="sc-sg-items">';
    items.forEach((it, i) => {
      const p = P[i], k = it.kind === 'verbal' ? 'verbal' : 'noverbal', sc = p.s / 100;
      const bot = p.cy + p.s * (it.icon === 'semaforo' ? 0.5 : it.icon === 'flecha' ? 0.34 : (it.icon === 'texto' || !ICON[it.icon]) ? 0.36 : 0.46);
      h += '<g class="sc-sg-it" data-k="' + k + '" data-i="' + i + '" style="--dl:' + (0.08 * i).toFixed(2) + 's">' +
        '<ellipse cx="' + p.cx + '" cy="' + (p.gy + 3) + '" rx="' + (p.s * 0.28) + '" ry="3" fill="#000" opacity=".35"/>' +
        '<g class="sc-sg-grow">' +
        '<circle class="sc-sg-halo" cx="' + p.cx + '" cy="' + p.cy + '" r="' + (Math.max(p.w * 0.58, p.s * 0.72)) + '" fill="' + KC[k] + '"/>' +
        '<rect x="' + (p.cx - 2.5) + '" y="' + bot + '" width="5" height="' + (p.gy - bot) + '" rx="2" fill="#7D8B96"/>' +
        '<rect x="' + (p.cx - 5) + '" y="' + (p.gy - 4) + '" width="10" height="5" rx="1.5" fill="#56636F"/>' +
        '<g transform="translate(' + p.cx.toFixed(1) + ' ' + p.cy.toFixed(1) + ') scale(' + sc.toFixed(3) + ')">' + iconSvg(it) + '</g>' +
        '<circle class="sc-sg-kd" cx="' + p.cx + '" cy="' + (p.gy + H * 0.035) + '" r="4.5" fill="' + KC[k] + '"/>' +
        '</g>' +
        (L.showLabels ? '<text class="sc-t sc-m sc-sg-lb" x="' + p.cx + '" y="' + (p.gy + H * 0.07 + 17 + (items.length > 3 ? (i % 2) * 16 : 0)) + '" text-anchor="middle" font-size="' + (W < 480 ? 11 : 12) + '">' + esc(short(it.label, Math.max(6, Math.floor((items.length > 3 ? 2 : 1) * L.slot / (W < 480 ? 6.4 : 7))))) + '</text>' : '') +
        '</g>';
    });
    h += '</g>';
    h += '<g class="sc-sg-call" style="opacity:0"></g>';
    svg.innerHTML = '<g class="sc-sg-world">' + h.replace('<g class="sc-sg-call" style="opacity:0"></g>', '') + '</g><g class="sc-sg-call" style="opacity:0"></g>';
    // la capa de fondo se mueve menos (paralaje)
    const world = svg.querySelector('.sc-sg-world');
    const bg = world.querySelector('.sc-sg-bg');
    world.removeChild(bg); svg.insertBefore(bg, world);
    // rótulos: acortar si no caben y mantenerlos dentro del escenario
    const maxL = (items.length > 3 ? 2 : 1) * L.slot - 8;
    svg.querySelectorAll('.sc-sg-lb').forEach((t) => {
      if (!t.getComputedTextLength) return;
      let txt = t.textContent, len = t.getComputedTextLength();
      while (len > maxL && txt.length > 4) { txt = txt.slice(0, -2) + '…'; t.textContent = txt; len = t.getComputedTextLength(); }
      const x = +t.getAttribute('x');
      if (x - len / 2 < 4) t.setAttribute('x', (4 + len / 2).toFixed(1));
      if (x + len / 2 > W - 4) t.setAttribute('x', (W - 4 - len / 2).toFixed(1));
    });
  }
  const short = (s, n) => { s = String(s || ''); return s.length > n ? s.slice(0, n - 1) + '…' : s; };

  function apply(anim) {
    if (!L) return;
    const items = S.items || [];
    const hl = S.highlight === 'verbal' || S.highlight === 'noverbal' ? S.highlight : null;
    const pick = S.pick != null && items[S.pick] ? +S.pick : null;
    st.classList.toggle('sc-now', !anim);
    svg.querySelectorAll('.sc-sg-it').forEach((g) => {
      const k = g.dataset.k, i = +g.dataset.i;
      const off = (hl && k !== hl) || (pick != null && i !== pick);
      g.classList.toggle('sc-off', off);
      g.classList.toggle('sc-on', (hl && k === hl && pick == null) || i === pick);
    });
    // zoom
    const world = svg.querySelector('.sc-sg-world'), bg = svg.querySelector('.sc-sg-bg'), call = svg.querySelector('.sc-sg-call');
    let k = 1, tx = 0, ty = 0;
    if (pick != null) {
      const p = L.P[pick], target = Math.min(H * 0.5, W * 0.36);
      k = clamp(target / Math.max(p.s, p.w * 0.75), 1.3, 2.6);
      const fx = W * (W < 420 ? 0.3 : 0.33), fy = H * 0.47;
      tx = fx - p.cx * k; ty = fy - p.cy * k;
      const it = items[pick], kind = it.kind === 'verbal' ? 'verbal' : 'noverbal';
      const cx = fx + Math.max(p.w, p.s) * k * 0.5 + 14, cw = Math.max(0, W - cx - 12);
      const fs = W < 420 ? 16 : 19, lab = String(it.label || '');
      // parte el rótulo en dos líneas si no cabe
      const maxc = Math.max(6, Math.floor(cw / (fs * 0.62)));
      let lines = [lab];
      if (lab.length > maxc) { const ws = lab.split(' '); lines = ['']; ws.forEach((w) => { const cur = lines[lines.length - 1]; if ((cur + ' ' + w).trim().length > maxc && cur) lines.push(w); else lines[lines.length - 1] = (cur + ' ' + w).trim(); }); lines = lines.slice(0, 3); }
      const bh = 34 + lines.length * fs * 1.2 + 8, by = fy - bh / 2;
      call.innerHTML = '<g class="sc-sg-cin"><rect x="' + cx + '" y="' + by + '" width="' + cw + '" height="' + bh + '" rx="10" fill="rgba(11,17,22,.82)" stroke="' + KC[kind] + '" stroke-width="1.5"/>' +
        '<path d="M' + (cx - 8) + ' ' + fy + 'l9-7v14z" fill="' + KC[kind] + '"/>' +
        '<rect x="' + (cx + 10) + '" y="' + (by + 10) + '" width="' + (kind === 'verbal' ? 56 : 72) + '" height="18" rx="9" fill="' + KC[kind] + '"/>' +
        '<text x="' + (cx + 10 + (kind === 'verbal' ? 28 : 36)) + '" y="' + (by + 23) + '" text-anchor="middle" font-size="11" font-weight="700" fill="#10181F">' + KN[kind] + '</text>' +
        lines.map((l, j) => '<text class="sc-sg-cl" x="' + (cx + 11) + '" y="' + (by + 34 + (j + 0.9) * fs * 1.2) + '" font-size="' + fs + '" font-weight="700" fill="#fff" font-family="Bricolage Grotesque,IBM Plex Sans,sans-serif">' + esc(l) + '</text>').join('') + '</g>';
      call.querySelectorAll('.sc-sg-cl').forEach((t) => { const len = t.getComputedTextLength ? t.getComputedTextLength() : 0, mw = cw - 22; if (len > mw) t.setAttribute('font-size', (fs * mw / len).toFixed(1)); });
      call.style.opacity = 1;
    } else { call.style.opacity = 0; }
    world.style.transform = 'translate(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px) scale(' + k.toFixed(3) + ')';
    const kb = 1 + (k - 1) * 0.35;
    const cx0 = pick != null ? L.P[pick].cx : W / 2, cy0 = pick != null ? L.P[pick].cy : H / 2;
    bg.style.transform = pick != null ? 'translate(' + ((W * 0.33 - cx0 * kb) * 0.6).toFixed(1) + 'px,' + ((H * 0.47 - cy0 * kb) * 0.6).toFixed(1) + 'px) scale(' + kb.toFixed(3) + ')' : 'none';
    // etiqueta superior
    const t = pick != null ? 'Signo ' + (pick + 1) + ' de ' + items.length : hl ? 'Signos ' + (hl === 'verbal' ? 'verbales' : 'no verbales') + ': ' + KD[hl] : 'Ciudad de signos';
    tag.textContent = t; tag.style.opacity = 1;
    if (!anim) { void st.offsetWidth; st.classList.remove('sc-now'); }
  }

  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => { const r = st.getBoundingClientRect(); if (S && (Math.round(r.width) !== W || Math.round(r.height) !== H)) { build(); apply(false); } }) : null;
  if (ro) ro.observe(st);

  return {
    set(state) {
      const nk = JSON.stringify(state.items || []);
      const first = !S;
      S = state;
      if (nk !== key || first) { key = nk; build(); svg.classList.remove('sc-sg-enter'); void svg.getBoundingClientRect(); svg.classList.add('sc-sg-enter'); apply(false); }
      else apply(true);
    },
    dispose() { if (ro) ro.disconnect(); st.remove(); note.remove(); },
  };
}
