// Escenas de "Aprende" del grado 6° (formato en lib/SPEC.md).
export const SCENES_G6 = {
  g6u1l1: { type: 'comm', emisor: 'Abuela', receptor: 'Nieto', mensaje: '¡A comer!', canal: 'Voz', codigo: 'Español', contexto: 'Cocina', steps: [
    { t: 'Emisor y receptor', show: ['emisor', 'receptor', 'mensaje'], focus: 'emisor' },
    { t: 'Mensaje, canal y código', show: ['emisor', 'receptor', 'mensaje', 'canal', 'codigo'], focus: 'canal' },
    { t: 'El contexto', show: ['emisor', 'receptor', 'mensaje', 'canal', 'codigo', 'contexto'], focus: 'contexto' },
    { t: 'El ruido', focus: null, noise: true },
    { t: 'Retroalimentación', emisor: 'Nieto', receptor: 'Abuela', mensaje: '¡Ya voy!', noise: false },
  ] },
  g6u1l2: { type: 'signs', items: [
    { kind: 'verbal', icon: 'pare', label: 'PARE' }, { kind: 'noverbal', icon: 'semaforo', label: 'Semáforo' }, { kind: 'noverbal', icon: 'bano', label: 'Baño' },
    { kind: 'verbal', icon: 'texto', label: 'Tienda Doña Rosa' }, { kind: 'noverbal', icon: 'bus', label: 'Paradero' }, { kind: 'noverbal', icon: 'mano', label: 'Saludo' },
    { kind: 'noverbal', icon: 'prohibido', label: 'Prohibido' }, { kind: 'noverbal', icon: 'wifi', label: 'Wifi' },
  ], steps: [
    { t: 'Signos verbales: palabras', highlight: 'verbal' },
    { t: 'Signos no verbales: sin palabras', highlight: 'noverbal' },
    { t: 'Íconos que todos entienden', highlight: 'noverbal', pick: 6 },
    { t: 'Mensajes que combinan los dos', highlight: null, pick: 4 },
  ] },
  g6u1l3: { type: 'newsdesk', blocks: [
    { k: 'titular', t: 'Estudiantes siembran 300 árboles en Usme' }, { k: 'entrada', t: 'Qué, quién, cuándo y dónde' },
    { k: 'cuerpo', t: 'Detalles y declaraciones' }, { k: 'foto', t: 'Siembra en el parque' }, { k: 'fuente', t: 'Jardín Botánico' },
  ], steps: [
    { t: 'La noticia en los medios', pyramid: false },
    { t: 'Las seis preguntas', focus: 'entrada', ask: ['qué', 'quién', 'cuándo', 'dónde', 'cómo', 'por qué'] },
    { t: 'La pirámide invertida', pyramid: true, focus: null, ask: null },
    { t: 'Hechos y fuente', focus: 'fuente' },
  ] },
  g6u2l1: { type: 'sentence', subj: ['La', 'abuela', 'feliz'], pred: ['prepara', 'arepas', 'doradas'], nuc: { s: 1, p: 0 }, cats: ['art', 'sus', 'adj', 'ver', 'sus', 'adj'], steps: [
    { t: 'El sustantivo nombra', show: 'cats', focusCat: 'sus' },
    { t: 'El adjetivo describe', show: 'cats', focusCat: 'adj', plural: null },
    { t: 'El verbo dice qué pasa', show: 'cats', focusCat: 'ver' },
  ] },
  g6u2l2: { type: 'syllable', steps: [
    { t: 'Sílabas y sílaba tónica', word: 'Zipaquirá', syl: ['Zi', 'pa', 'qui', 'rá'], tonic: 3, rule: null, tilde: false },
    { t: 'Agudas, graves y esdrújulas', word: 'música', syl: ['mú', 'si', 'ca'], tonic: 0, rule: 'esdrujula', tilde: true },
    { t: 'Cuándo va la tilde', word: 'canción', syl: ['can', 'ción'], tonic: 1, rule: 'aguda', tilde: true },
    { t: 'Vocales juntas y tilde', word: 'Chía', syl: ['Chí', 'a'], tonic: 0, rule: null, tilde: true },
  ] },
  g6u2l3: { type: 'morph', root: 'orden', prefix: ['des'], suffix: ['ado'], family: ['ordenar', 'desorden', 'ordenado', 'ordenador'], steps: [
    { t: 'La raíz lleva el significado', show: 'root' },
    { t: 'Prefijos', show: 'build', suffix: [] },
    { t: 'Sufijos', show: 'build', root: 'pan', prefix: [], suffix: ['adería'] },
    { t: 'Familias de palabras', show: 'family', root: 'pan', family: ['panadero', 'panadería', 'empanada', 'panecito'] },
  ] },
  g6u3l1: { type: 'diorama', setting: 'laguna', time: 'dia', chars: [{ n: 'Bachué', c: '#D4A017', h: 1.5 }], steps: [
    { t: 'Historias de voz en voz', view: 'libre' },
    { t: 'Mito: Bachué en Iguaque', view: 'omnisciente', focus: 0 },
    { t: 'Leyenda: la Madremonte', setting: 'bosque', time: 'noche', chars: [{ n: 'Madremonte', c: '#2F7D32', h: 1.8 }, { n: 'Leñador', c: '#8A5A2B', h: 1.3 }], view: 'testigo', focus: 0 },
    { t: 'Leyendas de cada región', setting: 'rio', time: 'dia', chars: [{ n: 'Mohán', c: '#4E6B3A', h: 1.6 }, { n: 'Lavandera', c: '#B06A10', h: 1.3 }], view: 'libre', focus: 0 },
  ] },
  g6u3l2: { type: 'poem', lines: [
    { t: 'Con mi tiple y mi guitarra', syl: 8, rhyme: 'a' }, { t: 'te vengo a dar mi canción;', syl: 8, rhyme: 'b' },
    { t: 'si no la quieres oír,', syl: 8, rhyme: 'c' }, { t: 'se me parte el corazón.', syl: 8, rhyme: 'b' },
  ], stanzas: [4], steps: [
    { t: 'La copla: cuatro versos', show: 'text' },
    { t: 'Ocho sílabas por verso', show: 'syl' },
    { t: 'Riman el segundo y el cuarto', show: 'rhyme' },
  ] },
  g6u3l3: { type: 'textarch', kind: 'narrativo', parts: [
    { n: 'Inicio', t: 'Un leñador entra al bosque' }, { n: 'Nudo', t: 'Aparece la Madremonte' }, { n: 'Desenlace', t: 'Huye y no vuelve a talar' },
  ], steps: [
    { t: 'El cuento como edificio', focus: null },
    { t: 'Inicio, nudo y desenlace', focus: 1 },
    { t: 'El renacuajo paseador', parts: [{ n: 'Inicio', t: 'Rinrín sale muy majo' }, { n: 'Nudo', t: 'Desobedece; llegan los gatos' }, { n: 'Desenlace', t: 'Un pato se lo traga' }], focus: null },
    { t: 'Contarlo en voz alta', parts: [{ n: 'Inicio', t: 'Un leñador entra al bosque' }, { n: 'Nudo', t: 'Aparece la Madremonte' }, { n: 'Desenlace', t: 'Huye y no vuelve a talar' }] },
  ] },
};
