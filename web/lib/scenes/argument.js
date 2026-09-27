// Escena 3D "argument": balanza argumentativa (ver lib/SPEC.md).
// La tesis arriba; cada ítem es un bloque que cae en el platillo de su lado ('pro' izquierda, 'con' derecha) y pesa w.
// La balanza oscila hasta equilibrarse. `reveal` sobre una falacia la desmorona y la balanza se reajusta.
// Antes de revelarse, una falacia se ve como "¿Argumento?".
import { THREE, esc, reduce, three } from '../kit.js';

const KIND = {
  arg: { n: 'Argumento', c: '#7FB2EA' },
  dato: { n: 'Dato', c: '#6FD19A' },
  ejemplo: { n: 'Ejemplo', c: '#E7B460' },
  contra: { n: 'Contraargumento', c: '#F0897F' },
  falacia: { n: 'Falacia', c: '#AE98EA' },
};
const SANS = '"IBM Plex Sans", system-ui, sans-serif';
const HEAD = '"Bricolage Grotesque", "IBM Plex Sans", system-ui, sans-serif';
const PIV = 1.45, ARM = 2.8, HANG = 2.8, BW = 2.6, BD = 0.75, YOKE = 0.34, CX = 1.42;
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

function tex(w, h, draw, R) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = R ? Math.min(8, R.capabilities.getMaxAnisotropy()) : 4;
  const redraw = () => { const g = c.getContext('2d'); g.clearRect(0, 0, w, h); draw(g, w, h); t.needsUpdate = true; };
  redraw(); t.userData.redraw = redraw; return t;
}
function rr(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
function wrap(g, text, maxW) {
  const words = String(text || '').split(/\s+/).filter(Boolean), lines = [];
  let cur = '';
  words.forEach((w) => { const t = cur ? cur + ' ' + w : w; if (g.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; });
  if (cur) lines.push(cur);
  return lines;
}
/** ajusta el tamaño de letra para que el texto quepa en maxLines */
function fitWrap(g, text, weight, fam, fs, minFs, maxW, maxLines) {
  let lines;
  for (;;) { g.font = weight + ' ' + fs + 'px ' + fam; lines = wrap(g, text, maxW); if (lines.length <= maxLines || fs <= minFs) break; fs -= 2; }
  if (lines.length > maxLines) { lines = lines.slice(0, maxLines); lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, '') + '…'; }
  return { lines, fs };
}

export default function (el) {
  const st = document.createElement('div'); st.className = 'stage sc-stage sc-3d sc-argument';
  el.appendChild(st);
  const hint = document.createElement('span'); hint.className = 'hint sc-hint'; hint.textContent = 'Arrastra para girar'; st.appendChild(hint);
  const tagEl = document.createElement('div'); tagEl.className = 'sc-tag'; st.appendChild(tagEl);
  const note = document.createElement('div'); note.className = 'legend sc-note sc-leg'; el.appendChild(note);
  let lastDrag = -1e9;
  const o = three(st, () => { hint.classList.add('sc-off'); lastDrag = performance.now(); });
  const hintT = setTimeout(() => hint.classList.add('sc-off'), 6000);
  const fb = document.createElement('div'); fb.className = 'sc-fb';
  if (!o) { st.appendChild(fb); hint.remove(); }
  const onMove = () => { lastDrag = performance.now(); };
  st.addEventListener('pointermove', onMove);

  let S = null, key = '', rig = null, beam = null, pans = {}, chains = null, blocks = [], frags = [], thesis = null, time = 0;
  let ang = 0, av = 0;
  const G = {};

  function wipe() {
    if (!o) return;
    const seen = new Set();
    o.root.traverse((x) => {
      const m = x.material;
      (Array.isArray(m) ? m : [m]).forEach((mm) => { if (mm && mm.map) mm.map.dispose(); if (Array.isArray(m) && mm && !seen.has(mm)) { seen.add(mm); mm.dispose(); } });
      if (Array.isArray(m)) x.material = null; // kit.clear() no maneja arreglos de materiales
    });
    o.clear();
  }

  function build() {
    wipe(); blocks = []; frags = [];
    o.auto = false; o.rot.x = 0.08; o.rot.y = 0; o.zoom = 10;
    rig = new THREE.Group(); rig.position.y = -0.55; o.root.add(rig);
    const brass = new THREE.MeshStandardMaterial({ color: 0xc9a45c, metalness: 0.8, roughness: 0.3 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x2a3844, metalness: 0.3, roughness: 0.6 });
    G.brass = brass; G.dark = dark;
    // base y poste
    const base = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.2, 0.22, 40), dark); base.position.y = -2.45; rig.add(base);
    const base2 = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.7, 0.18, 40), brass); base2.position.y = -2.25; rig.add(base2);
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, PIV + 2.25, 20), brass); post.position.y = (PIV - 2.25) / 2; rig.add(post);
    // sombra suave
    const shT = tex(128, 128, (g, w, h) => { const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64); gr.addColorStop(0, 'rgba(0,0,0,.55)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(0, 0, w, h); });
    const sh = new THREE.Mesh(new THREE.PlaneGeometry(9, 2.2), new THREE.MeshBasicMaterial({ map: shT, transparent: true, depthWrite: false })); sh.rotation.x = -Math.PI / 2; sh.position.y = -2.56; rig.add(sh);
    // brazo
    beam = new THREE.Group(); beam.position.y = PIV; rig.add(beam);
    const bar = new THREE.Mesh(new THREE.BoxGeometry(ARM * 2 + 0.3, 0.13, 0.13), brass); beam.add(bar);
    [-1, 1].forEach((s) => { const cap = new THREE.Mesh(new THREE.SphereGeometry(0.13, 20, 14), brass); cap.position.x = s * ARM; beam.add(cap); });
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.2, 28), dark); hub.rotation.x = Math.PI / 2; beam.add(hub);
    const needle = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.8, 12), new THREE.MeshBasicMaterial({ color: 0xffe08a })); needle.position.y = 0.45; beam.add(needle);
    const top = new THREE.Mesh(new THREE.SphereGeometry(0.14, 20, 14), brass); top.position.y = PIV + 0.02; rig.add(top);
    // platillos
    G.panGeo = new THREE.CylinderGeometry(1.35, 1.2, 0.09, 48);
    G.rimGeo = new THREE.TorusGeometry(1.35, 0.035, 8, 64);
    ['pro', 'con'].forEach((side) => {
      const s = side === 'pro' ? -1 : 1;
      const g = new THREE.Group(); rig.add(g);
      const pan = new THREE.Mesh(G.panGeo, brass); g.add(pan);
      const rim = new THREE.Mesh(G.rimGeo, brass); rim.rotation.x = Math.PI / 2; rim.position.y = 0.04; g.add(rim);
      const col = side === 'pro' ? '#6FD19A' : '#F0897F';
      const lt = tex(512, 112, (x, w, h) => { x.fillStyle = 'rgba(11,17,22,.85)'; rr(x, 4, 4, w - 8, h - 8, (h - 8) / 2); x.fill(); x.lineWidth = 6; x.strokeStyle = col; x.stroke(); x.fillStyle = col; x.font = '800 58px ' + HEAD; x.textAlign = 'center'; x.fillText(side === 'pro' ? 'A favor' : 'En contra', w / 2, h / 2 + 20); }, o.R);
      const lab = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.7 * 112 / 512), new THREE.MeshBasicMaterial({ map: lt, transparent: true, toneMapped: false }));
      lab.position.set(0, -0.36, 1.1); g.add(lab);
      pans[side] = { g, s, w: 0 };
    });
    // cadenas (3 por platillo)
    // colgadores: varilla, yugo y dos cadenas verticales por fuera de la pila de bloques
    const rodG = new THREE.BoxGeometry(0.05, YOKE, 0.05), yokeG = new THREE.BoxGeometry(CX * 2 + 0.08, 0.06, 0.06), chG = new THREE.BoxGeometry(0.035, HANG - YOKE, 0.035);
    const chM = new THREE.MeshStandardMaterial({ color: 0xd9c08a, metalness: 0.7, roughness: 0.35 });
    chains = {};
    ['pro', 'con'].forEach((side) => { const set = [new THREE.Mesh(rodG, brass), new THREE.Mesh(yokeG, brass), new THREE.Mesh(chG, chM), new THREE.Mesh(chG, chM)]; set.forEach((m) => rig.add(m)); chains[side] = set; });
    // tesis
    const th = String(S.thesis || '');
    const tw = 1400, thH = 260;
    const tt = tex(tw, thH, (x, w, h) => {
      x.fillStyle = 'rgba(14,22,30,.93)'; rr(x, 4, 4, w - 8, h - 8, 36); x.fill(); x.lineWidth = 6; x.strokeStyle = '#E7B460'; x.stroke();
      x.fillStyle = '#E7B460'; x.font = '700 38px ' + SANS; x.textAlign = 'center'; x.fillText('TESIS', w / 2, 58);
      const { lines, fs } = fitWrap(x, th, 700, HEAD, 74, 44, w - 90, 2);
      x.fillStyle = '#fff'; x.font = '700 ' + fs + 'px ' + HEAD;
      const lh = fs * 1.15, y0 = 70 + (h - 70 - lines.length * lh) / 2 + fs * 0.85;
      lines.forEach((l, i) => x.fillText(l, w / 2, y0 + i * lh));
    }, o.R);
    thesis = new THREE.Mesh(new THREE.PlaneGeometry(6.6, 6.6 * thH / tw), new THREE.MeshBasicMaterial({ map: tt, transparent: true, toneMapped: false }));
    thesis.position.set(0, PIV + 1.5, 0.1); rig.add(thesis);
    // bloques
    (S.items || []).forEach((it, i) => blocks.push(makeBlock(it, i)));
    o.tick = tick;
  }

  function makeBlock(it, i) {
    const kind = KIND[it.kind] ? it.kind : 'arg';
    const w = clamp(Math.round(+it.w || 1), 1, 3);
    const bh = 0.58 + 0.1 * w;
    const side = it.side === 'con' ? 'con' : 'pro';
    const K = KIND[kind];
    const draw = (revealed) => (x, W, H) => {
      const c = kind === 'falacia' && !revealed ? '#8C7CC9' : K.c;
      const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, c); gr.addColorStop(1, new THREE.Color(c).lerp(new THREE.Color('#0b1116'), 0.35).getStyle());
      x.fillStyle = gr; x.fillRect(0, 0, W, H);
      x.fillStyle = 'rgba(11,17,22,.8)'; x.font = '700 26px ' + SANS;
      const lab = kind === 'falacia' ? (revealed ? '¡FALACIA!' : '¿ARGUMENTO?') : K.n.toUpperCase();
      const lw = x.measureText(lab).width + 24; rr(x, 12, 10, lw, 36, 18); x.fill();
      x.fillStyle = c; x.textAlign = 'left'; x.fillText(lab, 24, 37);
      // peso
      for (let k = 0; k < 3; k++) { x.beginPath(); x.arc(W - 28 - k * 26, 28, 9, 0, Math.PI * 2); x.fillStyle = k < w ? 'rgba(11,17,22,.85)' : 'rgba(11,17,22,.25)'; x.fill(); }
      const { lines, fs } = fitWrap(x, it.t, 700, SANS, 56, 30, W - 32, H > 200 ? 3 : 2);
      x.fillStyle = '#0B1116'; x.font = '700 ' + fs + 'px ' + SANS;
      const lh = fs * 1.1, y0 = 50 + (H - 50 - lines.length * lh) / 2 + fs * 0.8;
      lines.forEach((l, k) => x.fillText(l, 16, y0 + k * lh));
    };
    const Wt = 640, Ht = Math.round(640 * bh / BW);
    const ft = tex(Wt, Ht, draw(false), o.R);
    const sideMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(K.c).lerp(new THREE.Color('#0b1116'), 0.3), roughness: 0.55 });
    const topMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(K.c), roughness: 0.5 });
    const front = new THREE.MeshBasicMaterial({ map: ft, toneMapped: false });
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(BW, bh, BD), [sideMat, sideMat, topMat, sideMat, front, sideMat]);
    pans[side].g.add(mesh);
    return { it, i, kind, w, bh, side, mesh, ft, draw, sideMat, y: 6, vy: 0, delay: 0, landed: false, gone: false, rev: false, rot: (Math.random() - 0.5) * 0.12 };
  }

  function targets() {
    const acc = { pro: 0.05, con: 0.05 };
    blocks.forEach((b) => { if (b.gone) return; b.ty = acc[b.side] + b.bh / 2; acc[b.side] += b.bh + 0.02; });
  }
  function weights() {
    const w = { pro: 0, con: 0 };
    blocks.forEach((b) => { if (!b.gone && b.landed) w[b.side] += b.w; });
    return w;
  }
  function pose() {
    beam.rotation.z = ang;
    ['pro', 'con'].forEach((side) => {
      const P = pans[side];
      const ex = P.s * ARM * Math.cos(ang), ey = PIV + P.s * ARM * Math.sin(ang);
      P.g.position.set(ex, ey - HANG, 0);
      P.g.rotation.z = Math.sin(time * 1.1 + P.s) * 0.012 - av * 0.05;
      const [rod, yoke, c1, c2] = chains[side];
      rod.position.set(ex, ey - YOKE / 2, 0); yoke.position.set(ex, ey - YOKE, 0);
      const cy = ey - YOKE - (HANG - YOKE) / 2;
      c1.position.set(ex - CX, cy, 0); c2.position.set(ex + CX, cy, 0);
    });
  }
  function tgtAngle() { const w = weights(); return clamp((w.pro - w.con) * 0.06, -0.22, 0.22); }

  function tick(dt) {
    time += dt;
    // bloques que caen
    blocks.forEach((b) => {
      if (b.gone) return;
      if (b.delay > 0) { b.delay -= dt; b.mesh.visible = false; return; }
      b.mesh.visible = true;
      if (b.y > b.ty + 0.001 || Math.abs(b.vy) > 0.01) {
        b.vy -= 22 * dt; b.y += b.vy * dt;
        if (b.y <= b.ty) { b.y = b.ty; if (b.vy < -2.5) { b.vy = -b.vy * 0.28; if (!b.landed) { b.landed = true; av += (b.side === 'pro' ? 1 : -1) * 0.25 * b.w; } } else { b.vy = 0; b.landed = true; } }
      }
      b.mesh.position.set(b.rev ? Math.sin(time * 55) * 0.035 : 0, b.y, 0.05);
      b.mesh.rotation.y = b.rot * (b.landed ? 1 : 3);
    });
    // brazo con resorte subamortiguado
    const aT = tgtAngle();
    av += (26 * (aT - ang) - 3.2 * av) * dt; ang += av * dt;
    pose();
    // fragmentos de falacia
    frags = frags.filter((f) => {
      f.t += dt; f.v.y -= 9 * dt; f.m.position.addScaledVector(f.v, dt); f.m.rotation.x += f.r.x * dt; f.m.rotation.y += f.r.y * dt;
      f.m.material.opacity = clamp(1.6 - f.t, 0, 1);
      if (f.t > 1.6) { rig.remove(f.m); f.m.material.dispose(); return false; }
      return true;
    });
    thesis.position.y = PIV + 1.5 + Math.sin(time * 1.2) * 0.04;
    if (performance.now() - lastDrag > 2500) { o.rot.x += (0.08 - o.rot.x) * (1 - Math.exp(-dt * 1.5)); o.rot.y += (Math.sin(time * 0.3) * 0.12 - o.rot.y) * (1 - Math.exp(-dt * 1.5)); }
    o.rot.x = clamp(o.rot.x, -0.3, 0.8);
    status();
  }

  function crumble(b) {
    b.gone = true; b.mesh.visible = false;
    if (reduce) return;
    const wp = new THREE.Vector3(); b.mesh.getWorldPosition(wp); rig.worldToLocal(wp);
    const geo = G.fragGeo || (G.fragGeo = new THREE.BoxGeometry(0.26, 0.2, 0.22));
    for (let k = 0; k < 14; k++) {
      const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: new THREE.Color(KIND.falacia.c).offsetHSL(0, 0, (Math.random() - 0.5) * 0.2), transparent: true, roughness: 0.6 }));
      m.position.set(wp.x + (Math.random() - 0.5) * BW * 0.9, wp.y + (Math.random() - 0.5) * b.bh, wp.z + (Math.random() - 0.5) * 0.5);
      const sc = 0.5 + Math.random() * 0.9; m.scale.set(sc, sc, sc);
      rig.add(m);
      frags.push({ m, t: 0, v: new THREE.Vector3((Math.random() - 0.5) * 2.5, Math.random() * 2.2, (Math.random() - 0.2) * 1.8), r: new THREE.Vector3(Math.random() * 6, Math.random() * 6, 0) });
    }
    // los de arriba caen a su nuevo sitio
    blocks.forEach((x) => { if (!x.gone && x.side === b.side) x.vy = Math.min(x.vy, -0.01); });
  }

  function status() {
    const w = weights();
    const t = 'Peso: a favor ' + w.pro + ' · en contra ' + w.con;
    if (tagEl.textContent !== t) tagEl.textContent = t;
    const sp = note.querySelector('.sc-ar-w'); if (sp && sp.textContent !== t) sp.textContent = t;
  }

  function apply(prev, anim) {
    const items = S.items || [];
    // bloques nuevos caen en orden; los que ya estaban se quedan
    const had = prev && prev.items && JSON.stringify(prev.items) === JSON.stringify(items) ? items.length : prev && prev.items ? Math.min(prev.items.length, items.length) : 0;
    targets();
    let dl = 0;
    blocks.forEach((b, i) => {
      if (b.placed) return;
      b.placed = true;
      if (!anim || reduce || i < had) { b.y = b.ty; b.vy = 0; b.landed = true; b.mesh.position.set(0, b.y, 0.05); }
      else { b.y = b.ty + 4.2; b.vy = 0; b.delay = dl; dl += 0.35; }
    });
    // falacia revelada
    const rv = S.reveal != null ? +S.reveal : null;
    blocks.forEach((b) => {
      if (b.kind !== 'falacia') return;
      const want = rv === b.i;
      if (want && !b.rev) {
        b.rev = true;
        b.ft.userData.redraw = () => {}; // evita redibujar con la fuente cargada después
        const c = b.ft.image.getContext('2d'); c.clearRect(0, 0, b.ft.image.width, b.ft.image.height); b.draw(true)(c, b.ft.image.width, b.ft.image.height); b.ft.needsUpdate = true;
        b.sideMat.color.set('#6a5a9e');
        if (anim && !reduce) { b.crumbleAt = 0.9; setTimeout(() => { if (alive && b.rev && !b.gone) { crumble(b); targets(); } }, 900); }
        else { crumble(b); }
      } else if (!want && b.rev) {
        // volver atrás: reaparece
        b.rev = false; b.gone = false; b.mesh.visible = true; b.landed = true;
        const c = b.ft.image.getContext('2d'); c.clearRect(0, 0, b.ft.image.width, b.ft.image.height); b.draw(false)(c, b.ft.image.width, b.ft.image.height); b.ft.needsUpdate = true;
      }
    });
    targets();
    blocks.forEach((b) => { if (!anim || reduce) { if (!b.gone) { b.y = b.ty; b.vy = 0; b.mesh.position.set(0, b.y, 0.05); b.mesh.visible = true; } } });
    if (!anim || reduce) { ang = tgtAngle(); av = 0; pose(); }
    status();
    // leyenda
    const kinds = [...new Set(items.map((it) => (KIND[it.kind] ? it.kind : 'arg')))];
    note.innerHTML = '<span class="sc-ar-w"></span>' + kinds.map((k) => '<span><i class="dot" style="background:' + KIND[k].c + '"></i>' + (k === 'falacia' && rv == null ? '¿Argumento?' : KIND[k].n) + '</span>').join('');
    status();
  }

  function fallback() {
    const items = S.items || [];
    const li = (side) => items.filter((x) => (x.side === 'con' ? 'con' : 'pro') === side).map((x) => '<li>' + esc(x.t) + ' <small>(' + (KIND[x.kind] || KIND.arg).n + ', peso ' + (x.w || 1) + ')</small></li>').join('');
    fb.innerHTML = '<b>Tesis:</b> ' + esc(S.thesis || '') + '<div class="sc-fb-cols"><div><b>A favor</b><ul>' + li('pro') + '</ul></div><div><b>En contra</b><ul>' + li('con') + '</ul></div></div>';
  }

  let alive = true;
  if (o && document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (!alive) return; o.root.traverse((x) => { (Array.isArray(x.material) ? x.material : [x.material]).forEach((m) => { if (m && m.map && m.map.userData.redraw) m.map.userData.redraw(); }); }); });

  return {
    set(state, prev) {
      const first = !S; S = state;
      if (!o) { fallback(); return; }
      const k = JSON.stringify(state.thesis);
      const itemsChanged = prev && JSON.stringify((prev.items || []).slice(0, (state.items || []).length)) !== JSON.stringify((state.items || []).slice(0, (prev.items || []).length));
      if (first || k !== key || itemsChanged) { key = k; build(); apply(first ? null : prev, true); return; }
      // ítems nuevos agregados al final
      const items = state.items || [];
      if (items.length > blocks.length) for (let i = blocks.length; i < items.length; i++) blocks.push(makeBlock(items[i], i));
      else if (items.length < blocks.length) { blocks.splice(items.length).forEach((b) => { b.mesh.parent.remove(b.mesh); b.ft.dispose(); }); }
      apply(prev, true);
    },
    dispose() { alive = false; clearTimeout(hintT); st.removeEventListener('pointermove', onMove); if (o) { wipe(); o.dispose(); } st.remove(); note.remove(); },
  };
}
