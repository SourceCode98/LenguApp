// Actividades nuevas de "Practica" (ronda "variedad y masticadito"). Se registran en W desde widgets.js.
// Contrato: (el, spec, done) => dispose | null. done() se llama una sola vez cuando el estudiante termina bien.
import { esc, shuffle } from './kit.js';
import { parseCloze } from './text.js';

const fb = (ok, msg) => '<div class="fb ' + (ok ? 'ok' : 'no') + '">' + msg + '</div>';
const once = (done) => { let f = false; return () => { if (!f) { f = true; done(); } }; };
// Baraja sin dejar el orden original (si hay más de un elemento).
const mix = (arr, same) => { let r = shuffle(arr); for (let t = 0; t < 6 && arr.length > 1 && same(r); t++) r = shuffle(arr); return r; };
const LETTERS = 'ABCDEFGHIJKL';

/* ---------- unir parejas ---------- */
const match = (el, s, done0) => {
  const done = once(done0);
  const pairs = s.pairs || [];
  const right = mix(pairs.map((p, j) => ({ t: p[1], j })), (r) => r.every((x, k) => x.j === k));
  const link = {}; // izquierda i → índice original de la derecha j
  let sel = null;
  el.innerHTML = '<div class="w ac-match"><p>' + s.prompt + '</p>' +
    '<p class="ac-howto">Toca una tarjeta de la izquierda y luego su pareja a la derecha. Toca otra vez para deshacer.</p>' +
    '<div class="ac-mcols"><svg class="ac-mlines" aria-hidden="true"></svg>' +
    '<div class="ac-mcol" data-side="l">' + pairs.map((p, i) => '<button class="ac-mcard" data-l="' + i + '" aria-pressed="false"><span class="ac-mtag" aria-hidden="true"></span><span class="ac-mtx">' + esc(p[0]) + '</span></button>').join('') + '</div>' +
    '<div class="ac-mcol" data-side="r">' + right.map((r) => '<button class="ac-mcard" data-rj="' + r.j + '"><span class="ac-mtag" aria-hidden="true"></span><span class="ac-mtx">' + esc(r.t) + '</span></button>').join('') + '</div>' +
    '</div><div class="row"><button class="btn" data-ck>Comprobar</button><button class="btn ghost" data-rs>Borrar uniones</button><span class="mono" data-r></span></div><div data-f></div></div>';
  const cols = el.querySelector('.ac-mcols');
  const svg = el.querySelector('.ac-mlines');
  const L = [...el.querySelectorAll('[data-l]')];
  const R = [...el.querySelectorAll('[data-rj]')];
  const rBtn = (j) => R.find((b) => +b.dataset.rj === j);
  const leftOf = (j) => { const k = Object.keys(link).find((i) => link[i] === j); return k === undefined ? null : +k; };
  function lines() {
    const box = cols.getBoundingClientRect();
    svg.setAttribute('viewBox', '0 0 ' + Math.max(1, box.width) + ' ' + Math.max(1, box.height));
    svg.innerHTML = Object.keys(link).map((i) => {
      const a = L[i].getBoundingClientRect(), b = rBtn(link[i]).getBoundingClientRect();
      const x1 = a.right - box.left, y1 = a.top + a.height / 2 - box.top, x2 = b.left - box.left, y2 = b.top + b.height / 2 - box.top;
      const mx = (x1 + x2) / 2, wob = ((+i % 3) - 1) * 4;
      return '<path d="M' + x1 + ' ' + y1 + ' C' + (mx + wob) + ' ' + (y1 + wob) + ' ' + (mx - wob) + ' ' + (y2 - wob) + ' ' + x2 + ' ' + y2 + '" style="--pc:var(--mc' + (+i % 6) + ')"/>';
    }).join('');
  }
  function paint() {
    L.forEach((b) => {
      const i = +b.dataset.l, on = link[i] !== undefined;
      b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(sel === i));
      b.classList.toggle('sel', sel === i);
      if (on || sel === i) b.style.setProperty('--mc', 'var(--mc' + (i % 6) + ')'); else b.style.removeProperty('--mc');
      b.querySelector('.ac-mtag').textContent = on ? LETTERS[i % 12] : '';
      b.setAttribute('aria-label', b.querySelector('.ac-mtx').textContent + (on ? ', unida con ' + rBtn(link[i]).querySelector('.ac-mtx').textContent : ''));
    });
    R.forEach((b) => {
      const i = leftOf(+b.dataset.rj), on = i !== null;
      b.classList.toggle('on', on);
      if (on) b.style.setProperty('--mc', 'var(--mc' + (i % 6) + ')'); else b.style.removeProperty('--mc');
      b.querySelector('.ac-mtag').textContent = on ? LETTERS[i % 12] : '';
    });
    lines();
  }
  const clearMarks = (...bs) => bs.forEach((b) => b && b.classList.remove('right', 'wrong'));
  L.forEach((b) => (b.onclick = () => {
    const i = +b.dataset.l;
    if (link[i] !== undefined) { clearMarks(b, rBtn(link[i])); delete link[i]; sel = null; }
    else sel = sel === i ? null : i;
    paint();
  }));
  R.forEach((b) => (b.onclick = () => {
    const j = +b.dataset.rj, owner = leftOf(j);
    if (sel === null) {
      if (owner !== null) { clearMarks(b, L[owner]); delete link[owner]; paint(); }
      else el.querySelector('[data-f]').innerHTML = '<div class="fb info">Primero toca una tarjeta de la izquierda.</div>';
      return;
    }
    if (owner !== null) { clearMarks(L[owner]); delete link[owner]; }
    link[sel] = j; clearMarks(b, L[sel]); sel = null;
    el.querySelector('[data-f]').innerHTML = '';
    paint();
  }));
  el.querySelector('[data-rs]').onclick = () => {
    Object.keys(link).forEach((k) => delete link[k]); sel = null; clearMarks(...L, ...R);
    el.querySelector('[data-f]').innerHTML = ''; el.querySelector('[data-r]').textContent = ''; paint();
  };
  el.querySelector('[data-ck]').onclick = () => {
    let n = 0;
    L.forEach((b) => {
      const i = +b.dataset.l, has = link[i] !== undefined, ok = link[i] === i;
      if (ok) n++;
      b.classList.toggle('right', ok); b.classList.toggle('wrong', !ok);
      if (has) { const r = rBtn(link[i]); r.classList.toggle('right', ok); r.classList.toggle('wrong', !ok); }
    });
    R.forEach((b) => { if (leftOf(+b.dataset.rj) === null) b.classList.remove('right', 'wrong'); });
    el.querySelector('[data-r]').textContent = n + ' de ' + pairs.length + ' parejas bien';
    const missing = pairs.length - Object.keys(link).length;
    el.querySelector('[data-f]').innerHTML = n === pairs.length ? fb(true, '¡Todas las parejas están bien! ' + (s.e || ''))
      : fb(false, (missing ? 'Te faltan ' + missing + ' por unir. ' : '') + 'Las rojas no van juntas: tócalas para deshacer y vuelve a comprobar.');
    if (n === pairs.length) done();
  };
  paint();
  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => lines()) : null;
  if (ro) ro.observe(cols); else window.addEventListener('resize', lines);
  // Las fuentes a mano pueden cambiar la altura de las tarjetas al cargar.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (el.isConnected) lines(); });
  return () => { if (ro) ro.disconnect(); else window.removeEventListener('resize', lines); };
};

