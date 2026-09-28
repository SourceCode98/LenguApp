// Emojiadivina: unos emojis grandes son un acertijo (una obra, un refrán, una figura, un género...).
// Elige entre 4 opciones; al responder aparece la explicación. La racha multiplica los puntos.
// spec: { items:[{e:'🐸🎩🚶‍♂️', q:'¿Qué obra es?', o:[...], a (índice o texto), x?:'explicación corta'}], time?:90, lives?:3 }
import { esc, shuffle } from '../kit.js';
import { makeGame } from './common.js';

function prep(it) {
  const o = (it.o || []).map(String);
  let a = typeof it.a === 'number' ? it.a : o.indexOf(String(it.a));
  if (a < 0 || a >= o.length) a = 0;
  const idx = shuffle(o.map((_, i) => i));
  return { e: String(it.e || '❓'), q: it.q || '¿Qué es?', o: idx.map((i) => o[i]), a: idx.indexOf(a), x: it.x || '', right: o[a] };
}

export default function emoji(el, spec, finish) {
  const items = (spec.items || []).filter((it) => it && it.e && it.o && it.o.length >= 2);
  const LIVES = spec.lives || 3;
  const TIME = spec.time || 90;
  const target = Math.max(1, Math.min(items.length, 12));
  return makeGame(el, spec, finish, {
    key: 'emoji', name: 'Emojiadivina', icon: '☺', time: 'down', lives: LIVES,
    how: 'Mira los emojis y adivina qué obra, refrán o idea esconden. Elige una de las cuatro opciones.',
    rules: [items.length + ' acertijos', TIME + ' segundos', LIVES + ' vidas', '3 seguidas: puntos ×2', '6 seguidas: ×3'],
    stars: (r) => (r.correct >= Math.ceil(target * 0.9) ? 3 : r.correct >= Math.ceil(target * 0.65) ? 2 : r.correct >= Math.ceil(target * 0.35) ? 1 : 0),
    lines: (r) => [['Aciertos', r.correct + ' de ' + r.asked], ['Mejor racha', String(r.bestStreak)], ['Vidas', String(r.lives)]],
    play(g) {
      const deck = shuffle(items.slice()).map(prep);
      let qi = -1, cur = null, locked = true, correct = 0, asked = 0, t0 = 0, waiting = null;
      const missed = [];
      g.stage.innerHTML =
        '<div class="gm-em-top"><p class="gm-qn"></p>' +
        '<div class="gm-em-card"><span class="gm-em-e" role="img"></span></div>' +
        '<h3 class="gm-em-q"></h3></div>' +
        '<div class="gm-opts gm-em-opts" role="group" aria-label="Opciones"></div>' +
        '<div class="gm-exp gm-em-exp" hidden aria-live="polite"></div>';
      const $ = (s) => g.stage.querySelector(s);
      const top = $('.gm-em-top'), qn = $('.gm-qn'), cardE = $('.gm-em-card'), emo = $('.gm-em-e'), qE = $('.gm-em-q'), opts = $('.gm-em-opts'), exp = $('.gm-em-exp');

      const info = () => g.info('<span><b>' + correct + '</b> aciertos</span>');
      const done = (reason) => {
        locked = true;
        g.end({ reason, correct, asked, lives: g.lives, detail: { correct, asked, bestStreak: g.bestStreak, lives: g.lives, missed: missed.slice(0, 10) } });
      };

      function next() {
        waiting = null;
        qi++;
        if (qi >= deck.length) return done('¡Adivinaste todos los acertijos!');
        cur = deck[qi];
        exp.hidden = true;
        exp.className = 'gm-exp gm-em-exp';
        qn.textContent = 'Acertijo ' + (qi + 1) + ' de ' + deck.length;
        emo.textContent = cur.e;
        emo.setAttribute('aria-label', 'Emojis: ' + cur.e);
        cardE.classList.toggle('many', [...cur.e].length > 6);
        cardE.style.setProperty('--tilt', ((qi % 2 ? 1 : -1) * (0.6 + (qi % 3) * 0.5)).toFixed(1) + 'deg');
        qE.textContent = cur.q;
        opts.className = 'gm-opts gm-em-opts' + (cur.o.some((x) => x.length > 34) ? ' long' : '');
        opts.innerHTML = cur.o.map((x, i) => '<button type="button" class="gm-opt gm-em-opt" data-i="' + i + '"><kbd>' + (i + 1) + '</kbd><span>' + esc(x) + '</span></button>').join('');
        g.bump(top, 'gm-in');
        g.bump(opts, 'gm-in');
        info();
        locked = false;
        t0 = performance.now();
        g.say('Acertijo ' + (qi + 1) + '. ' + cur.q);
        g.resume();
      }

      function choose(i) {
        if (locked || !cur || i < 0 || i >= cur.o.length) return;
        locked = true;
        asked++;
        const btns = opts.querySelectorAll('.gm-opt');
        btns.forEach((b) => (b.disabled = true));
        const b = btns[i];
        g.pause();
        if (i === cur.a) {
          correct++;
          const m = g.hit();
          const secs = (performance.now() - t0) / 1000;
          const fast = secs < 5 ? 50 : secs < 9 ? 20 : 0;
          b.classList.add('right');
          g.good(b);
          g.good(cardE);
          g.add(100 * m + fast, b);
          info();
          exp.hidden = false;
          exp.classList.add('ok');
          exp.innerHTML = '<b>¡Sí! ' + esc(cur.right) + '.</b> ' + esc(cur.x);
          g.bump(exp, 'gm-in');
          g.say('Correcto: ' + cur.right + '. ' + cur.x);
          // tiempo para leer la explicación (el reloj está en pausa)
          g.after(cur.x ? Math.min(3200, 1300 + cur.x.length * 22) : 900, next);
        } else {
          g.miss();
          b.classList.add('wrong');
          btns[cur.a].classList.add('right');
          g.bad(b);
          g.bad(cardE);
          missed.push(cur.e + ' ' + cur.right);
          const left = g.loseLife();
          exp.hidden = false;
          exp.innerHTML = '<b>Era: ' + esc(cur.right) + '.</b> ' + esc(cur.x) +
            '<div class="gm-exp-go"><button type="button" class="gm-btn sm">' + (left <= 0 ? 'Ver resultado' : 'Entendido, continuar') + '</button></div>';
          g.bump(exp, 'gm-in');
          const goB = exp.querySelector('button');
          waiting = () => { waiting = null; left <= 0 ? done('Te quedaste sin vidas') : next(); };
          goB.onclick = () => waiting && waiting();
          g.after(60, () => goB.focus({ preventScroll: true }));
        }
      }

      opts.addEventListener('click', (e) => { const b = e.target.closest('.gm-opt'); if (b) choose(+b.dataset.i); });
      g.key((e) => {
        if (waiting) { if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') { e.preventDefault(); waiting(); } return; }
        const n = parseInt(e.key, 10); if (n >= 1 && n <= 9) { e.preventDefault(); choose(n - 1); }
      });
      g.clock(TIME, () => done('¡Se acabó el tiempo!'));
      if (!deck.length) { qE.textContent = 'No hay acertijos en este reto.'; g.pause(); return; }
      next();
    },
  });
}
