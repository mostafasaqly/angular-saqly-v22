# Section 2: Development Environment Setup

> **Angular v22 Course** — Section 2 of 25
> Estimated time: ~45 minutes · Level: Beginner

Before we write a single line of Angular code, we need the right tools installed and configured. This section walks through everything: Node.js v22+, TypeScript v6, the Angular CLI, and the VS Code extensions that make Angular development fast and enjoyable. By the end you'll have a running Angular v22 project on your machine.

---

## Table of Contents

1. [Installing Node.js (v22+ Required)](#1-installing-nodejs-v22-required)
2. [TypeScript v6 Requirement](#2-typescript-v6-requirement)
3. [Installing Angular CLI](#3-installing-angular-cli)
4. [Creating a New Angular v22 Project](#4-creating-a-new-angular-v22-project)
5. [Understanding Angular Workspace](#5-understanding-angular-workspace)
6. [Project Folder Structure](#6-project-folder-structure)
7. [Running the Development Server](#7-running-the-development-server)
8. [Recommended VS Code Extensions](#8-recommended-vs-code-extensions)
9. [Setting Up the Angular MCP Server and AI Skills](#9-setting-up-the-angular-mcp-server-and-ai-skills)

---

## 1. Installing Node.js (v22+ Required)

Angular v22 requires **Node.js v22 or higher**. Node v20 reached end-of-life and is no longer supported by the Angular CLI.

### Check your current version

```bash
node -v
# Must print v22.x.x or higher
npm -v
# Must print 10.x.x or higher
```

### Install or upgrade Node.js

Go to [nodejs.org](https://nodejs.org) and download the **LTS** release (v22+).

> ⚠️ **Windows users:** Use the official installer. After installing, close and reopen your terminal so the new `node` command is picked up.

### Using a version manager (recommended)

If you work on multiple Node projects, use a version manager:

| Tool | Platform | Command |
|---|---|---|
| **nvm** | macOS / Linux | `nvm install 22 && nvm use 22` |
| **nvm-windows** | Windows | `nvm install 22.0.0 && nvm use 22.0.0` |
| **fnm** | All platforms | `fnm install 22 && fnm use 22` |

```bash
# After installing via nvm
nvm install 22
nvm use 22
node -v   # v22.x.x ✓
```

---

## 2. TypeScript v6 Requirement

Angular v22 ships with **TypeScript v6** as a peer dependency. TypeScript v6 brings:

- Faster type checking (incremental builds are ~30% faster)
- Improved decorator metadata (required for Angular's DI)
- Stricter `exactOptionalPropertyTypes` by default

You don't install TypeScript separately — the Angular CLI installs the correct version automatically when you create a project. But if you already have a global TypeScript installation:

```bash
# Check global TypeScript version (optional)
tsc -v
# Should print Version 6.x.x after project creation
```

> 💡 **Never install TypeScript globally for Angular projects.** Let the CLI manage it per-project inside `node_modules/.bin/tsc`. This avoids version conflicts.

---

## 3. Installing Angular CLI

The Angular CLI (`ng`) is the command-line tool for everything: creating projects, generating components, running the dev server, building for production, and running tests.

### Install globally

```bash
npm install -g @angular/cli@latest
```

### Verify installation

```bash
ng version
```

You should see output similar to:

```
Angular CLI: 22.x.x
Node: 22.x.x
Package Manager: npm 10.x.x
OS: ...
```

### Update an existing CLI

```bash
npm uninstall -g @angular/cli
npm install -g @angular/cli@latest
```

> ⚠️ **Never mix CLI versions.** If your global CLI is v15 and you run `ng new`, you get an Angular v15 project. Always update to `@latest` before starting a new course project.

---

## 4. Creating a New Angular v22 Project

```bash
ng new my-angular-app
```

The CLI will ask a few questions:

| Prompt | Recommended Answer |
|---|---|
| Which stylesheet format? | **CSS** (we'll use plain CSS in this course) |
| Enable Server-Side Rendering? | **No** (we cover SSR in Section 19) |

### What the CLI does

1. Scaffolds the project folder structure
2. Installs all npm dependencies (takes ~30 seconds)
3. Initializes a git repository
4. Configures TypeScript, ESLint, and the Angular compiler

```bash
# Navigate into the project
cd my-angular-app

# Open in VS Code
code .
```

> 💡 Angular v22 projects are **Zoneless by default** and use **standalone components** — no `NgModule`, no `zone.js`. This is the modern Angular way.

---

## 5. Understanding Angular Workspace

An Angular **workspace** is the root folder created by `ng new`. It can contain one or more **projects** (apps and libraries).

```
my-angular-app/          ← workspace root
├── angular.json         ← workspace configuration
├── package.json         ← npm dependencies
├── tsconfig.json        ← TypeScript base config
└── src/                 ← the actual application
```

### `angular.json` — the workspace config

This file tells the CLI how to build, serve, and test your app. Key fields:

```json
{
  "projects": {
    "my-angular-app": {
      "architect": {
        "build": { "builder": "@angular-devkit/build-angular:application" },
        "serve": { "builder": "@angular-devkit/build-angular:dev-server" },
        "test":  { "builder": "@angular-devkit/build-angular:karma" }
      }
    }
  }
}
```

> ⚠️ Don't edit `angular.json` manually until you understand what each field does. Use `ng generate` and `ng config` commands instead.

---

## 6. Project Folder Structure

```
src/
├── app/
│   ├── app.ts           ← Root component (TypeScript class)
│   ├── app.html         ← Root component template
│   ├── app.css          ← Root component styles
│   └── app.config.ts    ← App-level providers (router, HTTP, etc.)
├── index.html           ← Single HTML entry point
├── main.ts              ← Bootstrap entry — calls bootstrapApplication()
└── styles.css           ← Global styles
```

### Key files explained

**`main.ts`** — bootstraps the app:
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig);
```

**`app.config.ts`** — registers app-wide providers:
```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ]
};
```

**`app.ts`** — the root component:
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'my-angular-app';
}
```

> 💡 Notice there's no `NgModule` anywhere. Angular v22 is fully standalone-first.

---

## 7. Running the Development Server

```bash
ng serve
```

The dev server starts at **`http://localhost:4200`** by default.

### Useful flags

| Flag | Purpose |
|---|---|
| `ng serve --open` | Opens the browser automatically |
| `ng serve --port 3000` | Change the port |
| `ng serve --host 0.0.0.0` | Expose on local network (mobile testing) |

### What happens when you save a file

Angular CLI uses **esbuild** under the hood (since v17). Hot Module Replacement (HMR) is enabled by default — the browser updates in milliseconds without a full page reload.

```bash
# Build stats you'll see in the terminal:
# ✔ Compiled successfully in 312ms
# ➜ Local:  http://localhost:4200/
```

> ⚠️ **Keep the terminal open** while developing. `ng serve` watches files and recompiles on every save. Press `Ctrl + C` to stop.

---

## 8. Recommended VS Code Extensions

Install these from the VS Code Extensions panel (`Ctrl + Shift + X`):

| Extension | Author | Why |
|---|---|---|
| **Angular Language Service** | Angular | Autocomplete, type-checking in templates |
| **Angular Snippets** | John Papa | Fast snippet generation |
| **ESLint** | Microsoft | Linting (Angular CLI sets this up) |
| **Prettier** | Prettier | Code formatting |
| **EditorConfig** | EditorConfig | Consistent indentation across editors |
| **Angular DevTools** | Angular (Chrome) | Inspect Signal graph + component tree |

### Angular Language Service — the most important one

This extension gives you:
- Autocomplete for component inputs and outputs in templates
- Error highlighting in `{{ }}` interpolations
- Go-to-definition from template to TypeScript class
- Hover documentation on Angular directives

> 💡 Install **Angular DevTools** as a **Chrome extension** (not VS Code). It adds an "Angular" tab to Chrome DevTools where you can inspect the Signal dependency graph live.

---

## 9. Setting Up the Angular MCP Server and AI Skills

The **Angular MCP (Model Context Protocol) Server** is an optional tool that lets AI assistants (like Claude) understand your Angular project in real time — giving context-aware completions, generating components, and explaining errors with full project awareness.

### Install the Angular MCP Server

```bash
npm install -g @angular/mcp@latest
```

### Add it to your Claude Code config

In your project root, create or edit `.claude/mcp.json`:

```json
{
  "mcpServers": {
    "angular": {
      "command": "ng-mcp",
      "args": ["--project", "."]
    }
  }
}
```

### What the MCP server provides

| Capability | Description |
|---|---|
| Project awareness | Claude knows your component names, services, and routes |
| `ng generate` via AI | Ask Claude to generate a component and it runs the CLI for you |
| Error context | TypeScript errors include full component context |
| Signal graph | Claude can read and reason about your Signal dependencies |

### Angular AI Skills (optional)

Angular ships a set of **AI skills** — pre-built prompts that teach Claude how to generate idiomatic Angular v22 code:

```bash
# List available skills
ng ai skills list

# Add Angular skills to your project
ng ai skills add --all
```

> 💡 This is optional but highly recommended. With the MCP server running, asking Claude "generate a product list component that fetches from `/api/products`" produces correct, idiomatic Angular v22 code on the first try.

---

## ✅ Section 2 Recap

You now have:
- **Node.js v22+** installed and verified
- **Angular CLI** installed globally and up to date
- **A new Angular v22 project** scaffolded — Zoneless, standalone, esbuild-powered
- **Understood the workspace structure** — `angular.json`, `src/app/`, `main.ts`, `app.config.ts`
- **Dev server running** at `localhost:4200` with HMR
- **VS Code extensions** installed for a productive Angular workflow
- **Angular MCP Server** configured for AI-assisted development (optional)

### Knowledge Check

1. What is the minimum Node.js version required by Angular v22, and why was v20 dropped?
2. What command creates a new Angular v22 project, and what two questions does the CLI ask?
3. What does the Angular Language Service extension do that makes template editing easier?

<details>
<summary>Show answers</summary>

1. Node.js **v22+** is required. Node v20 reached end-of-life and is no longer supported by the Angular CLI — using it would mean missing security patches.
2. `ng new <project-name>`. The CLI asks: (1) which stylesheet format (CSS, SCSS, etc.) and (2) whether to enable Server-Side Rendering.
3. The Angular Language Service provides **autocomplete for component inputs/outputs in HTML templates**, **error highlighting in `{{ }}` interpolations**, **go-to-definition** from template to TypeScript class, and **hover documentation** on Angular directives — things the standard TypeScript LSP can't do inside HTML files.

</details>

---

**Next up — [Section 3: Angular Fundamentals](../Section%2003%20-%20Angular%20Fundamentals/README.md)**
We'll write our first real Angular component from scratch, understand decorators, and see how the template compiler turns HTML + TypeScript into a live UI. 🚀
