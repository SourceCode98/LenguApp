// Actividades de "Practica" (JavaScript sin framework). Se montan desde components/Widget.tsx.
// Contrato: W[type] = (el, spec, done) => dispose | null. done() se llama una vez cuando el estudiante termina bien.
import { esc, shuffle, nid } from './kit.js';
import { parseMarked, parseCloze, words } from './text.js';

const W = {};
const fb = (ok, msg) => '<div class="fb ' + (ok ? 'ok' : 'no') + '">' + msg + '</div>';
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } },
};

/* ---------- clasificar ---------- */
W.classify = (el, s, done) => {
  const pick = {};
  const items = s.shuffle === false ? s.items : shuffle(s.items);
  el.innerHTML = '<div class="w"><p>' + s.prompt + '</p><div class="cls">' + items.map((it, i) => '<div class="citem" data-i="' + i + '"><span>' + it[0] + '</span><div class="bins">' + s.bins.map((b, bi) => '<button data-b="' + bi + '" aria-pressed="false">' + b + '</button>').join('') + '</div></div>').join('') +
    '</div><div class="row"><button class="btn" data-ck>Comprobar</button><span class="mono" data-r></span></div><div data-f></div></div>';
  el.querySelectorAll('.citem').forEach((r) => r.querySelectorAll('.bins button').forEach((b) => (b.onclick = () => {
    pick[r.dataset.i] = +b.dataset.b; r.classList.remove('right', 'wrong');
    r.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', x === b));
  })));
  el.querySelector('[data-ck]').onclick = () => {
    let n = 0;
    el.querySelectorAll('.citem').forEach((r) => { const i = +r.dataset.i, ok = pick[i] === items[i][1]; if (ok) n++; r.classList.toggle('right', ok); r.classList.toggle('wrong', pick[i] !== undefined && !ok); });
    el.querySelector('[data-r]').textContent = n + ' de ' + items.length + ' correctas';
    el.querySelector('[data-f]').innerHTML = n === items.length ? fb(true, '¡Todo correcto! ' + (s.e || '')) : fb(false, 'Revisa las que están en rojo o sin elegir y vuelve a comprobar.');
    if (n === items.length) done();
  };
  return null;
};

/* ---------- ordenar ---------- */
W.order = (el, s, done) => {
  const items = shuffle(s.items.map((x, i) => ({ x, i })));
  let seq = [];
  function render() {
    el.innerHTML = '<div class="w"><p>' + s.prompt + '</p><div class="split"><div class="w"><span class="mono">Toca en orden</span><div class="ord">' + items.map((it, k) => '<button data-k="' + k + '" ' + (seq.includes(k) ? 'disabled' : '') + '><b>' + (seq.includes(k) ? seq.indexOf(k) + 1 : '·') + '</b><span>' + it.x + '</span></button>').join('') + '</div></div>' +
      '<div class="w"><span class="mono">Tu orden</span><ol class="ac-list">' + seq.map((k) => '<li>' + items[k].x + '</li>').join('') + '</ol><div class="row"><button class="btn ghost" data-rs>Reiniciar</button></div><div data-f></div></div></div></div>';
    el.querySelectorAll('.ord button').forEach((b) => (b.onclick = () => { seq.push(+b.dataset.k); render(); if (seq.length === items.length) check(); }));
    el.querySelector('[data-rs]').onclick = () => { seq = []; render(); };
  }
  function check() {
    const wrong = seq.map((k, p) => (items[k].i === p ? null : p + 1)).filter((x) => x);
    el.querySelector('[data-f]').innerHTML = !wrong.length ? fb(true, '¡Orden correcto! ' + (s.e || '')) : fb(false, 'Hay errores en las posiciones ' + wrong.join(', ') + '. Reinicia e intenta de nuevo.');
    if (!wrong.length) done();
  }
  render();
  return null;
};

