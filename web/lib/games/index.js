// Minijuegos ("Juega" de cada lección, "Reto de la unidad" y Arcade).
// Contrato de cada juego: export default (el, spec, finish) => dispose
//   finish({ score, stars, detail }) se llama una vez al terminar una partida (stars 0-3).
import blitz from './blitz.js';
import memory from './memory.js';
import sorter from './sorter.js';
import catcher from './catcher.js';
import word from './word.js';
import truefalse from './truefalse.js';
import order from './order.js';
import builder from './builder.js';
import hunter from './hunter.js';
import balancer from './balancer.js';
import tildes from './tildes.js';
import puente from './puente.js';
import detective from './detective.js';
import rima from './rima.js';
import duelo from './duelo.js';
import sopa from './sopa.js';
import crucigrama from './crucigrama.js';
import rosco from './rosco.js';
import conecta from './conecta.js';
import corrector from './corrector.js';
import emoji from './emoji.js';

export const GAMES = { blitz, memory, sorter, catcher, word, truefalse, order, builder, hunter, balancer, tildes, puente, detective, rima, duelo, sopa, crucigrama, rosco, conecta, corrector, emoji };
export const GAME_INFO = {
  blitz: { name: 'Contrarreloj', ic: '⏱' },
  memory: { name: 'Parejas', ic: '▦' },
  sorter: { name: 'Atrapa y clasifica', ic: '⇣' },
  catcher: { name: 'Atrapa', ic: '✋' },
  word: { name: 'Palabra secreta', ic: '✎' },
  truefalse: { name: '¿Mito o verdad?', ic: '⇄' },
  order: { name: 'Ordena la secuencia', ic: '⇅' },
  builder: { name: 'Constructor de oraciones', ic: '▤' },
  hunter: { name: 'Cazador en el texto', ic: '⌖' },
  balancer: { name: 'Concordancia relámpago', ic: '⚖' },
  tildes: { name: 'Lluvia de tildes', ic: 'á' },
  puente: { name: 'Puente de conectores', ic: '⌒' },
  detective: { name: 'Detective de noticias', ic: '🔍' },
  rima: { name: 'Rima rápida', ic: '♪' },
  duelo: { name: 'Duelo de argumentos', ic: '⚔' },
  sopa: { name: 'Sopa de letras', ic: '▦' },
  crucigrama: { name: 'Crucigrama', ic: '✚' },
  rosco: { name: 'El rosco', ic: '◯' },
  conecta: { name: 'Une con líneas', ic: '⤫' },
  corrector: { name: 'Corrector de estilo', ic: '✎' },
  emoji: { name: 'Emojiadivina', ic: '☺' },
};

export function mountGame(el, spec, finish) {
  const g = GAMES[spec.game];
  if (!g) { el.textContent = 'Juego no disponible'; return () => {}; }
  let done = false;
  const d = g(el, spec, (r) => { if (!done) { done = true; } finish(r); });
  return typeof d === 'function' ? d : () => {};
}
