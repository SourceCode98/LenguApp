// Escenas de "Aprende" del grado 7° (formato en lib/SPEC.md).
export const SCENES_G7 = {
  g7u1l1: { type: 'textarch', kind: 'narrativo', parts: [
    { n: 'Inicio', t: 'Un pescador de Honda' }, { n: 'Nudo', t: 'La canoa vuelve vacía' }, { n: 'Desenlace', t: 'Descubre por qué' },
  ], steps: [
    { t: 'Cada texto tiene una intención', focus: null },
    { t: 'Contar, describir, explicar', kind: 'expositivo', parts: [
      { n: 'Introducción', t: '¿Qué es el frailejón?' }, { n: 'Desarrollo', t: 'Atrapa el agua de la niebla' }, { n: 'Cierre', t: 'Cuidarlo es cuidar el agua' },
    ], focus: 1 },
    { t: 'Convencer e instruir', kind: 'argumentativo', parts: [
      { n: 'Tesis', t: 'Más metro, menos carros' }, { n: 'Argumento', t: 'El pico y placa no basta' }, { n: 'Argumento', t: 'El metro mueve a más gente' }, { n: 'Conclusión', t: 'Invertir en transporte público' },
    ], focus: 0 },
  ] },
  g7u1l2: { type: 'textarch', kind: 'expositivo', parts: [
    { n: 'Introducción', t: 'Sumapaz, el páramo más grande' }, { n: 'Desarrollo', t: 'Agua, especies y amenazas' }, { n: 'Cierre', t: 'Cuidarlo es cuidar el agua' },
  ], steps: [
    { t: 'Introducción, desarrollo y cierre', focus: null, remove: null },
    { t: 'Sin idea principal, se cae', focus: null, remove: 1 },
    { t: 'Del texto al mapa conceptual', remove: null, parts: [
      { n: 'Qué es', t: 'El páramo más grande' }, { n: 'Función', t: 'Esponja de agua' }, { n: 'Vida', t: 'Especies únicas' }, { n: 'Problema', t: 'Ganadería y quemas' }, { n: 'Cierre', t: 'Cuidarlo es cuidar el agua' },
    ], focus: 4 },
  ] },
  g7u1l3: { type: 'newsdesk', blocks: [
    { k: 'titular', t: 'Colombia vence 2-1 a Ecuador' }, { k: 'entrada', t: 'Goles en el segundo tiempo' }, { k: 'dato', t: '40.000 hinchas en el estadio' },
    { k: 'opinion', t: '"La mejor Selección de la historia"' }, { k: 'fuente', t: 'Acta oficial del partido' },
  ], steps: [
    { t: 'Hechos: se pueden comprobar', focus: 'dato', pyramid: false },
    { t: 'Opiniones: valoraciones', focus: 'opinion', pyramid: false },
    { t: 'Separar y buscar la fuente', focus: 'fuente', pyramid: true },
  ] },
  g7u2l1: { type: 'gallery', rooms: [
    { n: 'Narrativo', y: 'Cuento · novela · fábula', c: '#8A4B6E', tags: ['narrador', 'personajes', 'historia'] },
    { n: 'Lírico', y: 'Oda · soneto · copla', c: '#2E6F9E', tags: ['yo lírico', 'verso', 'emoción'] },
    { n: 'Dramático', y: 'Tragedia · comedia · drama', c: '#B0562F', tags: ['diálogo', 'acotaciones', 'escena'] },
  ], steps: [
    { t: 'Narrativo: alguien cuenta', at: 0 },
    { t: 'Lírico: alguien siente', at: 1 },
    { t: 'Dramático: se representa', at: 2 },
  ] },
  g7u2l2: { type: 'diorama', setting: 'rio', time: 'noche', chars: [{ n: 'Pescador', c: '#8A5A2B', h: 1.3 }, { n: 'Mohán', c: '#2E6B5E', h: 1.8 }], steps: [
    { t: 'La voz que cuenta', view: 'libre', focus: null },
    { t: 'Protagonista y testigo', view: 'primera', focus: 1, moment: 'nudo' },
    { t: 'El narrador que todo lo sabe', view: 'omnisciente', focus: null, moment: 'nudo' },
  ] },
  g7u2l3: { type: 'gallery', rooms: [
    { n: 'Independencia', y: '1810-1830', c: '#7A5C2E', tags: ['patria', 'himnos', 'guerras'] },
    { n: 'Romanticismo', y: '1840-1890', c: '#8A4B6E', tags: ['Pombo', 'María, de Isaacs', 'emoción'] },
    { n: 'Costumbrismo', y: '1840-1900', c: '#4E7A3A', tags: ['costumbres', 'habla popular', 'moraleja'] },
  ], steps: [
    { t: 'La obra y su contexto', at: 0 },
    { t: 'Pombo en la Bogotá del XIX', at: 1 },
    { t: 'Valores de una época', at: 2 },
  ] },
  g7u3l1: { type: 'sentence', subj: ['Las', 'familias', 'bogotanas'], pred: ['recorren', 'la', 'ciclovía'], nuc: { s: 1, p: 0 }, cats: ['art', 'sus', 'adj', 'ver', 'art', 'sus'], steps: [
    { t: 'Sujeto y predicado', show: 'split' },
    { t: 'El núcleo de cada parte', show: 'nuclei' },
    { t: 'Concordancia', show: 'nuclei', subj: ['La', 'familia', 'bogotana'], pred: ['recorre', 'la', 'ciclovía'], plural: false },
  ] },
  g7u3l2: { type: 'sentence', subj: ['Los', 'niños'], pred: ['juegan', 'en', 'la', 'calle'], nuc: { s: 1, p: 0 }, steps: [
    { t: 'Ideas sueltas sin puente', show: 'words', nexo: null, second: null },
    { t: 'Un conector de causa', show: 'split', nexo: 'porque', second: { subj: ['el', 'barrio'], pred: ['no', 'tiene', 'parque'], nuc: { s: 1, p: 1 } } },
    { t: 'Otro conector, otro sentido', show: 'split', nexo: 'pero', second: { subj: ['los', 'carros'], pred: ['pasan', 'muy', 'rápido'], nuc: { s: 1, p: 0 } } },
  ] },
  g7u3l3: { type: 'voice', steps: [
    { t: 'Pausas que cambian el sentido', mode: 'pausas', text: 'Vamos a comer, niños', pauses: [2] },
    { t: 'La coma: pausa breve', mode: 'expresiva', text: 'Traigan papa, yuca y plátano', pauses: [1] },
    { t: 'El punto: pausa larga', mode: 'pausas', text: 'Llegamos al estadio. La fila daba la vuelta.', pauses: [2] },
  ] },
};
