// Escenas de "Aprende" del grado 11° (formato en lib/SPEC.md).
export const SCENES_G11 = {
  g11u1l1: { type: 'gallery', rooms: [
    { n: 'Grecia clásica', y: 'Siglo V a. C.', c: '#B06A10', tags: ['Antígona', 'Edipo rey', 'destino'] },
    { n: 'Mesopotamia', y: 'Hacia 2000 a. C.', c: '#8A5A2B', tags: ['Gilgamesh', 'muerte'] },
    { n: 'Teatro inglés', y: '1590-1610', c: '#8A4B6E', tags: ['Macbeth', 'Romeo y Julieta', 'poder', 'amor'] },
    { n: 'Siglo de Oro', y: 'Siglos XVI-XVII', c: '#1F5FA8', tags: ['Quijote', 'La vida es sueño'] },
    { n: 'Macondo', y: '1967', c: '#2F7D32', tags: ['Cien años de soledad', 'destino'] },
    { n: 'Antígona en Colombia', y: '2014', c: '#C0453A', tags: ['víctimas', 'memoria', 'teatro'] },
  ], steps: [
    { t: 'Un clásico sigue hablando', at: 0 },
    { t: 'Temas universales', at: 2 },
    { t: 'Antígona hoy', at: 5 },
  ] },
  g11u1l2: { type: 'gallery', rooms: [
    { n: 'Futurismo', y: '1909', c: '#C0453A', tags: ['velocidad', 'máquinas', 'Marinetti'] },
    { n: 'Dadaísmo', y: '1916', c: '#B06A10', tags: ['absurdo', 'antiarte', 'Tzara'] },
    { n: 'Surrealismo', y: '1924', c: '#7B3FA0', tags: ['sueños', 'escritura automática', 'Breton'] },
    { n: 'Los Nuevos', y: '1925', c: '#1F5FA8', tags: ['León de Greiff', 'Luis Vidales'] },
    { n: 'Nadaísmo', y: '1958', c: '#2F7D32', tags: ['Gonzalo Arango', 'provocación', 'Medellín'] },
  ], steps: [
    { t: 'Romper con la tradición', at: 0 },
    { t: 'El mundo de los sueños', at: 2 },
    { t: 'Vanguardias colombianas', at: 4 },
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
    { t: 'Otra falacia cae', items: [
      { t: 'Encuesta: 60 % la pide', kind: 'dato', w: 3, side: 'pro' },
      { t: 'Ella ni hace deporte', kind: 'falacia', w: 3, side: 'con' },
      { t: 'Todos los de once me apoyan', kind: 'falacia', w: 2, side: 'con' },
    ], reveal: 2 },
  ] },
  g11u2l3: { type: 'textarch', kind: 'ensayo', parts: [
    { n: 'Introducción', t: 'Tesis: enseñar a usar la IA' }, { n: 'Argumento 1', t: 'Prohibirla no evita su uso' },
    { n: 'Argumento 2', t: 'UNESCO (2023) pide criterio' }, { n: 'Argumento 3', t: 'Retroalimentación inmediata' },
    { n: 'Contraargumento', t: '"No pensaremos": se refuta' }, { n: 'Conclusión', t: 'Reglas claras, no prohibición' },
  ], steps: [
    { t: 'Introducción, desarrollo y conclusión', focus: 0 },
    { t: 'Contraargumento y conectores', focus: 4 },
    { t: 'Sin fuentes, el ensayo se inclina', focus: null, remove: 2 },
  ] },
  g11u3l1: { type: 'levels', text: '¿Por qué soñamos con una vida sin obstáculos? Desear que todo sea fácil es desear, en el fondo, dejar de pensar. Quien aprende a tocar guitarra no pide que desaparezcan las cuerdas.', steps: [
    { t: 'El problema: la pregunta', layer: 'literal', q: '¿Qué pregunta plantea el texto?', evidence: '¿Por qué soñamos con una vida sin obstáculos?' },
    { t: 'La tesis y su apoyo', layer: 'inferencial', q: '¿Qué ejemplo apoya la tesis?', evidence: 'Quien aprende a tocar guitarra no pide que desaparezcan las cuerdas' },
    { t: 'Dialogar con Zuleta', layer: 'critico', q: '¿Estás de acuerdo con que la facilidad nos impide pensar?', evidence: 'Desear que todo sea fácil es desear, en el fondo, dejar de pensar' },
  ] },
  g11u3l2: { type: 'newsdesk', blocks: [
    { k: 'titular', t: 'Miles marchan por la educación' }, { k: 'dato', t: '15.000 personas, según Gobierno' },
    { k: 'opinion', t: '"Vándalos secuestran la Séptima"' }, { k: 'foto', t: 'Plano cerrado de un grafiti' },
    { k: 'fuente', t: '¿Quién tiene la voz?' },
  ], steps: [
    { t: 'Cada medio elige un enfoque', focus: 'titular' },
    { t: 'Datos, valoraciones y fuentes', focus: 'opinion', ask: ['qué', 'quién', 'por qué'] },
    { t: 'Contrastar antes de creer', focus: 'fuente', ask: null },
  ] },
  g11u3l3: { type: 'levels', text: 'En 2020 la biblioteca cerró siete meses y los préstamos bajaron a 9.000. En 2024 se prestaron 61.000 libros. Recortar ahora su presupuesto sería un error imperdonable.', steps: [
    { t: 'Identificar y entender', layer: 'literal', q: '¿Cuántos libros se prestaron en 2024?', evidence: 'En 2024 se prestaron 61.000 libros' },
    { t: 'Sentido global', layer: 'inferencial', q: '¿Qué relación hay entre el cierre y la caída de préstamos?', evidence: 'cerró siete meses y los préstamos bajaron a 9.000' },
    { t: 'Reflexionar y evaluar', layer: 'critico', q: '¿La última frase es un dato o una opinión?', evidence: 'sería un error imperdonable' },
  ] },
};
