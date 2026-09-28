// Minijuegos del grado 8°: dos por lección ("Juega") y el reto de cada unidad (formato en lib/SPEC.md).
export const LESSON_GAMES_G8 = {

  // Panorama de la literatura colombiana
  g8u1l1: [
    { game: 'conecta', title: 'Autor y obra', time: 120, pairs: [
      ['Jorge Isaacs', 'María'], ['Tomás Carrasquilla', 'Frutos de mi tierra'], ['Candelario Obeso', 'Cantos populares de mi tierra'],
      ['José Asunción Silva', 'Nocturno'], ['José Eustasio Rivera', 'La vorágine'], ['Gabriel García Márquez', 'Cien años de soledad'],
      ['Andrés Caicedo', '¡Que viva la música!'], ['Álvaro Mutis', 'La nieve del almirante'], ['Laura Restrepo', 'Delirio'] ] },
    { game: 'order', title: 'Ordena por época', time: 90, rounds: [
      { prompt: 'Ordena las obras de la más antigua a la más reciente', items: ['María', 'Nocturno', 'La vorágine', 'Cien años de soledad', 'Delirio'], labels: ['1867', '1894', '1924', '1967', '2004'] },
      { prompt: 'Ordena los movimientos en el tiempo', items: ['Romanticismo', 'Modernismo', 'Novela de la tierra', 'Realismo mágico'] },
      { prompt: 'Ordena a los autores según el movimiento al que pertenecen, del más antiguo al más reciente', items: ['Jorge Isaacs', 'José Asunción Silva', 'José Eustasio Rivera', 'Gabriel García Márquez', 'Laura Restrepo'], labels: ['Romanticismo', 'Modernismo', 'Novela de la tierra', 'Realismo mágico', 'Voces contemporáneas'] },
      { prompt: 'Ordena estas otras obras de la más antigua a la más reciente', items: ['Cantos populares de mi tierra', 'Frutos de mi tierra', '¡Que viva la música!', 'La nieve del almirante', 'Delirio'], labels: ['1877', '1896', '1977', '1986', '2004'] } ] },
  ],

  // El poema: verso, estrofa y rima
  g8u1l2: [
    { game: 'rima', title: 'Rima rápida', time: 60, lives: 3, items: [
      { v: 'Baja el río Magdalena / con su canto de metal; / y el pescador, con su pena, / lanza su red al…', o: ['juncal', 'río', 'agua'], a: 0, kind: 'consonante' },
      { v: 'Se despierta la ciudad / con olor a…', o: ['café', 'navidad', 'pan'], a: 1, kind: 'consonante' },
      { v: 'La niña mira la luna / desde el balcón de la casa; / el viento mueve su pelo / y la noche lenta…', o: ['termina', 'se duerme', 'avanza'], a: 2, kind: 'asonante' },
      { v: 'Cuando el sol cae en Cartagena, / la muralla canta su…', o: ['pena', 'historia', 'canción'], a: 0, kind: 'consonante' },
      { v: 'Camino por el páramo / entre frailejones y silencio; / la neblina baja lenta / y me cubre todo el…', o: ['camino', 'cuerpo', 'rostro'], a: 1, kind: 'asonante' },
      { v: 'Mi abuela vende en la plaza / guayabas, mangos y flores; / su puesto es el más alegre / y el de más lindos…', o: ['precios', 'frutas', 'colores'], a: 2, kind: 'consonante' },
      { v: 'Al Valle llegó María / en una tarde de…', o: ['brisa', 'sol', 'verano'], a: 0, kind: 'asonante' },
      { v: 'Por la montaña antioqueña / baja un arriero con…', o: ['su mula', 'leña', 'su carga'], a: 1, kind: 'consonante' },
      { v: 'Suena el acordeón en Valledupar, / la caja y la guacharaca; / la gente baila en la plaza / hasta que despunta el…', o: ['día', 'alba', 'sol'], a: 1, kind: 'asonante' } ] },
    { game: 'crucigrama', title: 'Crucigrama del poema', time: 300, words: [
      { w: 'verso', h: 'Cada línea de un poema' },
      { w: 'estrofa', h: 'Grupo de versos' },
      { w: 'rima', h: 'Repetición de sonidos al final de los versos' },
      { w: 'sinalefa', h: 'Unión en una sílaba de la vocal final de una palabra y la inicial de la siguiente' },
      { w: 'soneto', h: 'Poema de catorce endecasílabos' },
      { w: 'octosílabo', h: 'Verso de ocho sílabas' },
      { w: 'asonante', h: 'Rima en la que solo se repiten las vocales' },
      { w: 'cuarteta', h: 'Estrofa de cuatro octosílabos' } ] },
  ],

  // Figuras literarias
  g8u1l3: [
    { game: 'emoji', title: 'Emojifiguras', time: 90, lives: 3, items: [
      { e: '👀 = ⭐', q: '"Tus ojos son estrellas". ¿Qué figura es?', o: ['Metáfora', 'Símil', 'Hipérbole', 'Anáfora'], a: 0, x: 'Dice que los ojos SON estrellas, sin "como".' },
      { e: '😄 ≈ 💧', q: '"Tu risa es como el agua de la quebrada". ¿Qué figura es?', o: ['Metáfora', 'Símil', 'Epíteto', 'Onomatopeya'], a: 1, x: 'Usa el enlace "como": es un símil.' },
      { e: '😭🌊🌊🌊', q: '"Lloré tanto que se desbordó el Magdalena". ¿Qué figura es?', o: ['Personificación', 'Antítesis', 'Hipérbole', 'Símil'], a: 2, x: 'Exagera para dar fuerza a la tristeza.' },
      { e: '🎸😮‍💨', q: '"La guitarra suspira". ¿Qué figura es?', o: ['Personificación', 'Metáfora', 'Anáfora', 'Epíteto'], a: 0, x: 'Suspirar es humano: se lo da a la guitarra.' },
      { e: '🙏🎤 🙏💭 🙏❤️', q: '"Por ti canto, por ti sueño, por ti vivo". ¿Qué figura es?', o: ['Hipérbole', 'Anáfora', 'Símil', 'Onomatopeya'], a: 1, x: 'Repite "por ti" al inicio de cada frase.' },
      { e: '🧊🔥', q: '"Es hielo abrasador, es fuego helado". ¿Qué figura es?', o: ['Epíteto', 'Metáfora', 'Antítesis', 'Personificación'], a: 2, x: 'Enfrenta ideas contrarias: frío y calor.' },
      { e: '⏰🔊', q: '"El tic tac del reloj". ¿Qué figura es?', o: ['Onomatopeya', 'Anáfora', 'Hipérbole', 'Símil'], a: 0, x: '"Tic tac" imita el sonido del reloj.' },
      { e: '❄️⚪', q: '"La blanca nieve". ¿Qué figura es?', o: ['Antítesis', 'Símil', 'Hipérbole', 'Epíteto'], a: 3, x: 'Toda nieve es blanca: el adjetivo solo destaca esa cualidad.' },
      { e: '⏳✖️1000', q: '"Te esperé mil años". ¿Qué figura es?', o: ['Metáfora', 'Hipérbole', 'Onomatopeya', 'Anáfora'], a: 1, x: 'Nadie espera mil años: es una exageración.' },
      { e: '🌬️🤫', q: '"El viento susurra". ¿Qué figura es?', o: ['Epíteto', 'Símil', 'Personificación', 'Antítesis'], a: 2, x: 'Susurrar es una acción humana que se le da al viento.' } ] },
    { game: 'catcher', title: 'Atrapa las metáforas', rule: 'Atrapa solo las metáforas (A es B, sin "como")', time: 45, lives: 3,
      good: ['Tus ojos son luceros', 'Mi corazón es un acordeón', 'La luna es un farol de plata', 'Tu risa es mi canción', 'La vida es un río', 'Tus cabellos son oro', 'El páramo es una fábrica de agua', 'Mi pueblo es un nido de recuerdos'],
      bad: ['Blanca como la nieve', 'Rápido como un rayo', 'El viento susurra', 'Te esperé mil años', 'Por ti canto, por ti vivo', 'Tu risa parece una canción', 'Llegué tarde a clase'] },
  ],

  // Oraciones coordinadas y subordinadas
  g8u2l1: [
    { game: 'sorter', title: '¿Coordinada o subordinada?', bins: ['Coordinada', 'Subordinada'], time: 60, items: [
      ['La banda tocó y el público aplaudió', 0], ['Llovió, pero nadie se fue', 0], ['¿Vienes o te quedas?', 0], ['No llamó ni escribió', 0], ['Llegamos tarde, pero conseguimos puesto', 0], ['Unos cantaban y otros bailaban', 0],
      ['Me dijo que vendría', 1], ['Cuando empezó la música, todos saltaron', 1], ['Si llueve, llevamos capa', 1], ['No fui porque estaba enfermo', 1], ['El grupo que tocó primero es de Cali', 1], ['Iremos donde tú quieras', 1] ] },
    { game: 'hunter', title: 'Cazador de nexos', time: 90, rounds: [
      { clue: 'Toca los nexos coordinantes (suman, dan a elegir o contrastan)', text: 'La banda tocó [[y]] el público aplaudió. Hacía frío, [[pero]] nadie se fue. ¿Compramos la camiseta [[o]] ahorramos para el bus? No trajimos capa [[ni]] teníamos sombrilla. Salimos temprano porque el metro cierra a las once.' },
      { clue: 'Toca los nexos subordinantes (causa, condición, tiempo o lugar)', text: 'Salimos temprano [[porque]] el metro cierra a las once. Te guardo un puesto [[si]] llegas antes de las dos. Todos saltaron [[cuando]] sonó la primera canción. Nos vemos [[donde]] está la tarima. Unos cantaban y otros bailaban.' },
      { clue: 'Toca los verbos conjugados: cada uno es una proposición', text: 'Rock al Parque [[es]] gratis y [[reúne]] a miles de jóvenes. Mi hermana [[dijo]] que el cartel [[estaba]] muy bueno. [[Llovió]] toda la tarde, pero el público no se [[fue]].' } ] },
  ],

  // Coherencia y cohesión
  g8u2l2: [
    { game: 'puente', title: 'Puente de conectores', time: 90, lives: 3, items: [
      { a: 'Estudié toda la semana', b: 'me fue bien en la evaluación', o: ['por eso', 'sin embargo', 'o sea'], k: 0, e: '"Por eso" introduce una consecuencia.' },
      { a: 'La Séptima es peatonal', b: 'algunos ciclistas pasan a toda velocidad', o: ['por lo tanto', 'sin embargo', 'además'], k: 1, e: '"Sin embargo" marca un contraste con lo esperado.' },
      { a: 'El centro tiene museos', b: 'tiene teatros y librerías', o: ['en cambio', 'por eso', 'además'], k: 2, e: '"Además" suma información.' },
      { a: 'Primero leímos la crónica', b: 'escribimos nuestra propia versión', o: ['después', 'sin embargo', 'es decir'], k: 0, e: '"Después" ordena en el tiempo.' },
      { a: 'El TransMilenio iba lleno', b: 'decidimos caminar', o: ['aunque', 'así que', 'además'], k: 1, e: '"Así que" presenta la consecuencia.' },
      { a: 'La arepa boyacense es dulce', b: 'la antioqueña casi no tiene sal', o: ['por lo tanto', 'es decir', 'en cambio'], k: 2, e: '"En cambio" opone dos cosas distintas.' },
      { a: 'Es un texto cohesionado', b: 'sus partes están bien conectadas', o: ['es decir', 'sin embargo', 'en cambio'], k: 0, e: '"Es decir" explica con otras palabras.' },
      { a: 'Llovió toda la mañana', b: 'el concierto empezó a tiempo', o: ['por eso', 'aun así', 'o sea'], k: 1, e: '"Aun así" indica que algo ocurre a pesar de lo anterior.' },
      { a: 'No trajimos el mapa', b: 'nos perdimos en La Candelaria', o: ['en cambio', 'además', 'por eso'], k: 2, e: 'Perderse es consecuencia de no llevar el mapa.' } ] },
    { game: 'corrector', title: 'Corrector de conectores', time: 150, lives: 3, rounds: [
      { text: 'Llovió toda la mañana; {{aun así|por eso}}, el concierto empezó a tiempo. Llegamos temprano, {{así que|en cambio}} conseguimos buen puesto. {{Finalmente|Primero}}, volvimos a casa felices.', e: '"Aun así" marca contraste, "así que" presenta la consecuencia y "finalmente" cierra el recorrido.' },
      { text: 'En la Séptima vi a una señora que vendía obleas; {{ella|él}} misma {{las|los}} rellenaba con arequipe. {{Además|Sin embargo}}, vendía jugos de mora.', e: '"Ella" remite a la señora, "las" a las obleas y "además" suma información.' },
      { text: 'El frailejón vive en el páramo. Sus hojas atrapan la humedad de la neblina; {{por eso|en cambio}}, el agua baja poco a poco a los ríos. {{Es decir|Aunque}}, el páramo es una fábrica de agua.', e: '"Por eso" presenta la consecuencia y "es decir" explica con otras palabras.' },
      { text: '{{Primero|Finalmente}}, mezcla la harina con agua tibia y sal. {{Después|Sin embargo}}, amasa hasta que no se pegue. {{Por último|Además}}, asa las arepas en un budare.', e: 'Los conectores de tiempo ordenan los pasos: primero, después, por último.' } ] },
  ],

  // La concordancia
  g8u2l3: [
    { game: 'balancer', title: 'Concordancia relámpago', time: 120, items: [
      { parts: [{ o: ['El', 'La'], a: 1 }, { t: 'gente' }, { o: ['llegó', 'llegaron'], a: 0 }, { t: 'temprano.' }], e: '"Gente" es un sustantivo colectivo singular.' },
      { parts: [{ o: ['Se vende', 'Se venden'], a: 1 }, { t: 'empanadas.' }], e: 'El verbo concuerda con "empanadas", plural.' },
      { parts: [{ t: 'Ayer' }, { o: ['hubo', 'hubieron'], a: 0 }, { t: 'muchos accidentes.' }], e: '"Haber" de existencia va en singular.' },
      { parts: [{ t: 'Mi primo y yo' }, { o: ['fuimos', 'fueron', 'fue'], a: 0 }, { t: 'al estadio.' }], e: '"Mi primo y yo" equivale a "nosotros".' },
      { parts: [{ t: 'El agua' }, { o: ['fría', 'frío'], a: 0 }, { t: 'se acabó.' }], e: '"Agua" es femenino aunque lleve "el".' },
      { parts: [{ t: 'Las calles' }, { o: ['empinado', 'empinadas', 'empinada'], a: 1 }, { t: 'de Manizales.' }], e: 'Adjetivo en femenino plural, como "calles".' },
      { parts: [{ t: 'Tú y ella' }, { o: ['canta', 'cantan', 'cantamos'], a: 1 }, { t: 'vallenatos.' }], e: '"Tú y ella" equivale a "ustedes": cantan.' },
      { parts: [{ t: 'Los' }, { o: ['problema', 'problemas'], a: 1 }, { o: ['grave', 'graves'], a: 1 }, { o: ['desapareció', 'desaparecieron'], a: 1 }], e: 'Todo en plural, como "los".' },
      { parts: [{ o: ['Este', 'Esta'], a: 1 }, { t: 'mano está' }, { o: ['herido', 'herida'], a: 1 }], e: '"Mano" es femenino aunque termine en -o.' },
      { parts: [{ t: 'El mapa' }, { o: ['antiguo', 'antigua'], a: 0 }, { o: ['está', 'están'], a: 0 }, { t: 'roto.' }], e: '"Mapa" es masculino aunque termine en -a.' } ] },
    { game: 'truefalse', title: '¿Concuerda o no?', time: 60, lives: 3, items: [
      { s: '"Se venden empanadas" está bien escrito.', a: true, e: 'El verbo va en plural porque "empanadas" es plural.' },
      { s: '"Hubieron muchos problemas" está bien escrito.', a: false, e: 'Lo correcto es "hubo muchos problemas".' },
      { s: '"La gente llegaron temprano" está bien escrito.', a: false, e: '"Gente" es singular: "la gente llegó".' },
      { s: '"El agua fría" está bien escrito.', a: true, e: '"Agua" es femenino; se usa "el" porque empieza por a tónica.' },
      { s: '"Mi mamá y yo vamos al mercado" está bien escrito.', a: true, e: '"Mi mamá y yo" equivale a "nosotros" (o "nosotras"): vamos.' },
      { s: '"Las montañas verde" está bien escrito.', a: false, e: 'Debe ser "verdes", en plural.' },
      { s: '"Debe haber soluciones" está bien escrito.', a: true, e: 'Con "haber" impersonal, el auxiliar va en singular.' },
      { s: '"Se arregla celulares" está bien escrito.', a: false, e: 'Lo correcto es "se arreglan celulares".' },
      { s: '"El tema principal es la paz" está bien escrito.', a: true, e: '"Tema" es masculino y singular.' },
      { s: '"Habían muchas personas en la fila" está bien escrito.', a: false, e: 'Lo correcto es "había muchas personas".' } ] },
  ],

  // Noticia, opinión y publicidad
  g8u3l1: [
    { game: 'detective', title: 'Detective de noticias', cases: [
      { head: 'Abren tres bibliotecas públicas en la comuna 8', src: 'Periódico local · sección Ciudad', date: '12 de marzo de 2026', text: 'Las bibliotecas funcionarán de lunes a sábado; la Secretaría de Cultura publicó las direcciones.', clues: [{ t: 'Cita a la Secretaría de Cultura como fuente', bad: false }, { t: 'Da direcciones y horarios que se pueden comprobar', bad: false }, { t: 'La firma una periodista con nombre y apellido', bad: false }], a: 0, e: 'Tiene fuente identificable, datos verificables y autora: es confiable.' },
      { head: '¡Tomar agua de panela con limón cura el dengue!', src: 'Cadena de WhatsApp', date: 'Sin fecha', clues: [{ t: 'No cita ningún estudio ni médico', bad: true }, { t: 'Pide reenviar el mensaje a diez contactos', bad: true }, { t: 'Las autoridades de salud dicen que el dengue requiere atención médica', bad: true }], a: 2, e: 'Afirma algo que contradice a las autoridades de salud y no tiene ninguna fuente: es falsa.' },
      { head: 'Colegios públicos tendrán solo tres días de clase a la semana', src: 'Portal de noticias', date: '3 de febrero de 2026', text: 'En el cuarto párrafo se aclara que es una medida temporal en cinco colegios por obras.', clues: [{ t: 'El titular habla de "colegios públicos" en general', bad: true }, { t: 'El texto dice que son solo cinco colegios', bad: true }, { t: 'La medida dura dos semanas', bad: true }], a: 1, e: 'El hecho existe, pero el titular lo exagera: es engañosa.' },
      { head: 'Así quedó la Séptima después del concierto de anoche', src: 'Cuenta de redes con muchos seguidores', date: 'Ayer', clues: [{ t: 'La foto circula en internet desde 2019', bad: true }, { t: 'Sí hubo un concierto anoche', bad: false }, { t: 'No dice quién tomó la foto', bad: true }], a: 1, e: 'El concierto fue real, pero la foto es vieja y se usa fuera de contexto: es engañosa.' },
      { head: 'Científicos confirman que los frailejones crecen un metro por semana', src: 'blog-curiosidades-top.com', date: '1 de abril', clues: [{ t: 'Los frailejones crecen cerca de un centímetro al año', bad: true }, { t: 'No nombra a ningún científico ni universidad', bad: true }, { t: 'Se publicó el Día de los Inocentes en otros países', bad: true }], a: 2, e: 'El dato es imposible y no tiene fuentes: es falsa.' },
      { head: 'Declaran alerta por crecientes en el río Cauca', src: 'Emisora regional', date: '20 de octubre de 2026', text: 'La nota enlaza el boletín oficial de la autoridad ambiental y cita al coordinador de gestión del riesgo.', clues: [{ t: 'Enlaza el boletín oficial', bad: false }, { t: 'Otros medios informan lo mismo', bad: false }, { t: 'Da recomendaciones de las autoridades', bad: false }], a: 0, e: 'La información coincide con la fuente oficial y con otros medios: es confiable.' },
      { head: 'El 90 % de los jóvenes colombianos ya no lee', src: 'Video viral', date: 'Hace 2 días', clues: [{ t: 'La "encuesta" se hizo a 20 personas de un solo barrio', bad: true }, { t: 'Generaliza a todo el país', bad: true }, { t: 'No muestra la pregunta que se hizo', bad: true }], a: 1, e: 'Parte de un dato real pero mínimo y lo presenta como si fuera de todo el país: es engañosa.' },
      { head: 'Gobierno prohíbe el bocadillo en las loncheras', src: 'Página de humor', date: '28 de diciembre', clues: [{ t: 'La página se presenta como satírica', bad: true }, { t: 'Ningún medio ni entidad oficial lo menciona', bad: true }, { t: 'La fecha es el Día de los Inocentes', bad: true }], a: 2, e: 'Es un chiste de una página de humor que circula como si fuera noticia: es falsa.' } ] },
    { game: 'sopa', title: 'Sopa de los medios', size: 11, time: 180, words: [
      { w: 'noticia', h: 'Cuenta hechos comprobables con fuentes' },
      { w: 'reportaje', h: 'Texto que informa a fondo sobre un tema' },
      { w: 'fuente', h: 'Quien da el dato en una noticia' },
      { w: 'columna', h: 'Opinión firmada por una persona' },
      { w: 'editorial', h: 'Opinión del propio periódico' },
      { w: 'caricatura', h: 'Opina con humor y dibujos' },
      { w: 'eslogan', h: 'Frase corta de la publicidad para vender' },
      { w: 'opinión', h: 'Valora y da argumentos: "creo que…"' } ] },
  ],

  // Escuchar y dialogar
  g8u3l2: [
    { game: 'rosco', title: 'El rosco del diálogo', time: 240, items: [
      { l: 'A', q: 'Empieza por A: quien dice su desacuerdo con respeto, sin burlas ni gritos, es…', a: 'asertivo', alt: ['asertiva'] },
      { l: 'C', q: 'Empieza por C: fórmulas como "por favor" y "con gusto" son de…', a: 'cortesía' },
      { l: 'D', q: 'Empieza por D: "Qué pena con usted" sirve para…', a: 'disculparse' },
      { l: 'E', q: 'Empieza por E: poner atención para comprender lo que el otro dice', a: 'escuchar' },
      { l: 'F', q: 'Contiene la F: "Si quiere, le ayudo con esas cajas" sirve para…', a: 'ofrecer' },
      { l: 'G', q: 'Contiene la G: "Mil gracias por fiarme" sirve para…', a: 'agradecer' },
      { l: 'I', q: 'Empieza por I: lo que quiere lograr quien habla con una frase', a: 'intención' },
      { l: 'N', q: 'Empieza por N: "¿Y si le pago la mitad hoy?" sirve para…', a: 'negociar' },
      { l: 'O', q: 'Empieza por O: percibir el sonido sin poner atención', a: 'oír' },
      { l: 'P', q: 'Empieza por P: decir con otras palabras lo que el otro dijo', a: 'parafrasear' },
      { l: 'R', q: 'Empieza por R: "El arroz de ayer tenía gorgojo" sirve para…', a: 'reclamar' },
      { l: 'S', q: 'Empieza por S: "¡Buenas! ¿Cómo amaneció?" sirve para…', a: 'saludar' },
      { l: 'T', q: 'Empieza por T: rasgo de la voz que ayuda a descubrir la intención', a: 'tono' },
      { l: 'U', q: 'Contiene la U: en un diálogo hay que respetar los…', a: 'turnos' },
      { l: 'V', q: 'Contiene la V: "Ojo, que el piso está mojado" sirve para…', a: 'advertir' } ] },
    { game: 'blitz', title: 'Contrarreloj de intenciones', time: 60, lives: 3, items: [
      { q: '"¿Me regala dos panes, por favor?"', o: ['Pedir', 'Reclamar', 'Ofrecer', 'Agradecer'], a: 0, e: 'En Colombia "me regala" es una fórmula cortés para pedir.' },
      { q: '"Vecino, el arroz de ayer tenía gorgojo."', o: ['Agradecer', 'Reclamar', 'Saludar', 'Ofrecer'], a: 1, e: 'Señala un problema con lo comprado.' },
      { q: '"Si me lleva dos, le dejo el tercero a mitad de precio."', o: ['Disculparse', 'Reclamar', 'Ofrecer', 'Saludar'], a: 2, e: 'El tendero propone un trato: ofrece.' },
      { q: '"Qué pena con usted, se me olvidó traerle el cambio."', o: ['Reclamar', 'Pedir', 'Ofrecer', 'Disculparse'], a: 3, e: '"Qué pena con usted" es una disculpa muy colombiana.' },
      { q: '"Mil gracias por fiarme la semana pasada."', o: ['Agradecer', 'Pedir', 'Reclamar', 'Negociar'], a: 0, e: 'Expresa gratitud.' },
      { q: '"¿Y si le pago la mitad hoy y la otra mitad el viernes?"', o: ['Saludar', 'Negociar', 'Agradecer', 'Reclamar'], a: 1, e: 'Propone un acuerdo: negocia.' },
      { q: '"¡Buenas, don Ernesto! ¿Cómo amaneció?"', o: ['Reclamar', 'Ofrecer', 'Saludar', 'Disculparse'], a: 2, e: 'Es un saludo cortés.' },
      { q: '"Ojo, que el piso está mojado."', o: ['Advertir', 'Agradecer', 'Negociar', 'Pedir perdón'], a: 0, e: 'Avisa de un peligro.' },
      { q: '"Si quiere, le ayudo a bajar esas cajas."', o: ['Reclamar', 'Advertir', 'Disculparse', 'Ofrecer'], a: 3, e: 'Ofrece ayuda.' } ] },
  ],

  // El arte y su comunidad
  g8u3l3: [
    { game: 'emoji', title: 'Emojisímbolos', time: 90, lives: 3, items: [
      { e: '🎵🇨🇴', q: '¿Qué símbolo patrio es?', o: ['Himno nacional', 'Escudo', 'Bandera', 'Sombrero vueltiao'], a: 0, x: 'El himno es el símbolo patrio que se canta.' },
      { e: '🟨🟦🟥', q: '¿Qué símbolo patrio es?', o: ['Escudo', 'Bandera tricolor', 'Himno nacional', 'Mochila wayuu'], a: 1, x: 'Amarillo, azul y rojo: la bandera tricolor.' },
      { e: '🦅🛡️', q: '¿Qué ave está en el escudo y qué representa?', o: ['Colibrí: alegría', 'Paloma: paz', 'Cóndor: libertad', 'Garza: agua'], a: 2, x: 'El cóndor de los Andes representa la libertad.' },
      { e: '🌸🇨🇴', q: '¿Cuál es la flor nacional?', o: ['Orquídea Cattleya', 'Frailejón', 'Rosa', 'Girasol'], a: 0, x: 'La orquídea Cattleya es la flor nacional.' },
      { e: '🌴☁️🌳', q: '¿Cuál es el árbol nacional?', o: ['Ceiba', 'Palma de cera', 'Guayacán', 'Pino'], a: 1, x: 'La palma de cera es el árbol nacional.' },
      { e: '🧶👜🏜️', q: '¿Qué tejido es emblema de las mujeres de La Guajira?', o: ['Sombrero vueltiao', 'Ruana', 'Mochila wayuu', 'Hamaca'], a: 2, x: 'La mochila wayuu la tejen las mujeres wayuu.' },
      { e: '🎨🧱🏘️⛰️', q: 'Grafitis que narran la historia de un barrio de Medellín', o: ['Calle 26', 'Comuna 13', 'Puente Aranda', 'La Candelaria'], a: 1, x: 'Los grafitis de la Comuna 13 cuentan la memoria del barrio.' },
      { e: '🎨✈️🛣️', q: 'Murales en la avenida que va al aeropuerto de Bogotá', o: ['Comuna 13', 'Carrera Séptima', 'Calle 26', 'Plaza de Bolívar'], a: 2, x: 'Los murales de la calle 26 (avenida El Dorado) llevan al aeropuerto.' },
      { e: '🕊️🎨', q: 'Un mural con esta figura habla de…', o: ['Guerra', 'Paz', 'Comercio', 'Deporte'], a: 1, x: 'La paloma blanca es símbolo de paz.' },
      { e: '🌿💧⛰️🎨', q: 'Un mural con frailejones y gotas invita a…', o: ['Talar el páramo', 'Vender plantas', 'Cuidar el agua del páramo', 'Ir de paseo'], a: 2, x: 'El páramo es una fábrica de agua.' } ] },
    { game: 'word', title: 'Palabra secreta del mural', lives: 6, count: 6, words: [
      { w: 'mural', h: 'Pintura grande sobre una pared' },
      { w: 'símbolo', h: 'Imagen que representa una idea' },
      { w: 'paloma', h: 'Ave blanca que significa paz' },
      { w: 'cóndor', h: 'Ave del escudo: libertad' },
      { w: 'identidad', h: 'Lo que hace sentir parte de un país o una región' },
      { w: 'comunidad', h: 'Grupo de personas de donde nace el arte urbano' },
      { w: 'memoria', h: 'Lo que el arte urbano ayuda a recordar' },
      { w: 'grafiti', h: 'Pintura o letras hechas en la calle, muchas veces con aerosol' } ] },
  ],
};

