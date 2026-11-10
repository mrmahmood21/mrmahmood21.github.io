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

/* Project topic filter (projects page only).
   Cards carry data-topics; a button shows the cards whose topics include its
   data-filter value. With JS disabled every card simply stays visible. */
(function () {
  var bar = document.querySelector('.filter');
  if (!bar) return;
  var buttons = bar.querySelectorAll('.filter__btn');
  var cards = document.querySelectorAll('[data-topics]');

  bar.addEventListener('click', function (e) {
    var btn = e.target.closest('.filter__btn');
    if (!btn) return;
    var pick = btn.getAttribute('data-filter');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', buttons[i] === btn ? 'true' : 'false');
    }
    for (var j = 0; j < cards.length; j++) {
      var topics = cards[j].getAttribute('data-topics').split(' ');
      cards[j].hidden = pick !== 'all' && topics.indexOf(pick) === -1;
    }
  });
})();
