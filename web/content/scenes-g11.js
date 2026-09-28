// Escenas de "Aprende" del grado 11° (formato en lib/SPEC.md). Un paso por párrafo de body.
const AGUA = [
  { t: 'Sin páramos baja el agua', kind: 'arg', w: 2, side: 'pro' },
  { t: 'Según una hidróloga experta', kind: 'arg', w: 2, side: 'pro' },
  { t: 'Como no llovió, bajaron los embalses', kind: 'arg', w: 2, side: 'pro' },
  { t: 'El páramo es una esponja', kind: 'arg', w: 1, side: 'pro' },
  { t: 'Chingaza: cerca del 70 %', kind: 'dato', w: 3, side: 'pro' },
  { t: 'Barrio que ahorró agua', kind: 'ejemplo', w: 1, side: 'pro' },
];
const FALACIAS = [
  { t: 'Encuesta: 60 % la pide', kind: 'dato', w: 3, side: 'pro' },
  { t: 'Ella ni hace deporte', kind: 'falacia', w: 3, side: 'con' },
  { t: 'Quiere que comamos solo lechuga', kind: 'falacia', w: 2, side: 'con' },
  { t: 'O votan por mí o todo sigue mal', kind: 'falacia', w: 2, side: 'con' },
  { t: 'Todos los de once me apoyan', kind: 'falacia', w: 2, side: 'con' },
  { t: 'Si cambian el menú, cierran todo', kind: 'falacia', w: 2, side: 'con' },
  { t: 'Desde que usas ese buzo perdemos', kind: 'falacia', w: 1, side: 'con' },
  { t: 'Un cantante dice que un té cura', kind: 'falacia', w: 1, side: 'con' },
];
const ENSAYO = [
  { n: 'Introducción', t: 'Tesis: enseñar a usar la IA' }, { n: 'Argumento 1', t: 'Prohibirla no evita su uso' },
  { n: 'Argumento 2', t: 'UNESCO (2023) pide criterio' }, { n: 'Argumento 3', t: 'Retroalimentación inmediata' },
  { n: 'Contraargumento', t: '"No pensaremos": se refuta' }, { n: 'Conclusión', t: 'Reglas claras + referencias' },
];
const ENSAYO_CONECTORES = [
  { n: 'Introducción', t: 'Tesis: enseñar a usar la IA' }, { n: 'Argumento 1', t: 'En primer lugar: no evita su uso' },
  { n: 'Argumento 2', t: 'Además: UNESCO (2023)' }, { n: 'Argumento 3', t: 'También: retroalimentación' },
  { n: 'Contraargumento', t: 'Sin embargo: "no pensaremos"' }, { n: 'Conclusión', t: 'En conclusión: reglas claras' },
];
const ZULETA = '¿Por qué soñamos con una vida sin obstáculos? Desear que todo sea fácil es desear, en el fondo, dejar de pensar. Quien aprende a tocar guitarra no pide que desaparezcan las cuerdas.';
const BIBLIO = 'En 2020 la biblioteca cerró siete meses y los préstamos bajaron a 9.000. En 2024 se prestaron 61.000 libros. Todo indica que los clubes ayudaron. Recortar ahora su presupuesto sería un error imperdonable.';
const CAMILA = 'Camila solo leía lo que le mandaban en el colegio. Un sábado, en una biblioteca de BibloRed, pidió un libro por la portada y no pudo soltarlo. Desde entonces anota en una libreta qué la engancha de cada lectura.';

