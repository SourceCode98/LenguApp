// Escena 3D "gallery": galería del tiempo (ver lib/SPEC.md).
// Pasillo de museo con una sala por período: pared del color de la sala, cuadro con nombre y años, placa con etiquetas,
// escultura girando y cono de luz. `at` desplaza el recorrido hasta esa sala.
import { THREE, esc, reduce, three } from '../kit.js';

const D = 6.6;               // distancia entre salas
const PW = 4.3, PH = 2.55;   // cuadro
const SANS = '"IBM Plex Sans", system-ui, sans-serif';
const HEAD = '"Bricolage Grotesque", "IBM Plex Sans", system-ui, sans-serif';
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

function tex(w, h, draw, R) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = R ? Math.min(8, R.capabilities.getMaxAnisotropy()) : 4;
  const redraw = () => { const g = c.getContext('2d'); g.clearRect(0, 0, w, h); draw(g, w, h); t.needsUpdate = true; };
  redraw(); t.userData.redraw = redraw; return t;
}
const fitFont = (g, txt, weight, fam, max, maxW) => { let fs = max; do { g.font = weight + ' ' + fs + 'px ' + fam; if (g.measureText(txt).width <= maxW) break; fs -= 4; } while (fs > 20); return fs; };
function rr(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
const mix = (a, b, f) => new THREE.Color(a).lerp(new THREE.Color(b), f);

export default function (el) {
  const st = document.createElement('div'); st.className = 'stage sc-stage sc-3d sc-gallery';
  el.appendChild(st);
  const hint = document.createElement('span'); hint.className = 'hint sc-hint'; hint.textContent = 'Arrastra para mirar'; st.appendChild(hint);
  const tagEl = document.createElement('div'); tagEl.className = 'sc-tag'; st.appendChild(tagEl);
  let lastDrag = -1e9;
  const o = three(st, () => { hint.classList.add('sc-off'); lastDrag = performance.now(); });
  const hintT = setTimeout(() => hint.classList.add('sc-off'), 6000);
  const fb = document.createElement('div'); fb.className = 'sc-fb';
  if (!o) { st.appendChild(fb); hint.remove(); }
  const onMove = () => { lastDrag = performance.now(); };
  st.addEventListener('pointermove', onMove);

  let S = null, key = '', rooms = [], world = null, curX = 0, tgtX = 0, vel = 0, time = 0;
  const shared = {};

  function fallback() {
    const R = S.rooms || [], at = clamp(+S.at || 0, 0, Math.max(0, R.length - 1)), r = R[at] || {};
    fb.innerHTML = '<b>' + esc(r.n || '') + '</b> <span>' + esc(r.y || '') + '</span><br>' + esc((r.tags || []).join(' · '));
  }

  function wipe() { o.root.traverse((x) => { const m = x.material; if (m && m.map) m.map.dispose(); }); o.clear(); }

  function build() {
    wipe(); rooms = [];
    o.auto = false; o.rot.x = 0.1; o.rot.y = 0; o.zoom = 9.4;
    world = new THREE.Group(); o.root.add(world);
    const R = S.rooms || [];
    const n = Math.max(1, R.length);
    // luces propias
    const hemi = new THREE.HemisphereLight(0xbfd4ff, 0x10161c, 0.35); world.add(hemi);
    // piso y techo del pasillo
    const len = n * D + 14;
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(len, 6), new THREE.MeshStandardMaterial({ color: 0x151e26, roughness: 0.55, metalness: 0.25 }));
    floor.rotation.x = -Math.PI / 2; floor.position.set((n - 1) * D / 2, -2.05, 0.6); world.add(floor);
    // línea del tiempo en el piso
    const line = new THREE.Mesh(new THREE.BoxGeometry(len - 6, 0.02, 0.06), new THREE.MeshBasicMaterial({ color: 0xe7b460, transparent: true, opacity: 0.55 }));
    line.position.set((n - 1) * D / 2, -2.03, 1.7); world.add(line);
    shared.partGeo = new THREE.BoxGeometry(0.22, 4.4, 3.4);
    shared.partMat = new THREE.MeshStandardMaterial({ color: 0x1f2a34, roughness: 0.8 });
    shared.frameGeo = new THREE.BoxGeometry(PW + 0.28, PH + 0.28, 0.12);
    shared.frameMat = new THREE.MeshStandardMaterial({ color: 0xc9a45c, metalness: 0.75, roughness: 0.32 });
    shared.pedGeo = new THREE.CylinderGeometry(0.34, 0.4, 1.25, 24);
    shared.pedMat = new THREE.MeshStandardMaterial({ color: 0xd9dee3, roughness: 0.6 });
    shared.nodeGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.05, 24);
    shared.coneGeo = new THREE.ConeGeometry(1.9, 3.6, 32, 1, true);
    const sculpt = [new THREE.TorusKnotGeometry(0.28, 0.09, 90, 12), new THREE.IcosahedronGeometry(0.36, 0), new THREE.TorusGeometry(0.3, 0.1, 16, 40), new THREE.OctahedronGeometry(0.4, 0), new THREE.DodecahedronGeometry(0.36, 0), new THREE.ConeGeometry(0.32, 0.7, 5)];
    // un "brillo" radial para el piso bajo la luz
    const glowT = tex(128, 128, (g, w, h) => { const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64); gr.addColorStop(0, 'rgba(255,255,255,.9)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, w, h); });
    for (let i = 0; i <= n; i++) { const p = new THREE.Mesh(shared.partGeo, shared.partMat); p.position.set(i * D - D / 2, 0.15, -0.2); world.add(p); }
    R.forEach((r, i) => {
      const c = r.c || ['#8A4B6E', '#2E6F8C', '#B06A10', '#3F7D4A', '#6A4FB3', '#C0453A'][i % 6];
      const g = new THREE.Group(); g.position.x = i * D; world.add(g);
      const wallMat = new THREE.MeshStandardMaterial({ color: mix(c, '#141b22', 0.55), roughness: 0.9, emissive: new THREE.Color(c), emissiveIntensity: 0.05 });
      const wall = new THREE.Mesh(new THREE.BoxGeometry(D - 0.2, 4.4, 0.15), wallMat); wall.position.set(0, 0.15, -1.85); g.add(wall);
      // cuadro
      const frame = new THREE.Mesh(shared.frameGeo, shared.frameMat); frame.position.set(0, 0.55, -1.7); g.add(frame);
      const pt = tex(1024, Math.round(1024 * PH / PW), (x, w, h) => {
        const gr = x.createLinearGradient(0, 0, w, h); gr.addColorStop(0, c); gr.addColorStop(1, mix(c, '#0b1116', 0.6).getStyle());
        x.fillStyle = gr; x.fillRect(0, 0, w, h);
        x.globalAlpha = 0.12; x.fillStyle = '#fff'; for (let k = 0; k < 7; k++) { x.beginPath(); x.arc(w * (0.15 + k * 0.13), h * (0.95 - (k % 3) * 0.1), 60 + k * 14, 0, Math.PI * 2); x.fill(); } x.globalAlpha = 1;
        x.fillStyle = 'rgba(255,255,255,.75)'; x.font = '600 40px ' + SANS; x.textAlign = 'center'; x.fillText('SALA ' + (i + 1), w / 2, h * 0.2);
        const name = String(r.n || '');
        const fs = fitFont(x, name, 800, HEAD, 150, w - 90);
        x.fillStyle = '#fff'; x.font = '800 ' + fs + 'px ' + HEAD; x.shadowColor = 'rgba(0,0,0,.35)'; x.shadowBlur = 12; x.fillText(name, w / 2, h * 0.52 + fs * 0.3); x.shadowBlur = 0;
        const yrs = String(r.y || '');
        if (yrs) { x.font = '600 76px ' + SANS; const tw = x.measureText(yrs).width + 60; x.fillStyle = 'rgba(11,17,22,.55)'; rr(x, (w - tw) / 2, h * 0.7, tw, 104, 52); x.fill(); x.fillStyle = '#FFE7B0'; x.fillText(yrs, w / 2, h * 0.7 + 78); }
      }, o.R);
      const canvasP = new THREE.Mesh(new THREE.PlaneGeometry(PW, PH), new THREE.MeshBasicMaterial({ map: pt, toneMapped: false })); canvasP.position.set(0, 0.55, -1.63); g.add(canvasP);
      // placa de etiquetas
      const tags = (r.tags || []).slice(0, 5);
      let tagMesh = null;
      if (tags.length) {
        const tw = 1400, th = 170;
        const tt = tex(tw, th, (x, w, h) => {
          x.font = '600 62px ' + SANS;
          const pads = 36, gap = 22;
          let ws = tags.map((t) => x.measureText(t).width + pads * 2);
          let fs = 62; const total = () => ws.reduce((a, b) => a + b, 0) + gap * (ws.length - 1);
          while (total() > w - 20 && fs > 34) { fs -= 4; x.font = '600 ' + fs + 'px ' + SANS; ws = tags.map((t) => x.measureText(t).width + pads * 2); }
          let px = (w - total()) / 2;
          tags.forEach((t, k) => { x.fillStyle = 'rgba(11,17,22,.82)'; rr(x, px, 18, ws[k], h - 36, (h - 36) / 2); x.fill(); x.lineWidth = 5; x.strokeStyle = c; x.stroke(); x.fillStyle = '#F1F5F8'; x.textAlign = 'center'; x.fillText(t, px + ws[k] / 2, h / 2 + fs * 0.35); px += ws[k] + gap; });
        }, o.R);
        tagMesh = new THREE.Mesh(new THREE.PlaneGeometry(5.6, 5.6 * th / tw), new THREE.MeshBasicMaterial({ map: tt, transparent: true, toneMapped: false }));
        tagMesh.position.set(0, -1.28, -1.6); g.add(tagMesh);
      }
      // cono de luz y mancha en el piso
      const coneMat = new THREE.MeshBasicMaterial({ color: 0xfff1d0, transparent: true, opacity: 0.05, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
      const cone = new THREE.Mesh(shared.coneGeo, coneMat); cone.position.set(0, 1.0, -0.8); g.add(cone);
      const spotMat = new THREE.MeshBasicMaterial({ map: glowT, color: new THREE.Color(c), transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false });
      const spot = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 2.4), spotMat); spot.rotation.x = -Math.PI / 2; spot.position.set(0, -2.02, -0.3); g.add(spot);
      const lamp = new THREE.PointLight(new THREE.Color('#ffe9c4'), 0, 7, 1.6); lamp.position.set(0, 2.2, 0.2); g.add(lamp);
      // escultura en pedestal (lado derecho, delante)
      const ped = new THREE.Mesh(shared.pedGeo, shared.pedMat); ped.position.set(2.45, -1.42, 0.35); g.add(ped);
      const sMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(c).lerp(new THREE.Color('#ffffff'), 0.25), metalness: 0.35, roughness: 0.35, emissive: new THREE.Color(c), emissiveIntensity: 0.1, flatShading: i % 2 === 1 });
      const sc = new THREE.Mesh(sculpt[i % sculpt.length], sMat); sc.position.set(2.45, -0.4, 0.35); g.add(sc);
      // nodo en la línea del tiempo
      const node = new THREE.Mesh(shared.nodeGeo, new THREE.MeshBasicMaterial({ color: new THREE.Color(c) })); node.position.set(0, -2.02, 1.7); g.add(node);
      rooms.push({ g, wallMat, coneMat, spotMat, lamp, sc, sMat, node, a: 0 });
    });
    // motas de polvo en la luz
    const N = 70, pos = new Float32Array(N * 3);
    for (let k = 0; k < N; k++) { pos[k * 3] = (Math.random() - 0.5) * 3.2; pos[k * 3 + 1] = Math.random() * 4 - 2; pos[k * 3 + 2] = (Math.random() - 0.5) * 2 - 0.4; }
    const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const motes = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xfff1d0, size: 0.035, transparent: true, opacity: 0.45, depthWrite: false, blending: THREE.AdditiveBlending }));
    world.add(motes); shared.motes = motes;
    o.tick = tick;
  }

  function apply(dt) {
    const at = clamp(Math.round(+S.at || 0), 0, Math.max(0, rooms.length - 1));
    rooms.forEach((r, i) => {
      const on = i === at ? 1 : 0;
      r.a += (on - r.a) * (dt == null ? 1 : 1 - Math.exp(-dt * 4));
      r.coneMat.opacity = 0.01 + 0.03 * r.a;
      r.spotMat.opacity = 0.08 + 0.4 * r.a;
      r.lamp.intensity = 7 * r.a;
      r.wallMat.emissiveIntensity = 0.03 + 0.12 * r.a;
      r.sMat.emissiveIntensity = 0.05 + 0.25 * r.a;
    });
    if (shared.motes) shared.motes.position.x = at * D;
  }

  function tick(dt) {
    time += dt;
    // recorrido con resorte amortiguado
    const k = 16, c = 8;
    const acc = k * (tgtX - curX) - c * vel; vel += acc * dt; curX += vel * dt;
    world.position.x = -curX;
    world.position.y = -0.25 - Math.abs(Math.sin(time * 7)) * Math.min(0.05, Math.abs(vel) * 0.012);
    apply(dt);
    rooms.forEach((r, i) => { r.sc.rotation.y += dt * 0.6; r.sc.rotation.x = Math.sin(time * 0.7 + i) * 0.25; r.sc.position.y = -0.4 + Math.sin(time * 1.3 + i) * 0.05; });
    if (shared.motes) { const p = shared.motes.geometry.attributes.position; for (let j = 0; j < p.count; j++) { let y = p.getY(j) + dt * 0.12; if (y > 2.2) y = -2; p.setY(j, y); } p.needsUpdate = true; }
    // la vista vuelve sola a su sitio si nadie la toca
    if (performance.now() - lastDrag > 2500) {
      o.rot.x += (0.1 - o.rot.x) * (1 - Math.exp(-dt * 1.5));
      o.rot.y += (Math.sin(time * 0.25) * 0.07 - o.rot.y) * (1 - Math.exp(-dt * 1.5));
    }
    o.rot.x = clamp(o.rot.x, -0.25, 0.7); o.rot.y = clamp(o.rot.y, -1.0, 1.0);
  }

  function place(anim) {
    const R = S.rooms || [];
    const at = clamp(Math.round(+S.at || 0), 0, Math.max(0, R.length - 1));
    tgtX = at * D;
    if (!anim || reduce) { curX = tgtX; vel = 0; world.position.x = -curX; world.position.y = -0.25; apply(null); }
    const r = R[at] || {};
    tagEl.textContent = R.length ? 'Sala ' + (at + 1) + ' de ' + R.length + (r.y ? ' · ' + r.y : '') : 'Galería';
  }

  let alive = true;
  if (o && document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (!alive || !o) return; o.root.traverse((x) => { const m = x.material; if (m && m.map && m.map.userData.redraw) m.map.userData.redraw(); }); });

  return {
    set(state, prev) {
      const first = !S; S = state;
      if (!o) { fallback(); return; }
      const k = JSON.stringify(state.rooms || []);
      if (first || k !== key) { key = k; build(); place(false); }
      else place(true);
    },
    dispose() { alive = false; clearTimeout(hintT); st.removeEventListener('pointermove', onMove); if (o) { wipe(); o.dispose(); Object.values(shared).forEach((v) => { if (v && v.dispose) v.dispose(); }); } st.remove(); },
  };
}
