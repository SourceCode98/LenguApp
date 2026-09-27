// Escena "diorama": escenario del relato en maqueta low-poly. El punto de vista mueve la cámara; el momento cambia la luz.
import { THREE, reduce, esc, world, mat, basic, GEO, rbox, damp, setAlpha, softShadow, glowTex, canvasTex, clamp, lerp } from './lx-kit.js';

const BW = 7.2, BD = 5.2;
const SET = {
  bosque: { n: 'Bosque', g: '#356B36' }, rio: { n: 'Río', g: '#4F8540' }, laguna: { n: 'Laguna', g: '#5F7F45' },
  pueblo: { n: 'Pueblo', g: '#B59D74' }, ciudad: { n: 'Ciudad', g: '#56616C' }, paramo: { n: 'Páramo', g: '#8E9A5C' },
};
const VIEWS = { libre: 'Vista libre', omnisciente: 'Narrador omnisciente', primera: 'Primera persona', testigo: 'Narrador testigo' };
const MOM = {
  inicio: ['Inicio', '#FFC877', { key: '#FFD9A0', ki: 2.1, hemi: '#FFF1DA', hi: 1.2, rim: '#FFB36B', ri: .8 }],
  nudo: ['Nudo', '#FF6B5A', { key: '#FF8A63', ki: 1.5, hemi: '#B7A2D9', hi: .75, rim: '#A36BFF', ri: 1.8 }],
  desenlace: ['Desenlace', '#9BD7C8', { key: '#FFE3EC', ki: 1.8, hemi: '#E4F1FF', hi: 1.15, rim: '#9FD6FF', ri: 1.0 }],
};
const DAY = { key: '#FFF1DE', ki: 2.0, hemi: '#EAF2FF', hi: 1.25, rim: '#8FB8FF', ri: 1.2 };
const NIGHT = { key: '#8FA8FF', ki: .75, hemi: '#5670B0', hi: .45, rim: '#6C7CFF', ri: .9 };

