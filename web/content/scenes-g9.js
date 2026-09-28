// Escenas de "Aprende" del grado 9° (formato en lib/SPEC.md). Un paso por párrafo de body.
const SHOTS = [
  { k: 'Plano general', d: 'El pelotón frente al muro' }, { k: 'Primer plano', d: 'El rostro del coronel' },
  { k: 'Plano medio', d: 'El padre y el niño' }, { k: 'Plano detalle', d: 'La mano del niño sobre el hielo' },
];
const CEL = [
  { t: 'Las notificaciones distraen', kind: 'arg', w: 3, side: 'pro' }, { t: 'Informe Unesco 2023', kind: 'dato', w: 2, side: 'pro' },
  { t: 'Descansos con fútbol', kind: 'ejemplo', w: 1, side: 'pro' },
];
const METRO = [
  { t: 'Es más barato de construir', kind: 'arg', w: 2, side: 'pro' }, { t: 'Afecta el paisaje de la calle', kind: 'arg', w: 2, side: 'con' },
];
const METRO2 = [...METRO, { t: 'Se construye más rápido', kind: 'dato', w: 2, side: 'pro' }, { t: 'Ruido cerca de las casas', kind: 'ejemplo', w: 1, side: 'con' }];
const ENSAYO = [{ n: 'Introducción', t: 'Tema y tesis' }, { n: 'Desarrollo', t: 'Argumentos con ejemplos' }, { n: 'Conclusión', t: 'Retoma la tesis' }];
const FAKE = [
  { k: 'titular', t: '¡URGENTE! Bogotá sin agua 30 días' }, { k: 'fuente', t: 'Un primo de un amigo' },
  { k: 'dato', t: '90 % de barrios secos' }, { k: 'foto', t: 'Embalse seco (¿de dónde?)' }, { k: 'opinion', t: 'Los medios callan' },
];
const REG = [
  { n: 'Bogotá y el altiplano', id: 'bogota', words: ['sumercé', '¡qué chirriado!'] },
  { n: 'Antioquia', id: 'paisa', words: ['parce', '¡avemaría, pues!'] },
  { n: 'Costa Caribe', id: 'caribe', words: ['¡ajá!', 'pelao'] },
  { n: 'Cali y el Valle', id: 'valle', words: ['¡oís, ve!', 'borondo'] },
];
const SANT = { n: 'Santanderes', id: 'santanderes', words: ['¿qué hubo, mano?'] };

