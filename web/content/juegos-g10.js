// Minijuegos del grado 10°: dos por lección ("Juega") y el reto de cada unidad (formato en lib/SPEC.md).
export const LESSON_GAMES_G10 = {

  // Edad Media y Siglo de Oro
  g10u1l1: [
    { game: 'order', title: 'Ordena en el tiempo', time: 90, rounds: [
      { prompt: 'Ordena las obras de la más antigua a la más reciente', items: ['Cantar de mio Cid', 'La Celestina', 'Lazarillo de Tormes', 'Don Quijote (primera parte)', 'La vida es sueño'], labels: ['Hacia 1200', '1499', '1554', '1605', '1635'] },
      { prompt: 'Ordena las épocas', items: ['Edad Media', 'Renacimiento', 'Barroco'], labels: ['Siglos XII-XV', 'Siglo XVI', 'Siglo XVII'] },
      { prompt: 'Ordena los autores por su fecha de nacimiento', items: ['Jorge Manrique', 'Garcilaso de la Vega', 'Miguel de Cervantes', 'Lope de Vega', 'Pedro Calderón de la Barca'], labels: ['Hacia 1440', 'Hacia 1500', '1547', '1562', '1600'] },
      { prompt: 'Ordena la vida de Cervantes', items: ['Nace en Alcalá de Henares', 'Queda herido de la mano izquierda en Lepanto', 'Pasa cinco años cautivo en Argel', 'Publica la primera parte del Quijote', 'Publica la segunda parte del Quijote'], labels: ['1547', '1571', '1575-1580', '1605', '1615'] } ] },
    { game: 'memory', title: 'Autor y obra', pairs: [
      ['Cantar de mio Cid', 'Anónimo'], ['Coplas por la muerte de su padre', 'Jorge Manrique'], ['La Celestina', 'Fernando de Rojas'], ['Églogas y sonetos', 'Garcilaso de la Vega'],
      ['Noche oscura', 'San Juan de la Cruz'], ['Don Quijote de la Mancha', 'Miguel de Cervantes'], ['Fuenteovejuna', 'Lope de Vega'], ['La vida es sueño', 'Calderón de la Barca'] ] },
  ],

  // Del Romanticismo a la Generación del 27
  g10u1l2: [
    { game: 'sorter', title: '¿Qué movimiento es?', bins: ['Romanticismo', 'Realismo', 'Modernismo', 'Generación del 27'], time: 75, items: [
      ['Rimas, de Bécquer', 0], ['Don Juan Tenorio, de Zorrilla', 0], ['Un yo que sufre por un amor imposible bajo la luna', 0],
      ['Fortunata y Jacinta, de Galdós', 1], ['La Regenta, de Clarín', 1], ['Un narrador que observa la sociedad con detalle', 1],
      ['Azul..., de Rubén Darío', 2], ['Nocturno, de José Asunción Silva', 2], ['Versos musicales con cisnes y mundos exóticos', 2],
      ['Romancero gitano, de Lorca', 3], ['Marinero en tierra, de Alberti', 3], ['Homenaje a Góngora en 1927', 3] ] },
    { game: 'word', title: 'Palabra secreta: movimientos', lives: 6, count: 6, words: [
      { w: 'ROMANTICISMO', h: 'Movimiento del yo, la emoción y la libertad (primera mitad del siglo XIX).' },
      { w: 'REALISMO', h: 'Movimiento que retrata la sociedad con detalle y sin idealizarla.' },
      { w: 'MODERNISMO', h: 'Movimiento de Rubén Darío y Silva que busca la música del verso.' },
      { w: 'VANGUARDIA', h: 'Arte que rompe con la tradición y experimenta con la forma.' },
      { w: 'NATURALISMO', h: 'Realismo extremo que explica a los personajes por la herencia y el medio.' },
      { w: 'BÉCQUER', h: 'Autor sevillano de las Rimas y las Leyendas.' },
      { w: 'GALDÓS', h: 'Novelista realista de Fortunata y Jacinta.' },
      { w: 'LORCA', h: 'Poeta granadino del Romancero gitano.' },
      { w: 'ROMANCERO', h: 'Colección de romances, como la que publicó Lorca en 1928.' } ] },
  ],

  // Literatura y pintura
  g10u1l3: [
    { game: 'memory', title: 'Pintura y poema', pairs: [
      ['Las meninas (Velázquez)', 'La vida es sueño (Calderón)'], ['Guernica (Picasso)', 'Guerra Civil española'], ['Salvador Dalí', 'Amigo de Lorca en Madrid'],
      ['El sueño de la razón (Goya)', 'Lo nocturno romántico'], ['El Greco', 'Espiritualidad del siglo XVI'], ['Fernando Botero', 'Versiones de Velázquez'],
      ['Surrealismo', 'Sueños e imágenes irracionales'], ['Barroco', 'Contraste de luz y sombra'] ] },
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
    { game: 'truefalse', title: '¿Lo dice la gráfica?', time: 75, lives: 3, items: [
      { s: 'Tabla: a pie 45 %, bus 30 %, bicicleta 15 %, carro 10 %. Más de la mitad llega a pie.', a: false, e: '45 % es el grupo más grande, pero no llega a la mitad.' },
      { s: 'Misma tabla: la bicicleta supera al carro.', a: true, e: '15 % es más que 10 %.' },
      { s: 'Gráfica: en abril llovieron 120 mm y en julio 40 mm. En abril llovió el triple que en julio.', a: true, e: '120 es tres veces 40.' },
      { s: 'Misma gráfica: julio fue el mes más seco del año.', a: false, e: 'La gráfica solo muestra dos meses: no permite hablar de todo el año.' },
      { s: 'Una infografía sin fuente ni fecha se puede citar en un trabajo sin verificarla.', a: false, e: 'Sin fuente ni fecha, los datos no se pueden comprobar.' },
      { s: 'Caricatura: un funcionario corta la cinta de un puente sin terminar. El caricaturista critica que se inauguren obras incompletas.', a: true, e: 'La imagen exagera una situación para opinar sobre ella.' },
      { s: 'Gráfica: 250 inscritos en 2024 y 300 en 2025. Los inscritos aumentaron un 20 %.', a: true, e: '50 es el 20 % de 250.' },
      { s: 'Encuesta a 40 estudiantes de un curso: sus resultados representan a todos los jóvenes de Colombia.', a: false, e: 'Una muestra tan pequeña y particular no permite generalizar.' },
      { s: 'Barras de 100 y 110 con el eje desde 95: la segunda cantidad es el doble de la primera.', a: false, e: 'Solo aumentó un 10 %; el eje recortado engaña a la vista.' },
      { s: 'Mapa con convenciones (azul: ríos; verde: parques): para leerlo hay que mirar las convenciones.', a: true, e: 'Las convenciones explican qué significa cada color.' } ] },
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
    { game: 'order', title: 'Ordena la reseña', time: 90, rounds: [
      { prompt: 'Ordena las partes de una reseña crítica', items: ['Ficha técnica', 'Resumen', 'Valoración argumentada', 'Recomendación'] },
      { prompt: 'Ordena esta reseña de "María", de Jorge Isaacs', items: ['María, Jorge Isaacs, 1867. Novela.', 'Efraín regresa a la hacienda de su familia y se enamora de su prima María.', 'Sus descripciones del paisaje son su mayor acierto, aunque hoy el ritmo puede parecer lento.', 'Se la recomiendo a quien quiera entender el Romanticismo colombiano.'], labels: ['Ficha', 'Resumen', 'Valoración', 'Recomendación'] },
      { prompt: 'Ordena los pasos para escribir una reseña', items: ['Leer o ver la obra con atención y tomar notas', 'Completar la ficha técnica', 'Escribir el resumen sin contar el final', 'Escribir la valoración con criterios y ejemplos', 'Revisar y corregir'] } ] },
    { game: 'sorter', title: '¿Resumen o valoración?', bins: ['Resumen', 'Valoración'], time: 60, items: [
      ['La película narra el regreso de un médico a Medellín.', 0], ['La protagonista viaja a la costa para buscar a su hermano.', 0], ['El libro reúne doce cuentos sobre la vida en un barrio de Cali.', 0], ['La historia transcurre durante un verano en Cartagena.', 0], ['El narrador es un niño que cuenta la historia de su familia.', 0],
      ['La fotografía es el mayor acierto de la película.', 1], ['El final se siente apresurado y deja cabos sueltos.', 1], ['Los diálogos suenan naturales y muy colombianos.', 1], ['Es una novela imprescindible para entender la época.', 1], ['El ritmo decae a mitad del libro.', 1] ] },
  ],

  // La ponencia y la relatoría
  g10u3l2: [
    { game: 'truefalse', title: '¿Buena práctica oral?', time: 60, lives: 3, items: [
      { s: 'Leer todas las diapositivas palabra por palabra.', a: false, e: 'Las diapositivas apoyan; la ponencia se dice, no se lee.' },
      { s: 'Mirar al público y repartir la mirada por todo el auditorio.', a: true, e: 'El contacto visual mantiene la atención.' },
      { s: 'Hacer una pausa antes de una idea importante.', a: true, e: 'La pausa prepara al público y da énfasis.' },
      { s: 'Pasarse del tiempo asignado porque el tema es interesante.', a: false, e: 'Respetar el tiempo es respetar a los demás ponentes.' },
      { s: 'Presentar el tema y el propósito al comenzar.', a: true, e: 'La introducción orienta al público.' },
      { s: 'Llenar cada diapositiva con párrafos largos.', a: false, e: 'Pocas palabras, imágenes y gráficas funcionan mejor.' },
      { s: 'Cerrar retomando la tesis y abrir espacio para preguntas.', a: true, e: 'La conclusión da unidad y las preguntas abren el diálogo.' },
      { s: 'En la relatoría, cambiar lo que dijo un ponente si uno no está de acuerdo.', a: false, e: 'La relatoría es fiel; la opinión del relator va aparte y señalada.' },
      { s: 'Hablar hacia el tablero, de espaldas al público.', a: false, e: 'Se pierde el volumen y la conexión con el auditorio.' },
      { s: 'Ensayar en voz alta y cronometrar la exposición.', a: true, e: 'Ensayar permite ajustar el tiempo y el ritmo.' } ] },
    { game: 'order', title: 'Estructura de la ponencia', time: 90, rounds: [
      { prompt: 'Ordena las partes de la ponencia', items: ['Saludo y presentación', 'Introducción: tema y propósito', 'Desarrollo: ideas con datos y ejemplos', 'Conclusión: se retoma la tesis', 'Preguntas del público'] },
      { prompt: 'Ordena esta ponencia sobre la biblioteca del barrio', items: ['Buenos días. Soy Laura Gómez, de grado décimo.', 'Hoy quiero demostrar que la biblioteca del barrio es un derecho, no un lujo.', 'Primero, es el único lugar con internet gratis de la zona.', 'Segundo, sus talleres de lectura reúnen a niños y abuelos cada sábado.', 'Por eso, defender la biblioteca es defender a la comunidad. Quedo atenta a sus preguntas.'] },
      { prompt: 'Ordena el trabajo del relator', items: ['Escuchar y tomar notas de cada ponente', 'Anotar las preguntas y los acuerdos', 'Redactar la síntesis fiel de la sesión', 'Agregar al final una reflexión propia señalada como tal', 'Leer o entregar la relatoría'] } ] },
  ],

  // Revisar y corregir
  g10u3l3: [
    { game: 'hunter', title: 'Cazador de errores', time: 90, rounds: [
      { clue: 'Toca las palabras con error de tilde en el menú', text: 'Hoy [[tenémos]] sancocho, [[arróz]] con coco y jugo de [[maracuya]]. Pregunte por el [[menu]] del día.' },
      { clue: 'Toca los errores de concordancia', text: 'Los resultados de la encuesta [[fue publicado]] ayer. Las calles del centro están [[sucio]] y los andenes, [[rota]]. [[Hubieron]] muchas quejas.' },
      { clue: 'Toca las palabras mal escritas en el aviso', text: 'Se [[bende]] lote junto a la vía. [[Aber]] si se anima: [[hay]] le dejo el número. [[Llamé]] ya.' },
      { clue: 'Toca las palabras a las que les falta la tilde diacrítica', text: 'Pregúntale a Juan si [[el]] viene. Yo no [[se]], pero su mamá dice que [[si]]. A [[mi]] me da igual; [[tu]] decides.' } ] },
    { game: 'tildes', title: 'Lluvia de tildes', time: 60, lives: 3, words: [
      { w: 'examenes', a: 'exámenes' }, { w: 'examen', a: 'examen' }, { w: 'jovenes', a: 'jóvenes' }, { w: 'joven', a: 'joven' },
      { w: 'caracter', a: 'carácter' }, { w: 'caracteres', a: 'caracteres' }, { w: 'pais', a: 'país' }, { w: 'raiz', a: 'raíz' },
      { w: 'arroz', a: 'arroz' }, { w: 'maracuya', a: 'maracuyá' }, { w: 'menu', a: 'menú' }, { w: 'tenemos', a: 'tenemos' },
      { w: 'fue', a: 'fue' }, { w: 'Ibague', a: 'Ibagué' }, { w: 'Quibdo', a: 'Quibdó' }, { w: 'heroe', a: 'héroe' } ] },
  ],
};

