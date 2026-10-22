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
  const playButton = document.getElementById('playToggle');
  const playText = document.getElementById('playText');
  const soundButton = document.getElementById('soundToggle');
  const soundText = document.getElementById('soundText');
  if (!enterButton || !video || !content) return;

  let entered = false;
  function syncSound() {
    const muted = video.muted || video.volume === 0;
    if (soundText) soundText.textContent = muted ? 'sound off' : 'sound on';
    soundButton?.setAttribute('aria-label', muted ? 'Unmute background audio' : 'Mute background audio');
    soundButton?.setAttribute('aria-pressed', String(!muted));
  }

  function syncPlayback() {
    if (playText) playText.textContent = video.paused ? 'play' : 'pause';
    playButton?.setAttribute('aria-label', video.paused ? 'Play background video and audio' : 'Pause background video and audio');
    playButton?.setAttribute('aria-pressed', String(!video.paused));
  }

  video.addEventListener('playing', () => {
    document.body.classList.add('has-video');
    if (mediaControls) mediaControls.hidden = false;
    syncSound();
    syncPlayback();
  });
  video.addEventListener('pause', syncPlayback);
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
    syncSound();
    syncPlayback();
    video.src = '../assets/music-background.mp4';
    video.volume = 0.65;
    video.muted = false;
    video.play().catch(() => {
      video.muted = true;
      syncSound();
      video.play().catch(() => showToast('Press play to start the background media'));
    });
    setTimeout(() => { if (gate) gate.hidden = true; }, reduceMotion.matches ? 10 : 650);
  });

  playButton?.addEventListener('click', () => {
    if (video.paused) video.play().catch(() => showToast('Playback is unavailable'));
    else video.pause();
  });

  soundButton?.addEventListener('click', () => {
    video.muted = !video.muted;
    syncSound();
  });
})();
