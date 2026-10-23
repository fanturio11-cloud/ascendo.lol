(() => {
  'use strict';

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const narrowScreen = matchMedia('(max-width: 620px)');
  const nativeTransitions = 'CSSViewTransitionRule' in window;
  const toast = document.getElementById('toast');
  let toastTimer;
  let navigationTimer;

  function showToast(message) {
    if (!toast) return;
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('is-visible');
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
  }

  document.addEventListener('click', event => {
    if (nativeTransitions || reduceMotion.matches || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[data-transition]');
    if (!link || link.target || link.hasAttribute('download')) return;
    const destination = new URL(link.href);
    if (destination.origin !== location.origin || destination.href === location.href) return;
    event.preventDefault();
    if (navigationTimer) return;
    document.body.classList.add('is-leaving');
    navigationTimer = setTimeout(() => location.assign(destination.href), 160);
  });

  window.addEventListener('pageshow', event => {
    clearTimeout(navigationTimer);
    navigationTimer = undefined;
    document.body.classList.remove('is-leaving', 'is-arriving');
    if (!nativeTransitions && !reduceMotion.matches && !event.persisted) {
      document.body.classList.add('is-arriving');
    }
  });

  const avatars = [...document.querySelectorAll('.avatar__video')];
  function syncAvatars() {
    for (const avatar of avatars) {
      avatar.muted = true;
      if (reduceMotion.matches || document.hidden) avatar.pause();
      else avatar.play().catch(() => {});
    }
  }
  syncAvatars();
  reduceMotion.addEventListener('change', syncAvatars);
  document.addEventListener('visibilitychange', syncAvatars);

  const wordLayer = document.getElementById('floatingWords');
  if (wordLayer) {
    const phrases = ['The Best Client', 'Open Source', 'Best Visuals', 'Ascendo #1', 'Ascendo', "Minecraft's best client", 'Best visuals?', 'Holy client omg!'];
    let remainingPhrases = [];
    let wordTimer;

    function spawnWord() {
      const limit = narrowScreen.matches ? 2 : 4;
      if (wordLayer.childElementCount >= limit) return;
      if (!remainingPhrases.length) remainingPhrases = [...phrases];
      const phraseIndex = Math.floor(Math.random() * remainingPhrases.length);
      const word = document.createElement('span');
      word.className = 'floating-word';
      word.textContent = remainingPhrases.splice(phraseIndex, 1)[0];
      word.style.setProperty('--word-size', `${narrowScreen.matches ? 12 + Math.random() * 3 : 15 + Math.random() * 8}px`);
      word.style.setProperty('--word-duration', `${16 + Math.random() * 6}s`);
      word.style.setProperty('--word-drift', `${Math.random() * 48 - 24}px`);
      wordLayer.appendChild(word);

      const layerBounds = wordLayer.getBoundingClientRect();
      const protectedBounds = [...document.querySelectorAll('.brand-logo, .download-button, .section-heading, .founders-list')]
        .map(element => element.getBoundingClientRect());
      const existingBounds = [...wordLayer.children].filter(element => element !== word)
        .map(element => element.getBoundingClientRect());
      const wordWidth = word.offsetWidth;
      const wordHeight = word.offsetHeight;
      let placed = false;

      for (let attempt = 0; attempt < 24; attempt++) {
        const left = 36 + Math.random() * Math.max(0, layerBounds.width - wordWidth - 72);
        const top = 48 + Math.random() * Math.max(0, layerBounds.height - wordHeight - 100);
        const bounds = { left: layerBounds.left + left - 28, right: layerBounds.left + left + wordWidth + 28, top: layerBounds.top + top - 40, bottom: layerBounds.top + top + wordHeight + 28 };
        const overlaps = [...protectedBounds, ...existingBounds].some(other =>
          bounds.left < other.right && bounds.right > other.left && bounds.top < other.bottom && bounds.bottom > other.top);
        if (overlaps) continue;
        word.style.left = `${left}px`;
        word.style.top = `${top}px`;
        placed = true;
        break;
      }

      if (!placed) word.remove();
      else word.addEventListener('animationend', () => word.remove(), { once: true });
    }

    function scheduleWord() {
      wordTimer = setTimeout(() => {
        if (document.hidden || reduceMotion.matches) return;
        spawnWord();
        scheduleWord();
      }, 4000 + Math.random() * 2000);
    }

    function resetWords() {
      clearTimeout(wordTimer);
      wordLayer.replaceChildren();
      if (document.hidden || reduceMotion.matches) return;
      spawnWord();
      scheduleWord();
    }

    resetWords();
    document.addEventListener('visibilitychange', resetWords);
    reduceMotion.addEventListener('change', resetWords);
    narrowScreen.addEventListener('change', resetWords);
    window.addEventListener('resize', resetWords);
    window.addEventListener('pageshow', resetWords);
    window.addEventListener('pagehide', () => {
      clearTimeout(wordTimer);
      wordLayer.replaceChildren();
    });
  }

  async function copyValue(value) {
    try {
      if (navigator.clipboard && isSecureContext) {
        await navigator.clipboard.writeText(value);
        return true;
      }
    } catch {}
    const previousFocus = document.activeElement;
    const temporary = document.createElement('textarea');
    temporary.value = value;
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

  for (const button of document.querySelectorAll('[data-copy]')) {
    button.addEventListener('click', async () => {
      const value = button.dataset.copy;
      const copied = await copyValue(value);
      showToast(copied ? `${button.dataset.platform}: ${value} copied` : `${button.dataset.platform}: ${value}`);
    });
  }

  const video = document.getElementById('musicBackground');
  const mediaControls = document.getElementById('mediaControls');
  const volumeControl = document.getElementById('volumeControl');
  const volumeValue = document.getElementById('volumeValue');
  if (!video) return;

  function syncVolume() {
    if (!volumeControl) return;
    const percentage = Math.round(video.muted ? 0 : video.volume * 100);
    volumeControl.value = String(percentage);
    volumeControl.style.setProperty('--volume', `${percentage}%`);
    if (volumeValue) volumeValue.textContent = `${percentage}%`;
    volumeControl.setAttribute('aria-valuetext', percentage === 0 ? 'Muted' : `${percentage} percent`);
  }

  video.addEventListener('volumechange', syncVolume);
  video.addEventListener('playing', () => {
    document.body.classList.add('has-video');
    if (mediaControls) mediaControls.hidden = false;
    syncVolume();
  });
  video.addEventListener('error', () => {
    document.body.classList.remove('has-video');
    if (mediaControls) mediaControls.hidden = true;
    showToast('Background media could not be loaded');
  });

  if (mediaControls) mediaControls.hidden = false;
  video.src = '../assets/music-background.mp4';
  video.volume = 0.65;
  video.muted = false;
  syncVolume();
  video.play().catch(() => {
    if (video.error) return;
    video.muted = true;
    syncVolume();
    video.play().catch(() => showToast('Background playback is unavailable'));
  });

  volumeControl?.addEventListener('input', () => {
    const volume = Number(volumeControl.value) / 100;
    video.volume = volume;
    video.muted = volume === 0;
    syncVolume();
    if (video.paused && !video.error) {
      video.play().catch(() => {
        video.muted = true;
        syncVolume();
      });
    }
  });
})();
