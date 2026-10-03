/* Reveal-on-scroll for the story section. Nothing else. */
(function () {
  document.documentElement.classList.add('js');

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.story li, .band__inner, .band__img').forEach(function (el) { el.classList.add('in'); });
    return;
  }

  var items = Array.prototype.slice.call(document.querySelectorAll('.story li'));
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      // stagger items that enter in the same frame
      var idx = items.indexOf(el);
      var delay = idx >= 0 ? (idx % 5) * 90 : 0;
      el.style.transitionDelay = delay + 'ms';
      var n = el.querySelector('.story__n');
      if (n) n.style.transitionDelay = (delay + 150) + 'ms';
      el.classList.add('in');
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

  items.forEach(function (el) { io.observe(el); });

  var band = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      band.unobserve(entry.target);
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.band__inner, .band__img').forEach(function (el) { band.observe(el); });
})();
