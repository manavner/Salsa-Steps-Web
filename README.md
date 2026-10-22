# 💃 Salsa Steps Catalog

A web app for searching and playing salsa & rueda dance step videos.

**By Avner Man**

## Features
- 🔍 Search steps by name
- 🏷️ Filter by level (Beginners / Intermediate / Advanced)
- 🎭 Filter by type (Free / Rueda / Tiempo España / Hombres el Centro)
- ▶️ Embedded YouTube video player
- 🔊 Text-to-Speech pronunciation in Spanish
- 📱 Responsive design + PWA support
- 🌙 Dark theme

## Data Source
Steps are loaded from Google Sheets (`CSV_URL` in `app/SalsaApp.js`). Fallback data is embedded in the app.
Supports YouTube and Google Drive video links.

### Multiple videos per step (2026-10-22)
A step can have more than one video. Search shows one card per step with a "🎬 N סרטונים" badge,
and the video window has buttons to switch between "סרטון 1", "סרטון 2", etc. Add videos in the sheet in any of these ways:
- **Another row** with the same step name, level and type (name match ignores upper/lower case and extra spaces).
- **Extra columns** after the link column (F, G, ...), one link per column.
- **Several links in one cell**, separated by a new line, space, `|` or `;`.

Note: rows that differ only in letter case (e.g. "Dedo Complicado" / "Dedo complicado") are now merged into one step.

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import the GitHub repository
4. Click Deploy — done!

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
