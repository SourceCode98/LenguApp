// Escena 2D "dialect": mapa del habla (ver lib/SPEC.md).
// Mapa ESQUEMÁTICO de Colombia (trazos simplificados a mano, no cartografía oficial) con regiones y globos de palabras.
// 'andina' agrupa las subregiones andinas que no traigan su propia entrada (paisa, valle, santanderes, bogota, sur andino).
import { esc, reduce } from '../kit.js';

const NS = 'http://www.w3.org/2000/svg';
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

// Contorno aproximado (longitud, latitud)
const OUTLINE = [[-71.67, 12.46], [-71.25, 12.35], [-71.12, 12.05], [-71.33, 11.84], [-72.22, 11.12], [-72.9, 10.45], [-73.25, 9.6], [-72.95, 9.1], [-72.75, 8.95], [-72.4, 8.4], [-72.45, 7.95], [-72.45, 7.45], [-72.0, 7.05], [-71.2, 7.0], [-70.3, 7.0], [-69.4, 6.1], [-68.6, 6.2], [-67.45, 6.2], [-67.65, 5.6], [-67.85, 4.9], [-67.8, 4.3], [-67.35, 3.5], [-67.6, 2.8], [-67.2, 2.3], [-66.87, 1.22], [-67.5, 1.95], [-68.2, 1.8], [-69.3, 1.75], [-69.85, 1.1], [-69.25, 0.6], [-69.35, -0.2], [-69.5, -1.15], [-69.95, -4.22], [-70.7, -3.8], [-70.1, -2.3], [-71.8, -2.2], [-72.9, -2.45], [-73.6, -1.3], [-74.4, -0.5], [-74.8, -0.2], [-75.6, 0.05], [-76.1, 0.25], [-77.0, 0.35], [-77.5, 0.75], [-78.0, 1.05], [-78.85, 1.45], [-78.7, 1.8], [-78.55, 2.35], [-77.95, 2.65], [-77.6, 3.2], [-77.25, 3.8], [-77.45, 4.15], [-77.35, 4.9], [-77.55, 5.6], [-77.35, 6.25], [-77.6, 6.8], [-77.9, 7.23], [-77.75, 7.7], [-77.35, 8.67], [-77.05, 8.3], [-76.95, 7.95], [-76.75, 7.95], [-76.78, 8.4], [-76.45, 8.85], [-76.0, 9.35], [-75.65, 9.8], [-75.55, 10.4], [-75.25, 10.8], [-74.85, 11.1], [-74.2, 11.25], [-73.6, 11.28], [-72.9, 11.6], [-72.3, 11.85], [-71.95, 12.2]];
const V = {
  P1: [-77.3, 8.3], P2: [-76.3, 7.9], P3: [-75.0, 7.8], P4: [-74.0, 7.2], P5: [-73.6, 8.2], P6: [-73.1, 9.1],
  P7: [-76.8, 7.3], P8: [-76.4, 6.2], P9: [-76.3, 5.0], P10: [-76.6, 3.9], P11: [-77.1, 2.9], P12: [-77.5, 2.0], P13: [-77.9, 1.2],
  Q1: [-74.6, 6.1], Q2: [-74.9, 5.2], Q3: [-75.5, 4.4], Q4: [-75.9, 4.5],
  R1: [-72.3, 6.9], R2: [-72.8, 5.6], R3: [-73.5, 5.8], R4: [-73.1, 4.9], R5: [-73.7, 4.0], R5b: [-74.4, 3.8], R6: [-74.3, 3.3], R7: [-74.8, 4.3],
  T1: [-75.8, 3.2], T2: [-76.1, 2.1], U1: [-75.0, 2.3], U2: [-75.9, 1.4], T4: [-76.9, 0.5],
  G1: [-73.0, 2.9], G2: [-70.5, 3.1], G3: [-68.5, 3.7],
};
const BASE = {
  caribe: [[-81, 13.5], [-69.8, 13.5], [-69.8, 9.3], 'P6', 'P5', 'P4', 'P3', 'P2', 'P1', [-78.6, 9.0], [-81, 9.0]],
  pacifica: [[-78.6, 9.0], 'P1', 'P7', 'P8', 'P9', 'P10', 'P11', 'P12', 'P13', [-78.4, 0.5], [-81, 0.5], [-81, 9.0]],
  paisa: ['P1', 'P2', 'P3', 'P4', 'Q1', 'Q2', 'Q3', 'Q4', 'P9', 'P8', 'P7'],
  santanderes: ['P4', 'P5', 'P6', [-69.8, 9.3], [-69.8, 7.1], 'R1', 'R3', 'Q1'],
  bogota: ['Q1', 'R3', 'R1', 'R2', 'R4', 'R5', 'R5b', 'R7', 'Q2'],
  surandino: ['Q2', 'R7', 'R5b', 'R5', 'R6', 'U1', 'U2', 'T2', 'T1', 'Q3'],
  valle: ['P9', 'Q4', 'Q3', 'T1', 'T2', 'U2', 'T4', [-77.6, -0.3], [-78.4, 0.5], 'P13', 'P12', 'P11', 'P10'],
  orinoquia: ['R1', [-69.8, 7.1], [-65, 7.1], [-65, 4.0], 'G3', 'G2', 'G1', 'R6', 'R5', 'R4', 'R2'],
  amazonia: ['R6', 'G1', 'G2', 'G3', [-65, 4.0], [-65, -5], [-78, -5], [-77.6, -0.3], 'T4', 'U2', 'U1'],
};
const ANDEAN = ['paisa', 'valle', 'santanderes', 'bogota', 'surandino'];
const ANCHOR = { caribe: [-74.7, 9.9], pacifica: [-77.0, 5.4], paisa: [-75.6, 6.6], santanderes: [-73.3, 7.4], bogota: [-73.9, 5.0], surandino: [-75.2, 3.0], valle: [-76.3, 3.3], orinoquia: [-70.6, 5.0], amazonia: [-71.6, 0.3], andina: [-74.9, 5.1] };
const COL = { caribe: '#F2A65A', pacifica: '#4FC3C1', paisa: '#AE98EA', santanderes: '#D98BB8', bogota: '#7FB2EA', surandino: '#8FB3D6', valle: '#F0897F', orinoquia: '#E7B460', amazonia: '#6FD19A', andina: '#9C8CE0' };
const LON0 = -79.1, LON1 = -66.7, LAT0 = 12.6, LAT1 = -4.35;

