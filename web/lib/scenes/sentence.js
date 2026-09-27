// Escena "sentence": constructor de oraciones 3D (bloques de palabras, sujeto/predicado, núcleos, categorías, nexos).
import { THREE, reduce, esc, world, wordBlock, rbox, mat, basic, GEO, PAL, damp, setAlpha, softShadow, catColor, clamp } from './lx-kit.js';

const H = .8, D = .5, GAP = .14, SPLIT = .75;
const SUJ = '#2EC4B6', PRED = '#FF7B5C', NUC = '#FFC24B', LINK = '#7BE0A0';
// Códigos de categoría del contenido real
const CATS = {
  art: ['Artículo', '#8C7FB8'], sus: ['Sustantivo', '#3B82C4'], adj: ['Adjetivo', '#D98B2B'], ver: ['Verbo', '#D0564F'],
  adv: ['Adverbio', '#A8718F'], pre: ['Preposición', '#6E9486'], con: ['Conjunción', '#A69256'], pro: ['Pronombre', '#5E97A0'],
  det: ['Determinante', '#8C7FB8'], int: ['Interjección', '#9C7BB0'],
};
const catInfo = c => {
  const k = String(c || '').toLowerCase().slice(0, 3);
  if (CATS[k] && String(c).length <= 4) return { k, n: CATS[k][0], c: CATS[k][1] };
  const n = String(c || ''); return { k: n.toLowerCase(), n: n.charAt(0).toUpperCase() + n.slice(1), c: catColor(n) };
};
const lum = hex => { const c = new THREE.Color(hex); return .2126 * c.r + .7152 * c.g + .0722 * c.b; };
const arr = a => Array.isArray(a) ? a.map(String) : [];

