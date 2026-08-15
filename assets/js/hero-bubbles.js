document.addEventListener('DOMContentLoaded', function () {
  var hero = document.querySelector('.hero');
  var canvas = hero && hero.querySelector('.hero__bubbles');
  if (!hero || !canvas) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia && window.matchMedia('(max-width: 900px)').matches) return;

  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var COUNT = 24;
  var MIN_COUNT = 16;
  var MAX_COUNT = 32;
  var PROGRESS_SPEED = 0.008;
  var SPEED = 0.12;
  var REPEL_RADIUS = 90;
  var REPEL_STRENGTH = 1.1;
  var EASE = 0.9;

  var frame = 0;
  var nextSpawnFrame = 60;
  var nextDespawnFrame = 120;

  // Elastic easing (easings.net) drives the grow-in/shrink-out bounce.
  var ELASTIC_C4 = (2 * Math.PI) / 3;
  function easeOutElastic(x) {
    if (x === 0 || x === 1) return x;
    return Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * ELASTIC_C4) + 1;
  }
  function easeInElastic(x) {
    if (x === 0 || x === 1) return x;
    return -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * ELASTIC_C4);
  }

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

  function spawnBubble(immediate) {
    bubbles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 2 + Math.pow(Math.random(), 2) * 18,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      ox: 0,
      oy: 0,
      color: colors[Math.floor(Math.random() * colors.length)],
      progress: immediate ? 1 : 0,
      state: immediate ? 'alive' : 'in'
    });
  }

  function createBubbles() {
    bubbles = [];
    for (var i = 0; i < COUNT; i++) spawnBubble(true);
  }

  function step() {
    frame++;
    ctx.clearRect(0, 0, width, height);

    if (frame >= nextSpawnFrame && bubbles.length < MAX_COUNT) {
      spawnBubble(false);
      nextSpawnFrame = frame + 40 + Math.random() * 100;
    }
    if (frame >= nextDespawnFrame && bubbles.length > MIN_COUNT) {
      var alive = bubbles.filter(function (b) { return b.state === 'alive'; });
      if (alive.length) {
        var victim = alive[Math.floor(Math.random() * alive.length)];
        victim.state = 'out';
        victim.progress = 0;
      }
      nextDespawnFrame = frame + 60 + Math.random() * 140;
    }

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

      var scale = 1;
      if (b.state === 'in') {
        b.progress = Math.min(1, b.progress + PROGRESS_SPEED);
        scale = easeOutElastic(b.progress);
        if (b.progress >= 1) b.state = 'alive';
      } else if (b.state === 'out') {
        b.progress = Math.min(1, b.progress + PROGRESS_SPEED);
        scale = 1 - easeInElastic(b.progress);
      }
      scale = Math.max(0, scale);
      var alpha = Math.min(1, scale);

      if (alpha > 0.01 && scale > 0.01) {
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(b.x + b.ox, b.y + b.oy, b.r * scale, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    });

    bubbles = bubbles.filter(function (b) { return !(b.state === 'out' && b.progress >= 1); });

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
