// Escena "comm": circuito de la comunicación. Emisor y receptor enfrentados; la burbuja del mensaje viaja por el canal.
import { THREE, reduce, esc, world, setDim, textSprite, canvasTex, roundRect, fitText, measure, rbox, mat, basic, GEO, PAL, damp, setAlpha, softShadow, glowTex, clamp, seg, easeOut, FH } from './lx-kit.js';

const PARTS = ['emisor', 'mensaje', 'canal', 'codigo', 'receptor', 'contexto'];
const C_EM = '#FF7B5C', C_RE = '#2EC4B6', C_CA = '#8F7CF0', C_CO = '#FFC24B', C_CX = '#4C9BE8';
const XF = 2.75, HEAD = 1.62, CYCLE = 3.6, TRAVEL = 2.5;
const GLYPHS = '#@%&¤§∆Ω≠◊¿?*';
const scramble = t => String(t).split('').map((c, i) => /\s/.test(c) ? c : GLYPHS[(c.charCodeAt(0) * 7 + i * 3) % GLYPHS.length]).join('');

export default function (el) {
  const W = world(el, { pitch: .2, sway: .2 });
  const o = W.o;
  if (!o) return { set(s) { W.fb(describe(s)); }, dispose() { W.dispose(); } };
  const root = o.root;
  const parts = {}; // nombre -> {g, lab, dim, tdim, mats:[...]}
  const P = n => (parts[n] = parts[n] || { g: new THREE.Group(), dim: 1, tdim: 1, hot: 0, thot: 0 });
  PARTS.forEach(n => root.add(P(n).g));

  /* ---------- contexto: el piso (una habitación) ---------- */
  const cx = parts.contexto;
  const floor = new THREE.Mesh(rbox(8.4, .24, 3.4, .12), mat('#2A3B4B', { roughness: .8, clearcoat: .1, emissive: new THREE.Color(C_CX), emissiveIntensity: 0 }));
  floor.position.y = -.12; cx.g.add(floor);
  const rug = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, .02, 48), mat('#3F5A73', { roughness: .9, clearcoat: 0 }));
  rug.scale.set(3.6, 1, 1.25); rug.position.y = .01; cx.g.add(rug);
  const sh = softShadow(9.5, 4.2, .6); sh.position.y = -.25; root.add(sh);
  const cxA = new THREE.Object3D(); cxA.position.set(0, -.2, 1.75); cx.g.add(cxA);

  /* ---------- figuras ---------- */
  function person(color, dir) {
    const g = new THREE.Group();
    const col = new THREE.Color(color);
    const body = new THREE.Mesh(GEO.cap, mat(color, { roughness: .45, clearcoat: .5 }));
    body.scale.set(.9, .78, .9); body.position.y = .82; g.add(body);
    const head = new THREE.Mesh(GEO.sph, mat(col.clone().lerp(new THREE.Color('#FFE6D2'), .55), { roughness: .5, clearcoat: .3 }));
    head.scale.setScalar(.36); head.position.y = HEAD; g.add(head);
    const eyeM = mat('#1A2330', { roughness: .3, clearcoat: 1 });
    [-1, 1].forEach(s => { const e = new THREE.Mesh(GEO.sphLo, eyeM); e.scale.setScalar(.045); e.position.set(dir * .3, HEAD + .06, s * .13); g.add(e); });
    const base = new THREE.Mesh(GEO.cyl, mat(col.clone().multiplyScalar(.55), { roughness: .6 }));
    base.scale.set(.55, .08, .55); base.position.y = .04; g.add(base);
    g.userData.head = head; g.userData.body = body;
    return g;
  }
  const em = person(C_EM, 1); em.position.x = -XF; parts.emisor.g.add(em);
  const re = person(C_RE, -1); re.position.x = XF; parts.receptor.g.add(re);
  const emA = new THREE.Object3D(); emA.position.set(-XF, HEAD + .72, 0); parts.emisor.g.add(emA);
  const reA = new THREE.Object3D(); reA.position.set(XF, HEAD + .72, 0); parts.receptor.g.add(reA);

  /* ---------- canal: tubo en arco en tres tramos ---------- */
  const A0 = new THREE.Vector3(-XF + .42, HEAD + .05, 0), A1 = new THREE.Vector3(XF - .42, HEAD + .05, 0);
  const curve = new THREE.QuadraticBezierCurve3(A0, new THREE.Vector3(0, HEAD + 2.1, 0), A1);
  const sub = (a, b) => ({ getPoint: t => curve.getPoint(a + (b - a) * t) });
  const tubeMat = () => mat(C_CA, { roughness: .2, clearcoat: 1, transmission: 0, opacity: .8, emissive: new THREE.Color(C_CA), emissiveIntensity: .35 });
  const mkTube = (a, b) => {
    const c = new THREE.Curve(); c.getPoint = (t, out) => (out || new THREE.Vector3()).copy(sub(a, b).getPoint(t));
    return new THREE.Mesh(new THREE.TubeGeometry(c, 24, .075, 12, false), tubeMat());
  };
  const tA = mkTube(0, .45), tM = mkTube(.45, .57), tB = mkTube(.57, 1);
  parts.canal.g.add(tA, tM, tB);
  const caA = new THREE.Object3D(); caA.position.copy(curve.getPoint(.5)).y -= .5; parts.canal.g.add(caA);
  const capM = mat(C_CA, { emissive: new THREE.Color(C_CA), emissiveIntensity: .5 });
  [A0, A1].forEach(p => { const m = new THREE.Mesh(GEO.sphLo, capM); m.scale.setScalar(.12); m.position.copy(p); parts.canal.g.add(m); });

  /* ---------- código: dado con letras ---------- */
  const faces = ['A', 'B', 'C', 'Ñ', 'e', 'o'].map((L, i) => {
    const t = canvasTex(1, 1, (x, Wd, Hd) => {
      roundRect(x, 6, 6, Wd - 12, Hd - 12, 36); x.fillStyle = '#FFC24B'; x.fill();
      x.font = '800 ' + Math.round(Hd * .6) + 'px ' + FH; x.fillStyle = '#17222C'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(L, Wd / 2, Hd / 2 + 6);
    }, 160);
    return new THREE.MeshPhysicalMaterial({ map: t, roughness: .4, clearcoat: .6, transparent: true });
  });
  const die = new THREE.Mesh(rbox(.62, .62, .62, .1), faces);
  die.position.set(0, 1.05, .15); parts.codigo.g.add(die);
  const coA = new THREE.Object3D(); coA.position.set(0, .42, .5); parts.codigo.g.add(coA);

  /* ---------- mensaje: burbuja ---------- */
  let msg = '', bubble = null, bubbleBad = null;
  const mg = parts.mensaje.g;
  const bubbleTex = text => {
    const h = .78, fpx = Math.round(h * 240 * .42);
    const w = Math.max(1.3, measure(text, '800 ' + fpx + 'px ' + FH) / 240 + .6);
    const t = canvasTex(w, h + .2, (x, Wd, Hd) => {
      const bh = Hd * (h / (h + .2));
      x.shadowColor = 'rgba(0,0,0,.35)'; x.shadowBlur = 10;
      roundRect(x, 6, 6, Wd - 12, bh - 12, bh * .42); x.fillStyle = '#FBF7EE'; x.fill();
      x.beginPath(); x.moveTo(Wd * .3, bh - 10); x.lineTo(Wd * .24, Hd - 4); x.lineTo(Wd * .42, bh - 10); x.fill();
      x.shadowBlur = 0;
      fitText(x, text, Wd / 2, bh / 2, Wd - 40, fpx, 800, FH, '#17222C');
    });
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false }));
    s.scale.set(w, h + .2, 1); s.center.set(.5, .15);
    return s;
  };
  const meA = new THREE.Object3D(); mg.add(meA);

  /* ---------- ruido ---------- */
  const NN = 90;
  const nGeo = new THREE.BufferGeometry(); const nPos = new Float32Array(NN * 3); nGeo.setAttribute('position', new THREE.BufferAttribute(nPos, 3));
  const nTex = glowTex('rgba(235,240,255,1)', 'rgba(235,240,255,0)');
  const nMat = new THREE.PointsMaterial({ map: nTex, size: .22, transparent: true, depthWrite: false, opacity: 0, color: '#DDE6F0' });
  const noiseP = new THREE.Points(nGeo, nMat); root.add(noiseP);
  const seeds = [...Array(NN)].map(() => [Math.random(), (Math.random() - .5) * .9, (Math.random() - .5) * 1.2]);

  /* ---------- etiquetas ---------- */
  const L = {
    emisor: W.lab(emA, '', null, C_EM), receptor: W.lab(reA, '', null, C_RE), mensaje: W.lab(meA, '<small>Mensaje</small>', 'sc-lx-mini', '#F5EEDF'),
    canal: W.lab(caA, '', null, C_CA), codigo: W.lab(coA, '', null, C_CO), contexto: W.lab(cxA, '', null, C_CX),
  };
  Object.values(L).forEach(l => { l.to = 0; });

  let S = null, t0 = 0, fallV = 0, fallY = 0, midDrop = 0;
  const lab = (k, v) => '<small>' + k + '</small>' + esc(v || '—');

  function set(state) {
    const s = normalize(state);
    S = s;
    W.fb(describe(state));
    if (s.mensaje !== msg) {
      msg = s.mensaje;
      if (bubble) W.drop(bubble); if (bubbleBad) W.drop(bubbleBad);
      bubble = bubbleTex(msg); bubbleBad = bubbleTex(scramble(msg));
      mg.add(bubble, bubbleBad); bubbleBad.material.opacity = 0;
      t0 = 0;
    }
    L.emisor.set(lab('Emisor', s.emisor)); L.receptor.set(lab('Receptor', s.receptor));
    L.canal.set(lab('Canal', s.canal)); L.codigo.set(lab('Código', s.codigo)); L.contexto.set(lab('Contexto', s.contexto));
    PARTS.forEach(n => {
      const p = parts[n];
      p.tdim = s.focus && s.focus !== n ? .28 : 1;
      p.thot = s.focus === n ? 1 : 0;
      const l = L[n];
      l.to = s.show.indexOf(n) >= 0 ? (s.focus && s.focus !== n ? .45 : 1) : 0;
      l.d.classList.toggle('sc-lx-hot', s.focus === n);
    });
    W.view({ dist: W.fit(8.8, 5.6, 1.06), ty: 1.25, pitch: .2 });
  }

  const tmp = new THREE.Vector3(), dieCol = new THREE.Color('#FFFFFF'), BAD = new THREE.Color('#FF8C80'), WHITE = new THREE.Color('#FFFFFF');
  W.frame((dt, T, snap) => {
    const k = snap ? -1 : dt;
    if (!S) return;
    dieCol.lerp(S.broken === 'codigo' ? BAD : WHITE, snap ? 1 : 1 - Math.exp(-5 * dt));
    faces.forEach(m => { m.userData.baseCol = dieCol; });
    PARTS.forEach(n => {
      const p = parts[n];
      p.dim = damp(p.dim, p.tdim, 4, k); p.hot = damp(p.hot, p.thot, 4, k);
      if (n !== 'mensaje') setDim(p.g, p.dim);
    });
    const pulse = reduce ? .6 : .5 + .5 * Math.sin(T * 3.2);
    floor.material.emissiveIntensity = parts.contexto.hot * .35 * pulse;
    [em, re].forEach((f, i) => { const hot = parts[i ? 'receptor' : 'emisor'].hot; f.userData.body.material.emissive.set(i ? C_RE : C_EM); f.userData.body.material.emissiveIntensity = hot * .45 * pulse; });
    [tA, tM, tB].forEach(m => { m.material.emissiveIntensity = .3 + parts.canal.hot * .6 * pulse + (S.noise && !reduce ? Math.random() * .3 : 0); });
    die.rotation.set(reduce ? .5 : T * .5, reduce ? .7 : T * .8, 0);
    const codeBad = S.broken === 'codigo';
    die.position.x = codeBad && !reduce ? Math.sin(T * 30) * .03 : 0;
    // tramo del medio se cae si el canal se rompe
    midDrop = damp(midDrop, S.broken === 'canal' ? 1 : 0, 3, k);
    tM.position.y = -midDrop * 1.2; tM.rotation.z = midDrop * .5;
    setAlpha(tM, 1 - midDrop);
    // recorrido de la burbuja
    t0 += dt;
    const tc = reduce ? (S.broken === 'canal' ? .45 : S.broken === 'codigo' ? .78 : .5) * TRAVEL : t0 % CYCLE;
    let u = clamp(tc / TRAVEL, 0, 1);
    const broken = S.broken === 'canal';
    let a = 1, y = 0;
    if (broken && u > .44) {
      const tf = (u - .44) * TRAVEL;
      u = .44; y = -4.9 * tf * tf * (reduce ? 0 : 1) - (reduce ? .9 : 0); a = clamp(1 - tf * .9, 0, 1) * (reduce ? .8 : 1);
    }
    if (!reduce) { a *= seg(tc, 0, .25); if (!broken) a *= 1 - seg(tc, TRAVEL * .86, TRAVEL + .15); }
    curve.getPoint(u, tmp);
    const shake = S.noise && !reduce ? .09 : 0;
    const sx = shake ? (Math.random() - .5) * shake : 0, sy = shake ? (Math.random() - .5) * shake : 0;
    if (bubble) {
      const bad = codeBad ? seg(u, .45, .6) : 0;
      [bubble, bubbleBad].forEach((b, i) => {
        b.position.set(tmp.x + sx, tmp.y + .22 + y + sy, tmp.z + .1);
        b.material.opacity = a * (i ? bad : 1 - bad);
        b.material.color.setScalar(S.focus && S.focus !== 'mensaje' ? .45 : 1);
        b.material.rotation = shake ? (Math.random() - .5) * .12 : 0;
        const sc = 1 + parts.mensaje.hot * .08 * pulse;
        b.scale.set(b.userData.w0 || (b.userData.w0 = b.scale.x), b.userData.h0 || (b.userData.h0 = b.scale.y), 1).multiplyScalar(sc);
      });
      meA.position.set(tmp.x, tmp.y + 1.25 + y, tmp.z);
    }
    L.mensaje.to = S.show.indexOf('mensaje') >= 0 ? a * (S.focus && S.focus !== 'mensaje' ? .45 : 1) : 0;
    // gestos: el emisor "habla" al salir, el receptor salta al recibir
    const talk = reduce ? 0 : Math.max(0, 1 - tc / .5);
    em.userData.head.position.y = HEAD + Math.sin(talk * Math.PI * 3) * .05;
    em.rotation.z = -talk * .08;
    const got = !reduce && !broken && !codeBad && tc > TRAVEL ? Math.sin(seg(tc, TRAVEL, TRAVEL + .45) * Math.PI) : 0;
    re.position.y = got * .22;
    const puzzled = !reduce && codeBad && tc > TRAVEL ? Math.sin(seg(tc, TRAVEL, TRAVEL + .8) * Math.PI * 3) * .18 : 0;
    re.rotation.y = puzzled;
    // ruido
    const nA = damp(nMat.opacity, S.noise ? .85 : 0, 3, k); nMat.opacity = nA; noiseP.visible = nA > .01;
    if (noiseP.visible) {
      for (let i = 0; i < NN; i++) {
        const sd = seeds[i];
        if (!reduce && Math.random() < .25) { sd[0] = Math.random(); sd[1] = (Math.random() - .5) * 1; sd[2] = (Math.random() - .5) * 1.3; }
        curve.getPoint(sd[0], tmp);
        nPos[i * 3] = tmp.x + sd[1] * .6; nPos[i * 3 + 1] = tmp.y + sd[1]; nPos[i * 3 + 2] = tmp.z + sd[2];
      }
      nGeo.attributes.position.needsUpdate = true;
    }
  });

  return {
    set(state) { set(state || {}); },
    dispose() { W.dispose(); nTex.dispose(); faces.forEach(m => { m.map.dispose(); m.dispose(); }); },
  };
}

function normalize(s) {
  s = s || {};
  const show = Array.isArray(s.show) ? s.show.map(String) : PARTS.slice();
  const f = s.focus ? String(s.focus).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase() : null;
  const b = s.broken ? String(s.broken).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase() : null;
  return {
    emisor: s.emisor || 'Emisor', receptor: s.receptor || 'Receptor', mensaje: String(s.mensaje || '…'), canal: s.canal || '', codigo: s.codigo || '', contexto: s.contexto || '',
    show: show.map(x => x.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()), focus: f, noise: !!s.noise, broken: b,
  };
}
function describe(s) {
  s = normalize(s);
  let t = s.emisor + ' → «' + s.mensaje + '» → ' + s.receptor + '.';
  if (s.canal) t += ' Canal: ' + s.canal + '.'; if (s.codigo) t += ' Código: ' + s.codigo + '.'; if (s.contexto) t += ' Contexto: ' + s.contexto + '.';
  if (s.noise) t += ' Hay ruido.'; if (s.broken) t += ' Falla: ' + s.broken + '.';
  return t;
}