function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
const inStage = (x, z, m) => Math.abs(x) < 1.9 + (m || 0) && z > -.5 - (m || 0) && z < 1.8;
const pl = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export default function (el) {
  const W = world(el, { pitch: .42, yaw: .45, sway: .28 });
  const o = W.o;
  if (!o) return { set(s) { W.fb(describe(s)); }, dispose() { W.dispose(); } };
  const root = o.root;
  const scene = o.scene;
  const kitLights = []; scene.children.forEach(c => { if (c.isLight && !Object.values(W.lights).includes(c)) kitLights.push([c, c.intensity]); });

  /* ---------- maqueta ---------- */
  const board = new THREE.Mesh(rbox(BW + .2, .55, BD + .2, .12), mat('#5B4331', { roughness: .85, clearcoat: .1 }));
  board.position.y = -.35; root.add(board);
  const grassM = mat('#3E7A3A', { roughness: .9, clearcoat: 0 });
  const grass = new THREE.Mesh(rbox(BW, .14, BD, .06), grassM); grass.position.y = -.07; root.add(grass);
  const sh = softShadow(BW + 3, BD + 2.5, .55); sh.position.y = -.66; root.add(sh);

  // cielo: sol, luna y estrellas
  const sunM = basic({ color: '#FFD36B', opacity: 1, depthWrite: true });
  const sun = new THREE.Mesh(GEO.sph, sunM); sun.scale.setScalar(.36); sun.position.set(-3.2, 3.4, -2.8); root.add(sun);
  const glowT = glowTex('rgba(255,220,140,.9)', 'rgba(255,200,100,0)');
  const sunGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowT, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  sunGlow.scale.setScalar(2.4); sun.add(sunGlow); sunGlow.scale.setScalar(6.5);
  const moonM = basic({ color: '#E8EEFF', opacity: 0, depthWrite: true });
  const moon = new THREE.Mesh(GEO.sph, moonM); moon.scale.setScalar(.3); moon.position.set(3.1, 3.3, -2.6); root.add(moon);
  const NS = 140, sp = new Float32Array(NS * 3), R0 = rng(7);
  for (let i = 0; i < NS; i++) { const a = R0() * Math.PI * 2, e = .25 + R0() * 1.1, r = 9; sp[i * 3] = Math.cos(a) * Math.cos(e) * r; sp[i * 3 + 1] = Math.sin(e) * r - 1.5; sp[i * 3 + 2] = Math.sin(a) * Math.cos(e) * r; }
  const stG = new THREE.BufferGeometry(); stG.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  const starT = glowTex('rgba(255,255,255,1)', 'rgba(255,255,255,0)');
  const stM = new THREE.PointsMaterial({ map: starT, size: .16, transparent: true, depthWrite: false, opacity: 0 });
  const stars = new THREE.Points(stG, stM); root.add(stars);

  /* ---------- utilidades de utilería ---------- */
  const tmpM = new THREE.Matrix4(), tq = new THREE.Quaternion(), te = new THREE.Euler(), tp = new THREE.Vector3(), ts = new THREE.Vector3();
  function inst(geo, material, list, opt) {
    const m = new THREE.InstancedMesh(geo, material, Math.max(1, list.length));
    m.count = list.length;
    list.forEach((it, i) => {
      te.set(0, it.r || 0, 0); tq.setFromEuler(te); tp.set(it.p[0], it.p[1], it.p[2]); ts.set(it.s[0], it.s[1], it.s[2]);
      tmpM.compose(tp, tq, ts); m.setMatrixAt(i, tmpM);
      if (it.c) m.setColorAt(i, new THREE.Color(it.c));
    });
    m.userData.list = list; m.userData.sway = opt && opt.sway;
    return m;
  }
  function spots(seed, n, test) {
    const r = rng(seed), out = [];
    let tries = 0;
    while (out.length < n && tries++ < n * 40) {
      const x = (r() - .5) * (BW - .6), z = (r() - .5) * (BD - .6);
      if (test && !test(x, z)) continue;
      if (out.some(q => Math.hypot(q[0] - x, q[1] - z) < .55)) continue;
      out.push([x, z, r()]);
    }
    return out;
  }
  function trees(g, seed, n, test, cols, h) {
    const pts = spots(seed, n, (x, z) => !inStage(x, z, .2) && (!test || test(x, z)));
    const trunk = [], crown = [], crown2 = [];
    pts.forEach(([x, z, r]) => {
      const s = (h || 1) * (.75 + r * .6);
      trunk.push({ p: [x, .25 * s, z], s: [.09 * s, .5 * s, .09 * s] });
      crown.push({ p: [x, .95 * s, z], s: [.48 * s, 1.1 * s, .48 * s], r: r * 3, c: cols[Math.floor(r * cols.length)] });
      crown2.push({ p: [x, 1.45 * s, z], s: [.34 * s, .8 * s, .34 * s], r: r * 5, c: cols[Math.floor(r * 7) % cols.length] });
    });
    const coneG = new THREE.ConeGeometry(1, 1, 7, 1); coneG.userData.own = true;
    const leafM = mat('#FFFFFF', { roughness: .8, clearcoat: 0, flatShading: true });
    g.add(inst(GEO.cyl, mat('#6B4A30', { roughness: .9 }), trunk, { sway: 1 }), inst(coneG, leafM, crown, { sway: 1 }), inst(coneG, leafM, crown2, { sway: 1 }));
  }
  function rocks(g, seed, n, test) {
    const pts = spots(seed, n, (x, z) => !inStage(x, z, -.2) && (!test || test(x, z)));
    const dg = new THREE.DodecahedronGeometry(1, 0);
    g.add(inst(dg, mat('#8D949A', { roughness: .95, flatShading: true, clearcoat: 0 }), pts.map(([x, z, r]) => ({ p: [x, .06, z], s: [.18 + r * .2, .12 + r * .14, .16 + r * .2], r: r * 6 }))));
  }
  function waterTex() {
    return canvasTex(2, 2, (x, Wd, Hd) => {
      x.fillStyle = '#3B8BD0'; x.fillRect(0, 0, Wd, Hd);
      x.strokeStyle = 'rgba(210,235,255,.45)'; x.lineWidth = 5;
      for (let i = 0; i < 9; i++) { x.beginPath(); const y = (i + .5) * Hd / 9; x.moveTo(0, y); for (let k = 0; k <= 8; k++) x.lineTo(k * Wd / 8, y + Math.sin(k * 1.7 + i) * 8); x.stroke(); }
    }, 128);
  }
  function house(g, list) {
    const walls = [], roofs = [], wins = [];
    list.forEach(([x, z, w, h, d, r]) => {
      walls.push({ p: [x, h / 2, z], s: [w, h, d], r });
      roofs.push({ p: [x, h + .22, z], s: [w * .78, .45, d * .78 * 1.25], r: r + Math.PI / 4 });
      const fx = Math.sin(r), fz = Math.cos(r);
      wins.push({ p: [x + fx * (d / 2 + .01), h * .55, z + fz * (d / 2 + .01)], s: [.22, .24, 1], r });
    });
    const roofG = new THREE.ConeGeometry(1, 1, 4, 1); roofG.userData.own = true;
    g.add(inst(GEO.box, mat('#F1EADC', { roughness: .85, clearcoat: .05 }), walls));
    g.add(inst(roofG, mat('#B5543A', { roughness: .7, flatShading: true }), roofs));
    const wm = inst(GEO.plane, basic({ color: '#FFD27A', opacity: 0, depthWrite: false }), wins);
    wm.userData.win = true; g.add(wm);
  }

  function buildSetting(key) {
    const g = new THREE.Group(); g.userData.key = key;
    const leaf = ['#2F6B35', '#3C8A3F', '#2A5E3A', '#4E9A45'];
    if (key === 'bosque') {
      trees(g, 11, 22, (x, z) => z < -.7 || Math.abs(x) > 2.4, leaf, .9); rocks(g, 5, 7);
      // luciérnagas (de noche)
      const n = 40, fp = new Float32Array(n * 3), r = rng(3);
      for (let i = 0; i < n; i++) { fp[i * 3] = (r() - .5) * 6; fp[i * 3 + 1] = .3 + r() * 1.6; fp[i * 3 + 2] = (r() - .5) * 4; }
      const fg = new THREE.BufferGeometry(); fg.setAttribute('position', new THREE.BufferAttribute(fp, 3));
      const ff = new THREE.Points(fg, new THREE.PointsMaterial({ map: starT, size: .14, color: '#E8FF8A', transparent: true, depthWrite: false, opacity: 0, blending: THREE.AdditiveBlending }));
      ff.userData.fire = fp.slice(); g.add(ff); g.userData.fire = ff;
    } else if (key === 'rio') {
      const pts = [];
      for (let i = 0; i <= 40; i++) { const t = i / 40; pts.push(new THREE.Vector3(-BW / 2 + t * BW, .015, -1.35 + Math.sin(t * Math.PI * 2.2) * .45)); }
      const curve = new THREE.CatmullRomCurve3(pts);
      const geo = ribbon(curve, .95);
      const wt = waterTex(); wt.wrapS = wt.wrapT = THREE.RepeatWrapping; wt.repeat.set(6, 1);
      const water = new THREE.Mesh(geo, mat('#FFFFFF', { map: wt, roughness: .15, clearcoat: 1, emissive: new THREE.Color('#1A5A9A'), emissiveIntensity: .25 }));
      g.add(water); g.userData.water = wt;
      trees(g, 21, 8, (x, z) => (z < -2.1 || Math.abs(x) > 2.6) && Math.abs(z - (-1.35 + Math.sin((x / BW + .5) * Math.PI * 2.2) * .45)) > .9, leaf, .85);
      rocks(g, 9, 9, (x, z) => Math.abs(z - (-1.35 + Math.sin((x / BW + .5) * Math.PI * 2.2) * .45)) > .65);
    } else if (key === 'laguna') {
      const wt = waterTex(); wt.wrapS = wt.wrapT = THREE.RepeatWrapping; wt.repeat.set(2, 2);
      const lake = new THREE.Mesh(new THREE.CircleGeometry(1, 48), mat('#FFFFFF', { map: wt, roughness: .12, clearcoat: 1, emissive: new THREE.Color('#1D5E8E'), emissiveIntensity: .25 }));
      lake.rotation.x = -Math.PI / 2; lake.scale.set(2.3, 1.15, 1); lake.position.set(0, .012, -1.35); g.add(lake); g.userData.water = wt;
      const reeds = [], r = rng(4);
      for (let i = 0; i < 26; i++) { const a = r() * Math.PI * 2; const x = Math.cos(a) * 2.35 + (r() - .5) * .2, z = -1.35 + Math.sin(a) * 1.22; if (inStage(x, z, -.3)) continue; reeds.push({ p: [x, .22, z], s: [.025, .45 + r() * .3, .025] }); }
      g.add(inst(GEO.cyl, mat('#9DB35A', { roughness: .8 }), reeds, { sway: 1 }));
      const hills = [[-2.9, -2.1, 1.3], [2.8, -2.2, 1.5], [-3.1, 1.6, .8]].map(([x, z, s]) => ({ p: [x, 0, z], s: [s * 1.1, s * .55, s] }));
      g.add(inst(GEO.sph, mat('#5E7F45', { roughness: .95, flatShading: true }), hills));
      trees(g, 33, 6, (x, z) => Math.hypot(x / 2.6, (z + 1.35) / 1.4) > 1.1, leaf, .85);
    } else if (key === 'pueblo') {
      house(g, [[-2.6, -1.7, 1.0, .8, .9, 0], [-1.3, -1.9, .9, .7, .8, 0], [1.4, -1.9, 1.0, .75, .85, 0], [2.7, -1.6, .9, .85, .9, 0], [-2.9, .3, .8, .7, .9, Math.PI / 2], [2.95, .4, .8, .72, .9, -Math.PI / 2], [-2.8, 1.8, .9, .6, .7, Math.PI / 2]]);
      // iglesia
      const ch = new THREE.Group();
      const wall = mat('#FBF5EA', { roughness: .8 });
      const nave = new THREE.Mesh(GEO.box, wall); nave.scale.set(.9, .95, 1.2); nave.position.y = .47; ch.add(nave);
      const tower = new THREE.Mesh(GEO.box, wall); tower.scale.set(.42, 1.8, .42); tower.position.set(0, .9, .45); ch.add(tower);
      const tr = new THREE.Mesh(GEO.cone, mat('#B5543A', { roughness: .7, flatShading: true })); tr.scale.set(.32, .55, .32); tr.position.set(0, 2.07, .45); tr.rotation.y = Math.PI / 4; ch.add(tr);
      ch.position.set(0, 0, -2.0); ch.scale.setScalar(1.05); g.add(ch);
      const plaza = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, .02, 40), mat('#CDB88F', { roughness: .95 }));
      plaza.scale.set(2.2, 1, 1.4); plaza.position.set(0, .01, .5); g.add(plaza);
      trees(g, 41, 5, (x, z) => z > 1.2 || Math.abs(x) > 3, leaf, .7);
    } else if (key === 'ciudad') {
      const b = [], r = rng(12);
      const slots = [[-3.0, -2.0], [-2.1, -2.1], [-1.1, -2.05], [0, -2.15], [1.1, -2.0], [2.1, -2.1], [3.0, -2.0], [-3.0, -.9], [3.05, -.8], [-3.05, .5], [3.05, .6], [-3.0, 1.8], [3.0, 1.9]];
      slots.forEach(([x, z]) => { const h = .8 + r() * 2.2; b.push({ p: [x, h / 2, z], s: [.85, h, .8], c: ['#6C7A89', '#7F8FA0', '#5B6B7C', '#8A96A3'][Math.floor(r() * 4)] }); });
      const wt = canvasTex(1, 2, (x, Wd, Hd) => { x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, Wd, Hd); x.fillStyle = '#2B3540'; for (let i = 0; i < 4; i++) for (let j = 0; j < 12; j++) x.fillRect(8 + i * (Wd - 16) / 4 + 4, 8 + j * (Hd - 16) / 12 + 3, (Wd - 16) / 4 - 8, (Hd - 16) / 12 - 6); }, 64);
      const em = canvasTex(1, 2, (x, Wd, Hd) => { x.fillStyle = '#000'; x.fillRect(0, 0, Wd, Hd); const rr = rng(2); for (let i = 0; i < 4; i++) for (let j = 0; j < 12; j++) { x.fillStyle = rr() > .45 ? '#FFD27A' : '#000'; x.fillRect(8 + i * (Wd - 16) / 4 + 4, 8 + j * (Hd - 16) / 12 + 3, (Wd - 16) / 4 - 8, (Hd - 16) / 12 - 6); } }, 64);
      const bm = mat('#FFFFFF', { map: wt, emissiveMap: em, emissive: new THREE.Color('#FFFFFF'), emissiveIntensity: 0, roughness: .6, clearcoat: .3 });
      const bi = inst(GEO.box, bm, b); bi.userData.city = bm; g.add(bi); g.userData.city = bm;
      const lines = []; for (let i = 0; i < 9; i++) lines.push({ p: [-3.2 + i * .8, .012, .45], s: [.4, .06, 1] });
      const lm = inst(GEO.plane, basic({ color: '#F1F4F7', opacity: .8 }), lines);
      lm.rotation.x = -Math.PI / 2; lm.position.y = .012; lines.forEach((l, i) => { tmpM.compose(tp.set(l.p[0], -l.p[2], 0), tq.identity(), ts.set(.4, .06, 1)); lm.setMatrixAt(i, tmpM); });
      lm.position.set(0, .012, 0); g.add(lm);
      trees(g, 55, 4, (x, z) => z > 1.3 && Math.abs(x) < 2.5, leaf, .6);
    } else if (key === 'paramo') {
      const pts = spots(61, 24, (x, z) => !inStage(x, z, .1));
      const trunk = [], ros = [];
      const fl = [];
      pts.forEach(([x, z, r]) => { const h = .35 + r * .8; trunk.push({ p: [x, h / 2, z], s: [.1, h, .1] }); ros.push({ p: [x, h + .1, z], s: [.2, .26, .2], r: r * 6 }); if (r > .4) fl.push({ p: [x + .12, h + .32, z + .05], s: [.05, .05, .05] }); });
      g.add(inst(GEO.cyl, mat('#5E4C3A', { roughness: 1 }), trunk, { sway: .3 }));
      const rg = new THREE.OctahedronGeometry(1, 0); rg.userData.own = true;
      g.add(inst(rg, mat('#AEBF8C', { roughness: .8, flatShading: true, clearcoat: .1 }), ros, { sway: .3 }));
      g.add(inst(GEO.sphLo, mat('#F4C542', { roughness: .6, emissive: new THREE.Color('#F4C542'), emissiveIntensity: .2 }), fl, { sway: .3 }));
      const hills = [[-2.7, -2.0, 1.4], [0, -2.4, 1.2], [2.6, -2.0, 1.6]].map(([x, z, s]) => ({ p: [x, 0, z], s: [s * 1.2, s * .6, s] }));
      g.add(inst(GEO.sph, mat('#7C8858', { roughness: .95, flatShading: true }), hills));
      rocks(g, 17, 6);
      const mistT = glowTex('rgba(235,242,248,.55)', 'rgba(235,242,248,0)');
      const mist = [];
      for (let i = 0; i < 5; i++) { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: mistT, transparent: true, depthWrite: false, opacity: .5 })); s.scale.set(3.4, 1.2, 1); s.position.set(-3 + i * 1.5, .6 + (i % 2) * .4, -1.2 + (i % 3) * .5); g.add(s); mist.push(s); }
      g.userData.mist = mist; g.userData.mistT = mistT;
    }
    g.userData.ground = (SET[key] || SET.bosque).g;
    return g;
  }
  function ribbon(curve, w) {
    const N = 60, pos = [], uv = [], idx = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N, p = curve.getPoint(t), tg = curve.getTangent(t); const nx = -tg.z, nz = tg.x; const l = Math.hypot(nx, nz) || 1;
      pos.push(p.x + nx / l * w / 2, p.y, p.z + nz / l * w / 2, p.x - nx / l * w / 2, p.y, p.z - nz / l * w / 2);
      uv.push(t, 0, t, 1);
      if (i < N) { const a = i * 2; idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(idx); g.computeVertexNormals();
    // asegurar normales hacia arriba
    const n = g.attributes.normal; for (let i = 0; i < n.count; i++) n.setXYZ(i, 0, 1, 0);
    return g;
  }

  /* ---------- personajes ---------- */
  let chars = []; // {key, g, body, head, ring, lab, an, a, ta, x,z, tx,tz, h, face}
  const ringT = glowTex('rgba(255,210,110,1)', 'rgba(255,190,80,0)');
  function mkChar(c) {
    const g = new THREE.Group(); root.add(g);
    const h = clamp(+c.h || 1, .5, 2);
    const col = new THREE.Color(c.c || '#C0453A');
    const body = new THREE.Mesh(GEO.cap, mat(col, { roughness: .5, clearcoat: .4 }));
    body.scale.set(.5 * h, .42 * h, .5 * h); body.position.y = .45 * h; g.add(body);
    const head = new THREE.Mesh(GEO.sph, mat(col.clone().lerp(new THREE.Color('#FFE3CC'), .6), { roughness: .5 }));
    head.scale.setScalar(.2 * h); head.position.y = 1.0 * h; g.add(head);
    const eyeM = mat('#15202B', { roughness: .3, clearcoat: 1 });
    [-1, 1].forEach(s => { const e = new THREE.Mesh(GEO.sphLo, eyeM); e.scale.setScalar(.03 * h); e.position.set(s * .07 * h, 1.03 * h, .17 * h); g.add(e); });
    const ring = new THREE.Mesh(GEO.plane, basic({ map: ringT, opacity: 0, blending: THREE.AdditiveBlending }));
    ring.rotation.x = -Math.PI / 2; ring.scale.setScalar(1.3 * h); ring.position.y = .02; g.add(ring);
    const an = new THREE.Object3D(); an.position.y = 1.0 * h + .45; g.add(an);
    const lab = W.lab(an, esc(c.n || ''), null, c.c || '#C0453A');
    return { key: (c.n || '') + '|' + (c.c || '') + '|' + h, g, body, head, ring, lab, an, h, a: 0, ta: 1, x: 0, z: .6, tx: 0, tz: .6, ry: 0, tRy: 0, foc: 0, tfoc: 0, show: 1, tshow: 1 };
  }

  let setting = null; const oldSets = [];
  let S = null;
  const L = { key: new THREE.Color(), hemi: new THREE.Color(), rim: new THREE.Color(), ki: 2, hi: 1.2, ri: 1.2 };
  const LT = { key: new THREE.Color(DAY.key), hemi: new THREE.Color(DAY.hemi), rim: new THREE.Color(DAY.rim), ki: 2, hi: 1.2, ri: 1.2 };
  let night = 0, tNight = 0, groundCol = new THREE.Color('#3E7A3A'), tGround = new THREE.Color('#3E7A3A');
  // cámara local (primera persona / testigo)
  const camL = { b: 0, tb: 0, pos: new THREE.Vector3(4, 1, 3), tpos: new THREE.Vector3(4, 1, 3), tgt: new THREE.Vector3(), ttgt: new THREE.Vector3(), fov: 32, tfov: 32 };
  let flash = 0, flashT = 3;

  function set(state, prev) {
    const s = normalize(state);
    const first = !S;
    S = s;
    W.fb(describe(state));
    // escenario
    if (!setting || setting.userData.key !== s.setting) {
      if (setting) { setting.userData.dying = 1; oldSets.push(setting); }
      setting = buildSetting(s.setting); root.add(setting);
      setting.userData.app = first || reduce ? 1 : 0;
      tGround.set(setting.userData.ground);
      if (first) groundCol.copy(tGround);
    }
    // personajes
    const keys = s.chars.map(c => (c.n || '') + '|' + (c.c || '') + '|' + clamp(+c.h || 1, .5, 2));
    chars.forEach(ch => { if (keys.indexOf(ch.key) < 0) ch.ta = 0; });
    const live = s.chars.map((c, i) => {
      let ch = chars.find(q => q.key === keys[i] && q.ta);
      if (!ch) { ch = mkChar(c); chars.push(ch); if (!first) ch.appear = 0; }
      return ch;
    });
    const n = live.length;
    live.forEach((ch, i) => {
      ch.tx = n === 1 ? 0 : -1.25 + 2.5 * i / (n - 1); ch.tz = .55 + (n > 2 && i % 2 ? .45 : 0);
      if (ch.appear === 0) { ch.x = ch.tx; ch.z = ch.tz; }
      if (first) { ch.x = ch.tx; ch.z = ch.tz; }
      ch.tRy = n === 1 ? 0 : (i === 0 ? .7 : i === n - 1 ? -.7 : 0);
      ch.tfoc = s.focus === i ? 1 : 0;
      ch.idx = i;
      ch.lab.d.classList.toggle('sc-lx-hot', s.focus === i);
    });
    // luz
    const base = s.time === 'noche' ? NIGHT : DAY;
    const m = s.moment ? MOM[s.moment][2] : null;
    const mix = (a, b, t) => new THREE.Color(a).lerp(new THREE.Color(b), t);
    const t = m ? (s.time === 'noche' ? .45 : .75) : 0;
    LT.key.copy(m ? mix(base.key, m.key, t) : new THREE.Color(base.key)); LT.ki = m ? lerp(base.ki, m.ki * (s.time === 'noche' ? .5 : 1), t) : base.ki;
    LT.hemi.copy(m ? mix(base.hemi, m.hemi, t) : new THREE.Color(base.hemi)); LT.hi = m ? lerp(base.hi, m.hi * (s.time === 'noche' ? .5 : 1), t) : base.hi;
    LT.rim.copy(m ? mix(base.rim, m.rim, t) : new THREE.Color(base.rim)); LT.ri = m ? lerp(base.ri, m.ri, t) : base.ri;
    tNight = s.time === 'noche' ? 1 : 0;
    if (first) { L.key.copy(LT.key); L.hemi.copy(LT.hemi); L.rim.copy(LT.rim); L.ki = LT.ki; L.hi = LT.hi; L.ri = LT.ri; night = tNight; }
    // título
    const parts = [];
    if (s.moment) parts.push('<span class="sc-lx-sw" style="--c:' + MOM[s.moment][1] + '"></span><i>Momento</i><b>' + MOM[s.moment][0] + '</b>');
    if (s.view !== 'libre') parts.push((parts.length ? '<i>·</i>' : '') + '<b>' + VIEWS[s.view] + '</b>');
    if (!parts.length) parts.push('<i>Escenario</i><b>' + SET[s.setting].n + '</b>');
    W.cap(parts.join(''));
    // cámara
    const fit = W.fit(BW + 1.2, BD * .7 + 2.6, 1.02);
    live.forEach(ch => { ch.tshow = 1; });
    camL.tb = 0; camL.tfov = 32;
    if (s.view === 'omnisciente') W.view({ pitch: 1.18, yaw: .12, dist: W.fit(BW + .4, BD + .4, 1.02) * 1.02, ty: 0, sway: .06 });
    else W.view({ pitch: .42, yaw: .45, dist: fit, ty: .35, sway: .24 });
    if (s.view === 'primera' && live[0]) {
      const c0 = live[0], others = live.slice(1);
      camL.tb = 1; camL.tfov = 52; c0.tshow = 0;
      camL.tpos.set(c0.tx, 1.0 * c0.h, c0.tz + .1);
      if (others.length) { camL.ttgt.set(0, 0, 0); others.forEach(q => camL.ttgt.add(tp.set(q.tx, .75 * q.h, q.tz))); camL.ttgt.divideScalar(others.length); }
      else camL.ttgt.set(c0.tx * .3, .7, -2.2);
      // separa un poco hacia atrás para ver el borde del propio cuerpo
      const dir = tp.copy(camL.ttgt).sub(camL.tpos).setY(0).normalize();
      camL.tpos.addScaledVector(dir, -.05);
    } else if (s.view === 'testigo') {
      camL.tb = 1; camL.tfov = 36;
      camL.tpos.set(4.4, 1.5, 4.6);
      camL.ttgt.set(0, .55, .6);
      if (live.length) { camL.ttgt.set(0, 0, 0); live.forEach(q => camL.ttgt.add(tp.set(q.tx, .6 * q.h, q.tz))); camL.ttgt.divideScalar(live.length); }
    }
    if (first) { camL.b = camL.tb; camL.pos.copy(camL.tpos); camL.tgt.copy(camL.ttgt); camL.fov = camL.tfov; }
  }

  const upV = new THREE.Vector3(), wp = new THREE.Vector3(), wt2 = new THREE.Vector3(), rigP = new THREE.Vector3(), rigT = new THREE.Vector3();
  W.camHook = (cam, C, D) => {
    rigP.set(C.tx, C.ty, C.tz + D); rigT.set(C.tx, C.ty, C.tz);
    if (camL.b < .001) { cam.up.set(0, 1, 0); cam.position.copy(rigP); cam.lookAt(rigT); }
    else {
      wp.copy(camL.pos); root.localToWorld(wp); wt2.copy(camL.tgt); root.localToWorld(wt2);
      const b = camL.b * camL.b * (3 - 2 * camL.b);
      upV.set(0, 1, 0).applyQuaternion(root.quaternion);
      cam.up.set(0, 1, 0).lerp(upV, b).normalize();
      cam.position.copy(rigP).lerp(wp, b); rigT.lerp(wt2, b); cam.lookAt(rigT);
    }
    if (Math.abs(cam.fov - camL.fov) > .01) { cam.fov = camL.fov; cam.updateProjectionMatrix(); }
    return true;
  };

  W.frame((dt, T, snap) => {
    const k = snap ? -1 : dt;
    if (!S) return;
    // cámara local
    camL.b = damp(camL.b, camL.tb, 1.8, k);
    camL.pos.x = damp(camL.pos.x, camL.tpos.x, 2, k); camL.pos.y = damp(camL.pos.y, camL.tpos.y, 2, k); camL.pos.z = damp(camL.pos.z, camL.tpos.z, 2, k);
    camL.tgt.x = damp(camL.tgt.x, camL.ttgt.x, 2, k); camL.tgt.y = damp(camL.tgt.y, camL.ttgt.y, 2, k); camL.tgt.z = damp(camL.tgt.z, camL.ttgt.z, 2, k);
    camL.fov = damp(camL.fov, camL.tfov, 2, k);
    // luz
    const kc = snap ? 1 : 1 - Math.exp(-2 * dt);
    L.key.lerp(LT.key, kc); L.hemi.lerp(LT.hemi, kc); L.rim.lerp(LT.rim, kc);
    L.ki = damp(L.ki, LT.ki, 2, k); L.hi = damp(L.hi, LT.hi, 2, k); L.ri = damp(L.ri, LT.ri, 2, k);
    night = damp(night, tNight, 2, k);
    // relámpago en el nudo de noche
    if (S.moment === 'nudo' && !reduce) { flashT -= dt; if (flashT < 0) { flash = 1; flashT = 3 + Math.random() * 3; } }
    flash = Math.max(0, flash - dt * 3.5);
    const fl = flash > 0 ? (Math.sin(flash * 30) > 0 ? flash : flash * .3) : 0;
    W.lights.key.color.copy(L.key); W.lights.key.intensity = L.ki + fl * 2.5;
    W.lights.hemi.color.copy(L.hemi); W.lights.hemi.intensity = L.hi + fl * 1.5;
    W.lights.rim.color.copy(L.rim); W.lights.rim.intensity = L.ri;
    W.lights.fill.intensity = .35 * (1 - night * .7);
    kitLights.forEach(([l, i0]) => { l.intensity = i0 * (1 - night * .75); });
    scene.environmentIntensity = .5 * (1 - night * .7);
    sunM.opacity = 1 - night; sun.visible = night < .98; sunGlow.material.opacity = (1 - night) * .7;
    moonM.opacity = night; moon.visible = night > .02;
    stM.opacity = night * .9; stars.visible = night > .02;
    groundCol.lerp(tGround, kc); grassM.color.copy(groundCol).multiplyScalar(1 - night * .25);
    // escenario
    const wind = S.moment === 'nudo' ? 1 : .25;
    const upd = g => {
      g.children.forEach(m => {
        if (m.isInstancedMesh && m.userData.sway && !reduce) {
          const list = m.userData.list;
          list.forEach((it, i) => {
            const sw = Math.sin(T * (1.4 + wind) + it.p[0] * 1.3 + it.p[2]) * .05 * wind * m.userData.sway;
            te.set(sw * .6, it.r || 0, sw); tq.setFromEuler(te);
            tp.set(it.p[0] + sw * it.p[1], it.p[1], it.p[2]); ts.set(it.s[0], it.s[1], it.s[2]);
            tmpM.compose(tp, tq, ts); m.setMatrixAt(i, tmpM);
          });
          m.instanceMatrix.needsUpdate = true;
        }
        if (m.userData.win) { m.material.opacity = night * .95; m.visible = night > .02; }
      });
      if (g.userData.water && !reduce) g.userData.water.offset.x = (T * .06) % 1;
      if (g.userData.city) { g.userData.city.emissiveIntensity = night * 1.2; }
      if (g.userData.fire) {
        const ff = g.userData.fire, base = ff.userData.fire, P = ff.geometry.attributes.position.array;
        ff.material.opacity = night; ff.visible = night > .02;
        if (!reduce && ff.visible) { for (let i = 0; i < P.length; i += 3) { P[i] = base[i] + Math.sin(T * .7 + i) * .25; P[i + 1] = base[i + 1] + Math.sin(T * 1.1 + i * .3) * .15; } ff.geometry.attributes.position.needsUpdate = true; }
      }
      if (g.userData.mist && !reduce) g.userData.mist.forEach((m, i) => { m.position.x = -3 + i * 1.5 + Math.sin(T * .15 + i) * .5; });
    };
    if (setting) {
      setting.userData.app = snap ? 1 : Math.min(1, setting.userData.app + dt * 1.2);
      const e = setting.userData.app; setting.scale.set(1, Math.max(.001, e * e * (3 - 2 * e)), 1);
      upd(setting);
    }
    for (let i = oldSets.length - 1; i >= 0; i--) {
      const g = oldSets[i]; g.userData.dying -= snap ? 1 : dt * 2;
      const e = Math.max(0, g.userData.dying); g.scale.set(1, Math.max(.001, e), 1);
      if (e <= 0) { if (g.userData.mistT) g.userData.mistT.dispose(); W.drop(g); oldSets.splice(i, 1); }
    }
    // personajes
    for (let i = chars.length - 1; i >= 0; i--) {
      const ch = chars[i];
      ch.a = damp(ch.a, ch.ta ? 1 : 0, 4, k);
      if (ch.appear != null) ch.appear = snap ? 1 : Math.min(1, ch.appear + dt * 2);
      ch.x = damp(ch.x, ch.tx, 3, k); ch.z = damp(ch.z, ch.tz, 3, k); ch.ry = damp(ch.ry, ch.tRy, 3, k);
      ch.foc = damp(ch.foc, ch.tfoc, 4, k); ch.show = damp(ch.show, ch.tshow, 4, k);
      const br = reduce ? 0 : Math.sin(T * 2 + i * 1.7) * .02;
      const hop = ch.foc > .5 && !reduce ? Math.abs(Math.sin(T * 3)) * .08 : 0;
      ch.g.position.set(ch.x, hop, ch.z);
      ch.g.rotation.y = ch.ry + (reduce ? 0 : Math.sin(T * .8 + i) * .06);
      ch.body.scale.y = .42 * ch.h * (1 + br);
      const ap = ch.appear == null ? 1 : ch.appear;
      ch.g.scale.setScalar(Math.max(.001, ap));
      setAlpha(ch.g, ch.a * ch.show);
      ch.ring.material.opacity = ch.foc * (reduce ? .9 : .7 + .3 * Math.sin(T * 3)) * ch.a;
      ch.ring.visible = ch.ring.material.opacity > .01;
      ch.lab.to = ch.ta ? (ch.show < .5 ? 0 : S.focus != null && S.focus !== ch.idx ? .55 : 1) : 0;
      if (!ch.ta && ch.a < .02) { W.drop(ch.g); chars.splice(i, 1); }
    }
  });

  return {
    set(state, prev) { set(state || {}, prev); },
    dispose() { W.dispose(); glowT.dispose(); starT.dispose(); ringT.dispose(); stG.dispose(); },
  };
}

function normalize(s) {
  s = s || {};
  let setting = pl(s.setting).replace(/[^a-z]/g, ''); if (!SET[setting]) setting = 'bosque';
  const time = pl(s.time) === 'noche' ? 'noche' : 'dia';
  let view = pl(s.view).replace(/[^a-z]/g, ''); if (!VIEWS[view]) view = 'libre';
  let moment = s.moment ? pl(s.moment) : null; if (moment && !MOM[moment]) moment = null;
  const chars = (Array.isArray(s.chars) ? s.chars : []).slice(0, 5).map(c => ({ n: String((c && c.n) || ''), c: (c && c.c) || '#C0453A', h: (c && c.h) || 1 }));
  const focus = s.focus == null || isNaN(+s.focus) ? null : +s.focus;
  return { setting, time, view, moment, chars, focus };
}
function describe(s) {
  s = normalize(s);
  return 'Escenario: ' + SET[s.setting].n + (s.time === 'noche' ? ' de noche' : ' de día') + '. Personajes: ' + (s.chars.map(c => c.n).join(', ') || '—') + '. ' + VIEWS[s.view] + (s.moment ? '. Momento: ' + MOM[s.moment][0] : '') + '.';
}
