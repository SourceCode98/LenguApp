// Palabra secreta: adivina la palabra letra por letra; cada error sube la tinta del tintero, que se derrama al final.
// spec: { words:[{w:'METÁFORA', h:'Figura que nombra una cosa con el nombre de otra'}], lives:6, count:8, time? }
//   Las tildes no cuentan al adivinar: la O también destapa la Ó. La Ñ es una letra aparte.
import { esc, shuffle } from '../kit.js';
import { makeGame } from './common.js';

const ABC = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
const base = (c) => (c === 'Ñ' ? 'Ñ' : c.normalize('NFD').replace(/[̀-ͯ]/g, ''));
const isLetter = (c) => ABC.includes(base(c));
let uid = 0;

// Tintero: cada error sube la tinta; al llegar al tope se derrama sobre el pupitre.
const FLASK = (id) =>
  '<svg viewBox="-14 -26 148 180" aria-hidden="true">' +
  '<defs><clipPath id="' + id + '"><path d="M26 74 Q16 74 16 84 L16 130 Q16 140 26 140 L94 140 Q104 140 104 130 L104 84 Q104 74 94 74 L78 74 L78 50 L42 50 L42 74 Z"/></clipPath></defs>' +
  '<ellipse class="gm-wd-desk" cx="60" cy="146" rx="62" ry="5"/>' +
  '<g class="gm-wd-spill"><path d="M38 44 Q30 40 30 50 Q30 60 22 66 Q12 74 14 90 Q16 100 10 108 Q6 116 12 118 Q18 118 18 108 Q20 96 26 84 Z"/>' +
  '<path class="d2" d="M82 44 Q92 42 92 54 Q92 66 100 76 Q108 88 106 104 Q104 114 110 124 Q112 130 106 130 Q100 128 100 118 Q100 102 94 88 Z"/>' +
  '<path d="M-6 146 Q10 138 30 144 Q50 136 70 144 Q92 138 112 143 Q128 146 118 152 Q60 158 2 152 Q-12 150 -6 146 Z"/></g>' +
  '<g clip-path="url(#' + id + ')"><rect class="gm-wd-liq" x="0" y="140" width="120" height="140"/>' +
  '</g>' +
  '<path class="gm-wd-glass" d="M26 74 Q16 74 16 84 L16 130 Q16 140 26 140 L94 140 Q104 140 104 130 L104 84 Q104 74 94 74 L78 74 L78 50 L42 50 L42 74 Z"/>' +
  '<path class="gm-wd-rim" d="M38 50 L82 50 L82 42 L38 42 Z"/>' +
  '<path class="gm-wd-marks" d="M28 96 Q30 86 40 84"/>' +
  '<g class="gm-wd-quill"><path class="gm-wd-feather" d="M66 46 Q70 18 92 -6 Q104 -20 112 -22 Q108 -8 100 6 Q92 22 70 44 Z"/>' +
  '<path class="gm-wd-shaft" d="M58 66 L110 -20"/></g>' +
  '</svg>';