export default function (el) {
  const W = world(el, { pitch: .2, sway: .22 });
  const o = W.o;
  if (!o) return { set(s) { W.fb(describe(s)); }, dispose() { W.dispose(); } };
  const root = o.root;

  let blocks = new Map(); // key -> {B, x,y,z, tx,ty,tz, a,ta, s, glow,tglow, col:Color, tcol:Color, fg}
  const plats = {};        // name -> {m, x,y,w, tx,ty,tw, a,ta, lab}
  const shadow = softShadow(8, 2.4, .45); root.add(shadow);

  function plat(name, color, text) {
    let P = plats[name];
    if (!P) {
      const m = new THREE.Mesh(rbox(1, .16, 1.1, .06), mat(color, { roughness: .35, clearcoat: .8, emissive: new THREE.Color(color), emissiveIntensity: .18 }));
      root.add(m);
      const anchor = new THREE.Object3D(); m.add(anchor); anchor.position.set(0, -.2, .55);
      P = plats[name] = { m, anchor, x: 0, y: -.1, w: .1, tx: 0, ty: -.1, tw: .1, a: 0, ta: 0 };
      P.lab = text ? W.lab(anchor, esc(text), null, color) : null;
      if (P.lab) P.lab.to = 0;
      setAlpha(m, 0);
    }
    return P;
  }

  // puente: tablones en una curva (una sola malla instanciada)
  const NPL = 16;
  const plankM = new THREE.InstancedMesh(rbox(1, 1, 1, .12), mat(PAL.wood, { roughness: .7, clearcoat: .1 }), NPL);
  root.add(plankM);
  const br = { a: 0, ta: 0, A: new THREE.Vector3(), B: new THREE.Vector3(), C: new THREE.Vector3(), tA: new THREE.Vector3(), tB: new THREE.Vector3(), tC: new THREE.Vector3(), side: new THREE.Vector3(0, 0, 1), vert: 0 };
  // hilo de concordancia (cuentas)
  const NB = 22;
  const beadM = new THREE.InstancedMesh(GEO.sphLo, basic({ color: LINK, opacity: 1, depthWrite: true }), NB);
  root.add(beadM);
  const lk = { a: 0, ta: 0, anchor: new THREE.Object3D() };
  root.add(lk.anchor);
  lk.lab = W.lab(lk.anchor, '', 'sc-lx-mini', LINK); lk.lab.to = 0;
  const tmpM = new THREE.Matrix4(), tq = new THREE.Quaternion(), tv = new THREE.Vector3(), ts = new THREE.Vector3(1, 1, 1);

  let S = {}, box = { w: 6, h: 2, cy: .4 };

  function set(state) {
    S = normalize(state);
    W.fb(describe(state));
    const want = [];
    const two = !!(S.nexo && S.second);
    const catsOn = S.show === 'cats' && S.cats.length > 0;
    const split = S.show === 'split' || S.show === 'nuclei';
    // palabras: [{key, t, role, i, cat}]
    const mk = (words, role, off) => words.forEach((t, i) => want.push({ key: role + i + '|' + t, t, role, i, ci: off + i }));
    mk(S.subj, 's', 0); mk(S.pred, 'p', S.subj.length);
    if (two) { mk(S.second.subj, 'S', 100); mk(S.second.pred, 'P', 100 + S.second.subj.length); want.push({ key: 'x|' + S.nexo, t: S.nexo, role: 'x', i: 0, ci: 50 }); }
    // crear bloques nuevos
    const keep = new Set();
    want.forEach(w => {
      keep.add(w.key);
      let b = blocks.get(w.key);
      if (!b) {
        const isX = w.role === 'x';
        const B = wordBlock(w.t, { color: isX ? NUC : PAL.cream, h: H, d: D });
        root.add(B.g);
        b = { B, w, x: 0, y: 3, z: 0, a: 0, ta: 1, s: .4, glow: 0, tglow: 0, col: new THREE.Color(isX ? NUC : PAL.cream), tcol: new THREE.Color(), fg: PAL.ink, isNew: true };
        blocks.set(w.key, b);
        setAlpha(B.g, 0);
      }
      b.w = w; b.ta = 1;
    });
    blocks.forEach((b, k) => { if (!keep.has(k)) { b.ta = 0; } });

    // ---------- disposición ----------
    const row = (words, role, x0, y, doSplit) => {
      let x = x0; const out = { s0: x0, s1: x0, p0: x0, p1: x0 };
      words.forEach((w, i) => {
        const b = blocks.get(w.key);
        if (i > 0 && doSplit && w.role !== words[i - 1].role) { out.s1 = x - GAP; x += SPLIT; out.p0 = x; }
        b.tx = x + b.B.w / 2; b.ty = y + H / 2; b.tz = 0; x += b.B.w + GAP;
      });
      out.end = x - GAP;
      if (!doSplit || !words.some(w => w.role === 'p' || w.role === 'P')) out.s1 = out.end;
      if (!words.some(w => w.role === 's' || w.role === 'S')) out.p0 = x0;
      out.p1 = out.end; out.w = out.end - x0;
      return out;
    };
    const w1 = want.filter(w => w.role === 's' || w.role === 'p');
    const w2 = want.filter(w => w.role === 'S' || w.role === 'P');
    const widthOf = ws => ws.reduce((s, w) => s + blocks.get(w.key).B.w + GAP, 0) - GAP + (split && ws.some(w => /[sS]/.test(w.role)) && ws.some(w => /[pP]/.test(w.role)) ? SPLIT : 0);
    const W1 = widthOf(w1);
    let layout = 'one';
    Object.values(plats).forEach(P => { P.ta = 0; if (P.lab) P.lab.to = 0; });
    br.ta = 0;
    if (!two) {
      // en pantallas angostas la oración se parte en dos filas (sujeto arriba, predicado abajo)
      const dOne = W.fit(W1 + .6, 2.6), ws = w1.filter(w => w.role === 's'), wp = w1.filter(w => w.role === 'p');
      let A = ws, B = wp;
      if (!split || !ws.length || !wp.length) { // corte por ancho
        let acc = 0, cut = 0; const half = W1 / 2;
        w1.forEach((w, i) => { if (acc < half) cut = i + 1; acc += blocks.get(w.key).B.w + GAP; });
        A = w1.slice(0, Math.max(1, cut)); B = w1.slice(Math.max(1, cut));
      }
      const wa = widthOf(A), wb = widthOf(B);
      const dTwo = W.fit(Math.max(wa, wb) + .6, 4.2);
      if (B.length && w1.length > 2 && dTwo < dOne * .8) {
        const RY = S.show === 'nuclei' ? 1.9 : 1.45;
        const r1 = row(A, 's', -wa / 2, RY, false), r2 = row(B, 'p', -wb / 2, 0, false);
        if (split) {
          platsFor('1', { s0: r1.s0, s1: r1.end, p0: r2.s0, p1: r2.end, end: r2.end }, RY, true, 0);
        }
        box = { w: Math.max(wa, wb) + .6, h: 3.4 + RY * .6, cy: RY * .5 + .45 };
      } else {
        const r = row(w1, 's', -W1 / 2, 0, split);
        if (split) platsFor('1', r, 0, true);
        box = { w: W1 + .6, h: 2.6, cy: .55 };
      }
    } else {
      const xb = blocks.get(want.find(w => w.role === 'x').key);
      const W2 = widthOf(w2);
      const horizW = W1 + W2 + xb.B.w + 1.6;
      const dH = W.fit(horizW, 3.2), dV = W.fit(Math.max(W1, W2, xb.B.w) + .6, 5.6);
      layout = dH <= dV * 1.05 ? 'h' : 'v';
      if (layout === 'h') {
        const x0 = -horizW / 2;
        const r1 = row(w1, 's', x0, 0, split), x2 = x0 + W1 + xb.B.w + 1.6;
        const r2 = row(w2, 'S', x2, 0, split);
        platsFor('1', r1, 0, split); platsFor('2', r2, 0, split);
        xb.tx = x0 + W1 + .8 + xb.B.w / 2; xb.ty = .82 + H / 2; xb.tz = 0;
        br.tA.set(x0 + W1 + .05, -.02, 0); br.tB.set(x2 - .05, -.02, 0); br.tC.set(xb.tx, 1.6, 0); br.side.set(0, 0, 1); br.vert = 0;
        box = { w: horizW + .4, h: 3, cy: .75 };
      } else {
        const r1 = row(w1, 's', -W1 / 2, 1.55, split);
        const r2 = row(w2, 'S', -W2 / 2, -1.9, split);
        platsFor('1', r1, 1.55, split); platsFor('2', r2, -1.9, split);
        xb.tx = 0; xb.ty = -.2; xb.tz = .55;
        br.tA.set(0, 1.4, .2); br.tB.set(0, -1.02, .25); br.tC.set(0, .2, 1.5); br.side.set(1, 0, 0); br.vert = 1;
        box = { w: Math.max(W1, W2) + .8, h: 5.4, cy: -.05 };
      }
      br.ta = 1;
    }
    // islas neutras cuando no hay división
    function platsFor(id, r, y, doSplit, yp) {
      if (yp === undefined) yp = y;
      if (doSplit && r.s1 > r.s0 + .01 && r.p1 > r.p0 + .01) {
        const A = plat('s' + id, SUJ, id === '1' ? 'Sujeto' : 'Sujeto 2'), B = plat('p' + id, PRED, id === '1' ? 'Predicado' : 'Predicado 2');
        A.tx = (r.s0 + r.s1) / 2; A.tw = r.s1 - r.s0 + .3; A.ty = y - .09; A.ta = 1; A.lab.to = 1;
        B.tx = (r.p0 + r.p1) / 2; B.tw = r.p1 - r.p0 + .3; B.ty = yp - .09; B.ta = 1; B.lab.to = 1;
        if (id === '1' && S.second == null) { A.lab.set('Sujeto'); B.lab.set('Predicado'); }
      } else if (two) {
        const P = plat('n' + id, '#3A4C5C');
        P.tx = (r.s0 + r.end) / 2; P.tw = r.end - r.s0 + .4; P.ty = y - .09; P.ta = 1;
      }
    }

    // ---------- estilo de cada bloque ----------
    const nucS = S.nuc.s, nucP = S.nuc.p;
    blocks.forEach(b => {
      if (!b.ta) return;
      const w = b.w;
      let col = PAL.cream, fg = PAL.ink, glow = 0, lift = 0, alpha = 1;
      if (w.role === 'x') { col = NUC; glow = .25; }
      const isNuc = (w.role === 's' && w.i === nucS) || (w.role === 'p' && w.i === nucP) ||
        (w.role === 'S' && w.i === S.nuc2.s) || (w.role === 'P' && w.i === S.nuc2.p);
      if (S.show === 'nuclei' && isNuc) { col = NUC; glow = .35; lift = .55; }
      if (catsOn && w.role !== 'x') {
        const c = S.cats[w.ci];
        if (c != null) {
          const ci = catInfo(c); col = ci.c; fg = lum(col) > .55 ? PAL.ink : '#FFFFFF';
          if (S.focusCat) { if (ci.k === String(S.focusCat).toLowerCase() || plain3(ci.n) === plain3(S.focusCat)) { lift = .5; glow = .45; } else alpha = .4; }
        }
      }
      b.tcol.set(col); b.tglow = glow; b.ty += lift; b.alpha = alpha;
      if (b.fg !== fg) { b.fg = fg; b.B.setText(w.t, undefined, fg); }
      if (b.isNew) { b.x = b.tx; b.y = b.ty + 2.2; b.z = 0; b.col.copy(b.tcol); b.isNew = false; b.delay = w.role === 'x' ? .5 : (w.ci % 100) * .06; }
    });
    // núcleo: etiquetas
    blocks.forEach(b => {
      const isNuc = S.show === 'nuclei' && ((b.w.role === 's' && b.w.i === nucS) || (b.w.role === 'p' && b.w.i === nucP));
      if (isNuc && !b.nlab) { b.anchor = new THREE.Object3D(); b.anchor.position.set(0, H / 2 + .28, 0); b.B.g.add(b.anchor); b.nlab = W.lab(b.anchor, 'Núcleo', 'sc-lx-mini', NUC); }
      if (b.nlab) b.nlab.to = isNuc && b.ta ? 1 : 0;
    });
    // concordancia
    lk.ta = 0; lk.lab.to = 0;
    if (S.plural !== null && S.plural !== undefined) {
      lk.ta = 1; lk.lab.to = 1; lk.lab.set(S.plural ? 'Plural' : 'Singular');
    }
    // leyenda
    if (catsOn) {
      const seen = []; S.cats.slice(0, S.subj.length + S.pred.length).forEach(c => { const ci = catInfo(c); if (!seen.find(x => x.n === ci.n)) seen.push(ci); });
      W.note(seen.map(ci => '<span class="sc-lx-k" style="--c:' + ci.c + '">' + esc(ci.n) + '</span>').join(''));
    } else W.note('');
    const dist = W.fit(box.w, box.h, box.h < 3 ? 1.24 : 1.14);
    W.view({ dist, ty: box.cy, pitch: two && layout === 'v' ? .12 : .2, sway: clamp(1 / box.w, .05, .2) });
    shadow.scale.set(box.w + 1.5, 2.6, 1); shadow.position.y = (layout === 'v' ? -2.05 : -.25);
  }
  const plain3 = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').slice(0, 3);

  const Q = new THREE.Vector3(), Tn = new THREE.Vector3(), Nn = new THREE.Vector3();
  const bez = (A, C, B, t, out) => out.set(0, 0, 0).addScaledVector(A, (1 - t) * (1 - t)).addScaledVector(C, 2 * (1 - t) * t).addScaledVector(B, t * t);

  W.frame((dt, T, snap) => {
    const k = snap ? -1 : dt;
    blocks.forEach((b, key) => {
      if (b.delay > 0 && !snap) { b.delay -= dt; return; }
      const tgtA = b.ta ? (b.alpha == null ? 1 : b.alpha) : 0;
      b.a = damp(b.a, tgtA, 5, k);
      b.s = damp(b.s, b.ta ? 1 : .6, 7, k);
      const dx = b.tx - b.x;
      b.x = damp(b.x, b.tx, 5, k); b.y = damp(b.y, b.ty, 6, k);
      b.z = damp(b.z, b.tz + clamp(Math.abs(dx) * .25, 0, .6), 5, k);
      b.col.lerp(b.tcol, snap ? 1 : 1 - Math.exp(-6 * dt));
      b.glow = damp(b.glow, b.tglow, 4, k);
      const bob = reduce ? 0 : Math.sin(T * 1.6 + b.w.ci * .7) * .025;
      b.B.g.position.set(b.x, b.y + bob, b.z);
      b.B.g.scale.setScalar(b.s);
      b.B.mat.color.copy(b.col);
      b.B.mat.emissive.copy(b.col); b.B.mat.emissiveIntensity = b.glow * (reduce ? 1 : .8 + .2 * Math.sin(T * 3));
      setAlpha(b.B.g, b.a);
      if (!b.ta && b.a < .02) { W.drop(b.B.g); blocks.delete(key); }
    });
    Object.values(plats).forEach(P => {
      P.a = damp(P.a, P.ta, 4, k); P.x = damp(P.x, P.tx, 5, k); P.y = damp(P.y, P.ty, 5, k); P.w = damp(P.w, P.tw, 5, k);
      P.m.position.set(P.x, P.y, 0); P.m.scale.set(Math.max(.05, P.w), 1, 1);
      P.anchor.scale.set(1 / Math.max(.05, P.w), 1, 1);
      setAlpha(P.m, P.a);
    });
    // puente
    br.a = damp(br.a, br.ta, 3, k);
    br.A.lerp(br.tA, snap ? 1 : 1 - Math.exp(-5 * dt)); br.B.lerp(br.tB, snap ? 1 : 1 - Math.exp(-5 * dt)); br.C.lerp(br.tC, snap ? 1 : 1 - Math.exp(-5 * dt));
    plankM.visible = br.a > .01;
    if (plankM.visible) {
      for (let i = 0; i < NPL; i++) {
        const t = (i + .5) / NPL;
        const show = clamp(br.a * 1.6 - Math.abs(t - .5) * 1.2, 0, 1);
        bez(br.A, br.C, br.B, t, Q);
        Tn.copy(br.C).sub(br.A).multiplyScalar(2 * (1 - t)).addScaledVector(tv.copy(br.B).sub(br.C), 2 * t).normalize();
        Nn.crossVectors(br.side, Tn).normalize();
        tmpM.makeBasis(Tn, Nn, br.side);
        tq.setFromRotationMatrix(tmpM);
        ts.set((br.vert ? .06 : .17) * show, .07 * show, (br.vert ? .8 : .62) * show);
        tmpM.compose(Q, tq, ts);
        plankM.setMatrixAt(i, tmpM);
      }
      plankM.instanceMatrix.needsUpdate = true;
    }
    // hilo de concordancia entre núcleos
    lk.a = damp(lk.a, lk.ta, 3, k);
    beadM.visible = lk.a > .01;
    if (beadM.visible) {
      const bs = [...blocks.values()].find(b => b.ta && b.w.role === 's' && b.w.i === S.nuc.s);
      const bp = [...blocks.values()].find(b => b.ta && b.w.role === 'p' && b.w.i === S.nuc.p);
      if (bs && bp) {
        const A = tv.set(bs.x, bs.y + H / 2 + .05, bs.z + .1), B = Tn.set(bp.x, bp.y + H / 2 + .05, bp.z + .1);
        const far = Math.abs(A.y - B.y) > .5;
        const C = Nn.set((A.x + B.x) / 2 + (far ? 1.2 : 0), far ? (A.y + B.y) / 2 + .4 : Math.max(A.y, B.y) + .6 + Math.abs(B.x - A.x) * .12, far ? 1.4 : .3);
        for (let i = 0; i < NB; i++) {
          const t = i / (NB - 1);
          const vis = clamp(lk.a * 1.4 - t * .4, 0, 1);
          const pulse = reduce ? 1 : 1 + .35 * Math.max(0, Math.sin(T * 4 - t * 8));
          bez(A, C, B, t, Q);
          ts.setScalar(.045 * vis * pulse);
          tmpM.compose(Q, tq.identity(), ts); beadM.setMatrixAt(i, tmpM);
          if (i === (NB >> 1)) lk.anchor.position.copy(Q).y += .22;
        }
        beadM.instanceMatrix.needsUpdate = true;
      } else beadM.visible = false;
    }
  });

  return {
    set(state) { set(state || {}); },
    dispose() { W.dispose(); blocks.clear(); },
  };
}