export const SCENES_G11 = {
  g11u1l1: { type: 'gallery', rooms: [
    { n: 'Grecia clásica', y: 'Siglo VIII-V a. C.', c: '#B06A10', tags: ['Odisea', 'Antígona', 'Edipo rey', 'destino'] },
    { n: 'Mesopotamia', y: 'Hacia 2000 a. C.', c: '#8A5A2B', tags: ['Gilgamesh', 'muerte'] },
    { n: 'Teatro inglés', y: '1590-1610', c: '#8A4B6E', tags: ['Macbeth', 'Hamlet', 'Romeo y Julieta', 'poder', 'amor'] },
    { n: 'Siglo de Oro', y: 'Siglos XVI-XVII', c: '#1F5FA8', tags: ['Quijote', 'La vida es sueño', 'libertad'] },
    { n: 'Novela moderna', y: '1866-1915', c: '#4A5A8A', tags: ['Crimen y castigo', 'Iván Ilich', 'La metamorfosis'] },
    { n: 'Macondo', y: '1967', c: '#2F7D32', tags: ['Cien años de soledad', 'destino'] },
    { n: 'Antígona en Colombia', y: '2014', c: '#C0453A', tags: ['víctimas', 'memoria', 'teatro'] },
  ], steps: [
    { t: 'Un clásico sigue hablando', at: 0 },
    { t: 'Temas universales', at: 5 },
    { t: 'El poder y el amor', at: 2 },
    { t: 'La muerte', at: 1 },
    { t: 'El destino y la libertad', at: 3 },
    { t: 'Obras y autores clave', at: 4 },
    { t: 'Antígona: conciencia contra poder', at: 6 },
  ] },
  g11u1l2: { type: 'gallery', rooms: [
    { n: 'Siglo XIX', y: '1867-1888', c: '#6B5B4B', tags: ['Romanticismo', 'María', 'Modernismo', 'Azul...'] },
    { n: 'Futurismo', y: '1909', c: '#C0453A', tags: ['velocidad', 'máquinas', 'Marinetti'] },
    { n: 'Dadaísmo', y: '1916', c: '#B06A10', tags: ['absurdo', 'antiarte', 'Tzara'] },
    { n: 'Surrealismo', y: '1924', c: '#7B3FA0', tags: ['sueños', 'escritura automática', 'Breton'] },
    { n: 'Los Nuevos', y: '1922-1925', c: '#1F5FA8', tags: ['Trilce', 'creacionismo', 'León de Greiff', 'Luis Vidales'] },
    { n: 'Nadaísmo', y: '1958', c: '#2F7D32', tags: ['Gonzalo Arango', 'Jotamario Arbeláez', 'provocación', 'Medellín'] },
    { n: 'Siglo XX latinoamericano', y: '1924-1982', c: '#8A4B6E', tags: ['La vorágine', 'Pedro Páramo', 'Rayuela', 'Cien años de soledad', 'Nobel 1982'] },
  ], steps: [
    { t: 'Romper con la tradición', at: 0 },
    { t: 'Futurismo: velocidad', at: 1 },
    { t: 'Dadá: el absurdo', at: 2 },
    { t: 'Surrealismo: los sueños', at: 3 },
    { t: 'Hispanoamérica y Los Nuevos', at: 4 },
    { t: 'Nadaísmo en Medellín', at: 5 },
    { t: 'El gran siglo latinoamericano', at: 6 },
  ] },
  g11u1l3: { type: 'levels', text: CAMILA, steps: [
    { t: 'El lector autónomo', layer: null, q: '¿Quién decide qué leer?', evidence: 'pidió un libro por la portada' },
    { t: 'El plan lector', layer: null, q: '¿Qué la ayuda a elegir la próxima lectura?', evidence: 'anota en una libreta qué la engancha' },
    { t: 'Antes: propósito y predicción', layer: null, text: 'Antes de leer, Camila mira la portada: un bote solo en el mar. Lee la contraportada y predice que es una historia de supervivencia.', q: '¿Qué predice por la portada?', evidence: 'predice que es una historia de supervivencia' },
    { t: 'Durante: subrayar y preguntar', layer: null, text: 'Mientras lee, Camila subraya una sola frase por página y anota al margen: ¿por qué el náufrago no se rinde? Deja el celular en otro cuarto.', q: '¿Qué anota al margen?', evidence: '¿por qué el náufrago no se rinde?' },
    { t: 'Durante: releer y comprobar', layer: null, text: 'Cuando algo no le queda claro, Camila relee el párrafo y se dice con sus propias palabras lo que acaba de leer.', q: '¿Cómo comprueba que entendió?', evidence: 'se dice con sus propias palabras' },
    { t: 'Después: resumir y compartir', layer: null, text: 'Al terminar, Camila resume el libro en cinco líneas y lo comenta en el club de lectura de su biblioteca.', q: '¿Qué hace al terminar?', evidence: 'lo comenta en el club de lectura' },
    { t: 'Tres niveles de lectura', layer: 'inferencial', text: CAMILA, q: 'Literal: ¿dónde? Inferencial: ¿qué cambió en ella? Crítico: ¿es buena idea elegir por la portada?', evidence: 'no pudo soltarlo' },
  ] },
  g11u2l1: { type: 'argument', thesis: 'Bogotá debe proteger sus páramos', items: AGUA.slice(0, 1), steps: [
    { t: 'Tesis y argumento', items: AGUA.slice(0, 1) },
    { t: 'Autoridad y causa', items: AGUA.slice(0, 3) },
    { t: 'Analogía, datos y ejemplo', items: AGUA },
    { t: '¿De dónde saca su fuerza?', items: AGUA, reveal: null },
    { t: 'El contraargumento', items: [...AGUA, { t: 'La minería da empleo', kind: 'contra', w: 2, side: 'con' }] },
    { t: 'Lo que pesa y lo que no', items: [...AGUA, { t: 'La minería da empleo', kind: 'contra', w: 2, side: 'con' }, { t: 'Un famoso dice que no', kind: 'contra', w: 1, side: 'con' }] },
  ] },
  g11u2l2: { type: 'argument', thesis: 'La cafetería debe tener comida saludable', items: FALACIAS.slice(0, 2), steps: [
    { t: 'Parece un argumento', items: FALACIAS.slice(0, 2), reveal: null },
    { t: 'Ad hominem y hombre de paja', items: FALACIAS.slice(0, 3), reveal: 1 },
    { t: 'Falso dilema y generalización', items: FALACIAS.slice(0, 4), reveal: 3 },
    { t: 'Mayoría y pendiente resbaladiza', items: FALACIAS.slice(0, 6), reveal: 5 },
    { t: 'Falsa causa y pregunta compleja', items: FALACIAS.slice(0, 7), reveal: 6 },
    { t: 'Falsa autoridad y emoción', items: FALACIAS, reveal: 7 },
    { t: 'Responder a la idea', items: [FALACIAS[0], { t: 'Nutricionista: más frutas', kind: 'arg', w: 2, side: 'pro' }], reveal: null },
  ] },
  g11u2l3: { type: 'textarch', kind: 'ensayo', parts: ENSAYO, steps: [
    { t: 'Introducción y desarrollo', focus: 0 },
    { t: 'Conclusión y referencias', focus: 5 },
    { t: 'Así se arma un párrafo', focus: 1 },
    { t: 'Contraargumento y refutación', focus: 4 },
    { t: 'Conectores: orden, adición, oposición', focus: 4, parts: ENSAYO_CONECTORES },
    { t: 'Conectores: consecuencia y cierre', focus: 5, parts: ENSAYO_CONECTORES },
    { t: 'Sin fuentes, el ensayo se inclina', focus: null, parts: ENSAYO, remove: 2 },
  ] },
  g11u3l1: { type: 'levels', text: ZULETA, steps: [
    { t: 'El problema: la pregunta', layer: 'literal', q: '¿Qué pregunta plantea el texto?', evidence: '¿Por qué soñamos con una vida sin obstáculos?' },
    { t: 'La tesis: la respuesta', layer: 'inferencial', q: '¿Qué responde el autor?', evidence: 'Desear que todo sea fácil es desear, en el fondo, dejar de pensar' },
    { t: 'Argumentos y ejemplos', layer: 'inferencial', q: '¿Qué ejemplo apoya la tesis?', evidence: 'Quien aprende a tocar guitarra no pide que desaparezcan las cuerdas' },
    { t: 'Pistas: "en el fondo"', layer: 'inferencial', q: '¿Qué palabras anuncian la postura del autor?', evidence: 'en el fondo' },
    { t: 'Platón y Aristóteles', layer: null, text: 'Platón: la caverna, de la ignorancia al conocimiento. Aristóteles: el ser humano es un animal político.', q: '¿A qué pregunta responde cada tesis?', evidence: 'animal político' },
    { t: 'Descartes y Kant', layer: null, text: 'Descartes: "Pienso, luego existo". Kant: "¡Atrévete a saber!".', q: '¿Qué no se puede dudar, según Descartes?', evidence: '"Pienso, luego existo"' },
    { t: 'Dialogar con Zuleta', layer: 'critico', text: ZULETA, q: '¿Estás de acuerdo con que la facilidad nos impide pensar?', evidence: 'Desear que todo sea fácil es desear, en el fondo, dejar de pensar' },
  ] },
  g11u3l2: { type: 'newsdesk', blocks: [
    { k: 'titular', t: 'Miles marchan por la educación' }, { k: 'dato', t: '15.000 personas, según Gobierno' },
    { k: 'opinion', t: '"Vándalos secuestran la Séptima"' }, { k: 'foto', t: 'Plano cerrado de un grafiti' },
    { k: 'fuente', t: '¿Quién tiene la voz?' },
  ], steps: [
    { t: 'Cada medio elige un enfoque', focus: 'titular' },
    { t: 'Datos, valoraciones y fuentes', focus: 'opinion', ask: ['qué', 'quién', 'por qué'] },
    { t: 'Información u opinión', focus: 'dato', ask: null },
    { t: 'Contrastar antes de creer', focus: 'fuente', ask: null },
    { t: 'Confiable', focus: 'fuente', blocks: [
      { k: 'titular', t: 'TransMilenio cierra 3 estaciones' }, { k: 'dato', t: 'De 2:00 a 6:00 p. m.' },
      { k: 'fuente', t: 'Cuenta oficial de TransMilenio' },
    ] },
    { t: 'Engañosa', focus: 'foto', blocks: [
      { k: 'titular', t: 'Caos total: la ciudad colapsa' }, { k: 'cuerpo', t: 'Movilidad afectada 40 minutos' },
      { k: 'foto', t: 'Foto real, pero de 2019' }, { k: 'fuente', t: 'Una sola voz' },
    ] },
    { t: 'Falsa', focus: 'fuente', blocks: [
      { k: 'titular', t: 'Eliminarán Saber 11' }, { k: 'dato', t: 'Sin fecha ni enlace' },
      { k: 'fuente', t: 'Cadena: "reenvía ya"' },
    ] },
  ] },
  g11u3l3: { type: 'levels', text: BIBLIO, steps: [
    { t: 'Tres competencias, tres niveles', layer: null, q: 'Literal, inferencial y crítico', evidence: '' },
    { t: 'Identificar y comprender', layer: 'literal', q: '¿Cuántos libros se prestaron en 2024?', evidence: 'En 2024 se prestaron 61.000 libros' },
    { t: 'Reflexionar y evaluar', layer: 'critico', q: '¿Por qué el autor usa la palabra imperdonable?', evidence: 'imperdonable' },
    { t: 'Continuos y discontinuos', layer: null, text: 'TABLA. Préstamos de libros por año: 2019: 52.000 · 2020: 9.000 · 2024: 61.000.', q: '¿Qué dicen el título y las unidades?', evidence: 'Préstamos de libros por año' },
    { t: 'Dato, conclusión u opinión', layer: 'inferencial', text: BIBLIO, q: '¿Qué frase es una conclusión?', evidence: 'Todo indica que los clubes ayudaron' },
    { t: 'Buscar la evidencia', layer: 'literal', q: '¿Cuánto bajaron los préstamos en 2020?', evidence: 'los préstamos bajaron a 9.000' },
    { t: 'Descartar trampas', layer: 'inferencial', q: '¿"Los préstamos subieron todos los años"? El texto dice otra cosa.', evidence: 'cerró siete meses y los préstamos bajaron a 9.000' },
  ] },
};
