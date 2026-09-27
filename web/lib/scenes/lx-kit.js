// Utilidades compartidas por las escenas 3D de "Aprende" del grupo A de LenguApp
// (comm, newsdesk, morph, syllable, sentence, textarch, diorama, figure).
// Escenario oscuro, luz suave, cámara con vaivén, texto nítido con CanvasTexture y etiquetas HTML cortas.
import { THREE, three, reduce, esc } from '../kit.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

export { THREE, reduce, esc };

/* ---------- matemática ---------- */
export const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
export const lerp = (a, b, t) => a + (b - a) * t;
export const ease = t => { t = clamp(t, 0, 1); return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
export const easeOut = t => { t = clamp(t, 0, 1); return 1 - Math.pow(1 - t, 3); };
export const backOut = t => { t = clamp(t, 0, 1); const c = 1.9; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };
export const seg = (t, a, b) => clamp((t - a) / (b - a), 0, 1);
/** Acercamiento exponencial independiente del cuadro (k ~ velocidad). Con movimiento reducido salta. */
export const damp = (a, b, k, dt) => (reduce || dt < 0) ? b : a + (b - a) * (1 - Math.exp(-k * dt));
export const plain = s => String(s == null ? '' : s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

/* ---------- paleta ---------- */
export const PAL = {
  cream: '#F5EEDF', paper: '#FBF7EE', ink: '#17222C',
  coral: '#FF7B5C', gold: '#FFC24B', amber: '#F59E3D', rose: '#EE5D8C',
  teal: '#2EC4B6', blue: '#4C9BE8', violet: '#8F7CF0', green: '#62C370', leaf: '#3E9B57',
  slate: '#2A3A48', steel: '#8FA3B5', wood: '#A8744A',
};
const CAT = [
  [/sustant|nombre/, '#4C9BE8'], [/verbo|perífrasis|perifrasis/, '#FF7B5C'], [/adjet/, '#62C370'],
  [/art[ií]culo|determin/, '#8F7CF0'], [/preposi/, '#F59E3D'], [/adverb/, '#EE5D8C'], [/pronom/, '#2EC4B6'],
  [/conjun|nexo/, '#FFC24B'], [/interj/, '#C9A0FF'],
];
const EXTRA = ['#7FD4C1', '#F2A07B', '#B7C95A', '#9FB8F0', '#E88FB8'];
/** Color estable para una categoría gramatical (por nombre). */
export function catColor(name) {
  const p = plain(name);
  for (const [re, c] of CAT) if (re.test(p)) return c;
  let h = 0; for (let i = 0; i < p.length; i++) h = (h * 31 + p.charCodeAt(i)) >>> 0;
  return EXTRA[h % EXTRA.length];
}
export const FH = '"Bricolage Grotesque","IBM Plex Sans",system-ui,sans-serif';
export const FB = '"IBM Plex Sans",system-ui,sans-serif';
export const FM = '"IBM Plex Mono",ui-monospace,monospace';

/* ---------- texto en lienzo ---------- */
const PX = 240;               // píxeles de textura por unidad de escena
const TEXS = new Set();       // texturas vivas que se redibujan cuando cargan las fuentes
let fontHook = false;
function hookFonts() {
  if (fontHook || !document.fonts) return; fontHook = true;
  const redo = () => TEXS.forEach(t => { try { t.redraw(); } catch (e) { /* */ } });
  try {
    document.fonts.ready.then(redo);
    document.fonts.addEventListener && document.fonts.addEventListener('loadingdone', redo);
    ['800 40px "Bricolage Grotesque"', '600 40px "IBM Plex Sans"', '500 20px "IBM Plex Mono"'].forEach(f => document.fonts.load(f).catch(() => {}));
  } catch (e) { /* */ }
}
const _mc = document.createElement('canvas').getContext('2d');
/** Ancho de un texto en px para una fuente dada. */
export function measure(text, font) { _mc.font = font; return _mc.measureText(String(text)).width; }

function roundRect(x, X, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  x.beginPath(); x.moveTo(X + r, y); x.arcTo(X + w, y, X + w, y + h, r); x.arcTo(X + w, y + h, X, y + h, r);
  x.arcTo(X, y + h, X, y, r); x.arcTo(X, y, X + w, y, r); x.closePath();
}
export { roundRect };

/**
 * Textura de lienzo con función de dibujo propia. draw(ctx, W, H) dibuja en píxeles.
 * Devuelve la textura (con .redraw() y .canvas). Se redibuja cuando cargan las fuentes web.
 */
export function canvasTex(wU, hU, draw, px) {
  hookFonts();
  const k = px || PX;
  const c = document.createElement('canvas');
  const W = Math.min(2048, Math.max(16, Math.round(wU * k))), H = Math.min(1024, Math.max(16, Math.round(hU * k)));
  c.width = W; c.height = H;
  const x = c.getContext('2d');
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  t.minFilter = THREE.LinearMipmapLinearFilter; t.generateMipmaps = true;
  t.redraw = (d) => { if (d) draw = d; x.clearRect(0, 0, W, H); x.save(); draw(x, W, H); x.restore(); t.needsUpdate = true; };
  t.canvas = c;
  t.redraw();
  TEXS.add(t);
  const dsp = t.dispose.bind(t);
  t.dispose = () => { TEXS.delete(t); dsp(); };
  return t;
}
/** Escribe un texto centrado que cabe en maxW (reduce la letra si hace falta). */
export function fitText(x, text, cx, cy, maxW, size, weight, family, color) {
  let s = size; const f = () => weight + ' ' + s + 'px ' + family;
  x.font = f(); let w = x.measureText(text).width;
  if (w > maxW) { s = Math.max(8, Math.floor(s * maxW / w)); x.font = f(); }
  x.fillStyle = color; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillText(text, cx, cy + s * .04);
  return s;
}

/** Texto de varios colores centrado: parts = [{t, c}]. */
export function fitRich(x, parts, cx, cy, maxW, size, weight, family) {
  let s = size; const f = () => weight + ' ' + s + 'px ' + family;
  x.font = f(); let w = parts.reduce((a, p) => a + x.measureText(p.t).width, 0);
  if (w > maxW) { s = Math.max(8, Math.floor(s * maxW / w)); x.font = f(); w = parts.reduce((a, p) => a + x.measureText(p.t).width, 0); }
  x.textAlign = 'left'; x.textBaseline = 'middle';
  let X = cx - w / 2;
  parts.forEach(p => { x.fillStyle = p.c; x.fillText(p.t, X, cy + s * .04); if (p.u) { x.fillRect(X, cy + s * .5, x.measureText(p.t).width, Math.max(3, s * .08)); } X += x.measureText(p.t).width; });
  return s;
}

/* ---------- geometrías compartidas ---------- */
const GEOS = new Map();
function geoKey(k, mk) { let g = GEOS.get(k); if (!g) { g = mk(); g.userData.shared = true; GEOS.set(k, g); } return g; }
/** Caja redondeada compartida (cuantizada para reutilizar). */
export function rbox(w, h, d, r) {
  const q = v => Math.round(v * 20) / 20;
  w = q(w); h = q(h); d = q(d); r = Math.min(r == null ? .08 : r, w / 2 - .01, h / 2 - .01, d / 2 - .01);
  return geoKey('rb' + w + ',' + h + ',' + d + ',' + r, () => new RoundedBoxGeometry(w, h, d, 3, Math.max(.005, r)));
}
export const GEO = {
  get sph() { return geoKey('sph', () => new THREE.SphereGeometry(1, 32, 22)); },
  get sphLo() { return geoKey('sphlo', () => new THREE.SphereGeometry(1, 16, 12)); },
  get cyl() { return geoKey('cyl', () => new THREE.CylinderGeometry(1, 1, 1, 24)); },
  get cone() { return geoKey('cone', () => new THREE.ConeGeometry(1, 1, 24)); },
  get plane() { return geoKey('plane', () => new THREE.PlaneGeometry(1, 1)); },
  get box() { return geoKey('box', () => new THREE.BoxGeometry(1, 1, 1)); },
  get cap() { return geoKey('cap', () => new THREE.CapsuleGeometry(.5, 1, 8, 20)); },
  get torus() { return geoKey('torus', () => new THREE.TorusGeometry(1, .06, 10, 48)); },
};

/* ---------- materiales ---------- */
export function mat(color, o) {
  return new THREE.MeshPhysicalMaterial(Object.assign({ color: new THREE.Color(color), roughness: .5, metalness: 0, clearcoat: .35, clearcoatRoughness: .4, transparent: true, opacity: 1 }, o || {}));
}
export function basic(o) { return new THREE.MeshBasicMaterial(Object.assign({ transparent: true, depthWrite: false }, o || {})); }

/** Textura radial suave (sombras y brillos). */
export function glowTex(inner, outer) {
  return canvasTex(1, 1, (x, W, H) => {
    const g = x.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W / 2);
    g.addColorStop(0, inner || 'rgba(255,255,255,1)'); g.addColorStop(.4, inner ? inner.replace(/[\d.]+\)$/, m => (parseFloat(m) * .45) + ')') : 'rgba(255,255,255,.45)');
    g.addColorStop(1, outer || 'rgba(255,255,255,0)');
    x.fillStyle = g; x.fillRect(0, 0, W, H);
  }, 128);
}

