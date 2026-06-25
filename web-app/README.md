# Angular v22 Course — Interactive Web App

> تطبيق ويب تفاعلي مبني بـ Angular v22 يرافق كورس Angular v22 الشامل — يعرض محتوى الكورس باللغتين العربية والإنجليزية مع تتبع التقدم وتمييز الكود وأسئلة تفاعلية.
>
> An interactive Angular v22 web app that serves as a course companion — displays all 25 sections in Arabic and English with progress tracking, syntax-highlighted code, and interactive Q&A.

---

## 🔗 Live Demo

**[https://mostafasaqly.github.io/angular-saqly-v22/](https://mostafasaqly.github.io/angular-saqly-v22/)**

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Architecture Overview](#architecture-overview)
- [Components](#components)
- [Services](#services)
- [Data Model](#data-model)
- [Deployment](#deployment)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🌐 **Bilingual** | Full Arabic (RTL) and English (LTR) support — toggle instantly |
| 🌙 **Theme** | Dark / Light mode toggle, persisted across sessions |
| ✅ **Progress Tracking** | Mark sections as complete, visual progress bar with percentage |
| 📝 **Notes** | Per-section notes textarea, auto-saved to localStorage |
| 🔍 **Search** | Live search through section titles in the sidebar |
| 💻 **Code Blocks** | Syntax-highlighted TypeScript and Shell code with one-click copy |
| ✍️ **Q&A Blocks** | Interactive self-assessment questions with keyword-based answer scoring |
| ⚡ **Lazy Loading** | Each section loads on demand — fast initial bundle |
| 📱 **Responsive** | Mobile-first layout with collapsible sidebar and hamburger menu |
| ♿ **Accessible** | ARIA labels, semantic HTML, keyboard navigation, `aria-current` on active section |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Angular** | 21.2.x | Core framework |
| **TypeScript** | ~5.9.2 | Language |
| **RxJS** | ~7.8.0 | Router event streams |
| **Vitest** | ^4.0.8 | Unit testing |
| **Prettier** | ^3.8.1 | Code formatting |
| **angular-cli-ghpages** | ^3.1.0 | GitHub Pages deployment |

### Angular Concepts Used

- **Standalone Components** — no NgModules anywhere
- **Signals** — `signal`, `computed`, `effect`, `input`, `output`, `model` for all reactive state
- **`toSignal`** — bridges RxJS router events into signals
- **OnPush Change Detection** — on every component
- **Lazy-loaded Routes** — `loadComponent` per section route
- **`withComponentInputBinding`** — route params bound directly as component inputs
- **`inject()`** — function-based dependency injection

---

## 📁 Project Structure

```
web-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── sidebar.ts          # Collapsible navigation sidebar
│   │   │   ├── lesson-content.ts   # Renders all content block types
│   │   │   ├── code-block.ts       # Syntax-highlighted code with copy button
│   │   │   └── qa-block.ts         # Interactive Q&A with answer scoring
│   │   ├── models/
│   │   │   └── section.model.ts    # TypeScript interfaces for Section & ContentBlock
│   │   ├── pages/
│   │   │   └── section-page.ts     # Lazy-loaded route component per section
│   │   ├── services/
│   │   │   └── progress.service.ts # Theme, language, progress, notes (localStorage)
│   │   ├── utils/
│   │   │   └── highlight.ts        # Custom syntax highlighter (TS + Shell)
│   │   ├── app.ts                  # Root component
│   │   ├── app.html                # Root template (layout, sidebar, router-outlet)
│   │   ├── app.css                 # Global layout styles
│   │   ├── app.routes.ts           # Route definitions
│   │   └── app.config.ts           # App providers configuration
│   ├── data/
│   │   ├── sections.ts             # Section metadata list + dynamic loader
│   │   └── sections/
│   │       ├── section01.ts        # Section 1 full content (AR + EN)
│   │       ├── section02.ts        # Section 2 full content
│   │       └── ...                 # sections 03–25
│   ├── styles.css                  # CSS custom properties (themes, fonts)
│   └── main.ts                     # Bootstrap entry point
├── public/
│   └── fonts/                      # Self-hosted fonts
├── angular.json                    # Angular CLI workspace config
├── package.json
├── tsconfig.json
└── tsconfig.app.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v22 or higher
- **npm** v10 or higher

Check your versions:

```bash
node -v
npm -v
```

### Installation

```bash
# Clone the repository
git clone https://github.com/mostafasaqly/angular-saqly-v22.git

# Navigate into the web app
cd angular-saqly-v22/web-app

# Install dependencies
npm install
```

### Start Development Server

```bash
npm start
```

Open [http://localhost:4200](http://localhost:4200) in your browser. The app hot-reloads on every file change.

---

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `ng serve` | Start local dev server on port 4200 |
| `build` | `ng build` | Production build → `dist/web-app/browser/` |
| `watch` | `ng build --watch` | Dev build with file watching |
| `test` | `ng test` | Run unit tests with Vitest |
| `deploy` | see below | Build + push to GitHub Pages |

### Deploy Command (full)

```bash
ng build --configuration production --base-href /angular-saqly-v22/ && npx angular-cli-ghpages --dir=dist/web-app/browser
```

Or simply:

```bash
npm run deploy
```

This builds for production, sets the correct base URL, and pushes the output to the `gh-pages` branch automatically.

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                   App (Root)                    │
│  ┌──────────────────┐  ┌──────────────────────┐ │
│  │  SidebarComponent│  │    <router-outlet>   │ │
│  │                  │  │                      │ │
│  │  • Section list  │  │  SectionPageComponent│ │
│  │  • Search        │  │  (lazy loaded)       │ │
│  │  • Progress bar  │  │         │            │ │
│  │  • Theme toggle  │  │  LessonContentComponent│
│  │  • Lang toggle   │  │         │            │ │
│  └──────────────────┘  │  ┌──────┴──────────┐ │ │
│                        │  │  CodeBlockComponent│ │
│                        │  │  QABlockComponent  │ │
│                        │  └────────────────────┘ │
│                        └──────────────────────┘ │
└─────────────────────────────────────────────────┘
                         │
              ProgressService (providedIn: root)
              • theme signal
              • isAr signal
              • completed signal (Set<number>)
              • notes signal (Record<number, string>)
              • All persisted to localStorage via effect()
```

### Data Flow

1. `ProgressService` holds all global state as **Signals**
2. `App` (root) reads signals and passes them down as **inputs** to `SidebarComponent`
3. **Router** navigates to `/section/:id` → lazy-loads `SectionPageComponent`
4. `SectionPageComponent` reads route param via `input.required<string>()` → calls `loadSection(id)` (dynamic import)
5. `LessonContentComponent` receives the loaded `Section` object and renders **content blocks**

---

## 🧩 Components

### `SidebarComponent`

**File:** `src/app/components/sidebar.ts`

Displays the full section list with search, progress tracking, theme toggle, and language toggle.

| Input | Type | Description |
|-------|------|-------------|
| `sections` | `SectionMeta[]` | List of all 25 sections |
| `activeId` | `number` | Currently viewed section ID |
| `completed` | `Set<number>` | IDs of completed sections |
| `total` | `number` | Total available sections |
| `percent` | `number` | Completion percentage |
| `isAr` | `boolean` | Arabic mode flag |
| `theme` | `'dark' \| 'light'` | Current theme |
| `open` | `boolean` | Mobile sidebar open state |

| Output | Type | Description |
|--------|------|-------------|
| `selectSection` | `number` | Emits section ID when clicked |
| `toggleTheme` | `void` | Theme toggle clicked |
| `toggleLang` | `void` | Language toggle clicked |

Internal `searchQuery` signal filters the section list in real time using a `computed`.

---

### `LessonContentComponent`

**File:** `src/app/components/lesson-content.ts`

Renders a full section: title, level badge, intro, lessons table of contents, content blocks, notes textarea, and the "Mark as Complete" button.

Supports 9 content block types via `@switch`:

| Block Type | Rendered As |
|------------|-------------|
| `heading` | `<h2>` |
| `subheading` | `<h3>` |
| `paragraph` | `<p>` |
| `tip` | Styled tip box with 💡 |
| `warning` | Styled warning box with ⚠️ |
| `list` | `<ul>` list |
| `code` | `<app-code-block>` |
| `cta` | Call-to-action with optional link |
| `qa` | `<app-qa-block>` interactive question |

---

### `CodeBlockComponent`

**File:** `src/app/components/code-block.ts`

Displays syntax-highlighted code with a **Copy** button that resets back to "Copy" after 2 seconds.

Uses the custom `highlight()` utility which auto-detects TypeScript vs Shell code and applies token-based HTML highlighting.

---

### `QABlockComponent`

**File:** `src/app/components/qa-block.ts`

Interactive self-assessment question block with three modes:

| Mode | Description |
|------|-------------|
| `writing` | User writes their answer in a textarea |
| `checked` | Score is computed and displayed (keyword matching) |
| `revealed` | Correct answer shown alongside user's attempt |

**Scoring algorithm:** normalizes both answers, extracts words > 2 characters, counts keyword hits against the correct answer (capped at 8 keywords), returns 0–100%.

| Score Range | Label |
|-------------|-------|
| ≥ 70% | Excellent 🎉 |
| 40–69% | Good, review the answer |
| < 40% | Review the answer |

---

## ⚙️ Services

### `ProgressService`

**File:** `src/app/services/progress.service.ts`  
**Scope:** `providedIn: 'root'`

Manages all persistent user state using Angular Signals. Every signal is automatically synced to `localStorage` via `effect()`.

| Signal | Type | localStorage Key | Description |
|--------|------|-----------------|-------------|
| `theme` | `'dark' \| 'light'` | `ng-theme` | Current color theme |
| `isAr` | `boolean` | `ng-lang` | Arabic (`true`) or English (`false`) |
| `completed` | `Set<number>` | `ng-progress` | Set of completed section IDs |
| `notes` | `Record<number, string>` | `ng-notes` | Per-section note text |

| Method | Description |
|--------|-------------|
| `toggleTheme()` | Switches between dark and light |
| `toggleLang()` | Switches between Arabic and English |
| `toggleComplete(id)` | Adds/removes a section from completed set |
| `updateNote(id, text)` | Updates the note for a section |
| `noteFor(id)` | Returns a `computed` signal for a section's note |
| `isCompleted(id)` | Returns a `computed` signal for completion state |

---

## 📐 Data Model

### `Section` Interface

```typescript
interface Section {
  id: number;
  title: string;       // Arabic title
  titleEn: string;     // English title
  level: string;       // Arabic difficulty level
  levelEn: string;     // English difficulty level
  intro: string;       // Arabic intro paragraph
  introEn: string;     // English intro paragraph
  lessons: string[];   // Arabic lesson names list
  lessonsEn: string[]; // English lesson names list
  content: ContentBlockType[];     // Arabic content blocks
  contentEn?: ContentBlockType[];  // English content blocks (optional)
  comingSoon?: boolean;
}
```

### `ContentBlockType` Union

```typescript
type ContentBlockType =
  | { type: 'heading';    text: string }
  | { type: 'subheading'; text: string }
  | { type: 'paragraph';  text: string }
  | { type: 'tip';        text: string }
  | { type: 'warning';    text: string }
  | { type: 'list';       items: string[] }
  | { type: 'code';       code: string }
  | { type: 'cta';        text: string; link?: string; linkLabel?: string }
  | { type: 'qa';         question: string; answer: string };
```

### `SectionMeta` Interface

Used in the sidebar for lightweight listing (no full content loaded):

```typescript
interface SectionMeta {
  id: number;
  title: string;
  titleEn: string;
  comingSoon?: boolean;
}
```

---

## 🚢 Deployment

The app deploys to **GitHub Pages** using `angular-cli-ghpages`.

```bash
npm run deploy
```

What this does:
1. Builds with `--configuration production` (minification, tree-shaking, output hashing)
2. Sets `--base-href /angular-saqly-v22/` so assets resolve correctly under the GitHub Pages subpath
3. Pushes the `dist/web-app/browser/` output to the `gh-pages` branch
4. A `404.html` is auto-generated to support client-side routing

The live site is served at:  
**[https://mostafasaqly.github.io/angular-saqly-v22/](https://mostafasaqly.github.io/angular-saqly-v22/)**

---

## 👤 Author

**Mostafa Saqly**  
[github.com/mostafasaqly](https://github.com/mostafasaqly)

---

> Also check out the [React v19 Course companion app](https://mostafasaqly.github.io/react-saqly-v19/)
