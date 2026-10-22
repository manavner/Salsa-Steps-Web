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
A step can have more than one video. Search shows a separate card for each video (side by side, same step name),
with a "🎬 סרטון 1 מתוך 2" badge. Add videos in the sheet in any of these ways:
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

### New videos batch (2026-10-22)
100 new YouTube videos (BailaSalsaClips) were matched to steps: 59 added as extra videos to existing steps, 41 as new steps
(level/type of new steps is a guess, to review). The 104 rows were added to the Google Sheet ("Rueda Moves", rows 169-272),
so the sheet is the only live data source. `EMBEDDED_DATA` in `app/SalsaApp.js` is an offline fallback snapshot of the sheet.
To add future videos, add rows to the sheet.

### Levels (2026-10-22)
The Level column follows the school curriculum ("סלסה.pdf"): Basic, Beginners, Intermediate, Advanced, Master,
and Other for steps that are not in the curriculum. Each level gets its own filter button.
