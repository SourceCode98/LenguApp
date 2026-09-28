// Escenas de "Aprende" del grado 9° (formato en lib/SPEC.md).
export const SCENES_G9 = {
  g9u1l1: { type: 'diorama', setting: 'pueblo', time: 'dia', chars: [{ n: 'Úrsula', c: '#8A5A2B', h: 1.4 }, { n: 'Melquíades', c: '#4B3A6E', h: 1.6 }, { n: 'Remedios', c: '#E8D7A8', h: 1.5 }], steps: [
    { t: 'El boom: el mundo lee a América Latina', view: 'libre', moment: null, focus: null },
    { t: 'Lo mágico, sin sorpresa', view: 'omnisciente', moment: 'nudo', focus: 2 },
    { t: 'De Aracataca a Macondo', setting: 'rio', time: 'noche', view: 'testigo', moment: 'inicio', focus: 0 },
    { t: 'Precursores y herederos', setting: 'paramo', time: 'dia', view: 'omnisciente', moment: 'desenlace', focus: 1 },
  ] },
  g9u1l2: { type: 'screen', text: 'Años después, frente al pelotón, el coronel recordó la tarde en que su padre lo llevó a conocer el hielo.', shots: [
    { k: 'Plano general', d: 'El pelotón frente al muro' }, { k: 'Primer plano', d: 'El rostro del coronel' }, { k: 'Plano medio', d: 'El padre y el niño' }, { k: 'Plano detalle', d: 'La mano del niño sobre el hielo' },
  ], steps: [
    { t: 'La novela cuenta, la pantalla muestra', at: 0 },
    { t: 'Pensamientos en primer plano', at: 1 },
    { t: 'Los planos del guion gráfico', at: 2 },
    { t: 'De la lectura al montaje', at: 3 },
  ] },
  g9u1l3: { type: 'figure', kind: 'personificacion', a: 'páramo', b: 'secreto', text: 'El viento del páramo contaba secretos', steps: [
    { t: 'Buscar un efecto', kind: 'personificacion', a: 'viento', b: 'secretos', text: 'El viento del páramo contaba secretos' },
    { t: 'Metáfora y símil', kind: 'metafora', a: 'río', b: 'culebra de plata', text: 'El río es una culebra de plata' },
    { t: 'Exagerar, humanizar, repetir, oponer', kind: 'hiperbole', a: 'costal', b: 'mil toneladas', text: 'Un costal que pesaba mil toneladas' },
    { t: 'La frase que atrapa', kind: 'anafora', a: 'Una noche', b: 'perfumes', text: 'Una noche, / una noche toda llena de perfumes' },
  ] },
  g9u2l1: { type: 'argument', thesis: 'El celular debe guardarse en clase', items: [], steps: [
    { t: 'La tesis', items: [] },
    { t: 'Argumentos, datos y ejemplos', items: [
      { t: 'Las notificaciones distraen', kind: 'arg', w: 3, side: 'pro' }, { t: 'Informe Unesco 2023', kind: 'dato', w: 2, side: 'pro' },
      { t: 'Descansos con fútbol', kind: 'ejemplo', w: 1, side: 'pro' } ] },
    { t: 'Contraargumento y conclusión', items: [
      { t: 'Las notificaciones distraen', kind: 'arg', w: 3, side: 'pro' }, { t: 'Informe Unesco 2023', kind: 'dato', w: 2, side: 'pro' },
      { t: 'Descansos con fútbol', kind: 'ejemplo', w: 1, side: 'pro' }, { t: 'Sirve para investigar', kind: 'contra', w: 2, side: 'con' } ] },
    { t: 'Falacias: ataques y trampas', items: [
      { t: 'Las notificaciones distraen', kind: 'arg', w: 3, side: 'pro' }, { t: 'Informe Unesco 2023', kind: 'dato', w: 2, side: 'pro' },
      { t: 'Sirve para investigar', kind: 'contra', w: 2, side: 'con' }, { t: 'Juan saca malas notas', kind: 'falacia', w: 2, side: 'pro' } ], reveal: 3 },
    { t: 'Dilemas, cadenas y falsas causas', items: [
      { t: 'Las notificaciones distraen', kind: 'arg', w: 3, side: 'pro' }, { t: 'Informe Unesco 2023', kind: 'dato', w: 2, side: 'pro' },
      { t: 'Sirve para investigar', kind: 'contra', w: 2, side: 'con' }, { t: 'O se prohíbe o será un caos', kind: 'falacia', w: 2, side: 'pro' } ], reveal: 3 },
  ] },
  g9u2l2: { type: 'argument', thesis: 'El metro de Bogotá debe ser elevado', items: [
    { t: 'Es más barato de construir', kind: 'arg', w: 2, side: 'pro' }, { t: 'Afecta el paisaje de la calle', kind: 'arg', w: 2, side: 'con' },
  ], reveal: null, steps: [
    { t: 'Dos posturas y un moderador' },
    { t: 'Argumentos y réplica', items: [
      { t: 'Es más barato de construir', kind: 'arg', w: 2, side: 'pro' }, { t: 'Afecta el paisaje de la calle', kind: 'arg', w: 2, side: 'con' },
      { t: 'Se construye más rápido', kind: 'dato', w: 2, side: 'pro' }, { t: 'Ruido cerca de las casas', kind: 'ejemplo', w: 1, side: 'con' } ] },
    { t: 'Ideas, no personas', items: [
      { t: 'Es más barato de construir', kind: 'arg', w: 2, side: 'pro' }, { t: 'Afecta el paisaje de la calle', kind: 'arg', w: 2, side: 'con' },
      { t: 'Se construye más rápido', kind: 'dato', w: 2, side: 'pro' }, { t: 'Ruido cerca de las casas', kind: 'ejemplo', w: 1, side: 'con' },
      { t: 'Lo dices porque vives en el norte', kind: 'falacia', w: 2, side: 'con' } ], reveal: 4 },
    { t: 'Bloquear falacias', items: [
      { t: 'Es más barato de construir', kind: 'arg', w: 2, side: 'pro' }, { t: 'Afecta el paisaje de la calle', kind: 'arg', w: 2, side: 'con' },
      { t: 'Se construye más rápido', kind: 'dato', w: 2, side: 'pro' }, { t: 'Ruido cerca de las casas', kind: 'ejemplo', w: 1, side: 'con' },
      { t: 'Un cantante dijo que es mejor', kind: 'falacia', w: 2, side: 'pro' } ], reveal: 4 },
  ] },
  g9u2l3: { type: 'textarch', kind: 'ensayo', parts: [
    { n: 'Introducción', t: 'Tema y tesis' }, { n: 'Desarrollo', t: 'Argumentos con ejemplos' }, { n: 'Conclusión', t: 'Retoma la tesis' },
  ], steps: [
    { t: 'Reflexionar y defender', focus: 0, remove: null },
    { t: 'Tres párrafos', focus: 1, remove: null },
    { t: 'Conectores con función', focus: 2, remove: null },
    { t: 'Revisar: sin pruebas, se cae', focus: null, remove: 1 },
  ] },
  g9u3l1: { type: 'dialect', regions: [
    { n: 'Bogotá y el altiplano', id: 'bogota', words: ['sumercé', '¡qué chirriado!'] },
    { n: 'Antioquia', id: 'paisa', words: ['parce', '¡avemaría, pues!'] },
    { n: 'Costa Caribe', id: 'caribe', words: ['¡ajá!', 'pelao'] },
    { n: 'Cali y el Valle', id: 'valle', words: ['¡ve!', 'borondo'] },
  ], focus: null, steps: [
    { t: 'Una lengua, muchas voces', focus: null },
    { t: 'Sumercé, vos y ¡ajá!', focus: 'paisa' },
    { t: 'Del altiplano y Antioquia', focus: 'bogota', regions: [
      { n: 'Bogotá y el altiplano', id: 'bogota', words: ['chino', '¡qué boleta!', 'onces'] },
      { n: 'Antioquia', id: 'paisa', words: ['¿quiubo, pues?', '¡qué charro!'] },
      { n: 'Costa Caribe', id: 'caribe', words: ['¡ajá!', 'pelao'] },
      { n: 'Cali y el Valle', id: 'valle', words: ['¡ve!', 'borondo'] } ] },
    { t: 'Costa, Valle y Santanderes', focus: 'caribe', regions: [
      { n: 'Bogotá y el altiplano', id: 'bogota', words: ['sumercé', 'chino'] },
      { n: 'Antioquia', id: 'paisa', words: ['parce', '¡qué charro!'] },
      { n: 'Costa Caribe', id: 'caribe', words: ['¡erda!', 'mamar gallo'] },
      { n: 'Cali y el Valle', id: 'valle', words: ['¡oís, ve!', 'cholado'] },
      { n: 'Santanderes', id: 'santanderes', words: ['¿qué hubo, mano?'] } ] },
    { t: 'Ninguna es incorrecta', focus: null, regions: [
      { n: 'Bogotá y el altiplano', id: 'bogota', words: ['sumercé', '¡qué chirriado!'] },
      { n: 'Antioquia', id: 'paisa', words: ['parce', '¡avemaría, pues!'] },
      { n: 'Costa Caribe', id: 'caribe', words: ['¡ajá!', 'pelao'] },
      { n: 'Cali y el Valle', id: 'valle', words: ['¡ve!', 'borondo'] },
      { n: 'Santanderes', id: 'santanderes', words: ['¿qué hubo, mano?'] },
      { n: 'Pacífico', id: 'pacifica', words: ['arrullo', 'chigualo'] } ] },
  ] },
  g9u3l2: { type: 'newsdesk', blocks: [
    { k: 'titular', t: '¡URGENTE! Bogotá sin agua 30 días' }, { k: 'fuente', t: 'Un primo de un amigo' },
    { k: 'dato', t: '90 % de barrios secos' }, { k: 'foto', t: 'Embalse seco (¿de dónde?)' }, { k: 'opinion', t: 'Los medios callan' },
  ], steps: [
    { t: 'Parece una noticia', pyramid: false, focus: null, ask: null },
    { t: 'Las pistas de alerta', focus: 'fuente' },
    { t: 'Verificar antes de compartir', focus: 'foto', ask: ['qué', 'quién', 'cuándo', 'dónde', 'por qué', 'cómo'] },
    { t: 'Confiable, engañosa o falsa', focus: 'titular', ask: null },
  ] },
  g9u3l3: { type: 'signs', items: [
    { kind: 'noverbal', icon: 'basura', label: 'Reciclaje' }, { kind: 'noverbal', icon: 'prohibido', label: 'Prohibido' },
    { kind: 'verbal', icon: 'texto', label: 'Bogotá D.C.' }, { kind: 'noverbal', icon: 'cruce', label: 'Precaución' },
    { kind: 'noverbal', icon: 'mano', label: 'Paz' }, { kind: 'verbal', icon: 'texto', label: '¡Vamos, Colombia!' },
  ], steps: [
    { t: 'Símbolos por convención', highlight: 'noverbal', pick: null },
    { t: 'Cívicos, deportivos, religiosos, científicos', highlight: null, pick: 2 },
    { t: 'Símbolos de todos los días', highlight: null, pick: 4 },
    { t: 'Incorporar símbolos al texto', highlight: null, pick: 0 },
  ] },
};
