// Escena "textarch": arquitectura del texto. Pisos, columnas o pirámide según el tipo; quitar una pieza hace que la estructura se incline o caiga.
import { THREE, reduce, esc, world, canvasTex, fitText, rbox, mat, basic, GEO, damp, setAlpha, setDim, softShadow, clamp, easeOut, FH, FM, FB } from './lx-kit.js';

const KIND = {
  narrativo: ['Texto narrativo', 'floors'], expositivo: ['Texto expositivo', 'stack'], argumentativo: ['Texto argumentativo', 'temple'],
  noticia: ['Noticia', 'pyramid'], carta: ['Carta', 'stack'], ensayo: ['Ensayo', 'temple'], resena: ['Reseña', 'stack'],
};
const COLS = ['#4C9BE8', '#2EC4B6', '#FFC24B', '#FF7B5C', '#8F7CF0', '#EE5D8C', '#62C370'];
const lum = hex => { const c = new THREE.Color(hex); return .2126 * c.r + .7152 * c.g + .0722 * c.b; };
const pl = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

/** Parte un texto en líneas que caben en maxW. */
function wrap(x, text, maxW, maxLines) {
  const words = String(text).split(/\s+/).filter(Boolean); const lines = []; let cur = '';
  words.forEach(w => { const t = cur ? cur + ' ' + w : w; if (x.measureText(t).width <= maxW || !cur) cur = t; else { lines.push(cur); cur = w; } });
  if (cur) lines.push(cur);
  if (lines.length > maxLines) { const rest = lines.slice(maxLines - 1).join(' '); lines.length = maxLines - 1; lines.push(rest); }
  return lines;
}
/** Textura de una pieza: nombre (arriba, pequeño) y frase (una o dos líneas). */
function pieceTex(w, h, name, text, fg) {
  return canvasTex(w, h, (x, Wd, Hd) => {
    x.globalAlpha = .7; fitText(x, name.toUpperCase(), Wd / 2, Hd * (text ? .26 : .5), Wd - 20, Math.round(Math.min(Hd * (text ? .19 : .3), 46)), 600, text ? FM : FH, fg); x.globalAlpha = 1;
    if (!text) return;
    let size = Math.round(Math.min(Hd * .27, 64));
    x.font = '700 ' + size + 'px ' + FH;
    let lines = wrap(x, text, Wd - 24, 2);
    if (lines.length > 1) { size = Math.round(size * .82); x.font = '700 ' + size + 'px ' + FH; lines = wrap(x, text, Wd - 24, 2); }
    const y0 = Hd * .62 - (lines.length - 1) * size * .55;
    lines.forEach((l, i) => fitText(x, l, Wd / 2, y0 + i * size * 1.1, Wd - 20, size, 700, FH, fg));
  });
}

