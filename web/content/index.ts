import type { Grade, Lesson, Unit } from './types';
import g6 from './g6';
import g7 from './g7';
import g8 from './g8';
import g9 from './g9';
import g10 from './g10';
import g11 from './g11';

export const GRADES: Grade[] = [g6, g7, g8, g9, g10, g11];

export type LessonRef = Lesson & { grade: Grade; unit: Unit; unitIndex: number; lessonIndex: number };

export const ALL_LESSONS: LessonRef[] = GRADES.flatMap((grade) =>
  grade.units.flatMap((unit, unitIndex) =>
    unit.lessons.map((l, lessonIndex) => ({ ...l, grade, unit, unitIndex, lessonIndex })),
  ),
);

export const LESSON_BY_ID: Record<string, LessonRef> = Object.fromEntries(ALL_LESSONS.map((l) => [l.id, l]));
export const LESSON_IDS = new Set(ALL_LESSONS.map((l) => l.id));

export const ACT_NAME: Record<string, string> = {
  classify: 'Clasificar', order: 'Ordenar', mark: 'Marcar en el texto', cloze: 'Completar', build: 'Armar',
  write: 'Escritura guiada', record: 'Grabar y autoevaluar', map: 'Organizador gráfico',
};
