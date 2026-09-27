// Minijuegos del grado 7°: dos por lección ("Juega") y el reto de cada unidad (formato en lib/SPEC.md).
export const LESSON_GAMES_G7 = {

  // Tipologías textuales
  g7u1l1: [
    { game: 'sorter', title: 'Clasifica el texto', bins: ['Narrativo', 'Descriptivo', 'Expositivo', 'Argumentativo', 'Instructivo'], time: 75, items: [
      ['Mezcle la harina con el agua y amase diez minutos.', 4], ['Conecte el cable rojo a la entrada marcada con la letra A.', 4], ['Doble la hoja por la mitad y recorte por la línea.', 4],
      ['Aquella mañana el bus se varó en la mitad del páramo.', 0], ['Cuando el abuelo llegó a Cali, la ciudad olía a mango.', 0], ['Al final, el perro volvió solo a la finca.', 0],
      ['El colibrí es diminuto, de plumas verdes que brillan como metal.', 1], ['La casa tenía paredes de bahareque y un patio lleno de helechos.', 1], ['Su voz era ronca y su risa, contagiosa.', 1],
      ['Los volcanes se forman cuando el magma sube desde el interior de la Tierra.', 2], ['El río Magdalena atraviesa Colombia de sur a norte.', 2], ['Las abejas polinizan gran parte de los cultivos que comemos.', 2],
      ['Creo que el uniforme debería ser opcional, porque cada uno se expresa con su ropa.', 3], ['Hay que prohibir la pólvora: cada diciembre deja niños quemados.', 3], ['Los celulares no deberían entrar al salón, ya que distraen.', 3] ] },
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
    { game: 'catcher', title: 'Atrapa solo los hechos', rule: 'Atrapa solo los hechos: lo que se puede comprobar', time: 45, lives: 3,
      good: ['Colombia ganó la Copa América 2001', 'James marcó 6 goles en el Mundial 2014', 'El partido terminó 2-1', 'Asistieron 40.000 personas', 'Luis Díaz nació en Barrancas, La Guajira', 'Colombia perdió la final de 2024 con Argentina', 'El gol llegó en el minuto 90', 'La Selección jugó en Barranquilla'],
      bad: ['Fue un partido aburridísimo', 'El técnico debería renunciar', 'James es el mejor de la historia', 'La camiseta nueva es horrible', 'Sin duda, ganaremos el Mundial', 'El árbitro fue vergonzoso', 'Los hinchas colombianos son los más alegres', 'Para mí, jugaron sin ganas'] },
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
  ],

  // Narrativo, lírico y dramático
  g7u2l1: [
    { game: 'sorter', title: 'Atrapa y clasifica géneros', bins: ['Narrativo', 'Lírico', 'Dramático'], time: 60, items: [
      ['Cuento', 0], ['Novela', 0], ['Leyenda', 0], ['Fábula', 0], ['Mito', 0], ['María, de Jorge Isaacs', 0],
      ['Soneto', 1], ['Oda', 1], ['Elegía', 1], ['Copla', 1], ['"Nocturno", de Silva', 1],
      ['Comedia', 2], ['Tragedia', 2], ['Acotación', 2], ['Diálogo de personajes en escena', 2], ['Obra del Festival Iberoamericano de Teatro', 2] ] },
    { game: 'word', title: 'Palabra secreta de géneros', lives: 6, count: 6, words: [
      { w: 'NARRADOR', h: 'La voz que cuenta la historia en un relato.' },
      { w: 'LÍRICO', h: 'Género que expresa sentimientos, casi siempre en verso.' },
      { w: 'DRAMÁTICO', h: 'Género escrito para ser representado.' },
      { w: 'ACOTACIÓN', h: 'Indicación entre paréntesis sobre gestos o escenario en el teatro.' },
      { w: 'SONETO', h: 'Poema de catorce versos.' },
      { w: 'TRAGEDIA', h: 'Obra teatral de final desdichado.' },
      { w: 'COMEDIA', h: 'Obra teatral de tono alegre y final feliz.' },
      { w: 'NOVELA', h: 'Relato largo, como María de Jorge Isaacs.' },
      { w: 'FÁBULA', h: 'Relato breve con animales y moraleja.' },
      { w: 'DIÁLOGO', h: 'Conversación entre personajes, base del teatro.' } ] },
  ],

  // El narrador y el punto de vista
  g7u2l2: [
    { game: 'truefalse', title: '¿Quién narra?', time: 60, lives: 3, items: [
      { s: '"Yo remé hasta la orilla con el corazón en la boca" tiene narrador protagonista.', a: true, e: 'Cuenta en primera persona lo que le pasó a él.' },
      { s: 'El narrador omnisciente solo sabe lo que ve.', a: false, e: 'Lo sabe todo, incluso lo que piensan los personajes.' },
      { s: 'El narrador testigo cuenta lo que le pasó a otro personaje.', a: true, e: 'Presencia los hechos, pero no es el protagonista.' },
      { s: 'El autor y el narrador son siempre la misma persona.', a: false, e: 'El narrador es una voz inventada por el autor.' },
      { s: '"El Mohán sabía lo que pensaba cada lavandera" es una frase de narrador omnisciente.', a: true, e: 'Conoce el pensamiento de todos.' },
      { s: 'Un narrador testigo nunca usa la primera persona.', a: false, e: 'Puede decir "yo vi", aunque cuenta la historia de otro.' },
      { s: '"Vi a mi vecino salir con la atarraya y no regresar" es de un narrador testigo.', a: true, e: 'Habla de lo que presenció, no de lo que le pasó a él.' },
      { s: 'El narrador omnisciente suele contar en tercera persona.', a: true, e: '"Él pensó", "ella sintió": mira desde afuera y desde adentro.' },
      { s: 'Cambiar el narrador no cambia nada de la historia.', a: false, e: 'Cambia lo que sabemos y lo que sentimos por cada personaje.' },
      { s: '"Nos contaron que el río se tragó la canoa" podría decirlo un narrador testigo.', a: true, e: 'Cuenta lo que supo de otros, sin ser protagonista.' } ] },
    { game: 'memory', title: 'Narrador y pista', pairs: [
      ['Narrador protagonista', 'Cuenta lo que le pasó a él'], ['Narrador testigo', 'Cuenta lo que vio que le pasó a otro'], ['Narrador omnisciente', 'Lo sabe todo'], ['Primera persona', '"Yo remé hasta la orilla"'],
      ['Tercera persona', '"Ella remó hasta la orilla"'], ['Segunda persona', '"Tú remas hasta la orilla"'], ['Punto de vista', 'Desde dónde se mira la historia'], ['Autor', 'Persona real que escribe el libro'] ] },
  ],

  // La literatura cuenta su época
  g7u2l3: [
    { game: 'order', title: 'Ordena en el tiempo', time: 90, rounds: [
      { prompt: 'Ordena la vida de Rafael Pombo', items: ['Nace en Bogotá', 'Viaja a Nueva York como diplomático', 'Publica Cuentos pintados para niños', 'Es coronado poeta nacional en el Teatro Colón', 'Muere en Bogotá'], labels: ['1833', '1855', '1867', '1905', '1912'] },
      { prompt: 'Ordena estas obras colombianas por su año de publicación', items: ['María (Jorge Isaacs)', '"Nocturno" (José Asunción Silva)', 'La vorágine (José Eustasio Rivera)', 'Cien años de soledad (Gabriel García Márquez)'], labels: ['1867', '1894', '1924', '1967'] },
      { prompt: 'Ordena estos hechos de la historia de Bogotá', items: ['Grito de Independencia', 'Tranvía de mulas', 'Inauguración del Teatro Colón', 'Primera emisión de televisión', 'Primera ruta de TransMilenio'], labels: ['1810', '1884', '1892', '1954', '2000'] },
      { prompt: 'Ordena los movimientos literarios', items: ['Romanticismo', 'Modernismo', 'Vanguardias', 'Boom latinoamericano'], labels: ['Mediados del siglo XIX', 'Fines del XIX', 'Años 20 y 30', 'Años 60 y 70'] } ] },
    { game: 'blitz', title: 'Obra y contexto', time: 60, lives: 3, items: [
      { q: '¿Quién escribió "El renacuajo paseador"?', o: ['Rafael Pombo', 'Jorge Isaacs', 'José Asunción Silva', 'Tomás Carrasquilla'], a: 0, e: 'Pombo lo publicó en sus Cuentos pintados para niños (1867).' },
      { q: '¿En qué año se publicó María, de Jorge Isaacs?', o: ['1810', '1867', '1924', '1967'], a: 1, e: 'Es la gran novela romántica colombiana, de 1867.' },
      { q: '¿Qué guerra civil vivió Colombia entre 1899 y 1902?', o: ['La Guerra de los Mil Días', 'La Independencia', 'La Violencia', 'La Guerra del Pacífico'], a: 0, e: 'Enfrentó a liberales y conservadores.' },
      { q: 'Las fábulas de Pombo suelen terminar con…', o: ['Una moraleja', 'Una receta', 'Un titular', 'Una acotación'], a: 0, e: 'La moraleja muestra la intención de enseñar de la literatura infantil del siglo XIX.' },
      { q: '¿Dónde publicó Pombo sus Cuentos pintados para niños?', o: ['Nueva York', 'Madrid', 'Cartagena', 'París'], a: 0, e: 'Vivió allí casi veinte años como diplomático y traductor.' },
      { q: '¿Qué transporte empezó a rodar en Bogotá en 1884?', o: ['El tranvía de mulas', 'El metro', 'TransMilenio', 'El cable aéreo'], a: 0, e: 'Unía el centro con Chapinero.' },
      { q: 'José Eustasio Rivera publicó La vorágine en…', o: ['1867', '1924', '1967', '1994'], a: 1, e: 'La novela de la selva y las caucherías es de 1924.' },
      { q: '¿Qué obra de García Márquez se publicó en 1967?', o: ['Cien años de soledad', 'María', 'La vorágine', 'El renacuajo paseador'], a: 0, e: 'Es la novela más famosa del boom latinoamericano.' },
      { q: 'Conocer el contexto de una obra sirve para…', o: ['Entender por qué dice lo que dice', 'Saber cuántas páginas tiene', 'Cambiarle el final', 'Memorizar la fecha'], a: 0, e: 'La época explica sus temas, valores y forma.' } ] },
  ],

  // Sujeto y predicado
  g7u3l1: [
    { game: 'builder', title: 'Constructor de oraciones', time: 120, targets: [
      { prompt: 'Arma la oración: sujeto y luego predicado', pieces: ['Los', 'ciclistas', 'pedalean', 'por', 'la', 'Séptima'], answers: [['Los', 'ciclistas', 'pedalean', 'por', 'la', 'Séptima']] },
      { prompt: 'Arma la oración: sujeto y luego predicado', pieces: ['Mi', 'abuela', 'camina', 'cada', 'domingo'], answers: [['Mi', 'abuela', 'camina', 'cada', 'domingo'], ['Mi', 'abuela', 'cada', 'domingo', 'camina']] },
      { prompt: 'Arma la oración: sujeto y luego predicado', pieces: ['Los', 'perros', 'corren', 'felices'], answers: [['Los', 'perros', 'corren', 'felices'], ['Los', 'perros', 'felices', 'corren']] },
      { prompt: 'Usa el verbo que concuerda con el sujeto', pieces: ['El', 'niño', 'monta', 'montan', 'patineta'], answers: [['El', 'niño', 'monta', 'patineta']] },
      { prompt: 'Usa el verbo que concuerda con el sujeto', pieces: ['Las', 'vendedoras', 'ofrecen', 'ofrece', 'jugo', 'de', 'mora'], answers: [['Las', 'vendedoras', 'ofrecen', 'jugo', 'de', 'mora']] },
      { prompt: 'Arma la oración con el pronombre como sujeto', pieces: ['Nosotros', 'llegamos', 'temprano', 'a', 'la', 'ciclovía'], answers: [['Nosotros', 'llegamos', 'temprano', 'a', 'la', 'ciclovía'], ['Nosotros', 'llegamos', 'a', 'la', 'ciclovía', 'temprano']] },
      { prompt: 'Usa el verbo que concuerda con el sujeto', pieces: ['Un', 'policía', 'organiza', 'organizan', 'el', 'tráfico'], answers: [['Un', 'policía', 'organiza', 'el', 'tráfico']] },
      { prompt: 'Arma la oración: sujeto y luego predicado', pieces: ['Muchas', 'familias', 'disfrutan', 'la', 'ciclovía'], answers: [['Muchas', 'familias', 'disfrutan', 'la', 'ciclovía']] } ] },
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
      { a: 'Salimos temprano', b: 'había trancón en la autopista', o: ['ya que', 'es decir', 'en cambio'], k: 0, e: '"Ya que" explica la causa.' } ] },
    { game: 'sorter', title: 'Clasifica el conector', bins: ['Adición', 'Contraste', 'Causa', 'Consecuencia'], time: 60, items: [
      ['y', 0], ['además', 0], ['también', 0], ['incluso', 0],
      ['pero', 1], ['sin embargo', 1], ['aunque', 1], ['en cambio', 1], ['no obstante', 1],
      ['porque', 2], ['ya que', 2], ['debido a que', 2], ['puesto que', 2],
      ['por eso', 3], ['por lo tanto', 3], ['así que', 3], ['en consecuencia', 3] ] },
  ],

  // La coma y el punto
  g7u3l3: [
    { game: 'truefalse', title: '¿Está bien puntuado?', time: 60, lives: 3, items: [
      { s: '"Compré papa, yuca y plátano."', a: true, e: 'La coma separa los elementos de la enumeración; antes de "y" no va.' },
      { s: '"Mi mamá, trabaja en Bucaramanga."', a: false, e: 'No va coma entre el sujeto y el verbo.' },
      { s: '"Laura, ven a comer."', a: true, e: 'La coma aísla el vocativo.' },
      { s: '"Laura ven a comer." (dicho a Laura)', a: false, e: 'Falta la coma del vocativo: "Laura, ven a comer".' },
      { s: '"Cartagena, la ciudad amurallada, recibe miles de turistas."', a: true, e: 'La explicación va entre comas.' },
      { s: '"Llegamos tarde, el bus se varó."', a: false, e: 'Son dos oraciones independientes: mejor "Llegamos tarde: el bus se varó" o separarlas con punto.' },
      { s: '"Traigan cuaderno, lápiz, y regla."', a: false, e: 'En una enumeración simple no va coma antes de "y".' },
      { s: '"Hoy hace sol. Mañana lloverá."', a: true, e: 'El punto y seguido separa dos oraciones completas.' },
      { s: '"Los estudiantes de séptimo, ganaron el concurso."', a: false, e: 'El sujeto ("Los estudiantes de séptimo") no se separa del verbo.' },
      { s: '"Don Jorge, el profesor de música, toca el tiple."', a: true, e: 'La aposición explicativa va entre comas.' } ] },
    { game: 'blitz', title: 'Contrarreloj de puntuación', time: 60, lives: 3, items: [
      { q: '¿Qué pausa marca la coma?', o: ['Breve', 'Larga', 'Ninguna', 'Final del texto'], a: 0, e: 'La coma es una pausa breve; el punto, una larga.' },
      { q: '¿Qué punto cierra un párrafo?', o: ['Punto y seguido', 'Punto y aparte', 'Punto final', 'Dos puntos'], a: 1, e: 'Después del punto y aparte empieza un párrafo nuevo.' },
      { q: '"Niños, a comer." La coma marca…', o: ['Un vocativo', 'Una enumeración', 'Un error', 'El final'], a: 0, e: '"Niños" es a quien se le habla: vocativo.' },
      { q: '¿Dónde NUNCA va coma?', o: ['Entre sujeto y verbo', 'En una enumeración', 'Después del vocativo', 'Antes de "pero"'], a: 0, e: 'Separar sujeto y verbo con coma es un error.' },
      { q: '¿Cuál está bien escrita?', o: ['Bogotá la capital, es fría.', 'Bogotá, la capital, es fría.', 'Bogotá, la capital es fría.', 'Bogotá la capital es, fría.'], a: 1, e: 'La explicación "la capital" va entre dos comas.' },
      { q: '¿Qué punto cierra todo el texto?', o: ['Punto final', 'Punto y seguido', 'Punto y aparte', 'Punto y coma'], a: 0, e: 'El punto final va al terminar el escrito.' },
      { q: '"Traigan arroz, fríjol ___ plátano." ¿Qué va en el espacio?', o: ['y', ', y', '.', ';'], a: 0, e: 'Antes de la "y" final de una enumeración simple no va coma.' },
      { q: 'Leer en voz alta un texto sirve para…', o: ['Comprobar si las pausas coinciden con los signos', 'Hacerlo más largo', 'Quitarle las tildes', 'Nada'], a: 0, e: 'Si al leer te quedas sin aire o te enredas, falta o sobra un signo.' } ] },
  ],
};

