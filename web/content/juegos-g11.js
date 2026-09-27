// Minijuegos del grado 11°: dos por lección ("Juega") y el reto de cada unidad (formato en lib/SPEC.md).
export const LESSON_GAMES_G11 = {

  // Los clásicos y los temas universales
  g11u1l1: [
    { game: 'memory', title: 'Obra y tema', pairs: [
      ['Antígona', 'La ley frente a la conciencia'], ['Edipo rey', 'El destino inevitable'], ['Macbeth', 'La ambición de poder'], ['Romeo y Julieta', 'El amor contra el odio'],
      ['Poema de Gilgamesh', 'La muerte y la inmortalidad'], ['La vida es sueño', 'Libertad frente al destino'], ['Don Quijote', 'El ideal frente a la realidad'], ['La metamorfosis', 'El rechazo y la deshumanización'] ] },
    { game: 'truefalse', title: '¿Tema universal?', time: 60, lives: 3, items: [
      { s: 'El poder y sus abusos son un tema universal.', a: true, e: 'Aparece desde Sófocles y Shakespeare hasta El otoño del patriarca.' },
      { s: 'Un tema universal solo interesa a los lectores del país donde se escribió la obra.', a: false, e: 'Lo universal es justamente lo que comparten todas las culturas.' },
      { s: 'Antígona fue escrita por Sófocles.', a: true, e: 'Es una tragedia griega del siglo V a. C.' },
      { s: 'Macbeth es una novela de Cervantes.', a: false, e: 'Es una tragedia de William Shakespeare.' },
      { s: 'El amor imposible une a Romeo y Julieta con Efraín y María.', a: true, e: 'Shakespeare e Isaacs tratan el mismo tema universal en épocas distintas.' },
      { s: 'El precio del pasaje de bus en 2025 es un tema universal.', a: false, e: 'Es un asunto local y pasajero, no una preocupación humana de todas las épocas.' },
      { s: 'El Poema de Gilgamesh es una de las obras literarias más antiguas que se conocen.', a: true, e: 'Proviene de Mesopotamia, hace unos cuatro mil años.' },
      { s: 'Un clásico deja de tener sentido cuando cambia la época.', a: false, e: 'Un clásico se relee desde cada presente y dice cosas nuevas.' },
      { s: 'En Edipo rey, el protagonista intenta escapar de su destino y termina cumpliéndolo.', a: true, e: 'Esa ironía trágica es el centro de la obra.' },
      { s: 'La muerte solo aparece como tema en la literatura antigua.', a: false, e: 'Está en Manrique, en Tolstói y en García Márquez, entre muchos otros.' } ] },
  ],

  // Vanguardias y siglo XX
  g11u1l2: [
    { game: 'sorter', title: '¿Qué vanguardia es?', bins: ['Futurismo', 'Dadaísmo', 'Surrealismo', 'Nadaísmo'], time: 60, items: [
      ['Elogio de la velocidad y las máquinas', 0], ['Filippo Tommaso Marinetti', 0], ['Un automóvil de carreras es más bello que una estatua griega', 0], ['Palabras en libertad', 0],
      ['Poema hecho con recortes de periódico sacados de una bolsa', 1], ['Cabaret Voltaire, Zúrich', 1], ['Tristan Tzara', 1], ['Antiarte y absurdo contra la guerra', 1],
      ['Escritura automática', 2], ['André Breton', 2], ['El sueño y el inconsciente', 2], ['El juego del cadáver exquisito', 2],
      ['Gonzalo Arango', 3], ['Medellín, 1958', 3], ['Jotamario Arbeláez', 3], ['Provocar a la sociedad conservadora colombiana', 3] ] },
    { game: 'order', title: 'Ordena el siglo XX', time: 90, rounds: [
      { prompt: 'Ordena las vanguardias de la más antigua a la más reciente', items: ['Futurismo', 'Dadaísmo', 'Surrealismo', 'Nadaísmo'], labels: ['1909', '1916', '1924', '1958'] },
      { prompt: 'Ordena estos hitos de la literatura colombiana', items: ['La vorágine, de José Eustasio Rivera', 'Revista Los Nuevos', 'Primer manifiesto nadaísta', 'Cien años de soledad', 'Nobel de Literatura a García Márquez'], labels: ['1924', '1925', '1958', '1967', '1982'] },
      { prompt: 'Ordena estas obras latinoamericanas del siglo XX', items: ['Veinte poemas de amor, de Neruda', 'Ficciones, de Borges', 'Pedro Páramo, de Rulfo', 'Rayuela, de Cortázar', 'Cien años de soledad, de García Márquez'], labels: ['1924', '1944', '1955', '1963', '1967'] } ] },
  ],

  // El lector que elige
  g11u1l3: [
    { game: 'truefalse', title: '¿Buena estrategia de lectura?', time: 60, lives: 3, items: [
      { s: 'Definir para qué voy a leer antes de empezar.', a: true, e: 'El propósito orienta la atención y la estrategia.' },
      { s: 'Subrayar todo el texto para no perder nada.', a: false, e: 'Si todo está subrayado, nada se destaca: hay que seleccionar.' },
      { s: 'Releer el párrafo que no entendí.', a: true, e: 'Releer es una estrategia de control de la comprensión.' },
      { s: 'Saltarme las palabras desconocidas y nunca buscarlas.', a: false, e: 'Conviene deducirlas por el contexto o buscarlas cuando son clave.' },
      { s: 'Hacerme preguntas mientras leo.', a: true, e: 'Preguntar mantiene activa la lectura.' },
      { s: 'Leer siempre el mismo tipo de libro.', a: false, e: 'Variar géneros amplía el vocabulario y la mirada.' },
      { s: 'Resumir con mis palabras al terminar.', a: true, e: 'Resumir muestra si entendí lo esencial.' },
      { s: 'Leer con el celular sonando cada minuto.', a: false, e: 'Las interrupciones rompen la concentración.' },
      { s: 'Predecir de qué trata un libro por el título y la contraportada.', a: true, e: 'Predecir activa lo que ya sé y crea expectativas.' },
      { s: 'Conversar sobre el libro en un club de lectura.', a: true, e: 'Compartir la lectura profundiza la interpretación.' } ] },
    { game: 'blitz', title: 'Estrategias de lectura', time: 60, lives: 3, items: [
      { q: 'Hojear un libro antes de leerlo es una estrategia…', o: ['Antes de leer', 'Durante la lectura', 'Después de leer', 'Inútil'], a: 0, e: 'Es una prelectura.' },
      { q: 'Anotar preguntas al margen ocurre…', o: ['Antes de leer', 'Durante la lectura', 'Después de leer', 'Nunca'], a: 1, e: 'Se hace mientras se lee.' },
      { q: 'Escribir una reseña es una estrategia…', o: ['Antes de leer', 'Durante la lectura', 'Después de leer', 'De prelectura'], a: 2, e: 'Se hace al terminar el texto.' },
      { q: '"¿Qué dice el texto?" corresponde al nivel…', o: ['Literal', 'Inferencial', 'Crítico', 'Creativo'], a: 0, e: 'El nivel literal recupera lo que está escrito.' },
      { q: '"¿Qué da a entender el autor?" corresponde al nivel…', o: ['Literal', 'Inferencial', 'Crítico', 'Visual'], a: 1, e: 'Inferir es deducir lo que no está dicho de forma directa.' },
      { q: '"¿Estoy de acuerdo y por qué?" corresponde al nivel…', o: ['Literal', 'Inferencial', 'Crítico', 'Fonético'], a: 2, e: 'El nivel crítico valora el texto con razones.' },
      { q: '¿Qué es un plan lector?', o: ['Una lista de lecturas con propósito, tiempos y lugares', 'Un examen de lectura', 'Un resumen de un libro', 'Un club obligatorio'], a: 0, e: 'Organiza qué leer, para qué y cuándo.' },
      { q: 'BibloRed es…', o: ['Una editorial', 'La red de bibliotecas públicas de Bogotá', 'Una librería en línea', 'Un premio literario'], a: 1, e: 'Presta libros gratis y ofrece clubes de lectura.' },
      { q: 'Si no entiendo un párrafo, lo mejor es…', o: ['Abandonar el libro', 'Releerlo y buscar las palabras clave', 'Saltarme el capítulo', 'Leer más rápido'], a: 1, e: 'Releer y aclarar el vocabulario resuelve la mayoría de dudas.' } ] },
  ],

  // Tipos de argumentos
  g11u2l1: [
    { game: 'sorter', title: 'Clasifica el argumento', bins: ['Autoridad', 'Causa', 'Analogía', 'Datos', 'Ejemplo'], time: 75, items: [
      ['Según la Organización Mundial de la Salud, fumar causa cáncer de pulmón', 0], ['Como explica un neurólogo, el sueño consolida lo que aprendemos', 0],
      ['Si trasnochas, al otro día rindes menos', 1], ['Como no hubo mantenimiento, el puente se deterioró', 1],
      ['El colegio es como un equipo: si uno no juega, pierden todos', 2], ['Leer es al cerebro lo que el ejercicio es al cuerpo', 2],
      ['El 45 % de los estudiantes del curso usa el celular más de seis horas al día, según la encuesta', 3], ['La biblioteca pasó de 9.000 a 61.000 préstamos en cuatro años', 3],
      ['Mi vecina aprendió inglés con series subtituladas', 4], ['El año pasado, el curso que hizo huerta escolar mejoró en ciencias', 4] ] },
    { game: 'memory', title: 'Tipo y ejemplo', pairs: [
      ['Autoridad', '"Según el IDEAM…"'], ['Datos', '"El 70 % del agua viene de Chingaza"'], ['Causa', '"Sin lluvias, bajan los embalses"'], ['Analogía', '"El páramo es como una esponja"'],
      ['Ejemplo', '"En mi casa reutilizamos el agua"'], ['Tesis', 'La idea que se defiende'], ['Contraargumento', 'La razón del otro lado'], ['Refutación', 'La respuesta al contraargumento'] ] },
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
    { game: 'catcher', title: 'Atrapa las falacias', rule: 'Atrapa solo las falacias; deja pasar los argumentos válidos', time: 45, lives: 3,
      good: ['Ni lo escuches: es un niño', 'O estás conmigo o contra mí', 'Todos lo dicen, debe ser cierto', 'Un gamer faltó: los gamers son vagos', 'Si cedemos en esto, lo perderemos todo', 'Mi rival quiere acabar con la diversión', 'Un cantante famoso dice que ese té cura el cáncer', 'Desde que usas ese buzo perdemos los partidos'],
      bad: ['Según la OMS, fumar causa cáncer de pulmón', 'La encuesta a 500 estudiantes muestra que prefieren almuerzo caliente', 'Como llovió toda la noche, la cancha está encharcada', 'El informe técnico dice que el puente falló por falta de mantenimiento', 'El manual de convivencia prohíbe esa sanción', 'La biblioteca abre hasta las 8: hay tiempo de estudiar'] },
  ],

  // El ensayo argumentativo
  g11u2l3: [
    { game: 'order', title: 'Ordena el ensayo', time: 90, rounds: [
      { prompt: 'Ordena las partes de un ensayo argumentativo', items: ['Introducción con la tesis', 'Primer argumento', 'Segundo argumento', 'Tercer argumento', 'Contraargumento y refutación', 'Conclusión', 'Referencias'] },
      { prompt: 'Ordena los párrafos del ensayo sobre la IA en el colegio', items: ['La IA ya está en el celular de cada estudiante: este ensayo sostiene que el colegio debe enseñar a usarla.', 'En primer lugar, prohibirla no evita que se use; solo la esconde.', 'Además, la UNESCO (2023) recomienda formar criterio en lugar de vetarla.', 'Sin embargo, hay quienes temen que nos haga dejar de pensar; no obstante, eso depende de cómo se use.', 'En conclusión, la escuela necesita reglas claras, no prohibiciones.'] },
      { prompt: 'Ordena los elementos de una referencia en formato APA', items: ['Apellido, Inicial.', '(Año).', 'Título de la obra en cursiva.', 'Editorial.'] },
      { prompt: 'Ordena el razonamiento de un párrafo argumentativo', items: ['Idea principal del párrafo', 'Argumento que la sostiene', 'Evidencia o cita', 'Cierre que la conecta con la tesis'] } ] },
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
  ],

  // Leer textos filosóficos
  g11u3l1: [
    { game: 'blitz', title: 'Contrarreloj filosófico', time: 60, lives: 3, items: [
      { q: 'La pregunta de fondo que mueve un texto filosófico es…', o: ['La tesis', 'El problema', 'El ejemplo', 'La conclusión'], a: 1, e: 'El problema es la pregunta; la tesis, la respuesta.' },
      { q: '"Pienso, luego existo" es de…', o: ['Platón', 'Descartes', 'Kant', 'Zuleta'], a: 1, e: 'René Descartes, en el Discurso del método (1637).' },
      { q: 'La alegoría de la caverna aparece en La República, de…', o: ['Aristóteles', 'Sócrates', 'Platón', 'Nietzsche'], a: 2, e: 'Platón la usa para explicar el paso de la ignorancia al conocimiento.' },
      { q: '"¡Atrévete a saber!" fue el lema de la Ilustración según…', o: ['Kant', 'Descartes', 'Rousseau', 'Hegel'], a: 0, e: 'Kant lo propone en "¿Qué es la Ilustración?" (1784).' },
      { q: 'Estanislao Zuleta nació en…', o: ['Bogotá', 'Cali', 'Medellín', 'Cartagena'], a: 2, e: 'Nació en Medellín en 1935.' },
      { q: 'En "Elogio de la dificultad", Zuleta critica…', o: ['El deseo de una vida sin obstáculos', 'La lectura de novelas', 'El trabajo en equipo', 'La educación pública'], a: 0, e: 'Sostiene que desear la facilidad es renunciar a pensar.' },
      { q: '"Pero en realidad…" suele anunciar…', o: ['Un ejemplo', 'La postura del autor', 'Un dato numérico', 'El título'], a: 1, e: 'Los marcadores de contraste suelen introducir la tesis.' },
      { q: 'Aristóteles definió al ser humano como un…', o: ['Animal político', 'Lobo para el hombre', 'Junco pensante', 'Ser para la muerte'], a: 0, e: 'Lo afirma en la Política: vivimos en comunidad.' },
      { q: 'Un ejemplo en un texto filosófico sirve para…', o: ['Plantear el problema', 'Ilustrar y apoyar la tesis', 'Reemplazar la tesis', 'Distraer al lector'], a: 1, e: 'Hace concreta una idea abstracta.' } ] },
    { game: 'sorter', title: '¿Tesis, problema o ejemplo?', bins: ['Tesis', 'Problema', 'Ejemplo'], time: 60, items: [
      ['La libertad exige hacerse responsable de lo que uno elige', 0], ['Solo conocemos el mundo a través de sentidos que pueden engañarnos', 0], ['Desobedecer una ley injusta puede ser un deber moral', 0], ['Una vida sin examen no merece ser vivida', 0],
      ['¿Es la libertad hacer lo que uno quiera?', 1], ['¿Podemos conocer la realidad tal como es?', 1], ['¿Es justo obedecer una ley injusta?', 1], ['¿Qué hace que una vida valga la pena?', 1],
      ['Un remo parece doblado dentro del agua aunque esté recto', 2], ['Antígona desobedece a Creonte para enterrar a su hermano', 2], ['Quien pasa el día viendo series también está eligiendo', 2], ['El estudiante que copia evita el esfuerzo pero no aprende', 2] ] },
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
    { game: 'truefalse', title: '¿Informa o manipula?', time: 60, lives: 3, items: [
      { s: 'Usar "vándalos" para referirse a todos los manifestantes es neutral.', a: false, e: 'Es una palabra valorativa que generaliza.' },
      { s: 'Citar fuentes de las dos partes ayuda a informar con equilibrio.', a: true, e: 'Da la voz a distintas miradas del hecho.' },
      { s: 'Una foto real puede usarse para engañar si se saca de contexto.', a: true, e: 'Una imagen de otro lugar o fecha cambia el sentido de la noticia.' },
      { s: 'Si un titular exagera, pero el texto es correcto, no hay ningún problema.', a: false, e: 'Mucha gente solo lee el titular: la exageración desinforma.' },
      { s: 'Dar una cifra con su fuente permite verificar la información.', a: true, e: 'Se puede contrastar con otras fuentes.' },
      { s: 'Omitir un dato importante también es una forma de sesgo.', a: true, e: 'Lo que se calla también construye el enfoque.' },
      { s: 'Un medio de opinión y un medio informativo cumplen la misma función.', a: false, e: 'La opinión valora; la información presenta hechos verificables.' },
      { s: 'Saber quién es el dueño de un medio ayuda a leerlo críticamente.', a: true, e: 'Los intereses del dueño pueden influir en el enfoque.' },
      { s: 'Si muchas cuentas comparten una noticia, ya está verificada.', a: false, e: 'La viralidad no es verificación.' },
      { s: 'Comparar tres medios sobre el mismo hecho ayuda a acercarse a lo que pasó.', a: true, e: 'El contraste revela datos comunes y sesgos de cada uno.' } ] },
  ],

  // Simulacro integrador
  g11u3l3: [
    { game: 'blitz', title: 'Simulacro contrarreloj', time: 90, lives: 3, items: [
      { q: '¿Cuántas opciones tiene cada pregunta de Lectura Crítica en Saber 11?', o: ['Tres', 'Cuatro', 'Cinco', 'Seis'], a: 1, e: 'Cuatro opciones (A, B, C y D), una sola correcta.' },
      { q: 'Una infografía es un texto…', o: ['Continuo', 'Discontinuo', 'Narrativo', 'Lírico'], a: 1, e: 'Organiza la información en gráficos, íconos y cifras.' },
      { q: '"Según el texto, ¿en qué año…?" es una pregunta de nivel…', o: ['Literal', 'Inferencial', 'Crítico', 'Creativo'], a: 0, e: 'Pide recuperar un dato explícito.' },
      { q: '"¿Qué función cumple el segundo párrafo?" evalúa…', o: ['Identificar un dato', 'Comprender cómo se articulan las partes', 'La ortografía', 'La opinión del lector'], a: 1, e: 'Pregunta por la relación entre las partes del texto.' },
      { q: '"¿Cuál es la intención del autor al usar la palabra imperdonable?" es de nivel…', o: ['Literal', 'Inferencial', 'Crítico', 'Gramatical'], a: 2, e: 'Evalúa la postura y los recursos del autor.' },
      { q: 'Una opción que dice más de lo que dice el texto es…', o: ['La correcta', 'Una trampa que hay que descartar', 'Siempre la más larga', 'Una inferencia válida'], a: 1, e: 'Las opciones que exageran o generalizan suelen ser incorrectas.' },
      { q: 'Antes de responder sobre una tabla, lo primero es leer…', o: ['Solo la última fila', 'El título, los encabezados y las unidades', 'La pregunta siguiente', 'Nada, se adivina'], a: 1, e: 'Sin el título y las unidades se malinterpretan las cifras.' },
      { q: '"Los préstamos subieron de 52.000 a 61.000." Esto es…', o: ['Un dato', 'Una opinión', 'Una hipótesis', 'Una falacia'], a: 0, e: 'Es una información verificable en la tabla.' },
      { q: 'La mejor evidencia para una respuesta está…', o: ['En lo que yo opino', 'En el texto', 'En la opción más larga', 'En el título de la prueba'], a: 1, e: 'Toda respuesta debe apoyarse en el texto.' } ] },
    { game: 'hunter', title: 'Cazador de evidencias', time: 90, rounds: [
      { clue: 'Toca las cifras de préstamos de libros', text: 'En 2020 la biblioteca cerró siete meses y prestó [[9.000]] libros. En 2024 prestó [[61.000]], más que los [[52.000]] de 2019. Muchos creen que ya nadie lee, pero las cifras dicen otra cosa.' },
      { clue: 'Toca las palabras valorativas', text: 'Una [[multitud]] [[heroica]] llenó la Séptima en una jornada [[inolvidable]], mientras un grupo [[irresponsable]] bloqueaba el paso de los buses.' },
      { clue: 'Toca las fuentes que cita el texto', text: 'La cifra de 15.000 asistentes la dio [[la Secretaría de Gobierno]]. [[Los organizadores]] hablaron de 30.000 y [[un vocero de TransMilenio]] informó que tres estaciones estuvieron cerradas.' },
      { clue: 'Toca los conectores que anuncian la tesis o la conclusión', text: 'Muchos sueñan con una vida sin esfuerzo. [[Pero]] lo fácil no nos hace crecer. [[Por eso]] conviene aprender a amar la dificultad y, [[en conclusión]], elegir los retos que nos transforman.' } ] },
  ],
};