/** Opacidad de todo un subárbol (cada malla con material propio). */
export function setAlpha(obj, a) {
  obj.traverse(m => {
    if (!m.material) return;
    (Array.isArray(m.material) ? m.material : [m.material]).forEach(mt => {
      if (mt.userData.baseOp == null) mt.userData.baseOp = mt.opacity;
      mt.opacity = mt.userData.baseOp * a; mt.transparent = true;
      if (!mt.userData.noDW) mt.depthWrite = a > .6 && mt.userData.baseOp > .9;
    });
  });
  obj.visible = a > .005;
}

/** Atenúa un subárbol oscureciendo sus colores (sin transparencia). d = 1 normal, 0 apagado. */
export function setDim(obj, d, floor) {
  const f = (floor == null ? .28 : floor) + (1 - (floor == null ? .28 : floor)) * d;
  obj.traverse(m => {
    if (!m.material) return;
    (Array.isArray(m.material) ? m.material : [m.material]).forEach(mt => {
      if (!mt.color) return;
      if (!mt.userData.baseCol) mt.userData.baseCol = mt.color.clone();
      mt.color.copy(mt.userData.baseCol).multiplyScalar(f);
    });
  });
}

/**
 * Bloque de palabra: caja redondeada de color + cara frontal con el texto (CanvasTexture).
 * opt: {color, fg, h, d, pad, minW, w, size(0..1 de h), sub (texto pequeño arriba), weight, family, font}
 * Devuelve {g, body, face, w, h, d, setColor(c), setText(t, sub), text}
 */
