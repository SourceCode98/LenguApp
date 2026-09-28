// Minijuegos del grado 7°: dos por lección ("Juega") y el reto de cada unidad (formato en lib/SPEC.md).
export const LESSON_GAMES_G7 = {

  // Tipologías textuales
  g7u1l1: [
    { game: 'conecta', title: 'Une el tipo con su pista', time: 120, pairs: [
      ['Narrativo', 'Cuenta hechos en el tiempo'], ['Descriptivo', 'Muestra cómo es algo o alguien'], ['Expositivo', 'Explica un tema con datos'],
      ['Argumentativo', 'Defiende una tesis con razones'], ['Instructivo', 'Guía paso a paso'], ['"Había una vez"', 'Marca de inicio de un relato'],
      ['"Pele, mezcle, conecte"', 'Verbos que dan órdenes'], ['"Creo, debería, hay que"', 'Palabras que opinan'], ['"Bajita, blancas, ronca"', 'Adjetivos que describen'],
      ['Aviso publicitario', 'Mezcla tipos, pero busca convencer'] ] },
    { game: 'truefalse', title: '¿Qué intención tiene?', time: 60, lives: 3, items: [
      { s: 'Una receta de ajiaco tiene una intención instructiva.', a: true, e: 'Indica paso a paso cómo preparar el plato.' },
      { s: 'Un texto argumentativo busca convencer con razones.', a: true, e: 'Defiende una tesis y la apoya con argumentos.' },
      { s: 'Una columna de opinión es un texto expositivo y objetivo.', a: false, e: 'La columna expresa y defiende la opinión de su autor: es argumentativa.' },
      { s: 'El texto descriptivo cuenta hechos en orden cronológico.', a: false, e: 'Eso lo hace el narrativo; el descriptivo muestra cómo es algo.' },
      { s: 'Un artículo de enciclopedia sobre los volcanes es expositivo.', a: true, e: 'Explica un tema con datos objetivos.' },
      { s: 'El manual para armar una bicicleta es un texto narrativo.', a: false, e: 'Es instructivo: guía los pasos de una tarea.' },
      { s: 'Un mismo texto puede mezclar descripción y narración.', a: true, e: 'Es frecuente, aunque siempre domina una intención.' },
      { s: '"Había una vez…" es un comienzo típico del texto instructivo.', a: false, e: 'Es la fórmula de inicio de muchos cuentos: texto narrativo.' },
      { s: 'El aviso "Para sacar el pasaporte, pida cita en la página web" da instrucciones.', a: true, e: 'Indica al lector qué debe hacer.' },
      { s: 'Todos los cuentos son textos argumentativos.', a: false, e: 'El cuento es narrativo: su intención principal es contar una historia.' } ] },
  ],

  // El texto expositivo y la idea principal
  g7u1l2: [
    { game: 'hunter', title: 'Cazador de ideas principales', time: 90, rounds: [
      { clue: 'Toca la idea principal del párrafo', text: '[[Los páramos son fábricas de agua]]. Sus plantas atrapan la humedad de la niebla. El suelo, como una esponja, la guarda. Poco a poco, el agua baja a los ríos y llega a las ciudades.' },
      { clue: 'Toca la idea principal (no siempre va al comienzo)', text: 'El oso de anteojos recorre el páramo buscando alimento. El venado baja a beber a las lagunas. Las ranas se esconden entre los musgos. [[El páramo es el hogar de muchas especies de animales]].' },
      { clue: 'Toca la idea principal de cada párrafo', text: '[[La papa es uno de los alimentos más importantes de Colombia]]. Se cultiva en Boyacá, Cundinamarca y Nariño, y tiene variedades como la criolla y la sabanera. [[Sin embargo, sembrarla en el páramo lo daña]]: el arado seca el suelo y destruye los frailejones.' },
      { clue: 'Toca la idea principal del párrafo', text: '[[La chiva es mucho más que un bus: es un símbolo del arte popular colombiano]]. Sus colores alegres decoran artesanías. Aparece en pinturas y postales. En las fiestas de muchos pueblos desfila llena de música.' } ] },
    { game: 'order', title: 'Ordena los párrafos', time: 90, rounds: [
      { prompt: 'Ordena el texto expositivo sobre Sumapaz', items: ['Sumapaz es el páramo más grande del mundo.', 'Primero, sus frailejones atrapan el agua de la niebla.', 'Además, allí viven el oso de anteojos y el venado.', 'Por eso, cuidarlo es cuidar el agua.'], labels: ['Introducción', 'Desarrollo', 'Desarrollo', 'Cierre'] },
      { prompt: 'Ordena el texto expositivo sobre el café', items: ['El café es uno de los productos más conocidos de Colombia.', 'Su cultivo creció en el siglo XIX en los Santanderes y luego pasó a Antioquia y Caldas.', 'Hoy se cultiva en más de 500 municipios del país.', 'Por su historia y su paisaje, el Paisaje Cultural Cafetero es Patrimonio de la Humanidad.'], labels: ['Introducción', 'Desarrollo', 'Desarrollo', 'Cierre'] },
      { prompt: 'Ordena el texto expositivo sobre la cumbia', items: ['La cumbia es un ritmo tradicional del Caribe colombiano.', 'Nació de la mezcla de gaitas indígenas, tambores africanos y cantos y coplas de origen español.', 'Con el tiempo pasó de las fiestas de los pueblos a las orquestas de las ciudades.', 'Por eso hoy se considera un símbolo musical de Colombia.'], labels: ['Introducción', 'Desarrollo', 'Desarrollo', 'Cierre'] },
      { prompt: 'Ordena las partes de un texto expositivo', items: ['Introducción', 'Desarrollo', 'Cierre'], labels: ['Presenta el tema', 'Lo explica por partes', 'Resume o concluye'] } ] },
  ],

  // Hechos y opiniones en los medios
  g7u1l3: [
    { game: 'detective', title: 'Detective de titulares', cases: [
      { head: 'Colombia, subcampeona de la Copa América 2024 tras caer 1-0 ante Argentina', src: 'Diario deportivo nacional', date: '15 de julio de 2024',
        clues: [{ t: 'Cita el resultado oficial de la Conmebol', bad: false }, { t: 'Otros medios dan el mismo marcador', bad: false }, { t: 'Fecha y lugar coinciden: final en Miami', bad: false }], a: 0, e: 'Es un hecho verificado por varias fuentes.' },
      { head: '¡Colombia, campeona de América!', src: 'Grupo de WhatsApp "Hinchas 100 %"', date: 'Compartido hoy',
        clues: [{ t: 'La foto es de 2001, no de este año', bad: true }, { t: 'El hecho ocurrió, pero hace más de veinte años', bad: true }, { t: 'No dice la fecha del partido', bad: true }], a: 1, e: 'Es engañosa: un hecho real sacado de su fecha para que parezca actual.' },
      { head: 'La FIFA prohíbe a Colombia jugar en Barranquilla por el calor', src: 'Cuenta anónima @futbolverdad99', date: 'Sin fecha',
        clues: [{ t: 'Ni la FIFA ni ningún medio lo confirman', bad: true }, { t: 'La cuenta se creó hace una semana', bad: true }, { t: 'No cita ningún documento oficial', bad: true }], a: 2, e: 'Es falsa: no hay ninguna fuente que la respalde.' },
      { head: 'James Rodríguez, goleador del Mundial de Brasil 2014 con seis goles', src: 'Estadísticas oficiales de la FIFA', date: '13 de julio de 2014',
        clues: [{ t: 'Coincide con las estadísticas oficiales del torneo', bad: false }, { t: 'Lo publicaron medios de todo el mundo', bad: false }], a: 0, e: 'Es un dato comprobable en los registros oficiales.' },
      { head: '"Fracaso total": la Selección pierde la final', src: 'Portal de chismes deportivos', date: '15 de julio de 2024', text: 'Colombia llegó a la final tras 28 partidos sin perder y cayó 1-0 en el tiempo extra.',
        clues: [{ t: 'El resultado es real', bad: false }, { t: 'El titular calla que venía de 28 partidos invicta', bad: true }, { t: '"Fracaso total" es una opinión presentada como hecho', bad: true }], a: 1, e: 'Es engañosa: el dato es real, pero el titular lo presenta con una valoración exagerada.' },
      { head: 'Luis Díaz vuelve a la liga colombiana por 500 millones de euros', src: 'Video en redes con voz robótica', date: 'Sin fecha',
        clues: [{ t: 'Ninguna fuente oficial lo confirma', bad: true }, { t: 'La cifra supera cualquier fichaje de la historia', bad: true }, { t: 'El video no muestra a ningún periodista', bad: true }], a: 2, e: 'Es falsa: la cifra es imposible y nadie la confirma.' },
      { head: 'Colombia llegó a cuartos de final en el Mundial de 2014', src: 'Enciclopedia deportiva', date: 'Consulta en línea',
        clues: [{ t: 'Coincide con los registros de la FIFA', bad: false }, { t: 'Precisa que perdió 2-1 con Brasil en cuartos', bad: false }], a: 0, e: 'Es confiable: da datos precisos y comprobables.' },
      { head: 'Científicos confirman: ver jugar a la Selección cura la gripa', src: 'Blog "Salud milagrosa"', date: 'Sin fecha',
        clues: [{ t: 'No nombra a los científicos ni a la universidad', bad: true }, { t: 'Promete una cura imposible', bad: true }, { t: 'Ningún medio de salud lo reporta', bad: true }], a: 2, e: 'Es falsa: una afirmación científica sin fuente ni estudio.' } ] },
    { game: 'catcher', title: 'Atrapa solo los hechos', rule: 'Atrapa solo los hechos: lo que se puede comprobar', time: 45, lives: 3,
      good: ['Colombia ganó la Copa América 2001', 'James marcó 6 goles en el Mundial 2014', 'El partido terminó 2-1', 'Asistieron 40.000 personas', 'Luis Díaz nació en Barrancas, La Guajira', 'Colombia perdió la final de 2024 con Argentina', 'El gol llegó en el minuto 90', 'La Selección jugó en Barranquilla'],
      bad: ['Fue un partido aburridísimo', 'El técnico debería renunciar', 'James es el mejor de la historia', 'La camiseta nueva es horrible', 'Sin duda, ganaremos el Mundial', 'El árbitro fue vergonzoso', 'Los hinchas colombianos son los más alegres', 'Para mí, jugaron sin ganas'] },
  ],

  // Narrativo, lírico y dramático
  g7u2l1: [
    { game: 'sopa', title: 'Sopa de subgéneros', size: 10, time: 180, words: [
      { w: 'novela', h: 'Relato largo, como María' },
      { w: 'fábula', h: 'Relato breve con animales y moraleja' },
      { w: 'soneto', h: 'Poema de catorce versos' },
      { w: 'copla', h: 'Estrofa popular breve, hecha para cantar' },
      { w: 'elegía', h: 'Poema que lamenta una pérdida' },
      { w: 'oda', h: 'Poema que celebra algo o a alguien' },
      { w: 'tragedia', h: 'Teatro de conflicto serio y final desdichado' },
      { w: 'comedia', h: 'Teatro de tono alegre y final feliz' } ] },
    { game: 'emoji', title: 'Emojiadivina de géneros', time: 90, lives: 3, items: [
      { e: '🐸🎩🚶‍♂️', q: '¿Qué obra es?', o: ['El renacuajo paseador', 'María', 'Nocturno', 'La vorágine'], a: 0, x: 'La fábula en verso de Rafael Pombo: cuenta una historia, así que es narrativa.' },
      { e: '🎭😂🎉', q: '¿Qué subgénero dramático es?', o: ['Comedia', 'Tragedia', 'Elegía', 'Novela'], a: 0, x: 'Tono alegre y final feliz: comedia.' },
      { e: '🎭😭⚰️', q: '¿Qué subgénero dramático es?', o: ['Tragedia', 'Comedia', 'Oda', 'Cuento'], a: 0, x: 'Conflicto serio y final desdichado: tragedia.' },
      { e: '🦊🍇💡', q: '¿Qué subgénero narrativo es?', o: ['Fábula', 'Soneto', 'Comedia', 'Novela'], a: 0, x: 'Relato breve con animales que deja una moraleja.' },
      { e: '💔🕯️✍️', q: '¿Qué subgénero lírico es?', o: ['Elegía', 'Oda', 'Comedia', 'Fábula'], a: 0, x: 'La elegía lamenta una pérdida.' },
      { e: '🥳🌟✍️', q: '¿Qué subgénero lírico celebra algo o a alguien?', o: ['Oda', 'Elegía', 'Tragedia', 'Leyenda'], a: 0, x: 'La oda celebra.' },
      { e: '🎸🎶🗣️', q: '¿Qué estrofa popular breve se hace para cantar?', o: ['Copla', 'Novela', 'Acotación', 'Tragedia'], a: 0, x: 'La copla es breve, popular y cantada.' },
      { e: '📚📚📚⏳', q: '¿Qué subgénero narrativo es un relato largo?', o: ['Novela', 'Cuento', 'Copla', 'Oda'], a: 0, x: 'La novela, como María de Jorge Isaacs.' },
      { e: '🙋‍♀️💭❤️', q: '¿Quién habla en el género lírico?', o: ['El yo lírico', 'El narrador', 'Los personajes en diálogo', 'El director'], a: 0, x: 'En la lírica un yo expresa lo que siente.' },
      { e: '🗣️💬🎬', q: '¿Qué género se escribe en diálogos para ser representado?', o: ['Dramático', 'Lírico', 'Narrativo', 'Expositivo'], a: 0, x: 'El dramático no tiene narrador: los personajes hablan en escena.' } ] },
  ],

  // El narrador y el punto de vista
  g7u2l2: [
    { game: 'crucigrama', title: 'Crucigrama del narrador', time: 240, words: [
      { w: 'narrador', h: 'La voz que cuenta la historia' },
      { w: 'testigo', h: 'Narrador que cuenta lo que le pasó a otro' },
      { w: 'protagonista', h: 'Narrador que cuenta lo que le pasó a él' },
      { w: 'omnisciente', h: 'Narrador que lo sabe todo' },
      { w: 'autor', h: 'Persona real que escribe el libro' },
      { w: 'tercera', h: 'Persona de "él, ella, ellos"' },
      { w: 'primera', h: 'Persona de "yo, nosotros"' },
      { w: 'mohán', h: 'Dueño de los ríos en la leyenda del Tolima y el Huila' } ] },
    { game: 'blitz', title: '¿Quién narra?', time: 60, lives: 3, items: [
      { q: '"Me temblaban las manos: nunca había visto una barba tan larga salir del agua." ¿Qué narrador es?', o: ['Protagonista', 'Testigo', 'Omnisciente'], a: 0, e: 'Cuenta en primera persona lo que le pasó a él.' },
      { q: '"Desde la orilla, las lavanderas vimos cómo la canoa giraba sola; ninguna supo qué pasó adentro." ¿Qué narrador es?', o: ['Testigo', 'Protagonista', 'Omnisciente'], a: 0, e: 'Dice "vimos", pero cuenta lo que le pasó a otro y no lo sabe todo.' },
      { q: '"Mientras el pescador rezaba, el Mohán, bajo el agua, sonreía." ¿Qué narrador es?', o: ['Omnisciente', 'Testigo', 'Protagonista'], a: 0, e: 'Sabe lo que pasa y lo que sienten los dos personajes.' },
      { q: '"Ella remó hasta la orilla y pensó en su padre." ¿En qué persona está?', o: ['Tercera', 'Primera', 'Segunda'], a: 0, e: '"Ella" es tercera persona.' },
      { q: '"Tú remas hasta la orilla." ¿En qué persona está?', o: ['Segunda', 'Primera', 'Tercera'], a: 0, e: '"Tú" es segunda persona, poco usada para narrar.' },
      { q: '¿Quién es el narrador de un relato?', o: ['La voz que cuenta la historia', 'La persona que escribe el libro', 'El personaje más malo'], a: 0, e: 'El narrador es una voz inventada; el autor es la persona real.' },
      { q: 'El punto de vista es…', o: ['Desde dónde se mira la historia', 'El final del cuento', 'La portada del libro'], a: 0, e: 'Es el lugar desde el que el narrador cuenta.' },
      { q: '¿Qué narrador sabe lo que pasará después?', o: ['Omnisciente', 'Testigo', 'Protagonista'], a: 0, e: 'El omnisciente conoce el pasado, el presente y el futuro de la historia.' },
      { q: 'Si un vecino que solo vio la canoa cuenta la leyenda, ¿qué no puede saber?', o: ['Lo que pensaba el pescador', 'Que había una canoa', 'Que era de noche'], a: 0, e: 'El testigo solo conoce lo que presenció o le contaron.' } ] },
  ],

  // La literatura cuenta su época
  g7u2l3: [
    { game: 'rosco', title: 'El rosco de Pombo', time: 240, items: [
      { l: 'B', q: 'Empieza por B: movimiento de los años 60 y 70, con Cien años de soledad', a: 'boom' },
      { l: 'C', q: 'Empieza por C: momento histórico, sociedad e ideas que rodean una obra', a: 'contexto' },
      { l: 'D', q: 'Empieza por D: cargo con el que Pombo viajó a Nueva York', a: 'diplomático' },
      { l: 'E', q: 'Empieza por E: tiempo histórico en que se escribe una obra', a: 'época' },
      { l: 'G', q: 'Empieza por G: apellido de Gabriel, autor de Cien años de soledad', a: 'García', alt: ['garcia marquez', 'garcía márquez'] },
      { l: 'I', q: 'Empieza por I: apellido de Jorge, autor de la novela María', a: 'Isaacs' },
      { l: 'M', q: 'Empieza por M: enseñanza que dejan las fábulas de Pombo', a: 'moraleja' },
      { l: 'N', q: 'Empieza por N: ciudad donde Pombo publicó sus Cuentos pintados para niños', a: 'Nueva York', alt: ['nuevayork'] },
      { l: 'P', q: 'Empieza por P: apellido del poeta de "El renacuajo paseador"', a: 'Pombo' },
      { l: 'R', q: 'Empieza por R: movimiento que exaltó la emoción y la naturaleza', a: 'Romanticismo' },
      { l: 'S', q: 'Empieza por S: apellido de José Asunción, autor del "Nocturno"', a: 'Silva' },
      { l: 'T', q: 'Empieza por T: transporte de mulas que empezó a rodar en Bogotá en 1884', a: 'tranvía' },
      { l: 'V', q: 'Empieza por V: novela de la selva de José Eustasio Rivera', a: 'vorágine', alt: ['la vorágine'] },
      { l: 'X', q: 'Contiene la X: siglo de casi toda la obra de Pombo, en números romanos', a: 'XIX', alt: ['siglo xix'] } ] },
    { game: 'memory', title: 'Obra, autor y época', pairs: [
      ['María', 'Jorge Isaacs'], ['"Nocturno"', 'José Asunción Silva'], ['La vorágine', 'José Eustasio Rivera'], ['Cien años de soledad', 'García Márquez'],
      ['El renacuajo paseador', 'Rafael Pombo'], ['Romanticismo', 'Emoción y naturaleza'], ['Modernismo', 'La música del verso'], ['Moraleja', 'Enseñanza al final de la fábula'] ] },
  ],

  // Sujeto y predicado
  g7u3l1: [
    { game: 'corrector', title: 'Corrector de concordancia', time: 150, lives: 3, rounds: [
      { text: 'Los ciclistas que vienen de Suba {{llegan|llega}} tarde. Las familias del barrio {{recorren|recorre}} la ciclovía.', e: 'El verbo concuerda con el núcleo del sujeto (ciclistas, familias), no con la palabra más cercana.' },
      { text: 'El mecánico del parque {{infla|inflan}} las llantas gratis. Los vendedores de jugo {{madrugan|madruga}} y la vendedora de avena {{ofrece|ofrecen}} su bebida.', e: 'Mecánico y vendedora son singulares; vendedores es plural.' },
      { text: 'Cada domingo {{llegan|llega}} miles de familias. Por la Séptima {{bajan|baja}} los patinadores.', e: 'Aunque el sujeto vaya después del verbo, el verbo concuerda con él.' },
      { text: 'A mi primo le {{encantan|encanta}} las ciclovías. A mi hermana le {{gustan|gusta}} los patines, y a mí me {{gusta|gustan}} caminar.', e: 'Con gustar y encantar, el sujeto es lo que gusta: las ciclovías, los patines, caminar.' } ] },
    { game: 'hunter', title: 'Cazador de sujetos', time: 90, rounds: [
      { clue: 'Toca el sujeto de cada oración', text: '[[Mi hermana]] monta bicicleta. [[Los vendedores de jugo]] llegan temprano. En la esquina toca [[una banda de rock]].' },
      { clue: 'Toca el sujeto de cada oración', text: '[[La ciclovía]] abre a las siete. Por la Séptima bajan [[los patinadores]]. [[Mi perro]] corre detrás de todos.' },
      { clue: 'Toca solo el núcleo del sujeto', text: 'La [[vendedora]] de avena madruga. Los [[niños]] del barrio juegan fútbol. El [[mecánico]] del parque infla llantas.' },
      { clue: 'Toca el sujeto (ojo: puede ir al final)', text: 'Cada domingo llegan [[miles de familias]]. A mi primo le encanta [[la ciclovía]]. [[Nosotros]] preferimos caminar.' } ] },
  ],

  // Los conectores
  g7u3l2: [
    { game: 'puente', title: 'Puente de conectores', time: 90, lives: 3, items: [
      { a: 'El lote está lleno de basura', b: 'nadie lo limpia', o: ['porque', 'aunque', 'además'], k: 0, e: '"Porque" introduce la causa.' },
      { a: 'El barrio no tiene parque', b: 'los niños juegan en la calle', o: ['aunque', 'por eso', 'es decir'], k: 1, e: '"Por eso" introduce la consecuencia.' },
      { a: 'El presupuesto es limitado', b: 'un parque pequeño es posible', o: ['además', 'porque', 'sin embargo'], k: 2, e: '"Sin embargo" marca el contraste entre las dos ideas.' },
      { a: 'Queremos un parque', b: 'una biblioteca', o: ['y también', 'por lo tanto', 'aunque'], k: 0, e: '"Y también" suma una petición más.' },
      { a: 'Llovió toda la tarde', b: 'el partido se jugó', o: ['así que', 'pero', 'porque'], k: 1, e: '"Pero" opone lo esperado (suspender) a lo que pasó.' },
      { a: 'Estudiamos mucho', b: 'aprobamos el examen', o: ['por lo tanto', 'aunque', 'en cambio'], k: 0, e: '"Por lo tanto" presenta el resultado.' },
      { a: 'Mi hermano prefiere el fútbol', b: 'yo prefiero el baloncesto', o: ['en cambio', 'porque', 'por eso'], k: 0, e: '"En cambio" contrasta dos preferencias.' },
      { a: 'Salimos temprano', b: 'había trancón en la autopista', o: ['ya que', 'es decir', 'en cambio'], k: 0, e: '"Ya que" explica la causa.' },
      { a: 'Sumapaz es un páramo', b: 'un ecosistema de montaña frío y húmedo', o: ['es decir', 'aunque', 'por eso'], k: 0, e: '"Es decir" explica con otras palabras.' } ] },
    { game: 'sorter', title: 'Clasifica el conector', bins: ['Adición', 'Contraste', 'Causa', 'Consecuencia'], time: 60, items: [
      ['y', 0], ['además', 0], ['también', 0], ['incluso', 0],
      ['pero', 1], ['sin embargo', 1], ['aunque', 1], ['en cambio', 1], ['no obstante', 1], ['aun así', 1],
      ['porque', 2], ['ya que', 2], ['debido a que', 2], ['puesto que', 2],
      ['por eso', 3], ['por lo tanto', 3], ['así que', 3], ['en consecuencia', 3] ] },
  ],

  // La coma y el punto
  g7u3l3: [
    { game: 'catcher', title: 'Atrapa la buena puntuación', rule: 'Atrapa solo las oraciones bien puntuadas', time: 50, lives: 3,
      good: ['Laura, ven a comer.', 'Compré papa, yuca y plátano.', '¿Más jugo? No, gracias.', 'Bogotá, la capital, es fría.', 'Llegamos tarde. El bus se varó.', 'Mi hermana estudia en Medellín.', 'Niños, a la mesa.', 'Hoy hace sol. Mañana lloverá.'],
      bad: ['Mi hermana, estudia en Medellín.', 'Laura ven a comer.', 'Compré papa, yuca, y plátano.', 'Llegamos tarde, el bus se varó.', 'Los hinchas, llenaron el estadio.', 'Bogotá la capital, es fría.', 'Traigan cuaderno lápiz y regla.', '¿Más jugo? No gracias.'] },
    { game: 'crucigrama', title: 'Crucigrama de la puntuación', time: 240, words: [
      { w: 'coma', h: 'Signo que marca una pausa breve' },
      { w: 'punto', h: 'Signo que marca una pausa larga y cierra una oración' },
      { w: 'pausa', h: 'Silencio breve o largo al hablar' },
      { w: 'vocativo', h: 'Nombre de aquel a quien se le habla: "Laura, ven"' },
      { w: 'enumeración', h: 'Lista de elementos separados por comas' },
      { w: 'aparte', h: 'Punto y ___: cierra un párrafo' },
      { w: 'seguido', h: 'Punto y ___: separa oraciones del mismo párrafo' },
      { w: 'final', h: 'Punto que cierra todo el texto' } ] },
  ],
};

