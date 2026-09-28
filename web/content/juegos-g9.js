// Minijuegos del grado 9°: dos por lección ("Juega") y el reto de cada unidad (formato en lib/SPEC.md).
export const LESSON_GAMES_G9 = {

  // El boom y el realismo mágico
  g9u1l1: [
    { game: 'rosco', title: 'El rosco del boom', time: 180, items: [
      { l: 'A', q: 'Empieza por A: pueblo del Magdalena donde nació García Márquez.', a: 'Aracataca' },
      { l: 'B', q: 'Empieza por B: nombre del fenómeno de los años sesenta y setenta en que el mundo leyó novelas latinoamericanas.', a: 'boom' },
      { l: 'C', q: 'Empieza por C: apellido del escritor cubano que habló de "lo real maravilloso".', a: 'Carpentier' },
      { l: 'E', q: 'Empieza por E: Isabel Allende escribió "La casa de los…".', a: 'espíritus' },
      { l: 'F', q: 'Empieza por F: género que inventa un mundo distinto al nuestro, con elfos y dragones.', a: 'fantasía' },
      { l: 'G', q: 'Empieza por G: país de Miguel Ángel Asturias, autor de "Hombres de maíz".', a: 'Guatemala' },
      { l: 'H', q: 'Empieza por H: en Macondo hay guerras civiles, una compañía bananera y una…', a: 'huelga' },
      { l: 'L', q: 'Empieza por L: lo que cae en Macondo durante casi cinco años.', a: 'lluvia' },
      { l: 'M', q: 'Empieza por M: pueblo imaginario de "Cien años de soledad".', a: 'Macondo' },
      { l: 'N', q: 'Empieza por N: premio de literatura que García Márquez recibió en 1982.', a: 'Nobel' },
      { l: 'P', q: 'Empieza por P: país de Mario Vargas Llosa.', a: 'Perú' },
      { l: 'R', q: 'Empieza por R: apellido del mexicano que escribió "Pedro Páramo" en 1955.', a: 'Rulfo' },
      { l: 'S', q: 'Empieza por S: en el realismo mágico, el narrador cuenta lo extraordinario sin…', a: 'sorpresa' },
      { l: 'V', q: 'Empieza por V: primer apellido del autor de "La ciudad y los perros".', a: 'Vargas' },
      { l: 'Z', q: 'Contiene la Z: apellido del argentino que escribió "Rayuela".', a: 'Cortázar' } ] },
    { game: 'emoji', title: 'Emojiadivina del boom', time: 90, lives: 3, items: [
      { e: '💯📅🧍', q: '¿Qué novela es?', o: ['Cien años de soledad', 'Rayuela', 'Pedro Páramo', 'La ciudad y los perros'], a: 0, x: 'Cien (💯) años (📅) de soledad (🧍): García Márquez, 1967.' },
      { e: '🏙️🐕🐕', q: '¿Qué novela es?', o: ['La casa de los espíritus', 'La ciudad y los perros', 'Hombres de maíz', 'Rayuela'], a: 1, x: 'La ciudad y los perros, de Mario Vargas Llosa (Perú, 1963).' },
      { e: '👨👨🌽', q: '¿Qué novela es?', o: ['Pedro Páramo', 'El reino de este mundo', 'Hombres de maíz', 'Cien años de soledad'], a: 2, x: 'Hombres de maíz, de Miguel Ángel Asturias (Guatemala, 1949), con mitos mayas.' },
      { e: '🏠👻👻', q: '¿Qué novela es?', o: ['La casa de los espíritus', 'La muerte de Artemio Cruz', 'Rayuela', 'La ciudad y los perros'], a: 0, x: 'La casa de los espíritus, de Isabel Allende (Chile, 1982).' },
      { e: '👑🌍', q: '¿Qué novela es?', o: ['Hombres de maíz', 'Pedro Páramo', 'Cien años de soledad', 'El reino de este mundo'], a: 3, x: 'El reino de este mundo, de Alejo Carpentier (Cuba, 1949).' },
      { e: '💀✝️', q: '¿Qué novela es?', o: ['La muerte de Artemio Cruz', 'La casa de los espíritus', 'Rayuela', 'Hombres de maíz'], a: 0, x: 'La muerte (💀) de Artemio Cruz (✝️), de Carlos Fuentes (México, 1962).' },
      { e: '🌧️🌧️⏳', q: '¿Qué pasa en Macondo?', o: ['Nieva un solo día', 'Llueve durante casi cinco años', 'Hay un terremoto', 'Llega un dragón'], a: 1, x: 'Llueve casi cinco años, y el narrador lo cuenta sin asombro.' },
      { e: '👧🛏️⬆️☁️', q: '¿Qué escena de "Cien años de soledad" es?', o: ['Una muchacha se duerme', 'Una muchacha viaja en avión', 'Una muchacha sube al cielo mientras dobla sábanas', 'Una muchacha lava la ropa en el río'], a: 2, x: 'Lo mágico ocurre en medio de una tarea de la casa: realismo mágico.' },
      { e: '🐉🧝🏰', q: '¿Qué es: realismo mágico o fantasía?', o: ['Realismo mágico', 'Fantasía', 'Noticia', 'Ensayo'], a: 1, x: 'Un mundo inventado con reglas propias es fantasía.' },
      { e: '🏅📚🇨🇴', q: '¿Qué recibió García Márquez en 1982?', o: ['Un Mundial', 'Un Óscar', 'El Premio Nobel de Literatura', 'Un Grammy'], a: 2, x: 'Fue el primer colombiano en ganar el Nobel de Literatura.' } ] },
  ],

  // Del libro a la pantalla
  g9u1l2: [
    { game: 'sorter', title: '¿Recurso literario o de cine?', bins: ['Literario', 'Cinematográfico'], time: 60, items: [
      ['Metáfora', 0], ['Narrador omnisciente', 0], ['Capítulo', 0], ['Monólogo interior escrito', 0], ['Descripción con adjetivos', 0], ['Hipérbole', 0], ['Párrafo', 0],
      ['Primer plano', 1], ['Plano general', 1], ['Banda sonora', 1], ['Montaje', 1], ['Voz en off', 1], ['Fundido a negro', 1], ['Movimiento de cámara', 1] ] },
    { game: 'order', title: 'Arma el guion gráfico', time: 90, rounds: [
      { prompt: 'Ordena los cuadros para el comienzo de la historia', items: ['Plano general: el pelotón frente a un muro', 'Primer plano: el rostro sereno del coronel', 'Fundido: la imagen se vuelve la de un niño', 'Plano medio: el padre y el niño ante un bloque de hielo', 'Plano detalle: la mano del niño toca el hielo'] },
      { prompt: 'Ordena los planos del más abierto al más cerrado', items: ['Plano general', 'Plano medio', 'Primer plano', 'Plano detalle'], labels: ['Todo el lugar', 'De la cintura hacia arriba', 'El rostro', 'Un objeto o una parte'] },
      { prompt: 'Ordena el proceso de una adaptación', items: ['Leer la obra y elegir las escenas', 'Escribir el guion', 'Dibujar el guion gráfico', 'Rodar las escenas', 'Montar y agregar la música'] },
      { prompt: 'Ordena la escena de la lluvia', items: ['Plano general: nubes negras sobre Macondo', 'Plano medio: la familia mira por la ventana', 'Montaje: el calendario pasa meses y años', 'Primer plano: Úrsula, envejecida, sigue esperando'] } ] },
  ],

  // El lenguaje literario
  g9u1l3: [
    { game: 'crucigrama', title: 'Crucigrama de figuras', time: 240, words: [
      { w: 'metáfora', h: 'Dice que una cosa ES otra, sin "como": "el río es una culebra de plata".' },
      { w: 'símil', h: 'Compara dos cosas con "como": "lento como una tarde de domingo".' },
      { w: 'hipérbole', h: 'Exagera para expresar emoción: "te lo he dicho un millón de veces".' },
      { w: 'anáfora', h: 'Repite palabras al inicio de versos o frases para crear ritmo.' },
      { w: 'antítesis', h: 'Enfrenta ideas opuestas: "tú ríes en la fiesta y yo lloro en la esquina".' },
      { w: 'personificación', h: 'Da acciones humanas a lo que no es humano: "el reloj se burlaba".' },
      { w: 'anticipación', h: 'Adelanta un hecho del futuro, como el comienzo de "Cien años de soledad".' },
      { w: 'efecto', h: 'Lo que el lenguaje literario busca producir en quien lee.' } ] },
    { game: 'catcher', title: 'Atrapa el lenguaje literario', rule: 'Atrapa solo las frases con lenguaje literario', time: 45, lives: 3,
      good: ['La luna era una moneda de plata', 'El viento cantaba en las tejas', 'Lloré un río entero', 'Dormía como una piedra', 'Una noche, una noche toda llena de perfumes', 'La ciudad se despertó bostezando', 'Tu risa es mi verano', 'Es tan alto que toca las nubes'],
      bad: ['El bus sale a las seis', 'La tienda cierra los domingos', 'Compré tres panes', 'Mañana hay examen de química', 'El agua hierve a 100 °C al nivel del mar', 'La reunión es en el salón 204', 'Bogotá es la capital de Colombia'] },
  ],

  // Tesis, argumentos y conclusión
  g9u2l1: [
    { game: 'conecta', title: 'Une cada pieza con su trampa o su función', time: 150, pairs: [
      ['Tesis', 'La idea que el autor defiende'], ['Argumento', 'La razón que responde "¿por qué?"'],
      ['Conclusión', 'Retoma la tesis al final'], ['Contraargumento', 'Lo que diría quien piensa distinto'],
      ['Ad hominem', 'Ataca a la persona y no a su idea'], ['Hombre de paja', 'Deforma la postura contraria'],
      ['Apelación a la mayoría', '"Todos lo hacen, así que está bien"'], ['Generalización apresurada', 'Saca una regla de uno o dos casos'],
      ['Falso dilema', 'Muestra solo dos opciones cuando hay más'], ['Pendiente resbaladiza', 'Encadena consecuencias exageradas'] ] },
    { game: 'builder', title: 'Arma el argumento', time: 150, targets: [
      { prompt: 'Arma: tesis + conector + argumento', pieces: ['El colegio debería tener huerta', 'porque', 'enseña de dónde vienen los alimentos', 'sin embargo'], answers: [['El colegio debería tener huerta', 'porque', 'enseña de dónde vienen los alimentos']] },
      { prompt: 'Arma: tesis + conector + argumento', pieces: ['Bogotá necesita más ciclovías', 'ya que', 'la bicicleta no contamina el aire', 'en conclusión'], answers: [['Bogotá necesita más ciclovías', 'ya que', 'la bicicleta no contamina el aire']] },
      { prompt: 'Arma: tesis + conector + argumento', pieces: ['El celular debe guardarse en clase', 'dado que', 'las notificaciones interrumpen la concentración', 'porque sí'], answers: [['El celular debe guardarse en clase', 'dado que', 'las notificaciones interrumpen la concentración']] },
      { prompt: 'Arma: argumento + ejemplo', pieces: ['El celular sirve para aprender;', 'por ejemplo,', '9.° B grabó un experimento de química', 'en conclusión,'], answers: [['El celular sirve para aprender;', 'por ejemplo,', '9.° B grabó un experimento de química']] },
      { prompt: 'Arma la conclusión', pieces: ['En conclusión,', 'guardar el celular', 'cuida la atención', 'porque'], answers: [['En conclusión,', 'guardar el celular', 'cuida la atención']] } ] },
  ],

  // El debate
  g9u2l2: [
    { game: 'truefalse', title: '¿Respeta el turno?', time: 60, lives: 3, items: [
      { s: 'Esperar a que el moderador dé la palabra es parte de respetar el turno.', a: true, e: 'El moderador organiza quién habla y cuándo.' },
      { s: 'Interrumpir al otro equipo muestra que tienes mejores argumentos.', a: false, e: 'Interrumpir rompe las reglas y no prueba nada.' },
      { s: 'Tomar nota mientras habla el otro equipo ayuda a preparar la réplica.', a: true, e: 'Para responder a sus argumentos hay que escucharlos.' },
      { s: 'Si se acaba tu tiempo, puedes seguir hablando si lo que dices es importante.', a: false, e: 'Cumplir el tiempo es respetar el turno de los demás.' },
      { s: 'En la réplica se responde a los argumentos, no a la persona.', a: true, e: 'Se discuten ideas, no personas.' },
      { s: 'Burlarse del acento de un compañero es una réplica válida.', a: false, e: 'Es un ataque personal y un prejuicio lingüístico.' },
      { s: 'Decir "Entiendo tu punto, pero los datos muestran otra cosa" es una réplica respetuosa.', a: true, e: 'Reconoce al otro y responde con pruebas.' },
      { s: 'Gritar más fuerte que el otro equipo te da la razón.', a: false, e: 'El volumen no reemplaza a los argumentos.' },
      { s: 'El moderador debe tomar partido por el equipo que le cae mejor.', a: false, e: 'El moderador es imparcial.' },
      { s: 'Llegar a un acuerdo al final del debate puede ser un buen resultado.', a: true, e: 'El propósito es pensar mejor juntos.' } ] },
    { game: 'duelo', title: 'Réplica rápida', time: 90, lives: 3, items: [
      { s: 'El metro elevado es más barato y se construye más rápido que uno subterráneo.', ok: true, e: 'Es un argumento con un dato comprobable.' },
      { s: 'Tu propuesta no sirve porque tú ni siquiera usas TransMilenio.', ok: false, f: 'Ad hominem', e: 'Descalifica a la persona en vez de responder el argumento.' },
      { s: 'O hacemos el metro elevado ya o Bogotá nunca tendrá metro.', ok: false, f: 'Falso dilema', e: 'Presenta solo dos opciones cuando hay más.' },
      { s: 'Todo el mundo en redes dice que el metro subterráneo es mejor, así que lo es.', ok: false, f: 'Apelación a la mayoría', e: 'La popularidad no es una prueba.' },
      { s: 'Un metro subterráneo afecta menos el paisaje de las avenidas, como se ve en otras ciudades.', ok: true, e: 'Es una razón con ejemplo comparativo.' },
      { s: 'Un famoso cantante dijo que el elevado es mejor; entonces es mejor.', ok: false, f: 'Apelación a la autoridad', e: 'Un cantante no es experto en ingeniería de transporte.' },
      { s: 'Si aprueban el elevado, después harán autopistas sobre todos los parques y la ciudad será de cemento.', ok: false, f: 'Pendiente resbaladiza', e: 'Exagera una cadena de consecuencias sin pruebas.' },
      { s: 'Piensen en los niños que llorarán cada día por el ruido del metro.', ok: false, f: 'Apelación a la emoción', e: 'Busca conmover en lugar de dar datos sobre el ruido.' },
      { s: 'Los estudios de ruido muestran que las barreras acústicas reducen el impacto en las casas vecinas.', ok: true, e: 'Responde a una objeción con información técnica.' },
      { s: '¿Ya dejaste de defender ese metro tan feo?', ok: false, f: 'Pregunta compleja', e: 'La pregunta da por hecho algo que no se ha probado.' } ] },
  ],

  // El ensayo corto
  g9u2l3: [
    { game: 'puente', title: 'Conectores argumentativos', time: 90, lives: 3, items: [
      { a: 'La ciclovía mejora la salud', b: 'reduce la contaminación', o: ['además', 'sin embargo', 'por ejemplo'], k: 0, e: 'Suma un segundo beneficio: adición.' },
      { a: 'Las ciclovías son útiles', b: 'algunos barrios no tienen ninguna', o: ['sin embargo', 'por lo tanto', 'además'], k: 0, e: 'Presenta una idea que se opone: contraste.' },
      { a: 'Muchos trabajadores van en bicicleta', b: 'hay menos carros en la hora pico', o: ['por lo tanto', 'aunque', 'en cambio'], k: 0, e: 'Expresa una consecuencia.' },
      { a: 'Hay ciudades con muchas ciclorrutas', b: 'Ámsterdam y Copenhague', o: ['por ejemplo', 'por lo tanto', 'no obstante'], k: 0, e: 'Introduce un ejemplo.' },
      { a: 'Llovió toda la mañana', b: 'la ciclovía estuvo llena', o: ['aun así', 'por eso', 'es decir'], k: 0, e: 'El resultado contradice lo esperado: concesión.' },
      { a: 'El proyecto es costoso', b: 'se paga con el ahorro en salud', o: ['no obstante', 'es decir', 'por ejemplo'], k: 0, e: 'Contrapone una idea a la anterior.' },
      { a: 'La ciclovía es un espacio público', b: 'es de todos los ciudadanos', o: ['es decir', 'sin embargo', 'aunque'], k: 0, e: 'Aclara o reformula la idea: explicación.' },
      { a: 'Revisamos todos los argumentos', b: 'Bogotá necesita más ciclovías', o: ['en conclusión', 'por ejemplo', 'en cambio'], k: 0, e: 'Cierra el texto: conclusión.' },
      { a: 'La bicicleta no contamina', b: 'el carro sí', o: ['en cambio', 'por lo tanto', 'además'], k: 0, e: 'Compara dos ideas opuestas: contraste.' } ] },
    { game: 'corrector', title: 'Corrige el ensayo', time: 150, lives: 3, rounds: [
      { text: 'La ciclovía mejora la salud; {{además|sin embargo}}, reduce la contaminación. {{Por ejemplo|En conclusión}}, muchos trabajadores del sur ya llegan en bicicleta.', e: '"Además" suma un beneficio; "por ejemplo" introduce un caso concreto.' },
      { text: 'Las ciclovías son útiles; {{sin embargo|por lo tanto}}, algunos barrios no tienen ninguna. Llovió toda la mañana; {{aun así|por eso}}, la ciclovía estuvo llena.', e: 'Contraste con "sin embargo"; concesión con "aun así", porque el resultado va contra lo esperado.' },
      { text: 'La ciclovía es un espacio público, {{es decir|por ejemplo}}, es de todos. La bicicleta no contamina; el carro, {{en cambio|además}}, sí. Revisamos los argumentos. {{En conclusión|En primer lugar}}, Bogotá necesita más ciclovías.', e: '"Es decir" aclara, "en cambio" opone y "en conclusión" cierra.' },
      { text: 'La tesis va en la {{introducción|conclusión}}. Cada argumento necesita un {{ejemplo|título}} o un dato que lo pruebe. La conclusión retoma la tesis con {{otras|las mismas}} palabras.', e: 'Introducción con tesis, argumentos con pruebas y conclusión que retoma la tesis sin copiarla.' } ] },
  ],

  // Las variantes del español
  g9u3l1: [
    { game: 'memory', title: 'Expresión y región', pairs: [
      ['Sumercé', 'Boyacá y Cundinamarca'], ['Parce', 'Medellín'], ['¡Ajá!', 'Barranquilla y la Costa'], ['¡Oís, ve!', 'Cali'],
      ['¿Qué hubo, mano?', 'Santanderes'], ['Chirriado', 'Bogotá'], ['Mamar gallo', 'Costa Caribe'], ['Dar un borondo', 'Valle del Cauca'] ] },
    { game: 'sopa', title: 'Sopa de palabras regionales', size: 10, time: 180, words: [
      { w: 'sumercé', h: 'Trato respetuoso de Boyacá y Cundinamarca' },
      { w: 'parce', h: 'Amigo, en Medellín (y hoy en todo el país)' },
      { w: 'pelao', h: 'Muchacho, en la Costa Caribe' },
      { w: 'borondo', h: 'En Cali, dar un ___ es dar una vuelta' },
      { w: 'cholado', h: 'Postre frío de hielo y frutas, típico de Cali' },
      { w: 'chino', h: 'Niño, en Bogotá' },
      { w: 'onces', h: 'Lo que se toma por la tarde en Bogotá' },
      { w: 'charro', h: 'Chistoso, en Antioquia' } ] },
  ],

  // Noticias falsas y verificación
  g9u3l2: [
    { game: 'detective', title: 'Detective de noticias', cases: [
      { head: 'Bogotá quedará sin agua durante 30 días desde mañana', src: 'Cadena de WhatsApp', date: 'Sin fecha', clues: [{ t: 'La fuente es "un primo de un amigo"', bad: true }, { t: 'No aparece en la página de la Empresa de Acueducto', bad: true }, { t: 'Pide llenar ollas y reenviar', bad: true }], a: 2, e: 'Sin fuente, sin fecha y desmentida por la fuente oficial: es falsa.' },
      { head: 'IDEAM emite alerta naranja por lluvias en el Tolima', src: 'IDEAM, sitio oficial', date: '12 de abril', clues: [{ t: 'Publicada por la entidad oficial', bad: false }, { t: 'Tiene fecha y enlace al boletín', bad: false }, { t: 'La replican medios nacionales', bad: false }], a: 0, e: 'Fuente oficial, fecha y confirmación en otros medios: es confiable.' },
      { head: 'Así quedó Bogotá tras la granizada de ayer', src: 'Página de memes', date: 'Ayer', clues: [{ t: 'La búsqueda inversa muestra que la foto es de 2019', bad: true }, { t: 'Sí hubo granizada ayer, pero más leve', bad: false }, { t: 'No cita fuente', bad: true }], a: 1, e: 'Hubo granizada, pero la foto es de otra fecha: contenido engañoso.' },
      { head: 'Científicos confirman que comer arepa todos los días cura la gripa', src: 'Blog "Salud Natural Ya"', date: 'Sin fecha', clues: [{ t: 'No nombra a ningún científico ni estudio', bad: true }, { t: 'Promete una cura milagrosa', bad: true }, { t: 'El blog vende suplementos', bad: true }], a: 2, e: 'Afirmación sin pruebas y con interés comercial: falsa.' },
      { head: 'El 80 % de los jóvenes ya no lee', src: 'Titular de un portal', date: 'Este año', text: 'El estudio citado habla de libros impresos, no de lectura en general.', clues: [{ t: 'El estudio existe', bad: false }, { t: 'El estudio mide solo libros impresos', bad: true }, { t: 'El titular exagera la conclusión', bad: true }], a: 1, e: 'Parte de un dato real, pero lo deforma: engañosa.' },
      { head: 'La Registraduría publica el calendario de las elecciones', src: 'Registraduría Nacional', date: '3 de marzo', clues: [{ t: 'Publicado en la cuenta oficial verificada', bad: false }, { t: 'Coincide con lo que informan los medios', bad: false }], a: 0, e: 'Fuente oficial y verificable: confiable.' },
      { head: 'Video: un jaguar camina por la Séptima', src: 'Video viral en TikTok', date: 'Hoy', clues: [{ t: 'El video fue creado con inteligencia artificial', bad: true }, { t: 'Nadie en Bogotá lo reportó', bad: true }, { t: 'Las autoridades ambientales lo desmintieron', bad: true }], a: 2, e: 'El video es un montaje y el hecho nunca ocurrió: es falso.' },
      { head: 'Alcaldía anuncia ciclovía nocturna para el próximo jueves', src: 'Alcaldía de Bogotá', date: 'Hace 2 días', clues: [{ t: 'Aparece en el sitio oficial del IDRD', bad: false }, { t: 'Incluye horario y recorrido', bad: false }, { t: 'La replican emisoras locales', bad: false }], a: 0, e: 'Varias fuentes confiables coinciden: confiable.' } ] },
    { game: 'catcher', title: 'Atrapa las señales de alerta', rule: 'Atrapa solo las señales de alerta; deja pasar las señales de confianza', time: 45, lives: 3,
      good: ['¡¡URGENTE!!', 'Compártelo antes de que lo borren', 'Un amigo que trabaja en…', 'Sin fecha', 'Foto de otro año', 'Cura milagrosa', 'Datos imposibles de comprobar', 'Los medios lo callan'],
      bad: ['Fuente oficial con enlace', 'Fecha y autor', 'Otros medios lo confirman', 'Colombiacheck lo verificó', 'Datos que se pueden comprobar', 'Tono tranquilo', 'Cita el estudio original'] },
  ],

  // Símbolos que hablan
  g9u3l3: [
    { game: 'emoji', title: 'Emojiadivina de símbolos', time: 90, lives: 3, items: [
      { e: '🕊️', q: '¿Qué representa?', o: ['El correo', 'La paz', 'El viento', 'El invierno'], a: 1, x: 'La paloma blanca es símbolo de paz.' },
      { e: '⚖️', q: '¿Qué representa?', o: ['La justicia', 'El comercio', 'La química', 'La cocina'], a: 0, x: 'La balanza representa la justicia.' },
      { e: '♻️', q: '¿Qué representa?', o: ['Un giro a la derecha', 'La lluvia', 'El reciclaje', 'Un juego'], a: 2, x: 'Las flechas en círculo son el símbolo del reciclaje.' },
      { e: '⚕️', q: '¿Qué representa?', o: ['La magia', 'La medicina', 'Un zoológico', 'La agricultura'], a: 1, x: 'El bastón con una serpiente enrollada representa la medicina.' },
      { e: '🇨🇴', q: '¿Qué tipo de símbolo es?', o: ['Deportivo', 'Religioso', 'Científico', 'Cívico'], a: 3, x: 'La bandera representa al país: es un símbolo cívico.' },
      { e: '✡️', q: '¿Qué tipo de símbolo es?', o: ['Religioso', 'Cívico', 'Deportivo', 'Científico'], a: 0, x: 'La estrella de David representa al judaísmo.' },
      { e: '☢️', q: '¿Qué tipo de símbolo es?', o: ['Deportivo', 'Científico', 'Religioso', 'Cívico'], a: 1, x: 'El trébol amarillo y negro advierte radiactividad: símbolo científico.' },
      { e: '🟥⚽', q: '¿Qué tipo de símbolo es la tarjeta roja?', o: ['Cívico', 'Religioso', 'Deportivo', 'Científico'], a: 2, x: 'La tarjeta roja del árbitro es un símbolo deportivo.' },
      { e: '⚽👕💛', q: '¿Cómo llaman las crónicas a la Selección Colombia?', o: ['La celeste', 'La amarilla', 'La roja', 'La verde'], a: 1, x: 'Por el color de su camiseta: "la amarilla" o "la tricolor".' },
      { e: '🦅🛡️🇨🇴', q: '¿Qué ave aparece en el escudo de Colombia?', o: ['El colibrí', 'La paloma', 'El cóndor', 'El loro'], a: 2, x: 'El cóndor del escudo nacional es un símbolo cívico.' } ] },
    { game: 'word', title: 'Palabra secreta: símbolos', lives: 6, count: 6, words: [
      { w: 'SÍMBOLO', h: 'Signo cuyo significado se establece por acuerdo de una comunidad.' },
      { w: 'CONVENCIÓN', h: 'Acuerdo de una comunidad que da sentido a un símbolo.' },
      { w: 'CÍVICO', h: 'Tipo de símbolo que representa a un país o al Estado, como la bandera.' },
      { w: 'DEPORTIVO', h: 'Tipo de símbolo como los anillos olímpicos o la tarjeta roja.' },
      { w: 'RELIGIOSO', h: 'Tipo de símbolo como la cruz o la media luna.' },
      { w: 'CIENTÍFICO', h: 'Tipo de símbolo como π o H₂O.' },
      { w: 'BALANZA', h: 'Símbolo de la justicia.' },
      { w: 'PALOMA', h: 'Símbolo de la paz, si es blanca.' } ] },
  ],
};

