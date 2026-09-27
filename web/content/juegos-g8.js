// Minijuegos del grado 8°: dos por lección ("Juega") y el reto de cada unidad (formato en lib/SPEC.md).
export const LESSON_GAMES_G8 = {

  // Panorama de la literatura colombiana
  g8u1l1: [
    { game: 'memory', title: 'Autor y obra', pairs: [
      ['Jorge Isaacs', 'María'], ['José Asunción Silva', 'Nocturno'], ['Tomás Carrasquilla', 'La marquesa de Yolombó'], ['José Eustasio Rivera', 'La vorágine'],
      ['Gabriel García Márquez', 'Cien años de soledad'], ['Álvaro Mutis', 'La nieve del almirante'], ['Laura Restrepo', 'Delirio'], ['Andrés Caicedo', '¡Que viva la música!'] ] },
    { game: 'order', title: 'Ordena por época', time: 90, rounds: [
      { prompt: 'Ordena las obras de la más antigua a la más reciente', items: ['María', 'Nocturno', 'La vorágine', 'Cien años de soledad', 'Delirio'], labels: ['1867', '1894', '1924', '1967', '2004'] },
      { prompt: 'Ordena los movimientos en el tiempo', items: ['Romanticismo', 'Modernismo', 'Novela de la tierra', 'Realismo mágico'] },
      { prompt: 'Ordena a los autores por año de nacimiento', items: ['Jorge Isaacs', 'Tomás Carrasquilla', 'José Asunción Silva', 'José Eustasio Rivera', 'Gabriel García Márquez', 'Andrés Caicedo'], labels: ['1837', '1858', '1865', '1888', '1927', '1951'] },
      { prompt: 'Ordena las obras de García Márquez por fecha de publicación', items: ['La hojarasca', 'El coronel no tiene quien le escriba', 'Cien años de soledad', 'Crónica de una muerte anunciada', 'El amor en los tiempos del cólera'], labels: ['1955', '1961', '1967', '1981', '1985'] } ] },
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
    { game: 'blitz', title: 'Contrarreloj de métrica', time: 75, lives: 3, items: [
      { q: '¿Cuántas sílabas métricas tiene "lanza su red al juncal"?', o: ['7', '8', '9', '6'], a: 1, e: 'Tiene 7 sílabas y termina en aguda: se suma una.' },
      { q: '¿Cuántas sílabas métricas tiene "Una garza se levanta"?', o: ['8', '7', '9', '10'], a: 0, e: 'U-na-gar-za-se-le-van-ta: 8, y termina en grave.' },
      { q: 'La sinalefa une…', o: ['Dos versos', 'La vocal final de una palabra y la inicial de la siguiente', 'Dos estrofas', 'Dos rimas'], a: 1, e: '"Baja el" se cuenta "ba-jael".' },
      { q: 'Si el verso termina en palabra esdrújula…', o: ['Se suma una sílaba', 'Se resta una sílaba', 'Se deja igual', 'Se suman dos'], a: 1, e: 'Ley del acento final: aguda +1, grave igual, esdrújula −1.' },
      { q: 'Un verso de once sílabas se llama…', o: ['Octosílabo', 'Alejandrino', 'Endecasílabo', 'Heptasílabo'], a: 2, e: 'Endeca- significa once.' },
      { q: 'Un soneto tiene…', o: ['Cuatro versos', 'Catorce versos', 'Ocho versos', 'Diez versos'], a: 1, e: 'Dos cuartetos y dos tercetos: 14 versos.' },
      { q: '"Pena" y "Magdalena" tienen rima…', o: ['Asonante', 'Consonante', 'Libre', 'No riman'], a: 1, e: 'Coinciden vocales y consonantes: -ena.' },
      { q: '"Casa" y "alba" tienen rima…', o: ['Consonante', 'Asonante', 'Libre', 'No riman'], a: 1, e: 'Solo coinciden las vocales a-a.' },
      { q: 'Un verso de catorce sílabas se llama…', o: ['Alejandrino', 'Endecasílabo', 'Octosílabo', 'Dodecasílabo'], a: 0, e: 'El alejandrino tiene 14 sílabas, en dos mitades de 7.' },
      { q: 'En el esquema abab, ¿qué versos riman con el primero?', o: ['El segundo', 'El tercero', 'El cuarto', 'Ninguno'], a: 1, e: 'La misma letra indica la misma rima: 1 con 3, 2 con 4.' } ] },
  ],

  // Figuras literarias
  g8u1l3: [
    { game: 'memory', title: 'Figura y ejemplo', pairs: [
      ['Metáfora', 'Tus ojos son luceros'], ['Símil', 'Blanca como la nieve'], ['Hipérbole', 'Te lo he dicho un millón de veces'], ['Personificación', 'El viento susurra'],
      ['Anáfora', 'Por ti canto, por ti vivo'], ['Antítesis', 'Es hielo abrasador, es fuego helado'], ['Onomatopeya', 'El tic tac del reloj'], ['Epíteto', 'La blanca nieve'] ] },
    { game: 'catcher', title: 'Atrapa las metáforas', rule: 'Atrapa solo las metáforas (A es B, sin "como")', time: 45, lives: 3,
      good: ['Tus ojos son luceros', 'Mi corazón es un acordeón', 'La luna es un farol de plata', 'Tu risa es mi canción', 'La vida es un río', 'Tus cabellos son oro', 'El páramo es una fábrica de agua', 'Mi pueblo es un nido de recuerdos'],
      bad: ['Blanca como la nieve', 'Rápido como un rayo', 'El viento susurra', 'Te esperé mil años', 'Por ti canto, por ti vivo', 'Tu risa parece una canción', 'Llegué tarde a clase'] },
  ],

  // Oraciones coordinadas y subordinadas
  g8u2l1: [
    { game: 'builder', title: 'Constructor de compuestas', time: 150, targets: [
      { prompt: 'Une con "y" (suma)', pieces: ['La banda tocó', 'y', 'el público aplaudió', 'porque'], answers: [['La banda tocó', 'y', 'el público aplaudió']] },
      { prompt: 'Une con "pero" (contraste)', pieces: ['Hacía frío', 'pero', 'bailamos toda la noche', 'o'], answers: [['Hacía frío', 'pero', 'bailamos toda la noche']] },
      { prompt: 'Une con "o" (elección)', pieces: ['¿Compramos la camiseta', 'o', 'ahorramos para el bus?', 'que'], answers: [['¿Compramos la camiseta', 'o', 'ahorramos para el bus?']] },
      { prompt: 'Une con "ni" (suma de negaciones)', pieces: ['No trajimos capa', 'ni', 'teníamos sombrilla', 'si'], answers: [['No trajimos capa', 'ni', 'teníamos sombrilla']] },
      { prompt: 'Subordinada con "porque" (causa)', pieces: ['Salimos temprano', 'porque', 'el metro cierra a las once', 'pero'], answers: [['Salimos temprano', 'porque', 'el metro cierra a las once']] },
      { prompt: 'Subordinada con "cuando" (tiempo)', pieces: ['Todos saltaron', 'cuando', 'sonó la primera canción', 'ni'], answers: [['Todos saltaron', 'cuando', 'sonó la primera canción']] },
      { prompt: 'Subordinada con "que" (lo que se dice)', pieces: ['Mi hermana dijo', 'que', 'el cartel de este año es muy bueno', 'o'], answers: [['Mi hermana dijo', 'que', 'el cartel de este año es muy bueno']] },
      { prompt: 'Subordinada con "si" (condición)', pieces: ['Te guardo un puesto', 'si', 'llegas antes de las dos', 'ni'], answers: [['Te guardo un puesto', 'si', 'llegas antes de las dos']] } ] },
    { game: 'sorter', title: '¿Coordinada o subordinada?', bins: ['Coordinada', 'Subordinada'], time: 60, items: [
      ['La banda tocó y el público aplaudió', 0], ['Llovió, pero nadie se fue', 0], ['¿Vienes o te quedas?', 0], ['No llamó ni escribió', 0], ['Llegamos tarde, pero conseguimos puesto', 0], ['Unos cantaban y otros bailaban', 0],
      ['Me dijo que vendría', 1], ['Cuando empezó la música, todos saltaron', 1], ['Si llueve, llevamos capa', 1], ['No fui porque estaba enfermo', 1], ['El grupo que tocó primero es de Cali', 1], ['Iremos donde tú quieras', 1] ] },
  ],

  // Coherencia y cohesión
  g8u2l2: [
    { game: 'order', title: 'Reconstruye el texto', time: 120, rounds: [
      { prompt: 'Ordena la crónica de la Séptima', items: ['El sábado empecé mi recorrido en la plaza de Bolívar.', 'Allí, un mimo imitaba a los transeúntes.', 'Luego escuché un arpa llanera cerca de la Jiménez.', 'Sin embargo, algunos vendedores se quejaban de las ventas.', 'Finalmente, llegué a la calle 26 al caer la tarde.'] },
      { prompt: 'Ordena el texto expositivo sobre el frailejón', items: ['El frailejón es una planta típica de los páramos colombianos.', 'Sus hojas peludas atrapan la humedad de la neblina.', 'Gracias a esto, el agua baja poco a poco hacia los ríos.', 'Por eso, proteger los páramos es proteger el agua de las ciudades.'] },
      { prompt: 'Ordena la receta de las arepas', items: ['Primero, mezcla la harina con agua tibia y sal.', 'Después, amasa hasta que la masa no se pegue.', 'Luego, forma bolitas y aplánalas con las manos.', 'Por último, ásalas en un budare hasta que doren.'] },
      { prompt: 'Ordena la noticia breve', items: ['Estudiantes de Tunja ganaron un concurso nacional de crónica.', 'Su texto cuenta la historia de un zapatero del centro.', 'El jurado destacó su lenguaje sencillo y cercano.', 'Además, la crónica será publicada en una antología.'] } ] },
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
    { game: 'sorter', title: '¿Informa, opina o vende?', bins: ['Informa', 'Opina', 'Vende'], time: 75, items: [
      ['El puente reabrió ayer tras seis meses de obras', 0], ['La Registraduría amplió el horario de atención', 0], ['El paro de transportadores terminó a las 6 p. m.', 0], ['Según el censo, el municipio tiene 12.000 habitantes', 0],
      ['En mi opinión, el colegio necesita más zonas verdes', 1], ['Editorial: la ciudad merece un mejor transporte', 1], ['Caricatura sobre los trancones de la ciudad', 1], ['Es inaceptable que el parque siga sin luz', 1],
      ['¡Llévelo ya! Últimas unidades', 2], ['El sabor que une a las familias colombianas', 2], ['Descarga la app y recibe el primer domicilio gratis', 2], ['Hecho con amor en el Eje Cafetero', 2] ] },
    { game: 'detective', title: 'Detective de noticias', cases: [
      { head: 'Abren tres bibliotecas públicas en la comuna 8', src: 'Periódico local · sección Ciudad', date: '12 de marzo de 2026', text: 'Las bibliotecas funcionarán de lunes a sábado; la Secretaría de Cultura publicó las direcciones.', clues: [{ t: 'Cita a la Secretaría de Cultura como fuente', bad: false }, { t: 'Da direcciones y horarios que se pueden comprobar', bad: false }, { t: 'La firma una periodista con nombre y apellido', bad: false }], a: 0, e: 'Tiene fuente identificable, datos verificables y autora: es confiable.' },
      { head: '¡Tomar agua de panela con limón cura el dengue!', src: 'Cadena de WhatsApp', date: 'Sin fecha', clues: [{ t: 'No cita ningún estudio ni médico', bad: true }, { t: 'Pide reenviar el mensaje a diez contactos', bad: true }, { t: 'Las autoridades de salud dicen que el dengue requiere atención médica', bad: true }], a: 2, e: 'Afirma algo que contradice a las autoridades de salud y no tiene ninguna fuente: es falsa.' },
      { head: 'Colegios públicos tendrán solo tres días de clase a la semana', src: 'Portal de noticias', date: '3 de febrero de 2026', text: 'En el cuarto párrafo se aclara que es una medida temporal en cinco colegios por obras.', clues: [{ t: 'El titular habla de "colegios públicos" en general', bad: true }, { t: 'El texto dice que son solo cinco colegios', bad: true }, { t: 'La medida dura dos semanas', bad: true }], a: 1, e: 'El hecho existe, pero el titular lo exagera: es engañosa.' },
      { head: 'Así quedó la Séptima después del concierto de anoche', src: 'Cuenta de redes con muchos seguidores', date: 'Ayer', clues: [{ t: 'La foto circula en internet desde 2019', bad: true }, { t: 'Sí hubo un concierto anoche', bad: false }, { t: 'No dice quién tomó la foto', bad: true }], a: 1, e: 'El concierto fue real, pero la foto es vieja y se usa fuera de contexto: es engañosa.' },
      { head: 'Científicos confirman que los frailejones crecen un metro por semana', src: 'blog-curiosidades-top.com', date: '1 de abril', clues: [{ t: 'Los frailejones crecen cerca de un centímetro al año', bad: true }, { t: 'No nombra a ningún científico ni universidad', bad: true }, { t: 'Se publicó el Día de los Inocentes en otros países', bad: true }], a: 2, e: 'El dato es imposible y no tiene fuentes: es falsa.' },
      { head: 'Declaran alerta por crecientes en el río Cauca', src: 'Emisora regional', date: '20 de octubre de 2026', text: 'La nota enlaza el boletín oficial de la autoridad ambiental y cita al coordinador de gestión del riesgo.', clues: [{ t: 'Enlaza el boletín oficial', bad: false }, { t: 'Otros medios informan lo mismo', bad: false }, { t: 'Da recomendaciones de las autoridades', bad: false }], a: 0, e: 'La información coincide con la fuente oficial y con otros medios: es confiable.' },
      { head: 'El 90 % de los jóvenes colombianos ya no lee', src: 'Video viral', date: 'Hace 2 días', clues: [{ t: 'La "encuesta" se hizo a 20 personas de un solo barrio', bad: true }, { t: 'Generaliza a todo el país', bad: true }, { t: 'No muestra la pregunta que se hizo', bad: true }], a: 1, e: 'Parte de un dato real pero mínimo y lo presenta como si fuera de todo el país: es engañosa.' },
      { head: 'Gobierno prohíbe el bocadillo en las loncheras', src: 'Página de humor', date: '28 de diciembre', clues: [{ t: 'La página se presenta como satírica', bad: true }, { t: 'Ningún medio ni entidad oficial lo menciona', bad: true }, { t: 'La fecha es el Día de los Inocentes', bad: true }], a: 2, e: 'Es un chiste de una página de humor que circula como si fuera noticia: es falsa.' } ] },
  ],

  // Escuchar y dialogar
  g8u3l2: [
    { game: 'truefalse', title: '¿Escucha activa o no?', time: 60, lives: 3, items: [
      { s: 'Mirar el celular mientras un amigo te cuenta un problema es escucha activa.', a: false, e: 'La escucha activa exige atención completa.' },
      { s: 'Decir "o sea que te preocupa el examen" es parafrasear.', a: true, e: 'Repite con otras palabras lo que dijo el otro.' },
      { s: 'Interrumpir para dar tu opinión muestra que escuchas.', a: false, e: 'Hay que esperar el turno.' },
      { s: 'Hacer preguntas sobre lo que el otro dijo ayuda a comprender.', a: true, e: 'Las preguntas aclaran y muestran interés.' },
      { s: 'Asentir con la cabeza es una señal de escucha.', a: true, e: 'Los gestos también comunican atención.' },
      { s: 'Si no estoy de acuerdo, lo mejor es burlarme.', a: false, e: 'Se puede discrepar con respeto: eso es ser asertivo.' },
      { s: 'El tono de voz ayuda a descubrir la intención de quien habla.', a: true, e: 'Una misma frase puede ser petición o reclamo según el tono.' },
      { s: 'Pensar en mi respuesta mientras el otro habla es escuchar bien.', a: false, e: 'Primero hay que entender; luego responder.' },
      { s: 'Decir "con gusto" y "por favor" hace parte de la cortesía.', a: true, e: 'Son fórmulas que cuidan la relación con el otro.' },
      { s: 'Oír y escuchar son exactamente lo mismo.', a: false, e: 'Oír es percibir el sonido; escuchar es poner atención y comprender.' } ] },
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
    { game: 'memory', title: 'Símbolo y significado', pairs: [
      ['Paloma blanca', 'Paz'], ['Mariposas amarillas', 'Guiño a García Márquez'], ['Frailejón', 'Páramo y agua'], ['Cóndor', 'Los Andes y la libertad'],
      ['Manos entrelazadas', 'Solidaridad'], ['Sombrero vueltiao', 'Identidad del Caribe'], ['Mochila wayuu', 'Tejido de La Guajira'], ['Puño en alto', 'Lucha y protesta'] ] },
    { game: 'catcher', title: 'Atrapa los símbolos', rule: 'Atrapa solo los símbolos de Colombia', time: 45, lives: 3,
      good: ['Cóndor de los Andes', 'Orquídea Cattleya', 'Palma de cera', 'Bandera tricolor', 'Escudo nacional', 'Sombrero vueltiao', 'Himno nacional'],
      bad: ['Torre Eiffel', 'Canguro', 'Hoja de arce', 'Águila calva', 'Estatua de la Libertad', 'Pirámide de Guiza', 'Dragón chino'] },
  ],
};