export const SCENES_G9 = {
  g9u1l1: { type: 'diorama', setting: 'pueblo', time: 'dia', chars: [{ n: 'Úrsula', c: '#8A5A2B', h: 1.4 }, { n: 'Melquíades', c: '#4B3A6E', h: 1.6 }, { n: 'Remedios', c: '#E8D7A8', h: 1.5 }], steps: [
    { t: 'El boom: el mundo lee a América Latina', view: 'libre', moment: null, focus: null },
    { t: 'Cuatro novelas, cuatro países', view: 'testigo', moment: null, focus: null },
    { t: 'Lo mágico, sin sorpresa', view: 'omnisciente', moment: 'nudo', focus: 1 },
    { t: 'Lluvia y sábanas al cielo', time: 'noche', view: 'testigo', moment: 'nudo', focus: 2 },
    { t: 'No es fantasía: es un mundo real', time: 'dia', view: 'libre', moment: null, focus: null },
    { t: 'De Aracataca a Macondo', setting: 'rio', time: 'noche', view: 'testigo', moment: 'inicio', focus: 0 },
    { t: 'Precursores y herederos', setting: 'paramo', time: 'dia', view: 'omnisciente', moment: 'desenlace', focus: 1 },
  ] },
  g9u1l2: { type: 'screen', text: 'Años después, frente al pelotón, el coronel recordó la tarde en que su padre lo llevó a conocer el hielo.', shots: SHOTS, at: 0, steps: [
    { t: 'La novela cuenta, la pantalla muestra', at: 0 },
    { t: 'Recursos de la literatura', shots: [
      { k: 'Narrador', d: 'Lo sabe todo' }, { k: 'Capítulo', d: 'Divide la historia' }, { k: 'Metáfora', d: 'Imagen con palabras' }, { k: 'Monólogo interior', d: 'Pensamiento escrito' } ], at: 0 },
    { t: 'Recursos del cine', shots: [
      { k: 'Plano', d: 'Qué se ve y qué tan cerca' }, { k: 'Banda sonora', d: 'Música y sonidos' }, { k: 'Voz en off', d: 'Una voz sobre la imagen' }, { k: 'Fundido a negro', d: 'Paso a otra escena' } ], at: 1 },
    { t: 'Se conserva, se cambia', shots: SHOTS, at: 1 },
    { t: 'El tiempo y el lugar', shots: [
      { k: 'Plano general', d: 'Macondo construido como set' }, { k: 'Montaje', d: 'Pasan los meses' }, { k: 'Maquillaje', d: 'Úrsula envejece' }, { k: 'Cambio de actor', d: 'El niño ya es adulto' } ], at: 2 },
    { t: 'Del plano general al detalle', shots: SHOTS, at: 3 },
    { t: 'El proceso y el guion gráfico', shots: SHOTS, at: 0 },
  ] },
  g9u1l3: { type: 'figure', kind: 'personificacion', a: 'viento', b: 'secretos', text: 'El viento del páramo contaba secretos', steps: [
    { t: 'Buscar un efecto', kind: 'personificacion', a: 'ciudad', b: 'bostezo', text: 'La ciudad se despertó bostezando' },
    { t: 'Metáfora y símil', kind: 'metafora', a: 'río', b: 'culebra de plata', text: 'El río es una culebra de plata' },
    { t: 'Exagerar y humanizar', kind: 'hiperbole', a: 'te lo dije', b: 'un millón de veces', text: 'Te lo he dicho un millón de veces' },
    { t: 'Repetir y oponer', kind: 'anafora', a: 'Una noche', b: 'perfumes', text: 'Una noche, / una noche toda llena de perfumes' },
    { t: 'La frase que atrapa', kind: 'antitesis', a: 'pelotón', b: 'hielo', text: 'Frente al pelotón… recordó el hielo' },
    { t: 'La anticipación', kind: 'antitesis', a: 'futuro', b: 'pasado', text: 'Muchos años después, frente al pelotón…' },
  ] },
  g9u2l1: { type: 'argument', thesis: 'El celular debe guardarse en clase', items: [], reveal: null, steps: [
    { t: 'La tesis', items: [] },
    { t: 'Argumentos, datos y ejemplos', items: CEL },
    { t: 'Tesis + porque + razón', items: [{ t: 'Porque las notificaciones distraen', kind: 'arg', w: 3, side: 'pro' }, ...CEL.slice(1)] },
    { t: 'Conclusión y contraargumento', items: [...CEL, { t: 'Sirve para investigar', kind: 'contra', w: 2, side: 'con' }] },
    { t: 'Ataques y caricaturas', items: [...CEL.slice(0, 2), { t: 'Sirve para investigar', kind: 'contra', w: 2, side: 'con' }, { t: 'Juan saca malas notas', kind: 'falacia', w: 2, side: 'pro' }], reveal: 3 },
    { t: 'Mayorías y casos sueltos', items: [...CEL.slice(0, 2), { t: 'Sirve para investigar', kind: 'contra', w: 2, side: 'con' }, { t: 'A mi primo le fue mal', kind: 'falacia', w: 2, side: 'pro' }], reveal: 3 },
    { t: 'Dilemas, cadenas y falsas causas', items: [...CEL.slice(0, 2), { t: 'Sirve para investigar', kind: 'contra', w: 2, side: 'con' }, { t: 'O se prohíbe o será un caos', kind: 'falacia', w: 2, side: 'pro' }], reveal: 3 },
  ] },
  g9u2l2: { type: 'argument', thesis: 'El metro de Bogotá debe ser elevado', items: [], reveal: null, steps: [
    { t: 'Dos posturas y un moderador', items: [] },
    { t: 'Un moderador imparcial', items: METRO },
    { t: 'Postura y argumentos', items: METRO2 },
    { t: 'Réplica: ideas, no personas', items: [...METRO2, { t: 'Lo dices porque vives en el norte', kind: 'falacia', w: 2, side: 'con' }], reveal: 4 },
    { t: 'Escuchar y respetar el turno', items: METRO2, reveal: null },
    { t: 'Bloquear falacias', items: [...METRO2, { t: 'Un cantante dijo que es mejor', kind: 'falacia', w: 2, side: 'pro' }], reveal: 4 },
    { t: 'Emoción y pregunta trampa', items: [...METRO2, { t: 'Piensen en los niños que llorarán', kind: 'falacia', w: 2, side: 'con' }], reveal: 4 },
  ] },
  g9u2l3: { type: 'textarch', kind: 'ensayo', parts: ENSAYO, focus: null, remove: null, steps: [
    { t: 'Reflexionar y defender', focus: null },
    { t: 'Tres párrafos', focus: 0 },
    { t: 'El párrafo de desarrollo', parts: [{ n: 'Argumento', t: 'En primer lugar…' }, { n: 'Ejemplo', t: 'Por ejemplo…' }, { n: 'Consecuencia', t: 'Por lo tanto…' }], focus: 1 },
    { t: 'Responder al contraargumento', parts: ENSAYO, focus: 1 },
    { t: 'Conectores que ordenan y suman', focus: 0 },
    { t: 'Conectores que oponen y cierran', focus: 2 },
    { t: 'Revisar: sin pruebas, se cae', focus: null, remove: 1 },
  ] },
  g9u3l1: { type: 'dialect', regions: REG, focus: null, steps: [
    { t: 'Una lengua, muchas voces', focus: null },
    { t: 'Sumercé, vos y ¡ajá!', focus: 'paisa' },
    { t: 'Palabras del altiplano', focus: 'bogota', regions: [
      { n: 'Bogotá y el altiplano', id: 'bogota', words: ['chino', '¡qué boleta!', 'onces'] }, ...REG.slice(1) ] },
    { t: 'Antioquia y la Costa', focus: 'caribe', regions: [
      REG[0], { n: 'Antioquia', id: 'paisa', words: ['¿quiubo, pues?', '¡qué charro!'] },
      { n: 'Costa Caribe', id: 'caribe', words: ['¡erda!', 'mamar gallo'] }, REG[3] ] },
    { t: 'El Valle y los Santanderes', focus: 'valle', regions: [
      ...REG.slice(0, 3), { n: 'Cali y el Valle', id: 'valle', words: ['mirá, ve', 'cholado'] }, SANT ] },
    { t: 'Ninguna es incorrecta', focus: null, regions: [...REG, SANT] },
    { t: 'Adecuarse al contexto', focus: 'bogota', regions: [...REG, SANT] },
  ] },
  g9u3l2: { type: 'newsdesk', blocks: FAKE, pyramid: false, focus: null, ask: null, steps: [
    { t: 'Parece una noticia', focus: null },
    { t: 'Fuente, fecha y foto', focus: 'fuente' },
    { t: 'Tono y datos', focus: 'dato' },
    { t: 'Verificar en la fuente', focus: 'foto', ask: ['qué', 'quién', 'cuándo', 'dónde', 'por qué', 'cómo'] },
    { t: 'Colombiacheck: no la compartas', blocks: [...FAKE.slice(0, 1), { k: 'fuente', t: 'Colombiacheck: ¡falso!' }, ...FAKE.slice(2)], focus: 'fuente', ask: null },
    { t: 'Confiable o falsa', blocks: [
      { k: 'titular', t: 'IDEAM: alerta por lluvias' }, { k: 'entrada', t: 'Tolima, 12 de abril' }, { k: 'fuente', t: 'IDEAM, sitio oficial' }, { k: 'cuerpo', t: 'Noticieros la confirman' } ], pyramid: true, focus: 'fuente' },
    { t: 'Engañosa: real, pero deformada', blocks: [
      { k: 'titular', t: 'Así quedó Bogotá tras la granizada' }, { k: 'foto', t: 'Foto de 2019' }, { k: 'fuente', t: 'Página de memes' }, { k: 'dato', t: 'Sí hubo granizada, más leve' } ], pyramid: false, focus: 'foto' },
  ] },
  g9u3l3: { type: 'signs', items: [
    { kind: 'noverbal', icon: 'basura', label: 'Reciclaje' }, { kind: 'noverbal', icon: 'prohibido', label: 'Prohibido' },
    { kind: 'verbal', icon: 'texto', label: 'Bogotá D.C.' }, { kind: 'noverbal', icon: 'cruce', label: 'Precaución' },
    { kind: 'noverbal', icon: 'mano', label: 'Paz' }, { kind: 'verbal', icon: 'texto', label: '¡Vamos, Colombia!' },
  ], highlight: null, pick: null, steps: [
    { t: 'Símbolos por convención', highlight: 'noverbal', pick: null },
    { t: 'No se parecen a lo que significan', highlight: 'noverbal', pick: 1 },
    { t: 'Cívicos y deportivos', highlight: null, pick: 5 },
    { t: 'Religiosos y científicos', highlight: null, pick: 3 },
    { t: 'Símbolos de todos los días', highlight: null, pick: 4 },
    { t: 'Incorporar símbolos al texto', highlight: null, pick: 0 },
  ] },
};
