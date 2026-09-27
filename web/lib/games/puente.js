// Puente de conectores: elige el conector que une las dos orillas; el tramo se pone y alguien cruza.
// spec: { items:[{a:'Estudié mucho', b:'aprobé el examen', o:['por eso','aunque','además'], k:0, e:'«Por eso» introduce una consecuencia.'}], time:90, lives:3 }
//   k = índice de la opción correcta (también se acepta el texto). Las opciones se barajan.
import { esc, shuffle, reduce } from '../kit.js';
import { makeGame } from './common.js';

const WALKER =
  '<svg viewBox="0 0 40 60" aria-hidden="true">' +
  '<g class="gm-pu-legs"><path class="l1" d="M17 40 L13 57"/><path class="l2" d="M23 40 L27 57"/></g>' +
  '<rect class="gm-pu-pack" x="5" y="20" width="9" height="15" rx="3"/>' +
  '<path class="gm-pu-body" d="M12 22 Q20 17 28 22 L27 42 L13 42 Z"/>' +
  '<path class="gm-pu-arm" d="M27 24 L32 36"/>' +
  '<circle class="gm-pu-head" cx="20" cy="11" r="8"/>' +
  '<path class="gm-pu-hair" d="M12 10 Q14 2 21 3 Q28 3 28 10 Q23 6 12 10 Z"/>' +
  '<circle class="gm-pu-eye" cx="23" cy="11" r="1.3"/>' +
  '</svg>';

function prep(it) {
  if (!it || !it.a || !it.b || !Array.isArray(it.o) || it.o.length < 2) return null;
  const o = it.o.map(String);
  let k = typeof it.k === 'number' ? it.k : o.indexOf(String(it.k));
  if (k < 0 || k >= o.length) k = 0;
  const idx = shuffle(o.map((_, i) => i));
  return { a: String(it.a), b: String(it.b), o: idx.map((i) => o[i]), k: idx.indexOf(k), e: it.e || '' };
}

