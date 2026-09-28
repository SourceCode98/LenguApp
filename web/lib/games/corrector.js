// Corrector de estilo: el texto trae errores escondidos como palabras normales. Toca la palabra que está mal,
// elige el arreglo y queda tachada con la corrección escrita a mano encima. Tocar una palabra correcta quita una vida.
// spec: { rounds:[{text:'Ayer {{fuimos|fuímos}} al parque…', e?}], time?:120, lives?:3 }
//   {{correcta|incorrecta|otra}}: se muestra la segunda opción (la incorrecta); ver parseCloze en lib/text.js.
import { esc, shuffle } from '../kit.js';
import { parseCloze } from '../text.js';
import { makeGame, clamp } from './common.js';

const WRONG_OPT = 20;
const splitPunct = (t) => { const m = /^([¿¡("«“'—-]*)(.*?)([.,;:!?)"»”'…—-]*)$/.exec(t); return m && m[2] ? [m[1], m[2], m[3]] : ['', t, '']; };
const hasWord = (s) => /[0-9A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/.test(s);
const faltan = (n) => (n === 1 ? 'Falta <b>1</b> error' : 'Faltan <b>' + n + '</b> errores');

function prepRound(r) {
  const gaps = [];
  let html = '';
  parseCloze(String(r.text || '')).forEach((p) => {
    if (p.opts) {
      const opts = p.opts.filter(Boolean);
      if (opts.length < 2) { html += esc(opts[0] || ''); return; }
      const k = gaps.length;
      gaps.push({ right: opts[0], shown: opts[1], opts: shuffle(opts.slice()) });
      // La opción incorrecta puede tener espacios: es un solo botón.
      html += '<button type="button" class="gm-co-w gm-co-gap" data-g="' + k + '" aria-haspopup="menu" aria-expanded="false">' + esc(opts[1]) + '</button>';
      return;
    }
    html += p.t.replace(/[^\s]+/g, (w) => {
      if (!hasWord(w)) return esc(w);
      const [a, c, z] = splitPunct(w);
      return '<span class="gm-co-t">' + esc(a) + '<button type="button" class="gm-co-w">' + esc(c) + '</button>' + esc(z) + '</span>';
    });
  });
  return { html, gaps, e: r.e || '' };
}

export default function corrector(el, spec, finish) {
  const rounds = (spec.rounds || []).filter((r) => r && r.text).map(prepRound).filter((r) => r.gaps.length);
  const TOTAL = rounds.reduce((s, r) => s + r.gaps.length, 0);
  const TIME = spec.time || 120;
  const LIVES = spec.lives || 3;
  return makeGame(el, spec, finish, {
    key: 'corrector', name: 'Corrector de estilo', icon: '✎', time: 'down', lives: LIVES,
    how: 'Lee con calma. Toca la palabra que está mal escrita o mal usada y elige cómo arreglarla. ¡Ojo! Si tocas una palabra que estaba bien, pierdes una vida.',
    rules: [rounds.length + (rounds.length === 1 ? ' texto' : ' textos'), TOTAL + ' errores escondidos', TIME + ' segundos', LIVES + ' vidas'],
    stars: (r) => {
      const f = TOTAL ? r.fixed / TOTAL : 0;
      return f >= 1 && r.slips <= 1 ? 3 : f >= 0.7 ? 2 : f >= 0.35 ? 1 : 0;
    },
    lines: (r) => [['Corregidos', r.fixed + ' de ' + TOTAL], ['Toques de más', String(r.slips)], ['Mejor racha', String(r.bestStreak)]],
    play(g) {
      g.stage.innerHTML =
        '<div class="gm-q gm-co-head"><p class="gm-qn"></p><h3 class="gm-qt"></h3></div>' +
        '<div class="gm-co-paper"><div class="gm-co-text" lang="es"></div></div>' +
        '<div class="gm-exp gm-co-exp" hidden></div>';
      const $ = (s) => g.stage.querySelector(s);
      const head = $('.gm-co-head'), qn = $('.gm-qn'), qt = $('.gm-qt'), textE = $('.gm-co-text'), exp = $('.gm-co-exp');
      let ri = -1, cur = null, left = 0, fixed = 0, slips = 0, wrongOpts = 0, lock = true, menu = null, t0 = 0, waiting = null;
      const fixedList = [];

      const info = () => g.info('<span>Texto <b>' + Math.max(1, ri + 1) + '</b> de ' + rounds.length + '</span><span>' + faltan(left) + '</span>');
      const done = (reason) => {
        lock = true; closeMenu();
        g.end({ reason, fixed, slips, detail: { fixed, total: TOTAL, slips, wrongOptions: wrongOpts, lives: g.lives, bestStreak: g.bestStreak, fixedWords: fixedList.slice(0, 12) } });
      };

      function next() {
        ri++;
        if (ri >= rounds.length) return done('¡Corregiste todos los textos!');
        cur = rounds[ri];
        left = cur.gaps.length;
        exp.hidden = true;
        waiting = null;
        qn.textContent = 'Texto ' + (ri + 1) + ' de ' + rounds.length;
        qt.innerHTML = 'Hay ' + (left === 1 ? '<b>1</b> error' : '<b>' + left + '</b> errores') + ' en este texto. ¡Encuéntralos!';
        textE.innerHTML = cur.html;
        textE.classList.remove('won');
        g.bump(head, 'gm-in');
        g.bump(textE, 'gm-in');
        info();
        lock = false;
        t0 = performance.now();
        g.say('Texto ' + (ri + 1) + '. Hay ' + left + (left === 1 ? ' error.' : ' errores.'));
        g.resume();
      }

      function closeMenu(refocus) {
        if (!menu) return;
        const b = menu.btn;
        menu.box.remove();
        b.setAttribute('aria-expanded', 'false');
        b.classList.remove('open');
        menu = null;
        if (refocus && b.isConnected) b.focus({ preventScroll: true });
      }
      function openMenu(b) {
        closeMenu();
        const gap = cur.gaps[+b.dataset.g];
        const box = document.createElement('div');
        box.className = 'gm-co-menu';
        box.setAttribute('role', 'menu');
        box.setAttribute('aria-label', 'Cambia «' + gap.shown + '» por');
        box.innerHTML = '<p>Cámbiala por:</p>' + gap.opts.map((o) => '<button type="button" role="menuitem" class="gm-co-opt" data-o="' + esc(o) + '">' + esc(o) + '</button>').join('');
        textE.appendChild(box);
        b.setAttribute('aria-expanded', 'true');
        b.classList.add('open');
        menu = { box, btn: b, gap };
        // debajo de la palabra, sin salirse del papel
        const W = textE.clientWidth, mw = box.offsetWidth;
        box.style.left = clamp(b.offsetLeft + b.offsetWidth / 2 - mw / 2, 4, Math.max(4, W - mw - 4)) + 'px';
        box.style.top = (b.offsetTop + b.offsetHeight + 6) + 'px';
        // si no cabe debajo (se cortaría con el borde del juego), va encima de la palabra
        if (box.getBoundingClientRect().bottom > g.root.getBoundingClientRect().bottom - 8 && b.offsetTop - box.offsetHeight - 6 >= -40) box.style.top = (b.offsetTop - box.offsetHeight - 6) + 'px';
        g.bump(box, 'gm-in');
        const first = box.querySelector('.gm-co-opt');
        if (first) first.focus({ preventScroll: true });
        // que el menú se vea completo
        try { box.scrollIntoView({ block: 'nearest' }); } catch (e) { /* ignorar */ }
      }
      function chooseOpt(o) {
        if (!menu || lock) return;
        const { btn: b, gap, box } = menu;
        const ob = [...box.querySelectorAll('.gm-co-opt')].find((x) => x.dataset.o === o);
        if (o !== gap.right) {
          wrongOpts++;
          g.miss();
          if (ob) { ob.disabled = true; ob.classList.add('no'); g.bad(ob); }
          g.add(-WRONG_OPT, ob || b);
          g.say('«' + o + '» tampoco es. Prueba otra.');
          return;
        }
        closeMenu();
        b.classList.add('fixed');
        b.disabled = true;
        b.removeAttribute('aria-haspopup');
        b.removeAttribute('aria-expanded');
        b.setAttribute('aria-label', 'Corregido: ' + gap.shown + ' por ' + gap.right);
        b.innerHTML = '<s class="gm-co-old">' + esc(gap.shown) + '</s><span class="gm-co-new" aria-hidden="true">' + esc(gap.right) + '</span>';
        left--; fixed++;
        fixedList.push(gap.shown + ' → ' + gap.right);
        const m = g.hit();
        const secs = (performance.now() - t0) / 1000;
        t0 = performance.now();
        g.good(b);
        g.add((100 + (secs < 8 ? 40 : secs < 15 ? 20 : 0)) * m, b);
        g.say('¡Corregido! ' + gap.right + '. ' + (left ? (left === 1 ? 'Falta 1 error.' : 'Faltan ' + left + ' errores.') : ''));
        info();
        const nextB = textE.querySelector('.gm-co-w:not(.fixed)');
        if (nextB) nextB.focus({ preventScroll: true });
        if (!left) roundDone();
      }
      function slip(b) {
        slips++;
        g.miss();
        g.bad(b);
        b.classList.remove('nope');
        void b.offsetWidth;
        b.classList.add('nope');
        g.after(900, () => b.classList.remove('nope'));
        const tip = document.createElement('span');
        tip.className = 'gm-co-tip';
        tip.textContent = 'Esa está bien';
        tip.setAttribute('aria-hidden', 'true');
        textE.appendChild(tip);
        const W = textE.clientWidth;
        tip.style.left = clamp(b.offsetLeft + b.offsetWidth / 2 - tip.offsetWidth / 2, 2, Math.max(2, W - tip.offsetWidth - 2)) + 'px';
        const above = b.offsetTop - tip.offsetHeight + 2;
        tip.style.top = (above >= 0 ? above : b.offsetTop + b.offsetHeight - 2) + 'px';
        g.after(1100, () => tip.remove());
        const lv = g.loseLife();
        g.say('Esa palabra está bien. Pierdes una vida; te quedan ' + lv + '.');
        if (lv <= 0) { lock = true; g.after(700, () => done('Te quedaste sin vidas')); }
      }
      function roundDone() {
        lock = true;
        g.pause();
        textE.classList.add('won');
        g.after(200, () => { g.add(80, head, '¡Texto limpio! +80'); g.confetti(26); });
        const last = ri + 1 >= rounds.length;
        const go = () => { waiting = null; next(); };
        if (cur.e) {
          exp.hidden = false;
          exp.innerHTML = '<b>¿Por qué?</b> ' + esc(cur.e) +
            '<div class="gm-exp-go"><button type="button" class="gm-btn sm">' + (last ? 'Ver resultado' : 'Siguiente texto') + '</button></div>';
          g.bump(exp, 'gm-in');
          const btn = exp.querySelector('button');
          waiting = go;
          btn.onclick = () => waiting && waiting();
          g.after(80, () => btn.focus({ preventScroll: true }));
        } else g.after(1400, go);
      }

      textE.addEventListener('click', (e) => {
        const o = e.target.closest('.gm-co-opt');
        if (o) { chooseOpt(o.dataset.o); return; }
        const b = e.target.closest('.gm-co-w');
        if (lock || !b || b.disabled) { if (!e.target.closest('.gm-co-menu')) closeMenu(); return; }
        if (b.classList.contains('gm-co-gap')) { if (menu && menu.btn === b) closeMenu(true); else openMenu(b); }
        else { closeMenu(); slip(b); }
      });
      g.on(document, 'pointerdown', (e) => { if (menu && !textE.contains(e.target)) closeMenu(); });
      g.key((e) => {
        if (waiting) { if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') { e.preventDefault(); waiting(); } return; }
        if (!menu) return;
        if (e.key === 'Escape') { e.preventDefault(); closeMenu(true); return; }
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const os = [...menu.box.querySelectorAll('.gm-co-opt:not(:disabled)')];
          if (!os.length) return;
          const i = os.indexOf(document.activeElement);
          const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1;
          os[(i + d + os.length) % os.length].focus();
        }
      });
      g.clock(TIME, () => done('¡Se acabó el tiempo!'));
      if (!rounds.length) { qt.textContent = 'No hay textos en este reto.'; g.pause(); return; }
      next();
    },
  });
}