/* ---------- marcar en el texto ---------- */
W.mark = (el, s, done) => {
  const cats = s.cats && s.cats.length ? s.cats : [{ n: 'Marcar', c: '#2B6CB0' }];
  const toks = parseMarked(s.text);
  const marks = {}; // índice de token → categoría
  let cur = 0;
  el.innerHTML = '<div class="w"><p>' + s.prompt + '</p>' +
    (cats.length > 1 ? '<div class="ac-cats" role="radiogroup" aria-label="Categoría para marcar">' + cats.map((c, i) => '<button role="radio" data-c="' + i + '" style="--cc:' + c.c + '">' + esc(c.n) + '</button>').join('') + '</div>' : '') +
    '<p class="ac-text">' + toks.map((t, i) => '<button class="ac-tok" data-i="' + i + '">' + esc(t.t) + '</button>' + (t.p ? esc(t.p) : '')).join(' ') + '</p>' +
    '<div class="row"><button class="btn" data-ck>Comprobar</button><button class="btn ghost" data-cl>Borrar marcas</button><span class="mono" data-r></span></div><div data-f></div></div>';
  const setCur = (i) => { cur = i; el.querySelectorAll('.ac-cats button').forEach((b) => b.setAttribute('aria-checked', +b.dataset.c === i)); };
  el.querySelectorAll('.ac-cats button').forEach((b) => (b.onclick = () => setCur(+b.dataset.c)));
  setCur(0);
  const paint = (b) => {
    const i = +b.dataset.i;
    b.classList.remove('right', 'wrong', 'miss');
    if (marks[i] === undefined) { b.removeAttribute('style'); b.setAttribute('aria-pressed', 'false'); }
    else { b.style.setProperty('--cc', cats[marks[i]].c); b.setAttribute('aria-pressed', 'true'); b.title = cats[marks[i]].n; }
  };
  el.querySelectorAll('.ac-tok').forEach((b) => (b.onclick = () => {
    const i = +b.dataset.i;
    if (marks[i] === cur) delete marks[i]; else marks[i] = cur;
    paint(b);
  }));
  el.querySelector('[data-cl]').onclick = () => { Object.keys(marks).forEach((k) => delete marks[k]); el.querySelectorAll('.ac-tok').forEach(paint); el.querySelector('[data-f]').innerHTML = ''; el.querySelector('[data-r]').textContent = ''; };
  el.querySelector('[data-ck]').onclick = () => {
    let hit = 0, extra = 0, wrongCat = 0;
    const total = toks.filter((t) => t.k !== null).length;
    el.querySelectorAll('.ac-tok').forEach((b) => {
      const i = +b.dataset.i, t = toks[i], m = marks[i];
      paint(b);
      if (t.k !== null && m === t.k) { hit++; b.classList.add('right'); }
      else if (t.k !== null && m !== undefined) { wrongCat++; b.classList.add('wrong'); }
      else if (t.k === null && m !== undefined) { extra++; b.classList.add('wrong'); }
    });
    el.querySelector('[data-r]').textContent = hit + ' de ' + total + ' encontradas';
    const ok = hit === total && !extra;
    const parts = [];
    if (hit < total - wrongCat) parts.push('te faltan ' + (total - hit - wrongCat));
    if (wrongCat) parts.push(wrongCat + ' con la categoría equivocada');
    if (extra) parts.push(extra + ' que no van');
    el.querySelector('[data-f]').innerHTML = ok ? fb(true, '¡Muy bien! ' + (s.e || '')) : fb(false, 'Casi: ' + parts.join(', ') + '. Las rojas están mal; corrige y vuelve a comprobar.');
    if (ok) done();
  };
  return null;
};

