// Minijuegos del grado 6°: dos por lección ("Juega") y el reto de cada unidad (formato en lib/SPEC.md).
export const LESSON_GAMES_G6 = {

  // El circuito de la comunicación
  g6u1l1: [
    { game: 'memory', title: 'Parejas de la comunicación', pairs: [
      ['Emisor', 'Quien produce el mensaje'], ['Receptor', 'Quien recibe e interpreta'], ['Mensaje', 'Lo que se comunica'], ['Canal', 'Medio por donde viaja'],
      ['Código', 'Lengua o sistema compartido'], ['Contexto', 'Lugar, momento y relación'], ['Ruido', 'Lo que interfiere'], ['Retroalimentación', 'La respuesta del receptor'] ] },
    { game: 'truefalse', title: '¿Se comunicaron o no?', time: 60, lives: 3, items: [
      { s: 'Si el receptor no conoce el código, el mensaje igual se entiende.', a: false, e: 'Sin código compartido el mensaje no se puede interpretar.' },
      { s: 'La lengua de señas colombiana es un código.', a: true, e: 'Es una lengua completa, con su propia gramática.' },
      { s: 'Un celular sin señal es un problema del canal.', a: true, e: 'El medio físico por donde viaja el mensaje falla.' },
      { s: 'El contexto no importa: se habla igual en todas partes.', a: false, e: 'No hablamos igual en un velorio que en un partido.' },
      { s: 'El ruido puede ser un sonido fuerte, pero también una distracción.', a: true, e: 'Ruido es todo lo que interfiere con el mensaje.' },
      { s: 'En una carta, el canal es el papel.', a: true, e: 'El papel escrito lleva el mensaje hasta el receptor.' },
      { s: 'El emisor y el receptor nunca cambian de papel.', a: false, e: 'En una conversación se turnan todo el tiempo.' },
      { s: 'Un emoji puede ser parte del mensaje.', a: true, e: 'Los emojis son signos no verbales que aportan sentido.' },
      { s: 'Si grito muy duro, siempre me entienden mejor.', a: false, e: 'Gritar puede volverse ruido y romper la comunicación.' },
      { s: 'El pregonero de la plaza es un emisor.', a: true, e: 'Produce el mensaje para quienes pasan.' } ] },
  ],

  // Signos verbales y no verbales
  g6u1l2: [
    { game: 'catcher', title: 'Atrapa los signos no verbales', rule: 'Atrapa solo los signos que NO usan palabras', time: 45, lives: 3,
      good: ['Pulgar arriba 👍', 'Luz roja del semáforo', 'Flecha en el piso', 'Ícono de wifi', 'Silbato del árbitro', 'Guiño de ojo', 'Calavera en un frasco', 'Aplauso'],
      bad: ['Letrero "PARE"', 'Mensaje "Ya llegué"', 'Titular del periódico', 'Aviso "Se vende"', 'Carta de la abuela', 'Nombre de la tienda', 'Himno cantado'] },
    { game: 'memory', title: 'Parejas signo y significado', pairs: [
      ['🚫', 'Prohibido'], ['🚻', 'Baño'], ['⚠️', 'Precaución'], ['♻️', 'Reciclaje'], ['🚌', 'Paradero'], ['👋', 'Saludo'], ['🔇', 'Silencio'], ['♿', 'Accesible'] ] },
  ],

  // La noticia y los medios
  g6u1l3: [
    { game: 'order', title: 'Arma la pirámide invertida', time: 90, rounds: [
      { prompt: 'Ordena la noticia de lo más importante a lo menos importante', items: ['Titular: Colegio de Usme siembra 300 árboles', 'Entrada: el domingo, 120 estudiantes sembraron árboles nativos en el parque ecológico', 'Datos: la jornada contó con apoyo del Jardín Botánico', 'Detalle: al final hubo un concierto de la banda del colegio'] },
      { prompt: 'Ordena las partes de la noticia de arriba hacia abajo', items: ['Titular', 'Entrada', 'Cuerpo', 'Fuente'] },
      { prompt: 'Ordena del medio más antiguo al más reciente en Colombia', items: ['Periódico impreso', 'Radio', 'Televisión', 'Internet'], labels: ['1791', '1929', '1954', '1990s'] } ] },
    { game: 'blitz', title: 'Contrarreloj de la noticia', time: 60, lives: 3, items: [
      { q: '¿Qué parte de la noticia resume lo esencial?', o: ['El cuerpo', 'La entrada', 'La fuente', 'La foto'], a: 1, e: 'La entrada responde las preguntas clave.' },
      { q: 'La pirámide invertida pone arriba…', o: ['Lo menos importante', 'Lo más importante', 'La opinión del periodista', 'La publicidad'], a: 1, e: 'Primero lo esencial, luego los detalles.' },
      { q: '"El domingo" responde a la pregunta…', o: ['¿Dónde?', '¿Cuándo?', '¿Quién?', '¿Por qué?'], a: 1, e: 'Es un dato de tiempo.' },
      { q: '¿Qué es la fuente de una noticia?', o: ['El titular', 'De dónde sale la información', 'El periodista que escribe', 'La foto'], a: 1, e: 'La fuente permite verificar lo que se dice.' },
      { q: '¿Cuál es un medio masivo?', o: ['Una carta', 'La radio', 'Un diario personal', 'Una llamada'], a: 1, e: 'La radio llega a muchas personas a la vez.' },
      { q: '"En el parque de Usme" responde…', o: ['¿Dónde?', '¿Cómo?', '¿Qué?', '¿Cuándo?'], a: 0, e: 'Es un dato de lugar.' },
      { q: 'Una noticia debe ser…', o: ['Inventada', 'Verificable', 'Una opinión', 'Muy larga'], a: 1, e: 'Informa hechos que se pueden comprobar.' },
      { q: '¿Qué parte se puede recortar sin perder lo esencial?', o: ['El titular', 'La entrada', 'El final del cuerpo', 'La fuente'], a: 2, e: 'Los detalles van al final.' } ] },
  ],

  // Sustantivo, adjetivo y verbo
  g6u2l1: [
    { game: 'hunter', title: 'Cazador de verbos', time: 90, rounds: [
      { clue: 'Toca todos los verbos', text: 'Cada domingo la ciclovía [[abre]] sus carriles. Los niños [[montan]] bicicleta, los abuelos [[caminan]] y los perros [[corren]] felices.' },
      { clue: 'Toca todos los sustantivos', text: 'En la [[plaza]] de [[mercado]] venden [[mangos]], [[guanábanas]] y [[lulos]] frescos.' },
      { clue: 'Toca todos los adjetivos', text: 'El páramo [[frío]] tiene frailejones [[altos]] y lagunas [[azules]] y [[tranquilas]].' },
      { clue: 'Toca todos los verbos', text: 'Mi hermana [[estudia]], mi papá [[cocina]] y yo [[barro]] el patio mientras la radio [[suena]].' } ] },
    { game: 'sorter', title: 'Clasifica la palabra', bins: ['Sustantivo', 'Adjetivo', 'Verbo'], time: 60, items: [
      ['arepa', 0], ['montaña', 0], ['alegría', 0], ['Cali', 0], ['cuaderno', 0], ['gato', 0],
      ['amable', 1], ['verde', 1], ['rápido', 1], ['enorme', 1], ['dulce', 1], ['antiguo', 1],
      ['bailar', 2], ['corrimos', 2], ['escribe', 2], ['soñaban', 2], ['llueve', 2], ['cantaré', 2] ] },
  ],

  // Sílabas y acentuación
  g6u2l2: [
    { game: 'tildes', title: 'Lluvia de tildes', time: 60, lives: 3, words: [
      { w: 'arbol', a: 'árbol' }, { w: 'cancion', a: 'canción' }, { w: 'examen', a: 'examen' }, { w: 'Bogota', a: 'Bogotá' },
      { w: 'rapido', a: 'rápido' }, { w: 'lapiz', a: 'lápiz' }, { w: 'mesa', a: 'mesa' }, { w: 'cafe', a: 'café' },
      { w: 'musica', a: 'música' }, { w: 'reloj', a: 'reloj' }, { w: 'azucar', a: 'azúcar' }, { w: 'raton', a: 'ratón' },
      { w: 'joven', a: 'joven' }, { w: 'sabado', a: 'sábado' }, { w: 'Chia', a: 'Chía' }, { w: 'feliz', a: 'feliz' } ] },
    { game: 'sorter', title: 'Agudas, graves y esdrújulas', bins: ['Aguda', 'Grave', 'Esdrújula'], time: 60, items: [
      ['canción', 0], ['Bogotá', 0], ['reloj', 0], ['café', 0], ['feliz', 0], ['ratón', 0],
      ['árbol', 1], ['mesa', 1], ['lápiz', 1], ['examen', 1], ['azúcar', 1], ['joven', 1],
      ['música', 2], ['sábado', 2], ['pájaro', 2], ['América', 2], ['teléfono', 2], ['brújula', 2] ] },
  ],

  // Raíces, prefijos y sufijos
  g6u2l3: [
    { game: 'word', title: 'Palabra secreta: familias', lives: 6, count: 6, words: [
      { w: 'PANADERÍA', h: 'Lugar donde se hace y se vende pan.' },
      { w: 'DESORDEN', h: 'Lo contrario de orden, con el prefijo des-.' },
      { w: 'SUBMARINO', h: 'Nave que va debajo del mar.' },
      { w: 'REESCRIBIR', h: 'Volver a escribir.' },
      { w: 'FLORERO', h: 'Recipiente para poner flores.' },
      { w: 'ZAPATERO', h: 'Persona que arregla zapatos.' },
      { w: 'CHIQUITICO', h: 'Diminutivo muy colombiano de chico.' },
      { w: 'INVISIBLE', h: 'Que no se puede ver, con el prefijo in-.' } ] },
    { game: 'memory', title: 'Prefijo y significado', pairs: [
      ['des-', 'Lo contrario'], ['re-', 'Otra vez'], ['sub-', 'Debajo'], ['pre-', 'Antes'], ['in-', 'Negación'], ['bi-', 'Dos'], ['multi-', 'Muchos'], ['anti-', 'En contra'] ] },
  ],

  // Mitos y leyendas de Colombia
  g6u3l1: [
    { game: 'memory', title: 'Leyenda y región', pairs: [
      ['Bachué', 'Laguna de Iguaque (Boyacá)'], ['El Dorado', 'Laguna de Guatavita'], ['El Mohán', 'Río Magdalena (Tolima)'], ['La Madremonte', 'Montes de Antioquia'],
      ['Bochica', 'Salto del Tequendama'], ['La Patasola', 'Selvas del Tolima y Antioquia'], ['El Hombre Caimán', 'Plato (Magdalena)'], ['La Tunda', 'Pacífico colombiano'] ] },
    { game: 'truefalse', title: '¿Mito o leyenda?', time: 60, lives: 3, items: [
      { s: 'La historia de Bachué es un mito.', a: true, e: 'Explica el origen de la humanidad para los muiscas.' },
      { s: 'El Hombre Caimán es un mito sobre la creación del mundo.', a: false, e: 'Es una leyenda: ocurre en Plato, Magdalena, con un personaje reconocible.' },
      { s: 'Las leyendas mezclan hechos reales con elementos sobrenaturales.', a: true, e: 'Suceden en lugares conocidos pero con algo fantástico.' },
      { s: 'Bochica abrió el salto del Tequendama según la tradición muisca.', a: true, e: 'Así explica el mito el origen del salto.' },
      { s: 'Los mitos siempre ocurren en una ciudad moderna.', a: false, e: 'Suelen ocurrir en un tiempo sagrado, antes del mundo conocido.' },
      { s: 'Una leyenda puede tener versiones distintas según la región.', a: true, e: 'Se transmite de voz en voz y cambia al pasar.' },
      { s: 'La tradición oral necesita libros para existir.', a: false, e: 'Se conserva de memoria y se cuenta en voz alta.' },
      { s: 'La Madremonte protege el bosque.', a: true, e: 'Castiga a quienes lo dañan.' } ] },
  ],

  // Coplas, refranes y adivinanzas
  g6u3l2: [
    { game: 'rima', title: 'Rima rápida de coplas', time: 60, lives: 3, items: [
      { v: 'Con mi tiple y mi guitarra / te traigo esta canción; / si tú no la quieres oír, / se me parte el…', o: ['corazón', 'alma', 'pecho'], a: 0, kind: 'consonante' },
      { v: 'Desde Bogotá he venido / caminando sin parar, / para verte, vida mía, / y una copla…', o: ['regalar', 'traerte', 'cantarte'], a: 0, kind: 'consonante' },
      { v: 'La luna sale en el monte, / el sol se esconde en el…', o: ['mar', 'río', 'horizonte'], a: 2, kind: 'consonante' },
      { v: 'Mi casa tiene un jardín / y en el jardín un…', o: ['clavel', 'jazmín', 'rosal'], a: 1, kind: 'consonante' },
      { v: 'Qué bonita es mi tierra, / con su verde y su…', o: ['sierra', 'loma', 'mar'], a: 0, kind: 'consonante' },
      { v: 'Me dijiste que era tarde / y yo me quedé a…', o: ['esperarte', 'cantar', 'dormir'], a: 0, kind: 'asonante' },
      { v: 'En la plaza hay una fuente / y en la fuente un pez…', o: ['azul', 'nadando', 'valiente'], a: 2, kind: 'consonante' },
      { v: 'Cuando canta el gallo / en la finca del abuelo, / se despierta el caballo / y se ilumina…', o: ['el cielo', 'temprano', 'la casa'], a: 0, kind: 'consonante' } ] },
    { game: 'order', title: 'Arma el refrán', time: 90, rounds: [
      { prompt: 'Ordena el refrán', items: ['Camarón', 'que se duerme', 'se lo lleva', 'la corriente'] },
      { prompt: 'Ordena el refrán', items: ['Más vale', 'pájaro en mano', 'que cien', 'volando'] },
      { prompt: 'Ordena el refrán', items: ['Al que madruga', 'Dios', 'lo ayuda'] },
      { prompt: 'Ordena el refrán', items: ['Perro que ladra', 'no', 'muerde'] },
      { prompt: 'Ordena la copla', items: ['Con mi tiple y mi guitarra', 'te vengo a dar mi canción;', 'si no la quieres oír,', 'se me parte el corazón.'] } ] },
  ],

  // El cuento: inicio, nudo y desenlace
  g6u3l3: [
    { game: 'order', title: 'Ordena el cuento', time: 90, rounds: [
      { prompt: 'Ordena "El renacuajo paseador" (Rafael Pombo)', items: ['El hijo de Rana, Rinrín Renacuajo, sale muy tieso y muy majo', 'Desobedece a su madre y va a visitar a doña Ratona', 'Mientras cantan y beben, llegan el gato y el gatico', 'Un pato se traga al renacuajo y la madre se queda sin hijo'], labels: ['Inicio', 'Nudo', 'Nudo', 'Desenlace'] },
      { prompt: 'Ordena la leyenda de la Madremonte', items: ['Un leñador entra al bosque con su hacha', 'Tala varios árboles cerca de la quebrada', 'Escucha ramas crujir y aparece la Madremonte', 'El leñador huye y nunca vuelve a talar'] },
      { prompt: 'Ordena las partes del cuento', items: ['Inicio', 'Nudo', 'Desenlace'] } ] },
    { game: 'catcher', title: 'Atrapa el conflicto', rule: 'Atrapa solo las frases que son un conflicto (un problema)', time: 45, lives: 3,
      good: ['Se perdió el perro de la finca', 'La quebrada se secó', 'El lobo bloqueó el camino', 'Se quemó el pan de la fiesta', 'Nadie encontraba la llave', 'Una tormenta tumbó el puente'],
      bad: ['Había una vez un pueblo', 'Y vivieron felices', 'La niña tenía ocho años', 'Era un día de sol', 'Colorín colorado', 'El abuelo vivía en Villa de Leyva'] },
  ],
};