export default function word(el, spec, finish) {
  const all = (spec.words || [])
    .map((x) => (typeof x === 'string' ? { w: x, h: '' } : x))
    .filter((x) => x && x.w && String(x.w).split('').some(isLetter))
    .map((x) => ({ w: String(x.w).toLocaleUpperCase('es-CO').trim(), h: x.h || '' }));
  const LIVES = Math.max(3, Math.min(10, spec.lives || 6));
  const COUNT = Math.max(1, Math.min(all.length || 1, spec.count || 8));
  const TIME = spec.time || 0;
  return makeGame(el, spec, finish, {
    key: 'word', name: 'Palabra secreta', icon: '✎', time: TIME ? 'down' : 'up', lives: 0,
    how: 'Adivina la palabra letra por letra. Cada error sube la tinta del tintero: ¡que no se derrame!',
    rules: [COUNT + (COUNT === 1 ? ' palabra' : ' palabras'), LIVES + ' errores por palabra', 'Las tildes no cuentan', 'Teclado en pantalla o físico'],
    stars: (r) => { const f = r.total ? r.solved / r.total : 0; return f >= 1 ? 3 : f >= 0.66 ? 2 : r.solved >= 1 && f >= 0.33 ? 1 : 0; },
    lines: (r) => [['Resueltas', r.solved + ' de ' + r.total], ['Errores', String(r.errors)], ['Mejor racha', String(r.bestStreak)]],
    play(g) {
      const deck = shuffle(all.slice()).slice(0, COUNT);
      let wi = -1, cur = null, chars = [], shown = [], used = new Set(), errs = 0, busy = false;
      let solved = 0, errors = 0;
      const results = [];
      const fid = 'gm-wd-clip' + ++uid;
      g.stage.innerHTML =
        '<div class="gm-q gm-wd-hint" aria-live="polite"><p class="gm-qn"></p><h3 class="gm-qt"></h3></div>' +
        '<div class="gm-wd-mid">' +
        '<div class="gm-wd-flask"><div class="gm-wd-fsvg">' + FLASK(fid) + '</div><p class="gm-wd-left"></p></div>' +
        '<div class="gm-wd-word" aria-label="Palabra"></div>' +
        '</div>' +
        '<div class="gm-wd-kb" role="group" aria-label="Teclado">' +
        ABC.map((c) => '<button type="button" class="gm-wd-k" data-k="' + c + '">' + c + '</button>').join('') +
        '</div>';
      const qn = g.stage.querySelector('.gm-qn');
      const qt = g.stage.querySelector('.gm-qt');
      const hintBox = g.stage.querySelector('.gm-wd-hint');
      const flask = g.stage.querySelector('.gm-wd-flask');
      const liq = flask.querySelector('.gm-wd-liq');
      const leftE = flask.querySelector('.gm-wd-left');
      const wordE = g.stage.querySelector('.gm-wd-word');
      const kb = g.stage.querySelector('.gm-wd-kb');
      const keys = {};
      kb.querySelectorAll('.gm-wd-k').forEach((b) => (keys[b.dataset.k] = b));

      const info = () => g.info('<span>Palabra <b>' + Math.max(1, wi + 1) + '</b> de ' + deck.length + '</span><span><b>' + solved + '</b> ' + (solved === 1 ? 'resuelta' : 'resueltas') + '</span>');
      function drawFlask() {
        const f = errs / LIVES;
        liq.setAttribute('y', String(140 - f * 96));
        flask.style.setProperty('--f', f.toFixed(3));
        flask.classList.toggle('warm', f >= 0.5);
        flask.classList.toggle('hot', f >= 0.8);
        flask.classList.toggle('boil', errs > 0);
        const left = LIVES - errs;
        leftE.innerHTML = left > 0 ? 'Te quedan <b>' + left + '</b> ' + (left === 1 ? 'error' : 'errores') : '<b>¡Se derramó!</b>';
      }

      function next() {
        wi++;
        if (wi >= deck.length) return done('¡Completaste todas las palabras!');
        cur = deck[wi];
        chars = cur.w.split('');
        shown = chars.map((c) => !isLetter(c));
        used = new Set(); errs = 0; busy = false;
        flask.classList.remove('over', 'win');
        qn.textContent = 'Pista · palabra ' + (wi + 1) + ' de ' + deck.length + ' · ' + chars.filter(isLetter).length + ' letras';
        qt.textContent = cur.h || 'Sin pista: ¡adivina!';
        const parts = cur.w.split(/(\s+)/).filter((p) => p.length && !/^\s+$/.test(p));
        const longest = Math.max(...parts.map((p) => p.length));
        wordE.style.setProperty('--n', String(Math.max(6, longest)));
        let idx = 0, h = '';
        cur.w.split(/(\s+)/).forEach((p) => {
          if (/^\s+$/.test(p)) { idx += p.length; return; }
          h += '<span class="gm-wd-part">';
          p.split('').forEach((c) => {
            h += '<i class="gm-wd-l' + (isLetter(c) ? '' : ' fix') + '" data-i="' + idx + '">' + (isLetter(c) ? '' : esc(c)) + '</i>';
            idx++;
          });
          h += '</span>';
        });
        wordE.innerHTML = h;
        Object.values(keys).forEach((b) => { b.className = 'gm-wd-k'; b.disabled = false; });
        drawFlask();
        info();
        g.bump(hintBox, 'gm-in');
        g.bump(wordE, 'gm-in');
        g.say('Nueva palabra de ' + chars.filter(isLetter).length + ' letras. Pista: ' + (cur.h || 'sin pista'));
        g.resume();
      }
      const slot = (i) => wordE.querySelector('[data-i="' + i + '"]');

      function guess(L) {
        if (busy || !cur || used.has(L)) { if (keys[L] && used.has(L)) g.bump(keys[L], 'gm-shake'); return; }
        used.add(L);
        const kbtn = keys[L];
        kbtn.disabled = true;
        const hits = [];
        chars.forEach((c, i) => { if (!shown[i] && base(c) === L) hits.push(i); });
        if (hits.length) {
          const m = g.hit();
          kbtn.classList.add('yes');
          hits.forEach((i, j) => {
            shown[i] = true;
            const s = slot(i);
            s.textContent = chars[i];
            s.style.setProperty('--d', j * 70 + 'ms');
            s.classList.add('on');
          });
          g.good(kbtn);
          g.add(20 * hits.length * m, slot(hits[0]));
          g.say('Sí: ' + hits.length + (hits.length === 1 ? ' letra ' : ' letras ') + L);
          if (shown.every(Boolean)) win();
        } else {
          g.miss();
          errs++; errors++;
          kbtn.classList.add('no');
          g.bad(kbtn);
          g.bump(flask, 'gm-wd-glug');
          drawFlask();
          g.say('No hay ' + L + '. Te quedan ' + (LIVES - errs) + ' errores.');
          if (errs >= LIVES) lose();
        }
      }
      function win() {
        busy = true;
        solved++;
        const left = LIVES - errs;
        results.push({ w: cur.w, ok: true, errors: errs });
        wordE.querySelectorAll('.gm-wd-l').forEach((s, j) => { s.style.setProperty('--d', j * 45 + 'ms'); s.classList.add('win'); });
        flask.classList.add('win');
        g.pause();
        g.after(260, () => { g.add(100 + 40 * left, wordE, '¡' + cur.w + '! +' + (100 + 40 * left)); if (left === LIVES) g.confetti(30); });
        info();
        g.after(1500, next);
      }
      function lose() {
        busy = true;
        results.push({ w: cur.w, ok: false, errors: errs });
        flask.classList.add('over');
        g.pause();
        chars.forEach((c, i) => { if (!shown[i]) { const s = slot(i); s.textContent = c; s.classList.add('miss'); s.style.setProperty('--d', i * 40 + 'ms'); } });
        g.bump(wordE, 'gm-shake');
        g.say('Se derramó la tinta. La palabra era ' + cur.w);
        g.after(2300, next);
      }
      function done(reason) {
        g.end({ reason, solved, total: deck.length, errors, detail: { solved, total: deck.length, errors, bestStreak: g.bestStreak, words: results } });
      }

      kb.addEventListener('click', (e) => { const b = e.target.closest('.gm-wd-k'); if (b) guess(b.dataset.k); });
      g.key((e) => {
        if (e.key.length !== 1) return;
        const L = base(e.key.toLocaleUpperCase('es-CO'));
        if (!ABC.includes(L)) return;
        e.preventDefault();
        if (keys[L] && !keys[L].disabled) g.bump(keys[L], 'gm-press');
        guess(L);
      });
      if (TIME) g.clock(TIME, () => { busy = true; done('¡Se acabó el tiempo!'); });
      else g.clock(0);
      if (!deck.length) { qt.textContent = 'No hay palabras en este reto.'; g.pause(); return; }
      next();
    },
  });
}
