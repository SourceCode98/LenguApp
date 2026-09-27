# LenguApp: contrato de actividades, escenas y minijuegos

Proyecto: LenguApp, plataforma de Español y Lengua Castellana para colegios de Colombia (grados 6° a 11°), hermana de QuimicaLearn. Todo el texto visible va en **español de Colombia**, con tildes correctas. Público: estudiantes de 11 a 17 años; se proyecta en video beam y se usa en celulares de gama baja.

Cada lección tiene cuatro momentos: **Aprende** (escena que cambia con cada paso), **Practica** (una actividad), **Juega** (dos minijuegos) y **Demuestra** (quiz de 3 preguntas). Cada unidad cierra con un **Reto** (un minijuego).

## Reglas comunes

- JavaScript puro (ES2019), módulos ES. Nada de React en `lib/`. Sin dependencias nuevas salvo `three` (ya instalado, v0.180).
- Utilidades en `lib/kit.js`: `THREE, esc, fmt, num, shuffle, reduce, nid, canvasStage, loop, slider, three`.
  - `three(stageEl, onDrag)` crea renderer, cámara, luces, rotación con arrastre y zoom, y devuelve `o = {R, scene, cam, root, rot, zoom, auto, tick, clear(), label(obj, texto), dispose()}`. `o.tick = dt => {...}` se llama cada cuadro. Todo lo que agregues va en `o.root`. Devuelve `null` si no hay WebGL: en ese caso muestra un texto alterno (la clase `.nogl` ya existe).
  - `canvasStage(parent, altura)` crea un lienzo 2D con `{st, ctx, W, H, off()}`. `loop(fn(dt))` devuelve la función para detenerlo. `reduce` = el usuario prefiere menos movimiento (anima menos o nada).
- CSS: usa las clases de `web/app/globals.css` (`.stage`, `.lab`, `.hint`, `.nogl`, `.btn`, `.btn.ghost`, `.chip`, `.pill`, `.row`, `.w`, `.fb ok|no|info`, `.mono`, `.legend`, `.dot`, `.bar`, variables `--accent --gold --ok --bad --ink --muted --line --surface --surface2 --bg --stage`). Estilos nuevos en tu propio archivo `web/styles/<grupo>.css` con prefijo propio (`.sc-…` escenas, `.gm-…` juegos, `.ac-…` actividades). Deben verse bien en claro y oscuro (usa las variables). El fondo del `.stage` es oscuro siempre (`--stage`).
- Móvil: ancho mínimo 360 px, sin scroll horizontal, objetivos táctiles de al menos 40 px. Todo lo táctil funciona también con mouse y teclado cuando sea razonable.
- Limpieza: `dispose()` detiene animaciones, quita listeners de `window`/`document` y libera three (`o.dispose()`).
- Rendimiento: menos de ~300 mallas por escena; reutiliza geometrías y materiales.
- Marcado de texto compartido: en varios specs un texto trae `[[fragmento|k]]` para marcar un objetivo (k = índice de categoría, 0 si hay una sola) y `{{correcta|otra|otra}}` para un hueco con opciones (la primera es la correcta). Lo demás del texto son palabras normales. `lib/text.js` exporta `parseMarked(text)` → `[{t, k|null}]` (tokens: los fragmentos marcados son un solo token; el resto se parte por espacios conservando la puntuación pegada) y `parseCloze(text)` → `[{t}|{opts:[...], a:0}]`. Úsalo en actividades y juegos.

## Actividades de "Practica" (`lib/widgets.js`)

`W[type] = (el, spec, done) => dispose|null`. `done()` se llama una sola vez cuando el estudiante termina bien. Siempre con botón "Comprobar", retroalimentación por ítem y posibilidad de corregir y volver a comprobar.

- **classify**: `{prompt, bins:[...], items:[[texto, bin], ...], e?}`.
- **order**: `{prompt, items:[en orden correcto], e?}`.
- **mark**: `{prompt, text, cats:[{n:'Sustantivo', c:'#2E7D8C'}...], e?}` el texto usa `[[…|k]]`. El estudiante elige la categoría (chips con su color) y toca palabras; tocar de nuevo desmarca. Comprobar: todos los objetivos con su categoría y ninguna palabra de más.
- **cloze**: `{prompt, text, mode:'select'|'type', e?}` con `{{…}}`. En `select` cada hueco muestra sus opciones barajadas como botones pequeños; en `type` un campo de texto (compara sin mayúsculas pero **con** tildes).
- **build**: `{prompt, rounds:[{pieces:[...], answers:[[...orden correcto...]], slots?:['Sujeto','Verbo','Complemento'], hint?}], e?}` tocar piezas para ponerlas en orden (tocar una puesta la devuelve). `pieces` puede traer piezas de sobra.
- **write**: `{prompt, purpose?:{q, o:[...]}, plan:[{q, ph?}], min:80, checklist:[...], model?}` tres pasos: plan (campos cortos), borrador (área de texto con contador de palabras y mínimo), revisión (lista de control que el estudiante marca; resalta palabras repetidas y oraciones de más de 35 palabras). Guarda el borrador en `localStorage` (`ll-draft-<id>`, try/catch). Termina al marcar toda la lista.
- **record**: `{prompt, text?, max:120, rubric:['Volumen','Tono','Ritmo','Claridad']}` graba con `MediaRecorder` si hay micrófono y permite escucharse; si no hay, botón "Practiqué en voz alta". Luego autoevaluación de 1 a 3 por criterio. Termina al evaluar todos.
- **map**: `{prompt, kind:'concept'|'table'|'timeline', slots:[{label, a}], extra?:[...], e?}` tarjetas (las `a` de cada casilla más `extra`) que se tocan y luego se ponen en una casilla.

