// Escena "newsdesk": mesa de redacción. Los bloques de la noticia caen y se apilan; en pirámide invertida se ordenan por importancia.
import { THREE, reduce, esc, world, canvasTex, fitText, measure, rbox, mat, basic, GEO, PAL, damp, setAlpha, setDim, softShadow, clamp, FH, FM } from './lx-kit.js';

const KINDS = {
  titular: ['Titular', '#FF7B5C', 0], entrada: ['Entrada', '#FFC24B', 1], foto: ['Foto', '#4C9BE8', 2], dato: ['Dato', '#2EC4B6', 3],
  cuerpo: ['Cuerpo', '#F5EEDF', 4], opinion: ['Opinión', '#EE5D8C', 5], fuente: ['Fuente', '#A9B8C6', 6],
};
const BH = .6, BD = 1.0, PX = 240, TSIZE = .34;
const ASKS = { 'que': '¿Qué?', 'quien': '¿Quién?', 'cuando': '¿Cuándo?', 'donde': '¿Dónde?', 'por que': '¿Por qué?', 'como': '¿Cómo?' };
const pl = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[¿?]/g, '').trim();

export default function (el) {
  const W = world(el, { pitch: .24, sway: .2 });
  const o = W.o;
  if (!o) return { set(s) { W.fb(describe(s)); }, dispose() { W.dispose(); } };
  const root = o.root;

  /* ---------- mesa ---------- */
  const desk = new THREE.Group(); root.add(desk);
  const woodM = mat('#8A5A3B', { roughness: .7, clearcoat: .25 });
  const top = new THREE.Mesh(rbox(7.2, .22, 2.8, .08), woodM); top.position.y = -.11; desk.add(top);
  const legM = mat('#5E3D29', { roughness: .8 });
  [[-3.3, -1.1], [3.3, -1.1], [-3.3, 1.1], [3.3, 1.1]].forEach(([x, z]) => { const l = new THREE.Mesh(GEO.cyl, legM); l.scale.set(.1, 1.3, .1); l.position.set(x, -.87, z); desk.add(l); });
  const mug = new THREE.Mesh(new THREE.CylinderGeometry(.22, .19, .42, 24), mat('#2EC4B6', { roughness: .35, clearcoat: .8 })); mug.position.set(-3.0, .21, -.75); desk.add(mug);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(.12, .035, 8, 20), mug.material); handle.position.set(-2.76, .22, -.75); desk.add(handle);
  const pencil = new THREE.Mesh(GEO.cyl, mat('#FFC24B', { roughness: .5 })); pencil.scale.set(.04, 1.1, .04); pencil.rotation.set(Math.PI / 2, 0, -.5); pencil.position.set(2.7, .05, .85); desk.add(pencil);
  const sh = softShadow(8.5, 3.6, .55); sh.position.y = -2.2; root.add(sh);

  /* ---------- guía de importancia: flecha vertical ---------- */
  const arrow = new THREE.Group(); root.add(arrow);
  const shaftM = mat('#FFC24B', { emissive: new THREE.Color('#FFC24B'), emissiveIntensity: .4 });
  const shaft = new THREE.Mesh(GEO.cyl, shaftM); arrow.add(shaft);
  const head = new THREE.Mesh(GEO.cone, shaftM); head.rotation.z = Math.PI; arrow.add(head);
  const aTop = new THREE.Object3D(), aBot = new THREE.Object3D(); arrow.add(aTop, aBot);
  const lTop = W.lab(aTop, 'Más importante', 'sc-lx-mini', '#FFC24B'), lBot = W.lab(aBot, 'Menos importante', 'sc-lx-mini', '#9FB3C4');
  lTop.to = lBot.to = 0;
  let arA = 0, arTA = 0; const ar0 = { x: 3, top: 3, bot: 0 }, ar1 = { x: 3, top: 3, bot: 0 };

  let blocks = [];   // {key,k,t, g, body, face, bw, tw, w, x,y,z, tx,ty,tz, vy, falling, delay, a, ta, dim,tdim, glow}
  let chips = [];    // {q, s(sprite), line, x,y, tx,ty, a, ta, delay}

  function mkBlock(b) {
    const K = KINDS[b.k] || KINDS.cuerpo;
    const g = new THREE.Group(); root.add(g);
    const fpx = Math.round(BH * PX * TSIZE);
    const icon = b.k === 'foto' ? .5 : 0;
    const tw = Math.max(measure(b.t, '700 ' + fpx + 'px ' + FH), measure(K[0].toUpperCase(), '600 ' + Math.round(BH * PX * .17) + 'px ' + FM)) / PX + icon + .5;
    const bw = Math.max(tw, 3);
    const body = new THREE.Mesh(rbox(bw, BH - .03, BD, .07), mat(K[1], { roughness: .45, clearcoat: .5, emissive: new THREE.Color(K[1]), emissiveIntensity: 0 }));
    g.add(body);
    const dark = K[1] !== '#4C9BE8';
    const fg = dark ? '#17222C' : '#FFFFFF';
    const tex = canvasTex(tw, BH - .06, (x, Wd, Hd) => {
      const ix = icon * PX;
      if (icon) { // miniatura de foto
        const s = Hd * .62, x0 = 8, y0 = (Hd - s) / 2;
        x.fillStyle = 'rgba(255,255,255,.9)'; x.fillRect(x0, y0, s * 1.2, s);
        x.fillStyle = '#2E6FB3'; x.beginPath(); x.moveTo(x0 + 4, y0 + s - 4); x.lineTo(x0 + s * .45, y0 + s * .4); x.lineTo(x0 + s * .8, y0 + s - 4); x.fill();
        x.fillStyle = '#FFC24B'; x.beginPath(); x.arc(x0 + s * .9, y0 + s * .3, s * .12, 0, 7); x.fill();
      }
      x.globalAlpha = .62; fitText(x, K[0].toUpperCase(), ix + (Wd - ix) / 2, Hd * .25, Wd - ix - 10, Math.round(Hd * .19), 600, FM, fg); x.globalAlpha = 1;
      fitText(x, b.t, ix + (Wd - ix) / 2, Hd * .63, Wd - ix - 10, Math.round(Hd * TSIZE * 1.12), 700, FH, fg);
    });
    const face = new THREE.Mesh(GEO.plane, basic({ map: tex })); face.userData.noDW = true;
    face.material.userData.noDW = true;
    face.scale.set(tw, BH - .06, 1); face.position.z = BD / 2 + .005; face.renderOrder = 2; g.add(face);
    setAlpha(g, 0);
    return { key: b.k + '|' + b.t, k: b.k, t: b.t, rank: K[2], color: K[1], g, body, face, bw, tw, w: bw, tW: bw, x: 0, y: 6, z: 0, tx: 0, ty: 0, tz: 0, vy: 0, falling: true, delay: 0, a: 0, ta: 1, dim: 1, tdim: 1, glow: 0, tglow: 0, ry: 0, tRy: 0 };
  }

  function set(state, prev) {
    const s = normalize(state);
    W.fb(describe(state));
    const first = !prev;
    const keys = s.blocks.map(b => b.k + '|' + b.t);
    blocks.forEach(B => { if (keys.indexOf(B.key) < 0) B.ta = 0; });
    let nNew = 0;
    s.blocks.forEach(b => {
      let B = blocks.find(x => x.key === b.k + '|' + b.t && x.ta);
      if (!B) { B = mkBlock(b); blocks.push(B); B.delay = reduce ? 0 : .2 + nNew * .32; nNew++; }
    });
    const live = keys.map(k => blocks.find(B => B.key === k && B.ta));
    // orden y anchos
    let order = live.slice();
    if (s.pyramid) {
      order.sort((a, b) => a.rank - b.rank || live.indexOf(a) - live.indexOf(b));
      // de abajo (menos importante) hacia arriba: cada uno más ancho que el de abajo
      let w = 0;
      for (let i = order.length - 1; i >= 0; i--) { const B = order[i]; w = Math.max(B.tw + .1, i === order.length - 1 ? 1.8 : w + .55); B.tW = w; }
    } else {
      order.reverse(); // el primero cae primero y queda abajo
      order.forEach(B => { B.tW = B.bw; });
    }
    // de arriba hacia abajo en 'order'; posiciones
    const n = order.length;
    order.forEach((B, i) => {
      const lvl = n - 1 - i;
      B.ty = lvl * BH + BH / 2;
      const jit = s.pyramid ? 0 : ((lvl * 37) % 7 - 3) * .07;
      B.tx = jit; B.tRy = s.pyramid ? 0 : ((lvl * 53) % 5 - 2) * .035; B.tz = 0;
      B.tdim = s.focus && s.focus !== B.k ? .3 : 1;
      B.tglow = s.focus === B.k ? .35 : 0;
      if (s.focus === B.k) B.tz = .35;
      if (B.falling && (first || reduce) && !B.started) { B.y = B.ty; B.falling = false; B.x = B.tx; }
      if (B.falling && !B.started) { B.x = B.tx; B.y = B.ty + 4.5 + i * .2; B.started = true; }
    });
    const maxW = order.reduce((m, B) => Math.max(m, B.tW), 3);
    const stackH = n * BH;
    // pirámide
    arTA = s.pyramid && n > 1 && !(s.ask && s.ask.length) ? 1 : 0;
    ar1.x = maxW / 2 + .45; ar1.top = stackH - BH * .3; ar1.bot = BH * .3;
    lTop.to = lBot.to = arTA;
    // preguntas
    const entrada = order.find(B => B.k === 'entrada');
    const qs = s.ask && entrada ? s.ask : [];
    chips.forEach(c => { if (qs.indexOf(c.q) < 0) c.ta = 0; });
    qs.forEach((q, i) => {
      let c = chips.find(x => x.q === q && x.ta);
      if (!c) {
        const txt = ASKS[pl(q)] || ('¿' + q.charAt(0).toUpperCase() + q.slice(1) + '?');
        const tw = measure(txt, '800 ' + Math.round(.42 * PX * .5) + 'px ' + FH) / PX + .34;
        const tex = canvasTex(tw, .42, (x, Wd, Hd) => {
          x.fillStyle = '#FFF4D6'; x.strokeStyle = '#FFC24B'; x.lineWidth = 6;
          const r = Hd * .3; x.beginPath(); x.roundRect ? x.roundRect(4, 4, Wd - 8, Hd - 8, r) : x.rect(4, 4, Wd - 8, Hd - 8); x.fill(); x.stroke();
          fitText(x, txt, Wd / 2, Hd / 2, Wd - 16, Math.round(Hd * .5), 800, FH, '#5A3A00');
        });
        const sp = new THREE.Mesh(GEO.plane, basic({ map: tex, side: THREE.DoubleSide })); sp.scale.set(tw, .42, 1); sp.renderOrder = 3;
        const lg = new THREE.BufferGeometry(); lg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
        const line = new THREE.Line(lg, new THREE.LineBasicMaterial({ color: '#FFC24B', transparent: true, opacity: 0 }));
        root.add(sp, line);
        c = { q, sp, line, w: tw, x: 0, y: 7, z: .4, a: 0, ta: 1, delay: reduce ? 0 : .15 + i * .18 };
        chips.push(c);
      }
      c.i = i; c.ta = 1;
    });
    const side = (maxW / 2) + .35;
    chips.forEach(c => {
      if (!c.ta) return;
      const L = c.i % 2 === 0, j = Math.floor(c.i / 2);
      c.tx = (L ? -1 : 1) * (side + c.w / 2); c.ty = (entrada ? entrada.ty : 0) + .55 - j * .5; c.tz = .5;
      c.ex = (L ? -1 : 1) * (entrada ? entrada.tW / 2 : 0); c.ey = entrada ? entrada.ty : 0;
      if (c.y === 7) { c.x = c.tx * 1.6; c.y = c.ty + 3; }
    });
    const cw = chips.reduce((m, c) => c.ta ? Math.max(m, c.w) : m, 0);
    const nar = W.narrow();
    lTop.set(nar ? 'Más' : 'Más importante'); lBot.set(nar ? 'Menos' : 'Menos importante');
    const bw = maxW + (qs.length ? 2 * (cw + .35) + .5 : arTA ? (nar ? 2.6 : 4.2) : .8);
    W.view({ dist: W.fit(Math.max(bw, 5.4), stackH + 1.3, 1.04), ty: stackH / 2 - .15, tx: arTA && nar ? .45 : 0, pitch: .22, sway: nar ? .05 : clamp(1.1 / bw, .06, .18) });
  }

  W.frame((dt, T, snap) => {
    const k = snap ? -1 : dt;
    for (let i = blocks.length - 1; i >= 0; i--) {
      const B = blocks[i];
      if (B.delay > 0 && !snap) { B.delay -= dt; continue; }
      B.a = damp(B.a, B.ta, 5, k);
      if (!B.ta) { B.y += dt * 2.5; B.z += dt; if (B.a < .02) { W.drop(B.g); blocks.splice(i, 1); continue; } }
      else if (B.falling && !snap) {
        B.vy -= 22 * dt; B.y += B.vy * dt;
        if (B.y <= B.ty) { B.y = B.ty; B.vy = -B.vy * .28; if (Math.abs(B.vy) < .8) { B.falling = false; B.vy = 0; } }
      } else {
        if (snap) B.falling = false;
        const d = Math.abs(B.tx - B.x) + Math.abs(B.ty - B.y);
        B.x = damp(B.x, B.tx, 4, k); B.y = damp(B.y, B.ty, 4, k);
        B.z = damp(B.z, B.tz + clamp(d * .35, 0, 1.1) * (i % 2 ? 1 : -.6), 4, k);
      }
      B.w = damp(B.w, B.tW, 4, k); B.ry = damp(B.ry, B.tRy, 4, k);
      B.dim = damp(B.dim, B.tdim, 4, k); B.glow = damp(B.glow, B.tglow, 4, k);
      B.g.position.set(B.x, B.y, B.z); B.g.rotation.y = B.ry;
      B.body.scale.x = B.w / B.bw;
      setAlpha(B.g, B.a); setDim(B.g, B.dim);
      B.body.material.emissiveIntensity = B.glow * (reduce ? 1 : .7 + .3 * Math.sin(T * 3));
    }
    // pirámide
    arA = damp(arA, arTA, 3, k);
    ['x', 'top', 'bot'].forEach(p => { ar0[p] = damp(ar0[p], ar1[p], 4, k); });
    const len = Math.max(.2, ar0.top - ar0.bot) * arA;
    arrow.position.set(ar0.x, 0, 0); arrow.visible = arA > .01;
    shaft.scale.set(.035, Math.max(.01, len - .25), .035); shaft.position.y = ar0.top - (len - .25) / 2;
    head.scale.set(.13, .28, .13); head.position.y = ar0.top - len + .12;
    aTop.position.set(.12, ar0.top + .02, 0); aBot.position.set(.12, ar0.top - len + .05, 0);
    lTop.d.style.transform = lBot.d.style.transform = 'translate(0,-50%)';
    setAlpha(arrow, arA);
    // fichas de preguntas
    for (let i = chips.length - 1; i >= 0; i--) {
      const c = chips[i];
      if (c.delay > 0 && !snap) { c.delay -= dt; continue; }
      c.a = damp(c.a, c.ta, 5, k);
      c.x = damp(c.x, c.tx, 5, k); c.y = damp(c.y, c.ty, 5, k); c.z = damp(c.z, c.tz, 5, k);
      const bob = reduce ? 0 : Math.sin(T * 2 + c.i) * .03;
      c.sp.position.set(c.x, c.y + bob, c.z);
      c.sp.rotation.z = reduce ? 0 : Math.sin(T * 1.3 + c.i) * .04;
      c.sp.material.opacity = c.a; c.sp.visible = c.a > .01;
      const L = c.line.geometry.attributes.position.array;
      L.set([c.x + (c.tx < 0 ? c.w / 2 : -c.w / 2), c.y + bob, c.z, c.ex || 0, c.ey || 0, BD / 2]);
      c.line.geometry.attributes.position.needsUpdate = true; c.line.material.opacity = c.a * .7; c.line.visible = c.a > .01;
      if (!c.ta && c.a < .02) { W.drop(c.sp); W.drop(c.line); chips.splice(i, 1); }
    }
  });

  return {
    set(state, prev) { set(state || {}, prev); },
    dispose() { W.dispose(); },
  };
}

function normalize(s) {
  s = s || {};
  const blocks = (Array.isArray(s.blocks) ? s.blocks : []).map(b => ({ k: pl(b.k).replace(/\s+/g, '') || 'cuerpo', t: String(b.t || '') })).filter(b => KINDS[b.k]).slice(0, 8);
  const ask = Array.isArray(s.ask) ? s.ask.map(String).slice(0, 6) : null;
  return { blocks, pyramid: !!s.pyramid, focus: s.focus ? pl(s.focus) : null, ask };
}
function describe(s) {
  s = normalize(s);
  return 'Noticia' + (s.pyramid ? ' en pirámide invertida' : '') + ': ' + s.blocks.map(b => KINDS[b.k][0] + ' «' + b.t + '»').join('; ') + '.';
}
