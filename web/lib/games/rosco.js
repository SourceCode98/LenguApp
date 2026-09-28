// El rosco: una pregunta por letra, en círculo. Responde o di "Pasapalabra" y vuelve a esa letra después.
// spec: { items:[{l:'A', q:'Empieza por A: lo contrario de otra palabra', a:'antónimo', alt?:['antonimo']}], time:180 }
//   Compara sin mayúsculas ni tildes (la ñ cuenta). Al acertar muestra la palabra bien escrita; al fallar, la correcta.
import { esc } from '../kit.js';
import { makeGame, mmss } from './common.js';

// minúsculas, sin tildes ni diéresis (ñ intacta), sin signos y con espacios simples
export const cmp = (s) => String(s || '')
  .normalize('NFC')
  .toLocaleLowerCase('es-CO')
  .replace(/ñ/g, '\u0001')
  .normalize('NFD')
  .replace(/[̀-ͯ]/g, '')
  .replace(/\u0001/g, 'ñ')
  .replace(/[^a-zñ0-9 ]+/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

export default function rosco(el, spec, finish) {
  const items = (spec.items || [])
    .filter((x) => x && x.q && x.a)
    .map((x) => ({ l: String(x.l || x.a[0] || '?').toLocaleUpperCase('es-CO').slice(0, 2), q: String(x.q), a: String(x.a), ok: [x.a].concat(x.alt || []).map(cmp) }));
  const TIME = spec.time || 180;
  const N = items.length;
  const th = (f) => Math.ceil(N * f - 1e-9);
  return makeGame(el, spec, finish, {
    key: 'rosco', name: 'El rosco', icon: '◯', time: 'down', lives: 0,
    how: 'Cada letra esconde una palabra. Lee la pista, escribe la respuesta y pulsa Enter. Si no la sabes, di «Pasapalabra» y vuelve a ella después.',
    rules: [N + ' letras', TIME + ' segundos', 'Las tildes no cuentan al comparar', 'Espacio con el campo vacío: Pasapalabra'],
    stars: (r) => (r.correct >= th(0.9) && r.correct > 0 ? 3 : r.correct >= th(0.7) && r.correct > 0 ? 2 : r.correct >= th(0.4) && r.correct > 0 ? 1 : 0),
    lines: (r) => [['Aciertos', r.correct + ' de ' + N], ['Fallos', String(r.wrong)], ['Sin responder', String(N - r.correct - r.wrong)], ['Tiempo usado', mmss(r.used)]],
    play(g) {
      const st = items.map(() => ''); // '' pendiente, 'pass', 'ok', 'no'
      let cur = -1, correct = 0, wrong = 0, waiting = null, passes = 0;
      const R = 124, rr = Math.max(9, Math.min(17, R * Math.sin(Math.PI / Math.max(N, 3)) * 0.9));
      const fs = (rr * 1.05).toFixed(1);
      const pos = (i) => { const a = -Math.PI / 2 + (i / N) * Math.PI * 2; return [Math.cos(a) * R, Math.sin(a) * R]; };
      g.stage.innerHTML =
        '<div class="gm-rosco-wrap">' +
        '<div class="gm-rosco-ring"><svg viewBox="-150 -150 300 300" role="img" aria-label="Rosco de ' + N + ' letras">' +
        '<circle class="gm-rosco-track" r="' + R + '"/>' +
        items.map((x, i) => { const [cx, cy] = pos(i); return '<g class="gm-rosco-l" data-i="' + i + '" transform="translate(' + cx.toFixed(1) + ' ' + cy.toFixed(1) + ')"><circle r="' + rr.toFixed(1) + '"/><text dy=".36em" style="font-size:' + fs + 'px">' + esc(x.l) + '</text></g>'; }).join('') +
        '<g class="gm-rosco-mid"><text class="big" dy=".34em">?</text><text class="cnt ok" x="-26" y="62">0</text><text class="cnt no" x="26" y="62">0</text></g>' +
        '</svg></div>' +
        '<div class="gm-rosco-play">' +
        '<div class="gm-q gm-rosco-q"><p class="gm-qn"></p><h3 class="gm-qt"></h3></div>' +
        '<form class="gm-rosco-form" autocomplete="off"><input class="gm-rosco-in" type="text" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" enterkeyhint="send" aria-label="Tu respuesta" placeholder="Escribe tu respuesta">' +
        '<div class="gm-rosco-btns"><button type="submit" class="gm-btn sm gm-rosco-ok">Responder</button><button type="button" class="gm-btn ghost sm gm-rosco-pass">Pasapalabra</button></div></form>' +
        '<div class="gm-rosco-fb" hidden></div>' +
        '<p class="gm-rosco-keys"><kbd>Enter</kbd> responde · <kbd>Espacio</kbd> con el campo vacío: Pasapalabra</p>' +
        '</div></div>';
      const svg = g.stage.querySelector('svg');
      const letters = [...svg.querySelectorAll('.gm-rosco-l')];
      const big = svg.querySelector('.gm-rosco-mid .big');
      const cOk = svg.querySelector('.cnt.ok'), cNo = svg.querySelector('.cnt.no');
      const qBox = g.stage.querySelector('.gm-rosco-q');
      const qn = qBox.querySelector('.gm-qn'), qt = qBox.querySelector('.gm-qt');
      const form = g.stage.querySelector('.gm-rosco-form');
      const input = form.querySelector('input');
      const fb = g.stage.querySelector('.gm-rosco-fb');
      const info = () => g.info('<span><b>' + correct + '</b> aciertos</span><span><b>' + st.filter((s) => s === '' || s === 'pass').length + '</b> por responder</span>');

      function paint() {
        letters.forEach((L, i) => { L.setAttribute('class', 'gm-rosco-l' + (st[i] ? ' ' + st[i] : '') + (i === cur && (st[i] === '' || st[i] === 'pass') ? ' cur' : '')); });
        cOk.textContent = String(correct); cNo.textContent = String(wrong);
      }
      function next() {
        waiting = null;
        fb.hidden = true;
        form.hidden = false;
        let j = -1;
        for (let k = 1; k <= N; k++) { const i = (cur + k + N) % N; if (st[i] === '' || st[i] === 'pass') { j = i; break; } }
        if (j < 0) return done('¡Completaste el rosco!');
        cur = j;
        const it = items[cur];
        big.textContent = it.l;
        qn.textContent = 'Letra ' + it.l + (st[cur] === 'pass' ? ' · segunda vuelta' : '') + ' · ' + (cur + 1) + ' de ' + N;
        qt.textContent = it.q;
        input.value = '';
        paint();
        info();
        g.bump(qBox, 'gm-in');
        g.say('Letra ' + it.l + '. ' + it.q);
        g.resume();
        focusIn();
      }
      function focusIn() { try { input.focus({ preventScroll: true }); } catch (e) { /* ignorar */ } }
      function answer() {
        if (waiting || cur < 0 || !g.running) return;
        const v = cmp(input.value);
        if (!v) { g.bump(input, 'gm-shake'); g.say('Escribe una respuesta o pulsa Pasapalabra'); return; }
        const it = items[cur];
        const L = letters[cur];
        if (it.ok.includes(v)) {
          st[cur] = 'ok'; correct++;
          const m = g.hit();
          g.good(L);
          g.add(100 * m, L);
          showFb('ok', '<b>¡Bien!</b> ' + esc(it.a));
          g.say('¡Correcto! ' + it.a);
          paint(); info();
          waiting = next;
          g.after(900, () => { if (waiting === next) next(); });
        } else {
          st[cur] = 'no'; wrong++;
          g.miss();
          g.bad(L);
          g.pause();
          showFb('no', '<span>Escribiste «' + esc(input.value.trim()) + '».</span> La respuesta era <b>' + esc(it.a) + '</b>.' +
            '<div class="gm-exp-go"><button type="button" class="gm-btn sm">Continuar</button></div>');
          g.say('No. La respuesta era ' + it.a);
          paint(); info();
          waiting = next;
          const b = fb.querySelector('button');
          b.onclick = () => waiting && waiting();
          g.after(60, () => b.focus({ preventScroll: true }));
        }
      }
      function showFb(kind, html) {
        form.hidden = kind === 'no';
        fb.className = 'gm-rosco-fb ' + kind;
        fb.innerHTML = html;
        fb.hidden = false;
        g.bump(fb, 'gm-in');
      }
      function pass() {
        if (waiting || cur < 0 || !g.running) return;
        passes++;
        st[cur] = 'pass';
        g.miss();
        g.pop('¡Pasapalabra!', big, 'combo');
        g.say('Pasapalabra');
        const remaining = st.filter((s) => s === '' || s === 'pass').length;
        if (remaining === 1) { g.bump(qBox, 'gm-shake'); g.say('Es la última letra: responde o se acaba el tiempo'); }
        next();
      }
      function done(reason) {
        const left = Math.max(0, g.t);
        const all = st.every((s) => s === 'ok' || s === 'no');
        const bonus = Math.round((left * 2 * correct) / Math.max(1, N));
        if (all && bonus > 0) g.add(bonus, null, '+' + bonus + ' por tiempo');
        form.hidden = true;
        g.end({ reason, correct, wrong, used: TIME - left, detail: { correct, wrong, total: N, passes, seconds: Math.round(TIME - left), missed: items.filter((_, i) => st[i] !== 'ok').map((x) => x.a) } });
      }

      g.on(form, 'submit', (e) => { e.preventDefault(); answer(); });
      form.querySelector('.gm-rosco-pass').addEventListener('click', () => { pass(); });
      g.on(input, 'keydown', (e) => {
        if (e.key === ' ' && !input.value.trim()) { e.preventDefault(); pass(); }
      });
      g.key((e) => {
        if (e.key === 'Enter' && waiting && e.target.tagName !== 'BUTTON') { e.preventDefault(); waiting(); }
      });
      g.clock(TIME, () => { waiting = null; done('¡Se acabó el tiempo!'); });
      if (!N) { qt.textContent = 'No hay preguntas en este rosco.'; form.hidden = true; g.pause(); return; }
      next();
    },
  });
}
