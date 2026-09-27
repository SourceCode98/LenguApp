// Escena "figure": figuras literarias con dos objetos sencillos (formas con palabras) que se transforman, comparan, crecen o se oponen.
import { THREE, reduce, esc, world, wordBlock, textSprite, mat, basic, GEO, rbox, damp, setAlpha, softShadow, glowTex, clamp, seg, ease, easeOut, backOut, plain } from './lx-kit.js';

const KIND = {
  metafora: 'Metáfora', simil: 'Símil', hiperbole: 'Hipérbole', personificacion: 'Personificación', anafora: 'Anáfora', antitesis: 'Antítesis',
};
const CA = '#2EC4B6', CB = '#FFC24B', WARM = '#FF9F43', COOL = '#6C6CE0';
const CYCLE = 7.5;

function starGeo() {
  const s = new THREE.Shape(), n = 5;
  for (let i = 0; i <= n * 2; i++) { const r = i % 2 ? .42 : 1, a = Math.PI / 2 + i * Math.PI / n; const x = Math.cos(a) * r, y = Math.sin(a) * r; i ? s.lineTo(x, y) : s.moveTo(x, y); }
  const g = new THREE.ExtrudeGeometry(s, { depth: .28, bevelEnabled: true, bevelThickness: .08, bevelSize: .06, bevelSegments: 3 });
  g.center(); return g;
}

