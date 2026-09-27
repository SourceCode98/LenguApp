// Atrapa palabras: caen tarjetas de texto; mueve el libro abierto para atrapar solo las que cumplen la regla.
// spec: { rule:'Atrapa solo los sustantivos', good:['casa','perro','Bogotá'], bad:['correr','azul','lentamente'], time:45, lives:3 }
//   Cada tarjeta atrapada escribe un renglón en el libro; con 8 renglones el libro se llena (bonificación).
import { esc } from '../kit.js';
import { makeGame, clamp } from './common.js';

const FULL = 8; // atrapadas para llenar el libro (bonificación)
const label = (s) => esc(s);

// Libro abierto visto de frente; los renglones (.gm-ca-ln) se escriben al atrapar.
const bookSVG = () =>
  '<svg viewBox="0 0 120 92" aria-hidden="true">' +
  '<path class="gm-ca-cover" d="M3 30 Q32 18 60 30 Q88 18 117 30 L117 84 Q88 74 60 88 Q32 74 3 84 Z"/>' +
  '<path class="gm-ca-page" d="M8 25 Q34 13 60 27 L60 80 Q34 67 8 77 Z"/>' +
  '<path class="gm-ca-page r" d="M112 25 Q86 13 60 27 L60 80 Q86 67 112 77 Z"/>' +
  '<g class="gm-ca-lns">' +
  [0, 1, 2, 3].map((i) => '<path class="gm-ca-ln" data-n="' + i + '" d="M15 ' + (34 + i * 10) + ' Q34 ' + (26 + i * 10) + ' 53 ' + (37 + i * 10) + '"/>').join('') +
  [0, 1, 2, 3].map((i) => '<path class="gm-ca-ln" data-n="' + (i + 4) + '" d="M67 ' + (37 + i * 10) + ' Q86 ' + (26 + i * 10) + ' 105 ' + (34 + i * 10) + '"/>').join('') +
  '</g>' +
  '<path class="gm-ca-spine" d="M60 27 L60 86"/>' +
  '<path class="gm-ca-rib" d="M76 22 L76 90 L80 86 L84 90 L84 20"/>' +
  '</svg>';

