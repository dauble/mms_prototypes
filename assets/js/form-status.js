document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  if (!params.has('sent') && !params.has('error')) return;

  var statusEl = document.querySelector(
    params.has('sent') ? '[data-form-status="sent"]' : '[data-form-status="error"]'
  );
  if (statusEl) statusEl.hidden = false;

  if (params.has('sent')) {
    var form = document.querySelector('.inquiry__form');
    if (form) form.hidden = true;
  }

  params.delete('sent');
  params.delete('error');
  var query = params.toString();
  var newUrl = window.location.pathname + (query ? '?' + query : '') + window.location.hash;
  window.history.replaceState({}, '', newUrl);
});
