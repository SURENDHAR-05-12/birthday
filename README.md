# Pappa Birthday Journey 🎂

A cute, animated birthday surprise site built with React, Vite, Tailwind, Framer Motion and react-confetti.

## Run locally
```bash
npm install
npm run dev
```
Open the printed URL (usually http://localhost:5173).

## Customize
- Edit text in `src/App.jsx` (SITE_TITLE, NAME_NICK, LETTER_TEXT).
- Replace photos inside `src/components/MemoryTimeline.jsx` and `src/components/Gallery.jsx`.
- Add video wishes (mp4 links) in `src/components/Wishes.jsx` (set `video` to a URL).
- Add background music by setting `src` prop in `<MusicPlayer src="/music/hbd.mp3" />` and place the file in `public/music/`.

## Build for production
```bash
npm run build
npm run preview
```

## Deploy
Push to GitHub and import into Vercel/Netlify.
