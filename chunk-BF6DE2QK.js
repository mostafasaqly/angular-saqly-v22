import"./chunk-JS3ZFT6L.js";var e={id:2,title:"\u0625\u0639\u062F\u0627\u062F \u0628\u064A\u0626\u0629 \u0627\u0644\u062A\u0637\u0648\u064A\u0631",titleEn:"Development Environment Setup",level:"\u0645\u0628\u062A\u062F\u0626",levelEn:"Beginner",intro:"\u0642\u0628\u0644 \u0623\u0646 \u0646\u0643\u062A\u0628 \u0633\u0637\u0631\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0645\u0646 \u0643\u0648\u062F Angular\u060C \u0646\u062D\u062A\u0627\u062C \u0625\u0644\u0649 \u062A\u062B\u0628\u064A\u062A \u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0627\u0644\u0635\u062D\u064A\u062D\u0629. \u0633\u0646\u062B\u0628\u062A Node.js v22\u060C \u0648TypeScript v6\u060C \u0648Angular CLI\u060C \u0648\u0625\u0636\u0627\u0641\u0627\u062A VS Code\u060C \u0648\u0646\u064F\u0634\u063A\u0651\u0644 \u0623\u0648\u0644 \u0645\u0634\u0631\u0648\u0639 Angular v22 \u062D\u0642\u064A\u0642\u064A \u0639\u0644\u0649 \u062C\u0647\u0627\u0632\u0643.",introEn:"Before we write a single line of Angular code, we need the right tools in place. We'll install Node.js v22, TypeScript v6, the Angular CLI, the essential VS Code extensions, and run a real Angular v22 project on your machine.",lessons:["\u062A\u062B\u0628\u064A\u062A Node.js (\u0627\u0644\u0625\u0635\u062F\u0627\u0631 v22+ \u0645\u0637\u0644\u0648\u0628)","\u0645\u062A\u0637\u0644\u0628 TypeScript v6","\u062A\u062B\u0628\u064A\u062A Angular CLI","\u0625\u0646\u0634\u0627\u0621 \u0645\u0634\u0631\u0648\u0639 Angular v22 \u062C\u062F\u064A\u062F","\u0641\u0647\u0645 Angular Workspace","\u0647\u064A\u0643\u0644 \u0645\u062C\u0644\u062F\u0627\u062A \u0627\u0644\u0645\u0634\u0631\u0648\u0639","\u062A\u0634\u063A\u064A\u0644 \u062E\u0627\u062F\u0645 \u0627\u0644\u062A\u0637\u0648\u064A\u0631","\u0625\u0636\u0627\u0641\u0627\u062A VS Code \u0627\u0644\u0645\u0648\u0635\u0649 \u0628\u0647\u0627","\u0625\u0639\u062F\u0627\u062F Angular MCP Server \u0648AI Skills"],lessonsEn:["Installing Node.js (v22+ required)","TypeScript v6 Requirement","Installing Angular CLI","Creating a New Angular v22 Project","Understanding Angular Workspace","Project Folder Structure","Running the Development Server","Recommended VS Code Extensions","Setting Up the Angular MCP Server and AI Skills"],content:[{type:"heading",text:"\u062A\u062B\u0628\u064A\u062A Node.js (v22+ \u0645\u0637\u0644\u0648\u0628)"},{type:"paragraph",text:"Angular v22 \u064A\u062A\u0637\u0644\u0628 Node.js \u0627\u0644\u0625\u0635\u062F\u0627\u0631 22 \u0623\u0648 \u0623\u062D\u062F\u062B. \u0627\u0644\u0625\u0635\u062F\u0627\u0631 v20 \u0644\u0645 \u064A\u0639\u062F \u0645\u062F\u0639\u0648\u0645\u0627\u064B \u0645\u0646 Angular CLI. \u062A\u062D\u0642\u0642 \u0645\u0646 \u0625\u0635\u062F\u0627\u0631\u0643 \u0627\u0644\u062D\u0627\u0644\u064A \u0623\u0648\u0644\u0627\u064B."},{type:"code",code:`node -v
# \u064A\u062C\u0628 \u0623\u0646 \u064A\u0638\u0647\u0631 v22.x.x \u0623\u0648 \u0623\u062D\u062F\u062B

npm -v
# \u064A\u062C\u0628 \u0623\u0646 \u064A\u0638\u0647\u0631 10.x.x \u0623\u0648 \u0623\u062D\u062F\u062B`},{type:"tip",text:"\u0625\u0646 \u0643\u0646\u062A \u062A\u0639\u0645\u0644 \u0639\u0644\u0649 \u0645\u0634\u0627\u0631\u064A\u0639 \u0645\u062A\u0639\u062F\u062F\u0629 \u0628\u0625\u0635\u062F\u0627\u0631\u0627\u062A Node \u0645\u062E\u062A\u0644\u0641\u0629\u060C \u0627\u0633\u062A\u062E\u062F\u0645 \u0645\u062F\u064A\u0631 \u0627\u0644\u0625\u0635\u062F\u0627\u0631\u0627\u062A nvm \u2014 \u064A\u062A\u064A\u062D \u0644\u0643 \u0627\u0644\u062A\u0628\u062F\u064A\u0644 \u0628\u064A\u0646 \u0627\u0644\u0625\u0635\u062F\u0627\u0631\u0627\u062A \u0628\u0623\u0645\u0631 \u0648\u0627\u062D\u062F."},{type:"code",code:`# \u062A\u062B\u0628\u064A\u062A Node v22 \u0639\u0628\u0631 nvm
nvm install 22
nvm use 22
node -v   # v22.x.x \u2713`},{type:"heading",text:"\u0645\u062A\u0637\u0644\u0628 TypeScript v6"},{type:"paragraph",text:"Angular v22 \u064A\u0634\u062A\u063A\u0644 \u0645\u0639 TypeScript v6 \u0643\u0640 peer dependency. \u0644\u0627 \u062A\u062D\u062A\u0627\u062C \u0644\u062A\u062B\u0628\u064A\u062A\u0647 \u064A\u062F\u0648\u064A\u0627\u064B \u2014 Angular CLI \u0633\u064A\u062B\u0628\u062A \u0627\u0644\u0625\u0635\u062F\u0627\u0631 \u0627\u0644\u0635\u062D\u064A\u062D \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u0634\u0631\u0648\u0639."},{type:"warning",text:"\u0644\u0627 \u062A\u062B\u0628\u062A TypeScript \u0628\u0634\u0643\u0644 global \u0644\u0645\u0634\u0627\u0631\u064A\u0639 Angular. \u0627\u062A\u0631\u0643\u0647 \u064A\u064F\u062F\u0627\u0631 \u0628\u0648\u0627\u0633\u0637\u0629 CLI \u062F\u0627\u062E\u0644 node_modules \u0644\u062A\u062C\u0646\u0628 \u062A\u0639\u0627\u0631\u0636 \u0627\u0644\u0625\u0635\u062F\u0627\u0631\u0627\u062A."},{type:"code",code:`# \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0625\u0635\u062F\u0627\u0631 TypeScript \u062F\u0627\u062E\u0644 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 (\u0628\u0639\u062F \u0627\u0644\u0625\u0646\u0634\u0627\u0621)
npx tsc -v
# Version 6.x.x`},{type:"heading",text:"\u062A\u062B\u0628\u064A\u062A Angular CLI"},{type:"paragraph",text:"Angular CLI \u0647\u064A \u0623\u062F\u0627\u0629 \u0633\u0637\u0631 \u0627\u0644\u0623\u0648\u0627\u0645\u0631 \u0627\u0644\u062A\u064A \u062A\u062A\u062D\u0643\u0645 \u0641\u064A \u0643\u0644 \u0634\u064A\u0621: \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639\u060C \u062A\u0648\u0644\u064A\u062F Components\u060C \u062A\u0634\u063A\u064A\u0644 \u062E\u0627\u062F\u0645 \u0627\u0644\u062A\u0637\u0648\u064A\u0631\u060C \u0648\u0627\u0644\u0628\u0646\u0627\u0621 \u0644\u0644\u0625\u0646\u062A\u0627\u062C."},{type:"code",code:`# \u062A\u062B\u0628\u064A\u062A CLI \u0639\u0627\u0644\u0645\u064A\u0627\u064B
npm install -g @angular/cli@latest

# \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u062A\u062B\u0628\u064A\u062A
ng version`},{type:"tip",text:"\u0625\u0646 \u0643\u0627\u0646 \u0644\u062F\u064A\u0643 CLI \u0642\u062F\u064A\u0645\u060C \u0642\u0645 \u0628\u0625\u0644\u063A\u0627\u0621 \u062A\u062B\u0628\u064A\u062A\u0647 \u0623\u0648\u0644\u0627\u064B: npm uninstall -g @angular/cli \u062B\u0645 \u0623\u0639\u062F \u0627\u0644\u062A\u062B\u0628\u064A\u062A."},{type:"heading",text:"\u0625\u0646\u0634\u0627\u0621 \u0645\u0634\u0631\u0648\u0639 Angular v22 \u062C\u062F\u064A\u062F"},{type:"paragraph",text:"\u0623\u0645\u0631 \u0648\u0627\u062D\u062F \u064A\u0643\u0641\u064A \u0644\u0625\u0646\u0634\u0627\u0621 \u0645\u0634\u0631\u0648\u0639 \u0643\u0627\u0645\u0644 \u0645\u0639 \u0643\u0644 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A."},{type:"code",code:`ng new my-angular-app

# CLI \u0633\u064A\u0633\u0623\u0644\u0643:
# \u061F Which stylesheet format? \u2192 CSS
# \u061F Enable Server-Side Rendering? \u2192 No

cd my-angular-app
code .`},{type:"tip",text:"\u0645\u0634\u0627\u0631\u064A\u0639 Angular v22 \u062A\u0639\u0645\u0644 \u0628\u0640 Zoneless \u0628\u0634\u0643\u0644 \u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0648\u062A\u0633\u062A\u062E\u062F\u0645 Standalone Components \u2014 \u0628\u062F\u0648\u0646 NgModule\u060C \u0628\u062F\u0648\u0646 zone.js. \u0647\u0630\u0627 \u0647\u0648 \u0627\u0644\u0623\u0633\u0644\u0648\u0628 \u0627\u0644\u062D\u062F\u064A\u062B."},{type:"heading",text:"\u0641\u0647\u0645 Angular Workspace"},{type:"paragraph",text:"\u0627\u0644\u0640 Workspace \u0647\u0648 \u0627\u0644\u0645\u062C\u0644\u062F \u0627\u0644\u062C\u0630\u0631\u064A \u0627\u0644\u0630\u064A \u064A\u0646\u0634\u0626\u0647 ng new. \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0645\u0644\u0641 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A angular.json\u060C \u0648\u0645\u0644\u0641 \u0627\u0644\u062D\u0632\u0645 package.json\u060C \u0648\u0625\u0639\u062F\u0627\u062F\u0627\u062A TypeScript."},{type:"code",code:`my-angular-app/
\u251C\u2500\u2500 angular.json      \u2190 \u0625\u0639\u062F\u0627\u062F\u0627\u062A workspace
\u251C\u2500\u2500 package.json      \u2190 \u062D\u0632\u0645 npm
\u251C\u2500\u2500 tsconfig.json     \u2190 \u0625\u0639\u062F\u0627\u062F\u0627\u062A TypeScript \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629
\u2514\u2500\u2500 src/              \u2190 \u0643\u0648\u062F \u0627\u0644\u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0641\u0639\u0644\u064A`},{type:"warning",text:"\u0644\u0627 \u062A\u0639\u062F\u0651\u0644 angular.json \u064A\u062F\u0648\u064A\u0627\u064B \u062D\u062A\u0649 \u062A\u0641\u0647\u0645 \u0643\u0644 \u062D\u0642\u0644 \u0641\u064A\u0647. \u0627\u0633\u062A\u062E\u062F\u0645 \u0623\u0648\u0627\u0645\u0631 ng generate \u0648 ng config \u0628\u062F\u0644\u0627\u064B \u0645\u0646 \u0630\u0644\u0643."},{type:"heading",text:"\u0647\u064A\u0643\u0644 \u0645\u062C\u0644\u062F\u0627\u062A \u0627\u0644\u0645\u0634\u0631\u0648\u0639"},{type:"code",code:`src/
\u251C\u2500\u2500 app/
\u2502   \u251C\u2500\u2500 app.ts           \u2190 Root Component (TypeScript)
\u2502   \u251C\u2500\u2500 app.html         \u2190 \u0642\u0627\u0644\u0628 \u0627\u0644\u0645\u0643\u0648\u0646 \u0627\u0644\u062C\u0630\u0631\u064A
\u2502   \u251C\u2500\u2500 app.css          \u2190 \u0623\u0646\u0645\u0627\u0637 \u0627\u0644\u0645\u0643\u0648\u0646 \u0627\u0644\u062C\u0630\u0631\u064A
\u2502   \u2514\u2500\u2500 app.config.ts    \u2190 Providers (Router, HTTP\u2026)
\u251C\u2500\u2500 index.html           \u2190 \u0646\u0642\u0637\u0629 \u0627\u0644\u062F\u062E\u0648\u0644 \u0627\u0644\u0648\u062D\u064A\u062F\u0629
\u251C\u2500\u2500 main.ts              \u2190 Bootstrap
\u2514\u2500\u2500 styles.css           \u2190 \u0623\u0646\u0645\u0627\u0637 \u0639\u0627\u0645\u0629`},{type:"code",code:`// main.ts \u2014 \u0628\u0648\u0627\u0628\u0629 \u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u062A\u0637\u0628\u064A\u0642
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig);`},{type:"code",code:`// app.config.ts \u2014 providers \u0639\u0644\u0649 \u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062A\u0637\u0628\u064A\u0642
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ]
};`},{type:"code",code:`// app.ts \u2014 \u0627\u0644\u0645\u0643\u0648\u0646 \u0627\u0644\u062C\u0630\u0631\u064A
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'my-angular-app';
}`},{type:"tip",text:"\u0644\u0627\u062D\u0638 \u063A\u064A\u0627\u0628 NgModule \u062A\u0645\u0627\u0645\u0627\u064B. Angular v22 \u064A\u0639\u062A\u0645\u062F Standalone Components \u0628\u0634\u0643\u0644 \u0643\u0627\u0645\u0644."},{type:"heading",text:"\u062A\u0634\u063A\u064A\u0644 \u062E\u0627\u062F\u0645 \u0627\u0644\u062A\u0637\u0648\u064A\u0631"},{type:"code",code:`ng serve

# \u2714 Compiled successfully in 312ms
# \u279C Local:  http://localhost:4200/`},{type:"paragraph",text:"Angular CLI \u064A\u0633\u062A\u062E\u062F\u0645 esbuild \u062A\u062D\u062A \u0627\u0644\u063A\u0637\u0627\u0621 \u0645\u0646\u0630 \u0627\u0644\u0625\u0635\u062F\u0627\u0631 v17. HMR (Hot Module Replacement) \u0645\u0641\u0639\u0651\u0644 \u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0627\u064B \u2014 \u0627\u0644\u0645\u062A\u0635\u0641\u062D \u064A\u062A\u062D\u062F\u062B \u0628\u0627\u0644\u0645\u0644\u064A \u062B\u0627\u0646\u064A\u0629 \u0628\u062F\u0648\u0646 \u0625\u0639\u0627\u062F\u0629 \u062A\u062D\u0645\u064A\u0644 \u0643\u0627\u0645\u0644."},{type:"list",items:["ng serve --open \u2192 \u064A\u0641\u062A\u062D \u0627\u0644\u0645\u062A\u0635\u0641\u062D \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B","ng serve --port 3000 \u2192 \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0628\u0648\u0631\u062A","ng serve --host 0.0.0.0 \u2192 \u0627\u0644\u0648\u0635\u0648\u0644 \u0645\u0646 \u0634\u0628\u0643\u0629 \u0645\u062D\u0644\u064A\u0629 (\u0644\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0648\u0628\u0627\u064A\u0644)"]},{type:"warning",text:"\u0627\u0628\u0642\u0650 \u0627\u0644\u0640 terminal \u0645\u0641\u062A\u0648\u062D\u0627\u064B \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0637\u0648\u064A\u0631. ng serve \u064A\u0631\u0627\u0642\u0628 \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0648\u064A\u0639\u064A\u062F \u0627\u0644\u062A\u062C\u0645\u064A\u0639 \u0639\u0646\u062F \u0643\u0644 \u062D\u0641\u0638. \u0627\u0636\u063A\u0637 Ctrl+C \u0644\u0644\u0625\u064A\u0642\u0627\u0641."},{type:"heading",text:"\u0625\u0636\u0627\u0641\u0627\u062A VS Code \u0627\u0644\u0645\u0648\u0635\u0649 \u0628\u0647\u0627"},{type:"list",items:["Angular Language Service (\u0628\u0648\u0627\u0633\u0637\u0629 Angular) \u2014 \u0627\u0644\u0623\u0647\u0645: \u062A\u0643\u0645\u0644\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0629 \u0648\u0643\u0634\u0641 \u0623\u062E\u0637\u0627\u0621 \u0641\u064A \u0627\u0644\u0642\u0648\u0627\u0644\u0628","Angular Snippets (\u0628\u0648\u0627\u0633\u0637\u0629 John Papa) \u2014 snippets \u0633\u0631\u064A\u0639\u0629","ESLint (\u0628\u0648\u0627\u0633\u0637\u0629 Microsoft) \u2014 \u064A\u064F\u0639\u062F\u0651\u0647\u0627 Angular CLI \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B","Prettier \u2014 \u062A\u0646\u0633\u064A\u0642 \u0627\u0644\u0643\u0648\u062F","EditorConfig \u2014 \u062B\u0628\u0627\u062A \u0627\u0644\u0645\u0633\u0627\u0641\u0627\u062A \u0627\u0644\u0628\u0627\u062F\u0626\u0629","Angular DevTools (Chrome Extension) \u2014 \u064A\u0639\u0631\u0636 Signal graph \u0648\u0634\u062C\u0631\u0629 Components"]},{type:"tip",text:'\u062B\u0628\u0651\u062A Angular DevTools \u0643\u0640 Chrome Extension (\u0645\u0634 VS Code). \u0633\u062A\u062C\u062F \u062A\u0628\u0648\u064A\u0628 "Angular" \u0641\u064A Chrome DevTools \u064A\u0639\u0631\u0636 \u0644\u0643 Signal dependencies \u0628\u0634\u0643\u0644 \u0645\u0631\u0626\u064A.'},{type:"heading",text:"\u0625\u0639\u062F\u0627\u062F Angular MCP Server \u0648AI Skills"},{type:"paragraph",text:"Angular MCP Server \u0647\u0648 \u0623\u062F\u0627\u0629 \u0627\u062E\u062A\u064A\u0627\u0631\u064A\u0629 \u062A\u062A\u064A\u062D \u0644\u0645\u0633\u0627\u0639\u062F\u064A \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A (\u0645\u062B\u0644 Claude) \u0641\u0647\u0645 \u0645\u0634\u0631\u0648\u0639\u0643 Angular \u0628\u0634\u0643\u0644 \u062D\u0642\u064A\u0642\u064A \u2014 \u062A\u0648\u0644\u064A\u062F \u0645\u0643\u0648\u0646\u0627\u062A\u060C \u0634\u0631\u062D \u0623\u062E\u0637\u0627\u0621\u060C \u0648\u0627\u0644\u062A\u0639\u0627\u0645\u0644 \u0645\u0639 Signal graph."},{type:"code",code:`# \u062A\u062B\u0628\u064A\u062A Angular MCP Server
npm install -g @angular/mcp@latest`},{type:"code",code:`// .claude/mcp.json \u2014 \u0625\u0636\u0627\u0641\u062A\u0647 \u0644\u0645\u0634\u0631\u0648\u0639\u0643
{
  "mcpServers": {
    "angular": {
      "command": "ng-mcp",
      "args": ["--project", "."]
    }
  }
}`},{type:"code",code:`# Angular AI Skills
ng ai skills list          # \u0639\u0631\u0636 \u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u062A\u0627\u062D\u0629
ng ai skills add --all     # \u0625\u0636\u0627\u0641\u0629 \u0643\u0644 \u0645\u0647\u0627\u0631\u0627\u062A Angular`},{type:"tip",text:"\u0645\u0639 MCP Server \u0645\u0634\u063A\u0651\u0644\u060C \u064A\u0633\u062A\u0637\u064A\u0639 Claude \u062A\u0648\u0644\u064A\u062F \u0643\u0648\u062F Angular v22 \u0635\u062D\u064A\u062D \u0648\u0645\u062A\u0648\u0627\u0641\u0642 \u0645\u0639 conventions \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0645\u0646 \u0623\u0648\u0644 \u0645\u062D\u0627\u0648\u0644\u0629."},{type:"qa",question:"\u0645\u0627 \u0647\u0648 \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649 \u0644\u0625\u0635\u062F\u0627\u0631 Node.js \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u0644\u0640 Angular v22\u060C \u0648\u0644\u0645\u0627\u0630\u0627 \u0644\u0645 \u064A\u0639\u062F v20 \u0645\u062F\u0639\u0648\u0645\u0627\u064B\u061F",answer:"Node.js v22 \u0623\u0648 \u0623\u062D\u062F\u062B \u0645\u0637\u0644\u0648\u0628. \u062A\u0645 \u0625\u0633\u0642\u0627\u0637 \u062F\u0639\u0645 v20 \u0644\u0623\u0646\u0647 \u0648\u0635\u0644 \u0625\u0644\u0649 \u0646\u0647\u0627\u064A\u0629 \u0639\u0645\u0631\u0647 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A (End of Life) \u0648\u0644\u0645 \u064A\u0639\u062F \u064A\u062A\u0644\u0642\u0649 \u062A\u062D\u062F\u064A\u062B\u0627\u062A \u0623\u0645\u0646\u064A\u0629."},{type:"qa",question:"\u0645\u0627 \u0627\u0644\u0641\u0631\u0642 \u0628\u064A\u0646 ng serve \u0648 ng build\u061F",answer:"ng serve \u064A\u0634\u063A\u0651\u0644 \u062E\u0627\u062F\u0645 \u062A\u0637\u0648\u064A\u0631 \u0645\u062D\u0644\u064A \u0645\u0639 HMR \u0648\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u2014 \u0644\u0644\u062A\u0637\u0648\u064A\u0631 \u0641\u0642\u0637. ng build \u064A\u064F\u0646\u062A\u062C \u0645\u0644\u0641\u0627\u062A \u0645\u062D\u0633\u0651\u0646\u0629 \u062C\u0627\u0647\u0632\u0629 \u0644\u0644\u0640 production \u0641\u064A \u0645\u062C\u0644\u062F dist/ \u2014 \u0644\u0627 \u064A\u0634\u063A\u0651\u0644 \u062E\u0627\u062F\u0645\u0627\u064B."}],contentEn:[{type:"heading",text:"Installing Node.js (v22+ Required)"},{type:"paragraph",text:"Angular v22 requires Node.js v22 or higher. Node v20 reached end-of-life and is no longer supported by the Angular CLI. Check your version before starting."},{type:"code",code:`node -v
# Must print v22.x.x or higher

npm -v
# Must print 10.x.x or higher`},{type:"tip",text:"If you work on multiple Node projects, use nvm (Node Version Manager) \u2014 it lets you switch versions with a single command."},{type:"code",code:`# Install Node v22 via nvm
nvm install 22
nvm use 22
node -v   # v22.x.x \u2713`},{type:"heading",text:"TypeScript v6 Requirement"},{type:"paragraph",text:"Angular v22 ships TypeScript v6 as a peer dependency. You don't install it manually \u2014 the Angular CLI installs the correct version automatically when you create a project."},{type:"warning",text:"Never install TypeScript globally for Angular projects. Let the CLI manage it inside node_modules to avoid version conflicts."},{type:"code",code:`# Check TypeScript version inside the project (after creation)
npx tsc -v
# Version 6.x.x`},{type:"heading",text:"Installing Angular CLI"},{type:"paragraph",text:"The Angular CLI (ng) is the command-line tool for everything: creating projects, generating components, running the dev server, and building for production."},{type:"code",code:`# Install CLI globally
npm install -g @angular/cli@latest

# Verify installation
ng version`},{type:"tip",text:"If you have an older CLI, uninstall it first: npm uninstall -g @angular/cli, then reinstall."},{type:"heading",text:"Creating a New Angular v22 Project"},{type:"paragraph",text:"One command scaffolds a complete project with all configuration."},{type:"code",code:`ng new my-angular-app

# CLI will ask:
# ? Which stylesheet format? \u2192 CSS
# ? Enable Server-Side Rendering? \u2192 No

cd my-angular-app
code .`},{type:"tip",text:"Angular v22 projects are Zoneless by default and use Standalone Components \u2014 no NgModule, no zone.js. This is the modern Angular way."},{type:"heading",text:"Understanding Angular Workspace"},{type:"paragraph",text:"The workspace is the root folder created by ng new. It holds angular.json (build config), package.json (dependencies), and the base TypeScript config."},{type:"code",code:`my-angular-app/
\u251C\u2500\u2500 angular.json      \u2190 workspace configuration
\u251C\u2500\u2500 package.json      \u2190 npm dependencies
\u251C\u2500\u2500 tsconfig.json     \u2190 TypeScript base config
\u2514\u2500\u2500 src/              \u2190 the actual application code`},{type:"warning",text:"Don't edit angular.json manually until you understand each field. Use ng generate and ng config commands instead."},{type:"heading",text:"Project Folder Structure"},{type:"code",code:`src/
\u251C\u2500\u2500 app/
\u2502   \u251C\u2500\u2500 app.ts           \u2190 Root Component (TypeScript class)
\u2502   \u251C\u2500\u2500 app.html         \u2190 Root component template
\u2502   \u251C\u2500\u2500 app.css          \u2190 Root component styles
\u2502   \u2514\u2500\u2500 app.config.ts    \u2190 App-wide providers (Router, HTTP\u2026)
\u251C\u2500\u2500 index.html           \u2190 Single HTML entry point
\u251C\u2500\u2500 main.ts              \u2190 Bootstrap \u2014 calls bootstrapApplication()
\u2514\u2500\u2500 styles.css           \u2190 Global styles`},{type:"code",code:`// main.ts \u2014 app entry point
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig);`},{type:"code",code:`// app.config.ts \u2014 app-wide providers
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ]
};`},{type:"code",code:`// app.ts \u2014 root component
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'my-angular-app';
}`},{type:"tip",text:"Notice: no NgModule anywhere. Angular v22 is fully standalone-first."},{type:"heading",text:"Running the Development Server"},{type:"code",code:`ng serve

# \u2714 Compiled successfully in 312ms
# \u279C Local:  http://localhost:4200/`},{type:"paragraph",text:"Angular CLI uses esbuild under the hood (since v17). HMR (Hot Module Replacement) is enabled by default \u2014 the browser updates in milliseconds without a full page reload."},{type:"list",items:["ng serve --open \u2192 opens browser automatically","ng serve --port 3000 \u2192 change the port","ng serve --host 0.0.0.0 \u2192 expose on local network for mobile testing"]},{type:"warning",text:"Keep the terminal open while developing. ng serve watches files and recompiles on every save. Press Ctrl+C to stop."},{type:"heading",text:"Recommended VS Code Extensions"},{type:"list",items:["Angular Language Service (by Angular) \u2014 most important: autocomplete and error detection in templates","Angular Snippets (by John Papa) \u2014 fast code snippets","ESLint (by Microsoft) \u2014 Angular CLI configures this automatically","Prettier \u2014 code formatting","EditorConfig \u2014 consistent indentation","Angular DevTools (Chrome Extension) \u2014 inspect Signal graph and component tree"]},{type:"tip",text:'Install Angular DevTools as a Chrome Extension (not VS Code). It adds an "Angular" tab in Chrome DevTools showing your live Signal dependency graph.'},{type:"heading",text:"Setting Up the Angular MCP Server and AI Skills"},{type:"paragraph",text:"The Angular MCP Server is an optional tool that lets AI assistants (like Claude) understand your Angular project in real time \u2014 generating components, explaining errors, and reasoning about your Signal graph."},{type:"code",code:`# Install Angular MCP Server
npm install -g @angular/mcp@latest`},{type:"code",code:`// .claude/mcp.json \u2014 add to your project root
{
  "mcpServers": {
    "angular": {
      "command": "ng-mcp",
      "args": ["--project", "."]
    }
  }
}`},{type:"code",code:`# Angular AI Skills
ng ai skills list          # list available skills
ng ai skills add --all     # add all Angular skills`},{type:"tip",text:"With the MCP Server running, Claude generates correct, idiomatic Angular v22 code on the first try \u2014 it knows your component names, services, and routes."},{type:"qa",question:"What is the minimum Node.js version required for Angular v22, and why was v20 dropped?",answer:"Node.js v22 or higher is required. v20 was dropped because it reached End of Life \u2014 it no longer receives security updates, making it unsafe to build on."},{type:"qa",question:"What is the difference between ng serve and ng build?",answer:"ng serve starts a local development server with HMR and file watching \u2014 for development only. ng build produces optimized production-ready files in the dist/ folder \u2014 it does not start a server."}]};export{e as default};
