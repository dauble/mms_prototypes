document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
    var track = carousel.querySelector('[data-carousel-track]');
    var slides = Array.prototype.slice.call(carousel.querySelectorAll('[data-carousel-slide]'));
    var prevBtn = carousel.querySelector('[data-carousel-prev]');
    var nextBtn = carousel.querySelector('[data-carousel-next]');
    var dots = Array.prototype.slice.call(carousel.querySelectorAll('[data-carousel-dot]'));
    if (!track || slides.length === 0) return;

    function currentIndex() {
      var closest = 0;
      var closestDist = Infinity;
      slides.forEach(function (slide, i) {
        var dist = Math.abs(slide.offsetLeft - track.scrollLeft);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      return closest;
    }

    function setActiveDot(index) {
      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === index);
        dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });
    }

    function goTo(index) {
      index = (index + slides.length) % slides.length;
      track.scrollTo({ left: slides[index].offsetLeft, behavior: 'smooth' });
    }

    var AUTOPLAY_DELAY = 6000;
    var autoplayTimer;

    function stopAutoplay() {
      clearInterval(autoplayTimer);
    }

    function startAutoplay() {
      stopAutoplay();
      if (slides.length < 2) return;
      autoplayTimer = setInterval(function () { goTo(currentIndex() + 1); }, AUTOPLAY_DELAY);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () { goTo(currentIndex() - 1); startAutoplay(); });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () { goTo(currentIndex() + 1); startAutoplay(); });
    }
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); startAutoplay(); });
    });

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', startAutoplay);

    var scrollTimeout;
    track.addEventListener('scroll', function () {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function () { setActiveDot(currentIndex()); }, 80);
    });

    setActiveDot(0);
    startAutoplay();
  });
});
