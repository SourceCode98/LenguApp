// Escenas de "Aprende" del grado 10° (formato en lib/SPEC.md).
export const SCENES_G10 = {
  g10u1l1: { type: 'gallery', rooms: [
    { n: 'Edad Media', y: 'Siglos XII-XV', c: '#7A5C3A', tags: ['juglares', 'Cantar de mio Cid', 'Manrique', 'La Celestina'] },
    { n: 'Renacimiento', y: 'Siglo XVI', c: '#2E7D8C', tags: ['armonía', 'Garcilaso', 'Lazarillo', 'místicos'] },
    { n: 'Barroco', y: 'Siglo XVII', c: '#8A4B6E', tags: ['desengaño', 'contraste', 'Lope', 'Calderón'] },
    { n: 'Cervantes', y: '1547-1616', c: '#B06A10', tags: ['Lepanto', 'Quijote', 'parodia', 'novela moderna'] },
  ], steps: [
    { t: 'Edad Media: la voz de los juglares', at: 0 },
    { t: 'Renacimiento: armonía y soneto', at: 1 },
    { t: 'Barroco: el desengaño', at: 2 },
    { t: 'Cervantes y la novela moderna', at: 3 },
  ] },
  g10u1l2: { type: 'gallery', rooms: [
    { n: 'Romanticismo', y: '1835-1870', c: '#8A4B6E', tags: ['el yo', 'libertad', 'Bécquer', 'María'] },
    { n: 'Realismo y Naturalismo', y: '1870-1900', c: '#B06A10', tags: ['sociedad', 'Galdós', 'La Regenta', 'herencia y medio'] },
    { n: 'Modernismo', y: '1888-1916', c: '#2E7D8C', tags: ['musicalidad', 'Rubén Darío', 'Silva', 'cisnes'] },
    { n: 'Generación del 27', y: '1927-1936', c: '#1F5FA8', tags: ['vanguardia', 'romance', 'Lorca'] },
  ], steps: [
    { t: 'Romanticismo: el yo y la emoción', at: 0 },
    { t: 'Realismo y Naturalismo', at: 1 },
    { t: 'Modernismo: la música del verso', at: 2 },
    { t: 'La Generación del 27', at: 3 },
  ] },
  g10u1l3: { type: 'gallery', rooms: [
    { n: 'El Greco y los místicos', y: 'Siglo XVI', c: '#2E7D8C', tags: ['Toledo', 'figuras alargadas', 'espiritualidad'] },
    { n: 'Barroco', y: 'Siglo XVII', c: '#8A4B6E', tags: ['Las meninas', 'La vida es sueño', 'claroscuro'] },
    { n: 'Goya y el Romanticismo', y: '1799-1850', c: '#3A3A5C', tags: ['Los caprichos', 'lo nocturno', 'lo irracional'] },
    { n: 'Vanguardias', y: '1920-1940', c: '#C0453A', tags: ['Guernica', 'surrealismo', 'Dalí y Lorca', 'fragmentos'] },
  ], steps: [
    { t: 'El Greco y la espiritualidad', at: 0 },
    { t: 'Velázquez y Calderón', at: 1 },
    { t: 'Goya anuncia el Romanticismo', at: 2 },
    { t: 'Picasso, Lorca y la comparación', at: 3 },
  ] },
  g10u2l1: { type: 'levels', text: 'El TransMiCable se inauguró en diciembre de 2018. Antes, los vecinos gastaban cerca de una hora para bajar al portal; hoy el viaje dura unos trece minutos. Doña Marleny dice que ya no pierde a sus primeros clientes. Un concejal escribió que es la mejor obra de la historia de Bogotá.', steps: [
    { t: 'Literal: lo que dice', layer: 'literal', q: '¿Cuánto dura hoy el viaje?', evidence: 'unos trece minutos' },
    { t: 'Inferencial: lo que da a entender', layer: 'inferencial', q: '¿Cómo cambió el negocio de doña Marleny?', evidence: 'ya no pierde a sus primeros clientes' },
    { t: 'Crítico: lo que se puede juzgar', layer: 'critico', q: '¿Está bien sustentada la opinión del concejal?', evidence: 'es la mejor obra de la historia de Bogotá' },
  ] },
  g10u2l2: { type: 'levels', text: '¿Cómo llegamos al colegio? Encuesta a 600 estudiantes, marzo de 2026. A pie: 45 %. Bus: 30 %. Bicicleta: 15 %. Carro: 10 %. Frente a 2025, la bicicleta subió 5 puntos. Eje vertical desde 0.', steps: [
    { t: 'Continuo y discontinuo', layer: null, q: '¿Qué tipo de texto es?', evidence: '¿Cómo llegamos al colegio?' },
    { t: 'Fuente, fecha y dato', layer: 'literal', q: '¿Qué medio usa la mayor parte?', evidence: 'A pie: 45 %' },
    { t: 'Números con cuidado', layer: 'inferencial', q: '¿Cuánto subió la bicicleta frente a 2025?', evidence: 'la bicicleta subió 5 puntos' },
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
    ], reveal: null },
    { t: 'Falacias contra la persona', items: [
      { t: 'Cientos de estudiantes van en bicicleta', kind: 'dato', w: 2, side: 'pro' },
      { t: 'Otras ciudades redujeron accidentes', kind: 'ejemplo', w: 2, side: 'pro' },
      { t: 'Quita un carril a los buses', kind: 'contra', w: 2, side: 'con' },
      { t: 'Quien la pide es un ignorante', kind: 'falacia', w: 3, side: 'con' },
    ], reveal: 3 },
    { t: 'Falacias de razonamiento', items: [
      { t: 'Cientos de estudiantes van en bicicleta', kind: 'dato', w: 2, side: 'pro' },
      { t: 'Otras ciudades redujeron accidentes', kind: 'ejemplo', w: 2, side: 'pro' },
      { t: 'Quita un carril a los buses', kind: 'contra', w: 2, side: 'con' },
      { t: 'Si la hacen, cerrarán todas las vías', kind: 'falacia', w: 3, side: 'con' },
    ], reveal: 3 },
  ] },
  g10u3l1: { type: 'textarch', kind: 'resena', parts: [
    { n: 'Ficha técnica', t: 'María, Isaacs, 1867' }, { n: 'Resumen', t: 'De qué trata, sin el final' },
    { n: 'Valoración', t: 'Criterios y ejemplos' }, { n: 'Recomendación', t: 'Para quién y por qué' },
  ], steps: [
    { t: 'Qué es una reseña crítica', focus: null },
    { t: 'Las cuatro partes', focus: 1 },
    { t: 'Sin valoración no hay reseña', focus: null, remove: 2 },
    { t: 'Paso a paso: escribir y revisar', focus: 0, remove: null },
  ] },
  g10u3l2: { type: 'voice', text: 'Hoy quiero demostrarles que la biblioteca del barrio no es un lujo: es un derecho.', steps: [
    { t: 'Ponencia: voz para un auditorio', mode: 'fuerte', pauses: [] },
    { t: 'Estructura: pausas entre partes', mode: 'pausas', pauses: [2, 11] },
    { t: 'Voz y cuerpo expresivos', mode: 'expresiva', pauses: [2, 11] },
    { t: 'La relatoría: fiel a lo dicho', mode: 'suave', text: 'La ponente sostuvo que la biblioteca del barrio es un derecho y propuso ampliar su horario.', pauses: [2] },
  ] },
  g10u3l3: { type: 'sentence', subj: ['Los', 'resultados', 'del', 'examen'], pred: ['fueron', 'publicados', 'ayer'], nuc: { s: 1, p: 0 }, cats: ['art', 'sus', 'pre', 'sus', 'ver', 'ver', 'adv'], steps: [
    { t: 'Concordancia sujeto y verbo', show: 'nuclei', plural: true },
    { t: 'Sin coma entre sujeto y verbo', show: 'split', plural: null },
    { t: 'Agudas, graves y esdrújulas', type: 'syllable', word: 'carácter', syl: ['ca', 'rác', 'ter'], tonic: 1, rule: 'grave', tilde: true },
    { t: 'Hiatos y palabras que suenan igual', type: 'syllable', word: 'búho', syl: ['bú', 'ho'], tonic: 0, rule: null, tilde: true },
    { t: 'Pronombres contra la repetición', type: 'sentence', subj: ['La', 'rectora'], pred: ['leyó', 'los', 'resultados', 'y', 'los', 'comentó'], nuc: { s: 1, p: 0 }, cats: ['art', 'sus', 'ver', 'art', 'sus', 'con', 'pro', 'ver'], show: 'cats', focusCat: 'pro' },
  ] },
};
