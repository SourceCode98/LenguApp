// lv: nivel de lectura de la pregunta (L literal, I inferencial, C crítico), como en las pruebas Saber.
export type QuizItem = { q: string; o: string[]; a: number; e: string; lv?: 'L' | 'I' | 'C' };
// La especificación de cada actividad depende de su tipo (ver lib/SPEC.md).
export type Activity = { type: string; [key: string]: unknown };
// bites: apoyo "masticadito" de cada paso de Aprende, alineado con body (ver lib/SPEC.md).
export type Bite = { ej?: string; ojo?: string; check?: { q: string; o: string[]; a: number; e: string } };
export type Lesson = {
  id: string; title: string; time: number; std: string; dba: string;
  body: string[]; key: string; co: string; act: Activity; quiz: QuizItem[]; tip?: string; bites?: Bite[];
};
export type Unit = { id: string; title: string; desc: string; lessons: Lesson[] };
export type Grade = { id: string; n: number; title: string; desc: string; units: Unit[] };
