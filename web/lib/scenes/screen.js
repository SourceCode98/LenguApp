// Escena 2D "screen": del libro a la pantalla (ver lib/SPEC.md).
// Pantalla dividida: a la izquierda la página con el fragmento; a la derecha el cuadro activo del guion gráfico
// (dibujo según el tipo de plano) y una tira con todos los cuadros. `at` resalta el cuadro y la frase que le corresponde.
import { esc, reduce } from '../kit.js';

const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const plain = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const SKIES = [['#F2A65A', '#6B3E5E'], ['#7FB2EA', '#1F3A5F'], ['#4FC3C1', '#17404A'], ['#E7B460', '#5A3A1E'], ['#AE98EA', '#2B2350'], ['#F0897F', '#4A2230']];

/** tipo de plano a partir del nombre */
function kindOf(k) {
  const s = plain(k);
  if (/contrapicad/.test(s)) return 'contra';
  if (/picad|cenital/.test(s)) return 'picado';
  if (/detalle/.test(s)) return 'detalle';
  if (/primerisimo/.test(s)) return 'pp2';
  if (/primer/.test(s)) return 'pp';
  if (/american|tres cuartos/.test(s)) return 'americano';
  if (/medio/.test(s)) return 'medio';
  if (/entero|figura/.test(s)) return 'entero';
  if (/conjunto/.test(s)) return 'conjunto';
  if (/subjetiv|punto de vista/.test(s)) return 'subjetivo';
  if (/general|panoram|gran plano|paisaje|establec/.test(s)) return 'general';
  return 'medio';
}