## Escenas de "Aprende" (`lib/scenes/<tipo>.js`)

`export default function (el) { ...; return { set(state, prev), dispose() } }`

`el` es un div vacío. Crea dentro un `div.stage.sc-stage` (alto 340 px, 280 px en pantallas < 560 px) y, si hace falta, una fila de leyenda debajo (`.sc-note`). `set(state, prev)` se llama al montar (prev = null) y en cada paso; **anima la transición** de prev a state. Campos desconocidos se ignoran; todo es opcional salvo `type`. Nada de texto largo dentro de la escena: la explicación la pone el anfitrión debajo. Etiquetas cortas.

- **comm** (3D): circuito de la comunicación. `{emisor:'Abuela', receptor:'Nieto', mensaje:'¡A comer!', canal:'Voz', codigo:'Español', contexto:'Cocina', show:['emisor','mensaje','canal','codigo','receptor','contexto'], focus:null|parte, noise:false, broken:null|'codigo'|'canal'}`. Dos figuras sencillas enfrentadas; una burbuja de mensaje viaja por el canal (tubo o arco) de emisor a receptor en bucle. `noise`: partículas de estática que sacuden la burbuja. `broken:'codigo'` la burbuja llega con símbolos revueltos; `'canal'` el tubo se corta y la burbuja cae. `focus` resalta una parte y atenúa el resto. `show` controla qué etiquetas aparecen.
- **signs** (2D SVG): ciudad de signos. `{items:[{kind:'verbal'|'noverbal', icon:'pare'|'bus'|'bano'|'semaforo'|'mano'|'flecha'|'prohibido'|'wifi'|'cruce'|'basura'|'texto', label}], highlight:null|'verbal'|'noverbal', pick:null|índice}` una calle con letreros; `highlight` ilumina un tipo y atenúa el otro; `pick` hace zoom a uno y muestra su etiqueta.
- **newsdesk** (3D): mesa de redacción. `{blocks:[{k:'titular'|'entrada'|'cuerpo'|'foto'|'fuente'|'opinion'|'dato', t:'texto corto'}], pyramid:false, focus:null|k, ask:null|['qué','quién','cuándo','dónde','por qué','cómo']}` bloques que caen y se apilan; `pyramid:true` los reordena como pirámide invertida (más ancho arriba = más importante); `ask` muestra fichas de las preguntas que se pegan a la entrada.
- **morph** (3D): la palabra por dentro. `{root:'orden', prefix:['des'], suffix:['ado'], family:['ordenar','desorden'], show:'root'|'build'|'family'}` la raíz en el centro; en `build` los afijos orbitan y se acoplan formando la palabra; en `family` las palabras de la familia brotan alrededor unidas a la raíz.
- **syllable** (3D): sílabas y tilde. `{word:'Zipaquirá', syl:['Zi','pa','qui','rá'], tonic:3, rule:null|'aguda'|'grave'|'esdrujula'|'sobreesdrujula', tilde:true}` columnas por sílaba; la tónica sube más y brilla; `rule` muestra un letrero con la regla contada desde el final; `tilde:false` muestra la palabra sin tilde y la tilde cae al activar `true`.
- **sentence** (3D): constructor de oraciones. `{subj:['Los','niños'], pred:['juegan','en','el','parque'], nuc:{s:1,p:0}, show:'words'|'split'|'nuclei'|'cats', cats?:[categoría por palabra en orden], plural:null|true|false, nexo:null|'y'|'pero'|'porque'|'que', second:null|{subj:[...],pred:[...]}}` bloques de palabras; `split` separa sujeto y predicado en dos plataformas de color; `nuclei` eleva los núcleos; `cats` colorea por categoría gramatical con leyenda; `nexo+second` muestra dos oraciones unidas por un puente con el nexo.
- **textarch** (3D): arquitectura del texto. `{kind:'narrativo'|'expositivo'|'argumentativo'|'noticia'|'carta'|'ensayo'|'resena', parts:[{n:'Inicio', t:'frase corta'}], focus:null|índice, remove:null|índice}` pisos o columnas según el tipo (narrativo: tres pisos; argumentativo: tesis sobre columnas; noticia: pirámide invertida); `remove` quita una pieza y la estructura se inclina o cae.
- **diorama** (3D): escenario del relato. `{setting:'bosque'|'rio'|'laguna'|'pueblo'|'ciudad'|'paramo', time:'dia'|'noche', chars:[{n:'Madremonte', c:'#2F7D32', h:1.4}], view:'libre'|'omnisciente'|'primera'|'testigo', moment:null|'inicio'|'nudo'|'desenlace', focus:null|índice}` diorama low-poly; `view` mueve la cámara (omnisciente desde arriba, primera a la altura de los ojos del personaje 0, testigo desde un lado); `moment` cambia la iluminación y una etiqueta.
- **poem** (2D SVG): el poema por dentro. `{lines:[{t:'Tengo una muñeca', syl:6, rhyme:'a'}], show:'text'|'syl'|'rhyme'|'stanza', stanzas:[4,4]}` versos como filas; `syl` dibuja barras proporcionales a las sílabas métricas con el número; `rhyme` une con hilos de color los versos que riman (misma letra); `stanza` agrupa estrofas.
- **figure** (3D): figuras literarias. `{kind:'metafora'|'simil'|'hiperbole'|'personificacion'|'anafora'|'antitesis', a:'ojos', b:'luceros', text:'Tus ojos son luceros'}` dos objetos simples (sprites de texto o emoji sobre formas); metáfora: A se transforma en B; símil: A y B lado a lado con "como"; hipérbole: A crece enorme; personificación: A recibe cara y se mueve; anáfora: la misma palabra se repite al inicio de filas; antítesis: A y B se oponen en una balanza.
- **gallery** (3D): galería del tiempo. `{rooms:[{n:'Romanticismo', y:'1800-1850', c:'#8A4B6E', tags:['emoción','naturaleza']}], at:0}` pasillo con salas de color; `at` mueve la cámara a esa sala con su nombre, años y etiquetas.
- **voice** (2D canvas): onda de voz. `{mode:'plana'|'expresiva'|'fuerte'|'suave'|'rapida'|'pausas', text:'frase', pauses:[índices de palabra]}` onda animada que cambia de amplitud, frecuencia y silencios; la frase aparece debajo con marcas de pausa.
- **argument** (3D): balanza argumentativa. `{thesis:'...', items:[{t:'...', kind:'arg'|'dato'|'ejemplo'|'contra'|'falacia', w:1..3, side:'pro'|'con'}], reveal:null|índice}` la tesis arriba; cada ítem cae en un platillo según `side` y pesa `w`; `reveal` en una falacia la hace deshacerse y la balanza se reajusta.
- **dialect** (2D SVG): mapa del habla. `{regions:[{n:'Bogotá y Cundinamarca', id:'andina'|'caribe'|'pacifica'|'orinoquia'|'amazonia'|'paisa'|'valle'|'santanderes'|'bogota', words:['sumercé','¿qué más?']}], focus:null|id}` mapa esquemático de Colombia por regiones con globos de palabras; `focus` resalta una región.
- **screen** (2D): del libro a la pantalla. `{text:'fragmento', shots:[{k:'Plano general', d:'Macondo desde lejos'}], at:0}` pantalla dividida: texto a la izquierda y cuadros de guion gráfico a la derecha; `at` resalta el cuadro y la frase que le corresponde.
- **levels** (3D o 2D): tres niveles de lectura. `{text:'texto corto', layer:'literal'|'inferencial'|'critico'|null, q:'pregunta', evidence:'fragmento del texto'}` tres capas translúcidas apiladas; la capa activa se separa y brilla; `evidence` se resalta en el texto.