export const UNIT_GAMES_G8 = {
  g8u1: { game: 'memory', title: 'Parejas de autores colombianos', pairs: [
    ['Jorge Isaacs', 'Romanticismo en el Valle del Cauca'], ['José Asunción Silva', 'Modernismo y musicalidad'], ['Tomás Carrasquilla', 'Costumbrismo antioqueño'], ['José Eustasio Rivera', 'La selva y los caucheros'],
    ['Gabriel García Márquez', 'Macondo y el Nobel de 1982'], ['Álvaro Mutis', 'Maqroll el Gaviero'], ['Candelario Obeso', 'Poesía en el habla del río Magdalena'], ['Andrés Caicedo', 'La Cali de los años setenta'] ] },
  g8u2: { game: 'balancer', title: 'Concordancia relámpago', time: 150, items: [
    { parts: [{ t: 'Los niños' }, { o: ['juega', 'juegan'], a: 1 }, { t: 'en el parque.' }], e: 'Sujeto plural, verbo plural.' },
    { parts: [{ t: 'El aula' }, { o: ['limpio', 'limpia'], a: 1 }, { t: 'huele a pino.' }], e: '"Aula" es femenino aunque lleve "el".' },
    { parts: [{ o: ['Se arregla', 'Se arreglan'], a: 1 }, { t: 'celulares.' }], e: 'El verbo concuerda con "celulares".' },
    { parts: [{ o: ['Hubo', 'Hubieron'], a: 0 }, { t: 'fiestas en todo el pueblo.' }], e: '"Haber" de existencia va en singular.' },
    { parts: [{ t: 'El equipo' }, { o: ['ganó', 'ganaron'], a: 0 }, { t: 'la final.' }], e: '"Equipo" es un colectivo singular.' },
    { parts: [{ t: 'Usted y yo' }, { o: ['somos', 'son', 'es'], a: 0 }, { t: 'vecinos.' }], e: '"Usted y yo" equivale a "nosotros".' },
    { parts: [{ o: ['Deben', 'Debe'], a: 1 }, { t: 'haber soluciones.' }], e: 'Con "haber" impersonal, el auxiliar va en singular.' },
    { parts: [{ t: 'Las' }, { o: ['flor', 'flores'], a: 1 }, { o: ['amarillos', 'amarillas'], a: 1 }, { o: ['adorna', 'adornan'], a: 1 }, { t: 'la mesa.' }], e: 'Todo en femenino plural.' },
    { parts: [{ t: 'El tema' }, { o: ['principal', 'principales'], a: 0 }, { o: ['es', 'son'], a: 0 }, { t: 'la paz.' }], e: 'Sujeto singular: "el tema".' },
    { parts: [{ o: ['Faltan', 'Falta'], a: 0 }, { t: 'tres días para el festival.' }], e: 'El sujeto es "tres días": plural.' } ] },
  g8u3: { game: 'detective', title: 'Detective de noticias', cases: [
    { head: 'El Festival de la Leyenda Vallenata anuncia sus fechas', src: 'Diario regional · Cultura', date: '5 de enero de 2026', text: 'La fundación organizadora publicó el calendario en su página oficial.', clues: [{ t: 'Cita a la fundación organizadora', bad: false }, { t: 'El calendario aparece en la página oficial', bad: false }, { t: 'Otros medios dan las mismas fechas', bad: false }], a: 0, e: 'Fuente oficial y coincidencia entre medios: es confiable.' },
    { head: 'Comer mango verde con sal borra los recuerdos', src: 'Audio reenviado', date: 'Sin fecha', clues: [{ t: 'La voz no dice quién es', bad: true }, { t: 'No hay ningún estudio', bad: true }, { t: 'Promete un efecto imposible', bad: true }], a: 2, e: 'Sin autor, sin pruebas y con un efecto imposible: es falsa.' },
    { head: 'Estudiantes de un colegio de Pasto crean app de lengua de señas', src: 'Noticiero regional', date: '14 de mayo de 2026', text: 'La nota entrevista a los estudiantes y a su profesora, y muestra la aplicación.', clues: [{ t: 'Entrevista a los protagonistas', bad: false }, { t: 'Muestra la app funcionando', bad: false }, { t: 'Da el nombre del colegio', bad: false }], a: 0, e: 'Tiene protagonistas identificables y pruebas: es confiable.' },
    { head: 'Nadie quiere ya el ajiaco: se vende la mitad que antes', src: 'Portal de entretenimiento', date: '2 de junio de 2026', clues: [{ t: 'El dato viene de un solo restaurante', bad: true }, { t: 'El titular habla de "nadie"', bad: true }, { t: 'El dueño explica que cerró por obras dos semanas', bad: true }], a: 1, e: 'Toma un caso aislado y lo generaliza: es engañosa.' },
    { head: 'Video muestra un caimán en la avenida Boyacá', src: 'Cuenta anónima', date: 'Hoy', clues: [{ t: 'El video se grabó en otro país en 2021', bad: true }, { t: 'Nadie más lo reporta', bad: true }, { t: 'La cuenta se creó hace una semana', bad: true }], a: 2, e: 'El hecho no ocurrió en Bogotá: es un video ajeno con otro texto. Es falsa.' },
    { head: 'Sube el precio del pasaje: "un golpe al bolsillo", dice columnista', src: 'Periódico nacional · Opinión', date: '10 de enero de 2026', text: 'El alza es real y aparece en el decreto; la frase entre comillas es la opinión de un columnista.', clues: [{ t: 'El alza aparece en un decreto oficial', bad: false }, { t: 'La valoración está en la sección de opinión y firmada', bad: false }], a: 0, e: 'Informa un hecho verificable y separa con claridad la opinión: es confiable.' } ] },
};
