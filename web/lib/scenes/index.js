// Escenas visuales de "Aprende": cada lección tiene una escena (3D o animada) que cambia con cada paso.
// Contrato de cada tipo: export default (el) => ({ set(state, prev), dispose() })
//   el: div vacío donde la escena dibuja (crea su propio .stage). set() se llama al iniciar y en cada paso.
import comm from './comm.js';
import signs from './signs.js';
import newsdesk from './newsdesk.js';
import morph from './morph.js';
import syllable from './syllable.js';
import sentence from './sentence.js';
import textarch from './textarch.js';
import diorama from './diorama.js';
import poem from './poem.js';
import figure from './figure.js';
import gallery from './gallery.js';
import voice from './voice.js';
import argument from './argument.js';
import dialect from './dialect.js';
import screen from './screen.js';
import levels from './levels.js';

export const SCENES = { comm, signs, newsdesk, morph, syllable, sentence, textarch, diorama, poem, figure, gallery, voice, argument, dialect, screen, levels };

/** spec = { type, ...estadoBase, steps: [ {cambios del paso 1}, {…paso 2}, … ] } */
export function stateAt(spec, i) {
  const { steps, ...base } = spec;
  let s = { ...base };
  for (let k = 0; k <= i && steps && k < steps.length; k++) s = { ...s, ...(steps[k] || {}) };
  return s;
}

/** Un paso puede cambiar de tipo de escena (ej. de partículas a gráfica): se desmonta la anterior y se monta la nueva. */
export function mountScene(el, spec) {
  let inst = null, type = null, prev = null, box = null;
  const step = (i) => {
    const s = stateAt(spec, i);
    if (s.type !== type) {
      if (inst) { try { inst.dispose(); } catch (e) { /* */ } }
      if (box) box.remove();
      box = document.createElement('div');
      box.className = 'sc-box';
      el.appendChild(box);
      type = s.type; prev = null;
      const make = SCENES[type];
      inst = make ? make(box) : null;
      if (!inst) box.textContent = 'Escena no disponible';
    }
    if (inst) inst.set(s, prev);
    prev = s;
  };
  step(0);
  return { step, dispose: () => { if (inst) inst.dispose(); if (box) box.remove(); } };
}
