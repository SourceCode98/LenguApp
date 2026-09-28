// Escenas de "Aprende" del grado 8° (formato en lib/SPEC.md). Un paso por párrafo de body.
const MURAL = [
  { kind: 'verbal', icon: 'texto', label: 'La memoria florece' }, { kind: 'noverbal', icon: 'mano', label: 'Manos abiertas' },
  { kind: 'noverbal', icon: 'flecha', label: 'Camino al barrio' }, { kind: 'verbal', icon: 'texto', label: 'Firma del colectivo' },
  { kind: 'noverbal', icon: 'prohibido', label: 'No a la violencia' }, { kind: 'noverbal', icon: 'bus', label: 'Mural del paradero' },
];
const CRONICA = [
  { n: 'Inicio', t: 'Plaza de Bolívar: un mimo' }, { n: 'Desarrollo', t: 'Luego, arpa y obleas' }, { n: 'Cierre', t: 'Finalmente, la calle 26' },
];

export const SCENES_G8 = {
  g8u1l1: { type: 'gallery', rooms: [
    { n: 'Romanticismo', y: '1840-1880', c: '#8A4B6E', tags: ['Isaacs', 'María', 'sentimiento'] },
    { n: 'Costumbrismo', y: '1850-1920', c: '#B06A10', tags: ['Carrasquilla', 'Obeso', 'habla popular'] },
    { n: 'Modernismo', y: '1885-1915', c: '#1F5FA8', tags: ['Silva', 'Nocturno', 'musicalidad'] },
    { n: 'Novela de la tierra', y: '1920-1940', c: '#2F7D32', tags: ['Rivera', 'La vorágine', 'selva'] },
    { n: 'Realismo mágico', y: '1955-1985', c: '#D4A017', tags: ['García Márquez', 'Macondo'] },
    { n: 'Voces contemporáneas', y: '1970-hoy', c: '#C0453A', tags: ['Mutis', 'Caicedo', 'Restrepo', 'Bonnett'] },
  ], steps: [
    { t: 'Un museo de movimientos', at: 0 },
    { t: 'Romanticismo: Isaacs', at: 0 },
    { t: 'Costumbrismo: el habla del pueblo', at: 1 },
    { t: 'Modernismo: Silva', at: 2 },
    { t: 'Novela de la tierra: Rivera', at: 3 },
    { t: 'Realismo mágico: Macondo', at: 4 },
    { t: 'Voces contemporáneas', at: 5 },
  ] },
  g8u1l2: { type: 'poem', lines: [
    { t: 'Baja el río Magdalena', syl: 8, rhyme: 'a' }, { t: 'con su canto de metal;', syl: 8, rhyme: 'b' },
    { t: 'y el pescador, con su pena,', syl: 8, rhyme: 'a' }, { t: 'lanza su red al juncal.', syl: 8, rhyme: 'b' },
    { t: 'Una garza se levanta', syl: 8, rhyme: 'c' }, { t: 'sobre el agua del manglar,', syl: 8, rhyme: 'd' },
    { t: 'y el viento del sur le canta', syl: 8, rhyme: 'c' }, { t: 'una canción de alta mar.', syl: 8, rhyme: 'd' },
  ], stanzas: [4, 4], show: 'text', steps: [
    { t: 'Cada línea es un verso', show: 'text' },
    { t: 'Sinalefa: dos vocales, una sílaba', show: 'syl' },
    { t: 'Aguda +1, grave igual, esdrújula −1', show: 'syl' },
    { t: 'Octosílabo, endecasílabo…', show: 'syl' },
    { t: 'Versos agrupados en estrofas', show: 'stanza' },
    { t: 'Rima consonante y asonante', show: 'rhyme' },
    { t: 'El esquema abab cdcd', show: 'rhyme' },
  ] },
  g8u1l3: { type: 'figure', kind: 'metafora', a: 'ojos', b: 'luceros', text: 'Tus ojos son luceros', steps: [
    { t: 'Palabras que pintan imágenes' },
    { t: 'Metáfora: A es B', kind: 'metafora', a: 'ojos', b: 'luceros', text: 'Tus ojos son luceros' },
    { t: 'Símil: A como B', kind: 'simil', a: 'risa', b: 'agua', text: 'Tu risa es como el agua' },
    { t: 'Hipérbole: exagerar', kind: 'hiperbole', a: 'lágrimas', b: '', text: 'Lloré tanto que se desbordó el Magdalena' },
    { t: 'Personificación: humanizar', kind: 'personificacion', a: 'guitarra', b: '', text: 'La guitarra suspira' },
    { t: 'Anáfora: repetir al inicio', kind: 'anafora', a: 'Por ti', b: '', text: 'Por ti canto, por ti sueño, por ti vivo' },
    { t: 'Antítesis, onomatopeya y epíteto', kind: 'antitesis', a: 'hielo', b: 'fuego', text: 'Es hielo abrasador, es fuego helado' },
  ] },
  g8u2l1: { type: 'sentence', subj: ['Rock', 'al', 'Parque'], pred: ['es', 'gratis'], nuc: { s: 0, p: 0 }, steps: [
    { t: 'Simple: un solo verbo', show: 'nuclei', nexo: null, second: null },
    { t: 'Compuesta: dos verbos y un nexo', show: 'nuclei', nexo: 'y', second: { subj: ['El', 'festival'], pred: ['reúne', 'a', 'miles', 'de', 'jóvenes'] } },
    { t: 'Coordinadas: mismo nivel', subj: ['La', 'banda'], pred: ['tocó'], nuc: { s: 1, p: 0 }, show: 'split', nexo: 'y', second: { subj: ['el', 'público'], pred: ['aplaudió'] } },
    { t: 'Suma, elección o contraste', subj: ['La', 'tarde'], pred: ['estuvo', 'lluviosa'], nuc: { s: 1, p: 0 }, show: 'nuclei', nexo: 'pero', second: { subj: ['el', 'público'], pred: ['bailó'] } },
    { t: 'Subordinadas: una depende', subj: ['Nosotros'], pred: ['llegamos', 'temprano'], nuc: { s: 0, p: 0 }, show: 'nuclei', nexo: 'porque', second: { subj: ['Nosotros'], pred: ['queríamos', 'ver', 'a', 'la', 'primera', 'banda'] } },
    { t: 'Causa, condición, tiempo, lugar', show: 'split' },
    { t: 'El nexo "que"', subj: ['Mi', 'hermana'], pred: ['dijo'], nuc: { s: 1, p: 0 }, show: 'nuclei', nexo: 'que', second: { subj: ['el', 'cartel'], pred: ['es', 'muy', 'bueno'] } },
  ] },
  g8u2l2: { type: 'textarch', kind: 'narrativo', parts: CRONICA, steps: [
    { t: 'Coherencia: un solo tema', focus: null, remove: null },
    { t: 'Coherencia: un orden lógico', focus: 0 },
    { t: 'Cohesión: los conectores', focus: 1 },
    { t: 'Pronombres y sinónimos', focus: 1, parts: [
      { n: 'Inicio', t: 'La plaza: allí, un mimo' }, { n: 'Desarrollo', t: 'Una señora: ella vende obleas' }, { n: 'Cierre', t: 'Finalmente, la calle 26' } ] },
    { t: 'Suma, contraste y explicación', focus: null, parts: [
      { n: 'Suma', t: 'además, también' }, { n: 'Contraste', t: 'sin embargo, en cambio' }, { n: 'Explicación', t: 'es decir, o sea' } ] },
    { t: 'Consecuencia y tiempo', focus: null, parts: [
      { n: 'Consecuencia', t: 'por eso, así que' }, { n: 'Tiempo', t: 'primero, luego' }, { n: 'Final', t: 'por último, finalmente' } ] },
    { t: 'Sin unión, el texto se cae', focus: null, remove: 1, parts: CRONICA },
  ] },
  g8u2l3: { type: 'sentence', subj: ['Los', 'estudiantes', 'nuevos'], pred: ['llegaron', 'temprano'], nuc: { s: 1, p: 0 }, cats: ['art', 'sus', 'adj', 'ver', 'adv'], steps: [
    { t: 'Género y número', show: 'cats', plural: true },
    { t: 'Sujeto y verbo concuerdan', show: 'nuclei', plural: true },
    { t: 'Yo + otro = nosotros', subj: ['Mi', 'primo', 'y', 'yo'], pred: ['fuimos', 'al', 'estadio'], nuc: { s: 1, p: 0 }, cats: ['det', 'sus', 'con', 'pro', 'ver', 'pre', 'sus'], show: 'nuclei', plural: true },
    { t: 'Colectivos: singulares', subj: ['La', 'gente'], pred: ['llegó', 'temprano'], nuc: { s: 1, p: 0 }, cats: ['art', 'sus', 'ver', 'adv'], show: 'nuclei', plural: false },
    { t: 'Los errores de los avisos', subj: ['Muchas', 'empanadas'], pred: ['se', 'venden', 'aquí'], nuc: { s: 1, p: 1 }, cats: ['det', 'sus', 'pro', 'ver', 'adv'], show: 'nuclei', plural: true },
    { t: 'El agua fría', subj: ['El', 'agua', 'fría'], pred: ['se', 'acabó'], nuc: { s: 1, p: 1 }, cats: ['art', 'sus', 'adj', 'pro', 'ver'], show: 'cats', plural: false },
    { t: 'El mapa antiguo', subj: ['El', 'mapa', 'antiguo'], pred: ['está', 'roto'], nuc: { s: 1, p: 0 }, cats: ['art', 'sus', 'adj', 'ver', 'adj'], show: 'cats', plural: false },
  ] },
  g8u3l1: { type: 'newsdesk', blocks: [
    { k: 'titular', t: 'Abren tres bibliotecas en la comuna' }, { k: 'entrada', t: 'Qué, quién, cuándo y dónde' }, { k: 'fuente', t: 'Reporte de la Alcaldía' },
    { k: 'opinion', t: 'Columna: "Faltan más libros"' }, { k: 'foto', t: 'Aviso: café "de la finca"' },
  ], steps: [
    { t: 'Informar, opinar o vender', focus: null, ask: null },
    { t: 'Informar: hechos y fuentes', focus: 'entrada', ask: ['qué', 'quién', 'cuándo', 'dónde'] },
    { t: 'Opinar: valorar y argumentar', focus: 'opinion', ask: null },
    { t: 'Vender: persuadir', focus: 'foto' },
    { t: '¿Confiable?', focus: 'fuente', blocks: [
      { k: 'titular', t: 'Abren tres bibliotecas en la comuna' }, { k: 'fuente', t: 'Reporte de la Alcaldía' },
      { k: 'dato', t: 'Otros medios lo confirman' } ] },
    { t: '¿Engañosa?', focus: 'foto', blocks: [
      { k: 'titular', t: 'Así quedó el estadio anoche' }, { k: 'foto', t: 'Foto de 2019: fuera de contexto' },
      { k: 'dato', t: 'El partido sí existió' } ] },
    { t: '¿Falsa?', focus: 'titular', blocks: [
      { k: 'titular', t: '¡Panela con limón cura el dengue!' }, { k: 'fuente', t: 'Cadena sin autor ni fuente' },
      { k: 'dato', t: 'Salud dice lo contrario' } ] },
  ] },
  g8u3l2: { type: 'voice', mode: 'plana', text: 'Buenos días, ¿me regala una bolsa, por favor?', pauses: [], steps: [
    { t: 'Oír no es escuchar', mode: 'plana' },
    { t: 'Escucha activa', mode: 'suave', text: 'Ajá… sí, te entiendo. ¿Y luego qué pasó?', pauses: [0, 3] },
    { t: 'Parafrasear', mode: 'pausas', text: 'O sea que usted dice que no le alcanza el cambio.', pauses: [1] },
    { t: 'Cada frase, una intención', mode: 'expresiva', text: '¡Buenas, don Ernesto! ¿Cómo amaneció?', pauses: [2] },
    { t: 'El tono revela la intención', mode: 'fuerte', text: '¿Me regala una bolsa?', pauses: [] },
    { t: 'Turnos y cortesía', mode: 'pausas', text: 'Con gusto, don Ernesto, la próxima vez le traigo billetes pequeños.', pauses: [1, 3] },
    { t: 'Ser asertivo', mode: 'suave', text: 'Entiendo su punto, pero yo lo veo distinto.', pauses: [2] },
  ] },
  g8u3l3: { type: 'signs', items: MURAL, steps: [
    { t: 'Qué dice el mural', highlight: 'verbal', pick: null },
    { t: 'Los símbolos hablan', highlight: 'noverbal' },
    { t: 'Paz, solidaridad, protesta', highlight: 'noverbal', items: [
      { kind: 'noverbal', icon: 'texto', label: 'Paloma: paz' }, { kind: 'noverbal', icon: 'mano', label: 'Manos: solidaridad' },
      { kind: 'noverbal', icon: 'mano', label: 'Puño: protesta' }, { kind: 'verbal', icon: 'texto', label: 'Nunca más' } ] },
    { t: 'Símbolos de aquí', highlight: 'noverbal', items: [
      { kind: 'noverbal', icon: 'texto', label: 'Frailejón: agua' }, { kind: 'noverbal', icon: 'texto', label: 'Colibrí' },
      { kind: 'noverbal', icon: 'texto', label: 'Rostro indígena' }, { kind: 'noverbal', icon: 'texto', label: 'Mariposas amarillas' } ] },
    { t: 'Símbolos patrios', highlight: null, items: [
      { kind: 'verbal', icon: 'texto', label: 'Himno nacional' }, { kind: 'noverbal', icon: 'texto', label: 'Bandera tricolor' },
      { kind: 'noverbal', icon: 'texto', label: 'Escudo' }, { kind: 'noverbal', icon: 'texto', label: 'Cóndor: libertad' } ] },
    { t: 'Símbolos de identidad', highlight: 'noverbal', items: [
      { kind: 'noverbal', icon: 'texto', label: 'Orquídea Cattleya' }, { kind: 'noverbal', icon: 'texto', label: 'Palma de cera' },
      { kind: 'noverbal', icon: 'texto', label: 'Sombrero vueltiao' }, { kind: 'noverbal', icon: 'texto', label: 'Mochila wayuu' } ] },
    { t: 'Arte de una comunidad', highlight: null, pick: 5, items: MURAL },
  ] },
};