export default function (el) {
  const W = world(el, { pitch: .12, sway: .22 });
  const o = W.o;
  if (!o) return { set(s) { W.fb(describe(s)); W.note(note(s)); }, dispose() { W.dispose(); } };
  const root = o.root;
  const sh = softShadow(7, 2.6, .45); sh.position.y = -1.45; root.add(sh);
  const glowT = glowTex('rgba(255,210,120,.9)', 'rgba(255,190,90,0)');
  const sparkT = glowTex('rgba(255,255,255,1)', 'rgba(255,255,255,0)');
  const GEOS = { star: starGeo(), gem: new THREE.IcosahedronGeometry(.8, 1) };

  let cur = null; const dying = [];
  const dyn = (...objs) => objs.forEach(ob => ob.traverse(m => { if (m.material) [].concat(m.material).forEach(mt => { mt.userData.dyn = true; }); }));
  let key = '';

  const shape = (kind, color, extra) => {
    const m = new THREE.Mesh(kind === 'star' ? GEOS.star : kind === 'gem' ? GEOS.gem : GEO.sph,
      mat(color, Object.assign({ roughness: .3, clearcoat: .9, flatShading: kind === 'gem', emissive: new THREE.Color(color), emissiveIntensity: .12 }, extra || {})));
    if (kind === 'ball') m.scale.setScalar(.75);
    return m;
  };
  const halo = (color, s) => { const h = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowT, color, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: .55 })); h.scale.setScalar(s || 3); h.position.z = -.6; return h; };
  const word = (t, opt) => textSprite(t, Object.assign({ h: .62, size: .54, bg: 'rgba(12,19,26,.9)', border: 'rgba(255,255,255,.18)' }, opt || {}));

  function build(s) {
    const g = new THREE.Group(); root.add(g);
    const U = { t: 0, tick: null, w: 6, h: 3.6, cy: 0 };
    const k = s.kind;
    if (k === 'metafora') {
      const A = shape('gem', CA), B = shape('star', CB, { emissiveIntensity: .3 });
      const hA = halo(CA, 2.8), hB = halo(CB, 3.4);
      const wa = word(s.a, { border: CA }), wb = word(s.b, { border: CB });
      wa.position.y = wb.position.y = -1.45;
      g.add(A, B, hA, hB, wa, wb);
      // chispas
      const N = 36, pos = new Float32Array(N * 3), dir = [];
      for (let i = 0; i < N; i++) { const a = Math.random() * Math.PI * 2, e = (Math.random() - .5) * 2; dir.push(new THREE.Vector3(Math.cos(a), e * .6, Math.sin(a) * .6).normalize()); }
      const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const pm = new THREE.PointsMaterial({ map: sparkT, size: .22, color: '#FFE3A6', transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 });
      const sp = new THREE.Points(pg, pm); g.add(sp);
      dyn(hA, hB, wa, wb, sp);
      const an = new THREE.Object3D(); an.position.y = 1.35; g.add(an);
      const lab = W.lab(an, esc(s.a) + ' → ' + esc(s.b), 'sc-lx-mini', CB);
      U.tick = (dt, T, t) => {
        const c = reduce ? 5 : t % CYCLE;
        const e = reduce ? 1 : ease(seg(c, 1.6, 2.7)) * (1 - ease(seg(c, CYCLE - .6, CYCLE)));
        const spin = reduce ? 0 : T * .6;
        A.scale.setScalar(Math.max(.001, 1 - e)); A.rotation.set(spin * .5, spin + e * 4, 0);
        B.scale.setScalar(Math.max(.001, e) * 1.05); B.rotation.set(0, reduce ? 0 : Math.sin(T * .9) * .5 + (1 - e) * 3, 0);
        hA.material.opacity = .5 * (1 - e); hB.material.opacity = .6 * e;
        wa.material.opacity = 1 - e; wb.material.opacity = e;
        const burst = reduce ? 0 : seg(c, 2.0, 3.2);
        pm.opacity = burst > 0 && burst < 1 ? (1 - burst) : 0; sp.visible = pm.opacity > .01;
        if (sp.visible) { for (let i = 0; i < N; i++) { const r = .3 + easeOut(burst) * 2.2; pos[i * 3] = dir[i].x * r; pos[i * 3 + 1] = dir[i].y * r; pos[i * 3 + 2] = dir[i].z * r; } pg.attributes.position.needsUpdate = true; }
        lab.to = e > .9 ? 1 : 0;
      };
      U.w = 5; U.h = 3.4; U.cy = 0;
    } else if (k === 'simil') {
      const A = shape('gem', CA), B = shape('star', CB, { emissiveIntensity: .3 });
      A.position.x = -2.4; B.position.x = 2.4;
      const hA = halo(CA, 2.6), hB = halo(CB, 3); hA.position.x = -2.4; hB.position.x = 2.4;
      const wa = word(s.a, { border: CA }), wb = word(s.b, { border: CB }); wa.position.set(-2.4, -1.45, 0); wb.position.set(2.4, -1.45, 0);
      const link = wordBlock(s.link, { color: '#8F7CF0', fg: '#FFFFFF', h: .7, d: .35, size: .5 });
      const beamM = mat('#8F7CF0', { emissive: new THREE.Color('#8F7CF0'), emissiveIntensity: .4, roughness: .3 });
      const b1 = new THREE.Mesh(GEO.cyl, beamM), b2 = new THREE.Mesh(GEO.cyl, beamM.clone());
      const bl = Math.max(.1, 1.55 - link.w / 2 - .05);
      [b1, b2].forEach((b, i) => { b.rotation.z = Math.PI / 2; b.position.x = (i ? 1 : -1) * (link.w / 2 + .05 + bl / 2); b.scale.set(.04, bl, .04); });
      g.add(A, B, hA, hB, wa, wb, link.g, b1, b2);
      U.tick = (dt, T, t) => {
        const e = reduce ? 1 : easeOut(seg(t, .2, 1.2));
        const bob = reduce ? 0 : Math.sin(T * 1.8) * .12;
        A.position.y = B.position.y = bob; hA.position.y = hB.position.y = bob;
        A.rotation.y = B.rotation.y = reduce ? 0 : T * .7;
        link.g.scale.setScalar(Math.max(.001, backOut(seg(t, .5, 1.3)) * (reduce ? 1 : 1 + .04 * Math.sin(T * 3))));
        b1.scale.y = b2.scale.y = Math.max(.001, bl * e);
      };
      U.w = 7.2; U.h = 3.4;
    } else if (k === 'hiperbole') {
      const A = shape('gem', CA);
      const hA = halo(CA, 3.2);
      const wa = word(s.a, { border: CA, h: .7 });
      const ghost = shape('gem', CA, { opacity: .55, emissiveIntensity: .05 }); ghost.scale.setScalar(.32);
      const gw = new THREE.Object3D(); g.add(gw);
      g.add(A, hA, wa, ghost);
      const lab = W.lab(gw, 'Tamaño real', 'sc-lx-mini', '#9FB3C4');
      dyn(hA);
      // líneas de exageración
      const rays = []; const rm = basic({ color: '#FFE3A6', opacity: 0 });
      for (let i = 0; i < 14; i++) { const r = new THREE.Mesh(GEO.plane, rm); const a = i / 14 * Math.PI * 2; r.userData.a = a; r.rotation.z = a; g.add(r); rays.push(r); }
      dyn(...rays);
      U.tick = (dt, T, t) => {
        const c = reduce ? 3 : t % CYCLE;
        const e = reduce ? 1 : backOut(seg(c, .8, 2.2)) * (1 - ease(seg(c, CYCLE - .7, CYCLE)));
        const s2 = .45 + e * 1.55 + (reduce ? 0 : Math.sin(T * 2.4) * .03 * e);
        A.scale.setScalar(s2); A.rotation.y = reduce ? .4 : T * .5; A.position.set(.7, s2 * .8 - 1.1, 0);
        hA.scale.setScalar(2.2 + e * 3.2); hA.position.copy(A.position).z -= .8; hA.material.opacity = .35 + .3 * e;
        wa.position.set(.7, -1.15, 1.6); wa.scale.set(wa.userData.w * (1 + e * .45), wa.userData.h * (1 + e * .45), 1);
        ghost.position.set(-2.9, -1.1 + .8 * .32, 0); ghost.rotation.y = reduce ? .4 : T * .5; gw.position.set(-2.9, -.35, 0);
        rm.opacity = e * .55;
        rays.forEach((r, i) => { const d = s2 * 1.05 + .35 + (reduce ? 0 : ((T * 1.5 + i * .37) % 1) * .5); r.position.set(A.position.x + Math.cos(r.userData.a) * d, A.position.y + Math.sin(r.userData.a) * d, .2); r.scale.set(.42, .045, 1); });
        lab.to = e > .5 ? 1 : 0;
      };
      U.w = 7.4; U.h = 4.6; U.cy = .45;
    } else if (k === 'personificacion') {
      const A = shape('ball', CB, { emissiveIntensity: .25, flatShading: false });
      const body = new THREE.Group(); body.add(A); g.add(body);
      const face = new THREE.Group(); body.add(face);
      const white = mat('#FFFFFF', { roughness: .2, clearcoat: 1 }), dark = mat('#17222C', { roughness: .2, clearcoat: 1 });
      const eyes = [-1, 1].map(sd => { const e = new THREE.Group(); const w = new THREE.Mesh(GEO.sph, white); w.scale.setScalar(.17); const p = new THREE.Mesh(GEO.sph, dark); p.scale.setScalar(.085); p.position.z = .12; e.add(w, p); e.position.set(sd * .24, .14, .62); face.add(e); e.userData.p = p; return e; });
      const mouth = new THREE.Mesh(new THREE.TorusGeometry(.17, .035, 8, 24, Math.PI), dark); mouth.rotation.z = Math.PI; mouth.position.set(0, -.14, .68); face.add(mouth);
      const cheekM = basic({ color: '#FF7B8A', opacity: .5 });
      [-1, 1].forEach(sd => { const c = new THREE.Mesh(GEO.sph, cheekM); c.scale.set(.09, .05, .02); c.position.set(sd * .42, -.06, .6); face.add(c); });
      const arms = [-1, 1].map(sd => { const a = new THREE.Mesh(GEO.cyl, mat(CB, { roughness: .4 })); a.scale.set(.05, .55, .05); a.position.set(sd * .82, -.05, 0); a.rotation.z = sd * .9; body.add(a); return a; });
      const hA = halo(CB, 3.2); g.add(hA);
      const wa = word(s.a, { border: CB }); wa.position.y = -1.45; g.add(wa);
      let wb = null; if (s.b) { wb = word(s.b, { h: .5, bg: 'rgba(255,244,214,.95)', fg: '#5A3A00', border: CB }); wb.position.set(1.7, 1.0, 0); g.add(wb); dyn(wb); }
      U.tick = (dt, T, t) => {
        const f = reduce ? 1 : backOut(seg(t, .5, 1.3));
        face.scale.setScalar(Math.max(.001, f)); arms.forEach(a => { a.scale.y = .55 * Math.max(.001, f); });
        const hop = reduce ? 0 : Math.abs(Math.sin(T * 2.6)) * .35 * f;
        const sq = reduce ? 1 : 1 - Math.max(0, .12 - hop) * .8;
        body.position.set(reduce ? 0 : Math.sin(T * .9) * .7 * f, hop - .1, 0);
        body.scale.set(1 / Math.sqrt(sq), sq, 1 / Math.sqrt(sq));
        body.rotation.z = reduce ? 0 : Math.sin(T * 1.8) * .12 * f; body.rotation.y = reduce ? 0 : Math.sin(T * .9) * .35 * f;
        arms[0].rotation.z = -.9 - (reduce ? 0 : Math.sin(T * 6) * .5 * f); arms[1].rotation.z = .9 + (reduce ? 0 : Math.sin(T * 6 + 1) * .15);
        const blink = !reduce && (T % 3.3) < .12 ? .1 : 1;
        eyes.forEach((e, i) => { e.scale.y = blink; e.userData.p.position.x = reduce ? 0 : Math.sin(T * .7) * .05; });
        hA.position.copy(body.position).z -= .7;
        if (wb) { wb.material.opacity = seg(t, 1.2, 1.8); wb.position.x = body.position.x + 1.5; wb.position.y = 1.0 + (reduce ? 0 : Math.sin(T * 2) * .05); }
      };
      U.w = 5.6; U.h = 3.6;
    } else if (k === 'anafora') {
      const rows = s.lines.slice(0, 4);
      const colW = [];
      const items = rows.map((r, i) => {
        const A = wordBlock(r.head, { color: CB, h: .66, d: .4, size: .5 });
        const R = r.rest ? wordBlock(r.rest, { color: '#F5EEDF', h: .66, d: .4, size: .44 }) : null;
        colW.push(A.w);
        g.add(A.g); if (R) g.add(R.g);
        dyn(A.g); if (R) dyn(R.g);
        return { A, R, i };
      });
      const cw = Math.max(...colW, 1);
      const maxRest = Math.max(0, ...items.map(it => it.R ? it.R.w : 0));
      const total = cw + .18 + maxRest, x0 = -total / 2;
      const n = items.length, gap = .86;
      const bar = new THREE.Mesh(rbox(cw + .3, n * gap + .2, .12, .06), mat(CB, { emissive: new THREE.Color(CB), emissiveIntensity: .5, opacity: .35, roughness: .3 }));
      bar.position.set(x0 + cw / 2, 0, -.3); g.add(bar);
      const an = new THREE.Object3D(); an.position.set(x0 + cw / 2, n * gap / 2 + .35, 0); g.add(an);
      const lab = W.lab(an, 'Se repite', 'sc-lx-mini', CB);
      items.forEach(it => { it.y = (n - 1) / 2 * gap - it.i * gap; });
      U.tick = (dt, T, t) => {
        items.forEach(it => {
          const e = reduce ? 1 : easeOut(seg(t, .2 + it.i * .45, .8 + it.i * .45));
          const pulse = reduce ? 0 : Math.max(0, Math.sin(T * 2.2 - it.i * .9)) * .08;
          it.A.g.position.set(x0 + it.A.w / 2 - (cw - it.A.w) * 0 , it.y + (1 - e) * 2, (1 - e) * 1.5);
          it.A.g.position.x = x0 + cw - it.A.w / 2;
          it.A.g.scale.setScalar(1 + pulse);
          it.A.mat.emissive.set(CB); it.A.mat.emissiveIntensity = .15 + pulse * 3;
          setAlpha(it.A.g, e);
          if (it.R) { const e2 = reduce ? 1 : easeOut(seg(t, .45 + it.i * .45, 1.05 + it.i * .45)); it.R.g.position.set(x0 + cw + .18 + it.R.w / 2 + (1 - e2) * 1.5, it.y, 0); setAlpha(it.R.g, e2); }
        });
        bar.scale.y = Math.max(.001, reduce ? 1 : easeOut(seg(t, .2, 1.4)));
        lab.to = t > 1 || reduce ? 1 : 0;
      };
      U.w = total + 1; U.h = n * gap + 1.4; U.cy = .15;
    } else { // antitesis
      const post = new THREE.Mesh(GEO.cyl, mat('#8FA3B5', { roughness: .35, metalness: .3 })); post.scale.set(.09, 2.1, .09); post.position.y = -.4; g.add(post);
      const foot = new THREE.Mesh(rbox(1.6, .2, .9, .08), mat('#5B6B7C', { roughness: .5 })); foot.position.y = -1.45; g.add(foot);
      const beamG = new THREE.Group(); beamG.position.y = .65; g.add(beamG);
      const beam = new THREE.Mesh(rbox(5.2, .14, .22, .06), mat('#C9D4DC', { roughness: .3, metalness: .4 })); beamG.add(beam);
      const pivot = new THREE.Mesh(GEO.sph, mat('#FFC24B', { roughness: .3, metalness: .5 })); pivot.scale.setScalar(.16); beamG.add(pivot);
      const pans = [-1, 1].map(sd => {
        const pg = new THREE.Group(); pg.position.x = sd * 2.4; beamG.add(pg);
        const str = new THREE.Mesh(GEO.cyl, mat('#C9D4DC', { roughness: .4 })); str.scale.set(.02, .75, .02); str.position.y = -.38; pg.add(str);
        const pan = new THREE.Mesh(new THREE.CylinderGeometry(.75, .55, .1, 32), mat('#AAB7C3', { roughness: .3, metalness: .5 })); pan.position.y = -.78; pg.add(pan);
        const obj = sd < 0 ? shape('ball', WARM, { emissiveIntensity: .45 }) : shape('ball', COOL, { emissiveIntensity: .3 });
        obj.scale.setScalar(.45); obj.position.y = -.35; pg.add(obj);
        const w = word(sd < 0 ? s.a : s.b, { border: sd < 0 ? WARM : COOL, h: .56 }); w.position.set(0, .55, .2); pg.add(w);
        return pg;
      });
      const vs = word('↔', { h: .5, bg: 'rgba(12,19,26,.85)', border: 'rgba(255,255,255,.25)' }); vs.position.set(0, 1.35, 0); g.add(vs);
      U.tick = (dt, T) => {
        const a = reduce ? .12 : Math.sin(T * 1.1) * .16;
        beamG.rotation.z = a; pans.forEach(p => { p.rotation.z = -a; });
      };
      U.w = 6.6; U.h = 4.2; U.cy = .1;
    }
    g.userData.U = U;
    setAlpha(g, 0);
    return { g, U, a: 0, ta: 1 };
  }

  function set(state) {
    const s = normalize(state);
    W.fb(describe(state));
    W.note(note(state));
    W.cap('<span class="sc-lx-sw" style="--c:#FFC24B"></span><i>Figura</i><b>' + KIND[s.kind] + '</b>');
    const k = JSON.stringify([s.kind, s.a, s.b, s.text]);
    if (k !== key) {
      key = k;
      if (cur) { cur.ta = 0; dying.push(cur); }
      cur = build(s);
      W.view({ dist: W.fit(cur.U.w, cur.U.h + .6, 1.1), ty: cur.U.cy, pitch: .12, sway: clamp(1.3 / cur.U.w, .08, .22) });
    }
  }

  W.frame((dt, T, snap) => {
    const k = snap ? -1 : dt;
    const upd = C => {
      C.a = damp(C.a, C.ta, 4, k);
      C.U.t += dt;
      if (C.U.tick) C.U.tick(dt, T, snap && !reduce ? C.U.t : C.U.t);
      setAlphaSoft(C.g, C.a);
      C.g.scale.setScalar(.85 + .15 * C.a);
    };
    if (cur) upd(cur);
    for (let i = dying.length - 1; i >= 0; i--) { const C = dying[i]; upd(C); if (C.a < .02) { W.drop(C.g); dying.splice(i, 1); } }
  });
  // alfa del grupo sin pisar las opacidades animadas de los sprites (se multiplican)
  function setAlphaSoft(g, a) {
    g.traverse(m => {
      if (!m.material || Array.isArray(m.material)) return;
      const mt = m.material;
      if (mt.userData.dyn) { mt.opacity *= a; mt.transparent = true; return; }
      if (mt.userData.baseOp == null) mt.userData.baseOp = mt.opacity;
      mt.opacity = mt.userData.baseOp * a; mt.transparent = true;
      if (!mt.userData.noDW) mt.depthWrite = a > .6 && mt.userData.baseOp > .9;
    });
    g.visible = a > .005;
  }

  return {
    set(state) { set(state || {}); },
    dispose() { W.dispose(); glowT.dispose(); sparkT.dispose(); GEOS.star.dispose(); GEOS.gem.dispose(); },
  };
}