export default function (el) {
  const W = world(el, { pitch: .2, sway: .24 });
  const o = W.o;
  if (!o) return { set(s) { W.fb(describe(s)); }, dispose() { W.dispose(); } };
  const root = o.root;
  const ground = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.4, .16, 64), mat('#223241', { roughness: .85, clearcoat: .1 }));
  ground.position.y = -.08; root.add(ground);
  const sh = softShadow(10, 5, .5); sh.position.y = -.2; root.add(sh);

  let cur = null; const dying = [];
  let S = null;

  // Pieza: {g (pivote), mesh group, face, kind:'block'|'column'|'beam'|'base'|'roof', w,h, bx,by (base), out, tout, dim, tdim, glow}
  function mkBox(w, h, d, color, name, text) {
    const g = new THREE.Group();
    const body = new THREE.Mesh(rbox(w, h, d, .08), mat(color, { roughness: .5, clearcoat: .45, emissive: new THREE.Color(color), emissiveIntensity: 0 }));
    g.add(body);
    const fg = lum(color) > .5 ? '#17222C' : '#FFFFFF';
    const face = new THREE.Mesh(GEO.plane, basic({ map: pieceTex(w - .1, h - .08, name, text, fg) }));
    face.material.userData.noDW = true; face.scale.set(w - .1, h - .08, 1); face.position.z = d / 2 + .005; face.renderOrder = 2;
    g.add(face);
    return { g, body, face };
  }
  function mkColumn(hgt, name, text, color) {
    const g = new THREE.Group();
    const marble = mat('#EDE6D8', { roughness: .45, clearcoat: .4, emissive: new THREE.Color(color), emissiveIntensity: 0 });
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(.42, .48, hgt - .36, 28), marble); shaft.position.y = hgt / 2; g.add(shaft);
    const cap = new THREE.Mesh(rbox(1.2, .18, 1.2, .05), marble); cap.position.y = hgt - .09; g.add(cap);
    const foot = new THREE.Mesh(rbox(1.2, .18, 1.2, .05), marble); foot.position.y = .09; g.add(foot);
    const plaque = new THREE.Mesh(rbox(1.42, 1.05, .08, .06), mat(color, { roughness: .4, clearcoat: .6 }));
    plaque.position.set(0, hgt * .5, .52); g.add(plaque);
    const fg = lum(color) > .5 ? '#17222C' : '#FFFFFF';
    const face = new THREE.Mesh(GEO.plane, basic({ map: pieceTex(1.36, 1, name, text, fg) }));
    face.material.userData.noDW = true; face.scale.set(1.36, 1, 1); face.position.set(0, hgt * .5, .578); face.renderOrder = 2; g.add(face);
    return { g, body: shaft, face, extra: marble };
  }

  function build(s) {
    const G = new THREE.Group(); root.add(G);
    const mode = KIND[s.kind][1];
    const n = s.parts.length;
    const P = [];
    const add = (piece, i, kind, bx, by, w, h) => { G.add(piece.g); P.push(Object.assign(piece, { i, kind, bx, by, w, h, out: 0, tout: 0, dim: 1, tdim: 1, glow: 0, tglow: 0, rz: 0, trz: 0, dy: 0, tdy: 0, dx: 0, tdx: 0, app: 0, delay: i * .18 })); };
    let height = 0, width = 4.6;
    if (mode === 'temple') {
      const cols = n >= 3 ? s.parts.slice(1, n - 1) : s.parts.slice(1);
      const hasBase = n >= 3;
      const k = Math.max(1, cols.length), cw = 1.5, gap = .45;
      width = Math.max(4, k * cw + (k - 1) * gap + .8);
      const baseH = hasBase ? .8 : 0, colH = 2.3, beamH = 1;
      if (hasBase) { const b = mkBox(width + .3, baseH, 1.8, COLS[(n - 1) % COLS.length], s.parts[n - 1].n, s.parts[n - 1].t); b.g.position.y = baseH / 2; add(b, n - 1, 'base', 0, baseH / 2, width + .3, baseH); }
      cols.forEach((c, j) => {
        const x = -((k - 1) * (cw + gap)) / 2 + j * (cw + gap);
        const col = mkColumn(colH, c.n, c.t, COLS[(j + 1) % COLS.length]);
        add(col, j + 1, 'column', x, baseH, cw, colH);
      });
      const beam = mkBox(width, beamH, 1.7, COLS[0], s.parts[0].n, s.parts[0].t);
      add(beam, 0, 'beam', 0, baseH + colH + beamH / 2, width, beamH);
      // frontón
      const ped = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1.6, 3, 1), mat('#EDE6D8', { roughness: .5, clearcoat: .3 }));
      ped.rotation.set(-Math.PI / 2, 0, 0); ped.scale.set((width + .1) / 1.73, 1, .6);
      const pedG = new THREE.Group(); pedG.add(ped); ped.position.y = .3;
      add({ g: pedG, body: ped, face: null }, 0, 'roof', 0, baseH + colH + beamH, width, .8);
      height = baseH + colH + beamH + .85;
    } else {
      const fh = n > 4 ? .82 : 1, d = 1.8;
      let widths;
      if (mode === 'pyramid') { widths = s.parts.map((p, i) => 5 - i * Math.min(.8, 3 / Math.max(1, n - 1))); }
      else if (mode === 'floors') widths = s.parts.map(() => 4.4);
      else widths = s.parts.map(() => 4.6);
      width = Math.max(...widths);
      // orden físico de abajo hacia arriba
      const idx = mode === 'floors' ? s.parts.map((p, i) => i) : s.parts.map((p, i) => n - 1 - i);
      idx.forEach((pi, lvl) => {
        const p = s.parts[pi];
        const b = mkBox(widths[pi], fh - .04, d, COLS[pi % COLS.length], p.n, p.t);
        add(b, pi, 'block', 0, lvl * fh + fh / 2, widths[pi], fh);
        P[P.length - 1].lvl = lvl;
      });
      height = n * fh;
      if (mode === 'floors') {
        const rgeo = new THREE.ConeGeometry(3.3, 1.1, 4, 1); rgeo.rotateY(Math.PI / 4);
        const roof = new THREE.Mesh(rgeo, mat('#C85A3C', { roughness: .6, clearcoat: .3, flatShading: true }));
        roof.scale.set(1, 1, .4);
        const rg = new THREE.Group(); rg.add(roof); roof.position.y = .55;
        add({ g: rg, body: roof, face: null }, -1, 'roof', 0, height, 4.6, 1.1);
        P[P.length - 1].lvl = n;
        height += 1.15;
      }
    }
    P.forEach(p => { p.g.position.set(p.bx, p.by, 0); setAlpha(p.g, 0); });
    return { G, P, mode, key: s.kind + '|' + JSON.stringify(s.parts), height, width, a: 1, n };
  }

  function set(state, prev) {
    const s = normalize(state);
    S = s;
    W.fb(describe(state));
    const key = s.kind + '|' + JSON.stringify(s.parts);
    if (!cur || cur.key !== key) {
      if (cur) { cur.dying = true; dying.push(cur); }
      cur = build(s);
      if (!prev || reduce) cur.P.forEach(p => { p.app = 1; p.delay = 0; });
    }
    W.cap('<span class="sc-lx-sw" style="--c:#FFC24B"></span><b>' + esc(KIND[s.kind][0]) + '</b>');
    // derrumbe
    const R = s.remove;
    cur.P.forEach(p => {
      p.tout = R != null && p.i === R && p.kind !== 'roof' ? 1 : 0;
      if (p.kind === 'roof' && R === 0 && cur.mode === 'temple') p.tout = 1;
      p.trz = 0; p.tdy = 0; p.tdx = 0;
      p.tdim = s.focus != null && s.focus !== p.i ? .3 : 1;
      p.tglow = s.focus === p.i ? .3 : 0;
    });
    if (R != null && R >= 0 && R < s.parts.length) {
      if (cur.mode === 'temple') {
        const col = cur.P.find(p => p.i === R);
        if (col && col.kind === 'column') {
          const dir = col.bx <= 0 ? 1 : -1; // se inclina hacia el hueco
          cur.P.forEach(p => { if (p.kind === 'beam' || p.kind === 'roof') { p.trz = dir * .2; p.tdy = -.45; p.tdx = -dir * .25; } });
        } else if (col && col.kind === 'beam') {
          cur.P.forEach(p => { if (p.kind === 'column') { const dir = p.bx < 0 ? 1 : p.bx > 0 ? -1 : 1; p.trz = dir * .32; } });
        } else if (col && col.kind === 'base') {
          cur.P.forEach(p => { if (p.kind !== 'base') { p.tdy = -.8; p.trz = .12; } });
        }
      } else {
        const rem = cur.P.find(p => p.i === R);
        if (rem) cur.P.forEach(p => { if (p.lvl > rem.lvl) { const d = p.lvl - rem.lvl; p.trz = -.13 - d * .03; p.tdy = -rem.h * .72; p.tdx = .35 + d * .12; } });
      }
    }
    W.view({ dist: W.fit(cur.width + 2, cur.height + 1.4, 1.08), ty: cur.height / 2 - .1, pitch: .2 });
  }

  W.frame((dt, T, snap) => {
    const k = snap ? -1 : dt;
    const upd = (C, alive) => {
      let done = true;
      C.P.forEach(p => {
        if (alive) {
          if (p.delay > 0 && !snap) { p.delay -= dt; done = false; return; }
          p.app = snap ? 1 : Math.min(1, p.app + dt * 1.8);
        } else p.app = Math.max(0, p.app - (snap ? 1 : dt * 2.2));
        if (p.app > 0) done = false;
        p.out = damp(p.out, p.tout, p.tout ? 1.6 : 3, k);
        p.rz = damp(p.rz, p.trz, 2.2, k); p.dy = damp(p.dy, p.tdy, 2.2, k); p.dx = damp(p.dx, p.tdx, 2.2, k);
        p.dim = damp(p.dim, p.tdim, 4, k); p.glow = damp(p.glow, p.tglow, 4, k);
        const e = easeOut(p.app), o2 = p.out * p.out;
        const pivot = p.kind === 'column' ? 0 : 0;
        p.g.position.set(p.bx + p.dx + (p.kind === 'column' ? 0 : 0), p.by + p.dy - (1 - e) * 1.2 - o2 * 3.2 + pivot, p.out * 2.2);
        p.g.rotation.set(p.out * .9, 0, p.rz + p.out * .35 * (p.i % 2 ? 1 : -1));
        const wob = reduce || !p.trz ? 0 : Math.sin(T * 2.3 + p.i) * .008;
        p.g.rotation.z += wob;
        setAlpha(p.g, e * (1 - clamp(p.out * 1.25 - .25, 0, 1)));
        setDim(p.g, p.dim);
        if (p.body.material.emissive) p.body.material.emissiveIntensity = p.glow * (reduce ? 1 : .7 + .3 * Math.sin(T * 3));
      });
      return done;
    };
    if (cur) upd(cur, true);
    for (let i = dying.length - 1; i >= 0; i--) if (upd(dying[i], false)) { W.drop(dying[i].G); dying.splice(i, 1); }
  });

  return {
    set(state, prev) { set(state || {}, prev); },
    dispose() { W.dispose(); },
  };
}

function normalize(s) {
  s = s || {};
  let kind = pl(s.kind).replace(/[^a-z]/g, '');
  if (!KIND[kind]) kind = 'narrativo';
  let parts = (Array.isArray(s.parts) ? s.parts : []).slice(0, 7).map(p => ({ n: String((p && p.n) || ''), t: String((p && p.t) || '') }));
  if (!parts.length) parts = kind === 'narrativo' ? [{ n: 'Inicio', t: '' }, { n: 'Nudo', t: '' }, { n: 'Desenlace', t: '' }] : [{ n: 'Parte', t: '' }];
  const idx = v => (v === null || v === undefined || v === '' || isNaN(+v)) ? null : +v;
  return { kind, parts, focus: idx(s.focus), remove: idx(s.remove) };
}
function describe(s) {
  s = normalize(s);
  return KIND[s.kind][0] + ': ' + s.parts.map((p, i) => (s.remove === i ? '(falta) ' : '') + p.n + (p.t ? ' — ' + p.t : '')).join(' · ') + '.';
}