/* ---------- situaciones: una tarjeta a la vez ---------- */
const choose = (el, s, done0) => {
  const done = once(done0);
  const items = s.items || [];
  const ok = new Set(); // tarjetas resueltas
  const first = new Set(); // resueltas al primer intento
  const tried = new Set(); // tarjetas con algún error
  let cur = 0, order = [];
  const nextOpen = (from) => { for (let k = 1; k <= items.length; k++) { const i = (from + k) % items.length; if (!ok.has(i)) return i; } return -1; };
  function head() {
    const pct = Math.round((ok.size / Math.max(1, items.length)) * 100);
    return '<div class="ac-chead"><span class="mono">Tarjeta ' + Math.min(cur + 1, items.length) + ' de ' + items.length + '</span><span class="mono">' + ok.size + ' bien</span></div>' +
      '<div class="bar ac-cbar" role="progressbar" aria-valuemin="0" aria-valuemax="' + items.length + '" aria-valuenow="' + ok.size + '" aria-label="Avance"><i style="width:' + pct + '%"></i></div>';
  }
  function render() {
    const it = items[cur];
    order = mix(it.o.map((o, k) => ({ o, k })), () => false);
    el.innerHTML = '<div class="w ac-choose"><p>' + s.prompt + '</p>' + head() +
      '<div class="ac-ccard"><p class="ac-sit">' + it.s + '</p><div class="ac-copts">' +
      order.map((x, n) => '<button class="ac-copt" data-k="' + x.k + '"><b aria-hidden="true">' + LETTERS[n] + '</b><span>' + esc(x.o) + '</span></button>').join('') +
      '</div><div data-f aria-live="polite"></div></div></div>';
    el.querySelectorAll('.ac-copt').forEach((b) => (b.onclick = () => pick(b)));
  }
  function pick(b) {
    const it = items[cur], k = +b.dataset.k, good = k === it.a;
    const f = el.querySelector('[data-f]');
    el.querySelectorAll('.ac-copt').forEach((x) => { x.disabled = true; });
    b.classList.add(good ? 'right' : 'wrong');
    if (good) {
      ok.add(cur); if (!tried.has(cur)) first.add(cur);
      const nx = nextOpen(cur);
      el.querySelector('.ac-cbar').setAttribute('aria-valuenow', String(ok.size));
      el.querySelector('.ac-cbar i').style.width = Math.round((ok.size / items.length) * 100) + '%';
      el.querySelector('.ac-chead span:last-child').textContent = ok.size + ' bien';
      if (nx === -1) {
        f.innerHTML = fb(true, '<b>¡Bien!</b> ' + (it.e || ''));
        f.insertAdjacentHTML('beforeend', '<div class="ac-cend"><b>¡Listo! ' + items.length + ' de ' + items.length + '</b><span>' +
          (first.size === items.length ? 'Todas a la primera. ¡Qué nivel!' : first.size + ' a la primera y ' + (items.length - first.size) + ' con un segundo intento.') + '</span>' +
          (s.e ? '<span>' + s.e + '</span>' : '') + '</div>');
        done();
        return;
      }
      f.innerHTML = fb(true, '<b>¡Bien!</b> ' + (it.e || '')) + '<div class="row"><button class="btn" data-nx>Siguiente →</button></div>';
      const n = f.querySelector('[data-nx]');
      n.onclick = () => { cur = nx; render(); const o = el.querySelector('.ac-copt'); if (o) o.focus(); };
      n.focus({ preventScroll: true });
    } else {
      tried.add(cur);
      f.innerHTML = fb(false, '<b>Esa no es.</b> ' + (it.e || '')) + '<div class="row"><button class="btn" data-again>Intentar de nuevo</button></div>';
      const a = f.querySelector('[data-again]');
      a.onclick = () => { render(); const o = el.querySelector('.ac-copt'); if (o) o.focus(); };
      a.focus({ preventScroll: true });
    }
  }
  if (!items.length) { el.innerHTML = '<p class="hint">Sin tarjetas.</p>'; return null; }
  render();
  return null;
};

