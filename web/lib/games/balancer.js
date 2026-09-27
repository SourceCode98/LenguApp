// Concordancia relámpago: cambia las piezas variables de la oración hasta que concuerden en género, número y persona.
// spec: { items:[{parts:[{o:['El','Los'], a:1}, {t:'niños'}, {o:['juega','juegan'], a:1}, {t:'en el parque.'}], e?:'Sujeto plural → verbo plural.'}], time:120 }
//   Cada pieza variable se cambia con ‹ › o tocándola; la oración pasa sola cuando concuerda.
import { esc, shuffle } from '../kit.js';
import { makeGame } from './common.js';

function prep(it) {
  const parts = (it.parts || []).filter((p) => p && (p.t !== undefined || (Array.isArray(p.o) && p.o.length >= 2)))
    .map((p) => (Array.isArray(p.o) && p.o.length >= 2 ? { o: p.o.map(String), a: p.a >= 0 && p.a < p.o.length ? p.a : 0 } : { t: String(p.t) }));
  if (!parts.some((p) => p.o)) return null;
  return { parts, e: it.e || '' };
}

export default function balancer(el, spec, finish) {
  const items = (spec.items || []).map((it) => it && prep(it)).filter(Boolean);
  const TIME = spec.time || 120;
  const N = items.length;
  return makeGame(el, spec, finish, {
    key: 'balancer', name: 'Concordancia relámpago', icon: '⚖', time: 'down',
    how: 'Cambia las piezas de color hasta que la oración concuerde en género, número y persona.',
    rules: [N + (N === 1 ? ' oración' : ' oraciones'), TIME + ' segundos', 'Rapidez = bonificación', 'Flechas: elegir y cambiar'],
    stars: (r) => { const f = N ? r.solved / N : 0; return f >= 1 ? 3 : f >= 0.6 ? 2 : f >= 0.3 ? 1 : 0; },
    lines: (r) => [['Concordadas', r.solved + ' de ' + N], ['Tiempo usado', Math.round(r.used) + ' s'], r.skipped ? ['Saltadas', String(r.skipped)] : null],
    play(g) {
      const deck = spec.shuffle === false ? items.slice() : shuffle(items.slice());
      let ri = -1, cur = null, val = [], vars = [], sel = 0, lock = true, solved = 0, skipped = 0, t0 = 0, changes = 0;
      const results = [];
      g.stage.innerHTML =
        '<div class="gm-bhead"><p class="gm-qn"></p><button type="button" class="gm-btn ghost sm gm-skip">Saltar</button></div>' +
        '<div class="gm-eqbox gm-cc-box"><div class="gm-cc-sent" lang="es"></div><div class="gm-stamp" aria-hidden="true">¡Concuerda!</div></div>' +
        '<div class="gm-cc-meter" aria-live="polite"><b></b><span></span></div>' +
        '<div class="gm-note gm-cc-e" hidden></div>' +
        '<p class="gm-keys">Flechas ← → eligen la pieza · ↑ ↓ o Espacio la cambian</p>';
      const $ = (s) => g.stage.querySelector(s);
      const box = $('.gm-cc-box'), sent = $('.gm-cc-sent'), meter = $('.gm-cc-meter'), qn = $('.gm-qn'), note = $('.gm-cc-e');
      const info = () => g.info('<span><b>' + solved + '</b> de ' + N + ' concordadas</span>');

      function load() {
        ri++;
        if (ri >= N) return done('¡Concordaste todas las oraciones!');
        cur = deck[ri];
        vars = [];
        cur.parts.forEach((p, i) => { if (p.o) vars.push(i); });
        // Posición inicial al azar, pero nunca la oración ya correcta.
        val = cur.parts.map((p) => (p.o ? Math.floor(Math.random() * p.o.length) : 0));
        if (vars.every((i) => val[i] === cur.parts[i].a)) { const i = vars[Math.floor(Math.random() * vars.length)]; val[i] = (val[i] + 1) % cur.parts[i].o.length; }
        sel = 0; changes = 0;
        lock = false;
        box.classList.remove('ok', 'out');
        g.bump(box, 'gm-slide');
        note.hidden = true;
        qn.innerHTML = 'Oración <b>' + (ri + 1) + '</b> de ' + N;
        sent.innerHTML = cur.parts.map((p, i) => (p.o
          ? '<span class="gm-cc-var" data-i="' + i + '">' +
            '<button type="button" class="gm-cc-arr" data-i="' + i + '" data-d="-1" aria-label="Opción anterior">‹</button>' +
            '<button type="button" class="gm-cc-w" data-i="' + i + '" data-d="1"></button>' +
            '<button type="button" class="gm-cc-arr" data-i="' + i + '" data-d="1" aria-label="Opción siguiente">›</button>' +
            '<span class="gm-cc-dots" aria-hidden="true">' + p.o.map(() => '<i></i>').join('') + '</span></span>'
          : '<span class="gm-cc-fix">' + esc(p.t) + '</span>')).join(' ');
        t0 = performance.now();
        info();
        render(false);
        g.say('Nueva oración: ' + text());
        g.resume();
      }
      const text = () => cur.parts.map((p, i) => (p.o ? p.o[val[i]] : p.t)).join(' ');
      const agrees = () => vars.every((i) => val[i] === cur.parts[i].a);
      function render(animate, ci) {
        vars.forEach((i, k) => {
          const v = sent.querySelector('.gm-cc-var[data-i="' + i + '"]');
          const w = v.querySelector('.gm-cc-w');
          w.textContent = cur.parts[i].o[val[i]];
          w.setAttribute('aria-label', 'Pieza ' + (k + 1) + ': ' + cur.parts[i].o[val[i]] + '. Toca para cambiar.');
          v.classList.toggle('sel', k === sel);
          v.querySelectorAll('.gm-cc-dots i').forEach((d, j) => d.classList.toggle('on', j === val[i]));
          if (animate && i === ci) g.bump(w, 'gm-cc-flip');
        });
        const ok = agrees();
        meter.className = 'gm-cc-meter ' + (ok ? 'ok' : 'no');
        meter.querySelector('b').textContent = ok ? '✓' : '✗';
        meter.querySelector('span').textContent = ok ? '¡La oración concuerda!' : 'Todavía no concuerda';
        if (ok) win();
      }
      function change(i, d) {
        if (lock) return;
        const p = cur.parts[i];
        if (!p || !p.o) return;
        val[i] = (val[i] + d + p.o.length) % p.o.length;
        sel = vars.indexOf(i);
        changes++;
        render(true, i);
      }
      function win() {
        lock = true;
        g.pause();
        solved++;
        const secs = (performance.now() - t0) / 1000;
        const m = g.hit();
        const bonus = Math.max(0, Math.round(100 - 8 * Math.max(0, secs - 1.5 * vars.length)));
        box.classList.add('ok');
        sent.querySelectorAll('.gm-cc-var').forEach((v) => v.classList.remove('sel'));
        sent.querySelectorAll('.gm-cc-arr').forEach((b) => (b.disabled = true));
        g.good(box);
        g.add((100 + bonus) * m, box);
        results.push({ s: text(), ok: true, secs: Math.round(secs) });
        info();
        g.say('¡Concuerda! ' + text());
        if (cur.e) { note.innerHTML = '<b>✓</b> ' + esc(cur.e); note.hidden = false; g.bump(note, 'gm-in'); }
        g.after(cur.e ? 2200 : 1300, () => { box.classList.add('out'); g.after(300, load); });
      }
      function skip() {
        if (lock) return;
        lock = true;
        skipped++;
        g.miss();
        results.push({ s: text(), ok: false });
        vars.forEach((i) => (val[i] = cur.parts[i].a));
        sent.querySelectorAll('.gm-cc-arr').forEach((b) => (b.disabled = true));
        vars.forEach((i) => { const w = sent.querySelector('.gm-cc-w[data-i="' + i + '"]'); w.textContent = cur.parts[i].o[val[i]]; w.classList.add('show'); });
        meter.className = 'gm-cc-meter skip';
        meter.querySelector('b').textContent = '→';
        meter.querySelector('span').textContent = 'Así concuerda';
        if (cur.e) { note.innerHTML = esc(cur.e); note.hidden = false; }
        g.say('Así concuerda: ' + text());
        g.after(2000, () => { box.classList.add('out'); g.after(300, load); });
      }
      function done(reason) {
        lock = true;
        g.end({ reason, solved, skipped, used: TIME - g.t, detail: { solved, total: N, skipped, seconds: Math.round(TIME - g.t), items: results } });
      }

      sent.addEventListener('click', (e) => { const b = e.target.closest('button[data-i]'); if (b) change(+b.dataset.i, +b.dataset.d); });
      $('.gm-skip').onclick = skip;
      g.key((e) => {
        if (lock) return;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); sel = (sel + (e.key === 'ArrowRight' ? 1 : -1) + vars.length) % vars.length; render(false); return; }
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || (e.key === ' ' && e.target.tagName !== 'BUTTON')) { e.preventDefault(); change(vars[sel], e.key === 'ArrowUp' ? -1 : 1); return; }
        const n = parseInt(e.key, 10);
        if (n >= 1 && n <= vars.length) { e.preventDefault(); change(vars[n - 1], 1); }
      });
      g.clock(TIME, () => done('¡Se acabó el tiempo!'));
      if (!N) { sent.textContent = 'No hay oraciones en este reto.'; g.pause(); return; }
      load();
    },
  });
}
