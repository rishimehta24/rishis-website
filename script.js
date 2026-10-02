/* rishi — small, dependency-free behaviours
   1. Live San Francisco clock (nav + HUD)
   2. Reveal-on-scroll
   3. Count-up numbers
   4. Active nav link
   5. Cursor glow on the hero (desktop, non-reduced-motion only)
*/
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Clock ---------- */
  var navClock = document.getElementById('clock');
  var hudTime = document.getElementById('hud-time');

  var timeFmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  });
  var zoneFmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles', timeZoneName: 'short'
  });

  function tick() {
    var now = new Date();
    var t = timeFmt.format(now).replace(/^24/, '00');
    var zonePart = zoneFmt.formatToParts(now).find(function (p) { return p.type === 'timeZoneName'; });
    var zone = zonePart ? zonePart.value : 'PT';
    if (navClock) {
      navClock.textContent = t;
      navClock.setAttribute('datetime', now.toISOString());
    }
    if (hudTime) hudTime.textContent = t + ' ' + zone;
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- 2. Reveal + 3. Count-up ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var counters = Array.prototype.slice.call(document.querySelectorAll('.count'));

  function countUp(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    if (reduceMotion) { el.textContent = String(target); return; }
    var start = null;
    var duration = 900;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        entry.target.querySelectorAll('.count').forEach(countUp);
        if (entry.target.classList.contains('count')) countUp(entry.target);
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
    counters.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
    counters.forEach(countUp);
  }

  /* ---------- 4. Active nav link ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var navIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = '#' + entry.target.id;
        links.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === id);
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach(function (s) { navIo.observe(s); });
  }

  /* ---------- 5. Hero cursor glow ---------- */
  var hero = document.getElementById('hero');
  var finePointer = window.matchMedia('(pointer: fine)').matches;
  if (hero && finePointer && !reduceMotion) {
    var raf = null;
    hero.addEventListener('mousemove', function (e) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        var r = hero.getBoundingClientRect();
        var x = ((e.clientX - r.left) / r.width) * 100;
        var y = ((e.clientY - r.top) / r.height) * 100;
        hero.style.setProperty('--mx', x.toFixed(1) + '%');
        hero.style.setProperty('--my', y.toFixed(1) + '%');
        raf = null;
      });
    });
  }
})();
