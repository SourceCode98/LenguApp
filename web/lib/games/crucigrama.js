// Crucigrama: se arma solo con 5 a 8 palabras que se cruzan; se escribe con el teclado del celular o el físico.
// spec: { words:[{w:'sujeto', h:'Quien realiza la acción'}], time? }
//   Colocación automática: la más larga al centro y las demás cruzando en letras comunes; se reintenta con
//   órdenes barajados y se elige la de más palabras y menor área. Si una palabra no cabe, se omite.
import { esc, shuffle } from '../kit.js';
import { makeGame, mmss } from './common.js';
import { norm } from './sopa.js';

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

// Intenta colocar las palabras en el orden dado. Devuelve [{i, r, c, d:'a'|'d'}] con coordenadas relativas.
function layoutOnce(words, order, R) {
  const cells = new Map(); // "r,c" → { ch, a:bool, d:bool }
  const key = (r, c) => r + ',' + c;
  const placed = [];
  const box = [0, 0, -1, -1]; // r0, c0, r1, c1
  const put = (i, r, c, d) => {
    const w = words[i];
    const r1 = d === 'd' ? r + w.length - 1 : r, c1 = d === 'a' ? c + w.length - 1 : c;
    if (!placed.length) { box[0] = r; box[1] = c; box[2] = r1; box[3] = c1; }
    else { box[0] = Math.min(box[0], r); box[1] = Math.min(box[1], c); box[2] = Math.max(box[2], r1); box[3] = Math.max(box[3], c1); }
    for (let j = 0; j < w.length; j++) {
      const rr = d === 'd' ? r + j : r, cc = d === 'a' ? c + j : c;
      const k = key(rr, cc);
      const cur = cells.get(k) || { ch: w[j], a: false, d: false };
      cur[d] = true;
      cells.set(k, cur);
    }
    placed.push({ i, r, c, d });
  };
  const fits = (w, r, c, d) => {
    const dr = d === 'd' ? 1 : 0, dc = d === 'a' ? 1 : 0;
    if (cells.has(key(r - dr, c - dc)) || cells.has(key(r + dr * w.length, c + dc * w.length))) return -1;
    let cross = 0;
    for (let j = 0; j < w.length; j++) {
      const rr = r + dr * j, cc = c + dc * j;
      const cur = cells.get(key(rr, cc));
      if (cur) {
        if (cur.ch !== w[j] || cur[d]) return -1;
        cross++;
      } else {
        // sin vecinos a los lados (evita palabras pegadas)
        if (cells.has(key(rr + dc, cc + dr)) || cells.has(key(rr - dc, cc - dr))) return -1;
      }
    }
    return cross;
  };
  order.forEach((i, idx) => {
    const w = words[i];
    if (idx === 0) { put(i, 0, -Math.floor(w.length / 2), 'a'); return; }
    const cands = [];
    cells.forEach((cell, k) => {
      const [r, c] = k.split(',').map(Number);
      for (let j = 0; j < w.length; j++) {
        if (w[j] !== cell.ch) continue;
        ['a', 'd'].forEach((d) => {
          if (cell[d]) return;
          const r0 = d === 'd' ? r - j : r, c0 = d === 'a' ? c - j : c;
          const x = fits(w, r0, c0, d);
          if (x > 0) {
            const r1 = d === 'd' ? r0 + w.length - 1 : r0, c1 = d === 'a' ? c0 + w.length - 1 : c0;
            const h = Math.max(box[2], r1) - Math.min(box[0], r0) + 1, wd = Math.max(box[3], c1) - Math.min(box[1], c0) + 1;
            cands.push({ r: r0, c: c0, d, x, a: h * wd + Math.max(0, wd - 13) * 30 + R() * 12, z: R() });
          }
        });
      }
    });
    if (!cands.length) return;
    cands.sort((p, q) => q.x - p.x || p.a - q.a || p.z - q.z);
    const best = cands[0];
    put(i, best.r, best.c, best.d);
  });
  let r0 = Infinity, c0 = Infinity, r1 = -Infinity, c1 = -Infinity;
  cells.forEach((_, k) => { const [r, c] = k.split(',').map(Number); r0 = Math.min(r0, r); c0 = Math.min(c0, c); r1 = Math.max(r1, r); c1 = Math.max(c1, c); });
  const rows = r1 - r0 + 1, cols = c1 - c0 + 1;
  return { placed: placed.map((p) => ({ i: p.i, r: p.r - r0, c: p.c - c0, d: p.d })), rows, cols, area: rows * cols };
}

