// Sección "Juega" de cada lección: dos minijuegos por lección (id = <lección>j1 y <lección>j2).
// Cada grado define los suyos en juegos-g<n>.js.
import { LESSON_GAMES_G6 } from './juegos-g6.js';
import { LESSON_GAMES_G7 } from './juegos-g7.js';
import { LESSON_GAMES_G8 } from './juegos-g8.js';
import { LESSON_GAMES_G9 } from './juegos-g9.js';
import { LESSON_GAMES_G10 } from './juegos-g10.js';
import { LESSON_GAMES_G11 } from './juegos-g11.js';

const ALL = { ...LESSON_GAMES_G6, ...LESSON_GAMES_G7, ...LESSON_GAMES_G8, ...LESSON_GAMES_G9, ...LESSON_GAMES_G10, ...LESSON_GAMES_G11 };

/** Juegos de una lección con su id listo para guardar el avance. */
export function lessonGames(lessonId) {
  return (ALL[lessonId] || []).map((g, i) => ({ ...g, id: `${lessonId}j${i + 1}` }));
}
