# ASCENDO.LOL · Founder Profiles

A curated static GitHub Pages site. There are no public accounts or profile-creation forms.

## Pages

- `/`: the real Ascendo logo, Client 26.3 Discord link, founder cards, and decorative floating phrases on black.
- `/internalcheats/`: InternalCheats; Discord `internalcheats`; Minecraft IGN `InternalCheat`.
- `/k3rlsen/`: k3rlsen; TikTok `@ferenckop`; Instagram `@_shewantss.csxngi`; Discord `27ia`.
- `/nagyorru/`: compatibility redirect to `/internalcheats/`, with a visible fallback link.

Profiles open immediately. The existing video attempts playback with audio, falls back to muted playback when required by the browser, and has an accessible volume slider. Adjusting the slider is a user interaction that can enable audio. Content remains visible if JavaScript or media is unavailable.

## Design and motion

Frosted profile cards, white name glow, and restrained glass highlights share `styles.css`. Homepage entrance animations and 16–22 second floating phrases respect reduced-motion preferences. Phrases are decorative, avoid the central controls, are limited to four on desktop and two on mobile, and stop spawning in hidden tabs.

Same-origin navigation uses native cross-document view transitions where available, with a short fade fallback for marked links. Modified clicks and external new-tab links keep standard browser behavior.

## Assets and deployment

All original media remains in `assets/`. The white Discord symbol in `assets/discord.svg` comes from [Discord's brand page](https://discord.com/branding), specifically [the white symbol asset](https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/66e3d7f4ef6498ac018f2c55_Symbol.svg). `assets/minecraft-creeper.svg` is the recognizable pixel Creeper-face treatment used beside the Minecraft IGN.

Keep `CNAME` set to `ascendo.lol`. GitHub Pages deploys from `main`; verify the Pages workflow and live domain after merging. Version stylesheet/script references together when changing shared assets.

To add a curated profile, copy an existing profile directory, edit the identity, bio, links and canonical URL, then add its founder card to the homepage. No framework or package installation is needed.