export const UNIT_GAMES_G7 = {
  g7u1: { game: 'blitz', title: 'Contrarreloj de textos con propósito', time: 90, lives: 3, quizFrom: 'unit', extraItems: [
    { q: '"Mezcle la harina con el agua y amase diez minutos." ¿Qué tipo de texto es?', o: ['Instructivo', 'Narrativo', 'Descriptivo', 'Argumentativo'], a: 0, e: 'Da órdenes paso a paso: es instructivo.' },
    { q: '"Esa tarde, la quebrada creció y se llevó el puente." ¿Qué tipo de texto es?', o: ['Narrativo', 'Expositivo', 'Instructivo', 'Argumentativo'], a: 0, e: 'Cuenta un hecho en el tiempo, con verbos en pasado.' },
    { q: '¿Qué parte de un texto expositivo resume o concluye?', o: ['El cierre', 'La introducción', 'El desarrollo', 'El título'], a: 0, e: 'El cierre concluye, a menudo con "por eso" o "en conclusión".' },
    { q: 'Si borras una idea secundaria de un párrafo, ¿qué pasa?', o: ['El párrafo conserva su sentido', 'El párrafo se queda sin centro', 'Cambia el tema'], a: 0, e: 'Solo la idea principal sostiene el párrafo.' },
    { q: '¿Cuál es una opinión?', o: ['El técnico debería renunciar', 'El partido terminó 2-1', 'Asistieron 40.000 personas', 'El gol llegó en el minuto 90'], a: 0, e: '"Debería" expresa lo que alguien piensa, no un dato comprobable.' },
    { q: 'Una foto vieja circula como si fuera de hoy. La noticia es…', o: ['Engañosa', 'Confiable', 'Falsa porque todo es inventado'], a: 0, e: 'El hecho existió, pero lo sacaron de su fecha.' },
    { q: '"Ganaremos el próximo Mundial" es…', o: ['Una predicción, no un hecho', 'Un hecho comprobado', 'Un texto instructivo'], a: 0, e: 'Todavía no se puede comprobar.' } ] },
  g7u2: { game: 'conecta', title: 'Une los géneros, las voces y las épocas', time: 150, pairs: [
    ['Narrativo', 'Alguien cuenta una historia'], ['Lírico', 'Un yo expresa lo que siente'], ['Dramático', 'Personajes que dialogan en escena'],
    ['Acotación', 'Gestos y escenario entre paréntesis'], ['Narrador protagonista', 'Cuenta lo que le pasó a él'], ['Narrador testigo', 'Cuenta lo que le pasó a otro'],
    ['Narrador omnisciente', 'Lo sabe todo, en tercera persona'], ['Rafael Pombo', 'Cuentos pintados para niños'], ['Contexto', 'La época que rodea una obra'],
    ['Romanticismo', 'Emoción y naturaleza, como María'] ] },
  g7u3: { game: 'rosco', title: 'El rosco de la oración clara', time: 240, items: [
    { l: 'A', q: 'Empieza por A: conector de adición que significa "también"', a: 'además' },
    { l: 'C', q: 'Empieza por C: signo que marca una pausa breve', a: 'coma' },
    { l: 'D', q: 'Empieza por D: "___ a que", conector de causa', a: 'debido' },
    { l: 'E', q: 'Empieza por E: lista de elementos separados por comas', a: 'enumeración' },
    { l: 'F', q: 'Empieza por F: punto que cierra todo el texto', a: 'final' },
    { l: 'G', q: 'Contiene la G: "sin ___", conector de contraste', a: 'embargo' },
    { l: 'N', q: 'Empieza por N: palabra más importante del sujeto o del predicado', a: 'núcleo' },
    { l: 'O', q: 'Empieza por O: unidad mínima con sentido completo', a: 'oración' },
    { l: 'P', q: 'Empieza por P: parte de la oración que dice algo del sujeto', a: 'predicado' },
    { l: 'Q', q: 'Contiene la Q: conector de causa que explica el porqué', a: 'porque', alt: ['ya que', 'puesto que'] },
    { l: 'S', q: 'Empieza por S: parte de la oración de quien se habla', a: 'sujeto' },
    { l: 'T', q: 'Empieza por T: sujeto que no está escrito, pero el verbo lo indica', a: 'tácito' },
    { l: 'V', q: 'Empieza por V: nombre de aquel a quien se le habla, separado con coma', a: 'vocativo' },
    { l: 'Y', q: 'Empieza por Y: conector de adición de una sola letra', a: 'y' } ] },
};
