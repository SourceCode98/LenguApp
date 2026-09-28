// Sopa de letras: encuentra las palabras escondidas a partir de su pista (no se muestra la palabra).
// spec: { words:[{w:'metáfora', h:'Dice que algo ES otra cosa'}], size?:10, time?:150 }
//   Letras mayúsculas sin tildes (la Ñ se conserva). Palabras en horizontal, vertical y diagonal, sin invertir.
//   Selección arrastrando, o tocando la primera y la última letra. Se usan de 6 a 8 palabras.
import { esc, shuffle } from '../kit.js';
import { makeGame, mmss } from './common.js';

// Normaliza: mayúsculas, sin tildes ni diéresis, Ñ intacta, solo letras.
export function norm(w) {
  return String(w || '')
    .toLocaleUpperCase('es-CO')
    .replace(/Ñ/g, '\u0001')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\u0001/g, 'Ñ')
    .replace(/[^A-ZÑ]/g, '');
}

// Generador pseudoaleatorio con semilla (mulberry32).
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Letras frecuentes del español para el relleno (más repetidas = más probables).
const FILL = 'EEEEEEAAAAAAOOOOOSSSSSRRRRNNNNIIIIDDDLLLLCCCTTTUUUMMPPBGVYHQFZJÑ';
const DIRS = [[0, 1], [1, 0], [1, 1]]; // horizontal, vertical, diagonal (siempre hacia adelante)
const MARK = ['#FFD24D', '#6FD6A0', '#86BEFF', '#FF96B1', '#C3A0FF', '#FFAE5E', '#5ED9D2', '#D3E05E'];

// Coloca las palabras en una cuadrícula n×n. Devuelve { grid, placed:[{i, r, c, dr, dc}] }.
function build(words, n, seed) {
  let best = null;
  for (let attempt = 0; attempt < 30; attempt++) {
    const R = rng(seed + attempt * 7919);
    const grid = Array.from({ length: n }, () => Array(n).fill(''));
    const placed = [];
    const order = words.map((w, i) => i).sort((a, b) => words[b].length - words[a].length || R() - 0.5);
    order.forEach((i) => {
      const w = words[i];
      if (w.length > n) return;
      for (let k = 0; k < 250; k++) {
        const [dr, dc] = DIRS[Math.floor(R() * DIRS.length)];
        const r0 = Math.floor(R() * (n - dr * (w.length - 1)));
        const c0 = Math.floor(R() * (n - dc * (w.length - 1)));
        let ok = true;
        for (let j = 0; j < w.length && ok; j++) { const x = grid[r0 + dr * j][c0 + dc * j]; if (x && x !== w[j]) ok = false; }
        // evita que una palabra quede completamente encima de otra
        if (ok && placed.some((p) => p.dr === dr && p.dc === dc && words[p.i].includes(w))) ok = false;
        if (!ok) continue;
        for (let j = 0; j < w.length; j++) grid[r0 + dr * j][c0 + dc * j] = w[j];
        placed.push({ i, r: r0, c: c0, dr, dc });
        return;
      }
    });
    if (!best || placed.length > best.placed.length) best = { grid, placed, R };
    if (placed.length === words.length) break;
  }
  const { grid, R } = best;
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (!grid[r][c]) grid[r][c] = FILL[Math.floor(R() * FILL.length)];
  return best;
}

