// Minijuegos del grado 6°: dos por lección ("Juega") y el reto de cada unidad (formato en lib/SPEC.md).
export const LESSON_GAMES_G6 = {

  // El circuito de la comunicación
  g6u1l1: [
    { game: 'conecta', title: 'Une cada parte del circuito', time: 120, pairs: [
      ['Emisor', 'Quien produce el mensaje'], ['Receptor', 'Quien recibe e interpreta'], ['Mensaje', 'Lo que se comunica'], ['Canal', 'Medio por donde viaja'],
      ['Código', 'Lengua o señales que ambos conocen'], ['Contexto', 'Lugar, momento y relación'], ['Ruido', 'Lo que interfiere'], ['Retroalimentación', 'La respuesta del receptor'],
      ['Registro formal', 'Cómo le hablas al rector'], ['Registro informal', 'Cómo le hablas a un amigo'] ] },
    { game: 'truefalse', title: '¿Se comunicaron o no?', time: 60, lives: 3, items: [
      { s: 'Si el receptor no conoce el código, el mensaje igual se entiende.', a: false, e: 'Sin código compartido el mensaje no se puede interpretar.' },
      { s: 'La lengua de señas colombiana es un código.', a: true, e: 'Es una lengua completa que los dos conocen.' },
      { s: 'Un celular sin señal es un problema del canal.', a: true, e: 'Falla el medio por donde viaja el mensaje.' },
      { s: 'El contexto no importa: se habla igual en todas partes.', a: false, e: 'No hablamos igual en un velorio que en un partido.' },
      { s: 'El ruido puede ser un sonido fuerte, pero también una distracción.', a: true, e: 'Ruido es todo lo que interfiere con el mensaje.' },
      { s: 'En una carta, el canal es el papel.', a: true, e: 'El papel lleva el mensaje hasta el receptor.' },
      { s: 'El emisor y el receptor nunca cambian de papel.', a: false, e: 'En una conversación se turnan todo el tiempo.' },
      { s: 'Con el rector usamos un registro formal.', a: true, e: 'La relación con el rector pide un registro formal.' },
      { s: 'Si grito muy duro, siempre me entienden mejor.', a: false, e: 'Gritar puede volverse ruido y romper la comunicación.' },
      { s: 'El vendedor que grita "¡Aguacates!" en la plaza es un emisor.', a: true, e: 'Produce el mensaje para quienes pasan.' } ] },
  ],

  // Signos verbales y no verbales
  g6u1l2: [
    { game: 'emoji', title: 'Emojiadivina de señales', time: 90, lives: 3, items: [
      { e: '🚳', q: '¿Qué significa esta señal?', o: ['Hay ciclovía', 'Prohibido andar en bicicleta', 'Taller de bicicletas', 'Carrera de bicis'], a: 1, x: 'Círculo rojo con línea diagonal: prohibido.' },
      { e: '⚠️', q: '¿Qué significa este ícono?', o: ['Precaución', 'Salida', 'Baño', 'Wifi'], a: 0, x: 'El triángulo con signo de admiración pide precaución.' },
      { e: '☠️🧪', q: '¿Qué te advierte una calavera en un frasco?', o: ['Jugo natural', 'Farmacia abierta', 'Peligro: veneno', 'Laboratorio'], a: 2, x: 'La calavera advierte peligro o veneno.' },
      { e: '♻️', q: '¿Qué indican las flechas en círculo?', o: ['Peligro', 'Paradero', 'Silencio', 'Reciclaje'], a: 3, x: 'Las flechas en círculo son el signo del reciclaje.' },
      { e: '♿', q: '¿Qué indica la silla de ruedas?', o: ['Lugar accesible', 'Hospital', 'Prohibido sentarse', 'Venta de sillas'], a: 0, x: 'Indica un lugar accesible para todas las personas.' },
      { e: '🔇', q: '¿Qué pide el parlante tachado?', o: ['Subir el volumen', 'Silencio', 'Poner música', 'Cantar'], a: 1, x: 'El parlante tachado significa silencio.' },
      { e: '👍', q: '¿Qué comunica este gesto?', o: ['Me voy', 'Tengo hambre', 'Todo bien, de acuerdo', 'Estoy triste'], a: 2, x: 'El pulgar arriba es un gesto no verbal de aprobación.' },
      { e: '🚦🔴', q: '¿Qué indica la luz roja del semáforo?', o: ['Siga', 'Acelere', 'Gire', 'Pare'], a: 3, x: 'El color rojo es un signo no verbal: hay que parar.' },
      { e: '🚑🔊', q: '¿Qué pide la sirena de una ambulancia?', o: ['Que le abran paso', 'Que canten', 'Que compren', 'Que apaguen la luz'], a: 0, x: 'Un sonido también es un signo no verbal.' },
      { e: '🪧🔤', q: 'Un letrero con la palabra "PARE" es un signo…', o: ['No verbal', 'Verbal', 'Sonoro', 'De gesto'], a: 1, x: 'Usa palabras escritas: es verbal.' } ] },
    { game: 'catcher', title: 'Atrapa los signos no verbales', rule: 'Atrapa solo los signos que NO usan palabras', time: 45, lives: 3,
      good: ['Pulgar arriba 👍', 'Luz roja del semáforo', 'Flecha en el piso', 'Ícono de wifi', 'Pito del árbitro', 'Guiño de ojo', 'Calavera en un frasco', 'Aplauso'],
      bad: ['Letrero "PARE"', 'Mensaje "Ya llegué"', 'Titular del periódico', 'Aviso "Se vende"', 'Carta de la abuela', 'Nombre de la tienda', 'Himno cantado'] },
  ],

  // La noticia y los medios
  g6u1l3: [
    { game: 'detective', title: 'Detective de noticias', time: 150, cases: [
      { head: 'Estudiantes de Usme siembran 300 árboles nativos', src: 'Periódico reconocido', date: '12 de marzo', clues: [
        { t: 'Cita al Jardín Botánico como fuente', bad: false }, { t: 'Dice cuándo y dónde pasó', bad: false }, { t: 'Otros medios reconocidos cuentan lo mismo', bad: false } ], a: 0, e: 'Tiene fuente, fecha y lugar: es confiable.' },
      { head: '¡Cierran todos los colegios del país para siempre!', src: 'Cadena de WhatsApp', date: 'Sin fecha', clues: [
        { t: 'No dice quién lo afirma', bad: true }, { t: 'Ningún medio reconocido lo publica', bad: true }, { t: 'Usa signos de admiración para asustar', bad: true } ], a: 2, e: 'No tiene fuente y ningún medio lo confirma: es falsa.' },
      { head: 'Granizada HOY: Bogotá queda bajo el hielo', src: 'Página de memes', date: 'La foto es de hace tres años', clues: [
        { t: 'La granizada sí pasó, pero hace años', bad: true }, { t: 'El titular exagera: "bajo el hielo"', bad: true }, { t: 'La foto es real', bad: false } ], a: 1, e: 'Mezcla algo real con un dato viejo y exagera: es engañosa.' },
      { head: 'La ciclovía de Bogotá suma nuevos kilómetros', src: 'Alcaldía de Bogotá', date: 'Domingo 5 de abril', clues: [
        { t: 'La fuente es una entidad oficial', bad: false }, { t: 'Da cifras que se pueden comprobar', bad: false }, { t: 'Dice desde cuándo empieza', bad: false } ], a: 0, e: 'Fuente clara, fecha y datos verificables: es confiable.' },
      { head: 'Científicos dicen que comer arepa hace volar', src: 'Blog desconocido', date: 'Sin fecha', clues: [
        { t: 'No dice qué científicos', bad: true }, { t: 'No se puede comprobar', bad: true }, { t: 'Nadie más lo publica', bad: true } ], a: 2, e: 'Es un invento sin fuente: es falsa.' } ] },
    { game: 'order', title: 'Arma la pirámide invertida', time: 90, rounds: [
      { prompt: 'Ordena la noticia de lo más importante a lo menos importante', items: ['Titular: Colegio de Usme siembra 300 árboles', 'Entrada: el domingo, 120 estudiantes sembraron árboles nativos en el parque ecológico', 'Datos: la jornada contó con apoyo del Jardín Botánico', 'Detalle: al final hubo un concierto de la banda del colegio'] },
      { prompt: 'Ordena las partes de la noticia de arriba hacia abajo', items: ['Titular', 'Entrada', 'Cuerpo'] },
      { prompt: 'Ordena del medio más antiguo al más reciente en Colombia', items: ['Periódico impreso', 'Radio', 'Televisión', 'Internet'], labels: ['1791', '1929', '1954', 'Años 90'] } ] },
  ],

  // Sustantivo, adjetivo y verbo
  g6u2l1: [
    { game: 'hunter', title: 'Cazador de palabras', time: 90, rounds: [
      { clue: 'Toca todos los verbos', text: 'Cada domingo la ciclovía [[abre]] sus carriles. Los niños [[montan]] bicicleta, los abuelos [[caminan]] y los perros [[corren]] felices.' },
      { clue: 'Toca todos los sustantivos', text: 'En la [[plaza]] de [[mercado]] venden [[mangos]], [[guanábanas]] y [[lulos]] frescos.' },
      { clue: 'Toca todos los adjetivos', text: 'El páramo [[frío]] tiene frailejones [[altos]] y lagunas [[azules]] y [[tranquilas]].' },
      { clue: 'Toca todos los verbos', text: 'Mi hermana [[estudia]], mi papá [[cocina]] y yo [[barro]] el patio mientras la radio [[suena]].' } ] },
    { game: 'sorter', title: 'Clasifica la palabra', bins: ['Sustantivo', 'Adjetivo', 'Verbo'], time: 60, items: [
      ['arepa', 0], ['montaña', 0], ['alegría', 0], ['Cali', 0], ['cuaderno', 0], ['gato', 0],
      ['amable', 1], ['verde', 1], ['rápido', 1], ['enorme', 1], ['dulce', 1], ['juguetón', 1],
      ['bailar', 2], ['corrimos', 2], ['escribe', 2], ['soñaban', 2], ['llueve', 2], ['cantaré', 2] ] },
  ],

  // Sílabas y acentuación
  g6u2l2: [
    { game: 'tildes', title: 'Lluvia de tildes', time: 60, lives: 3, words: [
      { w: 'arbol', a: 'árbol' }, { w: 'cancion', a: 'canción' }, { w: 'examen', a: 'examen' }, { w: 'Bogota', a: 'Bogotá' },
      { w: 'rapido', a: 'rápido' }, { w: 'lapiz', a: 'lápiz' }, { w: 'mesa', a: 'mesa' }, { w: 'cafe', a: 'café' },
      { w: 'musica', a: 'música' }, { w: 'reloj', a: 'reloj' }, { w: 'azucar', a: 'azúcar' }, { w: 'raton', a: 'ratón' },
      { w: 'joven', a: 'joven' }, { w: 'sabado', a: 'sábado' }, { w: 'Chia', a: 'Chía' }, { w: 'feliz', a: 'feliz' } ] },
    { game: 'blitz', title: 'Contrarreloj de sílabas', time: 60, lives: 3, items: [
      { q: '¿Qué clase de palabra es "canción"?', o: ['Aguda', 'Grave', 'Esdrújula'], a: 0, e: 'La tónica es la última: can-CIÓN.' },
      { q: '"Árbol" es una palabra…', o: ['Aguda', 'Grave', 'Esdrújula'], a: 1, e: 'La tónica es la penúltima: ÁR-bol.' },
      { q: '"Música" es una palabra…', o: ['Aguda', 'Grave', 'Esdrújula'], a: 2, e: 'La tónica es la antepenúltima: MÚ-si-ca.' },
      { q: '¿Cuándo llevan tilde las esdrújulas?', o: ['Nunca', 'Siempre', 'Solo si terminan en n'], a: 1, e: 'Las esdrújulas llevan tilde siempre.' },
      { q: '¿Cuál está bien escrita?', o: ['exámen', 'examen'], a: 1, e: 'Grave terminada en n: no lleva tilde.' },
      { q: '¿Cuál está bien escrita?', o: ['lápiz', 'lapiz'], a: 0, e: 'Grave terminada en z: lleva tilde.' },
      { q: '¿Cuál es la sílaba tónica de "Bogotá"?', o: ['Bo', 'go', 'tá'], a: 2, e: 'Bo-go-TÁ: suena más fuerte la última.' },
      { q: '¿Cuántas sílabas tiene "Chía"?', o: ['Una', 'Dos', 'Tres'], a: 1, e: 'Chí-a: la í tónica se separa de la a.' },
      { q: '"Papá", con tilde, es…', o: ['El tubérculo', 'El padre'], a: 1, e: 'La tilde cambia la palabra: papá es el padre.' },
      { q: 'Las agudas llevan tilde si terminan en…', o: ['n, s o vocal', 'cualquier consonante', 'r o l'], a: 0, e: 'Por eso café y ratón llevan tilde, y reloj no.' } ] },
  ],

  // Raíces, prefijos y sufijos
  g6u2l3: [
    { game: 'crucigrama', title: 'Crucigrama de piezas', time: 240, words: [
      { w: 'panadería', h: 'Lugar donde se hace y se vende pan' },
      { w: 'desorden', h: 'Lo contrario de orden, con el prefijo des-' },
      { w: 'submarino', h: 'Nave que va debajo del mar' },
      { w: 'invisible', h: 'Que no se ve, con el prefijo in-' },
      { w: 'florero', h: 'Recipiente para poner flores' },
      { w: 'zapatero', h: 'Oficio de quien arregla zapatos' },
      { w: 'bicicleta', h: 'Vehículo de dos ruedas, con el prefijo bi-' },
      { w: 'prefijo', h: 'Pieza que va antes de la raíz' } ] },
    { game: 'memory', title: 'Prefijo y significado', pairs: [
      ['des-', 'Lo contrario'], ['re-', 'Otra vez'], ['sub-', 'Debajo'], ['pre-', 'Antes'], ['in-', 'Negación'], ['bi-', 'Dos'], ['multi-', 'Muchos'], ['anti-', 'En contra'] ] },
  ],

  // Mitos y leyendas de Colombia
  g6u3l1: [
    { game: 'sopa', title: 'Sopa de mitos y leyendas', size: 10, time: 180, words: [
      { w: 'mito', h: 'Relato que explica un origen con dioses' },
      { w: 'leyenda', h: 'Relato de un lugar conocido con algo sobrenatural' },
      { w: 'Bochica', h: 'Abrió el Salto del Tequendama' },
      { w: 'Bachué', h: 'Salió de la laguna de Iguaque' },
      { w: 'Mohán', h: 'Enamora a las lavanderas del río Magdalena' },
      { w: 'Patasola', h: 'Asusta en las selvas del Tolima y Antioquia' },
      { w: 'Tunda', h: 'Leyenda del Pacífico' },
      { w: 'versión', h: 'Cada forma distinta de contar la misma historia' } ] },
    { game: 'emoji', title: 'Emojiadivina de leyendas', time: 90, lives: 3, items: [
      { e: '😭👩🌊', q: '¿Qué leyenda es?', o: ['La Tunda', 'La Llorona', 'Bachué', 'El Mohán'], a: 1, x: 'La Llorona recorre las orillas de los ríos buscando a sus hijos.' },
      { e: '🐊👨', q: '¿Qué leyenda es?', o: ['El Hombre Caimán', 'Bochica', 'La Patasola', 'La Madremonte'], a: 0, x: 'El Hombre Caimán es una leyenda de Plato (Magdalena).' },
      { e: '🌳👩😠🪓', q: '¿Quién castiga al que tala el bosque?', o: ['La Llorona', 'Chiminigagua', 'La Madremonte', 'El Mohán'], a: 2, x: 'La Madremonte protege el bosque de los montes de Antioquia.' },
      { e: '🏞️👩👶', q: '¿Qué mito es?', o: ['La Tunda', 'El Dorado', 'La Patasola', 'Bachué'], a: 3, x: 'Bachué salió de la laguna de Iguaque con un niño y pobló la tierra.' },
      { e: '🦶🌲😱', q: '¿Qué leyenda es?', o: ['La Patasola', 'Bochica', 'El Hombre Caimán', 'Bachué'], a: 0, x: 'La Patasola asusta en las selvas del Tolima y Antioquia.' },
      { e: '👑✨🥇🏞️', q: '¿Qué leyenda es?', o: ['La Llorona', 'El Dorado', 'El Mohán', 'La Tunda'], a: 1, x: 'En la laguna de Guatavita el cacique se cubría de oro.' },
      { e: '🌊⛰️💥', q: '¿Quién abrió el Salto del Tequendama?', o: ['Bachué', 'El Mohán', 'Bochica', 'La Madremonte'], a: 2, x: 'Para los muiscas, Bochica abrió el salto y salvó la sabana de la inundación.' },
      { e: '☀️🐦🐦', q: '¿Quién creó la luz y los pájaros que la repartieron?', o: ['La Patasola', 'Bochica', 'El Hombre Caimán', 'Chiminigagua'], a: 3, x: 'Chiminigagua es el creador de la luz en el mito muisca.' },
      { e: '🧺🌊😍', q: '¿Quién enamora a las lavanderas del río Magdalena?', o: ['El Mohán', 'La Llorona', 'Bachué', 'La Tunda'], a: 0, x: 'El Mohán vive en el río Magdalena, en el Tolima.' },
      { e: '📜🌍❓', q: '¿Qué relato explica el origen del mundo con dioses?', o: ['Una leyenda', 'Un mito', 'Una noticia', 'Un refrán'], a: 1, x: 'El mito explica un origen con dioses o seres sagrados.' } ] },
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
    { game: 'rosco', title: 'El rosco de la tradición oral', time: 180, items: [
      { l: 'A', q: 'Empieza por A: describe algo con pistas para que otro lo descubra', a: 'adivinanza' },
      { l: 'C', q: 'Empieza por C: estrofa de cuatro versos en la que riman el segundo y el cuarto', a: 'copla' },
      { l: 'D', q: 'Empieza por D: "Camarón que se ___, se lo lleva la corriente"', a: 'duerme' },
      { l: 'E', q: 'Empieza por E: lo que deja un refrán, una lección práctica', a: 'enseñanza', alt: ['ensenanza'] },
      { l: 'G', q: 'Empieza por G: "Con mi tiple y mi ___ / te vengo a dar mi canción"', a: 'guitarra' },
      { l: 'M', q: 'Empieza por M: la rima ayuda a guardar los textos en la…', a: 'memoria' },
      { l: 'N', q: 'Contiene la N: rima en la que solo coinciden las vocales', a: 'asonante' },
      { l: 'O', q: 'Empieza por O: tradición que pasa de voz en voz', a: 'oral' },
      { l: 'P', q: 'Empieza por P: "Blanco por dentro, verde por fuera…". ¿Qué fruta es?', a: 'pera' },
      { l: 'R', q: 'Empieza por R: frase corta con una enseñanza, como "Perro que ladra no muerde"', a: 'refrán', alt: ['refran'] },
      { l: 'S', q: 'Empieza por S: la copla casi siempre tiene ocho en cada verso', a: 'sílabas', alt: ['silabas'] },
      { l: 'T', q: 'Contiene la T: rima en la que coinciden vocales y consonantes', a: 'consonante' },
      { l: 'V', q: 'Empieza por V: cada línea de una copla', a: 'verso' },
      { l: 'Z', q: 'Contiene la Z: palabra que rima con "canción" en la copla del tiple', a: 'corazón', alt: ['corazon'] } ] },
  ],

  // El cuento: inicio, nudo y desenlace
  g6u3l3: [
    { game: 'corrector', title: 'Corrector de cuentos', time: 150, lives: 3, rounds: [
      { text: 'Un cuento es un relato {{breve|larguísimo}} con pocos personajes. En el {{inicio|desenlace}} se presentan los personajes, el lugar y el tiempo.', e: 'El cuento es breve y empieza presentando a sus personajes.' },
      { text: 'En el {{nudo|inicio}} aparece el conflicto. Sin {{nudo|título}} no hay cuento, porque no pasaría nada. En el desenlace el conflicto se {{resuelve|complica}}.', e: 'El nudo trae el problema y el desenlace lo resuelve.' },
      { text: 'Rinrín Renacuajo {{desobedece|obedece}} a su madre y visita a doña {{Ratona|Gallina}}. Al final, un {{pato|gato}} se lo traga.', e: 'Así pasa en "El renacuajo paseador", de Rafael Pombo.' },
      { text: 'Al contar en voz alta, usa un {{volumen|silencio}} que todos oigan, cambia el {{tono|nombre}} para cada personaje y haz una {{pausa|carrera}} antes de la sorpresa.', e: 'Volumen, tono y pausas hacen que el público escuche con atención.' } ] },
    { game: 'catcher', title: 'Atrapa el conflicto', rule: 'Atrapa solo las frases que son un conflicto (un problema)', time: 45, lives: 3,
      good: ['Se perdió el perro de la finca', 'La quebrada se secó', 'El lobo bloqueó el camino', 'Se quemó el pan de la fiesta', 'Nadie encontraba la llave', 'Una tormenta tumbó el puente'],
      bad: ['Había una vez un pueblo', 'Y vivieron felices', 'La niña tenía ocho años', 'Era un día de sol', 'Colorín colorado', 'El abuelo vivía en Villa de Leyva'] },
  ],
};