export const UNIT_GAMES_G6 = {
  g6u1: { game: 'sorter', title: '¿Verbal o no verbal?', from: ['g6u1l2'], extra: [['Un grafiti con la palabra "paz"', 0], ['Una sirena de ambulancia', 1], ['Un trino con texto', 0], ['Una bandera a media asta', 1], ['Un emoji de corazón', 1], ['El nombre de una estación', 0]] },
  g6u2: { game: 'tildes', title: 'Lluvia de tildes', time: 75, lives: 3, words: [
    { w: 'arbol', a: 'árbol' }, { w: 'cancion', a: 'canción' }, { w: 'examen', a: 'examen' }, { w: 'Bogota', a: 'Bogotá' }, { w: 'rapido', a: 'rápido' },
    { w: 'lapiz', a: 'lápiz' }, { w: 'cafe', a: 'café' }, { w: 'musica', a: 'música' }, { w: 'azucar', a: 'azúcar' }, { w: 'raton', a: 'ratón' },
    { w: 'sabado', a: 'sábado' }, { w: 'Popayan', a: 'Popayán' }, { w: 'Fuquene', a: 'Fúquene' }, { w: 'origen', a: 'origen' }, { w: 'volcan', a: 'volcán' },
    { w: 'murcielago', a: 'murciélago' }, { w: 'fragil', a: 'frágil' }, { w: 'compas', a: 'compás' }, { w: 'Cucuta', a: 'Cúcuta' }, { w: 'libro', a: 'libro' } ] },
  g6u3: { game: 'memory', title: 'Parejas de mitos y leyendas', pairs: [
    ['Mito', 'Explica un origen con dioses'], ['Leyenda', 'Hecho con algo sobrenatural'], ['Copla', 'Cuatro versos que riman'], ['Refrán', 'Enseñanza corta'],
    ['Adivinanza', 'Pistas para descubrir algo'], ['Inicio', 'Personajes, lugar y tiempo'], ['Nudo', 'El conflicto'], ['Desenlace', 'Cómo se resuelve'] ] },
};