export const UNIT_GAMES_G9 = {
  g9u1: { game: 'blitz', title: 'Contrarreloj latinoamericano', time: 90, lives: 3, quizFrom: 'unit', extraItems: [
    { q: '¿En qué pueblo nació Gabriel García Márquez?', o: ['Aracataca', 'Mompox', 'Ciénaga', 'Riohacha'], a: 0, e: 'Nació en Aracataca (Magdalena) en 1927.' },
    { q: '¿Quién escribió "Rayuela"?', o: ['Julio Cortázar', 'Carlos Fuentes', 'Juan Rulfo', 'Mario Vargas Llosa'], a: 0, e: 'Cortázar, argentino, la publicó en 1963.' },
    { q: '¿De qué país es Juan Rulfo, autor de "Pedro Páramo"?', o: ['Argentina', 'México', 'Perú', 'Cuba'], a: 1, e: 'Rulfo era mexicano; "Pedro Páramo" es de 1955.' },
    { q: 'En el guion gráfico, el plano que muestra todo el lugar es el…', o: ['Primer plano', 'Plano detalle', 'Plano general', 'Plano medio'], a: 2, e: 'El plano general sitúa al espectador en el espacio.' },
    { q: '"El río es una culebra de plata" es…', o: ['Símil', 'Metáfora', 'Hipérbole', 'Anáfora'], a: 1, e: 'Identifica sin nexo comparativo: metáfora.' },
    { q: 'Lo propio del realismo mágico es que lo extraordinario…', o: ['Aterroriza a todos', 'Se narra como algo cotidiano', 'Ocurre en otro planeta', 'Siempre es un sueño'], a: 1, e: 'El narrador no se asombra.' },
    { q: '¿Qué autor peruano publicó "La ciudad y los perros" en 1963?', o: ['Mario Vargas Llosa', 'Julio Cortázar', 'Alejo Carpentier', 'Carlos Fuentes'], a: 0, e: 'Vargas Llosa recibió el Nobel en 2010.' },
    { q: 'La voz de un narrador que se oye sobre las imágenes se llama…', o: ['Voz en off', 'Banda sonora', 'Montaje', 'Diálogo'], a: 0, e: 'La voz en off traduce al narrador del libro.' } ] },
  g9u2: { game: 'hunter', title: 'Cazador argumentativo', time: 120, rounds: [
    { clue: 'Toca los conectores que presentan un argumento', text: 'El uniforme debería ser opcional [[porque]] cada estudiante se sentiría más cómodo. Leer en papel ayuda, [[ya que]] se recuerda mejor. La huerta es útil, [[pues]] une la ciencia y la vida. Reciclar importa, [[dado que]] cuida el agua.' },
    { clue: 'Toca las falacias del debate', text: 'Moderadora: Tiene la palabra el equipo en contra. Andrés: [[Eso lo dices porque vives en el norte.]] Sara: Los estudios de ruido muestran que hay soluciones. Andrés: [[Un cantante famoso dijo que el elevado es feo.]] Sara: Entiendo tu punto, pero los datos muestran otra cosa. Andrés: [[O lo hacemos subterráneo o Bogotá se arruina.]]' },
    { clue: 'Toca los conectores de contraste y concesión', text: 'La ciclovía es útil; [[sin embargo]], algunos barrios no tienen ninguna. [[Aunque]] llovió, estuvo llena. Además, ayuda a la salud. La bicicleta no contamina; el carro, [[en cambio]], sí. Es costosa; [[no obstante]], ahorra en salud. Por lo tanto, conviene ampliarla.' },
    { clue: 'Toca los argumentos (las razones), no la tesis ni la conclusión', text: 'Bogotá debería tener más ciclovías. [[Cada bicicleta es un carro menos en la hora pico.]] [[Pedalear a diario es ejercicio gratuito.]] [[La bicicleta no contamina el aire.]] En conclusión, más ciclovías son una buena inversión.' } ] },
  g9u3: { game: 'rosco', title: 'El rosco de la lengua y la sociedad', time: 200, items: [
    { l: 'A', q: 'Empieza por A: escoger la variante que pide la situación, como un español estándar en una exposición.', a: 'adecuación', alt: ['adecuacion'] },
    { l: 'B', q: 'Empieza por B: símbolo de la justicia.', a: 'balanza' },
    { l: 'C', q: 'Empieza por C: medio colombiano que verifica afirmaciones y cadenas.', a: 'Colombiacheck' },
    { l: 'D', q: 'Empieza por D: variante de una lengua propia de una región.', a: 'dialecto' },
    { l: 'E', q: 'Empieza por E: noticia que parte de un hecho real, pero lo deforma.', a: 'engañosa' },
    { l: 'F', q: 'Empieza por F: pista que responde "¿quién lo dice?"; en las cadenas suele ser "un amigo que trabaja en…".', a: 'fuente' },
    { l: 'L', q: 'Empieza por L: conjunto de palabras propias de una región.', a: 'léxico' },
    { l: 'M', q: 'Empieza por M: en la Costa, "___ gallo" es bromear.', a: 'mamar' },
    { l: 'N', q: 'Contiene la N: acuerdo de una comunidad que da sentido a un símbolo.', a: 'convención' },
    { l: 'O', q: 'Empieza por O: lo que se toma por la tarde en Bogotá.', a: 'onces' },
    { l: 'P', q: 'Empieza por P: burlarse de cómo habla otra región es un ___ lingüístico.', a: 'prejuicio' },
    { l: 'R', q: 'Empieza por R: tipo de símbolo como la cruz, la estrella de David o la media luna.', a: 'religioso' },
    { l: 'S', q: 'Empieza por S: trato respetuoso típico de Boyacá y Cundinamarca.', a: 'sumercé' },
    { l: 'T', q: 'Empieza por T: pista que se revisa cuando un mensaje grita "¡URGENTE!".', a: 'tono' },
    { l: 'V', q: 'Empieza por V: comprobar una noticia en la fuente oficial antes de compartirla.', a: 'verificar' } ] },
};
