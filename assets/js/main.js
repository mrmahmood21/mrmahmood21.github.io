/* Mobile navigation toggle.
   The menu markup is plain links, so the nav still works with JS disabled -
   this only collapses it behind a button on narrow screens. */
(function () {
  var toggle = document.querySelector('.nav__toggle');
  var list = document.getElementById('nav-list');
  if (!toggle || !list) return;

  function setOpen(open) {
    list.setAttribute('data-open', open ? 'true' : 'false');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  toggle.addEventListener('click', function () {
    setOpen(list.getAttribute('data-open') !== 'true');
  });

  // Close on Escape so keyboard users are never trapped in an open menu.
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && list.getAttribute('data-open') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
})();

/* Light/dark theme toggle.
   With no saved choice the site follows the system setting; clicking the
   button stores an explicit choice. The inline script in each page's <head>
   re-applies that choice before the CSS loads, so pages never flash. */
(function () {
  var btn = document.querySelector('.theme-toggle');
  if (!btn) return;
  var root = document.documentElement;
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function current() {
    return root.getAttribute('data-theme') || (media.matches ? 'dark' : 'light');
  }
  function label() {
    btn.setAttribute('aria-label', current() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }

  btn.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) { /* private mode: choice lasts this page only */ }
    label();
  });
  if (media.addEventListener) media.addEventListener('change', label);
  label();
})();

/* Fade-in on scroll.
   Each content block fades up the first time it enters the viewport. Once its
   fade finishes, the reveal classes are removed, so the block is an ordinary
   static element again (and keeps its own hover transitions). Skipped entirely
   for visitors who ask for reduced motion, or in browsers without the API. */
(function () {
  var main = document.querySelector('main');
  if (!main || !('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Candidate blocks; only the innermost ones animate, so nothing fades twice.
  var all = Array.prototype.slice.call(
    main.querySelectorAll('.wrap > *, .split > *, .grid > *, .imrd > *, .resume > *'));
  var blocks = all.filter(function (el) {
    return !all.some(function (other) { return other !== el && el.contains(other); });
  });

  function done(e) {
    if (e.target !== this || e.propertyName !== 'opacity') return;
    this.classList.remove('reveal', 'is-visible');
    this.style.transitionDelay = '';
    this.removeEventListener('transitionend', done);
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      entry.target.classList.add('is-visible');
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

  blocks.forEach(function (el) {
    // Siblings that appear together (a row of cards, a page header) cascade slightly.
    var index = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.style.transitionDelay = (Math.min(index, 4) * 70) + 'ms';
    el.classList.add('reveal');
    el.addEventListener('transitionend', done);
    io.observe(el);
  });
})();

/* Project topic filter (projects page only).
   Cards carry data-topics; a button shows the cards whose topics include its
   data-filter value, and each button is labelled with how many cards that is.
   The filter bar is hidden by CSS when JS is off, and every card stays visible. */
(function () {
  var bar = document.querySelector('.filter');
  if (!bar) return;
  var buttons = bar.querySelectorAll('.filter__btn');
  var cards = document.querySelectorAll('[data-topics]');

  function matches(card, pick) {
    return pick === 'all' || card.getAttribute('data-topics').split(' ').indexOf(pick) !== -1;
  }

  for (var b = 0; b < buttons.length; b++) {
    var pick = buttons[b].getAttribute('data-filter');
    var n = 0;
    for (var c = 0; c < cards.length; c++) if (matches(cards[c], pick)) n++;
    var badge = document.createElement('span');
    badge.className = 'filter__count';
    badge.textContent = n;
    buttons[b].appendChild(badge);
  }

  bar.addEventListener('click', function (e) {
    var btn = e.target.closest('.filter__btn');
    if (!btn) return;
    var pick = btn.getAttribute('data-filter');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', buttons[i] === btn ? 'true' : 'false');
    }
    for (var j = 0; j < cards.length; j++) cards[j].hidden = !matches(cards[j], pick);
  });
})();

/* Click-to-enlarge figures (project pages).
   Every figure image becomes a button that opens it at full size over a dimmed
   page, with its caption. Close with the X, the Escape key, or a click anywhere
   off the image. Uses the native <dialog>, so focus stays inside the viewer and
   returns to the image afterwards. */
(function () {
  var images = document.querySelectorAll('.imrd figure img');
  if (!images.length || typeof HTMLDialogElement !== 'function') return;

  var dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Enlarged figure');
  dialog.innerHTML =
    '<button class="lightbox__close" type="button" aria-label="Close enlarged image">' +
      '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path stroke="currentColor" ' +
      'stroke-width="2.5" stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/></svg>' +
    '</button>' +
    '<figure class="lightbox__figure"><img class="lightbox__img" alt="">' +
    '<figcaption class="lightbox__caption"></figcaption></figure>';
  document.body.appendChild(dialog);

  var big = dialog.querySelector('.lightbox__img');
  var caption = dialog.querySelector('.lightbox__caption');

  // Scale the image to fill the viewport (leaving room for the caption) at its own aspect ratio.
  function fit() {
    var w = big.naturalWidth, h = big.naturalHeight;
    if (!w || !h) return;
    var room = caption.textContent ? 0.78 : 0.88;
    var s = Math.min(window.innerWidth * 0.92 / w, window.innerHeight * room / h);
    big.style.width = Math.round(w * s) + 'px';
    big.style.height = Math.round(h * s) + 'px';
  }

  function open(img) {
    var fig = img.closest('figure');
    var cap = fig && fig.querySelector('figcaption');
    var tag = img.parentNode.querySelector('.figure-set__tag');   // (a)/(b)/(c) in a multi-image figure
    caption.innerHTML = cap ? (tag ? tag.textContent + ' ' : '') + cap.innerHTML : '';
    big.alt = img.alt;
    big.onload = fit;
    big.src = img.currentSrc || img.src;
    if (big.complete) fit();
    document.documentElement.classList.add('lightbox-open');
    dialog.showModal();
  }

  dialog.addEventListener('click', function (e) {
    if (e.target !== big) dialog.close();   // the X, the caption, or the dimmed area
  });
  dialog.addEventListener('close', function () {
    document.documentElement.classList.remove('lightbox-open');
  });
  window.addEventListener('resize', function () { if (dialog.open) fit(); });

  Array.prototype.forEach.call(images, function (img) {
    img.classList.add('zoomable');
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'Enlarge image: ' + img.alt);
    img.addEventListener('click', function () { open(img); });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(img); }
    });
  });
})();