export default function catcher(el, spec, finish) {
  const good = (spec.good || []).map(String).filter(Boolean);
  const bad = (spec.bad || []).map(String).filter(Boolean);
  const rule = spec.rule || 'Atrapa solo las palabras correctas';
  const TIME = spec.time || 45;
  const LIVES = spec.lives || 3;
  const k = TIME / 45;
  // Metas acordes al ritmo pausado (unas 20 tarjetas correctas caen en 45 s).
  const th = [Math.max(3, Math.round(5 * k)), Math.max(5, Math.round(10 * k)), Math.max(7, Math.round(15 * k))];
  return makeGame(el, spec, finish, {
    key: 'catcher', name: 'Atrapa palabras', icon: '✋', time: 'down', lives: LIVES,
    how: 'Mueve el libro para atrapar solo las palabras que cumplen la regla y esquiva las demás.',
    rules: [esc(rule), TIME + ' segundos', LIVES + ' vidas', 'Arrastra, mueve el mouse o usa ← →'],
    stars: (r) => (r.caught >= th[2] ? 3 : r.caught >= th[1] ? 2 : r.caught >= th[0] ? 1 : 0),
    lines: (r) => [['Atrapadas', String(r.caught)], ['Esquivadas', String(r.dodged)], ['Mejor racha', String(r.bestStreak)]],
    play(g) {
      g.stage.innerHTML =
        '<div class="gm-ca-rule"><span>Regla</span><b>' + esc(rule) + '</b></div>' +
        '<div class="gm-ca-field" role="application" aria-label="Zona de juego. Usa las flechas izquierda y derecha para mover el libro.">' +
        '<div class="gm-ca-lvl" aria-hidden="true"></div><div class="gm-ca-say" aria-hidden="true"></div>' +
        '<div class="gm-ca-beaker gm-ca-book">' + bookSVG() + '</div>' +
        '<div class="gm-sready">¡Prepárate!</div></div>';
      const field = g.stage.querySelector('.gm-ca-field');
      const beaker = field.querySelector('.gm-ca-beaker');
      const lns = [...beaker.querySelectorAll('.gm-ca-ln')];
      const lvlE = field.querySelector('.gm-ca-lvl');
      const sayE = field.querySelector('.gm-ca-say');
      const ready = field.querySelector('.gm-sready');
      let sayT = null;
      let items = [], started = false, over = false, elapsed = 0, spawnT = 0.2, level = 1;
      let caught = 0, dodged = 0, wrongCaught = 0, escaped = 0, fill = 0;
      let W = field.clientWidth, H = field.clientHeight, bw = beaker.offsetWidth, bh = beaker.offsetHeight;
      let bx = W / 2, tx = W / 2, keyDir = 0;
      const keys = { l: false, r: false };
      const oops = [];
      let bagG = [], bagB = [];
      const draw = () => g.info('<span><b>' + caught + '</b> ' + (caught === 1 ? 'atrapada' : 'atrapadas') + '</span><span>Nivel <b>' + level + '</b></span>');
      draw();
      const drawFill = () => { lns.forEach((l, i) => l.classList.toggle('on', i < fill)); beaker.style.setProperty('--lv', (fill / FULL).toFixed(3)); };
      drawFill();

      const take = (bag, src) => { if (!bag.length) { bag.push(...src); for (let i = bag.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [bag[i], bag[j]] = [bag[j], bag[i]]; } } return bag.pop(); };

      function spawn() {
        const pGood = !bad.length ? 1 : !good.length ? 0 : 0.56;
        const isGood = Math.random() < pGood;
        const s = isGood ? take(bagG, good) : take(bagB, bad);
        if (s === undefined) return;
        const d = document.createElement('div');
        d.className = 'gm-ca-it card';
        d.innerHTML = '<span>' + label(s) + '</span>';
        field.insertBefore(d, beaker);
        const w = d.offsetWidth, h = d.offsetHeight;
        // evita que salga justo encima del anterior
        let x = 6 + Math.random() * Math.max(0, W - w - 12);
        const last = items[items.length - 1];
        if (last && Math.abs(last.x - x) < w * 0.6 && last.y < h) x = clamp(x + (x > W / 2 ? -1 : 1) * w * 1.2, 6, Math.max(6, W - w - 6));
        // Caen despacio para que alcancen a leerse (más largas, más lentas).
        const fallT = Math.max(3.6, 6 - elapsed * 0.035) + Math.min(1.5, String(s).length * 0.05);
        const wob = level >= 3 ? (Math.random() < 0.5 ? -1 : 1) * Math.min(1, (level - 2) * 0.35) * (10 + Math.random() * 18) : 0;
        const it = { el: d, s, good: isGood, x, x0: x, y: -h - 4, w, h, v: (H + h) / fallT, st: 'fall', ph: Math.random() * 6, wob };
        place(it);
        items.push(it);
      }
      function place(it) { it.el.style.transform = 'translate3d(' + it.x.toFixed(1) + 'px,' + it.y.toFixed(1) + 'px,0)'; }
      function gone(it, ms) { it.st = 'done'; g.after(ms, () => it.el.remove()); }

      function catchIt(it) {
        const fr = g.at(beaker, 0.5, 0.2);
        if (it.good) {
          caught++;
          const m = g.hit();
          fill++;
          it.el.classList.add('in');
          it.el.style.transform = 'translate3d(' + (bx - it.w / 2).toFixed(1) + 'px,' + (H - bh * 0.7 - it.h / 2).toFixed(1) + 'px,0) scale(.35)';
          gone(it, 260);
          g.good(beaker);
          beaker.classList.remove('hurt');
          g.bump(beaker, 'gm-ca-gulp');
          g.add(100 * m, fr);
          if (fill >= FULL) {
            fill = 0;
            g.after(180, () => { g.add(300, { x: fr.x, y: fr.y - 40 }, '¡Libro lleno! +300'); g.confetti(26); });
            g.bump(beaker, 'gm-ca-full');
          }
          drawFill();
          draw();
          g.say('Bien: ' + it.s);
        } else {
          wrongCaught++;
          oops.push(it.s);
          g.miss();
          it.el.classList.add('no');
          it.st = 'bounce';
          it.vy = -260; it.vx = (it.x + it.w / 2 < bx ? -1 : 1) * 160;
          g.after(700, () => it.el.remove());
          g.bad(beaker);
          beaker.classList.add('hurt');
          g.after(450, () => beaker.classList.remove('hurt'));
          g.bump(field, 'gm-ca-flash');
          sayE.innerHTML = '✗ <b>' + label(it.s) + '</b> no cumple la regla';
          const sw = sayE.offsetWidth;
          sayE.style.left = clamp(bx, sw / 2 + 6, Math.max(sw / 2 + 6, W - sw / 2 - 6)) + 'px';
          g.bump(sayE, 'on');
          if (sayT) g.cancel(sayT);
          sayT = g.after(1400, () => sayE.classList.remove('on'));
          fill = Math.max(0, fill - 2);
          drawFill();
          g.say(it.s + ' no cumple la regla. Pierdes una vida.');
          if (g.loseLife() <= 0) end('Te quedaste sin vidas');
        }
      }
      function land(it) {
        it.st = 'land';
        it.el.classList.add('floor');
        place(it);
        if (it.good) {
          escaped++;
          g.miss();
          g.pop('¡Se escapó!', { x: clamp(it.x + it.w / 2, 60, W - 60) + g.at(field, 0, 0).x, y: g.at(field, 0, 1).y - 30 }, 'no');
        } else dodged++;
        gone(it, 520);
      }
      function end(reason) {
        if (over) return;
        over = true;
        g.pause();
        g.after(700, () => g.end({
          reason, caught, dodged,
          detail: { caught, dodged, wrong: wrongCaught, escaped, bestStreak: g.bestStreak, lives: g.lives, mistakes: oops.slice(0, 10) },
        }));
      }

      function resize() {
        W = field.clientWidth; H = field.clientHeight; bw = beaker.offsetWidth; bh = beaker.offsetHeight;
        tx = clamp(tx, bw / 2, W - bw / 2); bx = clamp(bx, bw / 2, W - bw / 2);
      }
      let ro = null;
      if (window.ResizeObserver) { ro = new ResizeObserver(resize); ro.observe(field); g.cleanups.push(() => ro.disconnect()); }

      g.frame((dt) => {
        if (!ro) resize();
        // libro
        if (keys.l || keys.r) { keyDir = (keys.r ? 1 : 0) - (keys.l ? 1 : 0); tx = clamp(tx + keyDir * Math.max(420, W * 1.15) * dt, bw / 2, W - bw / 2); }
        const px = bx;
        bx += (tx - bx) * Math.min(1, dt * 22);
        const tilt = clamp((bx - px) / Math.max(dt, 0.001) / 90, -9, 9);
        beaker.style.transform = 'translate3d(' + (bx - bw / 2).toFixed(1) + 'px,0,0) rotate(' + tilt.toFixed(1) + 'deg)';
        if (!started || over) return;
        elapsed += dt;
        const nl = 1 + Math.floor(elapsed / 9);
        if (nl !== level) { level = nl; draw(); lvlE.textContent = '¡Nivel ' + level + '!'; g.bump(lvlE, 'gm-ca-lvlin'); g.after(1300, () => lvlE.classList.remove('gm-ca-lvlin')); }
        // aparición
        spawnT -= dt;
        if (spawnT <= 0) { spawn(); spawnT = Math.max(0.8, 1.45 - elapsed * 0.012) * (0.8 + Math.random() * 0.4); }
        const mouth = H - bh + bh * 0.3;
        for (let i = 0; i < items.length; i++) {
          const it = items[i];
          if (it.st === 'fall') {
            const pb = it.y + it.h;
            it.y += it.v * dt;
            if (it.wob) { it.ph += dt * 2.6; it.x = clamp(it.x0 + Math.sin(it.ph) * it.wob, 2, W - it.w - 2); }
            const cx = it.x + it.w / 2;
            if (pb < mouth && it.y + it.h >= mouth && Math.abs(cx - bx) < bw * 0.5 + it.w * 0.18) catchIt(it);
            else if (it.y + it.h >= H - 2) { it.y = H - it.h - 2; land(it); }
            if (it.st === 'fall') place(it);
          } else if (it.st === 'bounce') {
            it.vy += 900 * dt; it.y += it.vy * dt; it.x += it.vx * dt;
            place(it);
          }
        }
        items = items.filter((it) => it.st === 'fall' || it.st === 'bounce');
      });

      // controles: arrastrar o mover el mouse en la zona
      let drag = null;
      const fx = (e) => { const r = field.getBoundingClientRect(); return clamp(e.clientX - r.left, bw / 2, W - bw / 2); };
      g.on(field, 'pointerdown', (e) => {
        drag = e.pointerId;
        try { field.setPointerCapture(e.pointerId); } catch (x) { /* ignorar */ }
        tx = fx(e);
      });
      g.on(field, 'pointermove', (e) => { if (drag === e.pointerId || e.pointerType === 'mouse') tx = fx(e); });
      const up = (e) => { if (drag === e.pointerId) drag = null; };
      g.on(field, 'pointerup', up);
      g.on(field, 'pointercancel', up);
      const KL = { ArrowLeft: 'l', a: 'l', A: 'l', ArrowRight: 'r', d: 'r', D: 'r' };
      g.key((e) => { const k2 = KL[e.key]; if (k2) { e.preventDefault(); keys[k2] = true; } });
      g.on(document, 'keyup', (e) => { const k2 = KL[e.key]; if (k2) keys[k2] = false; });
      g.on(window, 'blur', () => { keys.l = keys.r = false; });

      g.clock(TIME, () => end('¡Se acabó el tiempo!'));
      g.pause();
      if (!good.length && !bad.length) { ready.textContent = 'No hay palabras en este reto.'; return; }
      g.after(1000, () => { ready.remove(); started = true; g.resume(); });
    },
  });
}