export const UNIT_GAMES_G7 = {
  g7u1: { game: 'sorter', title: '¿Qué tipo de texto es?', from: ['g7u1l1'], extra: [['Mire a ambos lados antes de cruzar la calle.', 4], ['Esa tarde, la quebrada creció y se llevó el puente.', 0], ['El lago de Tota es azul intenso y está rodeado de cultivos de cebolla.', 1], ['El corazón bombea la sangre a todo el cuerpo.', 2], ['El colegio debería abrir la biblioteca los sábados, porque muchos no tienen libros en casa.', 3], ['Agregue sal al gusto y sirva caliente.', 4]] },
  g7u2: { game: 'blitz', title: 'Contrarreloj de géneros', time: 90, lives: 3, quizFrom: 'unit', extraItems: [
    { q: '¿Qué subgénero pertenece al género lírico?', o: ['Soneto', 'Novela', 'Comedia', 'Leyenda'], a: 0, e: 'El soneto es un poema de catorce versos.' },
    { q: '¿Qué indican las acotaciones en una obra de teatro?', o: ['Gestos, movimientos y escenario', 'La moraleja', 'El narrador', 'La rima'], a: 0, e: 'Van entre paréntesis y orientan la representación.' },
    { q: '"Yo lo vi todo desde la orilla, pero nunca supe qué pensaba el pescador." ¿Qué narrador es?', o: ['Testigo', 'Omnisciente', 'Protagonista'], a: 0, e: 'Cuenta lo que presenció, sin conocer la mente del otro.' },
    { q: '¿Quién escribió el poema "Nocturno"?', o: ['José Asunción Silva', 'Rafael Pombo', 'Jorge Isaacs', 'García Márquez'], a: 0, e: 'Silva, poeta bogotano, lo publicó en 1894.' },
    { q: '¿Qué género domina en una fábula en verso?', o: ['Narrativo', 'Lírico', 'Dramático'], a: 0, e: 'Cuenta una historia; el verso es solo su forma.' },
    { q: 'La novela María, de Isaacs, pertenece al…', o: ['Romanticismo', 'Boom latinoamericano', 'Modernismo', 'Vanguardismo'], a: 0, e: 'Es de 1867 y expresa la emoción y la naturaleza propias del Romanticismo.' },
    { q: '¿Qué narrador usa sobre todo la tercera persona y lo sabe todo?', o: ['Omnisciente', 'Testigo', 'Protagonista'], a: 0, e: 'Conoce pensamientos, pasado y futuro de los personajes.' } ] },
  g7u3: { game: 'puente', title: 'Puente de conectores', time: 120, lives: 3, items: [
    { a: 'La ciclovía abre los domingos', b: 'también los festivos', o: ['y', 'pero', 'porque'], k: 0, e: '"Y" suma una información.' },
    { a: 'Quería ir a la ciclovía', b: 'se me pinchó la llanta', o: ['por eso', 'pero', 'además'], k: 1, e: '"Pero" presenta un obstáculo que contrasta con el deseo.' },
    { a: 'Me pinché la llanta', b: 'tuve que caminar', o: ['así que', 'aunque', 'en cambio'], k: 0, e: '"Así que" introduce la consecuencia.' },
    { a: 'Uso casco', b: 'protege la cabeza en una caída', o: ['aunque', 'ya que', 'por lo tanto'], k: 1, e: '"Ya que" explica la causa.' },
    { a: 'Hizo frío', b: 'salimos a pedalear', o: ['porque', 'es decir', 'aun así'], k: 2, e: '"Aun así" marca que algo pasó a pesar del obstáculo.' },
    { a: 'Tomamos agua', b: 'comimos fruta', o: ['además', 'sin embargo', 'porque'], k: 0, e: '"Además" suma otra acción.' },
    { a: 'Mi papá prefiere trotar', b: 'mi mamá prefiere patinar', o: ['por eso', 'en cambio', 'ya que'], k: 1, e: '"En cambio" contrasta dos preferencias.' },
    { a: 'Salimos antes de las siete', b: 'encontramos la vía despejada', o: ['por lo tanto', 'aunque', 'porque'], k: 0, e: '"Por lo tanto" presenta el resultado.' },
    { a: 'No había ciclovía por la lluvia', b: 'jugamos parqués en casa', o: ['así que', 'aunque', 'ya que'], k: 0, e: '"Así que" introduce lo que hicimos como consecuencia.' } ] },
};
