// Constructor de oraciones: bloques de palabras en 3D; tócalos en orden para ponerlos en fila sobre la repisa.
// Cuando la fila coincide con una respuesta, los bloques se alinean y se celebra.
// spec: { targets:[{prompt:'Arma una oración con sujeto y predicado', pieces:['niños','Los','juegan','parque','en','el'],
//          answers:[['Los','niños','juegan','en','el','parque']]}], time? }
//   pieces puede traer piezas de sobra. Sin time el reloj cuenta hacia arriba. Teclas 1-9: pieza; Retroceso: quitar la última.
import { THREE, esc, shuffle, reduce, three } from '../kit.js';
import { makeGame, mmss, clamp } from './common.js';

const norm = (s) => String(s).trim().toLocaleLowerCase('es-CO');
const same = (a, b) => norm(a) === norm(b);
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const ZOOM = 9, BH = 0.82, BD = 0.46, GAP = 0.16;
const FONT = '"Bricolage Grotesque","IBM Plex Sans",system-ui,sans-serif';

function subset(ans, pieces) {
  const bag = pieces.map(norm);
  return ans.every((w) => { const i = bag.indexOf(norm(w)); if (i < 0) return false; bag.splice(i, 1); return true; });
}

export default function builder(el, spec, finish) {
  const targets = (spec.targets || []).filter((t) => t && Array.isArray(t.pieces) && t.pieces.length && Array.isArray(t.answers))
    .map((t) => ({ prompt: t.prompt || 'Ordena las palabras', pieces: t.pieces.map(String), answers: t.answers.filter((a) => Array.isArray(a) && a.length && subset(a, t.pieces)).map((a) => a.map(String)) }))
    .filter((t) => t.answers.length);
  const N = targets.length;
  const TIME = spec.time || 0;
  return makeGame(el, spec, finish, {
    key: 'builder', name: 'Constructor de oraciones', icon: '▤', time: TIME ? 'down' : 'up',
    how: 'Toca los bloques de palabras en orden para armar la oración sobre la repisa.',
    rules: [N + (N === 1 ? ' oración' : ' oraciones'), 'Sin errores y rápido: más estrellas', 'Teclas 1 a 9 · Retroceso quita'],
    stars: (r) => { const f = r.score / (Math.max(1, N) * 250); return !r.built ? 0 : f >= 0.72 && r.built === N ? 3 : f >= 0.45 ? 2 : 1; },
    lines: (r) => [['Oraciones', r.built + ' de ' + N], ['Errores', String(r.errors)], ['Tiempo', mmss(r.secs)], r.hints ? ['Pistas', String(r.hints)] : null],
    play(g) {
      const order = spec.shuffle === false ? targets.slice() : shuffle(targets.slice());
      g.stage.innerHTML =
        '<div class="gm-target"><div class="gm-tl"><p class="gm-qn"></p><h3 class="gm-tname"></h3></div>' +
        '<button type="button" class="gm-btn ghost sm gm-hintb">Pista</button></div>' +
        '<div class="stage gm-bstage gm-bu-stage"><div class="gm-bmsg"></div></div>' +
        '<div class="gm-bu-bar"><p class="gm-bu-line" aria-live="polite"></p>' +
        '<button type="button" class="gm-bu-undo" aria-label="Quitar la última palabra">⌫</button></div>';
      const $ = (s) => g.stage.querySelector(s);
      const stageEl = $('.gm-bu-stage'), msg = $('.gm-bmsg'), lineE = $('.gm-bu-line'), hintB = $('.gm-hintb'), undoB = $('.gm-bu-undo');
      const o = three(stageEl);
      let ti = -1, target = null, blocks = [], row = [], locked = true, errors = 0, hints = 0, built = 0, tStart = 0, win = null, shakeT = 0;
      const anims = [];
      const anim = (d, fn, doneFn) => { const a = { t: 0, d: reduce ? 0 : d, fn, done: doneFn }; if (reduce) { fn(1); doneFn && doneFn(); } else anims.push(a); return a; };
      // materiales compartidos
      const M = o && {
        side: new THREE.MeshStandardMaterial({ color: 0xE8C98A, roughness: 0.7 }),
        placed: new THREE.MeshStandardMaterial({ color: 0x5B8FD6, roughness: 0.55 }),
        good: new THREE.MeshStandardMaterial({ color: 0x3DBE7A, roughness: 0.5, emissive: 0x0d3a20 }),
        bad: new THREE.MeshStandardMaterial({ color: 0xE0584C, roughness: 0.5, emissive: 0x3a0d0d }),
        hint: new THREE.MeshStandardMaterial({ color: 0xF2C14E, roughness: 0.5, emissive: 0x4a3505 }),
        shelf: new THREE.MeshStandardMaterial({ color: 0x6B4A2E, roughness: 0.8 }),
      };
      const box1 = o && new THREE.BoxGeometry(1, 1, 1);
      let shelf = null;
      if (o) {
        o.auto = false; o.rot.x = -0.1; o.rot.y = 0; o.zoom = ZOOM;
        shelf = new THREE.Mesh(box1, M.shelf);
        o.root.add(shelf);
        stageEl.insertAdjacentHTML('beforeend', '<div class="hint">Toca un bloque · arrastra para girar</div>');
      } else {
        // Sin WebGL: las mismas piezas como botones planos (la versión plana reemplaza el aviso .nogl).
        stageEl.querySelectorAll('.nogl').forEach((n) => n.remove());
        stageEl.classList.add('gm-bu-2d');
        stageEl.insertAdjacentHTML('beforeend', '<div class="gm-bu-flat"><div class="gm-bu-pool"></div><div class="gm-bu-row"></div></div>');
      }
      const flat = stageEl.querySelector('.gm-bu-flat');

      function makeFace(text, n) {
        const c = document.createElement('canvas');
        const ctx = c.getContext('2d');
        const F = 72;
        ctx.font = '700 ' + F + 'px ' + FONT;
        const tw = ctx.measureText(text).width;
        const W = Math.ceil(Math.max(tw + F * 0.95, F * 1.5)), H = Math.round(F * 1.55);
        c.width = W; c.height = H;
        const grd = ctx.createLinearGradient(0, 0, 0, H);
        grd.addColorStop(0, '#FFF9EE'); grd.addColorStop(1, '#F3E6CC');
        ctx.fillStyle = grd; ctx.fillRect(0, 0, W, H);
        ctx.strokeStyle = 'rgba(120,85,40,.35)'; ctx.lineWidth = 6; ctx.strokeRect(3, 3, W - 6, H - 6);
        ctx.fillStyle = '#1B2430'; ctx.font = '700 ' + F + 'px ' + FONT; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(text, W / 2, H / 2 + F * 0.05);
        if (n) { ctx.font = '600 22px "IBM Plex Mono",monospace'; ctx.fillStyle = 'rgba(27,36,48,.45)'; ctx.textAlign = 'left'; ctx.textBaseline = 'top'; ctx.fillText(String(n), 12, 9); }
        const tex = new THREE.CanvasTexture(c);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 4;
        return { tex, aspect: W / H };
      }

      function view() {
        const w = stageEl.clientWidth || 600, h = stageEl.clientHeight || 340;
        const hh = ZOOM * Math.tan((20 * Math.PI) / 180);
        return { hw: hh * (w / h), hh };
      }
      // Posiciones destino: sueltos en líneas arriba; puestos en fila sobre la repisa.
      function layout() {
        if (!o) return drawFlat();
        const v = view();
        const avail = 2 * v.hw * 0.9;
        const tw = row.reduce((s, b) => s + b.w, 0) + GAP * Math.max(0, row.length - 1);
        const sr = Math.min(1, avail / Math.max(tw, 0.01));
        const yRow = -v.hh * 0.56;
        let x = -(tw * sr) / 2;
        row.forEach((b) => { b.tp.set(x + (b.w * sr) / 2, yRow, 0.25); b.ts = sr; x += (b.w + GAP) * sr; });
        shelf.scale.set(avail + 0.4, 0.14, 0.9);
        shelf.position.set(0, yRow - (BH * sr) / 2 - 0.1, 0.1);
        const loose = blocks.filter((b) => b.state === 'loose');
        const top = v.hh * 0.78, bottom = -v.hh * 0.2;
        let sl = 1, lines;
        for (let k = 0; k < 8; k++) {
          lines = [[]]; let lw = 0;
          loose.forEach((b) => {
            const w = b.w * sl;
            if (lines[lines.length - 1].length && lw + GAP * sl + w > avail) { lines.push([]); lw = 0; }
            lw += (lines[lines.length - 1].length ? GAP * sl : 0) + w;
            lines[lines.length - 1].push(b);
          });
          if (lines.length * (BH + 0.34) * sl <= top - bottom) break;
          sl *= 0.88;
        }
        const lh = (BH + 0.34) * sl;
        const y0 = (top + bottom) / 2 + ((lines.length - 1) * lh) / 2;
        lines.forEach((ln, li) => {
          const w = ln.reduce((s, b) => s + b.w * sl, 0) + GAP * sl * Math.max(0, ln.length - 1);
          let x2 = -w / 2;
          ln.forEach((b) => { b.tp.set(x2 + (b.w * sl) / 2, y0 - li * lh, 0); b.ts = sl; x2 += (b.w + GAP) * sl; });
        });
        drawLine();
      }
      function drawFlat() {
        const btn = (b) => '<button type="button" class="gm-bu-piece' + (b.state === 'placed' ? ' in' : '') + (b.hint ? ' hint' : '') + '" data-id="' + b.id + '">' + esc(b.t) + '</button>';
        flat.querySelector('.gm-bu-pool').innerHTML = blocks.filter((b) => b.state === 'loose').map(btn).join('');
        flat.querySelector('.gm-bu-row').innerHTML = row.map(btn).join('') || '<span class="gm-bu-empty">Toca las palabras en orden</span>';
        drawLine();
      }
      function drawLine() {
        lineE.innerHTML = row.length ? row.map((b) => '<span>' + esc(b.t) + '</span>').join(' ') : '<em>Tu oración aparecerá aquí</em>';
        undoB.disabled = !row.length || locked;
      }
      function setSide(b, mat) { if (b.mesh) { b.mesh.material[0] = b.mesh.material[1] = b.mesh.material[2] = b.mesh.material[3] = b.mesh.material[5] = mat; } }

      function addBlocks() {
        const pieces = shuffle(target.pieces.map((t, i) => ({ t, i })));
        blocks = pieces.map((p, k) => {
          const b = { id: k, t: p.t, state: 'loose', tp: new THREE.Vector3(), ts: 1, ph: Math.random() * 6.28, w: 1.4, hint: false };
          if (o) {
            const f = makeFace(p.t, pieces.length <= 9 ? k + 1 : 0);
            b.w = BH * f.aspect;
            b.tex = f.tex;
            b.front = new THREE.MeshStandardMaterial({ map: f.tex, roughness: 0.62, emissive: 0xffffff, emissiveMap: f.tex, emissiveIntensity: 0.42 });
            b.geo = new THREE.BoxGeometry(b.w, BH, BD);
            b.mesh = new THREE.Mesh(b.geo, [M.side, M.side, M.side, M.side, b.front, M.side]);
            b.mesh.userData.b = b;
            b.mesh.scale.setScalar(0.01);
            o.root.add(b.mesh);
          }
          return b;
        });
        layout();
        blocks.forEach((b, k) => {
          if (!o) return;
          b.mesh.position.set(b.tp.x, b.tp.y + 2.5, -1);
          anim(0.45 + k * 0.04, (t) => { const e = ease(clamp((t * (0.45 + k * 0.04) - k * 0.04) / 0.45, 0, 1)); b.pop = e; });
        });
      }
      function clearBlocks(doneFn) {
        const old = blocks;
        blocks = []; row = [];
        if (!o) { doneFn(); return; }
        old.forEach((b) => (b.state = 'gone'));
        anim(0.32, (k) => old.forEach((b) => b.mesh.scale.setScalar(Math.max(0.001, b.ts * (1 - ease(k))))), () => {
          old.forEach((b) => { o.root.remove(b.mesh); b.geo.dispose(); b.front.dispose(); b.tex.dispose(); });
          doneFn();
        });
        gone = gone.concat(old);
      }
      let gone = [];

      function toggle(b) {
        if (locked || !b || b.state === 'gone') return;
        if (b.state === 'loose') { b.state = 'placed'; row.push(b); if (o) setSide(b, M.placed); }
        else { row = row.filter((x) => x !== b); b.state = 'loose'; if (o) setSide(b, M.side); }
        const added = b.state === 'placed';
        b.hint = false;
        msg.classList.add('off');
        layout();
        check(!added);
      }
      function undo() { if (!locked && row.length) toggle(row[row.length - 1]); }

      // quiet: al devolver un bloque solo se busca acierto, nunca se cuenta error
      function check(quiet) {
        const seq = row.map((b) => b.t);
        const hit = target.answers.find((a) => a.length === seq.length && a.every((w, i) => same(w, seq[i])));
        if (hit) return solve();
        if (quiet) return;
        const maxLen = Math.max(...target.answers.map((a) => a.length));
        if (seq.length > maxLen) { toast('Sobran palabras: toca un bloque de la fila para devolverlo', 'warn'); return; }
        if (seq.length === maxLen || !blocks.some((b) => b.state === 'loose')) {
          errors++;
          g.miss();
          g.add(-25, lineE);
          g.bad(lineE);
          row.forEach((b) => o && setSide(b, M.bad));
          shakeT = reduce ? 0 : 0.45;
          const r0 = row.slice();
          g.after(650, () => r0.forEach((b) => { if (b.state === 'placed' && o) setSide(b, M.placed); }));
          toast('Así no queda bien: toca un bloque de la fila para devolverlo', 'warn');
          g.say('Esa no es la oración. Revisa el orden.');
          info();
        }
      }
      let toastT = null;
      function toast(html, kind) {
        let t = stageEl.querySelector('.gm-toast');
        if (!t) { t = document.createElement('div'); t.className = 'gm-toast'; stageEl.appendChild(t); }
        t.className = 'gm-toast show ' + (kind || '');
        t.innerHTML = html;
        if (toastT) g.cancel(toastT);
        toastT = g.after(2000, () => t.classList.remove('show'));
      }
      const info = () => g.info('<span><b>' + built + '</b> de ' + N + ' oraciones</span><span><b>' + errors + '</b> ' + (errors === 1 ? 'error' : 'errores') + '</span>');

      function solve() {
        locked = true;
        g.pause();
        built++;
        const secs = (performance.now() - tStart) / 1000;
        const bonus = Math.round(clamp(30 - Math.max(0, secs - 1.3 * row.length), 0, 30) * 5);
        const m = g.hit();
        drawLine();
        info();
        lineE.classList.add('won');
        row.forEach((b) => o && setSide(b, M.good));
        win = { t: 0 };
        g.after(reduce ? 0 : 500, () => {
          g.add((100 + bonus) * (m > 1 ? 1.25 : 1), g.at(stageEl, 0.5, 0.45));
          g.confetti(36);
          msg.innerHTML = '<b>¡Oración lista!</b><span>' + esc(row.map((b) => b.t).join(' ')) + '</span>';
          msg.className = 'gm-bmsg win';
        });
        g.say('¡Muy bien! ' + row.map((b) => b.t).join(' '));
        g.after(2400, next);
      }
      function showHint() {
        if (locked) return;
        const seq = row.map((b) => b.t);
        let best = target.answers[0], bp = -1;
        target.answers.forEach((a) => { let p = 0; while (p < seq.length && p < a.length && same(a[p], seq[p])) p++; if (p > bp) { bp = p; best = a; } });
        // devuelve lo que sobra y pone la siguiente pieza correcta
        row.slice(bp).reverse().forEach((b) => { row = row.filter((x) => x !== b); b.state = 'loose'; if (o) setSide(b, M.side); });
        const want = best[bp];
        const b = blocks.find((x) => x.state === 'loose' && same(x.t, want));
        hints++;
        g.add(-40, hintB);
        if (!b) { layout(); return; }
        b.state = 'placed'; row.push(b);
        if (o) { setSide(b, M.hint); g.after(900, () => { if (b.state === 'placed' && !locked) setSide(b, M.placed); }); }
        b.hint = true;
        toast('Pista: sigue «' + esc(b.t) + '»');
        g.say('Pista: la siguiente palabra es ' + b.t);
        layout();
        check();
      }

      function next() {
        msg.className = 'gm-bmsg off';
        lineE.classList.remove('won');
        clearBlocks(() => {
          ti++;
          if (ti >= order.length) return g.end({ built, errors, hints, secs: TIME ? TIME - g.t : g.t, reason: '¡Armaste todas las oraciones!', detail: { built, total: N, errors, hints, seconds: Math.round(TIME ? TIME - g.t : g.t) } });
          target = order[ti];
          $('.gm-qn').textContent = 'Oración ' + (ti + 1) + ' de ' + N;
          $('.gm-tname').textContent = target.prompt;
          g.bump($('.gm-target'), 'gm-in');
          msg.className = 'gm-bmsg';
          msg.innerHTML = '<span>Toca los bloques en el orden de la oración</span>';
          if (o) { o.rot.x = -0.1; o.rot.y = 0; }
          addBlocks();
          info();
          locked = false;
          drawLine();
          tStart = performance.now();
          g.resume();
        });
      }

      // animación y resortes
      let pressing = false;
      g.frame((dt) => {
        for (let i = anims.length - 1; i >= 0; i--) {
          const a = anims[i];
          a.t += dt;
          const k = a.d ? Math.min(1, a.t / a.d) : 1;
          a.fn(k);
          if (k >= 1) { anims.splice(i, 1); a.done && a.done(); }
        }
        if (!o) return;
        o.zoom = ZOOM;
        if (!pressing) { o.rot.x += (-0.1 - o.rot.x) * Math.min(1, dt * 3); o.rot.y += (0 - o.rot.y) * Math.min(1, dt * 3); }
        o.rot.x = clamp(o.rot.x, -0.7, 0.35); o.rot.y = clamp(o.rot.y, -0.8, 0.8);
        if (shakeT > 0) shakeT = Math.max(0, shakeT - dt);
        if (win) win.t += dt;
        const now = performance.now() / 1000;
        const kk = reduce ? 1 : Math.min(1, dt * 11);
        blocks.forEach((b, i) => {
          if (b.state === 'gone') return;
          const p = b.mesh.position;
          p.lerp(b.tp, kk);
          b.mesh.scale.setScalar(b.ts * (b.pop === undefined ? 1 : Math.max(0.01, b.pop)));
          if (reduce) return;
          if (b.state === 'loose') { b.mesh.position.y += Math.sin(now * 1.6 + b.ph) * 0.004; b.mesh.rotation.y = Math.sin(now * 0.8 + b.ph) * 0.12; b.mesh.rotation.x = 0; }
          else {
            b.mesh.rotation.y *= 0.85;
            if (shakeT > 0) p.x += Math.sin(shakeT * 60 + i) * 0.05;
            if (win) {
              const j = row.indexOf(b);
              const t = win.t - j * 0.08;
              const hop = t > 0 && t < 0.5 ? Math.sin((t / 0.5) * Math.PI) * 0.55 : 0;
              p.y = b.tp.y + hop;
              b.mesh.rotation.x = t > 0 && t < 0.5 ? -Math.sin((t / 0.5) * Math.PI) * 0.4 : 0;
            }
          }
        });
        if (win && win.t > 3) win = null;
      });

      // tocar bloques (distingue de arrastrar para girar)
      if (o) {
        const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
        let down = null;
        g.on(stageEl, 'pointerdown', (e) => { pressing = true; down = { x: e.clientX, y: e.clientY }; });
        const up = (e) => {
          pressing = false;
          if (!down) return;
          const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
          down = null;
          if (moved > 8 || e.type === 'pointercancel') return;
          const r = stageEl.getBoundingClientRect();
          ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
          ray.setFromCamera(ndc, o.cam);
          const hits = ray.intersectObjects(blocks.filter((b) => b.state !== 'gone').map((b) => b.mesh), false);
          if (hits.length) toggle(hits[0].object.userData.b);
        };
        g.on(stageEl, 'pointerup', up);
        g.on(stageEl, 'pointercancel', up);
      } else {
        flat.addEventListener('click', (e) => { const b = e.target.closest('.gm-bu-piece'); if (b) toggle(blocks.find((x) => x.id === +b.dataset.id)); });
      }
      hintB.onclick = showHint;
      undoB.onclick = undo;
      g.key((e) => {
        const n = parseInt(e.key, 10);
        if (n >= 1 && n <= 9) { const b = blocks.find((x) => x.id === n - 1); if (b) { e.preventDefault(); toggle(b); } return; }
        if (e.key === 'Backspace' || e.key === 'Delete') { e.preventDefault(); undo(); }
      });
      let ro = null;
      if (window.ResizeObserver) { ro = new ResizeObserver(() => { if (blocks.length) layout(); }); ro.observe(stageEl); }
      g.cleanups.push(() => {
        if (ro) ro.disconnect();
        if (o) {
          blocks.concat(gone).forEach((b) => { if (b.mesh) { o.root.remove(b.mesh); b.geo.dispose(); b.front.dispose(); b.tex.dispose(); } });
          o.root.remove(shelf);
          Object.values(M).forEach((m) => m.dispose());
          box1.dispose();
          o.dispose();
        }
      });
      if (TIME) g.clock(TIME, () => { locked = true; g.end({ built, errors, hints, secs: TIME, reason: '¡Se acabó el tiempo!', detail: { built, total: N, errors, hints, seconds: TIME } }); });
      else g.clock(0);
      info();
      if (!N) { msg.textContent = 'No hay oraciones para armar.'; g.pause(); return; }
      next();
    },
  });
}
