// "Reto de la unidad": un minijuego al final de cada unidad (id = <unidad>r, ej. g6u1r).
// from: toma los ítems de las actividades de clasificación de esas lecciones (sorter).
// Cada grado define sus retos en juegos-g<n>.js.
// quizFrom: 'unit' toma todas las preguntas de "Demuestra" de la unidad (blitz).
import { UNIT_GAMES_G6 } from './juegos-g6.js';
import { UNIT_GAMES_G7 } from './juegos-g7.js';
import { UNIT_GAMES_G8 } from './juegos-g8.js';
import { UNIT_GAMES_G9 } from './juegos-g9.js';
import { UNIT_GAMES_G10 } from './juegos-g10.js';
import { UNIT_GAMES_G11 } from './juegos-g11.js';

export const UNIT_GAMES = { ...UNIT_GAMES_G6, ...UNIT_GAMES_G7, ...UNIT_GAMES_G8, ...UNIT_GAMES_G9, ...UNIT_GAMES_G10, ...UNIT_GAMES_G11 };

export function resolveUnitGame(unit, lessonById) {
  const g = UNIT_GAMES[unit.id];
  if (!g) return null;
  const spec = { id: unit.id + 'r', ...g };
  if (g.game === 'sorter' && g.from) {
    const acts = g.from.map((id) => lessonById[id]?.act).filter(Boolean);
    spec.bins = spec.bins || acts[0].bins;
    spec.items = [...(g.items || []), ...acts.flatMap((a) => a.items), ...(g.extra || [])];
  }
  if (g.game === 'blitz') {
    const fromUnit = g.quizFrom === 'unit' ? unit.lessons.flatMap((l) => l.quiz) : [];
    spec.items = [...fromUnit, ...(g.extraItems || [])];
  }
  return spec;
}
