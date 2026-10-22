(() => {
  'use strict';

  const toast = document.getElementById('toast');
  const downloadButton = document.getElementById('downloadButton');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('is-visible');
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
  }

  downloadButton?.addEventListener('click', (event) => {
    const href = downloadButton.getAttribute('href');
    if (!href || href === '#') {
      event.preventDefault();
      showToast('add your real client download link in index.html');
    }
  });
})();
