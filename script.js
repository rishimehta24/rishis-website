/* Reveal-on-scroll. Each element animates once. Nothing else. */
(function () {
  document.documentElement.classList.add('js');

  var targets = Array.prototype.slice.call(
    document.querySelectorAll('.reveal, .story li, .band__inner, .band__img')
  );

  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    // stagger siblings that enter in the same frame
    var byParent = new Map();
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var n = byParent.get(el.parentNode) || 0;
      byParent.set(el.parentNode, n + 1);
      el.style.transitionDelay = Math.min(n, 5) * 80 + 'ms';
      el.classList.add('in');
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

  targets.forEach(function (el) { io.observe(el); });
})();
