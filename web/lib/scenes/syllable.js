// Escena "syllable": sílabas como columnas 3D; la tónica sube y brilla; regla contada desde el final; la tilde cae.
import { THREE, reduce, esc, world, wordBlock, textSprite, rbox, mat, basic, GEO, PAL, damp, setAlpha, softShadow, glowTex, clamp, seg, easeOut } from './lx-kit.js';

const RULES = {
  aguda: ['Aguda', 'Tónica: última', 1], grave: ['Grave o llana', 'Tónica: penúltima', 2],
  esdrujula: ['Esdrújula', 'Tónica: antepenúltima', 3], sobreesdrujula: ['Sobresdrújula', 'Antes de la antepenúltima', 4],
};
const ACC = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' };
const strip = s => String(s).replace(/[áéíóúÁÉÍÓÚ]/g, c => ACC[c]);
const hasAcc = s => /[áéíóúÁÉÍÓÚ]/.test(String(s));
const DEP = .9, CAP = .9, BASE = .5, TON = 1.55, ATON = .55;
const C_SHAFT = '#3A5872', C_TON = '#F2A93B', C_CAP = '#F5EEDF', C_CAPT = '#FFC24B';

export default function (el) {
  const W = world(el, { pitch: .2, sway: .2 });
  const o = W.o;
  if (!o) return { set(s) { W.fb(describe(s)); }, dispose() { W.dispose(); } };
  const root = o.root;
  const shadow = softShadow(7, 2.6, .5); root.add(shadow);
  const haloT = glowTex('rgba(255,200,90,.9)', 'rgba(255,170,40,0)');

  let set0 = null;        // conjunto actual {g, cols:[...], plinth, key, w}
  const dying = [];
  // letrero de la regla
  let sign = null, signA = 0, signTA = 0, signKey = '';
  // tilde
  const tMat = mat(PAL.coral, { emissive: new THREE.Color(PAL.coral), emissiveIntensity: .5, roughness: .3, clearcoat: 1 });
  const tilde = new THREE.Mesh(rbox(.16, .62, .2, .06), tMat);
  tilde.rotation.z = -.75; root.add(tilde);
  const tHalo = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloT, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: .8 }));
  tHalo.scale.setScalar(1.3); tilde.add(tHalo);
  let tState = 'none', tT = 0, tA = 0; // none | hover | fall | done
  let S = null, signY = 3, signX = 0;

  function build(s) {
    const g = new THREE.Group(); root.add(g);
    const n = s.syl.length;
    const cols = s.syl.map((sy, i) => {
      const cw = Math.max(1.05, wordBlockW(sy) + .1);
      const shaft = new THREE.Mesh(rbox(cw - .12, 1, DEP - .12, .05), mat(C_SHAFT, { roughness: .55, clearcoat: .4 }));
      const cap = wordBlock(s.tilde ? sy : strip(sy), { color: C_CAP, h: CAP, d: DEP, w: cw, size: .52 });
      const cg = new THREE.Group(); cg.add(shaft); cg.add(cap.g); g.add(cg);
      const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloT, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 }));
      halo.scale.set(cw * 2.2, 2.2, 1); halo.position.z = -.5; cg.add(halo);
      const tok = textSprite(String(n - i), { h: .42, bg: 'rgba(20,32,44,.92)', border: 'rgba(160,180,200,.5)', size: .56, pad: .1 });
      tok.position.set(0, -BASE - .38, DEP / 2); cg.add(tok);
      return { cg, shaft, cap, halo, tok, cw, x: 0, h: .01, th: ATON, glow: 0, tglow: 0, tokA: 0, tokTA: 0, sy, shown: s.tilde ? sy : strip(sy) };
    });
    let x = 0; const gap = .16;
    const total = cols.reduce((a, c) => a + c.cw, 0) + gap * (n - 1);
    cols.forEach(c => { c.x = -total / 2 + x + c.cw / 2; x += c.cw + gap; });
    const plinth = wordBlock(s.tilde ? s.word : strip(s.word), { color: '#1F2E3B', fg: '#EAF1F6', h: BASE, d: DEP + .5, w: total + .6, size: .6, weight: 700 });
    plinth.g.position.y = -BASE / 2; g.add(plinth.g);
    const G = { g, cols, plinth, key: s.syl.map(strip).join('|').toLowerCase(), w: total + .6, y: -3, a: 0, ta: 1 };
    setAlpha(g, 0);
    return G;
  }
  function wordBlockW(t) {
    const c = document.createElement('canvas').getContext('2d'); c.font = '800 ' + Math.round(CAP * 240 * .52) + 'px "Bricolage Grotesque","IBM Plex Sans",sans-serif';
    return c.measureText(t).width / 240 + .5;
  }

  function set(state, prev) {
    const s = normalize(state);
    const p = prev ? normalize(prev) : null;
    W.fb(describe(state));
    const key = s.syl.map(strip).join('|').toLowerCase();
    if (!set0 || set0.key !== key) {
      if (set0) { set0.ta = 0; dying.push(set0); }
      set0 = build(s);
      if (!prev || reduce) set0.y = 0;
      tState = 'none';
    }
    // alturas y brillo
    set0.cols.forEach((c, i) => {
      const ton = i === s.tonic;
      c.th = ton ? TON : ATON; c.tglow = ton ? 1 : 0; c.ton = ton;
      c.cap.setColor(ton ? C_CAPT : C_CAP);
      c.shaft.material.color.set(ton ? C_TON : C_SHAFT);
      c.tokTA = s.rule ? 1 : 0;
      if (c.tok.userData.hot !== (ton && !!s.rule)) {
        c.tok.userData.hot = ton && !!s.rule;
        c.tok.material.map.redraw((x, Wd, Hd) => {
          x.beginPath(); x.arc(Wd / 2, Hd / 2, Hd / 2 - 4, 0, 7);
          x.fillStyle = c.tok.userData.hot ? '#FFC24B' : 'rgba(20,32,44,.92)'; x.fill();
          x.lineWidth = 4; x.strokeStyle = c.tok.userData.hot ? '#FFE3A6' : 'rgba(160,180,200,.5)'; x.stroke();
          x.font = '800 ' + Math.round(Hd * .56) + 'px "Bricolage Grotesque",sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
          x.fillStyle = c.tok.userData.hot ? '#17222C' : '#F4F7FA'; x.fillText(String(set0.cols.length - i), Wd / 2, Hd / 2 + 2);
        });
      }
    });
    // etiqueta de tónica
    set0.cols.forEach((c, i) => {
      if (!c.lab) { c.an = new THREE.Object3D(); c.cg.add(c.an); c.lab = W.lab(c.an, 'Tónica', 'sc-lx-mini', '#FFC24B'); }
      c.lab.to = i === s.tonic ? 1 : 0;
    });
    // regla
    signTA = s.rule && RULES[s.rule] ? 1 : 0;
    if (signTA) {
      const R = RULES[s.rule];
      if (signKey !== s.rule) {
        if (sign) W.drop(sign.g);
        sign = wordBlock(R[0], { sub: R[1], color: '#8F7CF0', fg: '#FFFFFF', h: 1.05, d: .22, pad: .45, size: .46 });
        sign.g.position.set(0, TON + BASE + 1.35, -.2); root.add(sign.g); signKey = s.rule; signA = 0; setAlpha(sign.g, 0);
      }
    }
    // texto con o sin tilde
    const accented = s.syl.some(hasAcc) || hasAcc(s.word);
    const tc = set0.cols[s.tonic];
    if (!accented || !tc) { tState = 'none'; }
    else if (!s.tilde) { tState = 'hover'; setTexts(false); }
    else if (p && !p.tilde && set0.key === p.syl.map(strip).join('|').toLowerCase() && !reduce) { tState = 'fall'; tT = 0; }
    else { tState = 'none'; setTexts(true); }
    const hov = tState === 'hover';
    const side = signTA && sign && W.aspect() > 2.1;
    signX = side ? set0.w / 2 + sign.w / 2 + .45 : 0;
    signY = side ? TON * .75 : TON + CAP + (hov ? 2.2 : 1);
    const top = BASE + TON + CAP + (hov ? 1.55 : .45);
    const maxH = signTA && !side ? Math.max(top, BASE + signY + .6 + CAP * .5) : top;
    const bw = set0.w + .9 + (side ? 2 * (sign.w + .45) : 0);
    const dist = W.fit(bw, maxH + 1, 1.1);
    W.view({ dist, ty: (maxH - BASE - .8) / 2, sway: clamp(1.2 / set0.w, .06, .2) });
    shadow.scale.set(set0.w + 2, 3, 1); shadow.position.y = -BASE - .01;
    S = s;
  }
  function setTexts(acc) {
    if (!set0) return;
    set0.cols.forEach(c => { const t = acc ? c.sy : strip(c.sy); if (c.shown !== t) { c.shown = t; c.cap.setText(t); } });
    const w = acc ? S0().word : strip(S0().word);
    if (set0.plinth.text !== w) set0.plinth.setText(w);
  }
  let lastS = null; const S0 = () => lastS;

  W.frame((dt, T, snap) => {
    const k = snap ? -1 : dt;
    const upd = (G, alive) => {
      G.a = damp(G.a, G.ta, alive ? 3 : 4, k);
      G.y = damp(G.y, alive ? 0 : -2.5, 4, k);
      G.g.position.y = G.y;
      G.cols.forEach((c, i) => {
        c.h = damp(c.h, c.th, 4.5 - i * .3, k);
        c.glow = damp(c.glow, c.tglow, 3, k);
        c.tokA = damp(c.tokA, c.tokTA, 4, k);
        const bob = reduce ? 0 : c.ton ? Math.sin(T * 2.2) * .05 : 0;
        c.cg.position.x = c.x;
        c.shaft.scale.y = Math.max(.01, c.h); c.shaft.position.y = c.h / 2;
        c.cap.g.position.y = c.h + CAP / 2 + bob;
        c.cap.mat.emissive.set(C_CAPT); c.cap.mat.emissiveIntensity = c.glow * (.25 + (reduce ? 0 : .12 * Math.sin(T * 3)));
        c.halo.position.y = c.h + CAP / 2; c.halo.material.opacity = c.glow * .55 * G.a;
        if (c.an) c.an.position.y = c.h + CAP + .32 + bob;
        c.tok.material.opacity = c.tokA * G.a; c.tok.visible = c.tokA > .01;
      });
      setAlpha(G.g, G.a);
      G.cols.forEach(c => { c.halo.material.opacity = c.glow * .55 * G.a; c.tok.material.opacity = c.tokA * G.a; });
    };
    if (set0) upd(set0, true);
    for (let i = dying.length - 1; i >= 0; i--) { const G = dying[i]; upd(G, false); if (G.a < .02) { W.drop(G.g); dying.splice(i, 1); } }
    if (sign) {
      signA = damp(signA, signTA, 4, k); setAlpha(sign.g, signA);
      sign.g.position.x = (sign.x = damp(sign.x == null ? signX : sign.x, signX, 4, k)); sign.g.position.y = (sign.y = damp(sign.y == null ? signY : sign.y, signY, 4, k)) + (reduce ? 0 : Math.sin(T * 1.3) * .06);
      sign.g.rotation.x = reduce ? 0 : Math.sin(T * 1.1) * .03;
    }
    // tilde
    const tc = set0 && S ? set0.cols[S.tonic] : null;
    if (tc) {
      const topY = set0.y + tc.h + CAP + .1;
      if (tState === 'hover') {
        tA = damp(tA, 1, 4, k);
        tilde.position.set(tc.x + .12, topY + 1.15 + (reduce ? 0 : Math.sin(T * 2.4) * .1), .1);
        tilde.rotation.z = -.75 + (reduce ? 0 : Math.sin(T * 1.7) * .12);
      } else if (tState === 'fall') {
        tT += dt; const f = easeOut(seg(tT, 0, .5)) ** 2;
        tilde.position.set(tc.x + .12, topY + 1.15 * (1 - f), .1);
        tA = 1;
        if (tT > .5 && tT - dt <= .5) setTexts(true);
        if (tT > .5) { tA = 1 - seg(tT, .5, 1); tilde.scale.set(1 + seg(tT, .5, 1) * .8, 1 - seg(tT, .5, 1) * .5, 1); tc.glow = Math.max(tc.glow, 1.8 - seg(tT, .5, 1.2)); }
        if (tT > 1.2) { tState = 'none'; tilde.scale.set(1, 1, 1); }
      } else tA = damp(tA, 0, 5, k);
    } else tA = 0;
    tMat.opacity = tA; tHalo.material.opacity = tA * .8; tilde.visible = tA > .01;
  });

  return {
    set(state, prev) { lastS = normalize(state); set(state || {}, prev); },
    dispose() { W.dispose(); haloT.dispose(); },
  };
}

function normalize(s) {
  s = s || {};
  const word = String(s.word || '');
  let syl = Array.isArray(s.syl) && s.syl.length ? s.syl.map(String) : [word || '—'];
  let tonic = s.tonic == null ? -1 : +s.tonic;
  if (!(tonic >= 0 && tonic < syl.length)) { tonic = syl.findIndex(hasAcc); if (tonic < 0) tonic = Math.max(0, syl.length - 2); }
  const rule = s.rule ? String(s.rule).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace('sobresdrujula', 'sobreesdrujula') : null;
  return { word: word || syl.join(''), syl, tonic, rule, tilde: s.tilde !== false };
}
function describe(s) {
  s = normalize(s);
  return 'Palabra: ' + (s.tilde ? s.word : strip(s.word)) + ' (' + s.syl.join('-') + '). Sílaba tónica: ' + s.syl[s.tonic] + (s.rule && RULES[s.rule] ? '. ' + RULES[s.rule][0] + '.' : '.');
}
