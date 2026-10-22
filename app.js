(() => {
  'use strict';
  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(message) {
    if (!toast) return;
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('is-visible');
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2400);
  }

  // Silent, continuously looping video PFP, with a still-image fallback.
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const avatars = [...document.querySelectorAll('.avatar__video')];
  function syncAvatars() {
    for (const avatar of avatars) {
      avatar.muted = true;
      if (reduceMotion.matches) avatar.pause();
      else avatar.play().catch(() => { /* poster stays visible */ });
    }
  }
  syncAvatars();
  reduceMotion.addEventListener?.('change', syncAvatars);

  async function copyValue(value) {
    try {
      if (navigator.clipboard && isSecureContext) {
        await navigator.clipboard.writeText(value);
        return true;
      }
    } catch (_) { /* use legacy fallback */ }
    const temp = document.createElement('textarea');
    temp.value = value;
    temp.setAttribute('readonly', '');
    temp.style.position = 'fixed';
    temp.style.opacity = '0';
    document.body.appendChild(temp);
    temp.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (_) { /* clipboard unavailable */ }
    temp.remove();
    return ok;
  }
  for (const button of document.querySelectorAll('[data-copy]')) {
    button.addEventListener('click', async () => {
      const value = button.dataset.copy;
      const success = await copyValue(value);
      showToast(success ? `${button.dataset.platform}: ${value} copied` : `${button.dataset.platform}: ${value}`);
    });
  }

  const enterButton = document.getElementById('enterProfile');
  const content = document.getElementById('profileContent');
  const gate = document.getElementById('profileGate');
  const video = document.getElementById('musicBackground');
  const mediaControls = document.getElementById('mediaControls');
  const volumeControl = document.getElementById('volumeControl');
  const volumeValue = document.getElementById('volumeValue');
  if (!enterButton || !video || !content) return;

  let entered = false;
  function syncVolume() {
    if (!volumeControl) return;
    const percentage = Math.round(video.muted ? 0 : video.volume * 100);
    volumeControl.value = String(percentage);
    volumeControl.style.setProperty('--volume', `${percentage}%`);
    if (volumeValue) volumeValue.textContent = `${percentage}%`;
    volumeControl.setAttribute('aria-valuetext', percentage === 0 ? 'Muted' : `${percentage} percent`);
  }

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

  enterButton.addEventListener('click', () => {
    if (entered) return;
    entered = true;
    document.body.classList.add('profile--entered');
    content.removeAttribute('inert');
    gate?.setAttribute('aria-hidden', 'true');
    if (mediaControls) mediaControls.hidden = false;
    syncVolume();
    video.src = '../assets/music-background.mp4';
    video.volume = 0.65;
    video.muted = false;
    video.play().catch(() => {
      video.muted = true;
      syncVolume();
      video.play().catch(() => showToast('Background playback is unavailable'));
    });
    setTimeout(() => { if (gate) gate.hidden = true; }, reduceMotion.matches ? 10 : 650);
  });

  volumeControl?.addEventListener('input', () => {
    const volume = Number(volumeControl.value) / 100;
    video.volume = volume;
    video.muted = volume === 0;
    syncVolume();
  });
})();