## Minijuegos (`lib/games/<juego>.js`)

`export default function (el, spec, finish) { ...; return dispose }` usando `makeGame` de `./common.js` (pantallas de inicio y final, HUD, estrellas, confeti, récord). Al terminar cada partida llama `finish({score, stars, detail})`. Todo `spec` trae `id` y `title`. Sonido no. Feedback inmediato de acierto o error.

Reutilizados de QuimicaLearn (mismo spec):
- **blitz** `{items:[{q,o,a,e}], time, lives}` · **memory** `{pairs}` · **sorter** `{bins, items:[[t,b]], time}` · **truefalse** `{items:[{s,a,e}], time, lives}` · **order** `{rounds:[{prompt, items, labels?}], time}` · **word** `{words:[{w,h}], lives, count}` (el matraz pasa a ser un tintero) · **catcher** `{rule, good, bad, time, lives}` (el vaso pasa a ser una cesta o libro).

Adaptados (misma clave, nueva mecánica de lenguaje):
- **builder** "Constructor de oraciones": `{targets:[{prompt, pieces:[...], answers:[[...]]}], time?}` piezas de palabra como bloques en un stage 3D; al tocarlas se ponen en fila; si coincide con una respuesta, los bloques se alinean con animación y celebración; siguiente. Botón "Pista" (muestra la primera pieza). Tiempo y errores dan estrellas.
- **hunter** "Cazador en el texto": `{rounds:[{clue:'Toca todos los verbos', text:'… [[corre]] …'}], time:90}` un párrafo grande; tocar las palabras objetivo lo más rápido posible; tocar una que no es quita puntos; puntos por velocidad; ronda completa al encontrar todas.
- **balancer** "Concordancia relámpago": `{items:[{parts:[{o:['El','Los'], a:1}, {t:'niños'}, {o:['juega','juegan'], a:1}], e?}], time:120}` cada pieza variable se cambia con − / + (o tocándola); indicador en vivo de si la oración concuerda; al concordar pasa sola a la siguiente.