export const UNIT_GAMES_G11 = {
  g11u1: { game: 'memory', title: 'Parejas de la literatura universal', pairs: [
    ['Antígona', 'Sófocles'], ['Hamlet', 'William Shakespeare'], ['Don Quijote de la Mancha', 'Miguel de Cervantes'], ['La metamorfosis', 'Franz Kafka'],
    ['Crimen y castigo', 'Fiódor Dostoievski'], ['La Odisea', 'Homero'], ['Cien años de soledad', 'Gabriel García Márquez'], ['Manifiesto del surrealismo', 'André Breton'],
    ['La vorágine', 'José Eustasio Rivera'] ] },
  g11u2: { game: 'duelo', title: 'Duelo final de argumentos', lives: 3, time: 120, items: [
    { s: 'Ese científico es ateo, así que su estudio sobre el clima no vale nada.', ok: false, f: 'Ad hominem', e: 'Descalifica a la persona, no al estudio.' },
    { s: 'O apoyas el paro o estás a favor de la corrupción.', ok: false, f: 'Falso dilema', e: 'Se puede rechazar la corrupción sin apoyar el paro.' },
    { s: 'Conocí a dos bogotanos groseros: los rolos son maleducados.', ok: false, f: 'Generalización apresurada', e: 'Dos casos no representan a millones de personas.' },
    { s: 'Millones de personas ven ese reality, así que debe ser un buen programa.', ok: false, f: 'Apelación a la mayoría', e: 'La popularidad no prueba la calidad.' },
    { s: 'Me puse la camiseta de la suerte y ganó Millonarios: la camiseta funciona.', ok: false, f: 'Falsa causa', e: 'La coincidencia no es causa.' },
    { s: 'Si legalizan las patinetas eléctricas, luego legalizarán las motos en los andenes y habrá muertos cada día.', ok: false, f: 'Pendiente resbaladiza', e: 'Supone una cadena de consecuencias sin pruebas.' },
    { s: 'Quienes defienden la jornada única quieren tener a los niños encerrados todo el día.', ok: false, f: 'Hombre de paja', e: 'Caricaturiza la postura contraria.' },
    { s: 'Un futbolista famoso dice que ese banco es el más seguro del país.', ok: false, f: 'Apelación a la autoridad', e: 'Un futbolista no es autoridad en finanzas.' },
    { s: 'Si no donas hoy, esos perritos pasarán la noche solos y con frío.', ok: false, f: 'Apelación a la emoción', e: 'Conmueve en vez de argumentar.' },
    { s: 'Según el Ministerio de Salud, la vacuna redujo las hospitalizaciones; vacunarse es una decisión sensata.', ok: true, e: 'Autoridad pertinente con evidencia.' },
    { s: 'Tres encuestas independientes muestran que los estudiantes duermen menos de siete horas; conviene revisar la hora de entrada.', ok: true, e: 'Datos de varias fuentes que apoyan la conclusión.' },
    { s: 'Como el río bajó su caudal por la sequía, el acueducto pidió ahorrar agua.', ok: true, e: 'Relación causal comprobable.' } ] },
  g11u3: { game: 'blitz', title: 'Simulacro contrarreloj', time: 120, lives: 3, quizFrom: 'unit', extraItems: [
    { q: 'La competencia "reflexionar a partir de un texto y evaluar su contenido" corresponde al nivel…', o: ['Literal', 'Inferencial', 'Crítico', 'Ortográfico'], a: 2, e: 'Evaluar el contenido y la postura es el nivel crítico.' },
    { q: '"Desear que todo sea fácil es desear dejar de pensar." En el texto de Zuleta, esta idea es…', o: ['El problema', 'La tesis', 'Un ejemplo', 'Un dato'], a: 1, e: 'Es la postura que el autor defiende.' },
    { q: 'Un medio llama "marea valiente" a los manifestantes. Esa expresión es…', o: ['Un dato verificable', 'Una valoración', 'Una fuente', 'Una cifra oficial'], a: 1, e: 'Es lenguaje cargado que juzga el hecho.' },
    { q: 'En una tabla, 2019: 52.000 y 2024: 61.000. ¿Cuánto aumentaron los préstamos?', o: ['9.000', '11.000', '19.000', '52.000'], a: 0, e: '61.000 − 52.000 = 9.000.' },
    { q: 'Un cómic es un texto…', o: ['Continuo', 'Discontinuo', 'Filosófico', 'Argumentativo'], a: 1, e: 'Combina viñetas, imágenes y texto en un orden no lineal.' },
    { q: 'La opción que "dice algo distinto de lo que dice el texto" se debe…', o: ['Elegir', 'Descartar', 'Marcar dos veces', 'Dejar para el final'], a: 1, e: 'Toda respuesta debe tener evidencia en el texto.' },
    { q: 'Para contrastar una noticia sobre una marcha lo mejor es…', o: ['Leer un solo medio', 'Comparar varios medios y fuentes oficiales', 'Ver solo los comentarios', 'Confiar en el titular'], a: 1, e: 'El contraste reduce el sesgo de un solo enfoque.' } ] },
};
