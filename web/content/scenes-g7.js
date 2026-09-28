// Escenas de "Aprende" del grado 7° (formato en lib/SPEC.md). Un paso por párrafo de body.
export const SCENES_G7 = {
  g7u1l1: { type: 'gallery', rooms: [
    { n: 'Narrativo', y: 'Contar', c: '#8A4B6E', tags: ['cuento', 'crónica', 'verbos en pasado'] },
    { n: 'Descriptivo', y: 'Mostrar', c: '#2E6F9E', tags: ['retrato', 'ficha de un animal', 'adjetivos'] },
    { n: 'Expositivo', y: 'Explicar', c: '#4E7A3A', tags: ['enciclopedia', 'datos', 'presente'] },
    { n: 'Argumentativo', y: 'Convencer', c: '#B0562F', tags: ['columna', 'tesis', 'creo, debería'] },
    { n: 'Instructivo', y: 'Guiar', c: '#7A5C2E', tags: ['receta', 'manual', 'pele, mezcle'] },
  ], steps: [
    { t: 'Cada texto tiene una intención', at: 0 },
    { t: 'Narrativo: cuenta', at: 0 },
    { t: 'Descriptivo: muestra', at: 1 },
    { t: 'Expositivo: explica', at: 2 },
    { t: 'Argumentativo: convence', at: 3 },
    { t: 'Instructivo: guía', at: 4 },
    { t: 'La intención que domina', at: 2, rooms: [
      { n: 'Describe', y: 'El celular', c: '#2E6F9E', tags: ['pantalla grande', 'cámara'] },
      { n: 'Narra', y: 'Una historia', c: '#8A4B6E', tags: ['una familia feliz'] },
      { n: 'Convence', y: 'Intención que domina', c: '#B0562F', tags: ['¡Cómpralo!'] },
    ] },
  ] },
  g7u1l2: { type: 'textarch', kind: 'expositivo', parts: [
    { n: 'Introducción', t: 'Sumapaz, el páramo más grande' }, { n: 'Desarrollo', t: 'Agua, especies y amenazas' }, { n: 'Cierre', t: 'Cuidarlo es cuidar el agua' },
  ], steps: [
    { t: 'Explica con datos', focus: null, remove: null },
    { t: 'Introducción, desarrollo y cierre', focus: 1 },
    { t: 'Datos que se comprueban', parts: [
      { n: 'Introducción', t: 'Sumapaz, el páramo más grande' }, { n: 'Desarrollo', t: 'Agua, especies y amenazas' }, { n: 'Cierre', t: 'Cuidarlo es cuidar el agua' }, { n: 'Fuente', t: 'Parques Nacionales' },
    ], focus: 3 },
    { t: 'Idea principal y secundarias', parts: [
      { n: 'Idea principal', t: 'Sumapaz es una esponja de agua' }, { n: 'Secundaria', t: 'Atrapa el agua de la niebla' }, { n: 'Secundaria', t: 'De allí nace el Tunjuelo' },
    ], focus: 0 },
    { t: 'Sin idea principal, se cae', focus: null, remove: 0 },
    { t: 'Tema e idea principal', remove: null, parts: [
      { n: 'Tema', t: 'Los frailejones' }, { n: 'Detalle', t: 'Un centímetro al año' }, { n: 'Idea principal', t: 'Cortarlos es una gran pérdida' },
    ], focus: 2 },
    { t: 'Del texto al mapa conceptual', parts: [
      { n: 'Qué es', t: 'El páramo más grande' }, { n: 'Función', t: 'Esponja de agua' }, { n: 'Vida', t: 'Especies únicas' }, { n: 'Problema', t: 'Ganadería y quemas' }, { n: 'Cierre', t: 'Cuidarlo es cuidar el agua' },
    ], focus: null },
  ] },
  g7u1l3: { type: 'newsdesk', blocks: [
    { k: 'titular', t: 'Colombia vence 2-1 a Ecuador' }, { k: 'entrada', t: 'Goles en el segundo tiempo' }, { k: 'dato', t: '40.000 hinchas en el estadio' },
    { k: 'opinion', t: '"La mejor Selección de la historia"' }, { k: 'fuente', t: 'Acta oficial del partido' },
  ], steps: [
    { t: 'Hechos: se pueden comprobar', focus: 'dato', pyramid: false },
    { t: 'Opiniones: valoraciones', focus: 'opinion', pyramid: false },
    { t: 'Las predicciones no son hechos', focus: 'opinion', blocks: [
      { k: 'titular', t: 'Colombia vence 2-1 a Ecuador' }, { k: 'entrada', t: 'Goles en el segundo tiempo' }, { k: 'dato', t: '40.000 hinchas en el estadio' },
      { k: 'opinion', t: '"Ganaremos el Mundial"' }, { k: 'fuente', t: 'Acta oficial del partido' },
    ] },
    { t: 'Separar y buscar la fuente', focus: 'fuente', pyramid: true },
    { t: 'Confiable', focus: 'fuente', pyramid: false, ask: ['quién', 'cuándo', 'dónde'], blocks: [
      { k: 'titular', t: 'Colombia, subcampeona de América' }, { k: 'dato', t: 'Perdió 1-0 ante Argentina' }, { k: 'fuente', t: 'Varios medios · 15 de julio de 2024' },
    ] },
    { t: 'Engañosa', focus: 'foto', ask: null, blocks: [
      { k: 'titular', t: '¡Colombia, campeona de América!' }, { k: 'foto', t: 'Foto de 2001 como si fuera nueva' }, { k: 'fuente', t: 'Grupo de WhatsApp' },
    ] },
    { t: 'Falsa', focus: 'fuente', blocks: [
      { k: 'titular', t: 'Ver fútbol cura la gripa' }, { k: 'opinion', t: 'Promete algo imposible' }, { k: 'fuente', t: 'Blog anónimo, sin fecha' },
    ] },
  ] },
  g7u2l1: { type: 'gallery', rooms: [
    { n: 'Narrativo', y: 'Alguien cuenta', c: '#8A4B6E', tags: ['narrador', 'personajes', 'historia'] },
    { n: 'Lírico', y: 'Un yo que siente', c: '#2E6F9E', tags: ['yo lírico', 'verso', 'emoción'] },
    { n: 'Dramático', y: 'Para representar', c: '#B0562F', tags: ['diálogo', 'acotaciones', 'escena'] },
  ], steps: [
    { t: 'Narrativo: alguien cuenta', at: 0 },
    { t: 'Cuento, novela, fábula…', at: 0, rooms: [
      { n: 'Narrativo', y: 'Subgéneros', c: '#8A4B6E', tags: ['cuento', 'novela', 'fábula', 'mito', 'leyenda'] },
      { n: 'Lírico', y: 'Un yo que siente', c: '#2E6F9E', tags: ['yo lírico', 'verso', 'emoción'] },
      { n: 'Dramático', y: 'Para representar', c: '#B0562F', tags: ['diálogo', 'acotaciones', 'escena'] },
    ] },
    { t: 'Lírico: alguien siente', at: 1 },
    { t: 'Oda, elegía, soneto, copla', at: 1, rooms: [
      { n: 'Narrativo', y: 'Subgéneros', c: '#8A4B6E', tags: ['cuento', 'novela', 'fábula', 'mito', 'leyenda'] },
      { n: 'Lírico', y: 'Subgéneros', c: '#2E6F9E', tags: ['oda', 'elegía', 'soneto', 'copla'] },
      { n: 'Dramático', y: 'Para representar', c: '#B0562F', tags: ['diálogo', 'acotaciones', 'escena'] },
    ] },
    { t: 'Dramático: se representa', at: 2 },
    { t: 'Tragedia, comedia, drama', at: 2, rooms: [
      { n: 'Narrativo', y: 'Subgéneros', c: '#8A4B6E', tags: ['cuento', 'novela', 'fábula', 'mito', 'leyenda'] },
      { n: 'Lírico', y: 'Subgéneros', c: '#2E6F9E', tags: ['oda', 'elegía', 'soneto', 'copla'] },
      { n: 'Dramático', y: 'Subgéneros', c: '#B0562F', tags: ['tragedia', 'comedia', 'drama'] },
    ] },
    { t: '¿Quién habla?', at: 0, rooms: [
      { n: 'Narrativo', y: 'Alguien cuenta', c: '#8A4B6E', tags: ['en prosa', 'o en verso', 'fábula en verso'] },
      { n: 'Lírico', y: 'Un yo que siente', c: '#2E6F9E', tags: ['yo lírico', 'verso', 'emoción'] },
      { n: 'Dramático', y: 'Personajes en escena', c: '#B0562F', tags: ['diálogo', 'acotaciones', 'escena'] },
    ] },
  ] },
  g7u2l2: { type: 'diorama', setting: 'rio', time: 'noche', chars: [{ n: 'Pescador', c: '#8A5A2B', h: 1.3 }, { n: 'Mohán', c: '#2E6B5E', h: 1.8 }], steps: [
    { t: 'La voz que cuenta', view: 'libre', focus: null },
    { t: 'Desde dónde se mira', view: 'libre', focus: null, moment: 'inicio' },
    { t: 'Protagonista: "yo sentí"', view: 'primera', focus: 0, moment: 'nudo' },
    { t: 'Testigo: "yo vi"', view: 'testigo', focus: 0, moment: 'nudo' },
    { t: 'Omnisciente: lo sabe todo', view: 'omnisciente', focus: null, moment: 'nudo' },
    { t: 'Primera, segunda, tercera', view: 'libre', focus: null, moment: 'nudo' },
    { t: 'Otro narrador, otra historia', view: 'primera', focus: 1, moment: 'desenlace', chars: [{ n: 'Mohán', c: '#2E6B5E', h: 1.8 }, { n: 'Pescador', c: '#8A5A2B', h: 1.3 }] },
  ] },
  g7u2l3: { type: 'gallery', rooms: [
    { n: 'Contexto', y: 'Época de la obra', c: '#7A5C2E', tags: ['historia', 'sociedad', 'costumbres', 'ideas'] },
    { n: 'Bogotá de Pombo', y: '1833-1912', c: '#8A4B6E', tags: ['calles empedradas', 'chicherías', 'guerras civiles'] },
    { n: 'Nueva York', y: '1855-1872', c: '#2E6F9E', tags: ['diplomático', 'Cuentos pintados (1867)', 'Cuentos morales (1869)'] },
    { n: 'La moraleja', y: 'Siglo XIX', c: '#4E7A3A', tags: ['obedecer', 'no ser vanidoso', 'ser prudente'] },
  ], steps: [
    { t: 'La obra y su contexto', at: 0 },
    { t: 'Pombo en la Bogotá del XIX', at: 1 },
    { t: 'Nueva York y los cuentos', at: 2 },
    { t: 'Valores de una época', at: 3 },
    { t: 'La línea de tiempo de Pombo', at: 0, rooms: [
      { n: 'Independencia', y: '1810', c: '#7A5C2E', tags: ['Grito en Santafé'] },
      { n: 'María', y: '1867', c: '#2E6F9E', tags: ['Jorge Isaacs'] },
      { n: 'Tranvía de mulas', y: '1884', c: '#4E7A3A', tags: ['Teatro Colón: 1892'] },
      { n: 'Mil Días', y: '1899-1902', c: '#9E3B3B', tags: ['guerra civil'] },
      { n: 'Poeta nacional', y: '1905', c: '#B08A2E', tags: ['Teatro Colón'] },
    ] },
    { t: 'Romanticismo y Modernismo', at: 0, rooms: [
      { n: 'Romanticismo', y: 'Mediados del XIX', c: '#8A4B6E', tags: ['emoción', 'naturaleza', 'María (1867)'] },
      { n: 'Modernismo', y: 'Fines del XIX', c: '#2E6F9E', tags: ['música del verso', 'Nocturno (1894)'] },
      { n: 'Vanguardias', y: 'Años 20 y 30', c: '#B0562F', tags: ['formas nuevas'] },
      { n: 'Boom', y: 'Años 60 y 70', c: '#4E7A3A', tags: ['Cien años de soledad (1967)'] },
    ] },
    { t: 'El siglo XX', at: 2, rooms: [
      { n: 'Romanticismo', y: 'Mediados del XIX', c: '#8A4B6E', tags: ['emoción', 'naturaleza', 'María (1867)'] },
      { n: 'Modernismo', y: 'Fines del XIX', c: '#2E6F9E', tags: ['música del verso', 'Nocturno (1894)'] },
      { n: 'Vanguardias', y: 'Años 20 y 30', c: '#B0562F', tags: ['formas nuevas', 'La vorágine (1924)'] },
      { n: 'Boom', y: 'Años 60 y 70', c: '#4E7A3A', tags: ['Cien años de soledad (1967)'] },
    ] },
  ] },
  g7u3l1: { type: 'sentence', subj: ['Las', 'familias', 'bogotanas'], pred: ['recorren', 'la', 'ciclovía'], nuc: { s: 1, p: 0 }, cats: ['art', 'sus', 'adj', 'ver', 'art', 'sus'], steps: [
    { t: 'Sujeto y predicado', show: 'split' },
    { t: 'El núcleo del sujeto', show: 'nuclei' },
    { t: 'El núcleo del predicado: el verbo', show: 'cats' },
    { t: 'Concordancia', show: 'nuclei', subj: ['La', 'familia', 'bogotana'], pred: ['recorre', 'la', 'ciclovía'], plural: false },
    { t: 'Sujeto tácito', show: 'split', subj: ['(nosotros)'], pred: ['Llegamos', 'temprano'], nuc: { s: 0, p: 0 }, cats: ['pro', 'ver', 'adv'], plural: null },
    { t: 'El sujeto al final', show: 'split', subj: ['los', 'patinadores'], pred: ['Por', 'la', 'Séptima', 'bajan'], nuc: { s: 1, p: 3 }, cats: ['art', 'sus', 'pre', 'art', 'sus', 'ver'], plural: true },
    { t: '¿Qué le encanta? La ciclovía', show: 'split', subj: ['la', 'ciclovía'], pred: ['A', 'mi', 'primo', 'le', 'encanta'], nuc: { s: 1, p: 4 }, cats: ['art', 'sus', 'pre', 'det', 'sus', 'pro', 'ver'], plural: false },
  ] },
  g7u3l2: { type: 'sentence', subj: ['Los', 'niños'], pred: ['juegan', 'en', 'la', 'calle'], nuc: { s: 1, p: 0 }, steps: [
    { t: 'Ideas sueltas sin puente', show: 'words', nexo: null, second: null },
    { t: 'Adición y contraste', show: 'split', nexo: 'pero', second: { subj: ['los', 'carros'], pred: ['pasan', 'muy', 'rápido'], nuc: { s: 1, p: 0 } } },
    { t: 'Causa y consecuencia', show: 'split', nexo: 'porque', second: { subj: ['el', 'barrio'], pred: ['no', 'tiene', 'parque'], nuc: { s: 1, p: 1 } } },
    { t: '"Es decir": explica', show: 'split', subj: ['Sumapaz'], pred: ['es', 'un', 'páramo'], nuc: { s: 0, p: 0 }, nexo: null, second: null },
    { t: 'Otro conector, otro sentido', show: 'split', subj: ['la', 'lluvia'], pred: ['cayó', 'toda', 'la', 'tarde'], nuc: { s: 1, p: 0 }, nexo: 'pero', second: { subj: ['(nosotros)'], pred: ['fuimos', 'al', 'parque'], nuc: { s: 0, p: 0 } } },
    { t: '"Aunque" al comienzo', show: 'split', subj: ['(nosotros)'], pred: ['fuimos', 'al', 'parque'], nuc: { s: 0, p: 0 }, nexo: 'aunque', second: { subj: ['la', 'lluvia'], pred: ['no', 'paró'], nuc: { s: 1, p: 1 } } },
    { t: 'Conectores en una carta', show: 'split', subj: ['Los', 'niños'], pred: ['necesitan', 'un', 'parque'], nuc: { s: 1, p: 0 }, nexo: 'porque', second: { subj: ['la', 'calle'], pred: ['es', 'peligrosa'], nuc: { s: 1, p: 0 } } },
  ] },
  g7u3l3: { type: 'voice', steps: [
    { t: 'Pausas que cambian el sentido', mode: 'pausas', text: 'Vamos a comer, niños', pauses: [2] },
    { t: 'La coma en la enumeración', mode: 'expresiva', text: 'Traigan papa, yuca y plátano', pauses: [1] },
    { t: 'La coma del vocativo', mode: 'pausas', text: 'Laura, cierra la puerta', pauses: [0] },
    { t: 'La explicación entre comas', mode: 'pausas', text: 'Bogotá, la capital, es fría', pauses: [0, 2] },
    { t: 'Sujeto y verbo, sin coma', mode: 'rapida', text: 'Mi hermana estudia en Medellín', pauses: [] },
    { t: 'El punto: pausa larga', mode: 'pausas', text: 'Llegamos tarde. El bus se varó.', pauses: [1] },
    { t: 'Seguido, aparte y final', mode: 'expresiva', text: 'Hoy hace sol. Mañana lloverá.', pauses: [2] },
  ] },
};
