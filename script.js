/* Hero polaroids: hide broken images, subtle parallax on scroll. */
(function () {
  var cards = Array.prototype.slice.call(document.querySelectorAll('.polaroid'));
  if (!cards.length) return;

  cards.forEach(function (card) {
    var img = card.querySelector('img');
    if (!img) return;
    var markMissing = function () { card.classList.add('is-missing'); };
    img.addEventListener('error', markMissing);
    if (img.complete && img.naturalWidth === 0) markMissing();
  });

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var narrow = window.matchMedia('(max-width: 960px)');
  var hero = document.querySelector('.hero');
  var ticking = false;
  var mx = 0, my = 0; // cursor offset from hero centre, -1..1

  // Once the drop-in finishes, hand control to the live transform.
  cards.forEach(function (card) {
    card.addEventListener('animationend', function () { card.classList.add('settled'); }, { once: true });
  });

  function update() {
    ticking = false;
    var off = reduce.matches || narrow.matches;
    var y = off ? 0 : (window.scrollY || window.pageYOffset);
    cards.forEach(function (c) {
      if (off) { c.style.removeProperty('--py'); c.style.removeProperty('--tx'); c.style.removeProperty('--ty'); return; }
      var depth = parseFloat(c.getAttribute('data-depth')) || 0;
      c.style.setProperty('--py', (y * depth * -0.25).toFixed(1) + 'px');
      c.style.setProperty('--tx', (mx * depth * 28).toFixed(1) + 'px');
      c.style.setProperty('--ty', (my * depth * 20).toFixed(1) + 'px');
    });
  }
  function queue() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }

  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', queue);
  if (hero) {
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      my = ((e.clientY - r.top) / r.height - 0.5) * 2;
      queue();
    });
    hero.addEventListener('mouseleave', function () { mx = 0; my = 0; queue(); });
  }
  update();
})();

/* Reveal story bullets as they scroll into view. */
(function () {
  document.documentElement.classList.add('js');
  var items = Array.prototype.slice.call(document.querySelectorAll('.bullets li'));
  if (!('IntersectionObserver' in window)) { items.forEach(function (el) { el.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      el.style.transitionDelay = (items.indexOf(el) % 6) * 70 + 'ms';
      el.classList.add('in');
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.2 });
  items.forEach(function (el) { io.observe(el); });
})();
