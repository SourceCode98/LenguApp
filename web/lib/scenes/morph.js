// Escena "morph": la palabra por dentro. Raíz al centro; los afijos orbitan y se acoplan; la familia brota alrededor.
import { THREE, reduce, esc, world, wordBlock, mat, basic, GEO, PAL, damp, setAlpha, softShadow, glowTex, clamp, seg, ease, backOut, plain } from './lx-kit.js';

const ROOT_C = '#FFC24B', PRE_C = '#FF7B5C', SUF_C = '#2EC4B6', FAM_C = '#F5EEDF';
const H = 1, D = .7, BH = .78;
const UP = new THREE.Vector3(0, 1, 0);

/** Partes de color para una palabra de la familia: la raíz resaltada. */
function famParts(word, root) {
  const pw = plain(word), pr = plain(root);
  let i = pw.indexOf(pr);
  // raíces que cambian la última vocal (mar → marino): busca sin la última letra
  let len = root.length;
  if (i < 0 && pr.length > 3) { i = pw.indexOf(pr.slice(0, -1)); len = root.length - 1; }
  if (i < 0) return [{ t: word, c: '#17222C' }];
  const out = [];
  if (i > 0) out.push({ t: word.slice(0, i), c: '#9A4A36' });
  out.push({ t: word.slice(i, i + len), c: '#B7780A', u: true });
  if (i + len < word.length) out.push({ t: word.slice(i + len), c: '#1B6F68' });
  return out;
}

