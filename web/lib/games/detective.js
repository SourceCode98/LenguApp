// Detective de noticias: lee el titular, revela pistas si las necesitas (cuestan tiempo) y decide si es
// confiable, engañosa o falsa.
// spec: { cases:[{head:'¡Científicos confirman que el aguacate cura la gripa!', src:'saludya.blogspot.com', date:'1 de abril',
//          text?:'Resumen o primer párrafo', clues:[{t:'No cita ningún estudio', bad:true}], a:2, e:'Explicación'}], time? }
//   a: 0 Confiable · 1 Engañosa · 2 Falsa. Sin time el reloj cuenta hacia arriba y cada pista suma 5 s.
import { esc, shuffle } from '../kit.js';
import { makeGame } from './common.js';

const VERD = ['Confiable', 'Engañosa', 'Falsa'];
const VCLS = ['ok', 'mid', 'no'];
const COST = 5; // segundos por pista

export default function detective(el, spec, finish) {
  const cases = (spec.cases || []).filter((c) => c && c.head && c.a >= 0 && c.a <= 2)
    .map((c) => ({ head: String(c.head), src: c.src || '', date: c.date || '', text: c.text || '', clues: (c.clues || []).filter((x) => x && x.t).slice(0, 4), a: c.a, e: c.e || '' }));
  const TIME = spec.time || 0;
  const N = cases.length;
  return makeGame(el, spec, finish, {
    key: 'detective', name: 'Detective de noticias', icon: '🔍', time: TIME ? 'down' : 'up', lives: 0,
    how: 'Lee cada noticia, revela pistas si las necesitas y decide: ¿es confiable, engañosa o falsa?',
    rules: [N + (N === 1 ? ' caso' : ' casos'), 'Cada pista cuesta ' + COST + ' s', 'Pistas sin usar: puntos extra', 'Teclas 1 2 3 · P: pista'],
    stars: (r) => { const f = r.total ? r.correct / r.total : 0; return f >= 0.9 ? 3 : f >= 0.6 ? 2 : f >= 0.3 ? 1 : 0; },
    lines: (r) => [['Casos resueltos', r.correct + ' de ' + r.total], ['Pistas usadas', String(r.used)], ['Mejor racha', String(r.bestStreak)]],
    play(g) {
      const deck = spec.shuffle === false ? cases.slice() : shuffle(cases.slice());
      g.stage.innerHTML =
        '<div class="gm-dt-top"><p class="gm-qn"></p></div>' +
        '<div class="gm-dt-case">' +
        '<article class="gm-dt-news"><p class="gm-dt-meta"></p><h3 class="gm-dt-head"></h3><p class="gm-dt-text"></p><i class="gm-dt-stamp" aria-hidden="true"></i></article>' +
        '<div class="gm-dt-clues" role="group" aria-label="Pistas"></div>' +
        '</div>' +
        '<div class="gm-dt-verd" role="group" aria-label="Veredicto">' +
        VERD.map((v, i) => '<button type="button" class="gm-dt-v ' + VCLS[i] + '" data-v="' + i + '"><kbd>' + (i + 1) + '</kbd><span>' + v + '</span></button>').join('') +
        '</div>' +
        '<div class="gm-exp gm-dt-exp" hidden></div>';
      const $ = (s) => g.stage.querySelector(s);
      const qn = $('.gm-qn'), news = $('.gm-dt-news'), meta = $('.gm-dt-meta'), head = $('.gm-dt-head'), text = $('.gm-dt-text'), stamp = $('.gm-dt-stamp');
      const cluesE = $('.gm-dt-clues'), verd = [...g.stage.querySelectorAll('.gm-dt-v')], exp = $('.gm-dt-exp');
      let ci = -1, cur = null, state = 'idle', correct = 0, used = 0, opened = 0, seen = new Set();
      const results = [];
      const info = () => g.info('<span>Caso <b>' + Math.max(1, Math.min(N, ci + 1)) + '</b> de ' + N + '</span><span><b>' + correct + '</b> ' + (correct === 1 ? 'resuelto' : 'resueltos') + '</span>');
      const done = (reason) => { state = 'over'; g.end({ reason, correct, total: N, used, detail: { correct, total: N, clues: used, bestStreak: g.bestStreak, cases: results } }); };

      function clueHTML(c, i, open) {
        if (!open) return '<button type="button" class="gm-dt-clue" data-i="' + i + '"><span class="gm-dt-lupa" aria-hidden="true">🔍</span><span>Pista ' + (i + 1) + '</span><small>' + (TIME ? '−' + COST + ' s' : '+' + COST + ' s') + '</small></button>';
        return '<div class="gm-dt-clue open ' + (c.bad ? 'bad' : 'good') + '"><b aria-hidden="true">' + (c.bad ? '!' : '✓') + '</b><span>' + esc(c.t) + '</span><span class="gm-live">' + (c.bad ? 'Señal de alerta' : 'Señal de confianza') + '</span></div>';
      }
      function drawClues() {
        cluesE.innerHTML = cur.clues.map((c, i) => clueHTML(c, i, seen.has(i) || state !== 'ask')).join('');
        cluesE.hidden = !cur.clues.length;
      }

      function next() {
        ci++;
        if (ci >= N) return done('¡Cerraste todos los casos!');
        cur = deck[ci];
        opened = 0; seen = new Set();
        state = 'ask';
        qn.innerHTML = 'Caso <b>' + (ci + 1) + '</b> de ' + N + ' · ¿Qué tan confiable es?';
        meta.innerHTML = [cur.src && '<span class="gm-dt-src">' + esc(cur.src) + '</span>', cur.date && '<time>' + esc(cur.date) + '</time>'].filter(Boolean).join('<span aria-hidden="true"> · </span>');
        head.textContent = cur.head;
        text.textContent = cur.text;
        text.hidden = !cur.text;
        stamp.className = 'gm-dt-stamp';
        stamp.textContent = '';
        news.className = 'gm-dt-news';
        drawClues();
        verd.forEach((b) => { b.disabled = false; b.classList.remove('right', 'wrong'); });
        exp.hidden = true;
        g.bump($('.gm-dt-case'), 'gm-in');
        info();
        g.say('Titular: ' + cur.head + (cur.src ? '. Fuente: ' + cur.src : ''));
        g.resume();
      }

      function openClue(i) {
        if (state !== 'ask' || seen.has(i) || i < 0 || i >= cur.clues.length) return;
        seen.add(i); opened++; used++;
        if (TIME) g.addTime(-COST); else g.t += COST;
        const btn = cluesE.querySelector('.gm-dt-clue[data-i="' + i + '"]');
        const d = document.createElement('div');
        d.innerHTML = clueHTML(cur.clues[i], i, true);
        const nd = d.firstChild;
        btn.replaceWith(nd);
        g.bump(nd, 'gm-in');
        g.pop((TIME ? '−' : '+') + COST + ' s', nd, 'no');
        g.say('Pista: ' + cur.clues[i].t);
      }

      function decide(v) {
        if (state !== 'ask') return;
        state = 'show';
        g.pause();
        const ok = v === cur.a;
        const left = cur.clues.length - opened;
        verd.forEach((b) => (b.disabled = true));
        g.bump(verd[v], 'gm-press');
        stamp.textContent = VERD[cur.a];
        stamp.className = 'gm-dt-stamp on ' + VCLS[cur.a];
        news.classList.add(ok ? 'good' : 'bad');
        if (ok) {
          correct++;
          const m = g.hit();
          verd[v].classList.add('right');
          g.good(verd[v]);
          g.add((200 + 60 * left) * m, news, '+' + Math.round((200 + 60 * left) * m) + (left ? ' · ' + left + (left === 1 ? ' pista sin usar' : ' pistas sin usar') : ''));
        } else {
          g.miss();
          verd[v].classList.add('wrong');
          verd[cur.a].classList.add('right');
          g.bad(verd[v]);
          g.bump(news, 'gm-shake');
        }
        results.push({ head: cur.head, ok, clues: opened });
        drawClues();
        info();
        exp.innerHTML = '<b>' + (ok ? '¡Caso resuelto!' : 'Era ' + VERD[cur.a].toLowerCase() + '.') + '</b> ' + esc(cur.e) +
          '<div class="gm-exp-go"><button type="button" class="gm-btn sm">' + (ci + 1 < N ? 'Siguiente caso' : 'Ver resultado') + '</button></div>';
        exp.hidden = false;
        g.bump(exp, 'gm-in');
        const b = exp.querySelector('.gm-btn');
        b.onclick = cont;
        try { b.focus({ preventScroll: true }); } catch (x) { /* ignorar */ }
        g.say((ok ? 'Correcto. ' : 'Incorrecto. ') + 'Es ' + VERD[cur.a] + '. ' + cur.e);
      }
      function cont() { if (state === 'show') next(); }

      cluesE.addEventListener('click', (e) => { const b = e.target.closest('button.gm-dt-clue'); if (b) openClue(+b.dataset.i); });
      g.stage.querySelector('.gm-dt-verd').addEventListener('click', (e) => { const b = e.target.closest('.gm-dt-v'); if (b) decide(+b.dataset.v); });
      g.key((e) => {
        const n = parseInt(e.key, 10);
        if (state === 'ask' && n >= 1 && n <= 3) { e.preventDefault(); decide(n - 1); return; }
        if (state === 'ask' && (e.key === 'p' || e.key === 'P')) { e.preventDefault(); const nx = cur.clues.findIndex((_, i) => !seen.has(i)); if (nx >= 0) openClue(nx); return; }
        if (state === 'show' && e.key === 'Enter' && e.target.tagName !== 'BUTTON') { e.preventDefault(); cont(); }
      });
      if (TIME) g.clock(TIME, () => { if (state !== 'over') done('¡Se acabó el tiempo!'); });
      else g.clock(0);
      if (!N) { head.textContent = 'No hay casos en este reto.'; verd.forEach((b) => (b.disabled = true)); g.pause(); return; }
      next();
    },
  });
}
