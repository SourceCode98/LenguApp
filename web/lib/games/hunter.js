// Cazador en el texto: lee la pista y toca en el párrafo todas las palabras que la cumplen, lo más rápido posible.
// spec: { rounds:[{clue:'Toca todos los verbos', text:'Los domingos la ciclovía [[se llena]] de gente que [[pedalea]]…'}], time:90 }
//   Los fragmentos [[…]] son los objetivos (ver parseMarked en lib/text.js). Tocar una palabra que no es resta puntos.
import { esc, shuffle } from '../kit.js';
import { parseMarked } from '../text.js';
import { makeGame, clamp } from './common.js';

const WRONG = 30, REVEAL = 50;
const splitPunct = (t) => { const m = /^([¿¡("«“'—-]*)(.*?)([.,;:!?)"»”'…—-]*)$/.exec(t); return m && m[2] ? [m[1], m[2], m[3]] : ['', t, '']; };

export default function hunter(el, spec, finish) {
  const rounds = (spec.rounds || []).filter((r) => r && r.text).map((r) => ({ clue: r.clue || 'Toca las palabras marcadas', toks: parseMarked(String(r.text)) }))
    .filter((r) => r.toks.some((t) => t.k !== null));
  const TIME = spec.time || 90;
  const TOTAL = rounds.reduce((s, r) => s + r.toks.filter((t) => t.k !== null).length, 0);
  return makeGame(el, spec, finish, {
    key: 'hunter', name: 'Cazador en el texto', icon: '⌖', time: 'down',
    how: 'Lee la pista y toca en el texto todas las palabras que la cumplen. ¡Rápido, pero sin fallar!',
    rules: [TIME + ' segundos', rounds.length + (rounds.length === 1 ? ' texto' : ' textos'), 'Rapidez = puntos extra', 'Palabra equivocada: −' + WRONG],
    stars: (r) => {
      const f = TOTAL ? r.found / TOTAL : 0, acc = r.found + r.wrong ? r.found / (r.found + r.wrong) : 0;
      return f >= 0.95 && acc >= 0.8 ? 3 : f >= 0.7 && acc >= 0.6 ? 2 : f >= 0.35 ? 1 : 0;
    },
    lines: (r) => [['Encontradas', r.found + ' de ' + TOTAL], ['Equivocadas', String(r.wrong)], ['Mejor racha', String(r.bestStreak)]],
    play(g) {
      g.stage.innerHTML =
        '<div class="gm-clue"><p class="gm-qn"></p><h3 class="gm-qt"></h3><div class="gm-speed"><i></i></div></div>' +
        '<div class="gm-hu-text" lang="es"></div>' +
        '<div class="gm-hu-foot"><div class="gm-hu-prog" aria-hidden="true"></div><button type="button" class="gm-btn ghost sm gm-hu-rev">Revelar una <small>−' + REVEAL + '</small></button></div>';
      const $ = (s) => g.stage.querySelector(s);
      const qn = $('.gm-qn'), qt = $('.gm-qt'), clueBox = $('.gm-clue'), speed = $('.gm-speed i'), textE = $('.gm-hu-text'), prog = $('.gm-hu-prog'), revB = $('.gm-hu-rev');
      let ri = -1, cur = null, need = 0, got = 0, found = 0, wrong = 0, revealed = 0, lock = true, tLast = 0;
      const info = () => g.info('<span>Texto <b>' + Math.max(1, ri + 1) + '</b> de ' + rounds.length + '</span><span><b>' + got + '</b> de ' + need + '</span>');
      const done = (reason) => { lock = true; g.end({ reason, found, wrong, detail: { found, total: TOTAL, wrong, revealed, bestStreak: g.bestStreak } }); };
      const drawProg = () => { prog.innerHTML = Array.from({ length: need }, (_, i) => '<i class="' + (i < got ? 'on' : '') + '"></i>').join(''); };

      function next() {
        ri++;
        if (ri >= rounds.length) return done('¡Cazaste en todos los textos!');
        cur = rounds[ri];
        need = cur.toks.filter((t) => t.k !== null).length;
        got = 0;
        qn.textContent = 'Texto ' + (ri + 1) + ' de ' + rounds.length + ' · ' + need + (need === 1 ? ' objetivo' : ' objetivos');
        qt.textContent = cur.clue;
        textE.innerHTML = cur.toks.map((t, i) => {
          // La puntuación va pegada a su palabra (no se parte de línea).
          if (t.k !== null) return '<span class="gm-hu-t"><button type="button" class="gm-hu-w" data-i="' + i + '" data-y="1">' + esc(t.t) + '</button>' + (t.p ? esc(t.p) : '') + '</span>';
          const [a, w, z] = splitPunct(t.t);
          return '<span class="gm-hu-t">' + esc(a) + '<button type="button" class="gm-hu-w" data-i="' + i + '">' + esc(w) + '</button>' + esc(z) + '</span>';
        }).join(' ');
        textE.classList.remove('won');
        g.bump(clueBox, 'gm-in');
        g.bump(textE, 'gm-in');
        drawProg();
        info();
        revB.disabled = false;
        lock = false;
        tLast = performance.now();
        g.say(cur.clue);
        g.resume();
      }

      function tap(b) {
        if (lock || !b || b.classList.contains('yes') || b.classList.contains('rev')) return;
        if (b.dataset.y) {
          const secs = (performance.now() - tLast) / 1000;
          tLast = performance.now();
          got++; found++;
          const m = g.hit();
          b.classList.add('yes');
          g.good(b);
          g.add((60 + Math.round(clamp(60 - 8 * secs, 0, 60))) * m, b);
          g.say('Sí: ' + b.textContent);
          after();
        } else {
          wrong++;
          g.miss();
          b.classList.remove('no');
          g.bad(b);
          b.classList.add('no');
          g.after(700, () => b.classList.remove('no'));
          g.add(-WRONG, b);
          g.say('No: ' + b.textContent);
        }
      }
      function after() {
        drawProg();
        info();
        if (got < need) return;
        lock = true;
        g.pause();
        revB.disabled = true;
        textE.classList.add('won');
        g.after(250, () => { g.add(100, clueBox, '¡Texto completo! +100'); g.confetti(28); });
        g.after(1500, next);
      }
      function reveal() {
        if (lock) return;
        const miss = [...textE.querySelectorAll('.gm-hu-w[data-y]:not(.yes):not(.rev)')];
        if (!miss.length) return;
        const b = miss[0];
        b.classList.add('rev');
        got++; found++; revealed++;
        g.miss();
        g.add(-REVEAL, b);
        tLast = performance.now();
        g.say('Pista: ' + b.textContent);
        after();
      }

      g.frame(() => {
        if (lock) return;
        const s = (performance.now() - tLast) / 1000;
        speed.style.transform = 'scaleX(' + clamp(1 - s / 7.5, 0, 1).toFixed(3) + ')';
      });
      textE.addEventListener('click', (e) => tap(e.target.closest('.gm-hu-w')));
      revB.onclick = reveal;
      g.key(() => {}); // Tab + Enter recorren y tocan las palabras
      g.clock(TIME, () => done('¡Se acabó el tiempo!'));
      if (!rounds.length) { qt.textContent = 'No hay textos en este reto.'; lock = true; g.pause(); revB.disabled = true; return; }
      next();
    },
  });
}
