// Minijuegos del grado 11°: dos por lección ("Juega") y el reto de cada unidad (formato en lib/SPEC.md).
export const LESSON_GAMES_G11 = {

  // Los clásicos y los temas universales
  g11u1l1: [
    { game: 'emoji', title: '¿Qué clásico es?', time: 90, lives: 3, items: [
      { e: '🗡️👑🩸', q: '¿Qué obra es?', o: ['Macbeth', 'La Odisea', 'María', 'Rayuela'], a: 0, x: 'Un noble asesina al rey Duncan para quedarse con la corona: el poder.' },
      { e: '💘👪⚔️👪', q: '¿Qué obra es?', o: ['Hamlet', 'Romeo y Julieta', 'Crimen y castigo', 'Edipo rey'], a: 1, x: 'Dos jóvenes se aman a pesar del odio entre sus familias.' },
      { e: '⛵🌊🏝️🏠', q: '¿Qué obra es?', o: ['La metamorfosis', 'Antígona', 'La Odisea', 'La vida es sueño'], a: 2, x: 'Homero cuenta el largo regreso de Ulises a casa.' },
      { e: '🧍➡️🪲😱', q: '¿Qué obra es?', o: ['La metamorfosis', 'Don Quijote', 'Poema de Gilgamesh', 'Macbeth'], a: 0, x: 'Gregorio Samsa amanece convertido en insecto y su familia lo rechaza.' },
      { e: '🔮🏃👑😵', q: '¿Qué obra es?', o: ['Romeo y Julieta', 'Hamlet', 'Edipo rey', 'María'], a: 2, x: 'Edipo huye de lo que anunció el oráculo y termina cumpliéndolo.' },
      { e: '🦸⚰️👬♾️', q: '¿Qué obra es?', o: ['Poema de Gilgamesh', 'La Odisea', 'Crimen y castigo', 'Antígona'], a: 0, x: 'El héroe busca la inmortalidad tras la muerte de su amigo Enkidu.' },
      { e: '⚰️👩⚖️👑', q: '¿Qué obra es?', o: ['Macbeth', 'Antígona', 'La vida es sueño', 'La metamorfosis'], a: 1, x: 'Antígona entierra a su hermano aunque el rey Creonte lo prohibió.' },
      { e: '🐎🛡️📚💭', q: '¿Qué obra es?', o: ['Hamlet', 'La Odisea', 'Don Quijote', 'Cien años de soledad'], a: 2, x: 'Un hidalgo sale a vivir sus ideales de caballero: el ideal frente a la realidad.' },
      { e: '🏘️👪🔁⏳', q: '¿Qué obra es?', o: ['María', 'Cien años de soledad', 'Edipo rey', 'Crimen y castigo'], a: 1, x: 'Los Buendía repiten nombres y errores como si estuvieran condenados.' },
      { e: '🪓😰⛓️', q: '¿Qué obra es?', o: ['Crimen y castigo', 'Romeo y Julieta', 'La metamorfosis', 'Antígona'], a: 0, x: 'Dostoievski cuenta la culpa que sigue a un crimen.' } ] },
    { game: 'truefalse', title: '¿Tema universal?', time: 60, lives: 3, items: [
      { s: 'El poder y sus abusos son un tema universal.', a: true, e: 'Aparece desde Sófocles y Shakespeare hasta El otoño del patriarca.' },
      { s: 'Un tema universal solo interesa a los lectores del país donde se escribió la obra.', a: false, e: 'Lo universal es justamente lo que comparten todas las culturas.' },
      { s: 'Antígona fue escrita por Sófocles.', a: true, e: 'Es una tragedia griega del siglo V a. C.' },
      { s: 'Macbeth es una novela de Cervantes.', a: false, e: 'Es una tragedia de William Shakespeare.' },
      { s: 'El amor imposible une a Romeo y Julieta con Efraín y María.', a: true, e: 'Shakespeare e Isaacs tratan el mismo tema universal en épocas distintas.' },
      { s: 'El precio del pasaje de bus es un tema universal.', a: false, e: 'Es un asunto local y pasajero, no una preocupación humana de todas las épocas.' },
      { s: 'El Poema de Gilgamesh es una de las obras literarias más antiguas que se conocen.', a: true, e: 'Proviene de Mesopotamia, hace unos cuatro mil años.' },
      { s: 'Un clásico deja de tener sentido cuando cambia la época.', a: false, e: 'Un clásico se relee desde cada presente y dice cosas nuevas.' },
      { s: 'En Edipo rey, el protagonista intenta escapar de su destino y termina cumpliéndolo.', a: true, e: 'Esa ironía trágica es el centro de la obra.' },
      { s: 'La muerte solo aparece como tema en la literatura antigua.', a: false, e: 'Está en Manrique, en Tolstói y en García Márquez, entre muchos otros.' } ] },
  ],

  // Vanguardias y siglo XX
  g11u1l2: [
    { game: 'sopa', title: 'Sopa de vanguardias', time: 180, words: [
      { w: 'futurismo', h: 'Amaba la velocidad y las máquinas' },
      { w: 'dadaísmo', h: 'Nació en el Cabaret Voltaire de Zúrich' },
      { w: 'Breton', h: 'Escribió el primer manifiesto del surrealismo' },
      { w: 'nadaísmo', h: 'Lo fundó Gonzalo Arango en Medellín' },
      { w: 'antiarte', h: 'Lo que proponía Dadá contra el arte serio' },
      { w: 'manifiesto', h: 'Texto con que nacía cada vanguardia' },
      { w: 'vanguardia', h: 'Movimiento que rompe con la tradición' },
      { w: 'boom', h: 'Auge de la novela latinoamericana' } ] },
    { game: 'order', title: 'Ordena el siglo XX', time: 90, rounds: [
      { prompt: 'Ordena las vanguardias de la más antigua a la más reciente', items: ['Futurismo', 'Dadaísmo', 'Surrealismo', 'Nadaísmo'], labels: ['1909', '1916', '1924', '1958'] },
      { prompt: 'Ordena estos hitos de la literatura colombiana', items: ['La vorágine, de José Eustasio Rivera', 'Revista Los Nuevos', 'Primer manifiesto nadaísta', 'Cien años de soledad', 'Nobel de Literatura a García Márquez'], labels: ['1924', '1925', '1958', '1967', '1982'] },
      { prompt: 'Ordena estas obras latinoamericanas del siglo XX', items: ['Veinte poemas de amor, de Neruda', 'Ficciones, de Borges', 'Pedro Páramo, de Rulfo', 'Rayuela, de Cortázar', 'Cien años de soledad, de García Márquez'], labels: ['1924', '1944', '1955', '1963', '1967'] } ] },
  ],

  // El lector que elige
  g11u1l3: [
    { game: 'crucigrama', title: 'Crucigrama del lector', time: 240, words: [
      { w: 'propósito', h: 'Lo que defines antes de leer: para qué lees' },
      { w: 'predecir', h: 'Adivinar de qué trata el libro por el título y la contraportada' },
      { w: 'subrayar', h: 'Marcar solo lo esencial mientras lees' },
      { w: 'releer', h: 'Volver a leer lo difícil' },
      { w: 'reseña', h: 'Texto corto que escribes después de leer' },
      { w: 'literal', h: 'Nivel de lectura: qué dice el texto' },
      { w: 'inferencial', h: 'Nivel de lectura: qué da a entender' },
      { w: 'crítico', h: 'Nivel de lectura: qué pienso yo y con qué razones' } ] },
    { game: 'catcher', title: 'Atrapa las buenas estrategias', rule: 'Atrapa solo las buenas estrategias de lectura; deja pasar las malas', time: 45, lives: 3,
      good: ['Definir para qué leo', 'Predecir por la contraportada', 'Subrayar solo lo esencial', 'Anotar preguntas al margen', 'Releer lo difícil', 'Decirlo con mis palabras', 'Resumir al terminar', 'Comentar en un club de lectura'],
      bad: ['Subrayar todo el texto', 'Leer con el celular sonando', 'Saltarme las palabras clave', 'Leer solo lo que dice el algoritmo', 'Nunca releer', 'Leer siempre el mismo género'] },
  ],

  // Tipos de argumentos
  g11u2l1: [
    { game: 'conecta', title: 'Une tipo y ejemplo', time: 120, pairs: [
      ['Autoridad', '"Según el IDEAM, El Niño reduce las lluvias"'], ['Causa', '"Como no llovió, bajaron los embalses"'],
      ['Analogía', '"El páramo es como una esponja"'], ['Datos', '"Chingaza aporta cerca del 70 % del agua"'],
      ['Ejemplo', '"En mi edificio reutilizamos el agua de la lavadora"'], ['Tesis', 'La idea que se defiende'],
      ['Argumento', 'Una razón que apoya la tesis'], ['Contraargumento', 'La razón del otro lado'],
      ['Refutación', 'La respuesta al contraargumento'] ] },
    { game: 'blitz', title: '¿Qué tipo de argumento?', time: 75, lives: 3, items: [
      { q: '"Como explica un neurólogo, el sueño consolida lo que aprendemos."', o: ['Autoridad', 'Analogía', 'Ejemplo', 'Datos'], a: 0, e: 'Su fuerza está en quién lo dice: un experto.' },
      { q: '"Si trasnochas, al otro día rindes menos."', o: ['Datos', 'Causa', 'Autoridad', 'Ejemplo'], a: 1, e: 'Muestra que un hecho produce otro.' },
      { q: '"Leer es al cerebro lo que el ejercicio es al cuerpo."', o: ['Causa', 'Datos', 'Analogía', 'Autoridad'], a: 2, e: 'Compara con un caso parecido.' },
      { q: '"El 45 % del curso usa el celular más de seis horas al día, según la encuesta."', o: ['Ejemplo', 'Autoridad', 'Causa', 'Datos'], a: 3, e: 'Su fuerza está en la cifra, aunque diga de dónde salió.' },
      { q: '"Mi vecina aprendió inglés con series subtituladas."', o: ['Ejemplo', 'Datos', 'Analogía', 'Autoridad'], a: 0, e: 'Es un caso concreto.' },
      { q: '"Como no hubo mantenimiento, el puente se deterioró."', o: ['Analogía', 'Causa', 'Ejemplo', 'Datos'], a: 1, e: 'Relación de causa y efecto.' },
      { q: '"El colegio es como un equipo: si uno no juega, pierden todos."', o: ['Datos', 'Autoridad', 'Analogía', 'Causa'], a: 2, e: 'Compara el colegio con un equipo.' },
      { q: 'Un famoso opina de salud sin pruebas. Su argumento pesa…', o: ['Mucho', 'Poco', 'Igual que un experto', 'Más que un dato'], a: 1, e: 'Fama no es saber: no es pertinente ni verificable.' },
      { q: 'Una analogía solo convence si…', o: ['Es muy larga', 'Los casos se parecen de verdad', 'La dice un famoso', 'Tiene una cifra'], a: 1, e: 'Si los casos no se parecen, la comparación se cae.' } ] },
  ],

  // Las falacias
  g11u2l2: [
    { game: 'duelo', title: 'Duelo de falacias', lives: 3, time: 90, items: [
      { s: 'No le creas a la personera sobre la cafetería: ni siquiera es buena en matemáticas.', ok: false, f: 'Ad hominem', e: 'Ataca a la persona, no a su propuesta.' },
      { s: 'O prohibimos los celulares o el colegio se volverá un caos.', ok: false, f: 'Falso dilema', e: 'Hay más opciones: reglas de uso, horarios, espacios.' },
      { s: 'A mi primo le dio fiebre después de vacunarse; las vacunas son peligrosas.', ok: false, f: 'Generalización apresurada', e: 'Un caso aislado no prueba una regla general.' },
      { s: 'Todo el mundo está compartiendo ese video; por algo será que es verdad.', ok: false, f: 'Apelación a la mayoría', e: 'Que muchos lo crean no lo vuelve cierto.' },
      { s: 'Desde que llegó el nuevo rector llueve más: él trae la mala suerte.', ok: false, f: 'Falsa causa', e: 'Que dos cosas coincidan no significa que una cause la otra.' },
      { s: 'Si permitimos una fiesta, pedirán una cada semana y nadie volverá a estudiar.', ok: false, f: 'Pendiente resbaladiza', e: 'Encadena consecuencias sin pruebas.' },
      { s: 'Los que piden ciclorrutas quieren prohibirle el carro a todo el mundo.', ok: false, f: 'Hombre de paja', e: 'Deforma la propuesta para atacarla más fácil.' },
      { s: '¿Ya dejaste de copiarte en los exámenes?', ok: false, f: 'Pregunta compleja', e: 'Cualquier respuesta acepta una acusación no probada.' },
      { s: 'Según el IDEAM, El Niño reduce las lluvias en la región andina; conviene ahorrar agua.', ok: true, e: 'Autoridad experta y pertinente: argumento válido.' },
      { s: 'Tras cambiar las llaves, el colegio redujo su consumo de agua en un 20 %; vale la pena hacerlo en todas las sedes.', ok: true, e: 'Se apoya en un dato medido y pertinente.' },
      { s: 'Piensa en los niños que llorarán si no apoyas mi propuesta.', ok: false, f: 'Apelación a la emoción', e: 'Busca conmover en lugar de dar razones.' } ] },
    { game: 'emoji', title: 'Falacias en emojis', time: 90, lives: 3, items: [
      { e: '🎯🧍🚫💡', q: '¿Qué falacia es?', o: ['Ad hominem', 'Falsa causa', 'Apelación a la mayoría', 'Falso dilema'], a: 0, x: 'Apunta a la persona, no a su idea.' },
      { e: '🌾🧍🥊', q: '¿Qué falacia es?', o: ['Pendiente resbaladiza', 'Hombre de paja', 'Pregunta compleja', 'Ad hominem'], a: 1, x: 'Arma un muñeco de paja con lo que el otro no dijo y le pega.' },
      { e: '🚪🚪🤷', q: '¿Qué falacia es?', o: ['Generalización apresurada', 'Apelación a la emoción', 'Falso dilema', 'Falsa causa'], a: 2, x: 'Solo muestra dos puertas cuando hay más.' },
      { e: '⛷️⬇️⬇️💥', q: '¿Qué falacia es?', o: ['Apelación a la autoridad', 'Hombre de paja', 'Ad hominem', 'Pendiente resbaladiza'], a: 3, x: 'Una cadena de desastres cuesta abajo, sin pruebas.' },
      { e: '👥👥👥👍✅', q: '¿Qué falacia es?', o: ['Apelación a la mayoría', 'Falso dilema', 'Pregunta compleja', 'Falsa causa'], a: 0, x: '"Todos lo creen, entonces es verdad."' },
      { e: '👕⚽😭', q: '¿Qué falacia es?', o: ['Ad hominem', 'Falsa causa', 'Generalización apresurada', 'Apelación a la mayoría'], a: 1, x: '"Desde que usas ese buzo perdemos los partidos."' },
      { e: '1️⃣🧍➡️👥👥👥', q: '¿Qué falacia es?', o: ['Pendiente resbaladiza', 'Hombre de paja', 'Generalización apresurada', 'Apelación a la emoción'], a: 2, x: 'De un solo caso saca una regla para todos.' },
      { e: '🎤⭐💊', q: '¿Qué falacia es?', o: ['Falsa causa', 'Falso dilema', 'Pregunta compleja', 'Apelación a la autoridad'], a: 3, x: 'Un cantante famoso opina de medicina: no es experto.' },
      { e: '😭🐶💔', q: '¿Qué falacia es?', o: ['Apelación a la emoción', 'Ad hominem', 'Apelación a la mayoría', 'Hombre de paja'], a: 0, x: 'Busca conmover en vez de dar razones.' },
      { e: '❓🔗😳', q: '¿Qué falacia es?', o: ['Generalización apresurada', 'Pregunta compleja', 'Pendiente resbaladiza', 'Apelación a la autoridad'], a: 1, x: '"¿Ya dejaste de copiarte?" da por probada la acusación.' } ] },
  ],

  // El ensayo argumentativo
  g11u2l3: [
    { game: 'puente', title: 'Conectores argumentativos', time: 90, lives: 3, items: [
      { a: 'La IA explica un tema de muchas formas distintas', b: 'sirve para repasar antes de un examen', o: ['por eso', 'aunque', 'en cambio'], k: 0, e: '"Por eso" introduce una consecuencia.' },
      { a: 'La IA ayuda a redactar', b: 'a veces inventa datos y fuentes', o: ['por lo tanto', 'sin embargo', 'es decir'], k: 1, e: '"Sin embargo" marca una oposición.' },
      { a: 'Copiar una respuesta de la IA no es aprender', b: 'el colegio debe enseñar a usarla con criterio', o: ['por ejemplo', 'no obstante', 'por lo tanto'], k: 2, e: '"Por lo tanto" presenta la conclusión que se deriva.' },
      { a: 'Hay programas que dicen detectar textos hechos con IA', b: 'fallan con frecuencia', o: ['pero', 'así que', 'además'], k: 0, e: '"Pero" contrapone las dos ideas.' },
      { a: 'La IA puede dar retroalimentación inmediata', b: 'ahorra tiempo en tareas repetitivas', o: ['sin embargo', 'además', 'en cambio'], k: 1, e: '"Además" suma un argumento en la misma dirección.' },
      { a: 'Muchos estudiantes no tienen internet en casa', b: 'no todos pueden usar la IA para sus tareas', o: ['aunque', 'por ejemplo', 'por consiguiente'], k: 2, e: '"Por consiguiente" introduce una consecuencia.' },
      { a: 'Las herramientas de IA tienen sesgos', b: 'pueden repetir estereotipos sobre algunas regiones', o: ['por ejemplo', 'sin embargo', 'en conclusión'], k: 0, e: '"Por ejemplo" ilustra la idea anterior con un caso.' },
      { a: 'Muchos temen que la IA reemplace al docente', b: 'ninguna máquina acompaña a un estudiante como un buen profesor', o: ['por lo tanto', 'no obstante', 'además'], k: 1, e: '"No obstante" introduce una refutación.' },
      { a: 'Prohibir la IA no evita que se use', b: 'es mejor enseñar reglas claras', o: ['aunque', 'por ejemplo', 'en consecuencia'], k: 2, e: '"En consecuencia" presenta la conclusión.' } ] },
    { game: 'corrector', title: 'Corrige el ensayo', time: 150, lives: 3, rounds: [
      { text: 'La IA ya está en el celular de cada estudiante. {{Por eso|Sin embargo}}, el colegio debe enseñar a usarla. {{Además|En cambio}}, la UNESCO (2023) recomienda formar criterio en lugar de prohibirla.', e: '"Por eso" marca consecuencia y "además" suma una razón en la misma dirección.' },
      { text: 'Hay quienes temen que la IA nos haga dejar de pensar. {{Sin embargo|Por lo tanto}}, eso depende de cómo se use. {{Por ejemplo|En conclusión}}, un profesor puede usarla para dar retroalimentación. {{En conclusión|En primer lugar}}, la escuela necesita reglas claras.', e: 'Oposición para refutar, ejemplo para ilustrar y cierre al final.' },
      { text: 'En APA, la cita lleva autor y {{año|página}}: (UNESCO, 2023). Las referencias van en orden {{alfabético|de importancia}} y el título del libro va en {{cursiva|mayúsculas}}.', e: 'Autor y año en el texto; referencias en orden alfabético y título en cursiva.' },
      { text: 'La tesis se presenta en la {{introducción|conclusión}}. El contraargumento suele ir {{antes|después}} de la conclusión. La conclusión {{retoma|copia}} la tesis sin repetirla palabra por palabra.', e: 'Tesis al inicio, contraargumento antes del cierre y conclusión que retoma sin copiar.' } ] },
  ],

  // Leer textos filosóficos
  g11u3l1: [
    { game: 'sorter', title: '¿Tesis, problema o ejemplo?', bins: ['Tesis', 'Problema', 'Ejemplo'], time: 60, items: [
      ['La libertad exige hacerse responsable de lo que uno elige', 0], ['Solo conocemos el mundo a través de sentidos que pueden engañarnos', 0], ['Desobedecer una ley injusta puede ser un deber moral', 0], ['Desear que todo sea fácil es renunciar a pensar', 0],
      ['¿Es la libertad hacer lo que uno quiera?', 1], ['¿Podemos conocer la realidad tal como es?', 1], ['¿Es justo obedecer una ley injusta?', 1], ['¿Por qué soñamos con una vida sin obstáculos?', 1],
      ['Un remo parece doblado dentro del agua aunque esté recto', 2], ['Antígona desobedece a Creonte para enterrar a su hermano', 2], ['Quien aprende a tocar guitarra no pide que desaparezcan las cuerdas', 2], ['El estudiante que copia evita el esfuerzo pero no aprende', 2] ] },
    { game: 'conecta', title: 'Filósofos y conceptos', time: 120, pairs: [
      ['Platón', 'La alegoría de la caverna'], ['Aristóteles', 'El ser humano es un animal político'],
      ['Descartes', '"Pienso, luego existo"'], ['Kant', '"¡Atrévete a saber!"'],
      ['Zuleta', 'Elogio de la dificultad'], ['Problema', 'La pregunta de fondo'],
      ['Tesis', 'La respuesta del autor'], ['Argumento', 'Razón general que apoya la tesis'],
      ['Ejemplo', 'Caso concreto que ilustra una idea'] ] },
  ],

  // Medios, poder y ciudadanía
  g11u3l2: [
    { game: 'detective', title: 'Detective de enfoques', cases: [
      { head: 'Unas 15.000 personas marcharon por la educación pública en Bogotá', src: 'Agencia de noticias', date: 'Jueves', text: 'La cifra es de la Secretaría de Gobierno; los organizadores hablan de 30.000. La marcha terminó sin heridos en la Plaza de Bolívar.', clues: [{ t: 'Dice de dónde sale la cifra', bad: false }, { t: 'Contrasta dos cifras distintas', bad: false }, { t: 'Usa un lenguaje neutro', bad: false }], a: 0, e: 'Da datos con fuente y muestra las dos versiones de la cifra.' },
      { head: '¡Vándalos secuestran la ciudad!', src: 'Portal de opinión', date: 'Jueves', text: 'Una marcha de estudiantes desvió las rutas de la Séptima durante dos horas.', clues: [{ t: 'El desvío de rutas sí ocurrió', bad: false }, { t: '"Secuestran" exagera lo que pasó', bad: true }, { t: 'No cita ninguna fuente', bad: true }], a: 1, e: 'Parte de un hecho real, pero lo deforma con palabras cargadas.' },
      { head: 'El Gobierno eliminará el examen Saber 11 desde el próximo año', src: 'Cadena de WhatsApp', date: 'Sin fecha', clues: [{ t: 'No hay enlace ni fuente', bad: true }, { t: 'El ICFES no dice nada en su sitio oficial', bad: true }, { t: 'Pide reenviar "antes de que lo borren"', bad: true }], a: 2, e: 'Ninguna fuente oficial lo respalda: es un invento.' },
      { head: 'Estudiantes llenan de color la Séptima en una jornada histórica', src: 'Medio universitario', date: 'Jueves', text: 'La nota solo entrevista a los organizadores y no da cifras.', clues: [{ t: 'Solo le da la voz a una parte', bad: true }, { t: '"Histórica" es una valoración', bad: true }, { t: 'La marcha sí ocurrió', bad: false }], a: 1, e: 'El hecho es real, pero el relato es parcial y valorativo.' },
      { head: 'Así se veía la marcha de ayer en Bogotá', src: 'Cuenta de X con muchos seguidores', date: 'Viernes', text: 'La foto muestra una plaza repleta.', clues: [{ t: 'La foto aparece en internet desde 2019', bad: true }, { t: 'No dice quién la tomó', bad: true }], a: 1, e: 'Es una foto real, pero sacada de contexto: se presenta como si fuera de otro día.' },
      { head: 'TransMilenio cerrará tres estaciones de la Séptima de 2:00 a 6:00 p. m.', src: 'Cuenta oficial de TransMilenio', date: 'Jueves', clues: [{ t: 'Cuenta oficial verificada', bad: false }, { t: 'Da horas y estaciones concretas', bad: false }], a: 0, e: 'Fuente oficial y datos precisos que se pueden comprobar.' },
      { head: 'Estudio demuestra que las marchas no sirven para nada', src: 'Blog anónimo', date: 'Sin fecha', clues: [{ t: 'No dice quién hizo el estudio', bad: true }, { t: 'El estudio no aparece en ninguna revista ni universidad', bad: true }, { t: 'Generaliza sobre todas las marchas', bad: true }], a: 2, e: 'El supuesto estudio no existe: la noticia es falsa.' },
      { head: 'Caos total: la ciudad colapsa por la marcha', src: 'Noticiero de televisión', date: 'Jueves', text: 'En el cuerpo de la nota se informa que la movilidad se afectó durante 40 minutos en dos calles.', clues: [{ t: 'El titular no coincide con el cuerpo', bad: true }, { t: 'El dato de 40 minutos es verificable', bad: false }], a: 1, e: 'El titular exagera lo que el mismo texto informa.' } ] },
    { game: 'hunter', title: 'Cazador en la noticia', time: 90, rounds: [
      { clue: 'Toca las palabras valorativas', text: 'Una multitud [[heroica]] llenó la Séptima en una jornada [[inolvidable]], mientras un grupo [[irresponsable]] bloqueaba el paso de los buses durante dos horas.' },
      { clue: 'Toca las fuentes que cita el texto', text: 'La cifra de 15.000 asistentes la dio [[la Secretaría de Gobierno]]. [[Los organizadores]] hablaron de 30.000 y [[un vocero de TransMilenio]] informó que tres estaciones estuvieron cerradas.' },
      { clue: 'Toca los datos verificables', text: 'Unas [[15.000 personas]] marcharon el [[jueves]] por la [[carrera Séptima]]. Fue una tarde hermosa y la marcha terminó a las [[5:00 p. m.]] en la [[Plaza de Bolívar]].' } ] },
  ],

  // Simulacro integrador
  g11u3l3: [
    { game: 'rosco', title: 'El rosco de Saber 11', time: 240, items: [
      { l: 'A', q: 'Empieza por A: quien escribe el texto y tiene una postura', a: 'autor' },
      { l: 'C', q: 'Empieza por C: nivel de lectura que evalúa la intención y la postura del autor', a: 'crítico' },
      { l: 'D', q: 'Empieza por D: información verificable que el texto dice directamente', a: 'dato' },
      { l: 'E', q: 'Empieza por E: lo que buscas en el texto para apoyar tu respuesta', a: 'evidencia' },
      { l: 'F', q: 'Contiene la F: texto discontinuo con gráficos, íconos y cifras', a: 'infografía' },
      { l: 'I', q: 'Empieza por I: nivel de lectura que comprende cómo se articulan las partes', a: 'inferencial' },
      { l: 'L', q: 'Empieza por L: nivel de lectura que identifica lo que dice el texto', a: 'literal' },
      { l: 'M', q: 'Empieza por M: las preguntas son de selección ___ con única respuesta', a: 'múltiple' },
      { l: 'N', q: 'Contiene la N: lo que se deduce de los datos ("todo indica que...")', a: 'conclusión' },
      { l: 'O', q: 'Empieza por O: valora los hechos, como "sería un error imperdonable"', a: 'opinión' },
      { l: 'P', q: 'Empieza por P: lo primero que conviene leer antes de volver al texto', a: 'pregunta' },
      { l: 'S', q: 'Empieza por S: prueba del ICFES que presentan los estudiantes de once', a: 'saber', alt: ['saber 11', 'saber once'] },
      { l: 'T', q: 'Empieza por T: texto discontinuo organizado en filas y columnas', a: 'tabla' },
      { l: 'U', q: 'Empieza por U: se leen junto al título y los encabezados antes de las cifras', a: 'unidades' },
      { l: 'V', q: 'Empieza por V: tipo de palabra que juzga, como "imperdonable"', a: 'valorativa' } ] },
    { game: 'catcher', title: 'Atrapa las opiniones', rule: 'Atrapa solo las opiniones; deja pasar los datos', time: 45, lives: 3,
      good: ['Sería un error imperdonable', 'Ningún gasto es tan valioso', 'Fue la marcha más bonita', 'Es el mejor libro del siglo', 'Esa biblioteca es una joya', 'Recortar es una vergüenza'],
      bad: ['En 2024 se prestaron 61.000 libros', 'En 2020 la biblioteca cerró siete meses', 'La marcha terminó a las 5:00 p. m.', 'Cada pregunta tiene cuatro opciones', 'En 2019 hubo 52.000 préstamos', 'La sala juvenil tiene tres clubes'] },
  ],
};