/* ---------- completar ---------- */
W.cloze = (el, s, done) => {
  const parts = parseCloze(s.text);
  const type = s.mode === 'type';
  const val = {};
  const norm = (x) => String(x).trim().toLowerCase().replace(/\s+/g, ' ');
  el.innerHTML = '<div class="w"><p>' + s.prompt + '</p><p class="ac-text ac-cloze">' + parts.map((p, i) => {
    if (p.t !== undefined) return esc(p.t);
    if (type) return '<input class="ac-gap" data-i="' + i + '" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Espacio ' + (i + 1) + '" size="' + Math.max(4, p.opts[0].length + 1) + '">';
    return '<span class="ac-slot" data-i="' + i + '"><span class="ac-slot-v">___</span><span class="ac-opts">' + shuffle(p.opts.map((o, k) => ({ o, k }))).map((x) => '<button data-k="' + x.k + '">' + esc(x.o) + '</button>').join('') + '</span></span>';
  }).join('') + '</p><div class="row"><button class="btn" data-ck>Comprobar</button><span class="mono" data-r></span></div><div data-f></div></div>';
  el.querySelectorAll('.ac-slot').forEach((sl) => sl.querySelectorAll('button').forEach((b) => (b.onclick = () => {
    const i = +sl.dataset.i; val[i] = +b.dataset.k;
    sl.classList.remove('right', 'wrong'); sl.classList.add('filled');
    sl.querySelector('.ac-slot-v').textContent = parts[i].opts[val[i]];
    sl.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', x === b));
  })));
  el.querySelectorAll('.ac-gap').forEach((inp) => { inp.oninput = () => inp.classList.remove('right', 'wrong'); inp.onkeydown = (e) => { if (e.key === 'Enter') el.querySelector('[data-ck]').click(); }; });
  el.querySelector('[data-ck]').onclick = () => {
    let n = 0, total = 0;
    parts.forEach((p, i) => {
      if (p.opts === undefined) return;
      total++;
      let ok, node;
      if (type) { node = el.querySelector('.ac-gap[data-i="' + i + '"]'); ok = p.opts.some((o) => norm(o) === norm(node.value)); }
      else { node = el.querySelector('.ac-slot[data-i="' + i + '"]'); ok = val[i] === 0; }
      if (ok) n++;
      node.classList.toggle('right', ok); node.classList.toggle('wrong', !ok);
    });
    el.querySelector('[data-r]').textContent = n + ' de ' + total + ' correctas';
    el.querySelector('[data-f]').innerHTML = n === total ? fb(true, '¡Todo correcto! ' + (s.e || '')) : fb(false, 'Corrige los espacios en rojo' + (type ? ' (fíjate en las tildes)' : '') + ' y vuelve a comprobar.');
    if (n === total) done();
  };
  return null;
};

/* ---------- armar (oraciones o palabras con piezas) ---------- */
W.build = (el, s, done) => {
  const rounds = s.rounds || [];
  let ri = 0, seq = [], pool = [];
  const solved = new Set();
  const joinP = (arr) => arr.join(rounds[ri].glue !== undefined ? rounds[ri].glue : ' ');
  function load() { const r = rounds[ri]; pool = shuffle(r.pieces.map((p, i) => ({ p, i }))); seq = []; render(); }
  function render() {
    const r = rounds[ri];
    el.innerHTML = '<div class="w"><p>' + s.prompt + '</p>' +
      (rounds.length > 1 ? '<div class="ac-rounds">' + rounds.map((_, i) => '<button data-r="' + i + '" class="' + (solved.has(i) ? 'ok' : '') + '" aria-current="' + (i === ri) + '">' + (i + 1) + '</button>').join('') + '</div>' : '') +
      (r.q ? '<p><b>' + r.q + '</b></p>' : '') +
      '<div class="ac-line" aria-label="Tu respuesta">' + (seq.length ? seq.map((k, j) => '<button class="ac-piece in" data-j="' + j + '">' + (r.slots && r.slots[j] ? '<small>' + esc(r.slots[j]) + '</small>' : '') + esc(pool[k].p) + '</button>').join('') : '<span class="ac-empty">Toca las piezas en orden</span>') + '</div>' +
      '<div class="ac-pool">' + pool.map((x, k) => seq.includes(k) ? '' : '<button class="ac-piece" data-k="' + k + '">' + esc(x.p) + '</button>').join('') + '</div>' +
      '<div class="row"><button class="btn" data-ck' + (seq.length ? '' : ' disabled') + '>Comprobar</button><button class="btn ghost" data-rs>Reiniciar</button>' + (r.hint ? '<button class="btn ghost" data-h>Pista</button>' : '') + '</div><div data-f></div></div>';
    el.querySelectorAll('.ac-pool .ac-piece').forEach((b) => (b.onclick = () => { seq.push(+b.dataset.k); render(); }));
    el.querySelectorAll('.ac-line .ac-piece').forEach((b) => (b.onclick = () => { seq.splice(+b.dataset.j, 1); render(); }));
    el.querySelectorAll('.ac-rounds button').forEach((b) => (b.onclick = () => { ri = +b.dataset.r; load(); }));
    el.querySelector('[data-rs]').onclick = () => { seq = []; render(); };
    const h = el.querySelector('[data-h]'); if (h) h.onclick = () => { el.querySelector('[data-f]').innerHTML = '<div class="fb info">' + r.hint + '</div>'; };
    el.querySelector('[data-ck]').onclick = check;
  }
  function check() {
    const r = rounds[ri];
    const got = joinP(seq.map((k) => pool[k].p));
    const ok = (r.answers || [r.pieces]).some((a) => joinP(a) === got);
    const f = el.querySelector('[data-f]');
    if (!ok) { f.innerHTML = fb(false, 'Todavía no. Toca una pieza de tu respuesta para devolverla y prueba otro orden.'); return; }
    solved.add(ri);
    const next = rounds.findIndex((_, i) => !solved.has(i));
    if (next === -1) { el.querySelector('.ac-line').classList.add('done'); f.innerHTML = fb(true, '¡Correcto! ' + (r.e || s.e || '')); done(); return; }
    f.innerHTML = fb(true, '¡Correcto! ' + (r.e || '') + ' <button class="btn" data-nx style="margin-left:8px">Siguiente →</button>');
    f.querySelector('[data-nx]').onclick = () => { ri = next; load(); };
  }
  load();
  return null;
};