/** dibujo del cuadro en viewBox 160x90 */
function shotSvg(kind, i) {
  const [c1, c2] = SKIES[i % SKIES.length];
  const id = 'sc-sr-g' + i + '-' + Math.random().toString(36).slice(2, 7);
  const ink = '#0E161C', rim = c1;
  let body = '';
  const skin = '#D9A27A', hair = '#2A1C14', cloth = ['#2F5E7A', '#7A3E4E', '#3F6B3A', '#6A4FB3'][i % 4];
  const person = (x, y, s) => { // figura de pie con base en (x,y), altura 60*s
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" stroke="' + ink + '" stroke-width="' + (1.2 / s).toFixed(2) + '" stroke-opacity=".6">' +
      '<path d="M-10-42h20l4 22h-5l-2 20h-5l-2-15-2 15h-5l-2-20h-5z" fill="' + cloth + '"/><circle cx="0" cy="-51" r="7" fill="' + skin + '"/><path d="M-7-53a7 7 0 0 1 14 0q-7-4-14 0z" fill="' + hair + '" stroke="none"/></g>';
  };
  const face = (cx, cy, rx, ry) => '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="' + skin + '"/>' +
    '<path d="M' + (cx - rx) + ' ' + (cy - ry * 0.15) + 'a' + rx + ' ' + ry + ' 0 0 1 ' + rx * 2 + ' 0q-' + rx + '-' + ry * 0.55 + '-' + rx * 2 + ' 0z" fill="' + hair + '"/>' +
    '<g fill="' + ink + '"><ellipse cx="' + (cx - rx * 0.38) + '" cy="' + (cy + ry * 0.08) + '" rx="' + rx * 0.09 + '" ry="' + ry * 0.07 + '"/><ellipse cx="' + (cx + rx * 0.38) + '" cy="' + (cy + ry * 0.08) + '" rx="' + rx * 0.09 + '" ry="' + ry * 0.07 + '"/></g>' +
    '<path d="M' + (cx - rx * 0.28) + ' ' + (cy + ry * 0.45) + 'q' + rx * 0.28 + ' ' + ry * 0.18 + ' ' + rx * 0.56 + ' 0" stroke="' + ink + '" stroke-width="' + Math.max(1.2, rx * 0.07) + '" fill="none" stroke-linecap="round"/>';
  if (kind === 'general') {
    body = '<path d="M0 58 28 38 48 50 74 30 104 52 128 40 160 56V90H0z" fill="' + c2 + '" opacity=".9"/>' +
      '<path d="M0 66 40 56 80 64 120 54 160 62V90H0z" fill="#1B2A22"/>' +
      '<path d="M0 80C40 70 70 86 160 74" stroke="#7FB2EA" stroke-width="3" fill="none" opacity=".6"/>' +
      [30, 42, 55, 68, 84].map((x, k) => '<g transform="translate(' + x + ' ' + (62 + (k % 2) * 3) + ')"><rect x="-4" y="-5" width="8" height="6" fill="#E9DCC0"/><path d="M-5-5 0-9 5-5z" fill="#B0563E"/></g>').join('') +
      '<circle cx="128" cy="20" r="7" fill="#FFE8A8" opacity=".85"/>' + person(112, 76, 0.16);
  } else if (kind === 'conjunto') {
    body = '<rect y="62" width="160" height="28" fill="#1B2A22"/>' + person(56, 80, 0.62) + person(80, 82, 0.7) + person(104, 80, 0.6);
  } else if (kind === 'entero') {
    body = '<rect y="70" width="160" height="20" fill="#1B2A22"/>' + person(80, 84, 1.1);
  } else if (kind === 'americano') {
    body = person(80, 150, 2.1);
  } else if (kind === 'medio') {
    body = person(80, 205, 3.0);
  } else if (kind === 'pp') {
    body = '<path d="M36 90c4-18 18-24 44-24s40 6 44 24z" fill="' + cloth + '"/><rect x="74" y="58" width="12" height="10" fill="' + skin + '"/>' + face(80, 40, 19, 24);
  } else if (kind === 'pp2') {
    body = face(80, 50, 46, 56);
  } else if (kind === 'detalle') {
    body = '<path d="M14 46Q80-4 146 46 80 96 14 46z" fill="#F3EBDD"/><circle cx="80" cy="46" r="22" fill="' + c2 + '"/><circle cx="80" cy="46" r="22" fill="none" stroke="' + c1 + '" stroke-width="4"/><circle cx="80" cy="46" r="9" fill="#05080B"/><circle cx="86" cy="40" r="4" fill="#fff" opacity=".9"/>' +
      '<path d="M14 46Q80-4 146 46" fill="none" stroke="' + ink + '" stroke-width="4"/>';
  } else if (kind === 'picado') {
    body = '<path d="M0 0H160V90H0z" fill="#22303B"/>' + [0, 1, 2, 3, 4, 5].map((k) => '<path d="M' + (k * 32 - 20) + ' 0L' + (k * 32 - 20 + 12) + ' 90" stroke="#3A4B58" stroke-width="1"/>').join('') + [0, 1, 2, 3].map((k) => '<path d="M0 ' + (k * 26 + 8) + 'H160" stroke="#3A4B58" stroke-width="1"/>').join('') +
      '<ellipse cx="80" cy="60" rx="12" ry="5" fill="#000" opacity=".4"/><path d="M68 56q12-8 24 0l-3 8H71z" fill="' + cloth + '"/><circle cx="80" cy="50" r="8" fill="' + hair + '"/>';
  } else if (kind === 'contra') {
    body = '<path d="M44 90 60 22h40l16 68z" fill="' + cloth + '"/><circle cx="80" cy="14" r="10" fill="' + skin + '"/><path d="M70 12a10 10 0 0 1 20 0q-10-6-20 0z" fill="' + hair + '"/>' +
      '<path d="M0 90 40 60 0 40z M160 90 120 60 160 40z" fill="#1B2A22"/>';
  } else if (kind === 'subjetivo') {
    body = '<path d="M0 60 30 44 60 58 100 38 160 56V90H0z" fill="' + c2 + '"/>' + person(110, 70, 0.4) +
      '<path d="M0 0H160V90H0zM80 45m-72 0a72 40 0 1 0 144 0a72 40 0 1 0-144 0z" fill="#05080B" fill-rule="evenodd" opacity=".85"/>';
  }
  return '<svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + c1 + '" stop-opacity=".55"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient></defs>' +
    '<rect width="160" height="90" fill="url(#' + id + ')"/><g class="sc-sr-kb">' + body + '</g></svg>';
}

