(() => {
  'use strict';

  const C = window.INVITACION || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const get = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
  const fecha = new Date(C.fecha);
  const LOCALE = 'es-MX';

  /* ---------------- Textos simples ---------------- */
  $$('[data-c]').forEach(el => {
    const v = get(C, el.dataset.c);
    if (v != null && v !== '') el.textContent = v;
  });
  if (C.nombre) {
    document.title = `${C.titulo || 'Mis XV Años'} · ${C.nombre}`;
  }
  const inicial = (C.nombre || 'F').trim().charAt(0).toUpperCase();

  /* ---------------- Fechas ---------------- */
  if (!isNaN(fecha)) {
    const dd = String(fecha.getDate()).padStart(2, '0');
    const mm = String(fecha.getMonth() + 1).padStart(2, '0');
    $('#heroDate').textContent = `${dd} · ${mm} · ${fecha.getFullYear()}`;
    const larga = fecha.toLocaleDateString(LOCALE, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    $('#cdDate').textContent = larga.charAt(0).toUpperCase() + larga.slice(1);

    // Google Calendar
    const fmt = d => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const fin = new Date(fecha.getTime() + 8 * 3600 * 1000);
    const lugar = (C.eventos || []).find(e => e.lugar);
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: `XV Años de ${C.nombre}`,
      dates: `${fmt(fecha)}/${fmt(fin)}`,
      details: '¡Te espero para celebrar juntos mi cuento de hadas!',
      location: lugar ? `${lugar.lugar}, ${lugar.direccion || ''}` : ''
    });
    $('#calBtn').href = `https://calendar.google.com/calendar/render?${params}`;
  }

  /* ---------------- Padrinos ---------------- */
  $('#padrinos').innerHTML = (C.padrinos || []).map(p => `
    <div class="padrino reveal">
      <h3 class="oro-text">${p.rol}</h3>
      <p>${p.nombres}</p>
    </div>`).join('');

  /* ---------------- Itinerario ---------------- */
  // Íconos de línea dorada (mismo estilo que el ícono de la iglesia)
  const svg = cuerpo => `<svg class="icono" viewBox="0 0 64 64" aria-hidden="true">${cuerpo}</svg>`;
  const ICONOS = {
    iglesia: `<img class="icono" src="assets/img/icono-iglesia.png" alt="">`,
    recepcion: svg(`<g class="ico">
      <g transform="rotate(-14 22 56)"><path d="M15 12h14l-1.5 16a5.5 5.5 0 0 1-11 0Z"/><path d="M22 33.5V52M15 52h14"/><path d="M16 20h12"/></g>
      <g transform="rotate(14 42 56)"><path d="M35 12h14l-1.5 16a5.5 5.5 0 0 1-11 0Z"/><path d="M42 33.5V52M35 52h14"/><path d="M36 20h12"/></g>
      <path d="M32 3v5M26 5l2.5 4M38 5l-2.5 4"/></g>`),
    cena: svg(`<g class="ico">
      <circle cx="32" cy="34" r="14"/><circle cx="32" cy="34" r="9"/>
      <path d="M7 12v10M11 12v10M15 12v10M7 22a4 4 0 0 0 8 0M11 26v30"/>
      <path d="M53 12c-5 5-6 14-5 22h5ZM53 34v22"/></g>`),
    vals: svg(`<g class="ico">
      <path d="M22 44V14l28-6v30M22 22l28-6"/><circle cx="16.5" cy="44" r="5.5"/><circle cx="44.5" cy="38" r="5.5"/>
      <path d="M32 60l-6-6a4 4 0 0 1 6-5 4 4 0 0 1 6 5Z"/></g>`),
    baile: svg(`<g class="ico">
      <path d="M32 3v9"/><circle cx="32" cy="32" r="18"/>
      <path d="M14 32h36M17 23h30M17 41h30"/>
      <path d="M32 14v36M25 15.5c-4 10-4 23 0 33M39 15.5c4 10 4 23 0 33"/>
      <path d="M55 6v10M50 11h10M9 46v8M5 50h8"/></g>`),
    fin: svg(`<g class="ico">
      <path d="M8 58V32h8v-6l4-10 4 10v6h6V18l5-12 5 12v14h6v-6l4-10 4 10v6h6v26Z"/>
      <path d="M28 58V48a4 4 0 0 1 8 0v10M4 58h56"/>
      <path d="M35 6V1l5 1.5-5 1.5"/></g>`),
    pastel: svg(`<g class="ico"><path d="M12 58h40M14 58V40h36v18M18 40V28h28v12M22 28V20h20v8M32 20v-8"/><path d="M14 48c6 4 10-4 18 0s12-4 18 0"/><path d="M32 4c3 3 3 6 0 8-3-2-3-5 0-8Z"/></g>`),
    foto: svg(`<g class="ico"><rect x="6" y="18" width="52" height="36" rx="5"/><path d="M22 18l4-8h12l4 8"/><circle cx="32" cy="36" r="10"/></g>`)
  };
  const icono = e => e.imagen
    ? `<img class="icono" src="${e.imagen}" alt="" loading="lazy">`
    : (ICONOS[e.icono] || ICONOS.fin);

  $('#timeline').innerHTML = (C.eventos || []).map((e, i) => `
    <li class="t-item reveal ${i % 2 ? 'der' : 'izq'}">
      <div class="t-icon">${icono(e)}</div>
      <span class="t-dot"></span>
      <div class="t-card">
        <h3>${e.titulo}</h3>
        ${e.hora ? `<p class="t-hora">${e.hora}</p>` : ''}
        ${e.lugar ? `<p class="t-lugar">${e.lugar}</p>` : ''}
        ${e.direccion ? `<p class="t-dir">${e.direccion}</p>` : ''}
        ${e.mapa ? `<a class="btn-outline" href="${e.mapa}" target="_blank" rel="noopener">Ver ubicación</a>` : ''}
      </div>
    </li>`).join('');

  /* ---------------- Regalos ---------------- */
  const R = C.regalos || {};
  const gifts = [];
  if (R.sobres) gifts.push(`
    <div class="gift reveal">
      <svg viewBox="0 0 100 100" class="floaty">
        <rect x="10" y="26" width="80" height="54" rx="4" fill="#f7b9d7" stroke="url(#gOro)" stroke-width="2"/>
        <path d="M10 30l40 28 40-28" fill="#fcd9ea" stroke="url(#gOro)" stroke-width="2"/>
        <circle cx="50" cy="56" r="9" fill="url(#gPetalo)" stroke="url(#gOro)" stroke-width="2"/>
        <text x="50" y="61" text-anchor="middle" font-family="Pinyon Script" font-size="14" fill="#fff3c9">${inicial}</text>
      </svg>
      <h3>Lluvia de sobres</h3>
      <p>Un detalle en efectivo dentro de un sobre.</p>
    </div>`);
  const cajaRegalo = `
      <svg viewBox="0 0 100 100" class="floaty">
        <rect x="18" y="40" width="64" height="46" rx="3" fill="#f7b9d7" stroke="url(#gOro)" stroke-width="2"/>
        <rect x="12" y="30" width="76" height="14" rx="3" fill="#fcd9ea" stroke="url(#gOro)" stroke-width="2"/>
        <path d="M50 30v56" stroke="url(#gOro)" stroke-width="7"/>
        <path d="M50 30c-10-16-26-10-18 0M50 30c10-16 26-10 18 0" fill="none" stroke="url(#gOro)" stroke-width="4"/>
      </svg>`;
  if (R.mesa && R.mesa.tienda) gifts.push(`
    <div class="gift reveal">${cajaRegalo}
      <h3>Mesa de regalos</h3>
      <p><strong>${R.mesa.tienda}</strong>${R.mesa.numero ? `<br>Evento: ${R.mesa.numero}` : ''}</p>
    </div>`);
  else gifts.push(`
    <div class="gift reveal">${cajaRegalo}
      <h3>O un regalo de tu elección</h3>
      <p>Cualquier detalle será recibido con mucho cariño.</p>
    </div>`);
  $('#gifts').innerHTML = gifts.join('');

  /* ---------------- Calendario ---------------- */
  if (!isNaN(fecha)) {
    const y = fecha.getFullYear(), m = fecha.getMonth();
    const mes = fecha.toLocaleDateString(LOCALE, { month: 'long' });
    $('#calMonth').textContent = mes.charAt(0).toUpperCase() + mes.slice(1);
    const offset = (new Date(y, m, 1).getDay() + 6) % 7; // lunes primero
    const dias = new Date(y, m + 1, 0).getDate();
    let html = ['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(d => `<span class="dow">${d}</span>`).join('');
    html += '<span></span>'.repeat(offset);
    for (let d = 1; d <= dias; d++) {
      html += `<span class="day${d === fecha.getDate() ? ' hoy' : ''}">${d}</span>`;
    }
    $('#cal').innerHTML = html;
  }

  /* ---------------- RSVP ---------------- */
  const rs = C.rsvp || {};
  const rsvpBtn = $('#rsvpBtn');
  if (rs.enlace) rsvpBtn.href = rs.enlace;
  else if (rs.whatsapp) rsvpBtn.href = `https://wa.me/${rs.whatsapp}?text=${encodeURIComponent(rs.mensaje || '')}`;
  else rsvpBtn.href = '#';

  /* ---------------- Cuenta regresiva ---------------- */
  const cdEls = { d: $('#cdD'), h: $('#cdH'), m: $('#cdM'), s: $('#cdS') };
  function setNum(el, v) {
    v = String(v).padStart(2, '0');
    if (el.textContent !== v) {
      el.textContent = v;
      el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick');
    }
  }
  function countdown() {
    let diff = Math.max(0, fecha - Date.now());
    if (isNaN(diff)) return;
    if (diff === 0) {
      $('#countdown').innerHTML = '<p class="script-title oro-text">¡Hoy es el gran día!</p>';
      return clearInterval(cdTimer);
    }
    const s = Math.floor(diff / 1000);
    setNum(cdEls.d, Math.floor(s / 86400));
    setNum(cdEls.h, Math.floor(s % 86400 / 3600));
    setNum(cdEls.m, Math.floor(s % 3600 / 60));
    setNum(cdEls.s, s % 60);
  }
  const cdTimer = setInterval(countdown, 1000);
  countdown();

  /* ---------------- Música ---------------- */
  const audio = $('#bgMusic');
  const musicBtn = $('#musicBtn');
  if (C.musica) audio.src = C.musica;
  audio.volume = 0.7;
  function playMusic() {
    if (!audio.src) return;
    audio.play().then(() => musicBtn.classList.remove('paused'))
      .catch(() => musicBtn.classList.add('paused'));
  }
  musicBtn.addEventListener('click', () => {
    if (audio.paused) playMusic();
    else { audio.pause(); musicBtn.classList.add('paused'); }
  });
  audio.addEventListener('error', () => musicBtn.classList.add('paused'));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && !audio.paused) { audio.pause(); audio.dataset.resume = '1'; }
    else if (!document.hidden && audio.dataset.resume) { delete audio.dataset.resume; playMusic(); }
  });

  /* ---------------- Libro ---------------- */
  const intro = $('#intro');
  const book = $('#book');
  let abierto = false, entrado = false, autoTimer;

  function flip(leaf, z) {
    if (!leaf) return;
    leaf.classList.add('flipped');
    setTimeout(() => { leaf.style.zIndex = z; }, 800);
  }
  function showPage(sel, delay) {
    setTimeout(() => { const el = $(sel); if (el) el.classList.add('show'); }, delay);
  }

  function abrirLibro() {
    if (abierto) return;
    abierto = true;
    playMusic();
    const bw = book.offsetWidth;
    const os = Math.min(1, (window.innerWidth * 0.96) / (bw * 2));
    book.style.setProperty('--os', os.toFixed(3));
    intro.classList.add('opening');
    book.classList.add('open');

    flip($('.leaf.cover'), 6);
    showPage('.p0', 1000);
    showPage('.p1', 1300);
    setTimeout(() => flip($('.leaf-1'), 7), 4200); // si ya se entró, flip lo ignora
    showPage('.p2', 5000);
    showPage('.p3', 5200);
    autoTimer = setTimeout(entrar, 12000);
  }

  function entrar() {
    if (entrado) return;
    entrado = true;
    clearTimeout(autoTimer);
    if (audio.paused) playMusic();
    intro.classList.add('leaving');
    window.scrollTo(0, 0);
    setTimeout(() => {
      document.body.classList.remove('locked');
      document.body.classList.add('ready');
    }, 700);
    setTimeout(() => intro.remove(), 2000);
  }

  book.addEventListener('click', abrirLibro);
  book.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrirLibro(); } });
  $('#enterBtn').addEventListener('click', e => { e.stopPropagation(); entrar(); });

  /* ---------------- Aparición al hacer scroll ---------------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal, .reveal-zoom').forEach(el => io.observe(el));

  /* ---------------- Pétalos y destellos ---------------- */
  (function particulas() {
    const cv = $('#fx');
    const ctx = cv.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    let W, H, dpr;
    const COLORES = ['#e0218a', '#f05aa8', '#ff8cc6', '#c2166f', '#f7b9d7'];
    const rnd = (a, b) => a + Math.random() * (b - a);

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.width = Math.floor(innerWidth * dpr);
      H = cv.height = Math.floor(innerHeight * dpr);
    }
    resize();
    addEventListener('resize', resize);

    const petalo = (inicio) => ({
      x: rnd(0, W), y: inicio ? rnd(-H, H) : rnd(-60, -20) * dpr,
      s: rnd(5, 10) * dpr, vy: rnd(.35, .9) * dpr, vx: rnd(-.3, .3) * dpr,
      r: rnd(0, 6.28), vr: rnd(-.025, .025), f: rnd(0, 6.28), vf: rnd(.02, .05),
      c: COLORES[Math.floor(Math.random() * COLORES.length)], a: rnd(.55, .85)
    });
    const destello = () => ({
      x: rnd(0, W), y: rnd(0, H), r: rnd(.8, 2.2) * dpr, p: rnd(0, 6.28), v: rnd(.02, .05)
    });
    const petalos = Array.from({ length: innerWidth < 600 ? 14 : 24 }, () => petalo(true));
    const destellos = Array.from({ length: innerWidth < 600 ? 28 : 45 }, destello);

    function drawPetalo(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.scale(1, .6 + .4 * Math.sin(p.f));
      ctx.globalAlpha = p.a;
      ctx.fillStyle = p.c;
      const s = p.s;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.bezierCurveTo(s, -s * .6, s * .8, s * .8, 0, s);
      ctx.bezierCurveTo(-s * .8, s * .8, -s, -s * .6, 0, -s);
      ctx.fill();
      ctx.restore();
    }
    function drawDestello(d) {
      const a = (Math.sin(d.p) + 1) / 2;
      if (a < .05) return;
      ctx.save();
      ctx.globalAlpha = a * .9;
      ctx.translate(d.x, d.y);
      ctx.fillStyle = '#ffe9a8';
      ctx.shadowColor = '#f2cf78';
      ctx.shadowBlur = 8 * dpr;
      const r = d.r * (1 + a);
      ctx.beginPath();
      ctx.moveTo(0, -r * 3); ctx.quadraticCurveTo(0, 0, r * 3, 0);
      ctx.quadraticCurveTo(0, 0, 0, r * 3); ctx.quadraticCurveTo(0, 0, -r * 3, 0);
      ctx.quadraticCurveTo(0, 0, 0, -r * 3);
      ctx.fill();
      ctx.restore();
    }
    function loop() {
      ctx.clearRect(0, 0, W, H);
      for (const d of destellos) {
        d.p += d.v;
        if (d.p > Math.PI * 2 + 4.7) Object.assign(d, destello(), { p: 4.7 });
        drawDestello(d);
      }
      for (let i = 0; i < petalos.length; i++) {
        const p = petalos[i];
        p.y += p.vy; p.x += p.vx + Math.sin(p.f) * .4 * dpr; p.r += p.vr; p.f += p.vf;
        if (p.y > H + 30 * dpr) petalos[i] = petalo(false);
        drawPetalo(p);
      }
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  })();
})();