export function wordBlock(text, opt) {
  opt = Object.assign({ color: PAL.cream, fg: PAL.ink, h: .8, d: .5, pad: .26, minW: .6, size: .46, weight: 800, family: FH }, opt || {});
  const h = opt.h, d = opt.d;
  const font = s => opt.weight + ' ' + s + 'px ' + opt.family;
  const fpx = Math.round(h * PX * opt.size * (opt.sub ? .86 : 1));
  let tw = measure(text, font(fpx)) / PX;
  if (opt.sub) tw = Math.max(tw, measure(String(opt.sub).toUpperCase(), '600 ' + Math.round(h * PX * .21) + 'px ' + FM) / PX * 1.1);
  const w = opt.w || Math.max(opt.minW, tw + opt.pad * 2);
  const g = new THREE.Group();
  const bm = mat(opt.color, { roughness: .42, clearcoat: .55, clearcoatRoughness: .3 });
  const body = new THREE.Mesh(rbox(w, h, d, Math.min(.12, h * .16)), bm);
  g.add(body);
  let cur = { text, sub: opt.sub, fg: opt.fg, parts: opt.parts };
  const draw = (x, W, H) => {
    const s = cur.sub;
    if (s) {
      x.globalAlpha = .7;
      fitText(x, String(s).toUpperCase(), W / 2, H * .25, W - 16, Math.round(H * .21), 600, FM, cur.fg);
      x.globalAlpha = 1;
      fitText(x, String(cur.text), W / 2, H * .62, W - 12, Math.round(H * opt.size * .86), opt.weight, opt.family, cur.fg);
    } else if (cur.parts) fitRich(x, cur.parts, W / 2, H / 2, W - 10, Math.round(H * opt.size), opt.weight, opt.family);
    else fitText(x, String(cur.text), W / 2, H / 2, W - 10, Math.round(H * opt.size), opt.weight, opt.family, cur.fg);
  };
  const tex = canvasTex(w - .04, h - .04, draw);
  const fm = basic({ map: tex, depthWrite: false });
  fm.userData.noDW = true;
  const face = new THREE.Mesh(GEO.plane, fm);
  face.scale.set(w - .04, h - .04, 1); face.position.z = Math.round(d * 20) / 40 + .004; face.renderOrder = 2;
  g.add(face);
  const B = { g, body, face, w, h, d, tex, text };
  B.setColor = c => { bm.color.set(c); bm.userData.baseCol = null; };
  B.setText = (t, sub, fg) => { cur = { text: t, sub: sub === undefined ? cur.sub : sub, fg: fg || cur.fg }; B.text = t; tex.redraw(); };
  B.mat = bm;
  return B;
}