/* ---------- escritura guiada ---------- */
W.write = (el, s, done) => {
  const key = 'll-draft-' + (s.id || s.prompt.slice(0, 40));
  const saved = store.get(key) || {};
  const st = { step: saved.step || 0, purpose: saved.purpose, plan: saved.plan || {}, text: saved.text || '', checks: saved.checks || {} };
  const min = s.min || 60;
  const save = () => store.set(key, st);
  const STEPS = ['Planear', 'Escribir', 'Revisar'];
  function render() {
    const head = '<div class="ac-steps">' + STEPS.map((n, i) => '<span class="' + (i < st.step ? 'ok' : i === st.step ? 'on' : '') + '">' + (i + 1) + '. ' + n + '</span>').join('') + '</div>';
    let body = '';
    if (st.step === 0) {
      body = (s.purpose ? '<div class="w"><b>' + s.purpose.q + '</b><div class="chips">' + s.purpose.o.map((o, i) => '<button class="chip" data-p="' + i + '" aria-pressed="' + (st.purpose === i) + '">' + esc(o) + '</button>').join('') + '</div></div>' : '') +
        s.plan.map((p, i) => '<label class="ac-field"><b>' + p.q + '</b><input data-pl="' + i + '" value="' + esc(st.plan[i] || '') + '" placeholder="' + esc(p.ph || '') + '" maxlength="200"></label>').join('') +
        '<div class="row"><button class="btn" data-go>Seguir a escribir →</button></div><div data-f></div>';
    } else if (st.step === 1) {
      body = '<div class="ac-plan"><span class="mono">Tu plan</span><ul>' + s.plan.map((p, i) => '<li><b>' + p.q + '</b> ' + esc(st.plan[i] || '') + '</li>').join('') + '</ul></div>' +
        (s.model ? '<details class="ac-model"><summary>Ver un ejemplo</summary><p>' + s.model + '</p></details>' : '') +
        '<textarea class="ac-area" rows="10" aria-label="Tu texto">' + esc(st.text) + '</textarea><div class="row"><span class="mono" data-wc></span><button class="btn ghost" data-back>← Plan</button><button class="btn" data-go>Revisar →</button></div><div data-f></div>';
    } else {
      const ws = words(st.text);
      const freq = {};
      ws.filter((w) => w.length > 3).forEach((w) => (freq[w] = (freq[w] || 0) + 1));
      const reps = Object.keys(freq).filter((w) => freq[w] >= 3);
      const longs = st.text.split(/[.!?]+/).filter((x) => words(x).length > 35).length;
      body = '<div class="ac-review"><p class="ac-draft">' + esc(st.text).replace(/\n/g, '<br>') + '</p>' +
        '<div class="ac-hints">' + (reps.length ? '<div class="fb info">Palabras que repites mucho: <b>' + reps.map(esc).join(', ') + '</b>. ¿Puedes cambiar alguna por un sinónimo?</div>' : '') +
        (longs ? '<div class="fb info">Tienes ' + longs + (longs === 1 ? ' oración muy larga' : ' oraciones muy largas') + ' (más de 35 palabras). Prueba partirla con un punto.</div>' : '') + '</div>' +
        '<div class="ac-check"><span class="mono">Lista de revisión</span>' + s.checklist.map((c, i) => '<label><input type="checkbox" data-c="' + i + '" ' + (st.checks[i] ? 'checked' : '') + '> ' + c + '</label>').join('') + '</div></div>' +
        '<div class="row"><button class="btn ghost" data-back>← Corregir mi texto</button><button class="btn" data-go>Terminar</button></div><div data-f></div>';
    }
    el.innerHTML = '<div class="w ac-write"><p>' + s.prompt + '</p>' + head + body + '</div>';
    const f = el.querySelector('[data-f]');
    el.querySelectorAll('[data-p]').forEach((b) => (b.onclick = () => { st.purpose = +b.dataset.p; save(); render(); }));
    el.querySelectorAll('[data-pl]').forEach((i) => (i.oninput = () => { st.plan[i.dataset.pl] = i.value; save(); }));
    const area = el.querySelector('.ac-area');
    const wc = () => { const n = words(st.text).length; el.querySelector('[data-wc]').textContent = n + ' de ' + min + ' palabras mínimo'; };
    if (area) { area.oninput = () => { st.text = area.value; save(); wc(); }; wc(); }
    el.querySelectorAll('[data-c]').forEach((c) => (c.onchange = () => { st.checks[c.dataset.c] = c.checked; save(); }));
    const back = el.querySelector('[data-back]'); if (back) back.onclick = () => { st.step--; save(); render(); };
    el.querySelector('[data-go]').onclick = () => {
      if (st.step === 0) {
        if (s.purpose && st.purpose === undefined) { f.innerHTML = fb(false, 'Elige primero el propósito del texto.'); return; }
        if (s.plan.some((_, i) => !(st.plan[i] || '').trim())) { f.innerHTML = fb(false, 'Completa todas las casillas del plan.'); return; }
        st.step = 1; save(); render(); return;
      }
      if (st.step === 1) {
        if (words(st.text).length < min) { f.innerHTML = fb(false, 'Tu texto necesita al menos ' + min + ' palabras.'); return; }
        st.step = 2; save(); render(); return;
      }
      if (s.checklist.some((_, i) => !st.checks[i])) { f.innerHTML = fb(false, 'Revisa tu texto con cada punto de la lista y márcalo cuando lo cumplas. Si algo falta, vuelve a corregir.'); return; }
      f.innerHTML = fb(true, '¡Texto terminado! Cópialo o muéstraselo a tu profe. ' + (s.e || ''));
      done();
    };
  }
  render();
  return null;
};