export const UNIT_GAMES_G10 = {
  g10u1: { game: 'memory', title: 'Parejas de la literatura española', pairs: [
    ['Cantar de mio Cid', 'Edad Media'], ['Garcilaso de la Vega', 'Renacimiento'], ['Don Quijote', 'Barroco'], ['Rimas de Bécquer', 'Romanticismo'],
    ['Fortunata y Jacinta', 'Realismo'], ['Rubén Darío', 'Modernismo'], ['Romancero gitano', 'Generación del 27'], ['Las meninas', 'Velázquez'] ] },
  g10u2: { game: 'blitz', title: 'Contrarreloj tipo Saber', time: 120, lives: 3, quizFrom: 'unit', extraItems: [
    { q: '"El alcalde anunció que el parque abrirá en junio." ¿Qué pregunta literal responde?', o: ['¿Por qué se abre el parque?', '¿Cuándo abrirá el parque?', '¿Es buena idea el parque?', '¿Quién pagó el parque?'], a: 1, e: '"En junio" responde cuándo: es un dato explícito.', lv: 'L' },
    { q: '"Pedro llegó empapado y dejó el paraguas roto en la entrada." ¿Qué se infiere?', o: ['Que hacía sol', 'Que llovía y el paraguas no lo protegió', 'Que Pedro no tiene paraguas', 'Que la entrada estaba mojada antes'], a: 1, e: 'Empapado más paraguas roto: llovía y el paraguas falló.', lv: 'I' },
    { q: 'En "Qué maravilla: otra vez sin agua en el barrio", ¿qué recurso usa el autor?', o: ['Dato estadístico', 'Ironía', 'Cita de autoridad', 'Pregunta literal'], a: 1, e: 'Dice "maravilla" para expresar lo contrario: es ironía.', lv: 'I' },
    { q: 'Un texto concluye: "Como mi primo reprobó, el examen es imposible". ¿Qué falla tiene?', o: ['Ninguna', 'Generaliza a partir de un solo caso', 'Usa demasiados datos', 'Cita una fuente confiable'], a: 1, e: 'Un caso no basta para una conclusión general.', lv: 'C' },
    { q: '¿Qué es lo primero que se revisa en una gráfica para saber de dónde salen los datos?', o: ['Los colores', 'La fuente', 'El tamaño', 'El título en mayúsculas'], a: 1, e: 'La fuente permite verificar la información.', lv: 'L' },
    { q: 'Una columna usa "vergonzoso", "sin duda" y "a mi juicio". ¿Qué tipo de texto es probablemente?', o: ['Una noticia', 'Un texto de opinión', 'Una tabla', 'Un manual de instrucciones'], a: 1, e: 'Las marcas de valoración y certeza son propias de la opinión.', lv: 'I' },
    { q: 'Dos gráficas muestran los mismos datos, pero una tiene el eje desde cero y la otra no. ¿Cuál representa mejor las diferencias?', o: ['La que tiene el eje desde cero', 'La que no empieza en cero', 'Las dos igual', 'Ninguna'], a: 0, e: 'Un eje desde cero muestra las diferencias en su verdadera proporción.', lv: 'C' } ] },
  g10u3: { game: 'tildes', title: 'Lluvia de tildes: nivel experto', time: 90, lives: 3, words: [
    { w: 'regimen', a: 'régimen' }, { w: 'regimenes', a: 'regímenes' }, { w: 'especimen', a: 'espécimen' }, { w: 'especimenes', a: 'especímenes' },
    { w: 'caracter', a: 'carácter' }, { w: 'caracteres', a: 'caracteres' }, { w: 'oir', a: 'oír' }, { w: 'reir', a: 'reír' },
    { w: 'baul', a: 'baúl' }, { w: 'buho', a: 'búho' }, { w: 'raices', a: 'raíces' }, { w: 'guion', a: 'guion' },
    { w: 'truhan', a: 'truhan' }, { w: 'torax', a: 'tórax' }, { w: 'biceps', a: 'bíceps' }, { w: 'ciempies', a: 'ciempiés' },
    { w: 'decimoseptimo', a: 'decimoséptimo' }, { w: 'compramelo', a: 'cómpramelo' }, { w: 'dandoselo', a: 'dándoselo' }, { w: 'huesped', a: 'huésped' },
    { w: 'Tulua', a: 'Tuluá' }, { w: 'Cucuta', a: 'Cúcuta' }, { w: 'Medellin', a: 'Medellín' }, { w: 'resumen', a: 'resumen' } ] },
};
