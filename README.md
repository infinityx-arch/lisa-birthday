# A Little Universe for You ♡

A responsive, interactive birthday website with a moonlit beach, animated waves and stars, cute cats, a birthday cake, a shy love letter, and little surprises.

## Run locally
1. Unzip the folder.
2. Open `index.html` in a modern browser.
3. For the best experience, use a small local server (optional): in this folder run `python -m http.server 8000`, then open `http://localhost:8000`.

## Personalize it
- Change the birthday heading and birthday age in `index.html` (search for `happy 21st birthday`).
- Edit the birthday paragraphs in the `.message-copy` section.
- Edit the love letter in the `<article id="loveNote">` section.
- Edit the final wish in `.wish-card`.
- Cute click messages and interaction behavior are in `script.js`.
- Main colors, spacing and animation styles are in `styles.css`.

## Add background music
1. Add a royalty-free MP3 you are allowed to use to the `assets` folder.
2. Name it `ocean-piano.mp3`.
3. The music toggle starts OFF on purpose; the visitor must click it because browsers commonly block autoplay.
4. If you use a different filename, update the `<source src="assets/ocean-piano.mp3">` in `index.html`.
5. No music file is included, so the site won't make requests to a made-up audio URL.

## Deploy free with GitHub Pages
1. Create a new GitHub repository, for example `birthday-for-you`.
2. Upload `index.html`, `styles.css`, `script.js`, `README.md`, and the `assets` folder to the repository root.
3. On GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose branch **main** and folder **/(root)**, then save.
6. Wait for the Pages deployment to finish. GitHub will show the public URL in Settings → Pages, usually `https://YOUR-USERNAME.github.io/birthday-for-you/`.
7. Open that URL on your phone to test it before sharing.

## Notes
- No build tools or dependencies are required.
- Google Fonts are optional; if offline, the page falls back to system fonts.
- Animations respect `prefers-reduced-motion` where possible.
- Replace the default `21st` text if you need a different age.