/* ---------- grabar y autoevaluar ---------- */
W.record = (el, s, done) => {
  const rubric = s.rubric || ['Volumen', 'Tono', 'Ritmo', 'Claridad'];
  const max = s.max || 120;
  const score = {};
  let rec = null, chunks = [], stream = null, url = null, timer = null, t0 = 0, practiced = false;
  const canRec = typeof window.MediaRecorder !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
  const LV = ['Por mejorar', 'Bien', 'Excelente'];
  el.innerHTML = '<div class="w"><p>' + s.prompt + '</p>' + (s.text ? '<blockquote class="ac-read">' + s.text + '</blockquote>' : '') +
    '<div class="ac-rec"><button class="btn" data-rec>' + (canRec ? '● Grabar' : 'Practiqué en voz alta') + '</button>' + (canRec ? '<button class="btn ghost" data-np>Practiqué sin grabar</button>' : '') + '<span class="mono" data-t></span></div><div data-au></div>' +
    '<div class="ac-rubric" hidden><span class="mono">Evalúate de 1 a 3</span>' + rubric.map((r, i) => '<div class="ac-rrow"><b>' + r + '</b><div class="chips">' + LV.map((l, k) => '<button class="chip" data-i="' + i + '" data-k="' + (k + 1) + '">' + (k + 1) + ' · ' + l + '</button>').join('') + '</div></div>').join('') + '</div><div data-f></div></div>';
  const T = el.querySelector('[data-t]'), F = el.querySelector('[data-f]');
  const showRubric = () => { practiced = true; el.querySelector('.ac-rubric').hidden = false; };
  const stopAll = () => { if (timer) clearInterval(timer); timer = null; if (stream) stream.getTracks().forEach((t) => t.stop()); stream = null; };
  const btn = el.querySelector('[data-rec]');
  btn.onclick = async () => {
    if (!canRec) { showRubric(); return; }
    if (rec && rec.state === 'recording') { rec.stop(); return; }
    try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
    catch (e) { F.innerHTML = '<div class="fb info">No pudimos usar el micrófono. Practica en voz alta y luego evalúate.</div>'; showRubric(); return; }
    chunks = []; rec = new MediaRecorder(stream);
    rec.ondataavailable = (e) => chunks.push(e.data);
    rec.onstop = () => {
      stopAll(); btn.textContent = '● Grabar de nuevo'; btn.classList.remove('rec');
      if (url) URL.revokeObjectURL(url);
      url = URL.createObjectURL(new Blob(chunks, { type: rec.mimeType || 'audio/webm' }));
      el.querySelector('[data-au]').innerHTML = '<audio controls src="' + url + '"></audio>';
      showRubric();
    };
    rec.start(); t0 = Date.now(); btn.textContent = '■ Detener'; btn.classList.add('rec');
    timer = setInterval(() => { const sec = Math.floor((Date.now() - t0) / 1000); T.textContent = sec + ' s de ' + max + ' s'; if (sec >= max) rec.stop(); }, 250);
  };
  const np = el.querySelector('[data-np]'); if (np) np.onclick = showRubric;
  el.querySelectorAll('.ac-rubric .chip').forEach((b) => (b.onclick = () => {
    score[b.dataset.i] = +b.dataset.k;
    b.parentNode.querySelectorAll('.chip').forEach((x) => x.setAttribute('aria-pressed', x === b));
    if (practiced && rubric.every((_, i) => score[i])) {
      const low = rubric.filter((_, i) => score[i] === 1);
      F.innerHTML = fb(true, 'Autoevaluación lista. ' + (low.length ? 'Para la próxima, trabaja en: ' + low.join(', ').toLowerCase() + '.' : '¡Muy buen trabajo!'));
      done();
    }
  }));
  return () => { stopAll(); if (rec && rec.state === 'recording') try { rec.stop(); } catch (e) { /* */ } if (url) URL.revokeObjectURL(url); };
};

