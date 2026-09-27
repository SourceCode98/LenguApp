// Lluvia de tildes: caen palabras sin tilde; toca la vocal que la lleva (o «Sin tilde») antes de que toquen el suelo.
// spec: { words:[{w:'arbol', a:'árbol'}, {w:'examen', a:'examen'}], time:60, lives:3 }
//   w es la palabra sin tilde (si falta, se calcula quitando la tilde de a); a es la forma correcta.
//   Las palabras se repiten barajadas hasta que se acaba el tiempo o las vidas.
import { esc, shuffle, reduce } from '../kit.js';
import { makeGame, clamp } from './common.js';

const ACC = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', Á: 'A', É: 'E', Í: 'I', Ó: 'O', Ú: 'U' };
const VOW = 'aeiouAEIOUüÜ';
const plain = (s) => s.replace(/[áéíóúÁÉÍÓÚ]/g, (c) => ACC[c]);

// Devuelve {w, a, pos} con pos = índice de la vocal con tilde (-1 si va sin tilde) o null si el ítem no sirve.
function prep(it) {
  if (!it) return null;
  if (typeof it === 'string') it = { a: it };
  const a = String(it.a || it.w || '').trim();
  if (!a) return null;
  const w = plain(String(it.w || a).trim());
  const A = [...a], W = [...w];
  if (A.length !== W.length || plain(a) !== w) return null;
  let pos = -1;
  for (let i = 0; i < A.length; i++) {
    if (A[i] === W[i]) continue;
    if (pos >= 0 || !ACC[A[i]]) return null;
    pos = i;
  }
  return { w, a, pos, chars: W };
}