/* ---------- corrige el texto ---------- */
const PUNCT = /^([¡¿"«“(]*)(.*?)([.,;:!?»”")]*)$/;
const fix = (el, s, done0) => {
  const done = once(done0);
  const parts = parseCloze(s.text);
  const gaps = parts.map((p, i) => (p.opts ? i : -1)).filter((i) => i >= 0);
  const val = {}; // hueco → índice de opción elegida (1 = la original incorrecta)
  let open = null; // {kind:'gap'|'ok', i}
  const shown = (i) => parts[i].opts[val[i] !== undefined ? val[i] : 1];
  let tok = 0;
  // Átomos separados por espacios; lo que va pegado (palabra + puntuación, hueco + coma) no se parte de línea.
  const units = [[]];
  parts.forEach((p, i) => {
    if (p.opts) { units[units.length - 1].push('<button class="ac-fw ac-fgap" data-g="' + i + '"><s class="ac-fold" aria-hidden="true"></s><span class="ac-fv">' + esc(p.opts[1] !== undefined ? p.opts[1] : p.opts[0]) + '</span></button>'); return; }
    p.t.split(/(\s+)/).forEach((w) => {
      if (!w) return;
      if (/^\s+$/.test(w)) { units.push([]); return; }
      const m = PUNCT.exec(w);
      units[units.length - 1].push(!m[2] || !/[a-záéíóúüñ0-9]/i.test(m[2]) ? esc(w) : esc(m[1]) + '<button class="ac-fw" data-t="' + (tok++) + '">' + esc(m[2]) + '</button>' + esc(m[3]));
    });
  });
  const html = units.filter((u) => u.length).map((u) => '<span class="ac-fu">' + u.join('') + '</span>').join(' ');
  el.innerHTML = '<div class="w ac-fix"><p>' + s.prompt + '</p>' +
    '<div class="ac-fcount"><b data-n></b><span class="mono" data-p></span></div>' +
    '<p class="ac-text ac-ftext">' + html + '</p><div class="ac-fpanel" data-panel hidden></div>' +
    '<div class="row"><button class="btn" data-ck>Comprobar</button><span class="mono" data-r></span></div><div data-f></div></div>';
  const panel = el.querySelector('[data-panel]');
  const count = () => {
    const pend = gaps.filter((i) => val[i] === undefined || val[i] === 1).length;
    el.querySelector('[data-n]').textContent = 'Hay ' + gaps.length + (gaps.length === 1 ? ' error' : ' errores');
    el.querySelector('[data-p]').textContent = pend ? 'Te ' + (pend === 1 ? 'falta 1 por arreglar' : 'faltan ' + pend + ' por arreglar') : 'Ya cambiaste todos: comprueba';
  };
  const paintGap = (i) => {
    const b = el.querySelector('[data-g="' + i + '"]'), ch = val[i] !== undefined && val[i] !== 1;
    b.classList.toggle('edited', ch); b.classList.remove('right', 'wrong');
    b.querySelector('.ac-fold').textContent = ch ? parts[i].opts[1] : '';
    b.querySelector('.ac-fv').textContent = shown(i);
    b.setAttribute('aria-label', ch ? 'Cambiaste ' + parts[i].opts[1] + ' por ' + shown(i) : shown(i));
  };
  const closePanel = () => { open = null; panel.hidden = true; panel.innerHTML = ''; el.querySelectorAll('.ac-fw.sel').forEach((x) => x.classList.remove('sel')); };
  el.querySelectorAll('.ac-fw').forEach((b) => (b.onclick = () => {
    const isGap = b.dataset.g !== undefined;
    const id = isGap ? 'g' + b.dataset.g : 't' + b.dataset.t;
    const wasOpen = open && open.id === id;
    closePanel();
    if (wasOpen) return;
    b.classList.add('sel'); open = { id };
    panel.hidden = false;
    if (!isGap) {
      panel.innerHTML = '<div class="ac-fok"><b>«' + esc(b.textContent) + '»: esa está bien.</b> Busca otra palabra.</div>';
      return;
    }
    const i = +b.dataset.g, p = parts[i];
    panel.innerHTML = '<span class="mono">Cambiar «' + esc(shown(i)) + '» por:</span><div class="ac-fopts">' +
      mix(p.opts.map((o, k) => ({ o, k })), () => false).filter((x) => x.k !== (val[i] !== undefined ? val[i] : 1)).map((x) => '<button data-k="' + x.k + '">' + esc(x.o) + '</button>').join('') +
      '</div><button class="ac-fcancel" data-x>Cerrar</button>';
    panel.querySelectorAll('[data-k]').forEach((o) => (o.onclick = () => { val[i] = +o.dataset.k; paintGap(i); count(); closePanel(); b.focus({ preventScroll: true }); }));
    panel.querySelector('[data-x]').onclick = () => { closePanel(); b.focus({ preventScroll: true }); };
    const first = panel.querySelector('[data-k]'); if (first) first.focus({ preventScroll: true });
  }));
  el.querySelector('[data-ck]').onclick = () => {
    closePanel();
    let n = 0;
    gaps.forEach((i) => {
      const b = el.querySelector('[data-g="' + i + '"]'), good = val[i] === 0;
      if (good) n++;
      b.classList.toggle('right', good); b.classList.toggle('wrong', !good);
    });
    el.querySelector('[data-r]').textContent = n + ' de ' + gaps.length + ' corregidos';
    el.querySelector('[data-f]').innerHTML = n === gaps.length ? fb(true, '¡Texto corregido! ' + (s.e || ''))
      : fb(false, 'Las palabras en rojo siguen mal. Tócalas, elige otra opción y vuelve a comprobar.');
    if (n === gaps.length) done();
  };
  count();
  return null;
};

