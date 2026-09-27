// Escena 3D "levels": tres niveles de lectura (ver lib/SPEC.md).
// Tres láminas translúcidas apiladas en profundidad: Literal (con el texto), Inferencial y Crítico, cada una con su pestaña.
// La capa activa se separa, pasa al frente como un lente de color y brilla; encima aparece la pregunta.
// `evidence` se resalta en el texto y un hilo de luz lo une con la pregunta.
import { THREE, esc, reduce, three } from '../kit.js';

const LAYERS = [
  { id: 'literal', n: 'Literal', c: '#7FB2EA', d: '¿Qué dice el texto?' },
  { id: 'inferencial', n: 'Inferencial', c: '#AE98EA', d: '¿Qué quiere decir?' },
  { id: 'critico', n: 'Crítico', c: '#E7B460', d: '¿Qué opino y por qué?' },
];
const SANS = '"IBM Plex Sans", system-ui, sans-serif';
const HEAD = '"Bricolage Grotesque", "IBM Plex Sans", system-ui, sans-serif';
const SERIF = 'Literata, Georgia, serif';
const PW = 7.3, PH = 3.55, PY = -0.95;           // lámina
const REST = [[0, 0, 0], [0.28, 0.32, -0.5], [0.56, 0.64, -1.0]];
const TABX = [-2.45, 0, 2.45], TW = 2.2, TH = 0.5;
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const norm = (c) => c.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function tex(w, h, draw, R) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = R ? Math.min(8, R.capabilities.getMaxAnisotropy()) : 4;
  t.userData.draw = draw;
  const redraw = () => { const g = c.getContext('2d'); g.clearRect(0, 0, w, h); t.userData.draw(g, w, h); t.needsUpdate = true; };
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
/** rango [ini, fin) de la evidencia dentro del texto, sin distinguir tildes ni mayúsculas */
function findEvidence(text, ev) {
  if (!ev) return null;
  const T = Array.from(text).map(norm).join(''), E = Array.from(String(ev).trim()).map(norm).join('').replace(/^["'«“]+|["'»”.]+$/g, '');
  if (!E) return null;
  const i = T.indexOf(E);
  return i >= 0 ? [i, i + E.length] : null;
}

export default function (el) {
  const st = document.createElement('div'); st.className = 'stage sc-stage sc-3d sc-levels';
  el.appendChild(st);
  const hint = document.createElement('span'); hint.className = 'hint sc-hint'; hint.textContent = 'Arrastra para girar'; st.appendChild(hint);
  let lastDrag = -1e9;
  const o = three(st, () => { hint.classList.add('sc-off'); lastDrag = performance.now(); });
  const hintT = setTimeout(() => hint.classList.add('sc-off'), 6000);
  const fb = document.createElement('div'); fb.className = 'sc-fb';
  if (!o) { st.appendChild(fb); hint.remove(); }
  const onMove = () => { lastDrag = performance.now(); };
  st.addEventListener('pointermove', onMove);

  let S = null, built = false, time = 0, active = -1, evRect = null, cardK = 0, cardT = 0;
  const P = [];            // láminas {g, mat, edge, glow, a, ta}
  let pageTex = null, card = null, cardTex = null, beam = null, dots = null, motes = null, stack = null;

  function wipe() { if (!o) return; o.root.traverse((x) => { const m = x.material; if (m && m.map) m.map.dispose(); }); o.clear(); P.length = 0; }

  function drawPage(g, w, h) {
    const text = String(S.text || '');
    // lámina de vidrio oscuro
    g.fillStyle = 'rgba(16,26,36,.9)'; rr(g, 3, 3, w - 6, h - 6, 34); g.fill();
    g.lineWidth = 5; g.strokeStyle = 'rgba(127,178,234,.9)'; g.stroke();
    const pad = 58, maxW = w - pad * 2, maxH = h - pad * 2 + 10;
    let fs = 78, lines, lh;
    for (;;) { g.font = '400 ' + fs + 'px ' + SERIF; lines = layout(g, text, maxW); lh = fs * 1.42; if (lines.length * lh <= maxH || fs <= 28) break; fs -= 2; }
    const ev = findEvidence(text, S.evidence);
    const y0 = pad + (maxH - lines.length * lh) / 2 + fs * 0.95 - 6;
    evRect = null;
    // resaltado de la evidencia (detrás del texto)
    if (ev) {
      const boxes = [];
      lines.forEach((L, li) => {
        let a = null, b = null;
        L.toks.forEach((t) => { if (t.e > ev[0] && t.s < ev[1]) { if (a == null) a = t.x; b = t.x + t.w; } });
        if (a != null) boxes.push([pad + a - 8, y0 + li * lh - fs * 0.98, b - a + 16, fs * 1.28]);
      });
      g.fillStyle = 'rgba(231,180,96,.34)';
      boxes.forEach(([x, y, bw, bh]) => { rr(g, x, y, bw, bh, 10); g.fill(); });
      g.fillStyle = '#E7B460';
      boxes.forEach(([x, y, bw, bh]) => { g.fillRect(x + 4, y + bh - 5, bw - 8, 5); });
      if (boxes.length) { const b0 = boxes[0]; evRect = { x: (b0[0] + b0[2] / 2) / w, y: b0[1] / h }; }
    }
    g.textAlign = 'left';
    lines.forEach((L, li) => {
      L.toks.forEach((t) => {
        const on = ev && t.e > ev[0] && t.s < ev[1];
        g.font = '400 ' + fs + 'px ' + SERIF;
        g.fillStyle = on ? '#FFF3D6' : '#E6ECF1';
        g.fillText(t.t, pad + t.x, y0 + li * lh);
      });
    });
  }
  /** reparte palabras en renglones guardando posición y rango de caracteres */
  function layout(g, text, maxW) {
    const toks = []; const re = /\S+/g; let m;
    while ((m = re.exec(text))) toks.push({ t: m[0], s: m.index, e: m.index + m[0].length, w: g.measureText(m[0]).width });
    const sp = g.measureText(' ').width, lines = []; let cur = { toks: [], w: 0 };
    toks.forEach((t) => { const nw = cur.toks.length ? cur.w + sp + t.w : t.w; if (nw > maxW && cur.toks.length) { lines.push(cur); cur = { toks: [], w: 0 }; } t.x = cur.toks.length ? cur.w + sp : 0; cur.w = t.x + t.w; cur.toks.push(t); });
    if (cur.toks.length) lines.push(cur);
    return lines;
  }
  function drawGlass(L) {
    return (g, w, h) => {
      const c = new THREE.Color(L.c);
      const rgb = Math.round(c.r * 255) + ',' + Math.round(c.g * 255) + ',' + Math.round(c.b * 255);
      g.fillStyle = 'rgba(' + rgb + ',.10)'; rr(g, 3, 3, w - 6, h - 6, 34); g.fill();
      const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, 'rgba(' + rgb + ',.20)'); gr.addColorStop(0.25, 'rgba(' + rgb + ',0)'); gr.addColorStop(1, 'rgba(' + rgb + ',.10)');
      g.fillStyle = gr; rr(g, 3, 3, w - 6, h - 6, 34); g.fill();
      g.lineWidth = 6; g.strokeStyle = 'rgba(' + rgb + ',.95)'; rr(g, 3, 3, w - 6, h - 6, 34); g.stroke();
    };
  }
  function drawTab(L, i) {
    return (g, w, h) => {
      g.fillStyle = L.c; g.beginPath(); g.moveTo(0, h); g.lineTo(18, 14); g.arcTo(22, 0, 60, 0, 22); g.lineTo(w - 40, 0); g.arcTo(w - 22, 0, w - 18, 14, 22); g.lineTo(w, h); g.closePath(); g.fill();
      g.fillStyle = '#0E161C'; g.font = '800 64px ' + HEAD; g.textAlign = 'center'; g.fillText((i + 1) + ' · ' + L.n, w / 2, h * 0.72);
    };
  }
  function drawCard(g, w, h) {
    const L = LAYERS[cardK] || { n: 'Pregunta', c: '#9AA8B3' };
    g.fillStyle = 'rgba(11,17,22,.94)'; rr(g, 4, 4, w - 8, h - 8, 30); g.fill();
    g.lineWidth = 6; g.strokeStyle = L.c; g.stroke();
    g.fillStyle = L.c; g.font = '700 38px ' + SANS; g.textAlign = 'left';
    g.fillText(cardK >= 0 ? 'NIVEL ' + L.n.toUpperCase() + ' · ' + L.d.toUpperCase() : 'PREGUNTA', 40, 58);
    const q = String(S.q || (cardK >= 0 ? L.d : ''));
    let fs = 60, lines;
    for (;;) { g.font = '700 ' + fs + 'px ' + HEAD; lines = wrap(g, q, w - 80); if (lines.length <= 2 || fs <= 36) break; fs -= 2; }
    if (lines.length > 2) { lines = lines.slice(0, 2); lines[1] = lines[1].replace(/\s*\S*$/, '') + '…'; }
    g.fillStyle = '#fff';
    const lh = fs * 1.15, y0 = 70 + (h - 70 - lines.length * lh) / 2 + fs * 0.82;
    lines.forEach((l, i) => g.fillText(l, 40, y0 + i * lh));
  }

  function build() {
    wipe();
    o.auto = false; o.rot.x = 0.12; o.rot.y = -0.12; o.zoom = 9.6;
    stack = new THREE.Group(); stack.position.y = -0.35; o.root.add(stack);
    const geo = new THREE.PlaneGeometry(PW, PH);
    const tabGeo = new THREE.PlaneGeometry(TW, TH);
    // halo detrás de la capa activa
    const haloT = tex(256, 128, (g, w, h) => { const gr = g.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, w / 2); gr.addColorStop(0, 'rgba(255,255,255,.55)'); gr.addColorStop(0.6, 'rgba(255,255,255,.18)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, w, h); });
    LAYERS.forEach((L, i) => {
      const g = new THREE.Group(); stack.add(g);
      const t = i === 0 ? (pageTex = tex(1400, Math.round(1400 * PH / PW), drawPage, o.R)) : tex(700, Math.round(700 * PH / PW), drawGlass(L), o.R);
      const mat = new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, toneMapped: false, side: THREE.DoubleSide });
      const m = new THREE.Mesh(geo, mat); m.position.y = PY; m.renderOrder = 10 - i; g.add(m);
      const tt = tex(512, 116, drawTab(L, i), o.R);
      const tab = new THREE.Mesh(tabGeo, new THREE.MeshBasicMaterial({ map: tt, transparent: true, toneMapped: false, depthWrite: false })); tab.position.set(TABX[i], PY + PH / 2 + TH / 2 - 0.01, 0); tab.renderOrder = 10 - i; g.add(tab);
      const glow = new THREE.Mesh(new THREE.PlaneGeometry(PW * 1.25, PH * 1.5), new THREE.MeshBasicMaterial({ map: haloT, color: new THREE.Color(L.c), transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
      glow.position.set(0, PY, -0.05); glow.renderOrder = 0; g.add(glow);
      P.push({ g, m, mat, tab, glow, a: 0 });
    });
    // tarjeta de la pregunta
    cardTex = tex(1400, 250, drawCard, o.R);
    card = new THREE.Mesh(new THREE.PlaneGeometry(PW, PW * 250 / 1400), new THREE.MeshBasicMaterial({ map: cardTex, transparent: true, toneMapped: false, depthWrite: false }));
    card.renderOrder = 20; stack.add(card);
    // hilo de luz evidencia -> pregunta
    beam = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: 0xffe08a, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
    beam.renderOrder = 21; stack.add(beam);
    const dg = new THREE.SphereGeometry(0.07, 16, 12);
    dots = [0, 1].map(() => { const d = new THREE.Mesh(dg, new THREE.MeshBasicMaterial({ color: 0xffe08a, transparent: true, opacity: 0, depthWrite: false })); d.renderOrder = 22; stack.add(d); return d; });
    // motas
    const N = 46, pos = new Float32Array(N * 3);
    for (let k = 0; k < N; k++) { pos[k * 3] = (Math.random() - 0.5) * PW; pos[k * 3 + 1] = PY + (Math.random() - 0.5) * PH; pos[k * 3 + 2] = -1.2 + Math.random() * 1.8; }
    const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    motes = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xffffff, size: 0.04, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending }));
    stack.add(motes);
    built = true;
    o.tick = tick;
  }

  const V1 = new THREE.Vector3(), V2 = new THREE.Vector3();
  function pose(dt) {
    const f = dt == null ? 1 : 1 - Math.exp(-dt * 4.5);
    P.forEach((p, i) => {
      const ta = i === active ? 1 : 0;
      p.a += (ta - p.a) * f;
      const e = ease(clamp(p.a, 0, 1)), r = REST[i];
      // la capa activa pasa al frente (delante del texto), un poco levantada
      const front = i === 0 ? [0, 0.12, 0.35] : [0, 0.12, 0.62];
      const bob = dt == null ? 0 : Math.sin(time * 1.1 + i * 1.7) * 0.025;
      p.g.position.set(r[0] + (front[0] - r[0]) * e, r[1] + (front[1] - r[1]) * e + bob, r[2] + (front[2] - r[2]) * e);
      const dim = active >= 0 && i !== active ? 0.5 : 1;
      p.mat.opacity = (i === 0 ? 1 : 0.55 + 0.45 * e) * (i === 0 ? 1 : dim);
      p.tab.material.opacity = dim;
      p.glow.material.opacity = e * (0.55 + (dt == null ? 0 : 0.15 * Math.sin(time * 2.4)));
      // las láminas que pasan al frente se dibujan después del texto
      p.m.renderOrder = i === 0 ? 10 : e > 0.5 ? 15 : 10 - i; p.tab.renderOrder = p.m.renderOrder;
    });
    // tarjeta
    const cardOn = (active >= 0 || S.q) ? 1 : 0;
    cardT += (cardOn - cardT) * f;
    const tp = active >= 0 ? P[active].g.position : P[0].g.position;
    const cy = PY + PH / 2 + TH + 0.72 + REST[2][1];
    card.position.set(0, cy + (1 - cardT) * 0.4, (tp.z || 0) + 0.7);
    card.material.opacity = cardT; card.visible = cardT > 0.01;
    stack.position.y = -0.35 - (1 - cardT) * 0.3;
    // hilo de luz
    if (evRect && cardT > 0.05) {
      const pg = P[0].g.position;
      V1.set(pg.x + (evRect.x - 0.5) * PW, pg.y + PY + (0.5 - evRect.y) * PH, pg.z + 0.02);
      V2.set(card.position.x + (evRect.x - 0.5) * PW * 0.6, card.position.y - PW * 250 / 1400 / 2 + 0.02, card.position.z);
      const dx = V2.x - V1.x, dy = V2.y - V1.y, len = Math.hypot(dx, dy);
      beam.position.set((V1.x + V2.x) / 2, (V1.y + V2.y) / 2, (V1.z + V2.z) / 2 + 0.3);
      beam.rotation.z = Math.atan2(dy, dx) - Math.PI / 2;
      beam.scale.set(0.035, len, 1);
      const op = cardT * (0.55 + (dt == null ? 0 : 0.3 * Math.sin(time * 3)));
      beam.material.opacity = op;
      dots[0].position.copy(V1); dots[0].position.z += 0.05; dots[1].position.copy(V2);
      dots.forEach((d) => { d.material.opacity = cardT; });
    } else { beam.material.opacity = 0; dots.forEach((d) => { d.material.opacity = 0; }); }
  }

  function tick(dt) {
    time += dt;
    pose(dt);
    const p = motes.geometry.attributes.position;
    for (let j = 0; j < p.count; j++) { let y = p.getY(j) + dt * 0.18; if (y > PY + PH / 2 + 0.6) y = PY - PH / 2; p.setY(j, y); }
    p.needsUpdate = true;
    if (active >= 0) motes.material.color.set(LAYERS[active].c); else motes.material.color.set('#ffffff');
    if (performance.now() - lastDrag > 2500) { o.rot.x += (0.12 - o.rot.x) * (1 - Math.exp(-dt * 1.5)); o.rot.y += (-0.12 + Math.sin(time * 0.3) * 0.08 - o.rot.y) * (1 - Math.exp(-dt * 1.5)); }
    o.rot.x = clamp(o.rot.x, -0.4, 0.9); o.rot.y = clamp(o.rot.y, -1.2, 1.2);
  }

  function fitZoom() {
    const w = st.clientWidth || 400, h = st.clientHeight || 340, asp = w / h, k = Math.tan((40 * Math.PI) / 360) * 2;
    o.zoom = Math.max(6.9 / k, 8.3 / (k * asp)) + 0.4;
  }

  function fallback() {
    const L = LAYERS.find((x) => x.id === S.layer);
    fb.innerHTML = (L ? '<b>Nivel ' + L.n + '</b><br>' : '') + esc(S.q || '') + '<p>' + esc(S.text || '') + '</p>';
  }

  let alive = true;
  if (o && document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (!alive || !built) return; o.root.traverse((x) => { const m = x.material; if (m && m.map && m.map.userData.redraw) m.map.userData.redraw(); }); });
  const onResize = () => { if (o && built) fitZoom(); };
  window.addEventListener('resize', onResize);

  return {
    set(state, prev) {
      const first = !S; S = state;
      if (!o) { fallback(); return; }
      if (!built) build();
      active = LAYERS.findIndex((x) => x.id === state.layer);
      const ck = active;
      const textCh = !prev || prev.text !== state.text || prev.evidence !== state.evidence;
      if (textCh) pageTex.userData.redraw();
      if (first || cardK !== ck || !prev || prev.q !== state.q) { cardK = ck; cardTex.userData.redraw(); if (!first && !reduce) cardT = Math.min(cardT, 0.15); }
      fitZoom();
      if (first || reduce) { if (first) { cardT = (active >= 0 || state.q) ? 1 : 0; } pose(null); }
    },
    dispose() { alive = false; clearTimeout(hintT); window.removeEventListener('resize', onResize); st.removeEventListener('pointermove', onMove); if (o) { wipe(); o.dispose(); } st.remove(); },
  };
}
