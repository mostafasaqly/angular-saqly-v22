import"./chunk-JS3ZFT6L.js";var e={id:19,title:"SSR \u0648\u0627\u0644\u0640 Hydration",titleEn:"SSR and Hydration",level:"\u0645\u062A\u0642\u062F\u0645",levelEn:"Advanced",intro:"Server-Side Rendering (SSR) \u064A\u064F\u0648\u0644\u0651\u062F HTML \u0639\u0644\u0649 \u0627\u0644\u062E\u0627\u062F\u0645 \u0644\u062A\u0633\u0631\u064A\u0639 \u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0648\u0644 \u0648\u062A\u062D\u0633\u064A\u0646 SEO. Angular v22 \u064A\u062F\u0639\u0645 SSR \u0645\u0639 Hydration \u062A\u0644\u0642\u0627\u0626\u064A\u0629 \u0648Incremental Hydration \u0644\u0625\u062D\u064A\u0627\u0621 \u0623\u062C\u0632\u0627\u0621 \u0627\u0644\u0635\u0641\u062D\u0629 \u0628\u0634\u0643\u0644 \u062A\u062F\u0631\u064A\u062C\u064A.",introEn:"Server-Side Rendering (SSR) generates HTML on the server to speed up the first paint and improve SEO. Angular v22 supports SSR with automatic Hydration and Incremental Hydration to progressively bring page sections to life.",lessons:["\u0645\u0627 \u0647\u0648 SSR \u0648\u0644\u0645\u0627\u0630\u0627 \u0646\u0633\u062A\u062E\u062F\u0645\u0647\u061F","\u0625\u0639\u062F\u0627\u062F SSR \u0641\u064A Angular v22","Hydration \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A\u0629","Incremental Hydration \u0645\u0639 @defer","\u0627\u0644\u0641\u0631\u0642 \u0628\u064A\u0646 \u0628\u064A\u0626\u0629 \u0627\u0644\u062E\u0627\u062F\u0645 \u0648\u0627\u0644\u0645\u062A\u0635\u0641\u062D","isPlatformBrowser \u0648isPlatformServer","Static Site Generation (SSG/Prerendering)","\u0623\u062E\u0637\u0627\u0621 SSR \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0648\u062D\u0644\u0648\u0644\u0647\u0627"],lessonsEn:["What is SSR and Why Use It?","SSR Setup in Angular v22","Automatic Hydration","Incremental Hydration with @defer","Server vs Browser Environment","isPlatformBrowser and isPlatformServer","Static Site Generation (SSG/Prerendering)","Common SSR Errors and Fixes"],content:[{type:"heading",text:"\u0645\u0627 \u0647\u0648 SSR \u0648\u0644\u0645\u0627\u0630\u0627 \u0646\u0633\u062A\u062E\u062F\u0645\u0647\u061F"},{type:"list",items:["CSR (\u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A): \u0627\u0644\u0645\u062A\u0635\u0641\u062D \u064A\u064F\u062D\u0645\u0651\u0644 JavaScript \u062B\u0645 \u064A\u064F\u0648\u0644\u0651\u062F HTML \u2014 \u0628\u0637\u064A\u0621 \u0641\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0648\u0644","SSR: \u0627\u0644\u062E\u0627\u062F\u0645 \u064A\u064F\u0648\u0644\u0651\u062F HTML \u0643\u0627\u0645\u0644 \u0648\u064A\u064F\u0631\u0633\u0644\u0647 \u2014 \u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0648\u0644 \u0623\u0633\u0631\u0639 \u0628\u0643\u062B\u064A\u0631","SEO: \u0645\u062D\u0631\u0643\u0627\u062A \u0627\u0644\u0628\u062D\u062B \u062A\u064F\u0641\u0647\u0631\u0633 \u0645\u062D\u062A\u0648\u0649 HTML \u0645\u0628\u0627\u0634\u0631\u0629\u064B \u062F\u0648\u0646 \u062A\u0634\u063A\u064A\u0644 JavaScript","Core Web Vitals: LCP (\u0623\u0643\u0628\u0631 \u0645\u062D\u062A\u0648\u0649 \u0645\u0631\u0626\u064A) \u064A\u062A\u062D\u0633\u0646 \u0628\u0634\u0643\u0644 \u0645\u0644\u062D\u0648\u0638 \u0645\u0639 SSR","Hydration: \u0628\u0639\u062F \u062A\u062D\u0645\u064A\u0644 HTML\u060C Angular \u064A\u064F\u062D\u064A\u064A \u0627\u0644\u062A\u0637\u0628\u064A\u0642 \u0648\u064A\u064F\u0636\u064A\u0641 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629"]},{type:"heading",text:"\u0625\u0639\u062F\u0627\u062F SSR \u0641\u064A Angular v22"},{type:"code",code:`# \u0625\u0636\u0627\u0641\u0629 SSR \u0644\u0645\u0634\u0631\u0648\u0639 \u0645\u0648\u062C\u0648\u062F
ng add @angular/ssr

# \u0623\u0648 \u0639\u0646\u062F \u0625\u0646\u0634\u0627\u0621 \u0645\u0634\u0631\u0648\u0639 \u062C\u062F\u064A\u062F
ng new my-app --ssr

# \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0627\u0644\u062A\u064A \u062A\u064F\u0646\u0634\u0623:
# - server.ts          \u0627\u0644\u062E\u0627\u062F\u0645 Express
# - app.config.server.ts  \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u062C\u0627\u0646\u0628 \u0627\u0644\u062E\u0627\u062F\u0645

# \u062A\u0634\u063A\u064A\u0644 \u0641\u064A \u0648\u0636\u0639 \u0627\u0644\u062A\u0637\u0648\u064A\u0631 \u0645\u0639 SSR
ng serve --ssr

# \u0628\u0646\u0627\u0621 \u0644\u0644\u0625\u0646\u062A\u0627\u062C
ng build
node dist/my-app/server/server.mjs`},{type:"code",code:`// app.config.ts \u2014 \u0627\u0644\u0639\u0645\u064A\u0644
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(
      withEventReplay() // \u064A\u064F\u0639\u064A\u062F \u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u0623\u062D\u062F\u0627\u062B \u0627\u0644\u062A\u064A \u062D\u062F\u062B\u062A \u0642\u0628\u0644 Hydration
    ),
  ]
};

// app.config.server.ts \u2014 \u0627\u0644\u062E\u0627\u062F\u0645
import { mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);`},{type:"heading",text:"Incremental Hydration \u0645\u0639 @defer"},{type:"code",code:`// app.config.ts \u2014 \u062A\u0641\u0639\u064A\u0644 Incremental Hydration
import { withIncrementalHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(
      withIncrementalHydration()
    ),
  ]
};

// \u0641\u064A \u0627\u0644\u0642\u0627\u0644\u0628 \u2014 \u0627\u0644\u062C\u0645\u0639 \u0628\u064A\u0646 @defer \u0648hydrate
@defer (on viewport; hydrate on interaction) {
  <app-product-gallery [products]="products()" />
} @placeholder {
  <div class="gallery-skeleton">...</div>
}
// \u0627\u0644\u062E\u0627\u062F\u0645 \u064A\u064F\u0648\u0644\u0651\u062F HTML
// \u0627\u0644\u0645\u062A\u0635\u0641\u062D \u064A\u064F\u062D\u064A\u064A \u0641\u0642\u0637 \u0639\u0646\u062F \u062A\u0641\u0627\u0639\u0644 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u2192 Performance \u0623\u0641\u0636\u0644`},{type:"heading",text:"\u0627\u0644\u0641\u0631\u0642 \u0628\u064A\u0646 \u0628\u064A\u0626\u0629 \u0627\u0644\u062E\u0627\u062F\u0645 \u0648\u0627\u0644\u0645\u062A\u0635\u0641\u062D"},{type:"warning",text:"\u0641\u064A SSR\u060C \u0627\u0644\u0643\u0648\u062F \u064A\u064F\u0634\u063A\u064E\u0651\u0644 \u0623\u0648\u0644\u0627\u064B \u0639\u0644\u0649 \u0627\u0644\u062E\u0627\u062F\u0645. \u0644\u0627 \u064A\u0648\u062C\u062F window\u060C document\u060C localStorage\u060C \u0623\u0648 \u0623\u064A APIs \u0645\u062A\u0635\u0641\u062D \u0639\u0644\u0649 \u0627\u0644\u062E\u0627\u062F\u0645. \u0648\u0635\u0648\u0644\u0643 \u0625\u0644\u064A\u0647\u0627 \u0645\u0628\u0627\u0634\u0631\u0629\u064B \u0633\u064A\u064F\u0633\u0628\u0628 \u062E\u0637\u0623."},{type:"code",code:`import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private platformId = inject(PLATFORM_ID);

  getStoredTheme(): string {
    // \u062A\u062D\u0642\u0642 \u0623\u0648\u0644\u0627\u064B \u0645\u0646 \u0627\u0644\u0628\u064A\u0626\u0629
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('theme') ?? 'light';
    }
    return 'light'; // \u0642\u064A\u0645\u0629 \u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0644\u0644\u062E\u0627\u062F\u0645
  }

  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

// \u0628\u062F\u064A\u0644 \u0623\u0628\u0633\u0637 \u2014 afterRender \u0648afterNextRender
import { afterNextRender } from '@angular/core';

export class HeroComponent {
  constructor() {
    afterNextRender(() => {
      // \u0647\u0630\u0627 \u064A\u064F\u0634\u063A\u064E\u0651\u0644 \u0641\u0642\u0637 \u0641\u064A \u0627\u0644\u0645\u062A\u0635\u0641\u062D \u0628\u0639\u062F \u0627\u0644\u0640 render
      console.log(window.innerWidth);
    });
  }
}`},{type:"heading",text:"Static Site Generation (SSG)"},{type:"code",code:`// angular.json \u2014 prerender configuration
{
  "prerender": {
    "discoverRoutes": true,
    "routesFile": "routes.txt"
  }
}

// routes.txt \u2014 \u0635\u0641\u062D\u0627\u062A \u062B\u0627\u0628\u062A\u0629 \u0644\u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0633\u0628\u0642\u0629
/
/about
/blog/post-1
/blog/post-2

// \u0628\u0646\u0627\u0621 SSG
ng build --prerender

// \u0627\u0644\u0646\u062A\u064A\u062C\u0629: \u0645\u0644\u0641\u0627\u062A HTML \u062C\u0627\u0647\u0632\u0629 \u0644\u0643\u0644 \u0645\u0633\u0627\u0631
// dist/my-app/browser/
//   index.html
//   about/index.html
//   blog/post-1/index.html`},{type:"qa",question:"\u0645\u0627 \u0627\u0644\u0641\u0631\u0642 \u0628\u064A\u0646 SSR \u0648SSG \u0648CSR\u061F",answer:"CSR: HTML \u064A\u064F\u0648\u0644\u064E\u0651\u062F \u0641\u064A \u0627\u0644\u0645\u062A\u0635\u0641\u062D \u0639\u0628\u0631 JavaScript \u2014 \u0628\u0637\u064A\u0621 \u0641\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0648\u0644\u060C \u0636\u0639\u064A\u0641 \u0641\u064A SEO. SSR: HTML \u064A\u064F\u0648\u0644\u064E\u0651\u062F \u0639\u0644\u0649 \u0627\u0644\u062E\u0627\u062F\u0645 \u0639\u0646\u062F \u0643\u0644 \u0637\u0644\u0628 \u2014 \u0633\u0631\u064A\u0639\u060C \u062C\u064A\u062F \u0644\u0640 SEO\u060C \u064A\u062D\u062A\u0627\u062C \u062E\u0627\u062F\u0645 Node. SSG: HTML \u064A\u064F\u0648\u0644\u064E\u0651\u062F \u0645\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 \u0639\u0646\u062F \u0627\u0644\u0628\u0646\u0627\u0621 \u0648\u064A\u064F\u062E\u062F\u064E\u0651\u0645 \u0643\u0645\u0644\u0641\u0627\u062A \u062B\u0627\u0628\u062A\u0629 \u2014 \u0627\u0644\u0623\u0633\u0631\u0639\u060C \u0645\u062B\u0627\u0644\u064A \u0644\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062B\u0627\u0628\u062A \u0643\u0627\u0644\u0645\u062F\u0648\u0646\u0627\u062A."},{type:"qa",question:"\u0645\u0627 \u0647\u0648 Hydration \u0641\u064A Angular \u0648\u0643\u064A\u0641 \u064A\u0639\u0645\u0644\u061F",answer:"Hydration \u0647\u0648 \u0639\u0645\u0644\u064A\u0629 \u0625\u062D\u064A\u0627\u0621 HTML \u0627\u0644\u062B\u0627\u0628\u062A \u0627\u0644\u0642\u0627\u062F\u0645 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645. Angular v22 \u064A\u0641\u0639\u0644 \u0647\u0630\u0627 \u0628\u062F\u0648\u0646 \u0645\u0633\u062D DOM \u0648\u0625\u0639\u0627\u062F\u0629 \u0628\u0646\u0627\u0626\u0647 \u2014 \u0628\u0644 \u064A\u064F\u0648\u0635\u0651\u0644 event listeners \u0639\u0644\u0649 \u0627\u0644\u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u0645\u0648\u062C\u0648\u062F\u0629 \u0641\u0639\u0644\u0627\u064B. \u0627\u0644\u0646\u062A\u064A\u062C\u0629: \u0644\u0627 \u0648\u0645\u064A\u0636 (flash) \u0648\u0644\u0627 \u0625\u0639\u0627\u062F\u0629 \u0631\u0633\u0645 \u2014 \u062A\u062C\u0631\u0628\u0629 \u0645\u0633\u062A\u062E\u062F\u0645 \u0623\u0641\u0636\u0644 \u0628\u0643\u062B\u064A\u0631."}],contentEn:[{type:"heading",text:"What is SSR and Why Use It?"},{type:"list",items:["CSR (default): browser loads JavaScript then generates HTML \u2014 slow first paint","SSR: server generates complete HTML and sends it \u2014 much faster first paint","SEO: search engines can index HTML content directly without running JavaScript","Core Web Vitals: LCP (Largest Contentful Paint) improves significantly with SSR","Hydration: after the HTML loads, Angular brings the app to life and adds interactivity"]},{type:"heading",text:"SSR Setup in Angular v22"},{type:"code",code:`# Add SSR to an existing project
ng add @angular/ssr

# Or when creating a new project
ng new my-app --ssr

# Files created:
# - server.ts             Express server
# - app.config.server.ts  Server-side configuration

# Run in development with SSR
ng serve --ssr

# Build for production
ng build
node dist/my-app/server/server.mjs`},{type:"code",code:`// app.config.ts \u2014 client
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(
      withEventReplay() // replays events that fired before hydration
    ),
  ]
};

// app.config.server.ts \u2014 server
import { mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);`},{type:"heading",text:"Incremental Hydration with @defer"},{type:"code",code:`// app.config.ts \u2014 enable Incremental Hydration
import { withIncrementalHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(
      withIncrementalHydration()
    ),
  ]
};

// In template \u2014 combine @defer with hydrate trigger
@defer (on viewport; hydrate on interaction) {
  <app-product-gallery [products]="products()" />
} @placeholder {
  <div class="gallery-skeleton">...</div>
}
// Server generates HTML
// Browser only hydrates on user interaction \u2192 better performance`},{type:"heading",text:"Server vs Browser Environment"},{type:"warning",text:"With SSR, code runs on the server first. There is no window, document, localStorage, or any browser APIs on the server. Accessing them directly will throw an error."},{type:"code",code:`import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private platformId = inject(PLATFORM_ID);

  getStoredTheme(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('theme') ?? 'light';
    }
    return 'light'; // default for server
  }

  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

// Simpler alternative \u2014 afterNextRender
import { afterNextRender } from '@angular/core';

export class HeroComponent {
  constructor() {
    afterNextRender(() => {
      // only runs in the browser after rendering
      console.log(window.innerWidth);
    });
  }
}`},{type:"heading",text:"Static Site Generation (SSG)"},{type:"code",code:`// angular.json \u2014 prerender configuration
{
  "prerender": {
    "discoverRoutes": true,
    "routesFile": "routes.txt"
  }
}

// routes.txt \u2014 static pages to prerender
/
/about
/blog/post-1
/blog/post-2

// Build SSG
ng build --prerender

// Output: ready HTML files for each route
// dist/my-app/browser/
//   index.html
//   about/index.html
//   blog/post-1/index.html`},{type:"qa",question:"What is the difference between SSR, SSG, and CSR?",answer:"CSR: HTML generated in the browser via JavaScript \u2014 slow first paint, weak SEO. SSR: HTML generated on the server per request \u2014 fast, good SEO, requires a Node server. SSG: HTML generated once at build time and served as static files \u2014 fastest, ideal for static content like blogs."},{type:"qa",question:"What is Hydration in Angular and how does it work?",answer:"Hydration is the process of bringing static HTML from the server to life. Angular v22 does this without wiping the DOM and rebuilding it \u2014 instead it attaches event listeners to existing elements. Result: no flash, no repaint \u2014 much better user experience."}]};export{e as default};
