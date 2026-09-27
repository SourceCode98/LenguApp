// Marcado de texto compartido por actividades y minijuegos (ver lib/SPEC.md).
//   [[fragmento|k]]  objetivo para marcar (k = categoría, 0 por defecto)
//   {{correcta|otra|otra}}  hueco con opciones; la primera es la correcta

/** Parte un texto con [[…|k]] en tokens {t, k}. Los fragmentos marcados son un solo token (k = número);
 *  el resto se parte por espacios y conserva la puntuación pegada (k = null). */
export function parseMarked(text) {
  const out = [];
  const re = /\[\[([^\]|]+)(?:\|(\d+))?\]\]/g;
  let last = 0, m;
  const plain = (s) => s.split(/\s+/).filter(Boolean).forEach((w) => out.push({ t: w, k: null }));
  while ((m = re.exec(text))) {
    plain(text.slice(last, m.index));
    // Puntuación pegada después del marcador (ej. "[[corre]],") queda como token aparte sin espacio.
    out.push({ t: m[1], k: m[2] === undefined ? 0 : +m[2] });
    last = re.lastIndex;
    const tail = /^[.,;:!?¡¿»”)]+/.exec(text.slice(last));
    if (tail) { out[out.length - 1].p = tail[0]; last += tail[0].length; }
  }
  plain(text.slice(last));
  return out;
}

/** Parte un texto con {{…}} en partes: {t} texto normal u {opts:[...], a:0} hueco. */
export function parseCloze(text) {
  const out = [];
  const re = /\{\{([^}]+)\}\}/g;
  let last = 0, m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push({ t: text.slice(last, m.index) });
    out.push({ opts: m[1].split('|').map((s) => s.trim()), a: 0 });
    last = re.lastIndex;
  }
  if (last < text.length) out.push({ t: text.slice(last) });
  return out;
}

/** Palabras de un texto (para contar y detectar repeticiones). */
export const words = (s) => (String(s).toLowerCase().match(/[a-záéíóúüñ]+/gi) || []);