export default function tildes(el, spec, finish) {
  const words = (spec.words || []).map(prep).filter(Boolean);
  const TIME = spec.time || 60;
  const LIVES = spec.lives || 3;
  const k = TIME / 60;
  const th = [Math.max(2, Math.round(5 * k)), Math.max(4, Math.round(10 * k)), Math.max(6, Math.round(15 * k))];
  return makeGame(el, spec, finish, {
    key: 'tildes', name: 'Lluvia de tildes', icon: 'á', time: 'down', lives: LIVES,
    how: 'Caen palabras sin tilde: toca la vocal que la lleva o «Sin tilde» antes de que toquen el suelo.',
    rules: [TIME + ' segundos', LIVES + ' vidas', 'Cada vez más rápido', 'Teclas 1 a 5 · Espacio: sin tilde'],
    stars: (r) => (r.correct >= th[2] ? 3 : r.correct >= th[1] ? 2 : r.correct >= th[0] ? 1 : 0),
    lines: (r) => [['Correctas', r.correct + ' de ' + r.seen], ['Mejor racha', String(r.bestStreak)]],
    play(g) {
      g.stage.innerHTML =
        '<div class="gm-ti-field"><div class="gm-ti-floor"></div><div class="gm-sready">¡Prepárate!</div></div>' +
        '<button type="button" class="gm-ti-none"><span>Sin tilde</span><kbd>Espacio</kbd></button>';
      const field = g.stage.querySelector('.gm-ti-field');
      const noneB = g.stage.querySelector('.gm-ti-none');
      const ready = field.querySelector('.gm-sready');
      let deck = [], cur = null, correct = 0, seen = 0, started = false, over = false, wait = 0;
      const missed = [];
      const draw = () => g.info('<span><b>' + correct + '</b> ' + (correct === 1 ? 'correcta' : 'correctas') + '</span>');
      draw();
      const nextWord = () => { if (!deck.length) deck = shuffle(words.slice()); return deck.pop(); };

      function spawn() {
        if (over || !words.length) return;
        const it = nextWord();
        const c = document.createElement('div');
        c.className = 'gm-ti-card';
        let n = 0;
        c.innerHTML = '<div class="gm-ti-word" lang="es">' + it.chars.map((ch, i) => {
          if (VOW.includes(ch)) { n++; return '<button type="button" class="gm-ti-v" data-i="' + i + '" aria-label="Tilde en la ' + esc(ch) + ' número ' + n + '"><span>' + esc(ch) + '</span><kbd>' + n + '</kbd></button>'; }
          return '<span class="gm-ti-c">' + esc(ch) + '</span>';
        }).join('') + '</div><p class="gm-ti-sol" aria-hidden="true"></p>';
        field.appendChild(c);
        const W = field.clientWidth, cw = c.offsetWidth;
        const x = Math.max(6, 8 + Math.random() * Math.max(0, W - cw - 16));
        c.style.left = x + 'px';
        // Más rápido con cada palabra, pero siempre alcanza a leerse.
        const dur = Math.max(3.4, 8.5 - correct * 0.32);
        cur = { el: c, it, y: -c.offsetHeight - 4, h: c.offsetHeight, v: 0, dur, state: 'fall', vows: [...c.querySelectorAll('.gm-ti-v')] };
        cur.v = (field.clientHeight + cur.h) / dur;
        c.style.transform = 'translateY(' + cur.y + 'px)';
        seen++;
        noneB.disabled = false;
        g.say('Palabra: ' + it.w);
      }

      function reveal(card, ok) {
        const it = card.it;
        const sol = card.el.querySelector('.gm-ti-sol');
        if (it.pos >= 0) {
          const b = card.el.querySelector('.gm-ti-v[data-i="' + it.pos + '"]');
          b.querySelector('span').textContent = [...it.a][it.pos];
          b.classList.add(ok ? 'yes' : 'show');
        }
        sol.textContent = ok ? (it.pos >= 0 ? '¡Bien!' : '¡Bien! Va sin tilde') : it.pos >= 0 ? 'Es: ' + it.a : 'Va sin tilde: ' + it.a;
      }

      function answer(i) {
        if (!started || over || !cur || cur.state !== 'fall') return;
        const card = cur;
        card.state = 'done';
        noneB.disabled = true;
        const ok = i === card.it.pos;
        const btn = i >= 0 ? card.el.querySelector('.gm-ti-v[data-i="' + i + '"]') : noneB;
        if (btn) g.bump(btn, 'gm-press');
        if (ok) {
          correct++;
          const m = g.hit();
          const hb = Math.round(50 * clamp(1 - card.y / field.clientHeight, 0, 1));
          card.el.classList.add('ok');
          reveal(card, true);
          g.good(card.el);
          g.add(100 * m + hb, btn || card.el);
          g.say('Correcto: ' + card.it.a);
          draw();
          g.after(reduce ? 500 : 750, () => { card.el.classList.add('out'); g.after(300, () => card.el.remove()); });
          wait = 0.8;
        } else {
          g.miss();
          card.el.classList.add('bad');
          if (btn && btn !== noneB) btn.classList.add('no');
          if (btn === noneB) g.bad(noneB);
          reveal(card, false);
          g.bad(card.el);
          missed.push(card.it.a);
          g.say('No. ' + (card.it.pos >= 0 ? 'Se escribe ' + card.it.a : card.it.a + ' va sin tilde'));
          g.after(1400, () => card.el.remove());
          wait = 1.5;
          if (g.loseLife() <= 0) return end('Te quedaste sin vidas');
        }
        cur = null;
      }
      function drop(card) {
        card.state = 'done';
        noneB.disabled = true;
        card.el.classList.add('bad', 'splat');
        reveal(card, false);
        g.miss();
        missed.push(card.it.a);
        g.bad(card.el.firstChild);
        g.say('Se cayó. ' + card.it.a);
        g.after(1400, () => card.el.remove());
        cur = null;
        wait = 1.5;
        if (g.loseLife() <= 0) end('Te quedaste sin vidas');
      }
      function end(reason) {
        if (over) return;
        over = true;
        g.pause();
        noneB.disabled = true;
        g.after(1000, () => g.end({ reason, correct, seen, detail: { correct, seen, bestStreak: g.bestStreak, missed: missed.slice(0, 10) } }));
      }

      g.frame((dt) => {
        if (!started || over) return;
        if (cur && cur.state === 'fall') {
          cur.y += cur.v * dt;
          cur.el.style.transform = 'translateY(' + cur.y.toFixed(1) + 'px)';
          if (cur.y + cur.h >= field.clientHeight - 8) drop(cur);
        } else if (!cur) {
          wait -= dt;
          if (wait <= 0) spawn();
        }
      });
      g.on(field, 'click', (e) => { const b = e.target.closest('.gm-ti-v'); if (b && cur && b.closest('.gm-ti-card') === cur.el) answer(+b.dataset.i); });
      noneB.onclick = () => answer(-1);
      g.key((e) => {
        if (e.key === ' ' || e.key === '0') { e.preventDefault(); answer(-1); return; }
        const n = parseInt(e.key, 10);
        if (n >= 1 && n <= 9 && cur) { const b = cur.vows[n - 1]; if (b) { e.preventDefault(); answer(+b.dataset.i); } }
      });
      noneB.disabled = true;
      g.clock(TIME, () => end('¡Se acabó el tiempo!'));
      g.pause();
      if (!words.length) { ready.textContent = 'No hay palabras en este reto.'; return; }
      g.after(900, () => { ready.remove(); started = true; g.resume(); });
    },
  });
}