export function layout(words, seed) {
  const R = rng(seed);
  const byLen = words.map((_, i) => i).sort((a, b) => words[b].length - words[a].length);
  let best = null;
  for (let t = 0; t < 120; t++) {
    const order = t === 0 ? byLen : [byLen[0]].concat(byLen.slice(1).map((i) => [R(), i]).sort((p, q) => p[0] - q[0]).map((p) => p[1]));
    const L = layoutOnce(words, order, R);
    // más palabras primero; luego menor área y forma poco alargada (cabe mejor en el celular)
    const score = L.placed.length * 10000 - L.area - Math.max(0, L.cols - 13) * 40 - Math.abs(L.cols - L.rows) * 2;
    if (!best || score > best.score) best = Object.assign(L, { score });
  }
  return best;
}

export default function crucigrama(el, spec, finish) {
  const seen = new Set();
  const all = (spec.words || [])
    .map((x) => (typeof x === 'string' ? { w: x, h: '' } : x))
    .filter((x) => x && norm(x.w).length >= 2)
    .map((x) => ({ w: String(x.w).trim(), h: x.h || '', n: norm(x.w) }))
    .filter((x) => !seen.has(x.n) && seen.add(x.n));
  const TIME = spec.time || 0;
  const COUNT = Math.min(8, all.length);
  return makeGame(el, spec, finish, {
    key: 'crucigrama', name: 'Crucigrama', icon: '✚', time: TIME ? 'down' : 'up', lives: 0,
    how: 'Lee las pistas y escribe cada palabra en su casilla. Toca una pista o una casilla para elegir la palabra y escribe con tu teclado.',
    rules: ['Hasta ' + COUNT + ' palabras', 'Mayúsculas sin tildes', '«Revisar» colorea las casillas', 'Cada «Pista» cuesta estrellas'],
    stars: (r) => {
      if (!r.won) return r.total && r.solved / r.total >= 0.5 ? 1 : 0;
      return r.hints === 0 ? 3 : r.hints <= 2 ? 2 : 1;
    },
    lines: (r) => [['Palabras', r.solved + ' de ' + r.total], ['Pistas usadas', String(r.hints)], ['Tiempo', mmss(r.secs)]],
    play(g) {
      const deck = shuffle(all.slice()).slice(0, COUNT);
      const seed = Math.floor(Math.random() * 2147483647);
      const L = layout(deck.map((x) => x.n), seed);
      const { rows, cols } = L;
      // casillas del tablero
      const board = Array.from({ length: rows }, () => Array(cols).fill(null));
      const words = L.placed.map((p) => {
        const x = deck[p.i];
        const w = { w: x.w, h: x.h, n: x.n, r: p.r, c: p.c, d: p.d, cells: [], ok: false };
        for (let j = 0; j < x.n.length; j++) {
          const r = p.d === 'd' ? p.r + j : p.r, c = p.d === 'a' ? p.c + j : p.c;
          if (!board[r][c]) board[r][c] = { r, c, ch: x.n[j], v: '', a: null, dn: null, num: 0, given: false };
          board[r][c][p.d === 'a' ? 'a' : 'dn'] = w;
          w.cells.push(board[r][c]);
        }
        return w;
      });
      // numeración estándar: de izquierda a derecha y de arriba abajo
      let num = 0;
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const b = board[r][c];
        if (!b) continue;
        const sa = b.a && b.a.cells[0] === b, sd = b.dn && b.dn.cells[0] === b;
        if (sa || sd) { b.num = ++num; if (sa) b.a.num = num; if (sd) b.dn.num = num; }
      }
      const across = words.filter((w) => w.d === 'a').sort((p, q) => p.num - q.num);
      const down = words.filter((w) => w.d === 'd').sort((p, q) => p.num - q.num);
      const ordered = across.concat(down);
      const total = words.length;
      let cur = null, curW = null, hints = 0, solved = 0, checks = 0;

      const clue = (w) => '<li><button type="button" class="gm-cruci-clue" data-w="' + words.indexOf(w) + '"><b>' + w.num + '</b><span>' + esc(w.h || 'Sin pista') + ' <em>(' + w.n.length + ')</em></span></button></li>';
      g.stage.innerHTML =
        '<div class="gm-cruci-wrap">' +
        '<div class="gm-cruci-main">' +
        '<div class="gm-cruci-now" aria-live="polite"><button type="button" class="gm-cruci-nav" data-k="-1" aria-label="Pista anterior">‹</button><p></p><button type="button" class="gm-cruci-nav" data-k="1" aria-label="Pista siguiente">›</button></div>' +
        '<div class="gm-cruci-boardwrap"><div class="gm-cruci-board" style="--cols:' + cols + ';--rows:' + rows + '">' +
        board.map((row) => row.map((b) => b
          ? '<div class="gm-cruci-c" data-r="' + b.r + '" data-c="' + b.c + '">' + (b.num ? '<i>' + b.num + '</i>' : '') + '<span></span></div>'
          : '<div class="gm-cruci-x" aria-hidden="true"></div>').join('')).join('') +
        '<input class="gm-cruci-in" type="text" autocomplete="off" autocorrect="off" autocapitalize="characters" spellcheck="false" enterkeyhint="next" aria-label="Escribe la letra de la casilla"></div></div>' +
        '<div class="gm-cruci-tools"><button type="button" class="gm-btn ghost sm gm-cruci-check">Revisar</button><button type="button" class="gm-btn ghost sm gm-cruci-hint">Pista (−1 ★)</button></div>' +
        '</div>' +
        '<div class="gm-cruci-clues">' +
        (across.length ? '<div><h4>Horizontales</h4><ol>' + across.map(clue).join('') + '</ol></div>' : '') +
        (down.length ? '<div><h4>Verticales</h4><ol>' + down.map(clue).join('') + '</ol></div>' : '') +
        '</div></div>';
      const boardE = g.stage.querySelector('.gm-cruci-board');
      const wrapE = g.stage.querySelector('.gm-cruci-boardwrap');
      const input = g.stage.querySelector('.gm-cruci-in');
      const nowP = g.stage.querySelector('.gm-cruci-now p');
      const clueBtns = [...g.stage.querySelectorAll('.gm-cruci-clue')];
      const cellE = (b) => boardE.querySelector('[data-r="' + b.r + '"][data-c="' + b.c + '"]');
      words.forEach((w) => w.cells.forEach((b) => { b.el = b.el || cellE(b); }));
      const SENT = '​';
      input.value = SENT;
      const info = () => g.info('<span><b>' + solved + '</b> de ' + total + ' palabras</span>' + (hints ? '<span><b>' + hints + '</b> ' + (hints === 1 ? 'pista' : 'pistas') + '</span>' : ''));
      info();

      // tamaño de casilla según el ancho disponible (cabe en 360 px)
      function fit() {
        const avail = wrapE.clientWidth || 300;
        const s = Math.max(20, Math.min(44, Math.floor((avail - 4) / cols)));
        boardE.style.setProperty('--cell', s + 'px');
      }
      fit();
      g.on(window, 'resize', fit);

      function draw() {
        words.forEach((w) => w.cells.forEach((b) => {
          b.el.classList.toggle('word', !!curW && curW.cells.includes(b));
          b.el.classList.toggle('cur', b === cur);
        }));
        clueBtns.forEach((btn) => btn.classList.toggle('on', words[+btn.dataset.w] === curW));
        if (curW) nowP.innerHTML = '<b>' + curW.num + ' ' + (curW.d === 'a' ? 'horizontal' : 'vertical') + '</b> ' + esc(curW.h || 'Sin pista') + ' <em>(' + curW.n.length + ')</em>';
        if (cur) {
          const s = parseFloat(boardE.style.getPropertyValue('--cell')) || 32;
          input.style.left = cur.c * s + 'px';
          input.style.top = cur.r * s + 'px';
        }
      }
      function select(b, w, focus) {
        cur = b; curW = w || (curW && curW.cells.includes(b) ? curW : b.a || b.dn);
        draw();
        if (focus !== false) focusIn();
      }
      function focusIn() { try { input.focus({ preventScroll: true }); input.setSelectionRange(1, 1); } catch (e) { /* ignorar */ } }
      const setV = (b, v) => {
        b.v = v;
        b.el.querySelector('span').textContent = v;
        b.el.classList.remove('ok', 'no');
      };
      // avanzar solo a la siguiente casilla de la palabra actual
      function step(k) {
        if (!curW) return;
        const j = curW.cells.indexOf(cur) + k;
        if (j >= 0 && j < curW.cells.length) { cur = curW.cells[j]; draw(); }
      }
      const locked = (b) => b.given || (b.a && b.a.ok) || (b.dn && b.dn.ok);
      function type(ch) {
        if (!cur || !g.running) return;
        if (!locked(cur)) { setV(cur, ch); g.bump(cur.el, 'gm-cruci-in-l'); }
        const w = curW;
        step(1);
        judge(w);
        if (cur.a) judge(cur.a);
        if (cur.dn) judge(cur.dn);
        words.forEach((x) => x !== w && x.cells.every((b) => b.v) && judge(x));
      }
      function back() {
        if (!cur || !g.running) return;
        if (cur.v && !locked(cur)) { setV(cur, ''); return; }
        step(-1);
        if (cur.v && !locked(cur)) setV(cur, '');
      }
      // revisa una palabra cuando se llena
      function judge(w) {
        if (!w || w.ok || !w.cells.every((b) => b.v)) return;
        if (w.cells.every((b) => b.v === b.ch)) {
          w.ok = true; solved++;
          w.cells.forEach((b, j) => { b.el.classList.add('good'); b.el.style.setProperty('--d', j * 50 + 'ms'); });
          const m = g.hit();
          g.good(w.cells[w.cells.length - 1].el);
          g.add(100 * m + w.n.length * 10, w.cells[w.cells.length - 1].el);
          clueBtns[ordered.indexOf(w)].classList.add('done');
          g.say('¡Correcto! ' + w.num + ' ' + (w.d === 'a' ? 'horizontal' : 'vertical') + ': ' + w.w);
          info();
          if (solved === total) { g.pause(); g.after(800, () => done(true)); }
          else if (curW === w) { const nx = ordered.find((x) => !x.ok && ordered.indexOf(x) > ordered.indexOf(w)) || ordered.find((x) => !x.ok); if (nx) g.after(350, () => select(nx.cells.find((b) => !b.v) || nx.cells[0], nx)); }
        } else {
          g.miss();
          w.cells.forEach((b) => g.bump(b.el, 'gm-shake'));
          g.bad();
          g.say('La palabra ' + w.num + ' ' + (w.d === 'a' ? 'horizontal' : 'vertical') + ' no está bien todavía');
        }
      }
      function done(won) {
        const secs = TIME ? TIME - g.t : g.t;
        if (won) {
          const bonus = TIME ? Math.round(g.t) * 2 : Math.max(0, Math.round(240 - secs)) * 2;
          g.setScore(g.score + bonus - hints * 40);
        }
        g.end({ won, solved, total, hints, secs, reason: won ? '¡Completaste el crucigrama!' : '¡Se acabó el tiempo!', detail: { solved, total, hints, checks, seconds: Math.round(secs), seed } });
      }

      boardE.addEventListener('click', (e) => {
        const c = e.target.closest('.gm-cruci-c');
        if (!c || !g.running) return;
        const b = board[+c.dataset.r][+c.dataset.c];
        // tocar la misma casilla cambia de dirección si se cruzan dos palabras
        if (b === cur && b.a && b.dn) select(b, curW === b.a ? b.dn : b.a);
        else select(b, curW && curW.cells.includes(b) ? curW : null);
      });
      g.stage.querySelector('.gm-cruci-clues').addEventListener('click', (e) => {
        const btn = e.target.closest('.gm-cruci-clue');
        if (!btn || !g.running) return;
        const w = words[+btn.dataset.w];
        select(w.cells.find((b) => !b.v) || w.cells[0], w);
      });
      g.stage.querySelector('.gm-cruci-now').addEventListener('click', (e) => {
        const nav = e.target.closest('.gm-cruci-nav');
        if (!nav || !g.running) return;
        const i = (ordered.indexOf(curW) + +nav.dataset.k + ordered.length) % ordered.length;
        const w = ordered[i];
        select(w.cells.find((b) => !b.v) || w.cells[0], w);
      });
      g.stage.querySelector('.gm-cruci-check').addEventListener('click', () => {
        if (!g.running) return;
        checks++;
        let bad = 0, empty = 0;
        words.forEach((w) => w.cells.forEach((b) => {
          if (!b.v) { empty++; return; }
          b.el.classList.toggle('ok', b.v === b.ch);
          b.el.classList.toggle('no', b.v !== b.ch);
          if (b.v !== b.ch) bad++;
        }));
        const msg = bad ? 'Hay ' + bad + (bad === 1 ? ' casilla con error' : ' casillas con error') : empty ? 'Todo lo escrito está bien' : '¡Todo está bien!';
        g.pop(msg, g.stage.querySelector('.gm-cruci-check'), bad ? 'no' : 'ok');
        g.say(msg + (empty ? '. Faltan ' + empty + ' casillas.' : ''));
        focusIn();
      });
      g.stage.querySelector('.gm-cruci-hint').addEventListener('click', () => {
        if (!g.running) return;
        const w = curW && !curW.ok ? curW : ordered.find((x) => !x.ok);
        if (!w) return;
        const b = w.cells.find((x) => x.v !== x.ch);
        if (!b) return;
        hints++;
        setV(b, b.ch);
        b.given = true;
        b.el.classList.add('given');
        g.bump(b.el, 'gm-good');
        g.say('Pista: la letra ' + (w.cells.indexOf(b) + 1) + ' es ' + b.ch);
        info();
        select(b, w, true);
        judge(w);
        if (b.a && b.a !== w) judge(b.a);
        if (b.dn && b.dn !== w) judge(b.dn);
      });

      // entrada: input oculto (teclado del celular) con un carácter centinela para detectar el borrado
      g.on(input, 'input', (e) => {
        const v = input.value;
        const del = (e.inputType && e.inputType.indexOf('delete') === 0) || !v.includes(SENT) && v.length === 0;
        const typed = norm(v.replace(SENT, ''));
        input.value = SENT;
        try { input.setSelectionRange(1, 1); } catch (er) { /* ignorar */ }
        if (typed) { for (const ch of typed) type(ch); } else if (del) back();
      });
      g.on(input, 'keydown', (e) => {
        if (e.key === 'Tab' || e.key === 'Enter') {
          e.preventDefault();
          const i = (ordered.indexOf(curW) + (e.shiftKey ? -1 : 1) + ordered.length) % ordered.length;
          const w = ordered[i];
          select(w.cells.find((b) => !b.v) || w.cells[0], w);
          return;
        }
        arrows(e);
      });
      function arrows(e) {
        const mv = { ArrowLeft: [0, -1], ArrowRight: [0, 1], ArrowUp: [-1, 0], ArrowDown: [1, 0] }[e.key];
        if (!mv || !cur) return false;
        e.preventDefault();
        const d = mv[0] ? 'dn' : 'a';
        let r = cur.r + mv[0], c = cur.c + mv[1];
        while (r >= 0 && r < rows && c >= 0 && c < cols && !board[r][c]) { r += mv[0]; c += mv[1]; }
        if (r >= 0 && r < rows && c >= 0 && c < cols) { const b = board[r][c]; select(b, b[d] || b.a || b.dn); }
        else if (cur[d] && curW !== cur[d]) select(cur, cur[d]);
        return true;
      }
      // teclado físico cuando el foco no está en el input
      g.key((e) => {
        if (!g.running) return;
        if (arrows(e)) return;
        if (e.key === 'Backspace') { e.preventDefault(); back(); focusIn(); return; }
        if (e.key.length === 1) { const ch = norm(e.key); if (ch) { e.preventDefault(); if (!cur) select(ordered[0].cells[0], ordered[0]); type(ch); focusIn(); } }
      });

      if (TIME) g.clock(TIME, () => done(false)); else g.clock(0);
      if (!total) { nowP.textContent = 'No hay palabras en este reto.'; g.pause(); return; }
      select(ordered[0].cells[0], ordered[0], false);
      g.say('Crucigrama de ' + total + ' palabras. ' + nowP.textContent);
    },
  });
}