export default function sopa(el, spec, finish) {
  const all = (spec.words || [])
    .map((x) => (typeof x === 'string' ? { w: x, h: '' } : x))
    .filter((x) => x && norm(x.w).length >= 2)
    .map((x) => ({ w: String(x.w).trim(), h: x.h || '', n: norm(x.w) }));
  const TIME = spec.time || 150;
  const COUNT = Math.min(8, all.length);
  return makeGame(el, spec, finish, {
    key: 'sopa', name: 'Sopa de letras', icon: '▦', time: 'down', lives: 0,
    how: 'Lee cada pista y busca la palabra escondida. Arrastra el dedo de la primera a la última letra, o tócalas una tras otra.',
    rules: [COUNT + ' palabras', 'Horizontal, vertical y en diagonal', 'Sin tildes en la cuadrícula', TIME + ' segundos'],
    stars: (r) => {
      if (!r.total) return 0;
      if (r.found >= r.total) { const f = r.left / TIME; return f >= 0.45 ? 3 : f >= 0.15 ? 2 : 1; }
      return r.found / r.total >= 0.5 ? 1 : 0;
    },
    lines: (r) => [['Encontradas', r.found + ' de ' + r.total], ['Tiempo usado', mmss(TIME - r.left)], ['Intentos fallidos', String(r.misses)]],
    play(g) {
      const narrow = (g.stage.clientWidth || el.clientWidth || 800) < 520;
      const maxN = narrow ? 10 : 12;
      const deck = shuffle(all.slice()).slice(0, COUNT);
      const longest = Math.max(0, ...deck.map((x) => x.n.length));
      const letters = deck.reduce((s, x) => s + x.n.length, 0);
      let n = spec.size ? Math.round(spec.size) : Math.max(longest + 1, Math.ceil(Math.sqrt(letters * 2.2)), 8);
      n = Math.max(5, Math.min(maxN, n));
      const words = deck.filter((x) => x.n.length <= n);
      const seed = Math.floor(Math.random() * 2147483647);
      const { grid, placed } = build(words.map((x) => x.n), n, seed);
      const list = placed.map((p, k) => Object.assign({}, words[p.i], p, { k, found: false, color: MARK[k % MARK.length] })).sort((a, b) => a.n.length - b.n.length);
      const total = list.length;
      let found = 0, misses = 0, first = null, drag = null, cursor = -1;

      g.stage.innerHTML =
        '<div class="gm-sopa-wrap">' +
        '<div class="gm-sopa-board" style="--n:' + n + '">' +
        '<svg class="gm-sopa-ink" viewBox="0 0 ' + n + ' ' + n + '" aria-hidden="true"><g class="done"></g><g class="sel"></g></svg>' +
        '<div class="gm-sopa-grid" role="application" aria-label="Sopa de letras de ' + n + ' por ' + n + '. Usa las flechas y Enter para marcar la primera y la última letra.">' +
        grid.map((row, r) => row.map((ch, c) => '<span class="gm-sopa-c" data-r="' + r + '" data-c="' + c + '">' + ch + '</span>').join('')).join('') +
        '</div></div>' +
        '<div class="gm-sopa-side"><p class="gm-sopa-tip">Pistas</p><ol class="gm-sopa-list">' +
        list.map((x, i) => '<li data-i="' + i + '" style="--mk:' + x.color + '"><span class="sw" aria-hidden="true"></span><span class="tx"><span class="h">' + esc(x.h || 'Palabra escondida') + '</span><span class="nl">' + x.n.length + ' letras</span></span></li>').join('') +
        '</ol></div></div>';
      const board = g.stage.querySelector('.gm-sopa-board');
      const gridE = board.querySelector('.gm-sopa-grid');
      const cells = [...gridE.children];
      const doneG = board.querySelector('.done');
      const selG = board.querySelector('.sel');
      const items = [...g.stage.querySelectorAll('.gm-sopa-list li')];
      const cellAt = (r, c) => cells[r * n + c];
      const info = () => g.info('<span><b>' + found + '</b> de ' + total + ' palabras</span>');
      info();

      const stroke = (a, b, cls, color) =>
        '<g class="' + cls + '"' + (color ? ' style="--mk:' + color + '"' : '') + '>' +
        '<line x1="' + (a.c + 0.5) + '" y1="' + (a.r + 0.5) + '" x2="' + (b.c + 0.5) + '" y2="' + (b.r + 0.5) + '"/>' +
        '<line class="b" x1="' + (a.c + 0.46) + '" y1="' + (a.r + 0.56) + '" x2="' + (b.c + 0.54) + '" y2="' + (b.r + 0.47) + '"/></g>';

      function lineCells(a, b) {
        const dr = Math.sign(b.r - a.r), dc = Math.sign(b.c - a.c);
        const len = Math.max(Math.abs(b.r - a.r), Math.abs(b.c - a.c));
        const out = [];
        for (let j = 0; j <= len; j++) out.push({ r: a.r + dr * j, c: a.c + dc * j });
        return out;
      }
      const straight = (a, b) => a.r === b.r || a.c === b.c || Math.abs(a.r - b.r) === Math.abs(a.c - b.c);
      // ajusta el final a la línea recta más cercana (8 direcciones) desde el inicio
      function snap(a, r, c) {
        const dr = r - a.r, dc = c - a.c;
        if (!dr && !dc) return { r, c };
        const ang = Math.round(Math.atan2(dr, dc) / (Math.PI / 4)) * (Math.PI / 4);
        const sr = Math.round(Math.sin(ang)), sc = Math.round(Math.cos(ang));
        let len = Math.max(Math.abs(dr), Math.abs(dc));
        while (len > 0) {
          const rr = a.r + sr * len, cc = a.c + sc * len;
          if (rr >= 0 && rr < n && cc >= 0 && cc < n) return { r: rr, c: cc };
          len--;
        }
        return { r: a.r, c: a.c };
      }
      function preview(a, b) {
        selG.innerHTML = a ? stroke(a, b || a, 'gm-sopa-sel') : '';
        cells.forEach((x) => x.classList.remove('on'));
        if (a) lineCells(a, b || a).forEach((p) => cellAt(p.r, p.c).classList.add('on'));
      }

      function check(a, b) {
        if (!straight(a, b)) { g.bad(gridE); g.say('Debe ser una línea recta'); preview(null); return; }
        // vale cualquier línea que forme la palabra (también si el relleno la repitió por azar), leída en cualquier sentido
        const txt = lineCells(a, b).map((p) => grid[p.r][p.c]).join('');
        const rev = txt.split('').reverse().join('');
        const w = list.find((x) => !x.found && (x.n === txt || x.n === rev));
        preview(null);
        if (w) {
          w.found = true; found++;
          const s = a, e = b;
          doneG.insertAdjacentHTML('beforeend', stroke(s, e, 'gm-sopa-mk', w.color));
          lineCells(s, e).forEach((p, j) => { const x = cellAt(p.r, p.c); x.classList.add('got'); x.style.setProperty('--d', j * 40 + 'ms'); g.bump(x, 'gm-sopa-pop'); });
          const li = items[list.indexOf(w)];
          li.classList.add('found');
          li.querySelector('.tx').insertAdjacentHTML('afterbegin', '<b class="w">' + esc(w.w) + '</b>');
          g.bump(li, 'gm-good');
          const m = g.hit();
          g.good();
          g.add(100 * m + w.n.length * 10, cellAt(e.r, e.c));
          g.say('¡Encontraste ' + w.w + '! Van ' + found + ' de ' + total);
          info();
          if (found === total) { g.pause(); g.after(700, () => done('¡Encontraste todas las palabras!')); }
        } else if (a.r !== b.r || a.c !== b.c) {
          misses++;
          g.miss();
          selG.innerHTML = stroke(a, b, 'gm-sopa-sel no');
          g.bad(gridE);
          g.say('Esa no es. Sigue buscando.');
          g.after(450, () => { if (!drag && !first) selG.innerHTML = ''; });
        }
      }
      function done(reason) {
        const left = Math.max(0, g.t);
        if (found === total) g.add(Math.round(left) * 3, null, '+' + Math.round(left) * 3 + ' por tiempo');
        g.end({ reason, found, total, left, misses, detail: { found, total, misses, seconds: Math.round(TIME - left), seed, size: n } });
      }

      function cellFromPoint(x, y) {
        const r0 = gridE.getBoundingClientRect();
        const c = Math.floor(((x - r0.left) / r0.width) * n), r = Math.floor(((y - r0.top) / r0.height) * n);
        return { r: Math.max(0, Math.min(n - 1, r)), c: Math.max(0, Math.min(n - 1, c)), inside: c >= 0 && c < n && r >= 0 && r < n };
      }
      function tap(p) {
        if (!first) { first = p; cellAt(p.r, p.c).classList.add('first'); preview(p, p); g.say('Primera letra marcada. Toca la última.'); return; }
        const a = first;
        clearFirst();
        if (a.r === p.r && a.c === p.c) { preview(null); return; }
        check(a, p);
      }
      function clearFirst() { if (first) cellAt(first.r, first.c).classList.remove('first'); first = null; }

      g.on(gridE, 'pointerdown', (e) => {
        if (e.button > 0 || !g.running) return;
        const p = cellFromPoint(e.clientX, e.clientY);
        if (!p.inside) return;
        e.preventDefault();
        setCursor(-1);
        drag = { a: first || { r: p.r, c: p.c }, start: { r: p.r, c: p.c }, end: { r: p.r, c: p.c }, id: e.pointerId, moved: false };
        try { gridE.setPointerCapture(e.pointerId); } catch (er) { /* sin captura */ }
        if (!first) preview(drag.a, drag.a);
      });
      g.on(gridE, 'pointermove', (e) => {
        const p = cellFromPoint(e.clientX, e.clientY);
        if (!drag) { if (first && e.pointerType === 'mouse') preview(first, snap(first, p.r, p.c)); return; }
        if (e.pointerId !== drag.id) return;
        if (p.r !== drag.start.r || p.c !== drag.start.c) drag.moved = true;
        if (!drag.moved) return;
        if (first && drag.a === first) { drag.a = drag.start; clearFirst(); }
        drag.end = snap(drag.a, p.r, p.c);
        preview(drag.a, drag.end);
      });
      const up = (e) => {
        if (!drag || e.pointerId !== drag.id) return;
        const d = drag; drag = null;
        if (!g.running) { preview(null); return; }
        if (!d.moved) tap(d.start);
        else check(d.a, d.end);
      };
      g.on(gridE, 'pointerup', up);
      g.on(gridE, 'pointercancel', (e) => { if (drag && e.pointerId === drag.id) { drag = null; preview(first, first); } });
      g.on(gridE, 'lostpointercapture', (e) => { if (drag && e.pointerId === drag.id) up(e); });

      // teclado: flechas mueven el cursor; Enter o espacio marca la primera y la última letra; Escape cancela
      function setCursor(i) {
        if (cursor >= 0) cells[cursor].classList.remove('cur');
        cursor = i;
        if (i >= 0) {
          cells[i].classList.add('cur');
          if (first) preview(first, snap(first, Math.floor(i / n), i % n));
          g.say('Fila ' + (Math.floor(i / n) + 1) + ', columna ' + (i % n + 1) + ': ' + cells[i].textContent);
        }
      }
      g.key((e) => {
        if (!g.running) return;
        const mv = { ArrowLeft: [0, -1], ArrowRight: [0, 1], ArrowUp: [-1, 0], ArrowDown: [1, 0] }[e.key];
        if (mv) {
          e.preventDefault();
          const i = cursor < 0 ? 0 : cursor;
          const r = Math.max(0, Math.min(n - 1, Math.floor(i / n) + mv[0])), c = Math.max(0, Math.min(n - 1, (i % n) + mv[1]));
          setCursor(cursor < 0 ? 0 : r * n + c);
        } else if ((e.key === 'Enter' || e.key === ' ') && cursor >= 0) {
          e.preventDefault();
          tap({ r: Math.floor(cursor / n), c: cursor % n });
        } else if (e.key === 'Escape' && first) { clearFirst(); preview(null); }
      });

      g.clock(TIME, () => done('¡Se acabó el tiempo!'));
      if (!total) { g.pause(); g.stage.querySelector('.gm-sopa-tip').textContent = 'No hay palabras en este reto.'; }
    },
  });
}
