# Angular v22 Course Web App

An interactive course companion app built with Angular v22. Browse all 25 sections of the Angular v22 crash course, track your progress, and read lessons in Arabic or English.

## Live Demo

[https://mostafasaqly.github.io/angular-saqly-v22/](https://mostafasaqly.github.io/angular-saqly-v22/)

## Features

- 25 course sections with full lesson content
- Arabic / English language toggle (RTL/LTR)
- Light / dark theme toggle
- Per-section progress tracking (persisted in localStorage)
- Collapsible sidebar with overall progress bar
- Syntax-highlighted code blocks
- Lazy-loaded section routes for fast initial load
- Responsive layout for mobile and desktop

## Tech Stack

- **Angular v22** — standalone components, OnPush change detection, Zoneless
- **Signals** — `signal`, `computed`, `effect`, `toSignal` for all reactive state
- **Angular Router** — lazy-loaded routes per section
- **Vitest** — unit testing

## Project Structure

```
src/
└── app/
    ├── components/
    │   ├── sidebar.ts          # Navigation sidebar with progress
    │   ├── lesson-content.ts   # Renders content blocks
    │   ├── code-block.ts       # Syntax-highlighted code
    │   └── qa-block.ts         # Expandable Q&A blocks
    ├── models/
    │   └── section.model.ts    # Section and ContentBlock interfaces
    ├── pages/
    │   └── section-page.ts     # Lazy-loaded section route
    ├── services/
    │   └── progress.service.ts # Theme, language, and completion state
    ├── utils/
    │   └── highlight.ts        # Code highlighting utility
    ├── app.routes.ts
    ├── app.config.ts
    └── app.ts
```

## Getting Started

### Prerequisites

- Node.js v22+
- npm v10+

### Install

```bash
npm install
```

### Development server

```bash
npm start
```

Open [http://localhost:4200](http://localhost:4200) in your browser. The app reloads automatically on file changes.

### Build

```bash
npm run build
```

Output goes to `dist/web-app/browser/`.

### Deploy to GitHub Pages

```bash
npm run deploy
```

Builds for production with `--base-href /angular-saqly-v22/` and pushes to the `gh-pages` branch.

### Run tests

```bash
npm test
```

## Author

**Mostafa Saqly** — [github.com/mostafasaqly](https://github.com/mostafasaqly)
