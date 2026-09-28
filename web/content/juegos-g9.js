// Minijuegos del grado 9°: dos por lección ("Juega") y el reto de cada unidad (formato en lib/SPEC.md).
export const LESSON_GAMES_G9 = {

  // El boom y el realismo mágico
  g9u1l1: [
    { game: 'memory', title: 'Autor, obra y país', pairs: [
      ['Gabriel García Márquez', 'Cien años de soledad (Colombia)'], ['Julio Cortázar', 'Rayuela (Argentina)'], ['Juan Rulfo', 'Pedro Páramo (México)'], ['Carlos Fuentes', 'La muerte de Artemio Cruz (México)'],
      ['Mario Vargas Llosa', 'La ciudad y los perros (Perú)'], ['Isabel Allende', 'La casa de los espíritus (Chile)'], ['Alejo Carpentier', 'El reino de este mundo (Cuba)'], ['Miguel Ángel Asturias', 'Hombres de maíz (Guatemala)'] ] },
    { game: 'truefalse', title: '¿Realismo mágico o fantasía?', time: 60, lives: 3, items: [
      { s: 'En el realismo mágico, los personajes se asombran y se asustan ante cada hecho extraordinario.', a: false, e: 'Lo propio del realismo mágico es que lo extraordinario se vive como algo normal.' },
      { s: 'Una historia con elfos y dragones en un reino inventado es realismo mágico.', a: false, e: 'Es fantasía: ocurre en un mundo inventado, no en una realidad reconocible.' },
      { s: 'Macondo está inspirado en Aracataca, el pueblo natal de García Márquez.', a: true, e: 'El autor nació allí en 1927 y convirtió ese mundo en Macondo.' },
      { s: 'En "Cien años de soledad" llueve durante casi cinco años.', a: true, e: 'Llueve cuatro años, once meses y dos días, y el narrador lo cuenta sin asombro.' },
      { s: 'El realismo mágico solo existe en la literatura colombiana.', a: false, e: 'Hay realismo mágico en Rulfo (México), Carpentier (Cuba), Allende (Chile) y muchos más.' },
      { s: 'Un abuelo que conversa cada tarde con su hermano muerto, sin que nadie se extrañe, es un rasgo de realismo mágico.', a: true, e: 'Lo sobrenatural convive con lo cotidiano sin sorpresa.' },
      { s: 'García Márquez recibió el Premio Nobel de Literatura en 1982.', a: true, e: 'Fue el primer colombiano en recibirlo.' },
      { s: 'En la fantasía, lo mágico suele tener reglas propias en un mundo distinto al nuestro.', a: true, e: 'La fantasía construye mundos nuevos; el realismo mágico parte del nuestro.' },
      { s: '"Pedro Páramo" se publicó después de "Cien años de soledad".', a: false, e: '"Pedro Páramo" es de 1955, doce años antes: fue un precursor.' },
      { s: 'El boom fue un fenómeno de los años sesenta y setenta.', a: true, e: 'En esas décadas la novela latinoamericana se leyó en todo el mundo.' } ] },
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
    { game: 'catcher', title: 'Atrapa el lenguaje literario', rule: 'Atrapa solo las frases con lenguaje literario', time: 45, lives: 3,
      good: ['La luna era una moneda de plata', 'El viento cantaba en las tejas', 'Lloré un río entero', 'Dormía como una piedra', 'Una noche, una noche toda llena de perfumes', 'La ciudad se despertó bostezando', 'Tu risa es mi verano', 'Es tan alto que toca las nubes'],
      bad: ['El bus sale a las seis', 'La tienda cierra los domingos', 'Compré tres panes', 'Mañana hay examen de química', 'El agua hierve a 100 °C al nivel del mar', 'La reunión es en el salón 204', 'Bogotá es la capital de Colombia'] },
    { game: 'blitz', title: 'Figura y efecto', time: 60, lives: 3, items: [
      { q: '"Sus ojos eran dos luceros" es…', o: ['Símil', 'Metáfora', 'Anáfora', 'Antítesis'], a: 1, e: 'Identifica ojos con luceros sin nexo comparativo.' },
      { q: '"Fuerte como un roble" es…', o: ['Símil', 'Hipérbole', 'Metáfora', 'Personificación'], a: 0, e: 'Compara usando "como".' },
      { q: '"El reloj se burlaba de mi espera" es…', o: ['Anáfora', 'Personificación', 'Símil', 'Antítesis'], a: 1, e: 'Un objeto hace algo humano: burlarse.' },
      { q: '"Tengo tanta hambre que me comería una vaca" busca…', o: ['Dar un dato exacto', 'Exagerar para expresar intensidad', 'Comparar con "como"', 'Repetir un sonido'], a: 1, e: 'La hipérbole exagera para intensificar.' },
      { q: '"Tú ríes en la fiesta y yo lloro en la esquina" usa…', o: ['Antítesis', 'Anáfora', 'Hipérbole', 'Símil'], a: 0, e: 'Enfrenta ideas opuestas: reír y llorar, fiesta y esquina.' },
      { q: 'Repetir "Una noche" al comienzo de varios versos es…', o: ['Metáfora', 'Anáfora', 'Hipérbole', 'Personificación'], a: 1, e: 'La anáfora repite palabras al inicio y crea ritmo.' },
      { q: '¿Qué efecto suele buscar la personificación?', o: ['Dar vida y cercanía a lo que no es humano', 'Dar datos exactos', 'Ordenar ideas', 'Eliminar la emoción'], a: 0, e: 'Al humanizar un objeto o un paisaje, el lector lo siente vivo.' },
      { q: '"Muchos años después, frente al pelotón…" es un ejemplo de…', o: ['Anticipación', 'Rima asonante', 'Hipérbole', 'Onomatopeya'], a: 0, e: 'El narrador adelanta un hecho del futuro para crear intriga.' },
      { q: '"Mi corazón es un tambor en fiesta" es…', o: ['Símil', 'Metáfora', 'Antítesis', 'Anáfora'], a: 1, e: 'Identifica el corazón con un tambor sin nexo comparativo.' } ] },
  ],

  // Tesis, argumentos y conclusión
  g9u2l1: [
    { game: 'sorter', title: '¿Tesis o argumento?', bins: ['Tesis', 'Argumento'], time: 60, items: [
      ['El colegio debería tener huerta escolar.', 0], ['Bogotá necesita más ciclovías.', 0], ['El uniforme debería ser opcional.', 0], ['Las tareas en vacaciones deberían eliminarse.', 0], ['Leer en papel es mejor que leer en pantalla.', 0],
      ['porque la huerta enseña de dónde vienen los alimentos.', 1], ['ya que la bicicleta no contamina el aire.', 1], ['pues cada estudiante se sentiría más cómodo.', 1], ['porque el descanso también es parte del aprendizaje.', 1], ['dado que en papel se recuerda mejor lo leído, según varios estudios.', 1] ] },
    { game: 'duelo', title: 'Duelo de argumentos', time: 90, lives: 3, items: [
      { s: 'Deberíamos guardar el celular en clase, porque las notificaciones interrumpen la concentración.', ok: true, e: 'Da una razón relacionada con la tesis.' },
      { s: 'Todos los colegios del mundo prohíben el celular, así que nosotros también.', ok: false, f: 'Apelación a la mayoría', e: 'Que muchos lo hagan no prueba que sea correcto (y además es falso).' },
      { s: 'No le hagas caso a Juan sobre el celular: siempre saca malas notas.', ok: false, f: 'Ad hominem', e: 'Ataca a la persona, no a su argumento.' },
      { s: 'O prohibimos el celular del todo o el colegio se vuelve un caos.', ok: false, f: 'Falso dilema', e: 'Hay opciones intermedias, como usarlo solo con guía del profesor.' },
      { s: 'Si dejamos usar el celular en el descanso, pronto lo usarán en exámenes, después nadie estudiará y el colegio cerrará.', ok: false, f: 'Pendiente resbaladiza', e: 'Encadena consecuencias exageradas sin pruebas.' },
      { s: 'Un informe de la Unesco de 2023 recomendó restringir los celulares que no apoyan el aprendizaje.', ok: true, e: 'Cita una fuente reconocida y pertinente.' },
      { s: 'Mi primo usó el celular en clase y perdió el año; el celular hace perder el año.', ok: false, f: 'Generalización apresurada', e: 'Un solo caso no permite sacar una regla general.' },
      { s: 'Con el celular podemos grabar experimentos y analizarlos después, como hicimos en química.', ok: true, e: 'Un argumento apoyado en un ejemplo concreto.' },
      { s: 'Los que defienden el celular quieren que los estudiantes jueguen todo el día.', ok: false, f: 'Hombre de paja', e: 'Deforma la postura contraria para atacarla con facilidad.' },
      { s: 'Desde que llegó el celular bajaron las notas; entonces el celular es la causa.', ok: false, f: 'Falsa causa', e: 'Que algo ocurra después no prueba que sea su causa.' } ] },
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
    { game: 'order', title: 'Ordena el ensayo', time: 90, rounds: [
      { prompt: 'Ordena las partes del ensayo', items: ['Introducción', 'Desarrollo', 'Conclusión'], labels: ['Tema y tesis', 'Argumentos', 'Retoma la tesis'] },
      { prompt: 'Ordena el ensayo sobre las ciclovías', items: ['Bogotá debería tener más ciclovías, porque la bicicleta mejora la movilidad y la salud.', 'En primer lugar, cada persona en bicicleta es un carro menos en la hora pico.', 'Además, pedalear a diario es ejercicio gratuito.', 'Algunos dirán que se quitan carriles a los carros; sin embargo, la vía mueve más personas.', 'En conclusión, más ciclovías son una inversión en una ciudad más sana.'] },
      { prompt: 'Ordena los pasos para escribir un ensayo', items: ['Elegir el tema y la postura', 'Escribir la tesis', 'Planear los argumentos y ejemplos', 'Escribir el borrador', 'Revisar y corregir'] },
      { prompt: 'Ordena el párrafo de desarrollo', items: ['En primer lugar, la huerta escolar enseña de dónde vienen los alimentos.', 'Por ejemplo, en 7.° sembramos cilantro y lo usamos en el restaurante escolar.', 'Por lo tanto, aprender en la huerta une la ciencia con la vida diaria.'] } ] },
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
  ],

  // Las variantes del español
  g9u3l1: [
    { game: 'memory', title: 'Expresión y región', pairs: [
      ['Sumercé', 'Boyacá y Cundinamarca'], ['Parce', 'Medellín'], ['¡Ajá!', 'Barranquilla y la Costa'], ['¡Oís, ve!', 'Cali'],
      ['¿Qué hubo, mano?', 'Santanderes'], ['Chirriado', 'Bogotá'], ['Mamar gallo', 'Costa Caribe'], ['Dar un borondo', 'Valle del Cauca'] ] },
    { game: 'catcher', title: 'Atrapa los bogotanismos', rule: 'Atrapa solo las expresiones típicas de Bogotá y el altiplano', time: 45, lives: 3,
      good: ['Sumercé', '¡Qué chirriado!', '¡Ala!', 'Chino (niño)', 'Tomar onces', '¡Qué boleta!', '¡Qué chicharrón! (problema)', 'Changua al desayuno'],
      bad: ['Parce', '¡Avemaría, pues!', '¡Ajá!', 'Pelao', '¡Oís, ve!', 'Dar un borondo', 'Mamar gallo', '¡Erda!'] },
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
    { game: 'truefalse', title: '¿Verificado o falso?', time: 60, lives: 3, items: [
      { s: 'Si una noticia tiene foto, es verdadera.', a: false, e: 'Las fotos se pueden sacar de contexto o manipular.' },
      { s: 'La búsqueda inversa de imágenes sirve para saber de dónde salió una foto.', a: true, e: 'Muestra dónde y cuándo se publicó antes.' },
      { s: 'Colombiacheck es un medio dedicado a verificar información.', a: true, e: 'Revisa afirmaciones y cadenas que circulan en el país.' },
      { s: 'Si muchos amigos la compartieron, la noticia es cierta.', a: false, e: 'La cantidad de reenvíos no prueba nada.' },
      { s: 'Revisar la fecha ayuda a detectar noticias viejas presentadas como nuevas.', a: true, e: 'Muchas cadenas reciclan hechos de hace años.' },
      { s: '"Compártelo antes de que lo borren" es una señal de alerta.', a: true, e: 'La urgencia busca que no verifiques.' },
      { s: 'Una noticia engañosa siempre es totalmente inventada.', a: false, e: 'A veces parte de un hecho real y lo deforma.' },
      { s: 'Si no puedo verificar una noticia, lo mejor es no compartirla.', a: true, e: 'Así se corta la cadena de desinformación.' },
      { s: 'El tono alarmista es típico del periodismo serio.', a: false, e: 'El periodismo serio informa con datos y fuentes, sin gritar.' },
      { s: 'Buscar la noticia en la página oficial de la entidad es una forma de verificarla.', a: true, e: 'La fuente original confirma o desmiente.' } ] },
  ],

  // Símbolos que hablan
  g9u3l3: [
    { game: 'memory', title: 'Símbolo y significado', pairs: [
      ['🇨🇴', 'Bandera de Colombia'], ['♻️', 'Reciclaje'], ['☢️', 'Radiactividad'], ['π', 'Número pi'],
      ['⚖️', 'Justicia'], ['🕊️', 'Paz'], ['✝️', 'Cristianismo'], ['⚕️', 'Medicina'] ] },
    { game: 'sorter', title: 'Clasifica el símbolo', bins: ['Cívico', 'Deportivo', 'Religioso', 'Científico'], time: 60, items: [
      ['El himno nacional', 0], ['La bandera de Bogotá', 0], ['El escudo de Colombia', 0], ['La banda presidencial', 0],
      ['La camiseta de la Selección', 1], ['Los anillos olímpicos', 1], ['El silbato del árbitro', 1], ['La copa de campeón', 1],
      ['La cruz', 2], ['La estrella de David', 2], ['La media luna del islam', 2], ['El rosario', 2],
      ['π', 3], ['H₂O', 3], ['El signo de radiactividad', 3], ['∞ (infinito)', 3] ] },
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
  g9u2: { game: 'duelo', title: 'Duelo de argumentos', time: 120, lives: 3, items: [
    { s: 'El colegio debería tener huerta, porque enseña de dónde vienen los alimentos.', ok: true, e: 'Razón pertinente para la tesis.' },
    { s: 'La huerta es una mala idea: la propuso el profesor más aburrido del colegio.', ok: false, f: 'Ad hominem', e: 'Ataca a quien propone, no la propuesta.' },
    { s: 'O tenemos huerta o nunca vamos a comer sano.', ok: false, f: 'Falso dilema', e: 'Hay otras formas de comer sano.' },
    { s: 'Dos compañeros se aburrieron en la huerta, así que a nadie le gusta.', ok: false, f: 'Generalización apresurada', e: 'Dos casos no representan a todos.' },
    { s: 'Según la Secretaría de Educación, las huertas escolares mejoran el trabajo en equipo.', ok: true, e: 'Cita una fuente pertinente (aunque siempre conviene verificarla).' },
    { s: 'Los que quieren la huerta solo buscan perder clase.', ok: false, f: 'Hombre de paja', e: 'Caricaturiza la postura contraria.' },
    { s: 'Todos los colegios buenos tienen huerta; si no la tenemos, somos un mal colegio.', ok: false, f: 'Apelación a la mayoría', e: 'Que otros lo hagan no lo vuelve un argumento.' },
    { s: 'Si sembramos una huerta, luego querrán una granja, después una vaca y el colegio será una finca.', ok: false, f: 'Pendiente resbaladiza', e: 'Consecuencias exageradas y encadenadas sin pruebas.' },
    { s: 'En 7.° la huerta sirvió para medir el crecimiento de las plantas en biología, así que une teoría y práctica.', ok: true, e: 'Argumento apoyado en un ejemplo concreto.' },
    { s: 'Desde que hay huerta llueve más; la huerta atrae la lluvia.', ok: false, f: 'Falsa causa', e: 'Que dos cosas coincidan no significa que una cause la otra.' },
    { s: 'Imagina la tristeza de las plantas si no las sembramos.', ok: false, f: 'Apelación a la emoción', e: 'Busca conmover en vez de razonar.' },
    { s: 'Un youtuber de videojuegos dice que las huertas son inútiles; debe ser verdad.', ok: false, f: 'Apelación a la autoridad', e: 'No es una autoridad en educación ni en agricultura.' } ] },
  g9u3: { game: 'detective', title: 'Detective de noticias falsas', cases: [
    { head: 'Nuevo toque de queda en Bogotá desde esta noche', src: 'Audio reenviado en WhatsApp', date: 'Sin fecha', clues: [{ t: 'Nadie dice quién habla en el audio', bad: true }, { t: 'La Alcaldía no ha publicado ningún decreto', bad: true }, { t: 'Termina con "reenvíalo a todos"', bad: true }], a: 2, e: 'No hay decreto oficial ni fuente identificable: falsa.' },
    { head: 'TransMilenio anuncia cierre de una estación por obras del metro', src: 'Cuenta oficial de TransMilenio', date: 'Hoy', clues: [{ t: 'Cuenta oficial verificada', bad: false }, { t: 'Indica fechas y rutas alternas', bad: false }], a: 0, e: 'Fuente oficial con detalles verificables: confiable.' },
    { head: 'Colombia, el país más feliz del mundo según estudio', src: 'Portal de entretenimiento', date: 'Este mes', text: 'El estudio citado es de hace diez años y medía otra cosa.', clues: [{ t: 'El estudio existe', bad: false }, { t: 'Es de hace diez años', bad: true }, { t: 'El titular cambia lo que mide el estudio', bad: true }], a: 1, e: 'Un dato viejo y deformado: engañosa.' },
    { head: 'Estudiante de Cúcuta gana olimpiada internacional de matemáticas', src: 'Periódico regional', date: 'Ayer', clues: [{ t: 'Nombra al estudiante y al colegio', bad: false }, { t: 'La organización de la olimpiada publica los resultados', bad: false }, { t: 'Otros medios lo confirman', bad: false }], a: 0, e: 'Datos precisos y confirmados por la fuente original: confiable.' },
    { head: 'Tomar agua con limón cura todas las enfermedades', src: 'Cadena de Facebook', date: 'Sin fecha', clues: [{ t: 'No cita a ningún médico ni estudio', bad: true }, { t: 'Promete curar "todas" las enfermedades', bad: true }, { t: 'El Ministerio de Salud la desmintió', bad: true }], a: 2, e: 'Promesa imposible y desmentida: falsa.' },
    { head: 'Foto: así se ve el río Bogotá hoy, totalmente limpio', src: 'Cuenta anónima en X', date: 'Hoy', clues: [{ t: 'La foto es de otro río', bad: true }, { t: 'Sí hay obras de descontaminación en marcha', bad: false }, { t: 'La cuenta no tiene nombre ni historial', bad: true }], a: 1, e: 'Mezcla un hecho real (las obras) con una imagen que no corresponde: engañosa.' } ] },
};
