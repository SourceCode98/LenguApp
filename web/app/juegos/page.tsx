'use client';
import { useState } from 'react';
import Link from 'next/link';
import { GRADES } from '@/content';
import { UNIT_GAMES } from '@/content/games';
import { GameHost } from '@/components/GameHost';
import { useQL } from '@/components/Providers';
import { Stars } from '@/components/ui';

import { GAME_NAME as NAME } from '@/content/game-names';

import { GAME_INFO } from '@/lib/games/index';

const IC: Record<string, string> = Object.fromEntries(Object.entries(GAME_INFO).map(([k, v]) => [k, v.ic]));
type Free = { game: string; id: string; title: string; d: string; [k: string]: unknown };
const FREE: Free[] = [
  { game: 'tildes', id: 'free-tildes', title: 'Lluvia de tildes libre', d: 'Agudas, graves y esdrújulas', time: 60, lives: 3, words: [
    { w: 'arbol', a: 'árbol' }, { w: 'cancion', a: 'canción' }, { w: 'examen', a: 'examen' }, { w: 'Bogota', a: 'Bogotá' }, { w: 'rapido', a: 'rápido' }, { w: 'lapiz', a: 'lápiz' },
    { w: 'cafe', a: 'café' }, { w: 'musica', a: 'música' }, { w: 'azucar', a: 'azúcar' }, { w: 'raton', a: 'ratón' }, { w: 'sabado', a: 'sábado' }, { w: 'Popayan', a: 'Popayán' },
    { w: 'volcan', a: 'volcán' }, { w: 'murcielago', a: 'murciélago' }, { w: 'fragil', a: 'frágil' }, { w: 'Cucuta', a: 'Cúcuta' }, { w: 'libro', a: 'libro' }, { w: 'joven', a: 'joven' } ] },
  { game: 'hunter', id: 'free-hunter', title: 'Cazador de verbos', d: 'Encuentra los verbos del párrafo', time: 90, rounds: [
    { clue: 'Toca todos los verbos', text: 'Cada domingo la ciclovía [[abre]] sus carriles. Los niños [[montan]] bicicleta, los abuelos [[caminan]] y los perros [[corren]] felices.' },
    { clue: 'Toca todos los verbos', text: 'Mi hermana [[estudia]], mi papá [[cocina]] y yo [[barro]] el patio mientras la radio [[suena]].' },
    { clue: 'Toca todos los verbos', text: 'Los músicos [[llegaron]] temprano, [[afinaron]] los tiples y [[tocaron]] bambucos hasta la noche.' } ] },
  { game: 'sopa', id: 'free-sopa', title: 'Sopa de figuras y gramática', d: 'Busca la palabra a partir de la pista', time: 150, words: [
    { w: 'metáfora', h: 'Dice que algo ES otra cosa' }, { w: 'símil', h: 'Compara usando «como»' }, { w: 'hipérbole', h: 'Exagera muchísimo' },
    { w: 'sujeto', h: 'De quién se habla en la oración' }, { w: 'verbo', h: 'Palabra que dice la acción' }, { w: 'rima', h: 'Sonidos iguales al final del verso' },
    { w: 'adjetivo', h: 'Dice cómo es el sustantivo' }, { w: 'leyenda', h: 'Relato tradicional, como el de la Madremonte' } ] },
  { game: 'crucigrama', id: 'free-crucigrama', title: 'Crucigrama de categorías', d: 'Las clases de palabras', words: [
    { w: 'sustantivo', h: 'Nombra personas, animales o cosas' }, { w: 'verbo', h: 'Expresa acciones' }, { w: 'adjetivo', h: 'Dice cómo es algo' },
    { w: 'adverbio', h: 'Dice cómo, cuándo o dónde pasa la acción' }, { w: 'pronombre', h: 'Reemplaza al sustantivo: yo, tú, ella' },
    { w: 'artículo', h: 'El, la, los, las' }, { w: 'preposición', h: 'Une palabras: a, de, en, con' }, { w: 'conjunción', h: 'Une oraciones: y, pero, porque' } ] },
  { game: 'rosco', id: 'free-rosco', title: 'Rosco de la lengua', d: 'Una palabra por cada letra', time: 180, items: [
    { l: 'A', q: 'Empieza por A: palabra que significa lo contrario de otra', a: 'antónimo' },
    { l: 'B', q: 'Empieza por B: texto que cuenta la vida de una persona, escrito por otra', a: 'biografía' },
    { l: 'C', q: 'Empieza por C: palabra que une ideas, como «pero» o «además»', a: 'conector' },
    { l: 'D', q: 'Empieza por D: conversación entre dos o más personajes', a: 'diálogo' },
    { l: 'E', q: 'Empieza por E: palabra con la fuerza en la antepenúltima sílaba, como «música»', a: 'esdrújula' },
    { l: 'F', q: 'Empieza por F: relato corto con animales que deja una moraleja', a: 'fábula' },
    { l: 'G', q: 'Empieza por G: palabra con la fuerza en la penúltima sílaba, como «lápiz»', a: 'grave', alt: ['llana'] },
    { l: 'H', q: 'Empieza por H: figura literaria que exagera muchísimo', a: 'hipérbole' },
    { l: 'L', q: 'Empieza por L: relato tradicional, como el de la Llorona', a: 'leyenda' },
    { l: 'M', q: 'Empieza por M: enseñanza que deja una fábula', a: 'moraleja' },
    { l: 'N', q: 'Empieza por N: persona que cuenta la historia en un relato', a: 'narrador' },
    { l: 'Ñ', q: 'Contiene la Ñ: persona que está en la niñez', a: 'niño', alt: ['niña'] },
    { l: 'P', q: 'Empieza por P: texto escrito en versos', a: 'poema' },
    { l: 'R', q: 'Empieza por R: sonidos iguales al final de dos versos', a: 'rima' },
    { l: 'S', q: 'Empieza por S: palabra que significa lo mismo que otra', a: 'sinónimo' },
    { l: 'V', q: 'Empieza por V: cada línea de un poema', a: 'verso' } ] },
  { game: 'conecta', id: 'free-conecta', title: 'Une figuras literarias', d: 'Cada figura con su ejemplo', pairs: [
    ['Metáfora', 'Tus ojos son luceros'], ['Símil', 'Blanca como la nieve'], ['Hipérbole', 'Te lo he dicho un millón de veces'],
    ['Personificación', 'El viento susurraba en la ventana'], ['Anáfora', 'Por ti camino, por ti sueño, por ti vivo'],
    ['Onomatopeya', 'El tic tac del reloj'], ['Antítesis', 'Es hielo abrasador, es fuego helado'], ['Epíteto', 'La blanca nieve'] ] },
  { game: 'corrector', id: 'free-corrector', title: 'Corrector de ortografía', d: 'Encuentra y arregla los errores', time: 120, lives: 3, rounds: [
    { text: 'Ayer {{fuimos|fuímos}} al parque con mi abuela. Ella {{había|abía}} preparado arepas y nos {{dijo|dijó}} que el día estaba perfecto.', e: '«Fuimos» y «dijo» no llevan tilde. «Había» viene del verbo haber y siempre va con h.' },
    { text: 'Mi hermano {{hizo|iso}} la tarea {{a pesar de|apesar de}} que estaba cansado, {{porque|por que}} quería salir a montar bicicleta.', e: '«Hizo» va con h y z. «A pesar de» se escribe separado. «Porque», junto y sin tilde, explica la causa.' },
    { text: 'En la tienda de la esquina {{venden|bende}} el mejor pan de Bogotá. {{Hay|Ay}} que llegar temprano para {{hacer|aser}} la fila.', e: '«Venden» va con v. «Hay» (del verbo haber) lleva h; «ay» es un quejido. «Hacer» se escribe con h y c.' } ] },
  { game: 'emoji', id: 'free-emoji', title: 'Emojiadivina de la lengua', d: 'Obras, refranes y figuras en emojis', time: 90, lives: 3, items: [
    { e: '💯📅😔', q: '¿Qué obra es?', o: ['Cien años de soledad', 'María', 'La vorágine', 'El principito'], a: 0, x: 'Cien (💯) años (📅) de soledad (😔), de Gabriel García Márquez.' },
    { e: '🦐😴🌊', q: '¿Qué refrán es?', o: ['Camarón que se duerme se lo lleva la corriente', 'Al que madruga Dios lo ayuda', 'Perro que ladra no muerde', 'Más vale tarde que nunca'], a: 0, x: 'Si te descuidas, pierdes la oportunidad.' },
    { e: '🐦✋➕💯🐦🌬️', q: '¿Qué refrán es?', o: ['Más vale pájaro en mano que cien volando', 'En boca cerrada no entran moscas', 'Dime con quién andas y te diré quién eres', 'No hay mal que por bien no venga'], a: 0, x: 'Es mejor lo seguro que muchas promesas.' },
    { e: '👀🟰⭐⭐', q: '¿Qué figura literaria es?', o: ['Metáfora', 'Hipérbole', 'Onomatopeya', 'Anáfora'], a: 0, x: '«Tus ojos son estrellas»: dice que una cosa ES otra, sin usar «como».' },
    { e: '🌬️🗣️🌳', q: '¿Qué figura literaria es?', o: ['Personificación', 'Símil', 'Antítesis', 'Aliteración'], a: 0, x: 'El viento «habla» con los árboles: le damos una acción humana.' },
    { e: '🐢🏁🐇💤', q: '¿Qué tipo de texto es?', o: ['Fábula', 'Noticia', 'Receta', 'Biografía'], a: 0, x: 'Animales que actúan como personas y dejan una moraleja.' },
    { e: '📰❓👤📍🕐', q: '¿Qué texto responde qué, quién, dónde y cuándo?', o: ['La noticia', 'El poema', 'La fábula', 'El chiste'], a: 0, x: 'La noticia responde las preguntas básicas en la entrada.' },
    { e: '👩🍃🌿⛰️', q: '¿Qué leyenda colombiana es?', o: ['La Madremonte', 'El Mohán', 'La Llorona', 'El Silbón'], a: 0, x: 'La Madremonte, cubierta de hojas y musgo, cuida el monte y castiga a quien lo daña.' } ] },
  ...GRADES.map((g) => ({ game: 'blitz', id: 'free-blitz-' + g.id, title: `Contrarreloj ${g.n}°`, d: `Preguntas de todo el grado ${g.n}°`, items: g.units.flatMap((u) => u.lessons.flatMap((l) => l.quiz)), time: 60, lives: 3, gc: g.id })),
];

