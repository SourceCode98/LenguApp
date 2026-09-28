// Minijuegos del grado 10°: dos por lección ("Juega") y el reto de cada unidad (formato en lib/SPEC.md).
export const LESSON_GAMES_G10 = {

  // Edad Media y Siglo de Oro
  g10u1l1: [
    { game: 'emoji', title: 'Emojiadivina del Siglo de Oro', time: 90, lives: 3, items: [
      { e: '📚😵‍💫🐴🛡️', q: '¿Qué obra es?', o: ['Cantar de mio Cid', 'Don Quijote de la Mancha', 'Lazarillo de Tormes', 'La Celestina'], a: 1, x: 'Un hidalgo enloquece de tanto leer libros de caballerías y sale a caballo como caballero andante.' },
      { e: '🎤🏰⚔️🐎', q: '¿Quién recitaba estas historias de héroes?', o: ['El místico', 'El pícaro', 'El juglar', 'El relator'], a: 2, x: 'Los juglares recitaban cantares de gesta, como el Cid, en plazas y castillos.' },
      { e: '👦🍞👨‍🦯', q: '¿Qué obra es?', o: ['Lazarillo de Tormes', 'La vida es sueño', 'Fuenteovejuna', 'Noche oscura'], a: 0, x: 'Lázaro, un niño pobre, sirve a un ciego y sobrevive con trucos: nace la novela picaresca.' },
      { e: '😴👑❓', q: '¿Qué obra es?', o: ['Coplas por la muerte de su padre', 'Don Quijote', 'Cantar de mio Cid', 'La vida es sueño'], a: 3, x: 'Calderón pregunta si lo que vivimos es real o un sueño.' },
      { e: '🌹➡️💀', q: '¿Qué idea de época muestra?', o: ['La armonía renacentista', 'El desengaño barroco', 'La épica medieval', 'La mística'], a: 1, x: 'La belleza termina en polvo: la vida es breve y engañosa.' },
      { e: '🇮🇹📜1️⃣4️⃣', q: '¿Qué forma adaptó Garcilaso?', o: ['El soneto italiano', 'El cantar de gesta', 'La novela picaresca', 'El romance'], a: 0, x: 'Garcilaso trajo el soneto: 14 versos endecasílabos.' },
      { e: '🙏🌙❤️', q: '¿Qué autor es?', o: ['Lope de Vega', 'Fernando de Rojas', 'Jorge Manrique', 'San Juan de la Cruz'], a: 3, x: 'En Noche oscura, el alma busca unirse con Dios: poesía mística.' },
      { e: '⚓⚔️✋', q: '¿Qué batalla marcó la vida de Cervantes?', o: ['Boyacá', 'Lepanto', 'Ayacucho', 'Waterloo'], a: 1, x: 'En Lepanto (1571) quedó herido de la mano izquierda.' },
      { e: '⚖️🏛️🌿', q: '¿Qué época es?', o: ['Edad Media', 'Barroco', 'Renacimiento', 'Romanticismo'], a: 2, x: 'Armonía, cultura grecolatina y naturaleza idealizada.' },
      { e: '👴⚰️⏳', q: '¿Qué obra es?', o: ['Coplas por la muerte de su padre', 'La Celestina', 'Lazarillo de Tormes', 'Fuenteovejuna'], a: 0, x: 'Manrique escribe a la muerte de su padre y a lo breve de la vida.' } ] },
    { game: 'order', title: 'Ordena en el tiempo', time: 90, rounds: [
      { prompt: 'Ordena las obras de la más antigua a la más reciente', items: ['Cantar de mio Cid', 'La Celestina', 'Lazarillo de Tormes', 'Don Quijote (primera parte)', 'La vida es sueño'], labels: ['Hacia 1200', '1499', '1554', '1605', '1635'] },
      { prompt: 'Ordena las épocas', items: ['Edad Media', 'Renacimiento', 'Barroco'], labels: ['Siglos XII-XV', 'Siglo XVI', 'Siglo XVII'] },
      { prompt: 'Ordena los autores por su fecha de nacimiento', items: ['Jorge Manrique', 'Garcilaso de la Vega', 'Miguel de Cervantes', 'Lope de Vega', 'Pedro Calderón de la Barca'], labels: ['Hacia 1440', 'Hacia 1500', '1547', '1562', '1600'] },
      { prompt: 'Ordena la vida de Cervantes', items: ['Nace en Alcalá de Henares', 'Queda herido de la mano izquierda en Lepanto', 'Pasa cinco años cautivo en Argel', 'Publica la primera parte del Quijote', 'Publica la segunda parte del Quijote'], labels: ['1547', '1571', '1575-1580', '1605', '1615'] } ] },
  ],

  // Del Romanticismo a la Generación del 27
  g10u1l2: [
    { game: 'sopa', title: 'Sopa de movimientos', size: 12, time: 180, words: [
      { w: 'Bécquer', h: 'Poeta sevillano de las Rimas' },
      { w: 'Isaacs', h: 'Colombiano autor de María (1867)' },
      { w: 'Galdós', h: 'Novelista realista de Fortunata y Jacinta' },
      { w: 'Realismo', h: 'Retrata la sociedad sin idealizarla' },
      { w: 'Darío', h: 'Rubén, autor de Azul... (1888)' },
      { w: 'Modernismo', h: 'Movimiento que busca la musicalidad del verso' },
      { w: 'Romance', h: 'Forma popular que la Generación del 27 unió a la vanguardia' },
      { w: 'Lorca', h: 'Poeta granadino del Romancero gitano' } ] },
    { game: 'conecta', title: 'Autor y obra', time: 120, pairs: [
      ['Bécquer', 'Rimas'], ['Espronceda', 'Canción del pirata'], ['Zorrilla', 'Don Juan Tenorio'], ['Jorge Isaacs', 'María'], ['Galdós', 'Fortunata y Jacinta'],
      ['Clarín', 'La Regenta'], ['Rubén Darío', 'Azul...'], ['José Asunción Silva', 'Nocturno'], ['Alberti', 'Marinero en tierra'], ['Lorca', 'Romancero gitano'] ] },
  ],

  // Literatura y pintura
  g10u1l3: [
    { game: 'truefalse', title: '¿Misma época?', time: 60, lives: 3, items: [
      { s: 'Velázquez y Cervantes vivieron en el Siglo de Oro.', a: true, e: 'Cervantes murió en 1616; Velázquez nació en 1599.' },
      { s: 'Picasso pintó el Guernica cuando Garcilaso escribía sus sonetos.', a: false, e: 'Garcilaso es del siglo XVI; el Guernica es de 1937.' },
      { s: 'Goya y Bécquer fueron contemporáneos.', a: false, e: 'Goya murió en 1828 y Bécquer nació en 1836.' },
      { s: 'El Greco y Santa Teresa vivieron en el siglo XVI.', a: true, e: 'Los dos vivieron en España en la segunda mitad de ese siglo.' },
      { s: 'Dalí y Lorca fueron amigos en la Residencia de Estudiantes de Madrid.', a: true, e: 'Se conocieron allí en los años veinte.' },
      { s: 'Botero es un pintor del Barroco español.', a: false, e: 'Es un pintor colombiano de los siglos XX y XXI que dialoga con el Barroco.' },
      { s: 'Las meninas se pintó después de publicado el Quijote.', a: true, e: 'El Quijote es de 1605 y 1615; Las meninas, de 1656.' },
      { s: 'El Cantar de mio Cid y Las meninas son del mismo siglo.', a: false, e: 'El Cantar es de hacia 1200; Las meninas, del siglo XVII.' },
      { s: 'Isaacs publicó María cuando el Romanticismo seguía vivo en Hispanoamérica.', a: true, e: 'María es de 1867, obra cumbre del Romanticismo hispanoamericano.' },
      { s: 'Rubén Darío y Picasso fueron contemporáneos.', a: true, e: 'Darío murió en 1916, cuando Picasso ya era un pintor reconocido.' } ] },
    { game: 'crucigrama', title: 'Crucigrama de pintores', time: 240, words: [
      { w: 'Greco', h: 'El ___: pintor de Toledo de figuras alargadas' },
      { w: 'Velázquez', h: 'Pintor de Las meninas' },
      { w: 'Goya', h: 'Pintó El sueño de la razón produce monstruos' },
      { w: 'Picasso', h: 'Pintó el Guernica' },
      { w: 'Dalí', h: 'Pintor surrealista, amigo de Lorca' },
      { w: 'Guernica', h: 'Pintura sobre un bombardeo de la Guerra Civil' },
      { w: 'claroscuro', h: 'Contraste fuerte de luz y sombra del Barroco' },
      { w: 'surrealismo', h: 'Movimiento que busca los sueños y lo irracional' } ] },
  ],

  // Los tres niveles de lectura
  g10u2l1: [
    { game: 'sorter', title: '¿Literal, inferencial o crítica?', bins: ['Literal', 'Inferencial', 'Crítica'], time: 75, items: [
      ['¿En qué año se inauguró el TransMiCable?', 0], ['¿Cuántos minutos dura el viaje, según el texto?', 0], ['¿Dónde ocurre la historia, según el narrador?', 0], ['¿Qué cifra da la Alcaldía?', 0],
      ['¿Qué significa "trasnochado" en este contexto?', 1], ['¿Por qué el personaje guarda silencio?', 1], ['¿Cuál es la idea global del texto?', 1], ['¿Qué relación hay entre el segundo y el tercer párrafo?', 1],
      ['¿Es confiable la fuente que cita el autor?', 2], ['¿Estás de acuerdo con la conclusión? ¿Por qué?', 2], ['¿Qué intereses podría tener quien escribe?', 2], ['¿Bastan los datos para sostener la tesis?', 2] ] },
    { game: 'hunter', title: 'Cazador de evidencias', time: 90, rounds: [
      { clue: 'Toca los datos literales: ¿cuándo, cuántos y cuánto tiempo?', text: 'El festival de lectura del colegio se hizo el [[14 de mayo]]. Participaron [[320 estudiantes]], que leyeron [[45 cuentos]] en voz alta durante [[dos horas]].' },
      { clue: 'Toca las pistas que muestran que Julián estaba nervioso', text: 'Antes de la exposición, Julián [[se secaba las manos en el pantalón]], [[revisaba sus fichas una y otra vez]] y [[no probó el almuerzo]]. Afuera hacía sol y la cancha estaba llena.' },
      { clue: 'Toca las pistas de que llovió durante la noche', text: 'Al amanecer, [[las calles estaban encharcadas]], [[los carros tenían gotas en el vidrio]] y [[el patio olía a tierra mojada]]. Nadie había visto la tormenta.' },
      { clue: 'Toca las afirmaciones que un lector crítico debe verificar', text: 'La nota asegura que [[el 90 % de los bogotanos odia el ruido]] y que [[los expertos coinciden en que es la ciudad más ruidosa del mundo]]. No cita ningún estudio y fue publicada el martes en una página sin autor.' } ] },
  ],

  // Textos discontinuos
  g10u2l2: [
    { game: 'blitz', title: 'Contrarreloj de infografías', time: 75, lives: 3, items: [
      { q: 'Tabla: lunes 20 °C, martes 18 °C, miércoles 22 °C. ¿Qué día hizo más calor?', o: ['Lunes', 'Martes', 'Miércoles', 'No se sabe'], a: 2, e: '22 °C es el valor más alto de la tabla.' },
      { q: 'Torta: fútbol 40 %, baloncesto 25 %, voleibol 20 %, otros 15 %. ¿Qué deporte prefiere exactamente una cuarta parte?', o: ['Fútbol', 'Baloncesto', 'Voleibol', 'Otros'], a: 1, e: 'Una cuarta parte es el 25 %.' },
      { q: 'Infografía: "1 de cada 4 estudiantes lee a diario". ¿Qué porcentaje es?', o: ['4 %', '14 %', '25 %', '40 %'], a: 2, e: '1 de cada 4 equivale al 25 %.' },
      { q: '¿Qué indican las convenciones (la leyenda) de una gráfica o un mapa?', o: ['El nombre del autor', 'Qué significa cada color o símbolo', 'La fecha de publicación', 'El precio del periódico'], a: 1, e: 'Sin convenciones no se pueden interpretar colores ni símbolos.' },
      { q: 'Una caricatura dibuja a un político con una nariz enorme. ¿Qué recurso usa?', o: ['La exageración', 'La cita textual', 'La estadística', 'La entrevista'], a: 0, e: 'La caricatura exagera rasgos para opinar con humor.' },
      { q: 'Horario: el bus sale a las 6:00, 6:20 y 6:40. ¿Cada cuánto pasa?', o: ['Cada 10 minutos', 'Cada 20 minutos', 'Cada 30 minutos', 'Cada hora'], a: 1, e: 'Hay 20 minutos entre una salida y la siguiente.' },
      { q: '¿Cuál de estos es un texto discontinuo?', o: ['Un cuento', 'Una carta', 'La tabla de posiciones de la Liga colombiana', 'Un ensayo'], a: 2, e: 'La tabla organiza datos en filas y columnas: no se lee de corrido.' },
      { q: 'Gráfica: inscritos en 2023: 200; en 2024: 250; en 2025: 300. ¿Qué se puede inferir?', o: ['Bajan cada año', 'Aumentan 50 cada año', 'Se duplican cada año', 'No cambian'], a: 1, e: 'La diferencia entre un año y otro es siempre de 50.' },
      { q: '¿Qué conviene revisar primero para saber si una infografía es confiable?', o: ['Los colores', 'El tamaño de la letra', 'La fuente y la fecha de los datos', 'Cuántas veces se compartió'], a: 2, e: 'La fuente y la fecha permiten verificar la información.' } ] },
    { game: 'rosco', title: 'El rosco de las gráficas', time: 200, items: [
      { l: 'A', q: 'Empieza por A: subida que, en porcentaje, se calcula sobre el valor inicial', a: 'aumento' },
      { l: 'C', q: 'Empieza por C: dibujo con palabras que opina con humor y exageración', a: 'caricatura' },
      { l: 'D', q: 'Empieza por D: texto que se lee saltando entre sus partes, como una tabla', a: 'discontinuo' },
      { l: 'E', q: 'Empieza por E: línea de la gráfica que, si no empieza en cero, exagera las diferencias', a: 'eje' },
      { l: 'F', q: 'Empieza por F: de dónde salen los datos; se revisa primero', a: 'fuente' },
      { l: 'G', q: 'Empieza por G: texto discontinuo con barras, líneas o tortas', a: 'gráfica' },
      { l: 'H', q: 'Empieza por H: texto discontinuo con las horas de salida de un bus', a: 'horario' },
      { l: 'I', q: 'Empieza por I: decir lo contrario de lo que se piensa, recurso de la caricatura', a: 'ironía' },
      { l: 'L', q: 'Empieza por L: otro nombre de las convenciones que explican colores y símbolos', a: 'leyenda' },
      { l: 'M', q: 'Empieza por M: grupo encuestado; si es pequeño, no representa a todos', a: 'muestra' },
      { l: 'O', q: 'Contiene la O: texto que se lee de corrido, en párrafos', a: 'continuo' },
      { l: 'P', q: 'Empieza por P: parte de cada cien', a: 'porcentaje' },
      { l: 'T', q: 'Empieza por T: hacia dónde van los datos: suben, bajan o se mantienen', a: 'tendencia' },
      { l: 'U', q: 'Contiene la U: el 25 % es una ___ parte', a: 'cuarta' },
      { l: 'X', q: 'Contiene la X: recurso de la caricatura que agranda los rasgos', a: 'exageración' } ] },
  ],

  // Intención y postura del autor
  g10u2l3: [
    { game: 'catcher', title: 'Atrapa las marcas de opinión', rule: 'Atrapa solo las expresiones que revelan la opinión del autor', time: 45, lives: 3,
      good: ['Lamentablemente', 'Considero que', 'Es inaceptable', 'A mi juicio', 'Por fortuna', 'Sin duda', 'Vergonzoso', 'Es evidente que'],
      bad: ['El 12 de marzo', 'Según el DANE', 'La obra mide 3 km', 'Asistieron 200 personas', 'El alcalde firmó el decreto', 'La sesión empezó a las 9 a. m.', 'En la localidad de Kennedy'] },
    { game: 'duelo', title: '¿Qué defiende el autor?', lives: 3, time: 90, items: [
      { s: 'El parque debe conservarse: es el único espacio verde del sector y lo usan cientos de familias cada semana, según el conteo de la junta de acción comunal.', ok: true, e: 'Tesis apoyada en un dato con fuente.' },
      { s: 'No hay que hacerle caso a esa columnista porque es muy joven.', ok: false, f: 'Ad hominem', e: 'Ataca a la persona, no a sus argumentos.' },
      { s: 'O construimos la autopista o la ciudad colapsa para siempre.', ok: false, f: 'Falso dilema', e: 'Presenta solo dos opciones cuando hay muchas más.' },
      { s: 'Si peatonalizan esta calle, después peatonalizarán todas y nadie podrá moverse.', ok: false, f: 'Pendiente resbaladiza', e: 'Supone una cadena de consecuencias exageradas sin pruebas.' },
      { s: 'A mi vecino le robó un ciclista; los ciclistas son todos unos ladrones.', ok: false, f: 'Generalización apresurada', e: 'Saca una conclusión general de un solo caso.' },
      { s: 'Todo el mundo apoya la reforma, así que tiene que ser buena.', ok: false, f: 'Apelación a la mayoría', e: 'Que muchos crean algo no lo vuelve verdadero.' },
      { s: 'Quienes piden más ciclorrutas lo que quieren es prohibir los carros.', ok: false, f: 'Hombre de paja', e: 'Deforma la postura del otro para atacarla con facilidad.' },
      { s: 'La biblioteca abrió el lunes y el martes bajaron los robos: la biblioteca acabó con la inseguridad.', ok: false, f: 'Falsa causa', e: 'Que algo ocurra después no prueba que lo haya causado.' },
      { s: 'Conviene ampliar el horario de la biblioteca: los fines de semana la espera para usar un computador supera las dos horas.', ok: true, e: 'Propuesta sustentada en una situación comprobable.' },
      { s: 'Un futbolista famoso dice que ese libro de historia está mal escrito; seguro tiene razón.', ok: false, f: 'Falsa autoridad', e: 'Ser famoso en un campo no da autoridad en otro.' },
      { s: 'El ruido afecta el sueño: la Organización Mundial de la Salud recomienda límites de ruido nocturno para proteger la salud.', ok: true, e: 'Se apoya en una fuente experta en el tema.' } ] },
  ],

  // La reseña crítica
  g10u3l1: [
    { game: 'hunter', title: 'Cazador en la reseña', time: 90, rounds: [
      { clue: 'Toca las frases de valoración: juicios sobre la obra', text: 'La película narra el regreso de un médico a Medellín. [[La fotografía es su mayor acierto]]. El protagonista enfrenta amenazas por defender los derechos humanos. [[El final se siente apresurado]].' },
      { clue: 'Toca los datos de la ficha técnica', text: '[[María]], novela de [[Jorge Isaacs]] publicada en [[1867]], cuenta un amor imposible en el Valle del Cauca. Su paisaje es lo mejor del libro.' },
      { clue: 'Toca lo que no debe ir en el resumen: juicios o el final', text: 'Efraín regresa a la hacienda de su familia y se enamora de su prima María. [[La novela es aburridísima]]. Él viaja a Londres a estudiar y [[al final María muere]].' },
      { clue: 'Toca los criterios que usa el reseñista', text: 'Me convenció por [[los personajes]], que cambian a lo largo de la historia, y por [[la fotografía]], llena de contrastes. [[El lenguaje]] es sencillo y [[la estructura]] salta en el tiempo sin confundir.' } ] },
    { game: 'conecta', title: 'Partes de la reseña', time: 120, pairs: [
      ['Ficha técnica', 'El olvido que seremos, Fernando Trueba, 2020'], ['Resumen', 'Un médico de Medellín defiende los derechos humanos'],
      ['Valoración', 'La fotografía es el mayor acierto'], ['Recomendación', 'Para quien quiera entender los años ochenta'],
      ['Criterio', 'Los personajes, el lenguaje o la estructura'], ['Ejemplo de la obra', 'La escena del hospital'],
      ['Resumen objetivo', 'Tercera persona, presente y sin juicios'], ['Spoiler', 'Revelar el final en el resumen'],
      ['Valoración débil', '"Me encantó, es lo mejor"'], ['Revisión', 'Tildes, concordancia y puntuación'] ] },
  ],

  // La ponencia y la relatoría
  g10u3l2: [
    { game: 'builder', title: 'Arma la ponencia', time: 150, targets: [
      { prompt: 'Arma la estructura de la ponencia', pieces: ['Saludo', 'Introducción', 'Desarrollo', 'Conclusión', 'Preguntas'], answers: [['Saludo', 'Introducción', 'Desarrollo', 'Conclusión', 'Preguntas']] },
      { prompt: 'Arma la introducción: tema y tesis', pieces: ['Hoy quiero demostrar', 'que la biblioteca del barrio', 'es un derecho,', 'no un lujo.'], answers: [['Hoy quiero demostrar', 'que la biblioteca del barrio', 'es un derecho,', 'no un lujo.']] },
      { prompt: 'Arma la conclusión: retoma la tesis y abre las preguntas', pieces: ['Por eso,', 'defender la biblioteca', 'es defender a la comunidad.', 'Quedo atenta', 'a sus preguntas.'], answers: [['Por eso,', 'defender la biblioteca', 'es defender a la comunidad.', 'Quedo atenta', 'a sus preguntas.']] },
      { prompt: 'Ordena el trabajo del relator', pieces: ['Escuchar y tomar notas', 'Anotar preguntas y acuerdos', 'Redactar la síntesis', 'Leer o entregar la relatoría'], answers: [['Escuchar y tomar notas', 'Anotar preguntas y acuerdos', 'Redactar la síntesis', 'Leer o entregar la relatoría']] },
      { prompt: 'Arma una frase de relatoría fiel (sobran piezas)', pieces: ['La ponente', 'sostuvo que', 'la biblioteca', 'es un derecho.', 'Yo creo que', 'exagera.'], answers: [['La ponente', 'sostuvo que', 'la biblioteca', 'es un derecho.']] } ] },
    { game: 'crucigrama', title: 'Crucigrama de la ponencia', time: 240, words: [
      { w: 'ponencia', h: 'Exposición oral formal ante un público académico' },
      { w: 'relatoría', h: 'Síntesis fiel de lo que se dijo en una sesión' },
      { w: 'tesis', h: 'Idea central que la conclusión retoma' },
      { w: 'pausa', h: 'Silencio breve que destaca una idea' },
      { w: 'ensayar', h: 'Practicar en voz alta y cronometrarse antes del evento' },
      { w: 'volumen', h: 'Qué tan fuerte se habla' },
      { w: 'foro', h: 'Evento académico donde se presentan ponencias' },
      { w: 'conclusión', h: 'Parte final de la ponencia' } ] },
  ],

  // Revisar y corregir
  g10u3l3: [
    { game: 'tildes', title: 'Lluvia de tildes', time: 60, lives: 3, words: [
      { w: 'examenes', a: 'exámenes' }, { w: 'examen', a: 'examen' }, { w: 'jovenes', a: 'jóvenes' }, { w: 'joven', a: 'joven' },
      { w: 'caracter', a: 'carácter' }, { w: 'caracteres', a: 'caracteres' }, { w: 'pais', a: 'país' }, { w: 'raiz', a: 'raíz' },
      { w: 'arroz', a: 'arroz' }, { w: 'maracuya', a: 'maracuyá' }, { w: 'menu', a: 'menú' }, { w: 'tenemos', a: 'tenemos' },
      { w: 'fue', a: 'fue' }, { w: 'Ibague', a: 'Ibagué' }, { w: 'Quibdo', a: 'Quibdó' }, { w: 'heroe', a: 'héroe' } ] },
    { game: 'corrector', title: 'Corrector de avisos', time: 150, lives: 3, rounds: [
      { text: 'El sábado {{fue|fué}} la feria. {{Los estudiantes de décimo presentaron|Los estudiantes de décimo, presentaron}} un proyecto sobre el río Bogotá, y los resultados {{fueron|fue}} publicados.', e: '"Fue" es monosílabo, no hay coma entre sujeto y verbo, y "los resultados" pide verbo en plural.' },
      { text: 'Se {{vende|bende}} lote junto a la vía. {{A ver|Haber}} si se anima: {{ahí|hay}} le dejo el número. {{Llame|Llamé}} ya.', e: 'Vende (de vender), a ver (mirar), ahí (lugar) y llame (orden a usted).' },
      { text: 'Hoy tenemos sancocho, arroz con coco y jugo de {{maracuyá|maracuya}}. Pregunte por el {{menú|menu}} del día. {{Hubo|Hubieron}} muchas quejas por el ruido.', e: 'Maracuyá y menú son agudas terminadas en vocal; haber impersonal va en singular.' },
      { text: 'Pregúntale a Juan si {{él|el}} viene. Yo no {{sé|se}}, pero su mamá dice que {{sí|si}}. A {{mí|mi}} me da igual.', e: 'Él, sé, sí y mí llevan tilde diacrítica en estos usos.' },
      { text: 'Mi abuela vive en {{Cúcuta|Cucuta}} y dice que el {{búho|buho}} de su patio tiene mucho {{carácter|caracter}}.', e: 'Cúcuta es esdrújula, búho tiene hiato y carácter es grave terminada en r.' } ] },
  ],
};

