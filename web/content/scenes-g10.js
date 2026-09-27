// Escenas de "Aprende" del grado 10° (formato en lib/SPEC.md).
export const SCENES_G10 = {
  g10u1l1: { type: 'gallery', rooms: [
    { n: 'Edad Media', y: 'Siglos XII-XV', c: '#7A5C3A', tags: ['juglares', 'Cantar de mio Cid', 'La Celestina'] },
    { n: 'Renacimiento', y: 'Siglo XVI', c: '#2E7D8C', tags: ['armonía', 'soneto', 'Lazarillo'] },
    { n: 'Barroco', y: 'Siglo XVII', c: '#8A4B6E', tags: ['desengaño', 'contraste', 'Quijote'] },
  ], steps: [
    { t: 'Edad Media: la voz de los juglares', at: 0 },
    { t: 'Renacimiento: armonía y soneto', at: 1 },
    { t: 'Barroco: el desengaño', at: 2 },
  ] },
  g10u1l2: { type: 'gallery', rooms: [
    { n: 'Romanticismo', y: '1835-1870', c: '#8A4B6E', tags: ['el yo', 'emoción', 'Bécquer'] },
    { n: 'Realismo y Modernismo', y: '1870-1910', c: '#B06A10', tags: ['sociedad', 'Galdós', 'Rubén Darío'] },
    { n: 'Generación del 27', y: '1927-1936', c: '#1F5FA8', tags: ['vanguardia', 'romance', 'Lorca'] },
  ], steps: [
    { t: 'Romanticismo: el yo y la emoción', at: 0 },
    { t: 'Realismo y Modernismo', at: 1 },
    { t: 'La Generación del 27', at: 2 },
  ] },
  g10u1l3: { type: 'gallery', rooms: [
    { n: 'Barroco', y: 'Siglo XVII', c: '#8A4B6E', tags: ['Las meninas', 'La vida es sueño', 'apariencia'] },
    { n: 'Goya y el Romanticismo', y: '1799-1850', c: '#3A3A5C', tags: ['Los caprichos', 'lo nocturno', 'lo irracional'] },
    { n: 'Vanguardias', y: '1920-1940', c: '#C0453A', tags: ['Guernica', 'Poeta en Nueva York', 'fragmentos'] },
  ], steps: [
    { t: 'Velázquez y Calderón', at: 0 },
    { t: 'Goya anuncia el Romanticismo', at: 1 },
    { t: 'Picasso, Lorca y la comparación', at: 2 },
  ] },
  g10u2l1: { type: 'levels', text: 'El TransMiCable se inauguró en diciembre de 2018. Antes, los vecinos gastaban cerca de una hora para bajar al portal; hoy el viaje dura unos trece minutos. Doña Marleny dice que ya no pierde a sus primeros clientes. Un concejal escribió que es la mejor obra de la historia de Bogotá.', steps: [
    { t: 'Literal: lo que dice', layer: 'literal', q: '¿Cuánto dura hoy el viaje?', evidence: 'unos trece minutos' },
    { t: 'Inferencial: lo que da a entender', layer: 'inferencial', q: '¿Cómo cambió el negocio de doña Marleny?', evidence: 'ya no pierde a sus primeros clientes' },
    { t: 'Crítico: lo que se puede juzgar', layer: 'critico', q: '¿Está bien sustentada la opinión del concejal?', evidence: 'es la mejor obra de la historia de Bogotá' },
  ] },
  g10u2l2: { type: 'levels', text: '¿Cómo llegamos al colegio? Encuesta a 600 estudiantes, marzo de 2026. A pie: 45 %. Bus: 30 %. Bicicleta: 15 %. Carro: 10 %. Frente a 2025, la bicicleta subió 5 puntos. Eje vertical desde 0.', steps: [
    { t: 'Continuo y discontinuo', layer: null, q: '¿Qué tipo de texto es?', evidence: '¿Cómo llegamos al colegio?' },
    { t: 'Fuente, fecha y dato', layer: 'literal', q: '¿Qué medio usa la mayor parte?', evidence: 'A pie: 45 %' },
    { t: 'Caricaturas y gráficas que engañan', layer: 'critico', q: '¿La gráfica exagera las diferencias?', evidence: 'Eje vertical desde 0' },
  ] },
  g10u2l3: { type: 'argument', thesis: 'La ciclorruta de la avenida debe construirse ya', items: [
    { t: 'Cientos de estudiantes van en bicicleta', kind: 'dato', w: 2, side: 'pro' },
  ], steps: [
    { t: 'La intención: convencer', items: [
      { t: 'Cientos de estudiantes van en bicicleta', kind: 'dato', w: 2, side: 'pro' },
    ], reveal: null },
    { t: 'Las marcas de la postura', items: [
      { t: 'Cientos de estudiantes van en bicicleta', kind: 'dato', w: 2, side: 'pro' },
      { t: 'Otras ciudades redujeron accidentes', kind: 'ejemplo', w: 2, side: 'pro' },
      { t: 'Quita un carril a los buses', kind: 'contra', w: 2, side: 'con' },
    ], reveal: null },
    { t: 'Argumento o falacia', items: [
      { t: 'Cientos de estudiantes van en bicicleta', kind: 'dato', w: 2, side: 'pro' },
      { t: 'Otras ciudades redujeron accidentes', kind: 'ejemplo', w: 2, side: 'pro' },
      { t: 'Quita un carril a los buses', kind: 'contra', w: 2, side: 'con' },
      { t: 'Quien la pide es un ignorante', kind: 'falacia', w: 3, side: 'con' },
    ], reveal: 3 },
  ] },
  g10u3l1: { type: 'textarch', kind: 'resena', parts: [
    { n: 'Ficha técnica', t: 'María, Isaacs, 1867' }, { n: 'Resumen', t: 'De qué trata, sin el final' },
    { n: 'Valoración', t: 'Criterios y ejemplos' }, { n: 'Recomendación', t: 'Para quién y por qué' },
  ], steps: [
    { t: 'Qué es una reseña crítica', focus: null },
    { t: 'Las cuatro partes', focus: 1 },
    { t: 'Sin valoración no hay reseña', focus: null, remove: 2 },
  ] },
  g10u3l2: { type: 'voice', text: 'Hoy quiero demostrarles que la biblioteca del barrio no es un lujo: es un derecho.', steps: [
    { t: 'Ponencia: voz para un auditorio', mode: 'fuerte', pauses: [] },
    { t: 'Estructura: pausas entre partes', mode: 'pausas', pauses: [2, 11] },
    { t: 'Voz expresiva y relatoría', mode: 'expresiva', pauses: [2, 11] },
  ] },
  g10u3l3: { type: 'sentence', subj: ['Los', 'resultados', 'del', 'examen'], pred: ['fueron', 'publicados', 'ayer'], nuc: { s: 1, p: 0 }, cats: ['art', 'sus', 'pre', 'sus', 'ver', 'ver', 'adv'], steps: [
    { t: 'Concordancia sujeto y verbo', show: 'nuclei', plural: true },
    { t: 'Sin coma entre sujeto y verbo', show: 'split', plural: null },
    { t: 'Pronombres contra la repetición', subj: ['La', 'rectora'], pred: ['leyó', 'los', 'resultados', 'y', 'los', 'comentó'], nuc: { s: 1, p: 0 }, cats: ['art', 'sus', 'ver', 'art', 'sus', 'con', 'pro', 'ver'], show: 'cats', focusCat: 'pro' },
  ] },
};