/* ---------- organizador gráfico ---------- */
W.map = (el, s, done) => {
  const cards = shuffle([...s.slots.map((x, i) => ({ t: x.a, i })), ...(s.extra || []).map((t) => ({ t, i: -1 }))]);
  const place = {}; // casilla → índice de tarjeta
  let sel = null;
  const id = nid();
  function render() {
    const used = new Set(Object.values(place));
    const slot = (x, i) => '<button class="ac-slotbox' + (place[i] !== undefined ? ' filled' : '') + '" data-s="' + i + '"><small>' + esc(x.label) + '</small><span>' + (place[i] !== undefined ? esc(cards[place[i]].t) : 'Toca una tarjeta y luego aquí') + '</span></button>';
    el.innerHTML = '<div class="w"><p>' + s.prompt + '</p><div class="ac-map ac-' + (s.kind || 'concept') + '" id="' + id + '">' +
      (s.center ? '<div class="ac-center">' + esc(s.center) + '</div>' : '') + s.slots.map(slot).join('') + '</div>' +
      '<div class="ac-cards">' + cards.map((c, k) => used.has(k) ? '' : '<button class="ac-card" data-k="' + k + '" aria-pressed="' + (sel === k) + '">' + esc(c.t) + '</button>').join('') + '</div>' +
      '<div class="row"><button class="btn" data-ck>Comprobar</button><button class="btn ghost" data-rs>Reiniciar</button></div><div data-f></div></div>';
    el.querySelectorAll('.ac-card').forEach((b) => (b.onclick = () => { sel = sel === +b.dataset.k ? null : +b.dataset.k; render(); }));
    el.querySelectorAll('.ac-slotbox').forEach((b) => (b.onclick = () => {
      const i = +b.dataset.s;
      if (sel !== null) { place[i] = sel; sel = null; }
      else if (place[i] !== undefined) delete place[i];
      render();
    }));
    el.querySelector('[data-rs]').onclick = () => { Object.keys(place).forEach((k) => delete place[k]); sel = null; render(); };
    el.querySelector('[data-ck]').onclick = () => {
      let n = 0;
      el.querySelectorAll('.ac-slotbox').forEach((b) => { const i = +b.dataset.s, ok = place[i] !== undefined && cards[place[i]].t === s.slots[i].a; if (ok) n++; b.classList.toggle('right', ok); b.classList.toggle('wrong', !ok); });
      el.querySelector('[data-f]').innerHTML = n === s.slots.length ? fb(true, '¡Organizador completo! ' + (s.e || '')) : fb(false, n + ' de ' + s.slots.length + ' bien. Toca una casilla roja para vaciarla y vuelve a intentar.');
      if (n === s.slots.length) done();
    };
  }
  render();
  return null;
};

export function mountWidget(el, spec, done) {
  let fired = false;
  const d = () => { if (!fired) { fired = true; done(); } };
  const f = W[spec.type];
  if (!f) { el.textContent = 'Actividad no disponible'; return null; }
  return f(el, spec, d) || null;
}