/* ---------- historieta ---------- */
const comic = (el, s, done0) => {
  const done = once(done0);
  const panels = (s.panels || []).slice(0, 6);
  const val = {}; // "p-i" → opción elegida
  const parsed = panels.map((p) => parseCloze(p.say || ''));
  const cols = panels.length === 4 || panels.length === 2 ? 2 : 3;
  el.innerHTML = '<div class="w ac-comic"><p>' + s.prompt + '</p><div class="ac-strip" style="--cols:' + cols + '">' +
    panels.map((p, pi) => '<figure class="ac-panel' + (pi % 2 ? ' flip' : '') + '"><span class="ac-pnum" aria-hidden="true">' + (pi + 1) + '</span>' +
      '<div class="ac-bubble"><p class="ac-cloze-in">' + parsed[pi].map((x, i) => {
        if (x.t !== undefined) return esc(x.t);
        return '<span class="ac-slot" data-k="' + pi + '-' + i + '"><span class="ac-slot-v">___</span><span class="ac-opts">' +
          mix(x.opts.map((o, k) => ({ o, k })), () => false).map((o) => '<button data-o="' + o.k + '">' + esc(o.o) + '</button>').join('') + '</span></span>';
      }).join('') + '</p></div>' +
      '<figcaption class="ac-who"><span class="ac-face" aria-hidden="true">' + esc(p.face || '🙂') + '</span><b>' + esc(p.who || '') + '</b></figcaption></figure>').join('') +
    '</div><div class="row"><button class="btn" data-ck>Comprobar</button><span class="mono" data-r></span></div><div data-f></div></div>';
  el.querySelectorAll('.ac-slot').forEach((sl) => sl.querySelectorAll('button').forEach((b) => (b.onclick = () => {
    const [pi, i] = sl.dataset.k.split('-').map(Number);
    val[sl.dataset.k] = +b.dataset.o;
    sl.classList.remove('right', 'wrong'); sl.classList.add('filled');
    sl.querySelector('.ac-slot-v').textContent = parsed[pi][i].opts[+b.dataset.o];
    sl.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    sl.closest('.ac-panel').classList.remove('right', 'wrong');
  })));
  el.querySelector('[data-ck]').onclick = () => {
    let n = 0, total = 0;
    el.querySelectorAll('.ac-panel').forEach((pn) => {
      let all = true;
      pn.querySelectorAll('.ac-slot').forEach((sl) => {
        total++;
        const good = val[sl.dataset.k] === 0;
        if (good) n++; else all = false;
        sl.classList.toggle('right', good); sl.classList.toggle('wrong', !good);
      });
      if (pn.querySelector('.ac-slot')) { pn.classList.toggle('right', all); pn.classList.toggle('wrong', !all); }
    });
    el.querySelector('[data-r]').textContent = n + ' de ' + total + ' correctas';
    el.querySelector('[data-f]').innerHTML = n === total ? fb(true, '¡La historieta quedó perfecta! ' + (s.e || ''))
      : fb(false, 'Revisa los globos marcados en rojo, cambia la palabra y vuelve a comprobar.');
    if (n === total) done();
  };
  return null;
};

export const EXTRA = { match, choose, fix, comic };