export default function (el) {
  const st = document.createElement('div');
  st.className = 'stage sc-stage sc-2d sc-dialect' + (reduce ? ' sc-reduce' : '');
  el.appendChild(st);
  const tag = document.createElement('div'); tag.className = 'sc-tag'; st.appendChild(tag);
  const svg = document.createElementNS(NS, 'svg'); st.appendChild(svg);
  let S = null, W = 0, H = 0, key = '', M = null;

  function build() {
    const r = st.getBoundingClientRect(); W = Math.round(r.width); H = Math.round(r.height);
    if (!W || !H) return;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    const regs = (S.regions || []).filter((g) => g && (BASE[g.id] || g.id === 'andina'));
    const narrow = W < 480;
    // escala del mapa
    const mh = H - 34, s = Math.min(mh / (LAT0 - LAT1), (W * (narrow ? 0.5 : 0.52)) / (LON1 - LON0));
    const mw = s * (LON1 - LON0);
    const ox = (W - mw) / 2 + (narrow ? 0 : 0), oy = 26 + (mh - s * (LAT0 - LAT1)) / 2;
    const P = ([lo, la]) => [ox + (lo - LON0) * s, oy + (LAT0 - la) * s];
    const pts = (arr) => arr.map((v) => P(typeof v === 'string' ? V[v] : v));
    const d = (arr) => 'M' + pts(arr).map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('L') + 'Z';
    // asignación de subregiones a entradas
    const owner = {};
    regs.forEach((g, i) => { if (BASE[g.id]) owner[g.id] = i; });
    const andIx = regs.findIndex((g) => g.id === 'andina');
    if (andIx >= 0) ANDEAN.forEach((b) => { if (owner[b] == null) owner[b] = andIx; });
    const colOf = (i) => { const g = regs[i]; return g && (g.c || COL[g.id]) || '#8FB3D6'; };
    let h = '<defs><clipPath id="sc-dl-clip"><path d="' + d(OUTLINE) + '"/></clipPath>' +
      '<filter id="sc-dl-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>';
    // mar: ondas suaves
    const wv = (x, y, w) => '<path class="sc-dl-wave" d="M' + x + ' ' + y + 'q' + w / 4 + ' -4 ' + w / 2 + ' 0t' + w / 2 + ' 0" style="--dl:' + ((x * 7 + y) % 5 / 2).toFixed(1) + 's"/>';
    const [cx1, cy1] = P([-77.8, 11.3]), [px1, py1] = P([-78.7, 4.3]);
    h += '<g class="sc-dl-sea">' + wv(cx1, cy1, 26) + wv(cx1 + 20, cy1 + 12, 22) + wv(px1 - 16, py1, 24) + wv(px1 - 4, py1 + 14, 20) + '</g>';
    if (!narrow) {
      h += '<text class="sc-dl-sea-t" x="' + P([-76.9, 12.1])[0] + '" y="' + P([-76.9, 12.1])[1] + '" text-anchor="middle">Mar Caribe</text>';
      h += '<text class="sc-dl-sea-t" transform="translate(' + P([-79.0, 3.6]).join(' ') + ') rotate(-68)" text-anchor="middle">Océano Pacífico</text>';
    }
    // sombra del país
    h += '<path d="' + d(OUTLINE) + '" fill="#0A1015" transform="translate(3 4)" opacity=".55"/>';
    h += '<g clip-path="url(#sc-dl-clip)">';
    Object.keys(BASE).forEach((b) => {
      const o = owner[b];
      const c = o != null ? colOf(o) : '#3A4854';
      h += '<path class="sc-dl-reg' + (o != null ? ' sc-dl-has' : '') + '" data-b="' + b + '" data-o="' + (o != null ? o : '') + '" d="' + d(BASE[b]) + '" style="--c:' + c + '"/>';
    });
    h += '</g>';
    h += '<path d="' + d(OUTLINE) + '" fill="none" stroke="#C9D4DC" stroke-width="1.6" stroke-linejoin="round" opacity=".8"/>';
    // capital
    const [bx, by] = P([-74.08, 4.6]);
    h += '<circle cx="' + bx + '" cy="' + by + '" r="2.8" fill="#fff" stroke="#0B1116" stroke-width="1.2"/>';
    // rosa de los vientos
    const [nx, ny] = [W - 22, H - 44];
    h += '<g class="sc-dl-n" transform="translate(' + nx + ' ' + ny + ')"><path d="M0-13 4 0 0-3-4 0z" fill="#E6ECF1"/><path d="M0 13 4 0 0 3-4 0z" fill="#56636F"/><text y="-17" text-anchor="middle" font-size="10" fill="#9AA8B3" font-weight="700">N</text></g>';
    h += '<text class="sc-dl-esq" x="' + (W - 10) + '" y="' + (H - 9) + '" text-anchor="end">Mapa esquemático</text>';
    // globos: columna izquierda (occidente) y derecha (oriente)
    const fs = narrow ? 12 : 13.5, pad = 7, lh = fs * 1.25;
    const showName = !narrow;
    const B = regs.map((g, i) => {
      const an = ANCHOR[g.id] || ANCHOR.andina;
      // anclar al centro de la subregión propia; si es 'andina', a su ancla
      const [ax, ay] = P(an);
      const ws = (g.words || []).slice(0, 3);
      const nm = String(g.n || '');
      const tw = Math.max(...ws.map((w) => w.length * fs * 0.56), showName ? Math.min(nm.length, 22) * 10.5 * 0.56 : 0, 30) + pad * 2;
      const bh = ws.length * lh + pad * 2 - 2 + (showName ? 15 : 0);
      return { i, g, ax, ay, ws, nm, w: tw, h: bh, left: an[0] < -74.95 };
    });
    const colW = Math.max(60, ox + mw * 0.12 - 10);
    const place = (arr, left) => {
      arr.sort((a, b) => a.ay - b.ay);
      const top = 30, bot = H - 10;
      let y = top;
      arr.forEach((b) => { b.w = Math.min(b.w, left ? ox + mw * 0.3 - 8 : W - (ox + mw * 0.7) - 8); b.y = Math.max(y, Math.min(b.ay - b.h / 2, bot - b.h)); y = b.y + b.h + 8; });
      // si se salen por abajo, empuja hacia arriba
      let over = arr.length ? arr[arr.length - 1].y + arr[arr.length - 1].h - bot : 0;
      for (let k = arr.length - 1; k >= 0 && over > 0; k--) { const b = arr[k]; b.y -= over; const prevB = arr[k - 1]; over = prevB ? prevB.y + prevB.h + 8 - b.y : 0; }
      arr.forEach((b) => { b.x = left ? 8 : W - 8 - b.w; });
    };
    const Lf = B.filter((b) => b.left), Rt = B.filter((b) => !b.left);
    // equilibra si un lado queda muy lleno
    while (Lf.length > Rt.length + 2) Rt.push(Lf.pop());
    while (Rt.length > Lf.length + 2) { Rt.sort((a, b) => a.ax - b.ax); Lf.push(Rt.shift()); }
    place(Lf, true); place(Rt, false);
    B.forEach((b) => { b.left = Lf.indexOf(b) >= 0; });
    h += '<g class="sc-dl-balloons">';
    B.forEach((b) => {
      const c = colOf(b.i);
      const ex = b.left ? b.x + b.w : b.x, ey = b.y + b.h / 2;
      h += '<g class="sc-dl-b" data-o="' + b.i + '" style="--c:' + c + ';--dl:' + (0.15 + b.i * 0.12).toFixed(2) + 's">' +
        '<path class="sc-dl-lead" pathLength="100" d="M' + ex.toFixed(1) + ' ' + ey.toFixed(1) + 'C' + ((ex + b.ax) / 2).toFixed(1) + ' ' + ey.toFixed(1) + ' ' + ((ex + b.ax) / 2).toFixed(1) + ' ' + b.ay.toFixed(1) + ' ' + b.ax.toFixed(1) + ' ' + b.ay.toFixed(1) + '"/>' +
        '<circle class="sc-dl-pin" cx="' + b.ax.toFixed(1) + '" cy="' + b.ay.toFixed(1) + '" r="4"/>' +
        '<circle class="sc-dl-ring" cx="' + b.ax.toFixed(1) + '" cy="' + b.ay.toFixed(1) + '" r="4"/>' +
        '<g class="sc-dl-bub sc-bob" style="--d:' + (2.6 + (b.i % 3) * 0.5) + 's;--dl:' + (-b.i * 0.7) + 's;--dy:-3px"><g class="sc-dl-pop">' +
        '<rect x="' + b.x.toFixed(1) + '" y="' + b.y.toFixed(1) + '" width="' + b.w.toFixed(1) + '" height="' + b.h.toFixed(1) + '" rx="9"/>' +
        (showName ? '<text class="sc-dl-nm" x="' + (b.x + pad) + '" y="' + (b.y + pad + 9) + '">' + esc(b.nm.length > 22 ? b.nm.slice(0, 21) + '…' : b.nm) + '</text>' : '') +
        b.ws.map((w, j) => '<text class="sc-dl-w" x="' + (b.x + pad) + '" y="' + (b.y + pad + (showName ? 15 : 0) + (j + 0.78) * lh).toFixed(1) + '" font-size="' + fs + '">' + esc(w) + '</text>').join('') +
        '</g></g></g>';
    });
    h += '</g>';
    svg.innerHTML = h;
    // reduce texto de globo si no cabe
    svg.querySelectorAll('.sc-dl-b').forEach((g) => {
      const rect = g.querySelector('rect'), maxw = +rect.getAttribute('width') - pad * 2;
      g.querySelectorAll('text').forEach((t) => { const l = t.getComputedTextLength ? t.getComputedTextLength() : 0; if (l > maxw) t.setAttribute('textLength', maxw), t.setAttribute('lengthAdjust', 'spacingAndGlyphs'); });
    });
    M = { regs, owner };
  }

  function apply(anim) {
    if (!M) return;
    const fid = S.focus;
    const fi = fid != null ? M.regs.findIndex((g) => g.id === fid) : -1;
    st.classList.toggle('sc-now', !anim);
    svg.classList.toggle('sc-dl-focus', fi >= 0);
    svg.querySelectorAll('.sc-dl-reg').forEach((p) => { const o = p.dataset.o === '' ? -1 : +p.dataset.o; p.classList.toggle('sc-on', o === fi && fi >= 0); });
    svg.querySelectorAll('.sc-dl-b').forEach((g) => { const o = +g.dataset.o; g.classList.toggle('sc-on', o === fi); g.classList.toggle('sc-off', fi >= 0 && o !== fi); });
    // sube el globo enfocado al frente
    const on = svg.querySelector('.sc-dl-b.sc-on'); if (on) on.parentNode.appendChild(on);
    tag.textContent = fi >= 0 ? M.regs[fi].n || 'Región' : 'Habla de Colombia · ' + M.regs.length + (M.regs.length === 1 ? ' región' : ' regiones');
    if (!anim) { void st.offsetWidth; st.classList.remove('sc-now'); }
  }

  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => { const r = st.getBoundingClientRect(); if (S && (Math.round(r.width) !== W || Math.round(r.height) !== H)) { build(); apply(false); } }) : null;
  if (ro) ro.observe(st);
  let alive = true;
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (alive && S) { build(); apply(false); } });

  return {
    set(state) {
      const first = !S; S = state;
      const k = JSON.stringify(state.regions || []);
      if (first || k !== key) { key = k; build(); svg.classList.remove('sc-dl-enter'); void svg.getBoundingClientRect(); svg.classList.add('sc-dl-enter'); apply(false); }
      else apply(true);
    },
    dispose() { alive = false; if (ro) ro.disconnect(); st.remove(); },
  };
}
