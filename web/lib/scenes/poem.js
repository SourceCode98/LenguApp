// Escena 2D "poem": el poema por dentro (ver lib/SPEC.md).
// Versos como filas. show: 'text' | 'syl' (barras de sílabas métricas) | 'rhyme' (hilos entre versos que riman) | 'stanza' (estrofas).
// Extra opcional: hl = índice de verso para resaltar.
import { esc, reduce } from '../kit.js';

const NS = 'http://www.w3.org/2000/svg';
const RC = ['#F2A65A', '#7FB2EA', '#6FD19A', '#AE98EA', '#F0897F', '#E7B460', '#4FC3C1', '#D98BB8'];
const SC = ['#4FC3C1', '#7FB2EA', '#AE98EA', '#E7B460', '#6FD19A', '#F2A65A', '#F0897F', '#D98BB8'];
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const SERIF = 'Literata, Georgia, "Times New Roman", serif';
let mctx = null;
const measure = (t, fs, w) => { if (!mctx) mctx = document.createElement('canvas').getContext('2d'); mctx.font = (w || 400) + ' ' + fs + 'px ' + SERIF; return mctx.measureText(t).width; };

/** separa el verso en [inicio, última palabra, puntuación final] */
function splitLast(t) {
  const m = /^(.*?)([A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)([^A-Za-zÁÉÍÓÚÜÑáéíóúüñ]*)$/.exec(String(t));
  return m ? [m[1], m[2], m[3]] : [String(t), '', ''];
}

export default function (el) {
  const st = document.createElement('div');
  st.className = 'stage sc-stage sc-2d sc-poem' + (reduce ? ' sc-reduce' : '');
  el.appendChild(st);
  const tag = document.createElement('div'); tag.className = 'sc-tag'; st.appendChild(tag);
  const svg = document.createElementNS(NS, 'svg'); svg.setAttribute('class', 'sc-pm-svg'); st.appendChild(svg);
  const note = document.createElement('div'); note.className = 'legend sc-note sc-leg'; el.appendChild(note);

  let S = null, W = 0, H = 0, key = '', G = null;

  function geom() {
    const lines = S.lines || [];
    const n = Math.max(1, lines.length);
    const stz = stanzas(n);
    const narrow = W < 480;
    const top = 40, bot = 16;
    const gapN = stz.length - 1;
    const lh = clamp((H - top - bot - gapN * 12) / n, 18, 38);
    const maxSyl = Math.max(8, ...lines.map((l) => +l.syl || 0));
    // columna derecha reservada para barras / hilos
    const right = Math.max(narrow ? 128 : 170, W * 0.36);
    const ml = 18, indent = 30;
    let fs = clamp(lh * 0.56, 11, narrow ? 17 : 20);
    const avail = W - right - ml - indent - 8;
    const widest = () => Math.max(...lines.map((l) => measure(l.t || '', fs)));
    while (fs > 10.5 && widest() > avail) fs -= 0.5;
    const tw = Math.min(avail, widest());
    return { n, stz, lh, fs, ml, indent, tw, top, maxSyl, right, narrow };
  }
  function stanzas(n) {
    let s = Array.isArray(S.stanzas) && S.stanzas.length ? S.stanzas.map((x) => Math.max(1, +x || 1)) : [n];
    const tot = s.reduce((a, b) => a + b, 0);
    if (tot < n) s = s.concat([n - tot]);
    const out = []; let i = 0;
    s.forEach((c) => { if (i < n) { out.push([i, Math.min(n, i + c) - 1]); i += c; } });
    return out;
  }
  function ys(g, mode) {
    const gap = mode === 'stanza' ? g.lh * 0.75 : 0;
    const total = g.n * g.lh + (g.stz.length - 1) * gap;
    const y0 = g.top + Math.max(0, (H - g.top - 14 - total) / 2);
    const Y = [];
    g.stz.forEach(([a, b], si) => { for (let i = a; i <= b; i++) Y[i] = y0 + i * g.lh + si * gap + g.lh / 2; });
    return Y;
  }

  let G0 = null;
  function build(again) {
    const r = st.getBoundingClientRect(); W = Math.round(r.width); H = Math.round(r.height);
    if (!W || !H) return;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    G = geom();
    if (again && G0) { G.fs = Math.max(10, G0); G.shrunk = true; } G0 = null;
    const lines = S.lines || [];
    const letters = [...new Set(lines.map((l) => String(l.rhyme || '').trim().toLowerCase()).filter((x) => x && x !== '-'))];
    G.letters = letters;
    let h = '<defs><linearGradient id="sc-pm-read" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7FB2EA" stop-opacity="0"/><stop offset=".5" stop-color="#7FB2EA" stop-opacity=".13"/><stop offset="1" stop-color="#7FB2EA" stop-opacity="0"/></linearGradient></defs>';
    // comillas decorativas y renglones tenues
    h += '<text x="' + (W - 18) + '" y="' + (H - 8) + '" text-anchor="end" font-size="' + Math.round(H * 0.42) + '" fill="#E6ECF1" opacity=".035" font-family="' + SERIF + '">”</text>';
    h += '<rect class="sc-pm-reader" x="0" y="-60" width="' + W + '" height="60" fill="url(#sc-pm-read)"/>';
    h += '<g class="sc-pm-brk"></g><g class="sc-pm-thr"></g>';
    const bx0 = W - G.right + 10, bw = G.right - 10 - 34, unit = bw / G.maxSyl;
    lines.forEach((l, i) => {
      const [a, w, p] = splitLast(l.t || '');
      const letter = String(l.rhyme || '').trim().toLowerCase();
      const li = letters.indexOf(letter), rc = li >= 0 ? RC[li % RC.length] : '#9AA8B3';
      const syl = +l.syl || 0;
      h += '<g class="sc-pm-row" data-i="' + i + '" style="--dl:' + (i * 0.06).toFixed(2) + 's">' +
        '<g class="sc-pm-ln"><text class="sc-pm-tx" y="' + (G.fs * 0.36).toFixed(1) + '" font-size="' + G.fs + '">' + esc(a) + '<tspan class="sc-pm-lw" style="--rc:' + (li < 0 ? '#E6ECF1' : rc) + '">' + esc(w) + '</tspan>' + esc(p) + '</text>' +
        '<line class="sc-pm-ul' + (li < 0 ? ' sc-pm-none' : '') + '" x1="' + measure(a, G.fs).toFixed(1) + '" x2="' + measure(a + w, G.fs).toFixed(1) + '" y1="' + (G.fs * 0.62).toFixed(1) + '" y2="' + (G.fs * 0.62).toFixed(1) + '" stroke="' + rc + '"/></g>';
      // barra de sílabas
      const sc = SC[(syl - 1 + 80) % SC.length];
      h += '<g class="sc-pm-bar" transform="translate(' + bx0.toFixed(1) + ' 0)">';
      const bh = clamp(G.lh * 0.46, 8, 16);
      for (let k = 0; k < syl; k++) h += '<rect class="sc-pm-sy" style="--k:' + k + ';--dl2:' + (i * 0.05 + k * 0.035).toFixed(3) + 's" x="' + (k * unit + 0.8).toFixed(1) + '" y="' + (-bh / 2).toFixed(1) + '" width="' + Math.max(2, unit - 1.6).toFixed(1) + '" height="' + bh.toFixed(1) + '" rx="' + Math.min(3, unit / 3).toFixed(1) + '" fill="' + sc + '"/>';
      h += '<text class="sc-pm-num" x="' + (syl * unit + 8).toFixed(1) + '" y="5" font-size="' + clamp(G.fs, 12, 17) + '" fill="' + sc + '">' + (syl || '') + '</text></g>';
      // letra de la rima
      h += '<g class="sc-pm-rb" style="--rc:' + rc + '"><circle r="' + clamp(G.lh * 0.34, 8, 12) + '" fill="' + rc + '"/><text y="4.5" text-anchor="middle" font-size="' + clamp(G.lh * 0.4, 11, 14) + '">' + esc(letter && letter !== '-' ? letter : '–') + '</text></g>';
      h += '</g>';
    });
    svg.innerHTML = h;
    // medir en el SVG real (la fuente puede no ser la misma que la del lienzo de medición)
    const txs = [...svg.querySelectorAll('.sc-pm-tx')];
    G.ends = txs.map((t) => (t.getComputedTextLength ? t.getComputedTextLength() : 0));
    const maxW = Math.max(0, ...G.ends), avail = W - G.right - G.ml - G.indent - 8;
    if (maxW > avail + 1 && !G.shrunk) { G0 = G.fs * avail / maxW; return build(true); }
    if (maxW > 0) G.tw = maxW;
    txs.forEach((t, i) => {
      const ul = t.parentNode.querySelector('.sc-pm-ul'), lw = t.querySelector('.sc-pm-lw');
      if (!ul || !lw || !t.getSubStringLength) return;
      const a = splitLast(lines[i].t || '')[0].length, n = lw.textContent.length;
      try { const x1 = a ? t.getSubStringLength(0, a) : 0, x2 = x1 + (n ? t.getSubStringLength(a, n) : 0); ul.setAttribute('x1', x1.toFixed(1)); ul.setAttribute('x2', x2.toFixed(1)); } catch (e) { /* */ }
    });
  }

  function place(anim) {
    if (!G) return;
    const mode = ['text', 'syl', 'rhyme', 'stanza'].indexOf(S.show) >= 0 ? S.show : 'text';
    const lines = S.lines || [];
    const Y = ys(G, mode);
    const ind = mode === 'stanza' ? G.indent : 0;
    st.classList.toggle('sc-now', !anim);
    svg.setAttribute('data-mode', mode);
    const hl = S.hl != null ? +S.hl : null;
    svg.querySelectorAll('.sc-pm-row').forEach((row) => {
      const i = +row.dataset.i;
      row.querySelector('.sc-pm-ln').style.transform = 'translate(' + (G.ml + ind) + 'px,' + Y[i].toFixed(1) + 'px)';
      row.querySelector('.sc-pm-bar').style.transform = 'translate(' + (W - G.right + 10) + 'px,' + Y[i].toFixed(1) + 'px)';
      const letterX = W - 22;
      row.querySelector('.sc-pm-rb').style.transform = 'translate(' + letterX + 'px,' + Y[i].toFixed(1) + 'px)';
      row.classList.toggle('sc-off', hl != null && hl !== i);
    });
    // hilos de rima: un carril vertical por letra, del final de cada verso al siguiente que rima
    const thr = svg.querySelector('.sc-pm-thr');
    let th = '';
    if (mode === 'rhyme') {
      const lanes0 = G.ml + G.tw + 16, laneW = Math.max(10, Math.min(16, (W - 40 - lanes0) / Math.max(1, G.letters.length)));
      G.letters.forEach((lt, li) => {
        const idx = lines.map((l, i) => (String(l.rhyme || '').trim().toLowerCase() === lt ? i : -1)).filter((i) => i >= 0);
        if (idx.length < 2) return;
        const c = RC[li % RC.length], lx = lanes0 + li * laneW;
        const ends = idx.map((i) => [G.ml + (G.ends[i] != null ? G.ends[i] : measure(lines[i].t || '', G.fs)) + 5, Y[i] + G.fs * 0.1]);
        let d = '';
        for (let j = 0; j < ends.length - 1; j++) {
          const [x1, y1] = ends[j], [x2, y2] = ends[j + 1], rr = Math.min(8, (y2 - y1) / 2);
          d += 'M' + x1.toFixed(1) + ' ' + y1.toFixed(1) + 'H' + (lx - rr).toFixed(1) + 'q' + rr + ' 0 ' + rr + ' ' + rr + 'V' + (y2 - rr).toFixed(1) + 'q0 ' + rr + ' ' + -rr + ' ' + rr + 'H' + x2.toFixed(1);
        }
        const len = ends.reduce((a, e, j) => (j ? a + Math.abs(e[1] - ends[j - 1][1]) + (lx - e[0]) + (lx - ends[j - 1][0]) : a), 0) + 20;
        th += '<path id="sc-pm-p' + li + '" class="sc-pm-thread" d="' + d + '" stroke="' + c + '" style="--len:' + len.toFixed(0) + ';--dl:' + (0.35 + li * 0.25) + 's"/>';
        if (!reduce) th += '<circle r="3" fill="#fff" class="sc-pm-spark" style="--dl:' + (1 + li * 0.25) + 's"><animateMotion dur="' + (2.6 + li * 0.4) + 's" repeatCount="indefinite" rotate="0"><mpath href="#sc-pm-p' + li + '"/></animateMotion></circle>';
        ends.forEach(([x, y]) => { th += '<circle class="sc-pm-knot" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="3.2" fill="' + c + '" style="--dl:' + (0.35 + li * 0.25) + 's"/>'; });
      });
    }
    thr.innerHTML = th;
    // corchetes de estrofa
    const brk = svg.querySelector('.sc-pm-brk');
    let bh = '';
    if (mode === 'stanza') {
      G.stz.forEach(([a, b], si) => {
        const y1 = Y[a] - G.lh * 0.42, y2 = Y[b] + G.lh * 0.42, x = G.ml + 8, c = SC[si % SC.length];
        bh += '<g class="sc-pm-st" style="--dl:' + (0.3 + si * 0.15) + 's"><rect x="' + (G.ml + ind - 8) + '" y="' + y1.toFixed(1) + '" width="' + (G.tw + 20) + '" height="' + (y2 - y1).toFixed(1) + '" rx="8" fill="' + c + '" opacity=".07"/>' +
          '<path d="M' + (x + 8) + ' ' + y1.toFixed(1) + 'h-6q-4 0-4 4V' + (y2 - 4).toFixed(1) + 'q0 4 4 4h6" fill="none" stroke="' + c + '" stroke-width="2.2" stroke-linecap="round"/>' +
          '<circle cx="' + (x - 2) + '" cy="' + ((y1 + y2) / 2).toFixed(1) + '" r="10" fill="' + c + '"/><text x="' + (x - 2) + '" y="' + ((y1 + y2) / 2 + 4.5).toFixed(1) + '" text-anchor="middle" font-size="12.5" font-weight="700" fill="#10181F">' + (si + 1) + '</text></g>';
      });
    }
    brk.innerHTML = bh;
    // lector (brillo que baja por los versos) solo en modo texto
    const rd = svg.querySelector('.sc-pm-reader');
    if (rd) rd.style.setProperty('--h', H + 60 + 'px');
    // etiqueta y leyenda
    const syls = lines.map((l) => +l.syl || 0);
    const same = syls.length && syls.every((s) => s === syls[0]);
    const scheme = lines.map((l) => String(l.rhyme || '-').trim().toLowerCase() || '-').join('');
    tag.textContent = mode === 'syl' ? (same ? 'Todos de ' + syls[0] + ' sílabas' : 'Sílabas métricas') : mode === 'rhyme' ? 'Esquema: ' + (G.stz.length > 1 ? G.stz.map(([a, b]) => scheme.slice(a, b + 1)).join(' · ') : scheme).toUpperCase() : mode === 'stanza' ? G.stz.length + (G.stz.length === 1 ? ' estrofa' : ' estrofas') + ' · ' + lines.length + ' versos' : lines.length + ' versos';
    note.innerHTML = mode === 'syl' ? '<span>Cada bloque = 1 sílaba métrica</span>' : mode === 'rhyme' ? '<span>Hilo del mismo color = versos que riman</span>' : '';
    if (!anim) { void st.offsetWidth; st.classList.remove('sc-now'); }
  }

  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => { const r = st.getBoundingClientRect(); if (S && (Math.round(r.width) !== W || Math.round(r.height) !== H)) { build(); place(false); } }) : null;
  if (ro) ro.observe(st);
  let alive = true;
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (alive && S) { build(); place(false); } });

  return {
    set(state) {
      const first = !S;
      S = state;
      const k = JSON.stringify([state.lines, state.stanzas]);
      if (first || k !== key) { key = k; build(); svg.classList.remove('sc-pm-enter'); void svg.getBoundingClientRect(); svg.classList.add('sc-pm-enter'); place(false); }
      else place(true);
    },
    dispose() { alive = false; if (ro) ro.disconnect(); st.remove(); note.remove(); },
  };
}