/** Sprite con texto en una píldora (siempre mira a la cámara). opt: {h, bg, fg, border, weight, family, pad} */
export function textSprite(text, opt) {
  opt = Object.assign({ h: .5, bg: 'rgba(14,22,30,.86)', fg: '#F4F7FA', border: null, weight: 700, family: FH, pad: .28, size: .52, r: .5 }, opt || {});
  const fpx = Math.round(opt.h * PX * opt.size);
  const tw = measure(text, opt.weight + ' ' + fpx + 'px ' + opt.family) / PX;
  const w = Math.max(opt.h, tw + opt.pad * 2);
  let cur = String(text);
  const tex = canvasTex(w, opt.h, (x, W, H) => {
    if (opt.bg) {
      roundRect(x, 3, 3, W - 6, H - 6, (H - 6) * opt.r);
      x.fillStyle = opt.bg; x.fill();
      if (opt.border) { x.lineWidth = Math.max(3, H * .05); x.strokeStyle = opt.border; x.stroke(); }
    }
    if (opt.shadow) { x.shadowColor = 'rgba(0,0,0,.65)'; x.shadowBlur = H * .12; }
    fitText(x, cur, W / 2, H / 2, W - H * .3, Math.round(H * opt.size), opt.weight, opt.family, opt.fg);
  });
  const m = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
  const s = new THREE.Sprite(m);
  s.scale.set(w, opt.h, 1);
  s.userData.w = w; s.userData.h = opt.h;
  s.setText = t => { cur = String(t); tex.redraw(); };
  return s;
}

/* ---------- mundo ---------- */
/**
 * Crea el stage 3D. opt: {hint:true, sway:.28, pitch:.28, yaw:0}
 * Devuelve W con: st, o (null sin WebGL), fb(texto), cap(texto), note(html), lab(obj, html, cls, color), frame(fn),
 * view({yaw,pitch,dist,tx,ty,tz,sway}), fit(w,h,margin), drop(obj), dispose().
 */
