# ASCENDO.LOL

A minimal personal profile for `ascendo.lol`. Click to enter, then your background video plays with its original sound. No frameworks, accounts, build tools, tracking, or paid hosting needed.

## Publish on GitHub Pages

1. Unzip this package.
2. Open the GitHub repository linked to `ascendo.lol`.
3. Use **Add file → Upload files** and upload **the contents** of this folder (not the enclosing folder). `index.html`, `styles.css`, `app.js`, and `CNAME` must sit in the repository root, alongside the `assets` folder.
4. Commit the changes to the `main` branch.
5. In **Settings → Pages**, choose **Deploy from a branch**, `main`, `/(root)` and save. Keep the Custom domain as `ascendo.lol`.
6. Your live site updates after GitHub publishes the commit. Enable **Enforce HTTPS** when DNS and the certificate are ready.

## Add your own avatar

The site currently uses `assets/avatar.svg`, a deliberately simple placeholder monogram. To use your photo:

1. Upload your photo as `assets/avatar.jpg` (square crop recommended, at least 400 × 400 pixels).
2. In `index.html`, change **both** `src="./assets/avatar.svg"` references to `src="./assets/avatar.jpg"`.

The circular crop and styling are automatic.

## Add your background video and original audio

No copyrighted music video is distributed with this project. You must provide a file you have permission to use and publish.

1. Add your MP4 as `assets/freestyle.mp4`.
2. Use H.264 video with AAC audio for broad browser support.
3. Video playback, including original audio, begins on the user's click on **enter**.
4. Visitors can mute and unmute it using the sound button in the bottom-right.
5. If no MP4 is present, the site intentionally uses its built-in dark atmospheric background instead. The rest of the site still works.

For faster loading, keep the file small (ideally below ~20 MB), preferably 720p, and avoid adding huge video files directly through GitHub's web uploader. A non-video gradient fallback is included for reduced bandwidth or missing media.

## Edit socials

`index.html` includes:

- Instagram: `https://www.instagram.com/sajtosgofri/`
- Discord: button that copies `nagyorru`
- Minecraft: button that copies `nagyorru`

Adjust the text in `data-copy` if needed. Copy buttons work on HTTPS, and have a fallback for plain HTTP.

## Files

- `CNAME`: preserves the custom `ascendo.lol` domain
- `index.html`: content, links and icons
- `styles.css`: all visuals and responsive behavior
- `app.js`: click-to-enter, video sound and copy buttons
- `assets/avatar.svg`: replaceable circular avatar fallback
- `assets/favicon.svg`: browser tab icon

Everything is static and works on GitHub Pages. It can also be previewed locally by opening `index.html` in a browser; the gradients, layout, and socials do not need a server.
