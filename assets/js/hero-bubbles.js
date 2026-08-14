document.addEventListener('DOMContentLoaded', function () {
  var hero = document.querySelector('.hero');
  var canvas = hero && hero.querySelector('.hero__bubbles');
  if (!hero || !canvas) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var COUNT = 24;
  var SPEED = 0.12;
  var REPEL_RADIUS = 90;
  var REPEL_STRENGTH = 1.1;
  var EASE = 0.9;

  var rootStyles = getComputedStyle(document.documentElement);
  function tokenWithAlpha(name, alpha) {
    return rootStyles.getPropertyValue(name).trim().replace(')', ' / ' + alpha + ')');
  }
  var colors = [
    tokenWithAlpha('--navy', 0.18),
    tokenWithAlpha('--teal', 0.22),
    tokenWithAlpha('--green', 0.22),
    tokenWithAlpha('--coral', 0.2)
  ];

  var dpr = window.devicePixelRatio || 1;
  var width = 0;
  var height = 0;
  var bubbles = [];
  var mouse = { x: null, y: null };

  function resize() {
    var rect = hero.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createBubbles() {
    bubbles = [];
    for (var i = 0; i < COUNT; i++) {
      bubbles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 2 + Math.pow(Math.random(), 2) * 18,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        ox: 0,
        oy: 0,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    bubbles.forEach(function (b) {
      b.x += b.vx;
      b.y += b.vy;
      if (b.x < -b.r) b.x = width + b.r;
      if (b.x > width + b.r) b.x = -b.r;
      if (b.y < -b.r) b.y = height + b.r;
      if (b.y > height + b.r) b.y = -b.r;

      if (mouse.x !== null) {
        var dx = b.x + b.ox - mouse.x;
        var dy = b.y + b.oy - mouse.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0.01) {
          var force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
          b.ox += (dx / dist) * force;
          b.oy += (dy / dist) * force;
        }
      }
      b.ox *= EASE;
      b.oy *= EASE;

      ctx.beginPath();
      ctx.arc(b.x + b.ox, b.y + b.oy, b.r, 0, Math.PI * 2);
      ctx.fillStyle = b.color;
      ctx.fill();
    });

    requestAnimationFrame(step);
  }

  hero.addEventListener('mousemove', function (e) {
    var rect = hero.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  hero.addEventListener('mouseleave', function () {
    mouse.x = null;
    mouse.y = null;
  });
  window.addEventListener('resize', resize);

  resize();
  createBubbles();
  requestAnimationFrame(step);
});
