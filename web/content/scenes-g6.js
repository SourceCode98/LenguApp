// Escenas de "Aprende" del grado 6° (formato en lib/SPEC.md): un paso por párrafo de body.
const NEWS = [
  { k: 'titular', t: 'Estudiantes siembran 300 árboles en Usme' }, { k: 'entrada', t: 'Qué, quién, cuándo y dónde' },
  { k: 'cuerpo', t: 'Detalles y declaraciones' }, { k: 'foto', t: 'Siembra en el parque' }, { k: 'fuente', t: 'Jardín Botánico' },
];
const COPLA = [
  { t: 'Con mi tiple y mi guitarra', syl: 8, rhyme: 'a' }, { t: 'te vengo a dar mi canción;', syl: 8, rhyme: 'b' },
  { t: 'si no la quieres oír,', syl: 8, rhyme: 'c' }, { t: 'se me parte el corazón.', syl: 8, rhyme: 'b' },
];
const MADREMONTE = [{ n: 'Inicio', t: 'Un leñador entra al bosque' }, { n: 'Nudo', t: 'Aparece la Madremonte' }, { n: 'Desenlace', t: 'Huye y no vuelve a talar' }];

export const SCENES_G6 = {
  g6u1l1: { type: 'comm', emisor: 'Abuela', receptor: 'Nieto', mensaje: '¡A comer!', canal: 'Voz', codigo: 'Español', contexto: 'Cocina', steps: [
    { t: 'Emisor y receptor', show: ['emisor', 'receptor'], focus: 'emisor' },
    { t: 'Mensaje y canal', show: ['emisor', 'receptor', 'mensaje', 'canal'], focus: 'canal' },
    { t: 'El código', show: ['emisor', 'receptor', 'mensaje', 'canal', 'codigo'], focus: 'codigo' },
    { t: 'El contexto', show: ['emisor', 'receptor', 'mensaje', 'canal', 'codigo', 'contexto'], focus: 'contexto' },
    { t: 'El ruido', focus: null, noise: true },
    { t: 'Retroalimentación', emisor: 'Nieto', receptor: 'Abuela', mensaje: '¡Ya voy!', noise: false },
  ] },
  g6u1l2: { type: 'signs', items: [
    { kind: 'verbal', icon: 'pare', label: 'PARE' }, { kind: 'noverbal', icon: 'semaforo', label: 'Semáforo' }, { kind: 'noverbal', icon: 'bano', label: 'Baño' },
    { kind: 'verbal', icon: 'texto', label: 'Tienda Doña Rosa' }, { kind: 'noverbal', icon: 'bus', label: 'Paradero' }, { kind: 'noverbal', icon: 'mano', label: 'Saludo' },
    { kind: 'noverbal', icon: 'prohibido', label: 'Prohibido' }, { kind: 'noverbal', icon: 'wifi', label: 'Wifi' },
  ], steps: [
    { t: '¿Qué es un signo?', highlight: null, pick: null },
    { t: 'Signos verbales: palabras', highlight: 'verbal', pick: 0 },
    { t: 'Signos no verbales: sin palabras', highlight: 'noverbal', pick: 5 },
    { t: 'Objetos, luces y sonidos', highlight: 'noverbal', pick: 1 },
    { t: 'Íconos que todos entienden', highlight: 'noverbal', pick: 6 },
    { t: 'Mensajes que combinan los dos', highlight: null, pick: 4 },
  ] },
  g6u1l3: { type: 'newsdesk', blocks: NEWS, steps: [
    { t: 'Medios masivos', pyramid: false, focus: null },
    { t: 'Los medios en Colombia', blocks: [...NEWS, { k: 'dato', t: '1791 · 1929 · 1954 · años 90' }], focus: 'dato' },
    { t: 'Las seis preguntas', blocks: NEWS, focus: 'entrada', ask: ['qué', 'quién', 'cuándo', 'dónde', 'cómo', 'por qué'] },
    { t: 'Titular, entrada y cuerpo', focus: 'cuerpo', ask: null },
    { t: 'La pirámide invertida', pyramid: true, focus: null },
    { t: 'Hechos y fuente', focus: 'fuente' },
    { t: 'Verifica antes de compartir', blocks: [...NEWS, { k: 'opinion', t: '"Dicen que…"' }], focus: 'opinion' },
  ] },
  g6u2l1: { type: 'sentence', subj: ['La', 'abuela', 'feliz'], pred: ['prepara', 'arepas', 'doradas'], nuc: { s: 1, p: 0 }, cats: ['art', 'sus', 'adj', 'ver', 'sus', 'adj'], steps: [
    { t: 'El sustantivo nombra', show: 'cats', focusCat: 'sus' },
    { t: 'Nombres propios', subj: ['Laura'], pred: ['visita', 'Cali'], nuc: { s: 0, p: 0 }, cats: ['sus', 'ver', 'sus'], show: 'cats', focusCat: 'sus' },
    { t: 'El adjetivo describe', subj: ['La', 'abuela', 'feliz'], pred: ['prepara', 'arepas', 'doradas'], nuc: { s: 1, p: 0 }, cats: ['art', 'sus', 'adj', 'ver', 'sus', 'adj'], show: 'cats', focusCat: 'adj' },
    { t: 'Concordancia', subj: ['Las', 'abuelas', 'felices'], pred: ['preparan', 'arepas', 'doradas'], show: 'cats', focusCat: 'adj', plural: true },
    { t: 'El verbo dice qué pasa', subj: ['La', 'abuela', 'feliz'], pred: ['prepara', 'arepas', 'doradas'], show: 'cats', focusCat: 'ver', plural: null },
    { t: 'El corazón de la oración', show: 'nuclei', focusCat: null },
  ] },
  g6u2l2: { type: 'syllable', steps: [
    { t: 'Sílabas y sílaba tónica', word: 'Zipaquirá', syl: ['Zi', 'pa', 'qui', 'rá'], tonic: 3, rule: null, tilde: false },
    { t: 'Agudas, graves y esdrújulas', word: 'canción', syl: ['can', 'ción'], tonic: 1, rule: 'aguda', tilde: true },
    { t: 'Tilde en las agudas', word: 'ratón', syl: ['ra', 'tón'], tonic: 1, rule: 'aguda', tilde: true },
    { t: 'Tilde en las graves', word: 'lápiz', syl: ['lá', 'piz'], tonic: 0, rule: 'grave', tilde: true },
    { t: 'Esdrújulas: siempre', word: 'sábado', syl: ['sá', 'ba', 'do'], tonic: 0, rule: 'esdrujula', tilde: true },
    { t: 'Vocales juntas', word: 'Chía', syl: ['Chí', 'a'], tonic: 0, rule: null, tilde: true },
    { t: 'La tilde cambia la palabra', word: 'papá', syl: ['pa', 'pá'], tonic: 1, rule: 'aguda', tilde: true },
  ] },
  g6u2l3: { type: 'morph', root: 'orden', prefix: ['des'], suffix: ['ado'], family: ['ordenar', 'desorden', 'ordenado', 'ordenador'], steps: [
    { t: 'La raíz lleva el significado', show: 'root' },
    { t: 'Prefijos', show: 'build', root: 'orden', prefix: ['des'], suffix: [] },
    { t: 'Más prefijos', show: 'build', root: 'visible', prefix: ['in'], suffix: [] },
    { t: 'Sufijos', show: 'build', root: 'pan', prefix: [], suffix: ['adería'] },
    { t: 'Diminutivos', show: 'build', root: 'cas', prefix: [], suffix: ['ita'] },
    { t: 'Familias de palabras', show: 'family', root: 'pan', family: ['panadero', 'panadería', 'empanada', 'panecito'] },
    { t: 'Descubre el significado', show: 'build', root: 'terr', prefix: ['sub'], suffix: ['áneo'] },
  ] },
  g6u3l1: { type: 'diorama', setting: 'laguna', time: 'dia', chars: [{ n: 'Bachué', c: '#D4A017', h: 1.5 }], steps: [
    { t: 'Historias de voz en voz', view: 'libre', focus: null },
    { t: 'Muchas versiones', view: 'testigo', focus: null },
    { t: 'El mito: un origen', view: 'omnisciente', focus: null },
    { t: 'Mitos muiscas: Bachué', view: 'omnisciente', focus: 0 },
    { t: 'Leyenda: la Madremonte', setting: 'bosque', time: 'noche', chars: [{ n: 'Madremonte', c: '#2F7D32', h: 1.8 }, { n: 'Leñador', c: '#8A5A2B', h: 1.3 }], view: 'testigo', focus: 0 },
    { t: 'Leyendas de cada región', setting: 'rio', time: 'dia', chars: [{ n: 'Mohán', c: '#4E6B3A', h: 1.6 }, { n: 'Lavandera', c: '#B06A10', h: 1.3 }], view: 'libre', focus: 0 },
    { t: 'La Llorona y El Dorado', setting: 'laguna', time: 'noche', chars: [{ n: 'Llorona', c: '#8A8FA8', h: 1.6 }, { n: 'Cacique', c: '#D4A017', h: 1.5 }], view: 'testigo', focus: 1 },
  ] },
  g6u3l2: { type: 'poem', lines: COPLA, stanzas: [4], steps: [
    { t: 'La copla: cuatro versos', show: 'syl' },
    { t: 'Rima consonante', show: 'rhyme' },
    { t: 'Rima asonante', lines: [
      { t: 'Por el camino de Chía', rhyme: 'a' }, { t: 'me encontré una naranja;', rhyme: 'b' },
      { t: 'la partí con mi abuelo', rhyme: 'c' }, { t: 'y olía a nuestra casa.', rhyme: 'b' },
    ], show: 'rhyme' },
    { t: 'El refrán', lines: [{ t: 'Camarón que se duerme' }, { t: 'se lo lleva la corriente.' }], stanzas: [2], show: 'text' },
    { t: 'Más refranes', lines: [{ t: 'Al que madruga, Dios lo ayuda.' }, { t: 'Perro que ladra no muerde.' }, { t: 'Más vale pájaro en mano que cien volando.' }], stanzas: [3], show: 'text' },
    { t: 'La adivinanza', lines: [
      { t: 'Blanco por dentro,', rhyme: 'a' }, { t: 'verde por fuera;', rhyme: 'b' },
      { t: 'si quieres que te lo diga,', rhyme: 'c' }, { t: 'espera.', rhyme: 'b' },
    ], stanzas: [4], show: 'rhyme' },
    { t: 'Rima y memoria', lines: COPLA, stanzas: [4], show: 'stanza' },
  ] },
  g6u3l3: { type: 'textarch', kind: 'narrativo', parts: MADREMONTE, steps: [
    { t: 'El cuento como edificio', focus: null },
    { t: 'El inicio', focus: 0 },
    { t: 'El nudo: el conflicto', focus: 1 },
    { t: 'El desenlace', focus: 2 },
    { t: 'El renacuajo paseador', parts: [{ n: 'Inicio', t: 'Rinrín sale muy majo' }, { n: 'Nudo', t: 'Desobedece; llegan los gatos' }, { n: 'Desenlace', t: 'Un pato se lo traga' }], focus: null },
    { t: 'Volumen y tono', parts: MADREMONTE, focus: null },
    { t: 'Pausas y ritmo', focus: 1 },
  ] },
};
