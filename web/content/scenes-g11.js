// Escenas de "Aprende" del grado 11° (formato en lib/SPEC.md).
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
    { t: 'El poder y el amor', at: 2 },
    { t: 'La muerte y el destino', at: 1 },
    { t: 'Obras y autores clave', at: 4 },
    { t: 'Antígona hoy', at: 6 },
  ] },
  g11u1l2: { type: 'gallery', rooms: [
    { n: 'Siglo XIX', y: '1867-1888', c: '#6B5B4B', tags: ['Romanticismo', 'María', 'Modernismo', 'Azul...'] },
    { n: 'Futurismo', y: '1909', c: '#C0453A', tags: ['velocidad', 'máquinas', 'Marinetti'] },
    { n: 'Dadaísmo', y: '1916', c: '#B06A10', tags: ['absurdo', 'antiarte', 'Tzara'] },
    { n: 'Surrealismo', y: '1924', c: '#7B3FA0', tags: ['sueños', 'escritura automática', 'Breton'] },
    { n: 'Los Nuevos', y: '1925', c: '#1F5FA8', tags: ['León de Greiff', 'Luis Vidales'] },
    { n: 'Nadaísmo', y: '1958', c: '#2F7D32', tags: ['Gonzalo Arango', 'Jotamario Arbeláez', 'provocación', 'Medellín'] },
    { n: 'Siglo XX latinoamericano', y: '1924-1982', c: '#8A4B6E', tags: ['La vorágine', 'Pedro Páramo', 'Rayuela', 'Cien años de soledad', 'Nobel 1982'] },
  ], steps: [
    { t: 'Romper con la tradición', at: 1 },
    { t: 'Dadá y el mundo de los sueños', at: 3 },
    { t: 'Vanguardias colombianas', at: 5 },
    { t: 'El gran siglo latinoamericano', at: 6 },
  ] },
  g11u1l3: { type: 'levels', text: 'Camila solo leía lo que le mandaban en el colegio. Un sábado, en una biblioteca de BibloRed, pidió un libro por la portada y no pudo soltarlo. Desde entonces anota en una libreta qué la engancha de cada lectura.', steps: [
    { t: 'Nivel literal: qué dice', layer: 'literal', q: '¿Dónde encontró Camila el libro?', evidence: 'en una biblioteca de BibloRed' },
    { t: 'Nivel inferencial: qué da a entender', layer: 'inferencial', q: '¿Qué cambió en Camila como lectora?', evidence: 'no pudo soltarlo' },
    { t: 'Nivel crítico: qué pienso yo', layer: 'critico', q: '¿Es buena estrategia elegir un libro por la portada?', evidence: 'pidió un libro por la portada' },
  ] },
  g11u2l1: { type: 'argument', thesis: 'Bogotá debe proteger sus páramos', items: [
    { t: 'Sin páramos baja el agua', kind: 'arg', w: 2, side: 'pro' },
  ], steps: [
    { t: 'Tesis y argumento', items: [
      { t: 'Sin páramos baja el agua', kind: 'arg', w: 2, side: 'pro' },
      { t: 'Según una hidróloga experta', kind: 'arg', w: 2, side: 'pro' },
    ] },
    { t: 'Datos, causa, analogía y ejemplo', items: [
      { t: 'Sin páramos baja el agua', kind: 'arg', w: 2, side: 'pro' },
      { t: 'Según una hidróloga experta', kind: 'arg', w: 2, side: 'pro' },
      { t: 'Chingaza: cerca del 70 %', kind: 'dato', w: 3, side: 'pro' },
      { t: 'El páramo es una esponja', kind: 'arg', w: 1, side: 'pro' },
      { t: 'Barrio que ahorró agua', kind: 'ejemplo', w: 1, side: 'pro' },
    ] },
    { t: 'El contraargumento', items: [
      { t: 'Sin páramos baja el agua', kind: 'arg', w: 2, side: 'pro' },
      { t: 'Según una hidróloga experta', kind: 'arg', w: 2, side: 'pro' },
      { t: 'Chingaza: cerca del 70 %', kind: 'dato', w: 3, side: 'pro' },
      { t: 'El páramo es una esponja', kind: 'arg', w: 1, side: 'pro' },
      { t: 'Barrio que ahorró agua', kind: 'ejemplo', w: 1, side: 'pro' },
      { t: 'La minería da empleo', kind: 'contra', w: 2, side: 'con' },
    ] },
  ] },
  g11u2l2: { type: 'argument', thesis: 'La cafetería debe tener comida saludable', items: [
    { t: 'Encuesta: 60 % la pide', kind: 'dato', w: 3, side: 'pro' },
    { t: 'Ella ni hace deporte', kind: 'falacia', w: 3, side: 'con' },
  ], steps: [
    { t: 'Parece un argumento', reveal: null },
    { t: 'Ataque a la persona', reveal: 1 },
    { t: 'Mayoría, cadena y falsa causa', items: [
      { t: 'Encuesta: 60 % la pide', kind: 'dato', w: 3, side: 'pro' },
      { t: 'Ella ni hace deporte', kind: 'falacia', w: 3, side: 'con' },
      { t: 'Todos los de once me apoyan', kind: 'falacia', w: 2, side: 'con' },
      { t: 'Si cambian el menú, cierran todo', kind: 'falacia', w: 2, side: 'con' },
    ], reveal: 3 },
    { t: 'Falsa autoridad y otras trampas', items: [
      { t: 'Encuesta: 60 % la pide', kind: 'dato', w: 3, side: 'pro' },
      { t: 'Ella ni hace deporte', kind: 'falacia', w: 3, side: 'con' },
      { t: 'Todos los de once me apoyan', kind: 'falacia', w: 2, side: 'con' },
      { t: 'Si cambian el menú, cierran todo', kind: 'falacia', w: 2, side: 'con' },
      { t: 'Un youtuber dice que no', kind: 'falacia', w: 2, side: 'con' },
    ], reveal: 4 },
    { t: 'Responder a la idea', items: [
      { t: 'Encuesta: 60 % la pide', kind: 'dato', w: 3, side: 'pro' },
      { t: 'Nutricionista: más frutas', kind: 'arg', w: 2, side: 'pro' },
    ], reveal: null },
  ] },
  g11u2l3: { type: 'textarch', kind: 'ensayo', parts: [
    { n: 'Introducción', t: 'Tesis: enseñar a usar la IA' }, { n: 'Argumento 1', t: 'Prohibirla no evita su uso' },
    { n: 'Argumento 2', t: 'UNESCO (2023) pide criterio' }, { n: 'Argumento 3', t: 'Retroalimentación inmediata' },
    { n: 'Contraargumento', t: '"No pensaremos": se refuta' }, { n: 'Conclusión', t: 'Reglas claras, no prohibición' },
  ], steps: [
    { t: 'Introducción, desarrollo y conclusión', focus: 0 },
    { t: 'Contraargumento y refutación', focus: 4 },
    { t: 'Conectores que guían', focus: null, parts: [
      { n: 'Introducción', t: 'Tesis: enseñar a usar la IA' }, { n: 'Argumento 1', t: 'En primer lugar: no evita su uso' },
      { n: 'Argumento 2', t: 'Además: UNESCO (2023)' }, { n: 'Argumento 3', t: 'También: retroalimentación' },
      { n: 'Contraargumento', t: 'Sin embargo: "no pensaremos"' }, { n: 'Conclusión', t: 'En conclusión: reglas claras' },
    ] },
    { t: 'Sin fuentes, el ensayo se inclina', focus: null, remove: 2 },
  ] },
  g11u3l1: { type: 'levels', text: '¿Por qué soñamos con una vida sin obstáculos? Desear que todo sea fácil es desear, en el fondo, dejar de pensar. Quien aprende a tocar guitarra no pide que desaparezcan las cuerdas.', steps: [
    { t: 'El problema: la pregunta', layer: 'literal', q: '¿Qué pregunta plantea el texto?', evidence: '¿Por qué soñamos con una vida sin obstáculos?' },
    { t: 'La tesis y su apoyo', layer: 'inferencial', q: '¿Qué ejemplo apoya la tesis?', evidence: 'Quien aprende a tocar guitarra no pide que desaparezcan las cuerdas' },
    { t: 'Grandes preguntas, grandes tesis', layer: null, text: 'Platón: la caverna, de la ignorancia al conocimiento. Aristóteles: el ser humano es un animal político. Descartes: "Pienso, luego existo". Kant: "¡Atrévete a saber!".', q: '¿A qué pregunta responde cada tesis?', evidence: '"Pienso, luego existo"' },
    { t: 'Dialogar con Zuleta', layer: 'critico', text: '¿Por qué soñamos con una vida sin obstáculos? Desear que todo sea fácil es desear, en el fondo, dejar de pensar. Quien aprende a tocar guitarra no pide que desaparezcan las cuerdas.', q: '¿Estás de acuerdo con que la facilidad nos impide pensar?', evidence: 'Desear que todo sea fácil es desear, en el fondo, dejar de pensar' },
  ] },
  g11u3l2: { type: 'newsdesk', blocks: [
    { k: 'titular', t: 'Miles marchan por la educación' }, { k: 'dato', t: '15.000 personas, según Gobierno' },
    { k: 'opinion', t: '"Vándalos secuestran la Séptima"' }, { k: 'foto', t: 'Plano cerrado de un grafiti' },
    { k: 'fuente', t: '¿Quién tiene la voz?' },
  ], steps: [
    { t: 'Cada medio elige un enfoque', focus: 'titular' },
    { t: 'Datos, valoraciones y fuentes', focus: 'opinion', ask: ['qué', 'quién', 'por qué'] },
    { t: 'Contrastar antes de creer', focus: 'fuente', ask: null },
    { t: 'Confiable, engañosa o falsa', focus: 'foto', blocks: [
      { k: 'titular', t: 'Miles marchan por la educación' }, { k: 'dato', t: '15.000 personas, según Gobierno' },
      { k: 'opinion', t: '"Vándalos secuestran la Séptima"' }, { k: 'foto', t: 'Foto real, pero de 2019' },
      { k: 'fuente', t: 'Cadena: "reenvía ya"' },
    ] },
  ] },
  g11u3l3: { type: 'levels', text: 'En 2020 la biblioteca cerró siete meses y los préstamos bajaron a 9.000. En 2024 se prestaron 61.000 libros. Recortar ahora su presupuesto sería un error imperdonable.', steps: [
    { t: 'Tres competencias, tres niveles', layer: 'literal', q: '¿Cuántos libros se prestaron en 2024?', evidence: 'En 2024 se prestaron 61.000 libros' },
    { t: 'Continuos y discontinuos', layer: null, text: 'TABLA. Préstamos de libros por año: 2019: 52.000 · 2020: 9.000 · 2024: 61.000.', q: '¿Qué dicen el título y las unidades?', evidence: 'Préstamos de libros por año' },
    { t: 'Dato, conclusión u opinión', layer: 'critico', text: 'En 2020 la biblioteca cerró siete meses y los préstamos bajaron a 9.000. En 2024 se prestaron 61.000 libros. Recortar ahora su presupuesto sería un error imperdonable.', q: '¿La última frase es un dato o una opinión?', evidence: 'sería un error imperdonable' },
    { t: 'Buscar la evidencia', layer: 'inferencial', q: '¿Qué relación hay entre el cierre y la caída de préstamos?', evidence: 'cerró siete meses y los préstamos bajaron a 9.000' },
  ] },
};
