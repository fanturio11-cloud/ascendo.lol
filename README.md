# ASCENDO.LOL

A minimal black landing page for `ascendo.lol`, rebuilt to match your reference more closely:

- full black background
- actual Ascendo logo in the center
- large `Download Ascendo Client 26.3` pill button
- `Founders` section
- founder cards for `nagyorru` and `k3rlsen`
- no Instagram or profile/social section

## Publish on GitHub Pages

1. Unzip this package.
2. Open your GitHub repository connected to `ascendo.lol`.
3. Upload the **contents** of this folder, not the enclosing folder.
4. `index.html`, `styles.css`, `app.js`, `README.md`, and `CNAME` must be in the repository root.
5. The `assets` folder must remain as `assets`.
6. Commit the changes to `main`.
7. Wait a few minutes, then refresh `ascendo.lol` with `Ctrl + Shift + R`.

## Change the download link

Right now the button is visual and shows a toast if no file URL is set.

To make it download something, open `index.html` and replace this:

```html
<a class="download" id="downloadButton" href="#">
```

with your real file URL, for example:

```html
<a class="download" id="downloadButton" href="./downloads/Ascendo-Client-26.3.zip">
```

Or paste any direct URL you want.

## Assets used

- `assets/ascendo-logo.png` → your actual Ascendo logo
- `assets/mypfp-poster.jpg` → avatar used for `nagyorru`
- `assets/k3rlsen-avatar.png` → cropped founder avatar for `k3rlsen`
- `assets/favicon.svg` → browser tab icon

Unused older files can stay in the folder without breaking the site.