export default function (el) {
  const W = world(el, { pitch: .18, sway: .22 });
  const o = W.o;
  if (!o) return { set(s) { W.fb(describe(s)); }, dispose() { W.dispose(); } };
  const root = o.root;
  const shadow = softShadow(6, 2.4, .5); shadow.position.y = -1.3; root.add(shadow);
  const haloT = glowTex('rgba(255,200,90,.85)', 'rgba(255,170,40,0)');
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloT, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: .5 }));
  halo.position.z = -.6; root.add(halo);
  // órbita visible
  const ringMat = basic({ color: '#9FB8D0', opacity: 0 });
  const ORB = new THREE.Euler(-.35, 0, .15);
  const ringG = new THREE.Group(); ringG.rotation.copy(ORB); root.add(ringG);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1, .012, 6, 96), ringMat);
  ring.rotation.x = Math.PI / 2; ring.scale.setScalar(2.6); ringG.add(ring);

  let R = null;              // {B, key, x, a, ta, s}
  const dying = [];          // bloques que se van
  let affs = [];             // {B, kind, i, a, ta, x,y,z, dx, ph}
  let fam = [];              // {B, br, i, a, ta, s, x,y,z, tx,ty,tz}
  let S = null, tSet = 0, orbit = false, word = null;

  function mkBlock(t, color, h, opt) { const B = wordBlock(t, Object.assign({ color, h, d: D, size: .5 }, opt || {})); root.add(B.g); setAlpha(B.g, 0); return B; }
  const fade = it => { it.ta = 0; dying.push(it); };

  function set(state, prev) {
    const s = normalize(state);
    const p = prev ? normalize(prev) : null;
    W.fb(describe(state));
    // raíz
    if (!R || R.key !== s.root) {
      if (R) fade(R);
      const B = mkBlock(s.root, ROOT_C, H, { size: .52 });
      R = { B, key: s.root, x: 0, tx: 0, y: 0, a: 0, ta: 1, s: .3 };
      R.an = new THREE.Object3D(); R.an.position.set(0, -H / 2 - .32, 0); B.g.add(R.an);
      R.lab = W.lab(R.an, 'Raíz', 'sc-lx-mini', ROOT_C);
      affs.forEach(fade); affs = [];
      fam.forEach(fade); fam = [];
    }
    // afijos
    const want = s.prefix.map((t, i) => ['p', i, t]).concat(s.suffix.map((t, i) => ['s', i, t]));
    const keyOf = w => w[0] + w[1] + w[2];
    affs.forEach(a => { if (!want.find(w => keyOf(w) === a.key)) fade(a); });
    affs = affs.filter(a => want.find(w => keyOf(w) === a.key));
    want.forEach(w => {
      if (affs.find(a => a.key === keyOf(w))) return;
      const B = mkBlock(w[2], w[0] === 'p' ? PRE_C : SUF_C, BH);
      const an = new THREE.Object3D(); an.position.set(0, -BH / 2 - .3, 0); B.g.add(an);
      const lab = W.lab(an, w[0] === 'p' ? 'Prefijo' : 'Sufijo', 'sc-lx-mini', w[0] === 'p' ? PRE_C : SUF_C);
      affs.push({ B, key: keyOf(w), kind: w[0], i: w[1], a: 0, ta: 0, x: 0, y: 0, z: 0, ph: affs.length * 2.1 + (w[0] === 'p' ? 0 : Math.PI), lab });
    });
    const build = s.show === 'build';
    affs.forEach(a => { a.ta = build ? 1 : 0; a.lab.to = build ? 1 : 0; });
    // posiciones acopladas
    const pre = affs.filter(a => a.kind === 'p').sort((a, b) => a.i - b.i), suf = affs.filter(a => a.kind === 's').sort((a, b) => a.i - b.i);
    const G = .05;
    const total = pre.reduce((t, a) => t + a.B.w + G, 0) + R.B.w + suf.reduce((t, a) => t + a.B.w + G, 0);
    let x = -total / 2;
    pre.forEach(a => { a.dx = x + a.B.w / 2; x += a.B.w + G; });
    const rootDock = x + R.B.w / 2; x += R.B.w + G;
    suf.forEach(a => { a.dx = x + a.B.w / 2; x += a.B.w + G; });
    R.tx = build ? rootDock : 0;
    orbit = build && (!p || p.show !== 'build' || p.root !== s.root || want.length !== (p.prefix.length + p.suffix.length)) && !reduce;
    tSet = 0;
    // palabra formada
    const full = s.prefix.join('') + s.root + s.suffix.join('');
    if (!word) { word = new THREE.Object3D(); root.add(word); word.lab = W.lab(word, '', 'sc-lx-big sc-lx-hot'); word.lab.to = 0; }
    word.position.set(0, -1.55, .3);
    word.lab.set(esc(full)); word.full = build && want.length > 0;
    word.lab.to = 0;
    // familia
    const fw = s.show === 'family' ? s.family.slice(0, 8) : [];
    fam.forEach(f => { if (fw.indexOf(f.t) < 0) f.ta = 0; });
    const asp = W.aspect();
    const rx = asp > 1.7 ? 3.4 : 2.25, ry = asp > 1.7 ? 1.55 : 2.05;
    fw.forEach((t, i) => {
      let f = fam.find(q => q.t === t && q.ta);
      if (!f) {
        const B = mkBlock(t, FAM_C, .72, { parts: famParts(t, s.root), size: .52, d: .45 });
        const br = new THREE.Mesh(GEO.cyl, mat(ROOT_C, { emissive: new THREE.Color(ROOT_C), emissiveIntensity: .5, roughness: .3 }));
        root.add(br); setAlpha(br, 0);
        f = { B, br, t, a: 0, ta: 1, s: 0, x: 0, y: 0, z: 0, delay: .25 + i * .14 };
        fam.push(f);
      }
      const n = fw.length, ang = Math.PI / 2 - i * 2 * Math.PI / n + (n % 2 ? 0 : Math.PI / n);
      f.tx = Math.cos(ang) * rx; f.ty = Math.sin(ang) * ry; f.tz = -.25 * Math.sin(ang);
      f.ta = 1;
    });
    fam = fam.filter(f => { if (!f.ta) { dying.push(f); return false; } return true; });
    // cámara
    let bw = 3.2, bh = 3.2;
    if (build) { bw = total + 1; bh = 3.8; }
    if (fw.length) { bw = rx * 2 + 2.6; bh = ry * 2 + 1.3; }
    W.view({ dist: W.fit(bw, bh, 1.12), ty: fw.length ? 0 : -.25, sway: fw.length ? .14 : .22 });
    S = s;
  }

  const tmpA = new THREE.Vector3(), tmpB = new THREE.Vector3();
  W.frame((dt, T, snap) => {
    const k = snap ? -1 : dt;
    tSet += dt;
    if (R) {
      R.a = damp(R.a, R.ta, 4, k); R.s = damp(R.s, 1, 5, k); R.x = damp(R.x, R.tx, 4, k);
      R.B.g.position.set(R.x, reduce ? 0 : Math.sin(T * 1.2) * .06, 0);
      R.B.g.rotation.y = reduce ? 0 : Math.sin(T * .7) * .08;
      R.B.g.scale.setScalar(R.s); setAlpha(R.B.g, R.a);
      R.B.mat.emissive.set(ROOT_C); R.B.mat.emissiveIntensity = .12 + (reduce ? 0 : .06 * Math.sin(T * 2.5));
      halo.position.x = R.x; halo.scale.set(R.B.w * 2.4, 2.6, 1);
    }
    // órbita → acople
    const f = orbit ? ease(seg(tSet, 1.7, 2.7)) : 1;
    const ringA = orbit ? (1 - seg(tSet, 1.6, 2.3)) * .35 : 0;
    ringMat.opacity = damp(ringMat.opacity, ringA, 5, k); ring.visible = ringMat.opacity > .01;
    affs.forEach(a => {
      a.a = damp(a.a, a.ta, 4, k);
      const w = tSet * 2.1 + a.ph;
      const ox = Math.cos(w) * 2.6, oz = Math.sin(w) * 2.6;
      tmpA.set(ox, 0, oz).applyEuler(ORB);
      const dy = reduce ? 0 : Math.sin(T * 1.2) * .06;
      a.B.g.position.set(tmpA.x + (a.dx - tmpA.x) * f, tmpA.y * (1 - f) + dy, tmpA.z * (1 - f));
      a.B.g.rotation.y = (1 - f) * -w * .3;
      a.B.g.scale.setScalar(.7 + .3 * f);
      setAlpha(a.B.g, a.a);
    });
    if (word) word.lab.to = word.full && f > .98 ? 1 : 0;
    // familia
    fam.forEach(q => {
      if (q.delay > 0 && !snap) { q.delay -= dt; return; }
      q.a = damp(q.a, q.ta, 4, k);
      q.s = snap ? 1 : Math.min(1, q.s + dt * 1.6);
      const g = backOut(q.s), bob = reduce ? 0 : Math.sin(T * 1.5 + q.tx) * .05;
      q.x = q.tx * g; q.y = q.ty * g + bob; q.z = q.tz * g;
      q.B.g.position.set(q.x, q.y, q.z); q.B.g.scale.setScalar(Math.max(.01, Math.min(1, q.s * 1.4)));
      setAlpha(q.B.g, q.a);
      // rama
      tmpA.set(R ? R.x : 0, 0, -.1); tmpB.set(q.x, q.y, q.z - .1);
      const len = tmpA.distanceTo(tmpB);
      q.br.position.copy(tmpA).lerp(tmpB, .5); q.br.scale.set(.035, Math.max(.001, len), .035);
      q.br.quaternion.setFromUnitVectors(UP, tmpB.sub(tmpA).normalize());
      setAlpha(q.br, q.a * .9);
    });
    for (let i = dying.length - 1; i >= 0; i--) {
      const q = dying[i];
      q.a = damp(q.a, 0, 5, k);
      if (q.B) { q.B.g.scale.multiplyScalar(snap ? 1 : 1 - dt * .8); setAlpha(q.B.g, q.a); }
      if (q.br) setAlpha(q.br, q.a);
      if (q.a < .02) { if (q.B) W.drop(q.B.g); if (q.br) W.drop(q.br); if (q.lab) W.unlab(q.lab); dying.splice(i, 1); }
    }
  });

  return {
    set(state, prev) { set(state || {}, prev); },
    dispose() { W.dispose(); haloT.dispose(); ring.geometry.dispose(); },
  };
}

function normalize(s) {
  s = s || {};
  const A = v => Array.isArray(v) ? v.map(String).filter(Boolean) : v ? [String(v)] : [];
  return { root: String(s.root || 'raíz'), prefix: A(s.prefix), suffix: A(s.suffix), family: A(s.family), show: s.show || 'root' };
}
function describe(s) {
  s = normalize(s);
  if (s.show === 'family') return 'Raíz «' + s.root + '». Familia: ' + s.family.join(', ') + '.';
  if (s.show === 'build') return s.prefix.map(p => p + '-').join('') + s.root + s.suffix.map(p => '-' + p).join('') + ' = ' + s.prefix.join('') + s.root + s.suffix.join('');
  return 'Raíz: «' + s.root + '».';
}
