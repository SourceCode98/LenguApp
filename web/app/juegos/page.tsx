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
