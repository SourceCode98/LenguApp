// Duelo de argumentos: el Sofista lanza afirmaciones; «Acepto» si es un argumento válido, «Bloqueo» si es una falacia.
// Al bloquear bien una falacia se puede nombrar para un golpe crítico.
// spec: { items:[{s:'Todos los que usan celular son malos estudiantes', ok:false, f:'Generalización apresurada', e:'…'}], lives:3, time:90,
//         names?:['Ad hominem', ...] }   names (opcional) = nombres de falacias para las opciones; si falta se usan los de los ítems y unos comunes.
import { esc, shuffle } from '../kit.js';
import { makeGame, pick } from './common.js';

const FALLACIES = ['Ad hominem', 'Generalización apresurada', 'Falso dilema', 'Pendiente resbaladiza', 'Hombre de paja',
  'Apelación a la mayoría', 'Falsa causa', 'Apelación a la autoridad', 'Pregunta compleja', 'Apelación a la emoción'];
const TAUNTS = ['¡A ver si te das cuenta!', '¿Me lo aceptas?', 'Esta es irrefutable…', '¡Toma esta!', 'Escucha bien…', '¡Nadie me gana!'];
const RIVAL =
  '<svg viewBox="0 0 80 80" aria-hidden="true">' +
  '<ellipse class="gm-du-sh" cx="40" cy="76" rx="22" ry="3.5"/>' +
  '<path class="gm-du-cape" d="M16 76 Q18 50 40 46 Q62 50 64 76 Z"/>' +
  '<path class="gm-du-bow" d="M33 50 L40 54 L47 50 L47 58 L40 54 L33 58 Z"/>' +
  '<circle class="gm-du-face" cx="40" cy="30" r="17"/>' +
  '<path class="gm-du-hat" d="M22 17 L58 17 L56 13 L52 13 L52 0 L28 0 L28 13 L24 13 Z"/>' +
  '<rect class="gm-du-band" x="28" y="9" width="24" height="4"/>' +
  '<g class="gm-du-eyes"><path d="M29 24 L36 27"/><path d="M51 24 L44 27"/><circle cx="33" cy="30" r="2"/><circle cx="47" cy="30" r="2"/></g>' +
  '<g class="gm-du-ko"><path d="M30 27 L36 33 M36 27 L30 33"/><path d="M44 27 L50 33 M50 27 L44 33"/></g>' +
  '<path class="gm-du-must" d="M30 39 Q35 35 40 38 Q45 35 50 39 Q45 38 40 41 Q35 38 30 39 Z"/>' +
  '</svg>';

