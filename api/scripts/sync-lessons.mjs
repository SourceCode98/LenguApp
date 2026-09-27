// Copia la lista de lecciones, retos y minijuegos del contenido de la web a src/lessons.json.
// Ejecuta `npm run sync-lessons` cada vez que agregues o quites lecciones en web/content.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const contentDir = join(here, '../../web/content');
const byGrade = (a, b) => parseInt(a.replace(/\D+/g, '')) - parseInt(b.replace(/\D+/g, ''));
const lessons = [];
for (const file of readdirSync(contentDir).filter((f) => /^g\d+\.ts$/.test(f)).sort(byGrade)) {
  const src = readFileSync(join(contentDir, file), 'utf8');
  for (const m of src.matchAll(/\{id:'(g(\d+)u(\d+)l(\d+))'/g)) lessons.push({ id: m[1], grade: Number(m[2]), unit: Number(m[3]) });
}
// Minijuegos de cada grado en web/content/juegos-g<n>.js:
//   retos de unidad (id = <unidad>r) y dos juegos por lección en "Juega" (id = <lección>j1 y <lección>j2).
let retos = 0, juegos = 0;
for (const f of readdirSync(contentDir).filter((f) => /^juegos-g\d+\.js$/.test(f)).sort(byGrade)) {
  const src = readFileSync(join(contentDir, f), 'utf8');
  for (const m of src.matchAll(/^\s*(g(\d+)u(\d+)): \{ game:/gm)) { lessons.push({ id: m[1] + 'r', grade: Number(m[2]), unit: Number(m[3]), reto: true }); retos++; }
  for (const m of src.matchAll(/^\s*(g(\d+)u(\d+)l\d+): \[/gm)) for (const j of [1, 2]) { lessons.push({ id: `${m[1]}j${j}`, grade: Number(m[2]), unit: Number(m[3]), juego: true }); juegos++; }
}
writeFileSync(join(here, '../src/lessons.json'), JSON.stringify(lessons, null, 1) + '\n');
console.log(`${lessons.length - retos - juegos} lecciones, ${retos} retos y ${juegos} juegos exportados`);