function normalize(s) {
  s = s || {};
  const subj = arr(s.subj), pred = arr(s.pred);
  const cats = Array.isArray(s.cats) ? s.cats : [];
  const nucDef = (sj, pr, off) => {
    let si = -1;
    for (let i = 0; i < sj.length; i++) if (/^(sus|pro)/.test(String(cats[off + i] || '').toLowerCase())) { si = i; break; }
    let pi = -1;
    for (let i = 0; i < pr.length; i++) if (/^ver/.test(String(cats[off + sj.length + i] || '').toLowerCase())) { pi = i; break; }
    return { s: si >= 0 ? si : Math.max(0, sj.length - 1), p: pi >= 0 ? pi : 0 };
  };
  const nd = nucDef(subj, pred, 0);
  const nuc = s.nuc && typeof s.nuc === 'object' ? { s: s.nuc.s == null ? nd.s : +s.nuc.s, p: s.nuc.p == null ? nd.p : +s.nuc.p } : nd;
  const second = s.second && (Array.isArray(s.second.subj) || Array.isArray(s.second.pred)) ? { subj: arr(s.second.subj), pred: arr(s.second.pred) } : null;
  const nuc2 = second ? (s.second.nuc || { s: Math.max(0, second.subj.length - 1), p: 0 }) : { s: -1, p: -1 };
  return { subj, pred, nuc, nuc2, show: s.show || 'words', cats, focusCat: s.focusCat || null, plural: s.plural == null ? null : !!s.plural, nexo: s.nexo || null, second };
}
function describe(s) {
  s = normalize(s);
  let t = 'Oración: ' + s.subj.join(' ') + ' | ' + s.pred.join(' ') + '.';
  if (s.nexo && s.second) t += ' Nexo «' + s.nexo + '»: ' + s.second.subj.join(' ') + ' ' + s.second.pred.join(' ') + '.';
  return t + ' (Sujeto | Predicado)';
}
