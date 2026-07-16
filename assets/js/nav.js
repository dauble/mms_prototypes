document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('site-nav-toggle');
  var links = document.getElementById('site-nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    var isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  var filterBar = document.querySelector('[data-filter-bar]');
  if (filterBar) {
    var pills = filterBar.querySelectorAll('.filter-pill');
    var entries = document.querySelectorAll('[data-entry-type]');

    filterBar.addEventListener('click', function (event) {
      var pill = event.target.closest('.filter-pill');
      if (!pill) return;

      pills.forEach(function (p) { p.setAttribute('aria-pressed', 'false'); });
      pill.setAttribute('aria-pressed', 'true');

      var filter = pill.getAttribute('data-filter');
      entries.forEach(function (entry) {
        var show = filter === 'all' || entry.getAttribute('data-entry-type') === filter;
        entry.hidden = !show;
      });
    });
  }
});
