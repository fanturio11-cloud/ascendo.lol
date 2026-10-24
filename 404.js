(() => {
  'use strict';

  const pathDisplay = document.getElementById('requestedPath');
  const copyButton = document.getElementById('copyPath');
  const pathStatus = document.getElementById('pathStatus');
  const previousButton = document.getElementById('previousPage');
  const requestedPath = location.pathname || '/';
  let readablePath = requestedPath;
  try { readablePath = decodeURIComponent(requestedPath); } catch {}
  readablePath = readablePath.replace(/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/g, '');
  const characters = Array.from(readablePath);
  if (pathDisplay) pathDisplay.textContent = characters.length > 180 ? `${characters.slice(0, 180).join('')}…` : readablePath;

  async function copyRequestedPath() {
    if (navigator.clipboard && isSecureContext) {
      try { await navigator.clipboard.writeText(requestedPath); return true; } catch {}
    }
    const previousFocus = document.activeElement;
    const temporary = document.createElement('textarea');
    temporary.value = requestedPath;
    temporary.setAttribute('readonly', '');
    temporary.style.position = 'fixed';
    temporary.style.opacity = '0';
    document.body.appendChild(temporary);
    temporary.select();
    let copied = false;
    try { copied = document.execCommand('copy'); } catch {}
    temporary.remove();
    previousFocus?.focus({ preventScroll: true });
    return copied;
  }
  if (copyButton && pathDisplay && pathStatus) {
    let copyPending = false;
    copyButton.hidden = false;
    copyButton.addEventListener('click', async () => {
      if (copyPending) return;
      copyPending = true;
      copyButton.setAttribute('aria-busy', 'true');
      try {
        const copied = await copyRequestedPath();
        pathStatus.textContent = copied ? 'Path copied. No query parameters or fragments were included.' : 'Couldn’t copy automatically. Select the address above to copy it.';
        pathStatus.dataset.success = String(copied);
      } catch {
        pathStatus.textContent = 'Couldn’t copy automatically. Select the address above to copy it.';
        pathStatus.dataset.success = 'false';
      } finally {
        copyPending = false;
        copyButton.setAttribute('aria-busy', 'false');
      }
    });
  }

  if (previousButton) {
    try {
      const previous = new URL(document.referrer);
      if (history.length > 1 && previous.origin === location.origin && previous.pathname !== location.pathname) {
        previousButton.hidden = false;
        previousButton.addEventListener('click', () => history.back());
      }
    } catch {}
  }

  const visual = document.querySelector('.nf-visual');
  let visualIsVisible = true;
  function syncArtwork() { document.body.classList.toggle('nf-art-paused', document.hidden || !visualIsVisible); }
  if (visual && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      visualIsVisible = entries.some(entry => entry.isIntersecting);
      syncArtwork();
    }, { threshold: .01 });
    observer.observe(visual);
  }
  document.addEventListener('visibilitychange', syncArtwork);
  window.addEventListener('pagehide', () => document.body.classList.add('nf-art-paused'));
  window.addEventListener('pageshow', syncArtwork);
  syncArtwork();
})();