export default function duelo(el, spec, finish) {
  const items = (spec.items || []).filter((it) => it && it.s && typeof it.ok === 'boolean');
  const LIVES = spec.lives || 3;
  const TIME = spec.time || 90;
  const N = items.length;
  const pool = [...new Set((spec.names || []).concat(items.filter((x) => !x.ok && x.f).map((x) => x.f), FALLACIES))];
  return makeGame(el, spec, finish, {
    key: 'duelo', name: 'Duelo de argumentos', icon: '⚔', time: 'down', lives: LIVES,
    how: 'El Sofista lanza afirmaciones: acepta los argumentos válidos y bloquea las falacias.',
    rules: [TIME + ' segundos', LIVES + ' vidas', 'Nombra la falacia: golpe crítico', 'Teclas ← Acepto · Bloqueo →'],
    stars: (r) => { const f = r.total ? r.correct / r.total : 0; return f >= 0.9 ? 3 : f >= 0.65 ? 2 : f >= 0.35 ? 1 : 0; },
    lines: (r) => [['Respuestas', r.correct + ' de ' + r.asked], ['Falacias nombradas', String(r.named)], ['Mejor racha', String(r.bestStreak)]],
    play(g) {
      const deck = shuffle(items.slice());
      g.stage.innerHTML =
        '<div class="gm-du-arena">' +
        '<div class="gm-du-rival"><div class="gm-du-av">' + RIVAL + '</div>' +
        '<div class="gm-du-rn"><b>El Sofista</b><div class="gm-du-hp" role="img" aria-label="Vida del rival"><i></i></div><small class="gm-du-taunt"></small></div></div>' +
        '<div class="gm-du-bubble"><p class="gm-qn">Afirma:</p><p class="gm-du-s"></p><span class="gm-du-shield" aria-hidden="true">' +
        '<svg viewBox="0 0 40 46"><path d="M20 2 L37 8 Q37 32 20 44 Q3 32 3 8 Z"/><path class="c" d="M12 22 L18 28 L29 15"/></svg></span></div>' +
        '</div>' +
        '<div class="gm-du-btns">' +
        '<button type="button" class="gm-du-b yes" data-v="1"><kbd>←</kbd><span>Acepto</span></button>' +
        '<button type="button" class="gm-du-b no" data-v="0"><span>Bloqueo</span><kbd>→</kbd></button>' +
        '</div>' +
        '<div class="gm-du-name" hidden><p class="gm-qn">¡Bloqueado! ¿Qué falacia es? <span>(golpe crítico)</span></p><div class="gm-opts"></div></div>' +
        '<div class="gm-exp gm-du-exp" hidden></div>';
      const $ = (s) => g.stage.querySelector(s);
      const arena = $('.gm-du-arena'), rival = $('.gm-du-rival'), hp = $('.gm-du-hp i'), taunt = $('.gm-du-taunt');
      const bubble = $('.gm-du-bubble'), sE = $('.gm-du-s'), btns = [...g.stage.querySelectorAll('.gm-du-b')];
      const nameBox = $('.gm-du-name'), nameOpts = nameBox.querySelector('.gm-opts'), exp = $('.gm-du-exp');
      let qi = -1, cur = null, state = 'idle', correct = 0, asked = 0, named = 0, dmg = 0, names = [], waitT = null;
      const missed = [];
      const info = () => g.info('<span>Ronda <b>' + Math.max(1, Math.min(N, qi + 1)) + '</b> de ' + N + '</span><span><b>' + correct + '</b> ' + (correct === 1 ? 'acierto' : 'aciertos') + '</span>');
      const drawHP = () => { const f = N ? Math.max(0, 1 - dmg / N) : 1; hp.style.transform = 'scaleX(' + f.toFixed(3) + ')'; hp.parentNode.classList.toggle('low', f <= 0.34); };
      const done = (reason, title) => { state = 'over'; g.end({ reason, title, correct, asked, total: N, named, detail: { correct, asked, total: N, named, bestStreak: g.bestStreak, lives: g.lives, missed: missed.slice(0, 10) } }); };

      function next() {
        if (waitT) { g.cancel(waitT); waitT = null; }
        qi++;
        if (qi >= N) return correct === N ? done('¡Derrotaste al Sofista!', '¡Duelo ganado!') : done('Se acabaron los argumentos del Sofista');
        cur = deck[qi];
        sE.textContent = cur.s;
        bubble.className = 'gm-du-bubble';
        g.bump(bubble, 'gm-du-throw');
        taunt.textContent = pick(TAUNTS);
        rival.className = 'gm-du-rival';
        g.bump(rival, 'gm-du-cast');
        nameBox.hidden = true;
        exp.hidden = true;
        btns.forEach((b) => { b.disabled = false; b.classList.remove('right', 'wrong'); });
        state = 'ask';
        info();
        g.say('El Sofista dice: ' + cur.s);
        g.resume();
      }

      function hitRival(amount) {
        dmg = Math.min(N, dmg + amount);
        drawHP();
        rival.classList.remove('hurt');
        g.bump(rival, 'hurt');
      }

      function answer(accept) {
        if (state !== 'ask') return;
        asked++;
        const ok = accept === cur.ok;
        const btn = btns[accept ? 0 : 1];
        btns.forEach((b) => (b.disabled = true));
        g.bump(btn, 'gm-press');
        if (ok) {
          correct++;
          const m = g.hit();
          btn.classList.add('right');
          g.good(btn);
          bubble.classList.add(accept ? 'accepted' : 'blocked');
          hitRival(1);
          g.add(100 * m, bubble);
          info();
          if (!accept && cur.f) return askName();
          if (!accept) { g.say('¡Bloqueado! Es una falacia.'); return showExp(true, false); }
          g.say('Correcto: es un argumento válido.');
          return showExp(true, false);
        }
        g.miss();
        btn.classList.add('wrong');
        g.bad(btn);
        bubble.classList.add(accept ? 'hitme' : 'wrongblock');
        g.bump(arena, 'gm-du-ouch');
        missed.push(cur.s);
        const left = g.loseLife();
        info();
        g.say(cur.ok ? 'No: ese argumento era válido.' : 'No: era una falacia' + (cur.f ? ', ' + cur.f : '') + '.');
        showExp(false, left <= 0);
      }

      function askName() {
        state = 'name';
        g.pause();
        const others = shuffle(pool.filter((x) => x.toLowerCase() !== cur.f.toLowerCase())).slice(0, 2);
        names = shuffle([cur.f].concat(others));
        nameOpts.innerHTML = names.map((x, i) => '<button type="button" class="gm-opt" data-i="' + i + '"><kbd>' + (i + 1) + '</kbd><span>' + esc(x) + '</span></button>').join('');
        nameBox.hidden = false;
        g.bump(nameBox, 'gm-in');
        g.say('¡Bloqueado! ¿Qué falacia es? ' + names.join(', '));
      }
      function nameIt(i) {
        if (state !== 'name') return;
        const bs = [...nameOpts.querySelectorAll('.gm-opt')];
        bs.forEach((b) => (b.disabled = true));
        const ok = names[i] === cur.f;
        if (ok) {
          named++;
          bs[i].classList.add('right');
          g.good(bs[i]);
          g.add(80 * g.mult, bs[i], '¡Crítico! +' + 80 * g.mult);
          rival.classList.add('crit');
          g.bump(rival, 'hurt');
        } else {
          bs[i].classList.add('wrong');
          bs[names.indexOf(cur.f)].classList.add('right');
          g.bad(bs[i]);
        }
        showExp(true, false, ok);
      }

      function showExp(ok, dying, namedOk) {
        state = dying ? 'dying' : 'show';
        g.pause();
        const head = ok
          ? (cur.ok ? '¡Bien aceptado! Es un argumento válido.' : '¡Bien bloqueado!' + (cur.f ? ' Es «' + esc(cur.f) + '».' : ' Es una falacia.'))
          : (cur.ok ? 'Ese argumento era válido.' : 'Era una falacia' + (cur.f ? ': «' + esc(cur.f) + '»' : '') + '.');
        const wait = !ok || namedOk === false;
        exp.innerHTML = '<b>' + head + '</b> ' + esc(cur.e || '') + (wait ? '<div class="gm-exp-go"><button type="button" class="gm-btn sm">Seguir</button></div>' : '');
        exp.hidden = false;
        g.bump(exp, 'gm-in');
        const b = exp.querySelector('.gm-btn');
        if (b) { b.onclick = cont; try { b.focus({ preventScroll: true }); } catch (x) { /* ignorar */ } }
        if (!wait) waitT = g.after(cur.e ? 2600 : 1400, cont);
        if (ok && dmg >= N && correct === N) { rival.classList.add('ko'); g.confetti(40); }
      }
      function cont() {
        if (state === 'dying') return done('Te quedaste sin vidas');
        if (state === 'show') next();
      }

      g.stage.querySelector('.gm-du-btns').addEventListener('click', (e) => { const b = e.target.closest('.gm-du-b'); if (b) answer(b.dataset.v === '1'); });
      nameOpts.addEventListener('click', (e) => { const b = e.target.closest('.gm-opt'); if (b) nameIt(+b.dataset.i); });
      g.key((e) => {
        if (state === 'ask' && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) { e.preventDefault(); answer(e.key === 'ArrowLeft'); return; }
        const n = parseInt(e.key, 10);
        if (state === 'name' && n >= 1 && n <= names.length) { e.preventDefault(); nameIt(n - 1); return; }
        if ((state === 'show' || state === 'dying') && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight' || e.key === 'ArrowLeft') && e.target.tagName !== 'BUTTON') { e.preventDefault(); cont(); }
      });
      drawHP();
      g.clock(TIME, () => { if (state !== 'over') done('¡Se acabó el tiempo!'); });
      if (!N) { sE.textContent = 'No hay afirmaciones en este reto.'; btns.forEach((b) => (b.disabled = true)); g.pause(); return; }
      next();
    },
  });
}
