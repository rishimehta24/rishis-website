/* Reveal story bullets as they scroll into view. Nothing else. */
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