export const UNIT_GAMES_G11 = {
  g11u1: { game: 'memory', title: 'Parejas de la literatura y la lectura', pairs: [
    ['Antígona', 'Sófocles'], ['Hamlet', 'William Shakespeare'], ['Don Quijote de la Mancha', 'Miguel de Cervantes'], ['La metamorfosis', 'Franz Kafka'],
    ['Futurismo', 'Marinetti, 1909'], ['Surrealismo', 'André Breton, 1924'], ['Nadaísmo', 'Gonzalo Arango, 1958'],
    ['Plan lector', 'Lecturas con propósito, tiempos y lugares'], ['Nivel inferencial', 'Lo que el texto da a entender'] ] },
  g11u2: { game: 'rosco', title: 'El rosco de la argumentación', time: 240, items: [
    { l: 'A', q: 'Empieza por A: argumento que compara con un caso parecido', a: 'analogía' },
    { l: 'C', q: 'Empieza por C: la mejor razón del otro lado', a: 'contraargumento' },
    { l: 'D', q: 'Empieza por D: argumento que usa cifras verificables', a: 'datos' },
    { l: 'E', q: 'Empieza por E: argumento que presenta un caso concreto', a: 'ejemplo' },
    { l: 'F', q: 'Empieza por F: razonamiento que parece válido pero no lo es', a: 'falacia' },
    { l: 'G', q: 'Empieza por G: ___ apresurada, sacar una regla de uno o dos casos', a: 'generalización' },
    { l: 'H', q: 'Empieza por H: ___ de paja, deformar lo que dijo el otro', a: 'hombre' },
    { l: 'I', q: 'Empieza por I: parte del ensayo donde se presenta la tesis', a: 'introducción' },
    { l: 'M', q: 'Empieza por M: apelación a la ___, creer algo porque muchos lo creen', a: 'mayoría' },
    { l: 'O', q: 'Empieza por O: conector de oposición: "no ___"', a: 'obstante' },
    { l: 'P', q: 'Empieza por P: ___ resbaladiza, una cadena de desastres sin pruebas', a: 'pendiente' },
    { l: 'R', q: 'Empieza por R: la respuesta al contraargumento', a: 'refutación' },
    { l: 'T', q: 'Empieza por T: la idea que defiende un ensayo', a: 'tesis' },
    { l: 'U', q: 'Contiene la U: parte final del ensayo que retoma la tesis', a: 'conclusión' } ] },
  g11u3: { game: 'blitz', title: 'Simulacro contrarreloj', time: 120, lives: 3, quizFrom: 'unit', extraItems: [
    { q: 'La competencia "reflexionar a partir de un texto y evaluar su contenido" corresponde al nivel…', o: ['Literal', 'Inferencial', 'Crítico', 'Ortográfico'], a: 2, e: 'Evaluar el contenido y la postura es el nivel crítico.' },
    { q: '"Desear que todo sea fácil es desear dejar de pensar." En el texto de Zuleta, esta idea es…', o: ['El problema', 'La tesis', 'Un ejemplo', 'Un dato'], a: 1, e: 'Es la postura que el autor defiende.' },
    { q: 'Un medio llama "marea valiente" a los manifestantes. Esa expresión es…', o: ['Un dato verificable', 'Una valoración', 'Una fuente', 'Una cifra oficial'], a: 1, e: 'Es lenguaje cargado que juzga el hecho.' },
    { q: 'En una tabla, 2019: 52.000 y 2024: 61.000. ¿Cuánto aumentaron los préstamos?', o: ['9.000', '11.000', '19.000', '52.000'], a: 0, e: '61.000 − 52.000 = 9.000.' },
    { q: 'Un cómic es un texto…', o: ['Continuo', 'Discontinuo', 'Filosófico', 'Argumentativo'], a: 1, e: 'Combina viñetas, imágenes y texto.' },
    { q: 'La opción que "dice algo distinto de lo que dice el texto" se debe…', o: ['Elegir', 'Descartar', 'Marcar dos veces', 'Dejar para el final'], a: 1, e: 'Toda respuesta debe tener evidencia en el texto.' },
    { q: 'Para contrastar una noticia sobre una marcha lo mejor es…', o: ['Leer un solo medio', 'Comparar varios medios y fuentes oficiales', 'Ver solo los comentarios', 'Confiar en el titular'], a: 1, e: 'El contraste reduce el sesgo de un solo enfoque.' },
    { q: '"Pienso, luego existo" es de…', o: ['Platón', 'Descartes', 'Kant', 'Zuleta'], a: 1, e: 'René Descartes, Discurso del método (1637).' },
    { q: 'Una cadena que pide reenviar "antes de que lo borren", sin fuente ni fecha, es…', o: ['Confiable', 'Engañosa', 'Falsa', 'Oficial'], a: 2, e: 'Es un invento: no tiene fuente ni fecha.' } ] },
};
