document.addEventListener('DOMContentLoaded', function () {
  var modal = document.querySelector('[data-video-modal]');
  if (!modal) return;

  var frame = modal.querySelector('[data-video-modal-frame]');
  var lastTrigger = null;

  function open(youtubeId, trigger) {
    lastTrigger = trigger;
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + youtubeId + '?autoplay=1&rel=0';
    iframe.title = 'YouTube video player';
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    frame.innerHTML = '';
    frame.appendChild(iframe);
    modal.hidden = false;
    document.body.classList.add('video-modal-open');
    var closeBtn = modal.querySelector('.video-modal__close');
    if (closeBtn) closeBtn.focus();
  }

  function close() {
    frame.innerHTML = '';
    modal.hidden = true;
    document.body.classList.remove('video-modal-open');
    if (lastTrigger) lastTrigger.focus();
  }

  document.querySelectorAll('[data-video-trigger]').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var id = trigger.getAttribute('data-youtube-id');
      if (id) open(id, trigger);
    });
  });

  modal.querySelectorAll('[data-video-modal-close]').forEach(function (el) {
    el.addEventListener('click', close);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) close();
  });
});
