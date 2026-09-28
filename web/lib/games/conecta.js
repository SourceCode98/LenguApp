// Une con líneas: dos columnas de tarjetas; toca una de cada lado y se traza una línea de lápiz.
// Si la pareja es correcta la línea queda; si no, tiembla en rojo y se borra (cuenta como error).
// spec: { pairs:[['Metáfora','Tus ojos son luceros'], ...], time? }  rondas de 4 o 5 parejas
import { esc, shuffle } from '../kit.js';
import { makeGame, mmss } from './common.js';

const NS = 'http://www.w3.org/2000/svg';

// Tamaños de ronda: de 4 o 5 parejas (con menos de 4 parejas en total, una sola ronda).
function plan(n) {
  if (n <= 0) return [];
  if (n <= 5) return [n];
  let r = Math.ceil(n / 5);
  if (Math.floor(n / r) < 4) r = Math.floor(n / 4);
  r = Math.min(4, Math.max(1, r));
  const base = Math.floor(n / r), extra = n % r;
  return Array.from({ length: r }, (_, i) => Math.min(5, base + (i < extra ? 1 : 0)));
}
// número pseudoaleatorio estable (la misma línea conserva su curva al redibujar)
const rnd = (s) => { const x = Math.sin(s * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

export default function conecta(el, spec, finish) {
  const all = (spec.pairs || []).filter((p) => p && p.length >= 2 && String(p[0]).trim() && String(p[1]).trim()).map((p) => [String(p[0]), String(p[1])]);
  const sizes = plan(all.length);
  const TOTAL = sizes.reduce((a, b) => a + b, 0);
  const TIME = +spec.time || 0;
  return makeGame(el, spec, finish, {
    key: 'conecta', name: 'Une con líneas', icon: '⤫', time: TIME ? 'down' : 'up',
    how: 'Toca una tarjeta de la izquierda y luego su pareja de la derecha. Si aciertas, la línea se queda; si no, se borra.',
    rules: [TOTAL + ' parejas', sizes.length + (sizes.length === 1 ? ' ronda' : ' rondas'), TIME ? TIME + ' segundos' : 'Sin límite de tiempo', 'Menos errores, más estrellas'],
    stars: (r) => {
      if (!r.won) { const f = TOTAL ? r.matched / TOTAL : 0; return f >= 0.75 ? 2 : f >= 0.4 ? 1 : 0; }
      const fast = TIME ? true : r.secs <= TOTAL * 10;
      return r.errors <= Math.max(1, Math.round(TOTAL * 0.15)) && fast ? 3 : r.errors <= Math.ceil(TOTAL * 0.5) ? 2 : 1;
    },
    lines: (r) => [['Parejas', r.matched + ' de ' + TOTAL], ['Errores', String(r.errors)], ['Tiempo', mmss(r.secs)]],
    play(g) {
      const deck = shuffle(all.slice());
      let ri = -1, pairs = [], L = [], R = [], rightOrder = [], sel = null, links = [], matched = 0, errors = 0, got = 0, lock = true, seed = 0;
      g.stage.innerHTML =
        '<p class="gm-cn-tip"></p>' +
        '<div class="gm-cn-board">' +
        '<div class="gm-cn-col gm-cn-left" role="group" aria-label="Columna izquierda"></div>' +
        '<div class="gm-cn-col gm-cn-right" role="group" aria-label="Columna derecha"></div>' +
        '<svg class="gm-cn-svg" aria-hidden="true" focusable="false"></svg>' +
        '</div>';
      const tip = g.stage.querySelector('.gm-cn-tip');
      const board = g.stage.querySelector('.gm-cn-board');
      const colL = board.querySelector('.gm-cn-left');
      const colR = board.querySelector('.gm-cn-right');
      const svg = board.querySelector('.gm-cn-svg');

      const info = () => g.info('<span>Ronda <b>' + Math.max(1, ri + 1) + '</b> de ' + sizes.length + '</span><span><b>' + matched + '</b> de ' + TOTAL + ' parejas</span>');
      const elapsed = () => (TIME ? TIME - g.t : g.t);
      const done = (won, reason) => {
        lock = true;
        g.end({ won, matched, errors, secs: elapsed(), reason, detail: { matched, total: TOTAL, errors, seconds: Math.round(elapsed()), bestStreak: g.bestStreak } });
      };

      // Curva de lápiz entre dos tarjetas: trazo principal y un segundo trazo fino apenas corrido.
      function geom(l, r, s) {
        const br = board.getBoundingClientRect(), a = L[l].getBoundingClientRect(), b = R[r].getBoundingClientRect();
        const x1 = a.right - br.left - 2, y1 = a.top + a.height / 2 - br.top;
        const x2 = b.left - br.left + 2, y2 = b.top + b.height / 2 - br.top;
        const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
        const lim = Math.max(4, Math.abs(dx) * 0.28);
        const k = Math.max(-lim, Math.min(lim, (rnd(s) - 0.5) * 0.22 * len + 0.05 * len));
        const cx = (x1 + x2) / 2 - (dy / len) * k, cy = (y1 + y2) / 2 + (dx / len) * k;
        const f = (n) => n.toFixed(1);
        const j = (rnd(s + 7) - 0.5) * 2.4;
        return {
          a: 'M' + f(x1) + ' ' + f(y1) + ' Q' + f(cx) + ' ' + f(cy) + ' ' + f(x2) + ' ' + f(y2),
          b: 'M' + f(x1 + 1) + ' ' + f(y1 + j) + ' Q' + f(cx + j * 2) + ' ' + f(cy - j * 1.5) + ' ' + f(x2 - 1) + ' ' + f(y2 - j),
          x1, y1, x2, y2,
        };
      }
      function lineEl(link, cls) {
        const gEl = document.createElementNS(NS, 'g');
        gEl.setAttribute('class', 'gm-cn-line ' + cls);
        gEl.innerHTML = '<path class="p1" pathLength="1"/><path class="p2" pathLength="1"/><circle class="d" r="4.5"/><circle class="d" r="4.5"/>';
        svg.appendChild(gEl);
        link.el = gEl;
        place(link);
        return gEl;
      }
      function place(link) {
        const q = geom(link.l, link.r, link.s);
        const [p1, p2] = link.el.querySelectorAll('path');
        const [c1, c2] = link.el.querySelectorAll('circle');
        p1.setAttribute('d', q.a); p2.setAttribute('d', q.b);
        c1.setAttribute('cx', q.x1.toFixed(1)); c1.setAttribute('cy', q.y1.toFixed(1));
        c2.setAttribute('cx', q.x2.toFixed(1)); c2.setAttribute('cy', q.y2.toFixed(1));
      }
      function redraw() {
        const w = board.clientWidth, h = board.clientHeight;
        svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
        svg.setAttribute('width', String(w)); svg.setAttribute('height', String(h));
        links.forEach((k) => k.el && place(k));
      }
      if (typeof ResizeObserver !== 'undefined') {
        const ro = new ResizeObserver(() => redraw());
        ro.observe(board);
        g.cleanups.push(() => ro.disconnect());
      }
      g.on(window, 'resize', redraw);

      function card(side, i, t) {
        return '<button type="button" class="gm-cn-card s' + side + (t.length > 40 ? ' long' : '') + '" data-s="' + side + '" data-i="' + i + '" aria-pressed="false" lang="es"><span>' + esc(t) + '</span></button>';
      }
      function next() {
        ri++;
        if (ri >= sizes.length) return win();
        const start = sizes.slice(0, ri).reduce((a, b) => a + b, 0);
        pairs = deck.slice(start, start + sizes[ri]);
        rightOrder = shuffle(pairs.map((_, i) => i));
        // que la columna derecha no quede en el mismo orden que la izquierda
        if (pairs.length > 1 && rightOrder.every((v, i) => v === i)) rightOrder.push(rightOrder.shift());
        colL.innerHTML = pairs.map((p, i) => card(0, i, p[0])).join('');
        colR.innerHTML = rightOrder.map((pi, i) => card(1, i, pairs[pi][1])).join('');
        L = [...colL.children]; R = [...colR.children];
        svg.innerHTML = '';
        links = []; sel = null; got = 0;
        tip.textContent = 'Toca una tarjeta de cada lado para unirlas.';
        g.bump(board, 'gm-in');
        info();
        redraw();
        lock = false;
        g.say('Ronda ' + (ri + 1) + ': une ' + pairs.length + ' parejas.');
        g.resume();
      }
      function setSel(s) {
        [...L, ...R].forEach((b) => { b.classList.remove('sel'); b.setAttribute('aria-pressed', 'false'); });
        sel = s;
        if (s) { const b = (s.s ? R : L)[s.i]; b.classList.add('sel'); b.setAttribute('aria-pressed', 'true'); }
      }
      function tap(b) {
        if (lock || !b || b.disabled) return;
        const s = +b.dataset.s, i = +b.dataset.i;
        if (!sel || sel.s === s) {
          if (sel && sel.i === i) { setSel(null); return; }
          setSel({ s, i });
          g.say('Elegiste: ' + b.textContent + '. Ahora toca su pareja del otro lado.');
          return;
        }
        const l = s ? sel.i : i, r = s ? i : sel.i;
        setSel(null);
        attempt(l, r);
      }
      function attempt(l, r) {
        const ok = pairs[l][1] === pairs[rightOrder[r]][1];
        const link = { l, r, s: ++seed };
        const a = L[l], b = R[r];
        if (ok) {
          links.push(link);
          lineEl(link, 'ok');
          [a, b].forEach((x) => { x.classList.add('done'); x.disabled = true; x.setAttribute('aria-pressed', 'false'); });
          matched++; got++;
          const m = g.hit();
          g.good(b);
          g.add(100 * m, b);
          g.say('¡Bien! ' + pairs[l][0] + ' va con ' + pairs[l][1] + '.');
          info();
          if (got === pairs.length) return roundDone();
          // el foco no se pierde en una tarjeta deshabilitada
          const nxt = L.find((x) => !x.disabled);
          if (nxt && (document.activeElement === a || document.activeElement === b)) nxt.focus({ preventScroll: true });
        } else {
          errors++;
          g.miss();
          const tmp = { l, r, s: link.s };
          const gEl = lineEl(tmp, 'bad');
          [a, b].forEach((x) => { x.classList.add('miss'); g.bad(x); });
          g.say('No van juntas: ' + pairs[l][0] + ' y ' + b.textContent + '.');
          tip.textContent = 'Esas dos no van juntas. ¡Intenta otra vez!';
          g.after(700, () => { gEl.remove(); [a, b].forEach((x) => x.classList.remove('miss')); });
        }
      }
      function roundDone() {
        lock = true;
        tip.textContent = ri + 1 < sizes.length ? '¡Ronda completa! Ahí viene la siguiente…' : '¡Uniste todas las parejas!';
        g.after(250, () => { g.add(50, tip, '¡Ronda completa! +50'); g.confetti(24); });
        g.after(1300, next);
      }
      function win() {
        g.pause();
        const secs = elapsed();
        const bonus = Math.max(0, TOTAL * 2 - errors) * 15 + (TIME ? Math.round(g.t) * 3 : Math.max(0, Math.round(TOTAL * 10 - secs)) * 3);
        g.setScore(g.score + bonus);
        done(true, '¡Uniste todas las parejas!');
      }

      board.addEventListener('click', (e) => tap(e.target.closest('.gm-cn-card')));
      g.key((e) => { if (e.key === 'Escape' && sel) { e.preventDefault(); setSel(null); } });
      g.clock(TIME, () => done(false, '¡Se acabó el tiempo!'));
      if (!TOTAL) { tip.textContent = 'No hay parejas en este reto.'; g.pause(); return; }
      next();
    },
  });
}