export default function puente(el, spec, finish) {
  const raw = (spec.items || []).filter((it) => it && it.a && it.b && Array.isArray(it.o) && it.o.length >= 2);
  const TIME = spec.time || 90;
  const LIVES = spec.lives || 3;
  const target = Math.max(1, Math.min(raw.length, 12));
  return makeGame(el, spec, finish, {
    key: 'puente', name: 'Puente de conectores', icon: '⌒', time: 'down', lives: LIVES,
    how: 'Elige el conector que une las dos ideas: cada acierto pone un tramo del puente y alguien cruza.',
    rules: [TIME + ' segundos', LIVES + ' vidas', '3 seguidas: puntos ×2', 'Teclas 1 a 4'],
    stars: (r) => (r.correct >= Math.ceil(target * 0.9) ? 3 : r.correct >= Math.ceil(target * 0.65) ? 2 : r.correct >= Math.ceil(target * 0.35) ? 1 : 0),
    lines: (r) => [['Puentes', r.correct + ' de ' + r.asked], ['Mejor racha', String(r.bestStreak)]],
    play(g) {
      const deck = shuffle(raw.slice()).map(prep).filter(Boolean);
      g.stage.innerHTML =
        '<div class="gm-q gm-pu-q"><p class="gm-qn"></p><p class="gm-pu-sent" aria-live="polite"></p></div>' +
        '<div class="gm-pu-scene" aria-hidden="true">' +
        '<div class="gm-pu-water"><i></i><i></i></div>' +
        '<div class="gm-pu-bank l"></div><div class="gm-pu-bank r"></div>' +
        '<div class="gm-pu-rope"></div>' +
        '<div class="gm-pu-deck l"></div><div class="gm-pu-deck r"></div>' +
        '<div class="gm-pu-gap"><span>?</span></div>' +
        '<div class="gm-pu-plank"><span></span></div>' +
        '<div class="gm-pu-walker">' + WALKER + '</div>' +
        '<div class="gm-pu-splash"><i></i><i></i><i></i></div>' +
        '</div>' +
        '<div class="gm-opts gm-pu-opts"></div>' +
        '<div class="gm-exp gm-pu-exp" hidden></div>';
      const $ = (s) => g.stage.querySelector(s);
      const qn = $('.gm-qn'), sent = $('.gm-pu-sent'), scene = $('.gm-pu-scene'), plank = $('.gm-pu-plank'), walker = $('.gm-pu-walker');
      const optsE = $('.gm-pu-opts'), exp = $('.gm-pu-exp'), splash = $('.gm-pu-splash');
      let qi = -1, cur = null, state = 'idle', correct = 0, asked = 0, t0 = 0, waitT = null;
      const missed = [];
      const info = () => g.info('<span>Puente <b>' + Math.max(1, Math.min(deck.length, qi + 1)) + '</b> de ' + deck.length + '</span><span><b>' + correct + '</b> ' + (correct === 1 ? 'cruce' : 'cruces') + '</span>');
      const done = (reason) => { state = 'over'; g.end({ reason, correct, asked, detail: { correct, asked, bestStreak: g.bestStreak, missed: missed.slice(0, 10) } }); };
      const blank = (html, cls) => '<span class="gm-pu-a">' + esc(cur.a) + '</span> <span class="gm-pu-blank ' + (cls || '') + '">' + html + '</span> <span class="gm-pu-b">' + esc(cur.b) + '</span>';

      function next() {
        if (waitT) { g.cancel(waitT); waitT = null; }
        qi++;
        if (qi >= deck.length) return done('¡Cruzaste todos los puentes!');
        cur = deck[qi];
        qn.textContent = 'Une las dos orillas · ' + (qi + 1) + ' de ' + deck.length;
        sent.innerHTML = blank('<i>¿…?</i>');
        exp.hidden = true;
        scene.className = 'gm-pu-scene';
        walker.className = 'gm-pu-walker';
        plank.className = 'gm-pu-plank';
        optsE.classList.toggle('long', cur.o.some((x) => x.length > 22));
        optsE.innerHTML = cur.o.map((x, i) => '<button type="button" class="gm-opt" data-i="' + i + '"><kbd>' + (i + 1) + '</kbd><span>' + esc(x) + '</span></button>').join('');
        g.bump($('.gm-pu-q'), 'gm-in');
        state = 'ask';
        info();
        g.say(cur.a + ' … ' + cur.b + '. Elige el conector.');
        t0 = performance.now();
        g.resume();
      }

      function answer(i) {
        if (state !== 'ask') return;
        state = 'show';
        asked++;
        const ok = i === cur.k;
        const btns = [...optsE.querySelectorAll('.gm-opt')];
        btns.forEach((b) => (b.disabled = true));
        const btn = btns[i];
        g.bump(btn, 'gm-press');
        plank.querySelector('span').textContent = cur.o[i];
        plank.className = 'gm-pu-plank in';
        if (ok) {
          correct++;
          const m = g.hit();
          const secs = (performance.now() - t0) / 1000;
          const fast = secs < 4 ? 50 : secs < 8 ? 20 : 0;
          btn.classList.add('right');
          g.good(btn);
          sent.innerHTML = blank(esc(cur.o[i]), 'ok');
          scene.classList.add('ok');
          g.after(reduce ? 0 : 380, () => { walker.classList.add('walk'); });
          g.add(100 * m + fast, btn);
          g.say('¡Correcto! ' + cur.a + ' ' + cur.o[i] + ' ' + cur.b);
          info();
          showExp(true);
          waitT = g.after(cur.e ? 2600 : 1900, cont);
        } else {
          g.miss();
          btn.classList.add('wrong');
          btns[cur.k].classList.add('right');
          g.bad(btn);
          missed.push(cur.a + ' ' + cur.o[cur.k] + ' ' + cur.b);
          sent.innerHTML = blank('<s>' + esc(cur.o[i]) + '</s> ' + esc(cur.o[cur.k]), 'no');
          g.after(reduce ? 0 : 420, () => {
            plank.classList.add('crack');
            walker.classList.add('scared');
            g.after(reduce ? 0 : 380, () => { plank.classList.add('fall'); g.bump(splash, 'on'); });
          });
          g.say('No. El conector es ' + cur.o[cur.k] + '. ' + cur.e);
          g.pause();
          const left = g.loseLife();
          if (left <= 0) state = 'dying';
          showExp(false);
        }
      }
      function showExp(ok) {
        exp.innerHTML =
          '<b>' + (ok ? '¡Puente firme!' : 'El puente se agrietó.') + '</b> ' +
          (ok ? '' : 'El conector correcto es «' + esc(cur.o[cur.k]) + '». ') + esc(cur.e || '') +
          (ok ? '' : '<div class="gm-exp-go"><button type="button" class="gm-btn sm">Seguir</button></div>');
        exp.hidden = false;
        g.bump(exp, 'gm-in');
        const b = exp.querySelector('.gm-btn');
        if (b) { b.onclick = cont; try { b.focus({ preventScroll: true }); } catch (x) { /* ignorar */ } }
      }
      function cont() {
        if (state === 'dying') return done('Te quedaste sin vidas');
        if (state !== 'show') return;
        next();
      }

      optsE.addEventListener('click', (e) => { const b = e.target.closest('.gm-opt'); if (b) answer(+b.dataset.i); });
      g.key((e) => {
        const n = parseInt(e.key, 10);
        if (state === 'ask' && n >= 1 && n <= cur.o.length) { e.preventDefault(); answer(n - 1); return; }
        if ((e.key === 'Enter' || e.key === ' ') && (state === 'show' || state === 'dying') && e.target.tagName !== 'BUTTON') { e.preventDefault(); cont(); }
      });
      g.clock(TIME, () => { if (state !== 'over') done('¡Se acabó el tiempo!'); });
      if (!deck.length) { sent.textContent = 'No hay oraciones en este reto.'; g.pause(); return; }
      next();
    },
  });
}
