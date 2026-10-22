/* ASCENDO profile. Pure HTML/CSS/JS; no framework or build step. */
(() => {
  'use strict';

  const entry = document.getElementById('entry');
  const enterButton = document.getElementById('enterButton');
  const profile = document.getElementById('profile');
  const profileName = document.getElementById('profileName');
  const video = document.getElementById('backgroundVideo');
  const soundToggle = document.getElementById('soundToggle');
  const soundLabel = document.getElementById('soundLabel');
  const soundOn = soundToggle.querySelector('.sound__icon--on');
  const soundOff = soundToggle.querySelector('.sound__icon--off');
  const toast = document.getElementById('toast');

  let entered = false;
  let toastTimer;

  function showToast(message) {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('is-visible');
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2300);
  }

  function updateSoundUi() {
    const isMuted = video.muted || video.volume === 0;
    soundLabel.textContent = isMuted ? 'sound off' : 'sound on';
    soundToggle.setAttribute('aria-label', isMuted ? 'Unmute video sound' : 'Mute video sound');
    soundOn.hidden = isMuted;
    soundOff.hidden = !isMuted;
  }

  function startVideo() {
    // Respect visitors who ask for reduced motion. They keep the static backdrop.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Put your own authorized MP4 (H.264 video + AAC audio) at this path.
    // There is deliberately no copyrighted video bundled with this site.
    video.src = './assets/freestyle.mp4';
    video.volume = 0.65;
    video.muted = false;

    video.addEventListener('playing', () => {
      document.body.classList.add('video-ready');
      soundToggle.hidden = false;
      updateSoundUi();
    }, { once: true });

    video.addEventListener('error', () => {
      document.body.classList.remove('video-ready');
      soundToggle.hidden = true;
    });

    // Called directly from the entrance click, satisfying most browsers'
    // requirement for a user gesture before starting playback with sound.
    const result = video.play();
    if (result && typeof result.catch === 'function') {
      result.catch(() => {
        // Audio/video was blocked or the optional asset was not supplied.
        // The CSS background remains fully functional in that case.
        soundToggle.hidden = true;
      });
    }
  }

  function enter() {
    if (entered) return;
    entered = true;
    document.body.classList.add('entered');
    profile.removeAttribute('inert');
    profile.setAttribute('aria-hidden', 'false');
    entry.setAttribute('aria-hidden', 'true');
    startVideo();

    window.setTimeout(() => {
      entry.hidden = true;
      profileName.focus({ preventScroll: true });
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 700);
  }

  entry.addEventListener('click', enter);
  enterButton.addEventListener('click', enter);

  soundToggle.addEventListener('click', () => {
    video.muted = !video.muted;
    updateSoundUi();
  });

  async function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      try { await navigator.clipboard.writeText(value); return true; } catch (_) { /* try fallback */ }
    }
    // Also works when the domain is temporarily serving plain HTTP.
    const helper = document.createElement('textarea');
    helper.value = value;
    helper.setAttribute('readonly', '');
    helper.style.position = 'fixed';
    helper.style.opacity = '0';
    document.body.appendChild(helper);
    helper.select();
    let copied = false;
    try { copied = document.execCommand('copy'); } catch (_) { /* unsupported */ }
    helper.remove();
    return copied;
  }

  document.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', async () => {
      const handle = button.getAttribute('data-copy');
      const service = button.getAttribute('data-service');
      const copied = await copyText(handle);
      showToast(copied ? `${service} · ${handle} copied` : `${service} · ${handle}`);
    });
  });
})();