export default function Juegos() {
  const { state, canOpen, retoOpen, user } = useQL();
  const shown = user?.role === 'student' && user.grade ? GRADES.filter((g) => g.n === user.grade) : GRADES;
  const [free, setFree] = useState<Free | null>(null);
  if (free) return (
    <>
      <section className="reto-head"><span className="mono">Juego libre · sin XP</span><h1>{free.title}</h1></section>
      <section className="block"><GameHost spec={free} /></section>
      <div className="nav"><button className="btn ghost" onClick={() => setFree(null)}>← Volver a los juegos</button></div>
    </>
  );
  return (
    <>
      <section className="hero"><span className="mono">Arcade LenguApp</span><h1>Juegos de lenguaje</h1>
        <p>Retos de cada unidad para ganar XP y estrellas, y juegos libres para practicar. Ideales para iniciar o cerrar una clase en video beam.</p></section>
      <div className="arcade">
        <section className="arcade-grade"><h2>Juego libre</h2><div className="gamecards">
          {FREE.filter((f) => !f.gc || shown.some((g) => g.id === f.gc)).map((f) => (
            <button key={f.id} className="gamecard" style={{ ['--gc' as string]: f.gc ? `var(--${f.gc})` : 'var(--accent)' }} onClick={() => setFree(f)}>
              <span className="gi">{IC[f.game]}</span><b>{f.title}</b><small>{NAME[f.game]} · {f.d}</small>
            </button>
          ))}
        </div></section>
        {shown.map((g) => (
          <section className="arcade-grade" key={g.id}><h2>Retos de {g.n}° · {g.title}</h2><div className="gamecards">
            {g.units.filter((u) => UNIT_GAMES[u.id]).map((u) => {
              const sp = UNIT_GAMES[u.id];
              const ok = canOpen(u.id) && retoOpen(u.id);
              return (
                <Link key={u.id} href={`/reto/${u.id}`} className={'gamecard' + (ok ? '' : ' is-locked')} aria-disabled={!ok} tabIndex={ok ? undefined : -1} style={{ ['--gc' as string]: `var(--${g.id})` }}>
                  <span className="gi">{ok ? IC[sp.game] : '🔒'}</span><b>{sp.title}</b><small>{NAME[sp.game]} · {u.title}</small><Stars n={state.lessons[u.id + 'r']?.stars} />
                </Link>
              );
            })}
          </div></section>
        ))}
      </div>
    </>
  );
}