export const UNIT_GAMES_G6 = {
  g6u1: { game: 'blitz', title: 'Reto: comunicarnos', time: 90, lives: 3, quizFrom: 'unit', extraItems: [
    { q: '¿Quién produce el mensaje?', o: ['El receptor', 'El emisor', 'El canal'], a: 1, e: 'El emisor produce el mensaje; el receptor lo recibe.' },
    { q: 'Con el rector usamos un registro…', o: ['Formal', 'Informal'], a: 0, e: 'La relación con el rector pide un registro formal.' },
    { q: 'El pulgar arriba es un signo…', o: ['Verbal', 'No verbal'], a: 1, e: 'Comunica sin palabras.' },
    { q: 'Un círculo rojo con una línea diagonal significa…', o: ['Reciclaje', 'Silencio', 'Prohibido'], a: 2, e: 'Es el código de "prohibido".' },
    { q: 'La pirámide invertida pone arriba…', o: ['Lo más importante', 'Los detalles', 'La publicidad'], a: 0, e: 'Primero lo esencial, al final los detalles.' },
    { q: '¿Qué es la fuente de una noticia?', o: ['El titular', 'De dónde sale la información', 'La foto'], a: 1, e: 'La fuente permite verificar lo que se dice.' } ] },
  g6u2: { game: 'rosco', title: 'El rosco de la palabra', time: 200, items: [
    { l: 'A', q: 'Empieza por A: palabra que dice cómo es el sustantivo', a: 'adjetivo' },
    { l: 'B', q: 'Empieza por B: vehículo de dos ruedas, con el prefijo bi-', a: 'bicicleta' },
    { l: 'D', q: 'Empieza por D: prefijo que significa "lo contrario", como en "desorden"', a: 'des', alt: ['des-'] },
    { l: 'E', q: 'Empieza por E: palabra con la tónica en la antepenúltima sílaba', a: 'esdrújula', alt: ['esdrujula'] },
    { l: 'F', q: 'Empieza por F: las palabras que comparten la misma raíz forman una…', a: 'familia' },
    { l: 'G', q: 'Empieza por G: palabra con la tónica en la penúltima sílaba', a: 'grave' },
    { l: 'I', q: 'Empieza por I: forma del verbo terminada en -ar, -er o -ir', a: 'infinitivo' },
    { l: 'L', q: 'Empieza por L: otro nombre de la raíz de una palabra', a: 'lexema' },
    { l: 'P', q: 'Empieza por P: pieza que va antes de la raíz', a: 'prefijo' },
    { l: 'Q', q: 'Contiene la Q: diminutivo muy colombiano de "chico"', a: 'chiquitico' },
    { l: 'R', q: 'Empieza por R: pieza de la palabra que lleva el significado principal', a: 'raíz', alt: ['raiz'] },
    { l: 'S', q: 'Empieza por S: palabra que nombra personas, animales, cosas o lugares', a: 'sustantivo' },
    { l: 'T', q: 'Empieza por T: rayita que se pone sobre la vocal tónica', a: 'tilde' },
    { l: 'V', q: 'Empieza por V: palabra que expresa acciones, estados o procesos', a: 'verbo' } ] },
  g6u3: { game: 'crucigrama', title: 'Crucigrama de la tradición oral', time: 240, words: [
    { w: 'mito', h: 'Relato que explica un origen con dioses' },
    { w: 'leyenda', h: 'Relato de un lugar conocido con algo sobrenatural' },
    { w: 'copla', h: 'Estrofa de cuatro versos que riman' },
    { w: 'refrán', h: 'Frase corta con una enseñanza' },
    { w: 'adivinanza', h: 'Pistas para descubrir algo' },
    { w: 'inicio', h: 'Parte del cuento que presenta personajes, lugar y tiempo' },
    { w: 'nudo', h: 'Parte del cuento donde aparece el conflicto' },
    { w: 'desenlace', h: 'Parte del cuento donde se resuelve el conflicto' } ] },
};