export const UNIT_GAMES_G10 = {
  g10u1: { game: 'memory', title: 'Parejas de la literatura española', pairs: [
    ['Cantar de mio Cid', 'Edad Media'], ['Garcilaso de la Vega', 'Renacimiento'], ['La vida es sueño', 'Barroco'], ['Rimas de Bécquer', 'Romanticismo'],
    ['Fortunata y Jacinta', 'Realismo'], ['Azul... de Rubén Darío', 'Modernismo'], ['Romancero gitano', 'Generación del 27'], ['Las meninas', 'Velázquez'], ['Guernica', 'Picasso'] ] },
  g10u2: { game: 'detective', title: 'Detective de datos y columnas', time: 180, cases: [
    { head: 'El TransMiCable redujo a unos trece minutos el viaje al portal', src: 'Informe de movilidad de la Alcaldía', date: 'Enero de 2019', clues: [{ t: 'Da cifras de antes y después', bad: false }, { t: 'Tiene fuente y fecha', bad: false }, { t: 'Coincide con lo que cuentan los vecinos', bad: false }], a: 0, e: 'Dato con fuente, fecha y cifras comprobables: confiable.' },
    { head: '¡Las ventas de bicicletas se TRIPLICARON en el barrio!', src: 'Página de una tienda de bicicletas', date: 'Marzo de 2026', clues: [{ t: 'La gráfica pasa de 100 a 110 ventas', bad: true }, { t: 'El eje vertical empieza en 95', bad: true }, { t: 'Quien publica vende bicicletas', bad: true }], a: 1, e: 'Los datos son reales, pero el eje recortado exagera un aumento del 10 %: engañosa.' },
    { head: 'Todos los jóvenes de Colombia odian leer, dice un estudio', src: 'Cadena de WhatsApp sin autor', date: 'Sin fecha', clues: [{ t: 'No dice qué estudio ni quién lo hizo', bad: true }, { t: 'Usa la generalización "todos"', bad: true }, { t: 'Nadie encuentra el estudio', bad: true }], a: 2, e: 'No hay fuente, ni fecha, ni estudio: el dato es inventado.' },
    { head: 'El 45 % de los estudiantes del colegio llega a pie', src: 'Encuesta del colegio a 600 estudiantes', date: 'Marzo de 2026', clues: [{ t: 'Dice cuántas personas respondieron', bad: false }, { t: 'Tiene fuente y fecha', bad: false }, { t: 'No generaliza a todo el país', bad: false }], a: 0, e: 'Muestra clara, fuente y fecha, y una conclusión que no va más allá de los datos.' },
    { head: 'Más de la mitad de los estudiantes llega a pie', src: 'Blog que resume la misma encuesta', date: 'Abril de 2026', clues: [{ t: 'El dato original era 45 %', bad: true }, { t: '45 % no alcanza la mitad', bad: true }, { t: 'Cita una encuesta real', bad: false }], a: 1, e: 'Parte de un dato real, pero lo presenta mal: engañosa.' },
    { head: 'Famoso futbolista asegura que el agua del grifo daña la memoria', src: 'Video en redes del futbolista', date: '2026', clues: [{ t: 'El futbolista no es experto en salud', bad: true }, { t: 'No cita ningún estudio', bad: true }, { t: 'Ninguna entidad de salud lo confirma', bad: true }], a: 2, e: 'Falsa autoridad y un dato sin ningún respaldo: falsa.' },
    { head: 'La biblioteca abrió y al día siguiente bajaron los robos: acabó con la inseguridad', src: 'Columna de opinión de un vecino', date: 'Mayo de 2026', clues: [{ t: 'Los datos de robos son de un solo día', bad: true }, { t: 'Confunde "después" con "por causa de"', bad: true }, { t: 'La biblioteca sí abrió ese lunes', bad: false }], a: 1, e: 'Los hechos pueden ser ciertos, pero la conclusión es una falsa causa: engañosa.' } ] },
  g10u3: { game: 'rosco', title: 'El rosco del texto académico', time: 200, items: [
    { l: 'A', q: 'Empieza por A: palabra con la fuerza en la última sílaba', a: 'aguda' },
    { l: 'C', q: 'Empieza por C: acuerdo en número y persona entre sujeto y verbo', a: 'concordancia' },
    { l: 'D', q: 'Empieza por D: tilde que distingue "tú" de "tu" o "él" de "el"', a: 'diacrítica' },
    { l: 'E', q: 'Empieza por E: palabra como Cúcuta, que lleva tilde siempre', a: 'esdrújula' },
    { l: 'F', q: 'Empieza por F: parte de la reseña con título, autor y año (ficha…)', a: 'ficha', alt: ['ficha técnica'] },
    { l: 'G', q: 'Empieza por G: palabra con la fuerza en la penúltima sílaba', a: 'grave', alt: ['llana'] },
    { l: 'H', q: 'Empieza por H: vocal cerrada con fuerza junto a una abierta, como en "país"', a: 'hiato' },
    { l: 'I', q: 'Empieza por I: parte de la ponencia que presenta el tema y el propósito', a: 'introducción' },
    { l: 'P', q: 'Empieza por P: exposición oral formal ante un público académico', a: 'ponencia' },
    { l: 'R', q: 'Empieza por R: síntesis fiel de lo que se dijo en una sesión', a: 'relatoría' },
    { l: 'S', q: 'Empieza por S: palabra de significado parecido que evita una repetición', a: 'sinónimo' },
    { l: 'T', q: 'Empieza por T: idea central que la conclusión de la ponencia retoma', a: 'tesis' },
    { l: 'U', q: 'Contiene la U: parte de la reseña que cuenta de qué trata sin revelar el final', a: 'resumen' },
    { l: 'V', q: 'Empieza por V: parte de la reseña que juzga la obra con criterios', a: 'valoración' } ] },
};