export const UNIT_GAMES_G8 = {
  g8u1: { game: 'memory', title: 'Parejas de autores colombianos', pairs: [
    ['Jorge Isaacs', 'Romanticismo en el Valle del Cauca'], ['José Asunción Silva', 'Modernismo y musicalidad'], ['Tomás Carrasquilla', 'Costumbrismo antioqueño'], ['José Eustasio Rivera', 'La selva y los caucheros'],
    ['Gabriel García Márquez', 'Macondo y el Nobel de 1982'], ['Álvaro Mutis', 'Maqroll el Gaviero'], ['Candelario Obeso', 'Poesía en el habla del río Magdalena'], ['Andrés Caicedo', 'La Cali de los años setenta'] ] },
  g8u2: { game: 'builder', title: 'Constructor de la unidad', time: 180, targets: [
    { prompt: 'Coordinada con contraste', pieces: ['Hacía frío', 'pero', 'porque', 'bailamos toda la noche'], answers: [['Hacía frío', 'pero', 'bailamos toda la noche']] },
    { prompt: 'Subordinada de causa', pieces: ['Salimos temprano', 'porque', 'y', 'el metro cierra a las once'], answers: [['Salimos temprano', 'porque', 'el metro cierra a las once']] },
    { prompt: 'Subordinada de condición', pieces: ['Te guardo un puesto', 'si', 'ni', 'llegas antes de las dos'], answers: [['Te guardo un puesto', 'si', 'llegas antes de las dos']] },
    { prompt: 'Une con un conector de contraste', pieces: ['Llovió toda la mañana;', 'sin embargo,', 'por eso,', 'el concierto empezó a tiempo'], answers: [['Llovió toda la mañana;', 'sin embargo,', 'el concierto empezó a tiempo']] },
    { prompt: 'Une con un conector de consecuencia', pieces: ['El bus iba lleno,', 'así que', 'en cambio', 'decidimos caminar'], answers: [['El bus iba lleno,', 'así que', 'decidimos caminar']] },
    { prompt: 'Aviso con buena concordancia', pieces: ['Se', 'venden', 'vende', 'empanadas'], answers: [['Se', 'venden', 'empanadas']] },
    { prompt: '"Haber" de existencia', pieces: ['Ayer', 'hubo', 'hubieron', 'muchos', 'problemas'], answers: [['Ayer', 'hubo', 'muchos', 'problemas']] },
    { prompt: 'Sustantivo colectivo', pieces: ['La', 'gente', 'llegó', 'llegaron', 'temprano'], answers: [['La', 'gente', 'llegó', 'temprano']] },
    { prompt: 'Género que engaña', pieces: ['El', 'agua', 'fría', 'frío', 'se', 'acabó'], answers: [['El', 'agua', 'fría', 'se', 'acabó']] } ] },
  g8u3: { game: 'conecta', title: 'Une los discursos', time: 150, pairs: [
    ['Noticia', 'Cuenta hechos con fuentes'], ['Editorial', 'Opinión del propio periódico'], ['Eslogan', 'Frase para vender'],
    ['Foto vieja fuera de contexto', 'Información engañosa'], ['Parafrasear', 'Decir con otras palabras lo que el otro dijo'],
    ['"¿Me regala dos panes?"', 'Pedir'], ['"Qué pena con usted"', 'Disculparse'], ['Paloma blanca', 'Paz'],
    ['Frailejón', 'Páramo, fábrica de agua'], ['Mochila wayuu', 'Tejido de La Guajira'] ] },
};