export function world(el, opt) {
  opt = Object.assign({ hint: true, sway: .28, pitch: .22, yaw: 0 }, opt || {});
  const st = document.createElement('div');
  st.className = 'stage sc-stage sc-lx';
  el.appendChild(st);
  let hint = null, hintT = 0;
  if (opt.hint) {
    hint = document.createElement('span'); hint.className = 'hint sc-lx-hint'; hint.textContent = 'Arrastra para girar';
    st.appendChild(hint); hintT = setTimeout(() => hint.classList.add('sc-lx-off'), 6000);
  }
  const W = { st, o: null, labs: [] };
  let noteEl = null, capEl = null;
  W.note = html => {
    if (!noteEl) { noteEl = document.createElement('div'); noteEl.className = 'sc-note sc-lx-note'; el.appendChild(noteEl); }
    noteEl.innerHTML = html || ''; noteEl.hidden = !html;
  };
  W.cap = (html, cls) => {
    if (!capEl) { capEl = document.createElement('div'); capEl.className = 'sc-lx-cap'; st.appendChild(capEl); }
    capEl.innerHTML = html || ''; capEl.hidden = !html; capEl.className = 'sc-lx-cap' + (cls ? ' ' + cls : '');
  };
  const o = three(st, () => { if (hint) hint.classList.add('sc-lx-off'); });
  W.o = o;
  if (!o) {
    if (hint) hint.remove(); clearTimeout(hintT);
    const ng = st.querySelector('.nogl');
    W.fb = t => { if (ng) ng.textContent = t; };
    W.dispose = () => { st.remove(); if (noteEl) noteEl.remove(); };
    W.frame = () => {}; W.view = () => {}; W.lab = () => null; W.fit = () => 10;
    return W;
  }
  W.fb = () => {};
  const R = o.R;
  R.outputColorSpace = THREE.SRGBColorSpace;
  R.toneMapping = THREE.NeutralToneMapping;
  R.toneMappingExposure = 1.05;
  o.cam.fov = 32; o.cam.near = .05; o.cam.updateProjectionMatrix();
  // luces: el kit trae ambiente + 2 direccionales tenues; se suman hemisférica, clave cálida y contraluz fría
  const hemi = new THREE.HemisphereLight(0xEAF2FF, 0x1E2A34, 1.25);
  const key = new THREE.DirectionalLight(0xFFF1DE, 2.0); key.position.set(4, 8, 7);
  const rim = new THREE.DirectionalLight(0x8FB8FF, 1.2); rim.position.set(-6, 4, -6);
  const fill = new THREE.DirectionalLight(0xFFD9B8, .35); fill.position.set(-5, -2, 6);
  o.scene.add(hemi, key, rim, fill);
  W.lights = { hemi, key, rim, fill };
  let pm = null, env = null;
  try {
    pm = new THREE.PMREMGenerator(R); const room = new RoomEnvironment();
    env = pm.fromScene(room, .04).texture; o.scene.environment = env; o.scene.environmentIntensity = .5;
    if (room.dispose) room.dispose();
  } catch (e) { /* sin entorno */ }

  /* cámara: pitch/yaw de la raíz + distancia + objetivo; vaivén suave si nadie la ha tocado */
  const V = { yaw: opt.yaw, pitch: opt.pitch, dist: 10, tx: 0, ty: 0, tz: 0, sway: opt.sway, k: 2.4 };
  const C = Object.assign({}, V);
  o.rot.x = V.pitch; o.rot.y = V.yaw;
  let zoomMul = 1, lastZ = o.zoom = 10, first = true;
  W.view = v => {
    Object.assign(V, v || {});
    o.auto = true;
    if (first) { Object.assign(C, V); o.rot.x = V.pitch; o.rot.y = V.yaw; }
  };
  W.cur = C;
  /** Distancia de cámara para que una caja w×h (unidades) quepa en el stage. */
  W.fit = (w, h, m) => {
    const aspect = Math.max(.45, (st.clientWidth || 600) / (st.clientHeight || 340));
    const t = Math.tan(THREE.MathUtils.degToRad(o.cam.fov / 2)) * 2;
    m = m || 1.1;
    return Math.max(h * m / t, w * m / (t * aspect));
  };
  W.aspect = () => Math.max(.45, (st.clientWidth || 600) / (st.clientHeight || 340));
  W.narrow = () => (st.clientWidth || 600) < 560;

  /* etiquetas HTML con fundido */
  W.lab = (obj, html, cls, color) => {
    o.label(obj, '');
    const L = o.labels[o.labels.length - 1];
    L.d.className = 'lab sc-lx-l' + (cls ? ' ' + cls : '');
    L.d.innerHTML = html;
    if (color) L.d.style.setProperty('--c', color);
    L.a = 0; L.to = 1; L.d.style.opacity = '0';
    L.set = h => { if (L.html !== h) { L.html = h; L.d.innerHTML = h; } };
    L.html = html;
    W.labs.push(L);
    return L;
  };
  W.unlab = L => {
    if (!L) return;
    const i = o.labels.indexOf(L); if (i >= 0) o.labels.splice(i, 1);
    const j = W.labs.indexOf(L); if (j >= 0) W.labs.splice(j, 1);
    L.d.remove();
  };
  /** Quita un objeto y libera materiales, texturas y geometrías no compartidas; también sus etiquetas. */
  W.drop = obj => {
    if (!obj) return;
    const set = new Set(); obj.traverse(x => set.add(x));
    W.labs.slice().forEach(L => { if (set.has(L.obj)) W.unlab(L); });
    obj.traverse(x => {
      if (x.geometry && !x.geometry.userData.shared) x.geometry.dispose();
      if (x.material) (Array.isArray(x.material) ? x.material : [x.material]).forEach(m => { if (m.map) m.map.dispose(); if (m.emissiveMap) m.emissiveMap.dispose(); m.dispose(); });
    });
    obj.traverse(x => { if (x.isInstancedMesh) x.dispose(); });
    if (obj.parent) obj.parent.remove(obj);
  };

  /* bucle propio: envuelve render para correr también con movimiento reducido */
  const fns = [];
  W.frame = fn => fns.push(fn);
  let last = performance.now(), T = 0;
  W.time = () => T;
  const render0 = R.render.bind(R);
  R.render = (scene, cam) => {
    const now = performance.now(); const dt = Math.min(.05, (now - last) / 1000); last = now;
    if (!reduce) T += dt;
    const snap = first || reduce;
    const kk = snap ? -1 : dt;
    ['dist', 'tx', 'ty', 'tz'].forEach(p => { C[p] = damp(C[p], V[p], V.k, kk); });
    C.yaw = damp(C.yaw, V.yaw, V.k, kk); C.pitch = damp(C.pitch, V.pitch, V.k, kk); C.sway = damp(C.sway, V.sway, 1.5, kk);
    if (o.auto) {
      o.rot.y = C.yaw + (reduce ? 0 : Math.sin(T * .32) * C.sway);
      o.rot.x = C.pitch + (reduce ? 0 : Math.sin(T * .23) * C.sway * .12);
    }
    if (o.zoom !== lastZ) { zoomMul = clamp(zoomMul * o.zoom / lastZ, .45, 2.2); }
    o.zoom = lastZ = 10;
    o.root.rotation.set(o.rot.x, o.rot.y, 0);
    o.root.updateMatrixWorld();
    for (const f of fns) f(snap ? 0 : dt, T, snap);
    first = false;
    const D = C.dist * zoomMul;
    if (!W.camHook || !W.camHook(o.cam, C, D)) {
      o.cam.position.set(C.tx, C.ty, C.tz + D); o.cam.lookAt(C.tx, C.ty, C.tz);
    }
    o.cam.updateMatrixWorld();
    W.labs.forEach(L => {
      L.a = damp(L.a, L.to, 6, snap ? -1 : dt);
      const a = L.a < .02 ? 0 : L.a;
      L.d.style.opacity = a.toFixed(3); L.d.style.visibility = a ? '' : 'hidden';
    });
    render0(scene, cam);
  };
  o.tick = null;

  W.dispose = () => {
    clearTimeout(hintT);
    // se libera aquí todo lo de la raíz (admite materiales múltiples); o.clear() queda sin nada que recorrer
    o.root.traverse(x => {
      if (x.geometry) x.geometry.dispose();
      if (x.material) (Array.isArray(x.material) ? x.material : [x.material]).forEach(m => { if (m.map) m.map.dispose(); if (m.emissiveMap) m.emissiveMap.dispose(); m.dispose(); });
      if (x.isInstancedMesh) x.dispose();
    });
    while (o.root.children.length) o.root.remove(o.root.children[0]);
    o.dispose();
    if (env) env.dispose(); if (pm) pm.dispose();
    o.scene.remove(hemi, key, rim, fill);
    W.labs = [];
    st.remove(); if (noteEl) noteEl.remove();
  };
  return W;
}

/** Sombra suave redonda sobre el piso. */
export function softShadow(w, d, a) {
  const t = glowTex('rgba(0,0,0,' + (a || .55) + ')', 'rgba(0,0,0,0)');
  const m = new THREE.Mesh(GEO.plane, basic({ map: t, depthWrite: false }));
  m.userData.noDW = true;
  m.rotation.x = -Math.PI / 2; m.scale.set(w, d, 1);
  return m;
}
