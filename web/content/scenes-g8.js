// Escenas de "Aprende" del grado 8° (formato en lib/SPEC.md).
export const SCENES_G8 = {
  g8u1l1: { type: 'gallery', rooms: [
    { n: 'Romanticismo', y: '1840-1880', c: '#8A4B6E', tags: ['Isaacs', 'María', 'sentimiento'] },
    { n: 'Costumbrismo', y: '1850-1920', c: '#B06A10', tags: ['Carrasquilla', 'habla popular'] },
    { n: 'Modernismo', y: '1885-1915', c: '#1F5FA8', tags: ['Silva', 'Nocturno', 'musicalidad'] },
    { n: 'Novela de la tierra', y: '1920-1940', c: '#2F7D32', tags: ['Rivera', 'La vorágine', 'selva'] },
    { n: 'Realismo mágico', y: '1955-1985', c: '#D4A017', tags: ['García Márquez', 'Macondo'] },
    { n: 'Voces contemporáneas', y: '1970-hoy', c: '#C0453A', tags: ['Mutis', 'Caicedo', 'Restrepo', 'Bonnett'] },
  ], steps: [
    { t: 'Romanticismo y costumbrismo', at: 0 },
    { t: 'Modernismo y novela de la tierra', at: 2 },
    { t: 'Realismo mágico y después', at: 4 },
  ] },
  g8u1l2: { type: 'poem', lines: [
    { t: 'Baja el río Magdalena', syl: 8, rhyme: 'a' }, { t: 'con su canto de metal;', syl: 8, rhyme: 'b' },
    { t: 'y el pescador, con su pena,', syl: 8, rhyme: 'a' }, { t: 'lanza su red al juncal.', syl: 8, rhyme: 'b' },
    { t: 'Una garza se levanta', syl: 8, rhyme: 'c' }, { t: 'sobre el agua del manglar,', syl: 8, rhyme: 'd' },
    { t: 'y el viento del sur le canta', syl: 8, rhyme: 'c' }, { t: 'una canción de alta mar.', syl: 8, rhyme: 'd' },
  ], stanzas: [4, 4], steps: [
    { t: 'El verso y sus sílabas', show: 'syl' },
    { t: 'Versos agrupados en estrofas', show: 'stanza' },
    { t: 'La rima: esquema abab cdcd', show: 'rhyme' },
  ] },
  g8u1l3: { type: 'figure', kind: 'metafora', a: 'ojos', b: 'luceros', text: 'Tus ojos son luceros', steps: [
    { t: 'Metáfora: A es B', kind: 'metafora', a: 'ojos', b: 'luceros', text: 'Tus ojos son luceros' },
    { t: 'Personificación: humanizar', kind: 'personificacion', a: 'guitarra', b: '', text: 'La guitarra suspira' },
    { t: 'Anáfora: repetir al inicio', kind: 'anafora', a: 'Por ti', b: '', text: 'Por ti canto, por ti sueño, por ti vivo' },
  ] },
  g8u2l1: { type: 'sentence', subj: ['Rock', 'al', 'Parque'], pred: ['es', 'gratis'], nuc: { s: 0, p: 0 }, steps: [
    { t: 'Oración simple: un verbo', show: 'nuclei', nexo: null, second: null },
    { t: 'Coordinada: mismo nivel', show: 'nuclei', nexo: 'y', second: { subj: ['El', 'festival'], pred: ['reúne', 'a', 'miles', 'de', 'jóvenes'], nuc: { s: 1, p: 0 } } },
    { t: 'Subordinada: una depende', subj: ['Nosotros'], pred: ['llegamos', 'temprano'], nuc: { s: 0, p: 0 }, show: 'nuclei', nexo: 'porque', second: { subj: ['Nosotros'], pred: ['queríamos', 'ver', 'a', 'la', 'primera', 'banda'], nuc: { s: 0, p: 0 } } },
  ] },
  g8u2l2: { type: 'textarch', kind: 'narrativo', parts: [
    { n: 'Inicio', t: 'Plaza de Bolívar: un mimo' }, { n: 'Desarrollo', t: 'Luego, arpa y obleas' }, { n: 'Cierre', t: 'Finalmente, la calle 26' },
  ], steps: [
    { t: 'Coherencia: un tema y un orden', focus: null, remove: null },
    { t: 'Cohesión: conectores y pronombres', focus: 1 },
    { t: 'Sin unión, el texto se cae', focus: null, remove: 1 },
  ] },
  g8u2l3: { type: 'sentence', subj: ['Los', 'estudiantes', 'nuevos'], pred: ['llegaron', 'temprano'], nuc: { s: 1, p: 0 }, cats: ['art', 'sus', 'adj', 'ver', 'adv'], steps: [
    { t: 'Género y número en el sujeto', show: 'cats', focusCat: 'adj', plural: true },
    { t: 'Sujeto y verbo concuerdan', subj: ['La', 'estudiante', 'nueva'], pred: ['llegó', 'temprano'], show: 'nuclei', plural: false },
    { t: 'Errores de los avisos', subj: ['Muchas', 'empanadas'], pred: ['se', 'venden', 'aquí'], nuc: { s: 1, p: 1 }, cats: ['det', 'sus', 'pro', 'ver', 'adv'], show: 'nuclei', plural: true },
  ] },
  g8u3l1: { type: 'newsdesk', blocks: [
    { k: 'titular', t: 'Abren tres bibliotecas en la comuna' }, { k: 'entrada', t: 'Qué, quién, cuándo y dónde' }, { k: 'fuente', t: 'Reporte de la Alcaldía' },
    { k: 'opinion', t: 'Columna: "Faltan más libros"' }, { k: 'foto', t: 'Aviso: café "de la finca"' },
  ], steps: [
    { t: 'Informar: hechos y fuentes', focus: 'entrada', ask: ['qué', 'quién', 'cuándo', 'dónde'] },
    { t: 'Opinar: valorar y argumentar', focus: 'opinion', ask: null },
    { t: 'Vender: persuadir', focus: 'foto' },
  ] },
  g8u3l2: { type: 'voice', mode: 'plana', text: 'Buenos días, ¿me regala una bolsa, por favor?', pauses: [], steps: [
    { t: 'Oír no es escuchar', mode: 'plana' },
    { t: 'El tono revela la intención', mode: 'fuerte', text: '¡Vecino, el arroz de ayer tenía gorgojo!' },
    { t: 'Turnos, pausas y cortesía', mode: 'pausas', text: 'Con gusto, don Ernesto, la próxima vez le traigo billetes pequeños.', pauses: [1, 3] },
  ] },
  g8u3l3: { type: 'signs', items: [
    { kind: 'verbal', icon: 'texto', label: 'La memoria florece' }, { kind: 'noverbal', icon: 'mano', label: 'Manos abiertas' },
    { kind: 'noverbal', icon: 'flecha', label: 'Camino al barrio' }, { kind: 'verbal', icon: 'texto', label: 'Firma del colectivo' },
    { kind: 'noverbal', icon: 'prohibido', label: 'No a la violencia' }, { kind: 'noverbal', icon: 'bus', label: 'Mural del paradero' },
  ], steps: [
    { t: 'Qué dice el mural', highlight: 'verbal' },
    { t: 'Los símbolos hablan', highlight: 'noverbal' },
    { t: 'A quién le habla', highlight: null, pick: 5 },
  ] },
};
