# ASCENDO.LOL · Founder Profiles

A static GitHub Pages website. All files use local relative paths. Homepage stays **pure black** and the founder cards link to two working profiles:

- `https://ascendo.lol/nagyorru/` · Discord `nagyorru` (copy), Minecraft IGN `nagyorru` (copy)
- `https://ascendo.lol/k3rlsen/` · TikTok `@ferenckop`, Instagram `@_shewantss.csxngi`, Discord `27ia` (copy)

## Which files go where?

Upload the **contents** of this extracted folder to your GitHub Pages repository. Keep this exact structure:

```text
Repository root/
├── CNAME
├── index.html
├── styles.css
├── app.js
├── README.md
├── nagyorru/
│   └── index.html
├── k3rlsen/
│   └── index.html
└── assets/
    ├── ascendo-logo.png
    ├── favicon.svg
    ├── mypfp.mp4                  # ANIMATED PFP (already included)
    ├── mypfp-poster.jpg
    ├── k3rlsen-avatar.png
    └── music-background.mp4      # ADD THIS YOURSELF
```

### IMPORTANT: `music-background.mp4`

Place **your** background video here: `assets/music-background.mp4` (inside the `assets` folder). It is **not** bundled. The two profile pages play that video with its audio after the visitor clicks **enter**. The homepage has no video at all. If the file is missing or the browser blocks it, profiles remain usable on black backgrounds.

For GitHub's website uploader, an individual file larger than 25 MB usually cannot be uploaded using the browser. Compress the video under 25 MB or use Git on your computer for files up to GitHub's normal 100 MB hard limit. You must have permission to publish the video/music.

### Animated PFP

`assets/mypfp.mp4` is **already included**, sourced from your uploaded file. It loops silently in the founder button on the homepage, and on both the entrance and the main nagyorru profile. `mypfp-poster.jpg` is only a fallback for browsers that cannot play it or visitors who prefer reduced motion.

To replace the animated PFP, replace `assets/mypfp.mp4` with a different video, preserving the filename. The k3rlsen photo is currently cropped from the reference image; swap `assets/k3rlsen-avatar.png` with a better original image if you want.

## GitHub Pages upload guide

1. Open the repository's **Code** tab and go to the **main** branch.
2. Upload or overwrite `index.html`, `styles.css`, `app.js`, `README.md`, `CNAME` **in the repository root**.
3. Create subfolders `nagyorru` and `k3rlsen`, then put each respective `index.html` inside it. One way in GitHub's web UI is `Add file → Create new file`, name it `nagyorru/index.html` and paste that file's contents; repeat for `k3rlsen/index.html`. Alternatively drag-and-drop folders using GitHub's upload drop zone if available.
4. Open the repo's **assets** folder and upload all included assets there (with `music-background.mp4` when you're ready).
5. Commit changes. Verify Settings → Pages points to `main` branch `/(root)`. Hard-refresh the site after the Pages deployment completes.

## Activate Download Ascendo Client 26.3

In root `index.html`, the download button has `href="#"` because you haven't provided a real downloadable client release yet. It shows a message rather than a broken link. When the build is published, replace `#` with your verified release URL or a file link. Don't distribute a fake download.

## Updates

Social links/handles can be edited in `nagyorru/index.html` and `k3rlsen/index.html`. No frameworks or package installs needed.
