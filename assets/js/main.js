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