Nuevos:
- **tildes** "Lluvia de tildes": `{words:[{w:'arbol', a:'árbol'} | {w:'examen', a:'examen'}], time:60, lives:3}` caen palabras sin tilde; tocar la vocal donde va (las vocales son botones grandes dentro de la tarjeta) o el botón "Sin tilde". Error o palabra que toca el suelo quita vida. Velocidad creciente.
- **puente** "Puente de conectores": `{items:[{a:'Estudié mucho', b:'aprobé el examen', o:['por eso','aunque','además'], k:0, e}], time:90, lives:3}` dos orillas; elegir el conector correcto pone un tramo del puente y un personaje cruza; error agrieta el puente (vida).
- **detective** "Detective de noticias": `{cases:[{head, src, date, text?, clues:[{t, bad:true|false}], a:0|1|2, e}], time?}` cada caso muestra un titular con sus pistas ocultas (tocar para revelar, cuesta tiempo); decidir Confiable / Engañosa / Falsa. Puntos por acierto y por pistas no usadas.
- **rima** "Rima rápida": `{items:[{v:'verso', o:[...], a, kind:'consonante'|'asonante'}], time:60, lives:3}` aparece un verso con una barra de compás que se vacía; elegir la palabra que rima antes de que se acabe. Racha acelera el compás.
- **duelo** "Duelo de argumentos": `{items:[{s:'afirmación', ok:true|false, f?:'nombre de la falacia', e}], lives:3, time:90}` un rival lanza afirmaciones; "Acepto" si es un argumento válido, "Bloqueo" si es falacia; al bloquear bien se nombra la falacia. Barra de vida del rival.

## Datos de contenido (`web/content/`)

- `g6.ts … g11.ts`: `Grade` con unidades y lecciones (`types.ts`). Cada lección: `{id:'g6u1l1', title, time, std, dba, body:[párrafos con <b>], key, co, act:{type,...}, quiz:[{q,o,a,e,lv:'L'|'I'|'C'}], tip?}`. `lv` = nivel de lectura de la pregunta (literal, inferencial, crítico).
- `scenes-g<n>.js`: `export const SCENES_G<n> = { idLección: {type, ...estadoBase, steps:[{t:'título corto', ...cambios}]} }`, un paso por párrafo de `body`. `scenes.js` los junta.
- `juegos-g<n>.js`: `export const LESSON_GAMES_G<n> = { idLección: [juego1, juego2] }` (dos minijuegos por lección; cada entrada en su propia línea `  g7u1l1: [`) y `export const UNIT_GAMES_G<n> = { idUnidad: { game, title, ... } }` (cada entrada en su propia línea `  g7u1: { game:`), reto de cada unidad; `from:['g7u1l1',…]` toma ítems de las actividades `classify` de esas lecciones para `sorter`; `quizFrom:'unit'` toma las preguntas de la unidad para `blitz`. `lesson-games.js` y `games.js` los juntan. La API lee estos ids con `npm run sync-lessons` (en `api/`).

## Cómo probar

```bash
cd web
npx esbuild ruta/a/tu-prueba.js --bundle --format=iife --outfile=/tmp/…/prueba.js
NODE_PATH=$(npm root -g) node tu-script-playwright.js   # chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']})
```

Crea una página HTML de prueba que cargue `web/app/globals.css` y tu CSS, monte cada tipo con varios estados y toma capturas a 1280 px y 390 px, en claro y oscuro (`document.documentElement.dataset.theme='dark'`). Mira las capturas y corrige lo que se vea mal. Revisa que no haya errores en consola (`page.on('pageerror')`). Deja las pruebas fuera de `web/lib`.