/** parte el texto en frases y reparte las frases entre los cuadros */
function chunks(text, n) {
  const t = String(text || '').trim();
  let parts = (t.match(/[^.!?…;:]+[.!?…;:]*[»”"']?\s*/g) || [t]).map((s) => s);
  if (parts.length < n) {
    const more = [];
    parts.forEach((p) => { const sub = p.match(/[^,]+,?\s*/g) || [p]; more.push(...sub); });
    if (more.length >= n) parts = more;
  }
  const map = [];
  if (!n) return { parts, map };
  if (parts.length >= n) { for (let i = 0; i < n; i++) { const a = Math.round((i * parts.length) / n), b = Math.round(((i + 1) * parts.length) / n); map.push([a, Math.max(a, b - 1)]); } }
  else for (let i = 0; i < n; i++) { const a = Math.floor((i * parts.length) / n); map.push([a, a]); }
  return { parts, map };
}

export default function (el) {
  const st = document.createElement('div');
  st.className = 'stage sc-stage sc-2d sc-screen' + (reduce ? ' sc-reduce' : '');
  el.appendChild(st);
  st.innerHTML = '<div class="sc-sr-page"><div class="sc-sr-ph"><span>Texto</span><i></i></div><div class="sc-sr-txt"></div></div>' +
    '<div class="sc-sr-film"><div class="sc-sr-main"></div><div class="sc-sr-cap"><b></b><span></span></div><div class="sc-sr-strip"></div></div>';
  const txt = st.querySelector('.sc-sr-txt'), main = st.querySelector('.sc-sr-main'), strip = st.querySelector('.sc-sr-strip');
  const capB = st.querySelector('.sc-sr-cap b'), capS = st.querySelector('.sc-sr-cap span'), ph = st.querySelector('.sc-sr-ph i');
  let S = null, key = '', C = null;

  function fitText() {
    let fs = st.clientWidth < 480 ? 15 : 17;
    txt.style.fontSize = fs + 'px';
    while (fs > 10.5 && txt.scrollHeight > txt.clientHeight + 1) { fs -= 0.5; txt.style.fontSize = fs + 'px'; }
  }

  function build() {
    const shots = S.shots || [];
    C = chunks(S.text, shots.length);
    txt.innerHTML = C.parts.map((p, i) => '<span class="sc-sr-s" data-i="' + i + '">' + esc(p) + '</span>').join('');
    main.innerHTML = shots.map((s, i) => '<div class="sc-sr-fr" data-i="' + i + '">' + shotSvg(kindOf(s.k), i) +
      '<div class="sc-sr-hud"><span class="sc-sr-rec"></span><span>' + String(i + 1).padStart(2, '0') + '</span></div><div class="sc-sr-k">' + esc(s.k || '') + '</div><div class="sc-sr-corners"></div></div>').join('') ||
      '<div class="sc-sr-fr sc-on"><div class="sc-sr-k">Sin cuadros</div></div>';
    strip.innerHTML = shots.map((s, i) => '<div class="sc-sr-th" data-i="' + i + '" title="' + esc(s.k || '') + '">' + shotSvg(kindOf(s.k), i) + '<b>' + (i + 1) + '</b></div>').join('');
    fitText();
  }

  function apply(anim) {
    const shots = S.shots || [];
    const at = shots.length ? clamp(Math.round(+S.at || 0), 0, shots.length - 1) : -1;
    st.classList.toggle('sc-now', !anim);
    main.querySelectorAll('.sc-sr-fr').forEach((f) => { const i = +f.dataset.i; f.classList.toggle('sc-on', i === at); f.classList.toggle('sc-past', i < at); });
    strip.querySelectorAll('.sc-sr-th').forEach((f) => { f.classList.toggle('sc-on', +f.dataset.i === at); });
    const rg = at >= 0 && C.map[at] ? C.map[at] : [-1, -2];
    let first = null;
    txt.querySelectorAll('.sc-sr-s').forEach((s) => { const i = +s.dataset.i, on = i >= rg[0] && i <= rg[1]; s.classList.toggle('sc-on', on); if (on && !first) first = s; });
    if (first && txt.scrollHeight > txt.clientHeight + 1) {
      const y = first.offsetTop - txt.offsetTop - 12;
      txt.scrollTo({ top: y, behavior: anim && !reduce ? 'smooth' : 'auto' });
    }
    const s = shots[at] || {};
    capB.textContent = at >= 0 ? 'Plano ' + (at + 1) + ' de ' + shots.length : '';
    capS.textContent = s.d || '';
    ph.textContent = at >= 0 ? '→ cuadro ' + (at + 1) : '';
    if (!anim) { void st.offsetWidth; st.classList.remove('sc-now'); }
  }

  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => { if (S) { fitText(); apply(false); } }) : null;
  if (ro) ro.observe(st);
  let alive = true;
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (alive && S) { fitText(); apply(false); } });

  return {
    set(state) {
      const first = !S; S = state;
      const k = JSON.stringify([state.text, state.shots]);
      if (first || k !== key) { key = k; build(); apply(false); }
      else apply(true);
    },
    dispose() { alive = false; if (ro) ro.disconnect(); st.remove(); },
  };
}
