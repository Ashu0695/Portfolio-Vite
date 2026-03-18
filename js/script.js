// ACCORDION
window.toggleAcc = function(header) {
  var item = header.closest('.acc-item');
  var wasOpen = item.classList.contains('open');
  document.querySelectorAll('.acc-item').forEach(function(i) { i.classList.remove('open'); });
  if (!wasOpen) item.classList.add('open');
}

// SCROLL ANIMATIONS — mark elements ready AFTER page load so nothing hidden on first paint
window.addEventListener('load', function() {
  // Mark all reveal elements as animation-ready (adds opacity:0)
  var revEls = document.querySelectorAll('.reveal, .value-card');

  if (!('IntersectionObserver' in window)) {
    // No observer support — just show everything
    revEls.forEach(function(el) { el.classList.add('anim','vis'); });
    return;
  }

  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('vis');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -10px 0px' });

  revEls.forEach(function(el) {
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      // Already visible on load — show immediately, no hide/show flash
      el.classList.add('anim','vis');
    } else {
      // Below fold — mark ready (hidden) then observe
      el.classList.add('anim');
      obs.observe(el);
    }
  });

  // Absolute fallback — show everything after 3s no matter what
  setTimeout(function() {
    document.querySelectorAll('.reveal, .value-card').forEach(function(el) {
      el.classList.add('anim','vis');
    });
  }, 3000);
});

// SCROLL TOP BUTTON
var stBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', function() {
  if (stBtn) stBtn.classList.toggle('show', window.scrollY > 400);
}, { passive: true });

// NAV ACTIVE ON SCROLL
var navSecs = document.querySelectorAll('section[id]');
var navAs = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', function() {
  var cur = '';
  navSecs.forEach(function(s) { if (window.scrollY >= s.offsetTop - 90) cur = s.id; });
  navAs.forEach(function(a) { a.classList.toggle('active', a.getAttribute('href') === '#' + cur); });
}, { passive: true });