function splitLines(text, a) {
  let lines = String(text || '').split(/\s*(?:\/|\n|;)\s*/).filter(Boolean);
  if (lines.length < 2 && a) {
    const re = new RegExp('(?=\\b' + a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b)', 'i');
    lines = String(text).split(re).map(x => x.trim().replace(/[.,]$/, '')).filter(Boolean);
  }
  return lines.map(l => {
    const m = l.match(/^(\S+)\s*(.*)$/);
    const head = a && plain(l).startsWith(plain(a)) ? l.slice(0, a.length) : (m ? m[1] : l);
    return { head, rest: l.slice(head.length).trim() };
  });
}
function normalize(s) {
  s = s || {};
  let kind = plain(s.kind).replace(/[^a-z]/g, ''); if (!KIND[kind]) kind = 'metafora';
  const a = String(s.a || '').trim() || 'A', b = String(s.b || '').trim();
  const text = String(s.text || '');
  const lm = plain(text).match(/\b(como|cual|igual que|parece|semejante a|tal como)\b/);
  return { kind, a, b: b || (kind === 'antitesis' ? 'B' : b), text, lines: splitLines(text, a), link: lm ? lm[1] : 'como' };
}
function describe(s) { s = normalize(s); return KIND[s.kind] + ': «' + s.text + '».'; }
function note(s) {
  s = normalize(s);
  if (!s.text) return '';
  let h = esc(s.text);
  const mark = (w, c) => { if (!w) return; const re = new RegExp('(' + esc(w).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'); h = h.replace(re, '<mark style="--c:' + c + '">$1</mark>'); };
  mark(s.a, CA === '#2EC4B6' && s.kind === 'antitesis' ? WARM : s.kind === 'personificacion' ? CB : s.kind === 'anafora' ? CB : CA);
  if (s.b && s.kind !== 'hiperbole') mark(s.b, s.kind === 'antitesis' ? COOL : CB);
  return '<q>' + h + '</q>';
}
