// Rima rápida: aparece un verso y una barra de compás que se vacía; elige la palabra que rima antes de que se acabe.
// spec: { items:[{v:'En la mitad del camino', o:['destino','sendero','montaña'], a:0, kind:'consonante'|'asonante'}], time:60, lives:3 }
//   a = índice o texto de la opción correcta. La racha acelera el compás.
import { esc, shuffle } from '../kit.js';
import { makeGame, clamp } from './common.js';

const low = (s) => String(s).toLocaleLowerCase('es-CO').normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC');
const lastWord = (s) => { const m = String(s).match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?=[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ]*$)/); return m ? m[0] : ''; };
const VOWELS = 'aeiou';

// Marca la terminación que rima: consonante = sufijo común; asonante = últimas dos vocales.
function marks(word, other, kind) {
  const w = [...word], lw = [...low(word)], lo = [...low(other)];
  const on = new Array(w.length).fill(false);
  if (kind === 'asonante') {
    let n = 0;
    for (let i = lw.length - 1; i >= 0 && n < 2; i--) if (VOWELS.includes(lw[i])) { on[i] = true; n++; }
  } else {
    let n = 0;
    while (n < lw.length && n < lo.length && lw[lw.length - 1 - n] === lo[lo.length - 1 - n]) n++;
    if (n >= 2) for (let i = lw.length - n; i < lw.length; i++) on[i] = true;
  }
  let h = '', open = false;
  w.forEach((c, i) => {
    if (on[i] && !open) { h += '<mark>'; open = true; }
    if (!on[i] && open) { h += '</mark>'; open = false; }
    h += esc(c);
  });
  return h + (open ? '</mark>' : '');
}

function prep(it) {
  const o = (it.o || []).map(String);
  let a = typeof it.a === 'number' ? it.a : o.indexOf(String(it.a));
  if (a < 0 || a >= o.length) a = 0;
  const idx = shuffle(o.map((_, i) => i));
  return { v: String(it.v), o: idx.map((i) => o[i]), a: idx.indexOf(a), kind: it.kind === 'asonante' ? 'asonante' : 'consonante' };
}

export default function rima(el, spec, finish) {
  const raw = (spec.items || []).filter((it) => it && it.v && Array.isArray(it.o) && it.o.length >= 2);
  const TIME = spec.time || 60;
  const LIVES = spec.lives || 3;
  const target = Math.max(1, Math.min(raw.length, 14));
  return makeGame(el, spec, finish, {
    key: 'rima', name: 'Rima rápida', icon: '♪', time: 'down', lives: LIVES,
    how: 'Elige la palabra que rima con el verso antes de que se vacíe la barra del compás.',
    rules: [TIME + ' segundos', LIVES + ' vidas', 'La racha acelera el compás', 'Teclas 1 a 4'],
    stars: (r) => (r.correct >= Math.ceil(target * 0.9) ? 3 : r.correct >= Math.ceil(target * 0.65) ? 2 : r.correct >= Math.ceil(target * 0.35) ? 1 : 0),
    lines: (r) => [['Rimas', r.correct + ' de ' + r.asked], ['Mejor racha', String(r.bestStreak)]],
    play(g) {
      const deck = shuffle(raw.slice()).map(prep);
      g.stage.innerHTML =
        '<div class="gm-ri-box">' +
        '<div class="gm-ri-top"><span class="gm-ri-kind"></span><p class="gm-qn"></p></div>' +
        '<p class="gm-ri-v" aria-live="polite"></p>' +
        '<p class="gm-ri-echo" aria-hidden="true"><span>…</span></p>' +
        '<div class="gm-ri-beat" aria-hidden="true"><div class="gm-ri-bar"><i></i></div><div class="gm-ri-dots"><i></i><i></i><i></i><i></i></div></div>' +
        '</div>' +
        '<div class="gm-opts gm-ri-opts"></div>';
      const $ = (s) => g.stage.querySelector(s);
      const box = $('.gm-ri-box'), kindE = $('.gm-ri-kind'), qn = $('.gm-qn'), verse = $('.gm-ri-v'), echo = $('.gm-ri-echo');
      const bar = $('.gm-ri-bar i'), dots = [...g.stage.querySelectorAll('.gm-ri-dots i')], optsE = $('.gm-ri-opts');
      let qi = -1, cur = null, state = 'idle', correct = 0, asked = 0, beat = 0, D = 8, lastDot = -1;
      const missed = [];
      const info = () => g.info('<span>Verso <b>' + Math.max(1, Math.min(deck.length, qi + 1)) + '</b> de ' + deck.length + '</span><span>Compás <b>' + D.toFixed(1).replace('.', ',') + '</b> s</span>');
      const done = (reason) => { state = 'over'; g.end({ reason, correct, asked, detail: { correct, asked, bestStreak: g.bestStreak, missed: missed.slice(0, 10) } }); };

      function next() {
        qi++;
        if (qi >= deck.length) return done('¡Rimaste todos los versos!');
        cur = deck[qi];
        // El compás dura menos con la racha: de 8 s baja hasta 3,5 s.
        D = clamp(8 * Math.pow(0.9, g.streak), 3.5, 8);
        beat = 0; lastDot = -1;
        const lw = lastWord(cur.v);
        const pre = lw ? cur.v.slice(0, cur.v.lastIndexOf(lw)) : cur.v;
        const post = lw ? cur.v.slice(cur.v.lastIndexOf(lw) + lw.length) : '';
        cur.lw = lw;
        verse.innerHTML = esc(pre) + (lw ? '<b class="gm-ri-lw">' + esc(lw) + '</b>' : '') + esc(post);
        echo.innerHTML = '<span>…</span>';
        echo.className = 'gm-ri-echo';
        kindE.textContent = 'Rima ' + cur.kind;
        kindE.className = 'gm-ri-kind ' + cur.kind;
        qn.textContent = '¿Qué palabra rima?';
        box.className = 'gm-ri-box';
        optsE.classList.toggle('long', cur.o.some((x) => x.length > 22));
        optsE.innerHTML = cur.o.map((x, i) => '<button type="button" class="gm-opt" data-i="' + i + '"><kbd>' + (i + 1) + '</kbd><span>' + esc(x) + '</span></button>').join('');
        g.bump(box, 'gm-in');
        state = 'ask';
        info();
        g.say('Verso: ' + cur.v + '. Rima ' + cur.kind + '.');
      }

      function answer(i) {
        if (state !== 'ask') return;
        state = 'show';
        asked++;
        const btns = [...optsE.querySelectorAll('.gm-opt')];
        btns.forEach((b) => (b.disabled = true));
        const ok = i === cur.a;
        const right = cur.o[cur.a];
        if (cur.lw) verse.querySelector('.gm-ri-lw').innerHTML = marks(cur.lw, right, cur.kind);
        echo.innerHTML = '<span>…</span> <b>' + marks(right, cur.lw || right, cur.kind) + '</b>';
        echo.className = 'gm-ri-echo on ' + (ok ? 'ok' : 'no');
        if (i >= 0) g.bump(btns[i], 'gm-press');
        if (ok) {
          correct++;
          const m = g.hit();
          btns[i].classList.add('right');
          g.good(btns[i]);
          box.classList.add('ok');
          g.add(100 * m + Math.round(60 * (1 - beat / D)), btns[i]);
          g.say('¡Rima! ' + right);
          info();
          g.after(1000, next);
        } else {
          g.miss();
          if (i >= 0) { btns[i].classList.add('wrong'); g.bad(btns[i]); }
          btns[cur.a].classList.add('right');
          box.classList.add('no');
          g.bump(box, 'gm-shake');
          missed.push(cur.v + ' → ' + right);
          g.say((i < 0 ? 'Se acabó el compás. ' : 'No rima. ') + 'La respuesta era ' + right);
          const left = g.loseLife();
          info();
          g.after(1700, () => (left <= 0 ? done('Te quedaste sin vidas') : next()));
        }
      }

      g.frame((dt) => {
        if (state !== 'ask' || !g.running) return;
        beat += dt;
        const f = clamp(1 - beat / D, 0, 1);
        bar.style.transform = 'scaleX(' + f.toFixed(4) + ')';
        bar.parentNode.classList.toggle('low', f < 0.3);
        const d = Math.min(3, Math.floor((beat / D) * 4));
        if (d !== lastDot) { lastDot = d; dots.forEach((x, j) => x.classList.toggle('on', j === d)); }
        if (beat >= D) answer(-1);
      });
      optsE.addEventListener('click', (e) => { const b = e.target.closest('.gm-opt'); if (b) answer(+b.dataset.i); });
      g.key((e) => { const n = parseInt(e.key, 10); if (state === 'ask' && n >= 1 && n <= cur.o.length) { e.preventDefault(); answer(n - 1); } });
      g.clock(TIME, () => { if (state !== 'over') done('¡Se acabó el tiempo!'); });
      if (!deck.length) { verse.textContent = 'No hay versos en este reto.'; g.pause(); return; }
      next();
    },
  });
}
