import"./chunk-JS3ZFT6L.js";var e={id:24,title:"\u0627\u0644\u0646\u0634\u0631 \u0648\u0627\u0644\u0625\u0637\u0644\u0627\u0642",titleEn:"Deployment",level:"\u0645\u062A\u0648\u0633\u0637",levelEn:"Intermediate",intro:"\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u064A\u063A\u0637\u064A \u0646\u0634\u0631 \u062A\u0637\u0628\u064A\u0642\u0627\u062A Angular \u0639\u0644\u0649 \u0627\u0644\u0627\u0633\u062A\u0636\u0627\u0641\u0627\u062A \u0627\u0644\u0645\u062E\u062A\u0644\u0641\u0629: Firebase Hosting\u060C Vercel\u060C Netlify\u060C \u0648VPS. \u064A\u0634\u0645\u0644 \u0623\u064A\u0636\u0627\u064B \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u0628\u064A\u0626\u0627\u062A\u060C \u0625\u0639\u062F\u0627\u062F CI/CD\u060C \u0648\u0627\u0644\u0645\u062A\u063A\u064A\u0631\u0627\u062A \u0627\u0644\u0628\u064A\u0626\u064A\u0629.",introEn:"This section covers deploying Angular applications to various hosting platforms: Firebase Hosting, Vercel, Netlify, and VPS. It also covers environment configuration, CI/CD setup, and environment variables.",lessons:["\u0628\u0646\u0627\u0621 \u0627\u0644\u062A\u0637\u0628\u064A\u0642 \u0644\u0644\u0625\u0646\u062A\u0627\u062C","\u0627\u0644\u0645\u062A\u063A\u064A\u0631\u0627\u062A \u0627\u0644\u0628\u064A\u0626\u064A\u0629 \u0641\u064A Angular","\u0627\u0644\u0646\u0634\u0631 \u0639\u0644\u0649 Firebase Hosting","\u0627\u0644\u0646\u0634\u0631 \u0639\u0644\u0649 Netlify","\u0646\u0634\u0631 SSR \u0639\u0644\u0649 VPS (Node.js)","\u0625\u0639\u062F\u0627\u062F CI/CD \u0645\u0639 GitHub Actions","\u0642\u0627\u0626\u0645\u0629 \u0641\u062D\u0635 \u0645\u0627 \u0642\u0628\u0644 \u0627\u0644\u0625\u0637\u0644\u0627\u0642"],lessonsEn:["Building for Production","Environment Variables in Angular","Deploy to Firebase Hosting","Deploy to Netlify","Deploy SSR to VPS (Node.js)","CI/CD with GitHub Actions","Pre-Launch Checklist"],content:[{type:"heading",text:"\u0628\u0646\u0627\u0621 \u0627\u0644\u062A\u0637\u0628\u064A\u0642 \u0644\u0644\u0625\u0646\u062A\u0627\u062C"},{type:"code",code:`# \u0628\u0646\u0627\u0621 \u0644\u0644\u0625\u0646\u062A\u0627\u062C \u2014 \u064A\u064F\u0636\u063A\u0651\u0637 \u0648\u064A\u064F\u062D\u0633\u0651\u0646 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B
ng build

# \u0623\u0648 \u0628\u0625\u0639\u062F\u0627\u062F \u0635\u0631\u064A\u062D
ng build --configuration production

# \u0645\u0627 \u064A\u0641\u0639\u0644\u0647 ng build production:
# \u2713 Tree shaking \u2014 \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0643\u0648\u062F \u063A\u064A\u0631 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645
# \u2713 Minification \u2014 \u0636\u063A\u0637 JS \u0648CSS \u0648HTML
# \u2713 Ahead-of-Time (AOT) compilation
# \u2713 Code splitting \u062A\u0644\u0642\u0627\u0626\u064A \u0644\u0644\u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0643\u0633\u0648\u0644\u0629
# \u2713 Hash \u0644\u0644\u0645\u0644\u0641\u0627\u062A \u0644\u0643\u0633\u0631 \u0627\u0644\u0640 cache

# \u0641\u062D\u0635 \u0627\u0644\u062D\u0632\u0645\u0629 \u0627\u0644\u0646\u0627\u062A\u062C\u0629
ls -lh dist/my-app/browser/

# \u062A\u0634\u063A\u064A\u0644 \u0645\u062D\u0644\u064A \u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0625\u0646\u062A\u0627\u062C
npx serve dist/my-app/browser`},{type:"heading",text:"\u0627\u0644\u0645\u062A\u063A\u064A\u0631\u0627\u062A \u0627\u0644\u0628\u064A\u0626\u064A\u0629 \u0641\u064A Angular"},{type:"code",code:`// src/environments/environment.ts (\u062A\u0637\u0648\u064A\u0631)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appVersion: '1.0.0',
};

// src/environments/environment.prod.ts (\u0625\u0646\u062A\u0627\u062C)
export const environment = {
  production: true,
  apiUrl: 'https://api.myapp.com',
  appVersion: '1.0.0',
};

// angular.json \u2014 \u0631\u0628\u0637 \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B
// fileReplacements \u062A\u064F\u0628\u062F\u0651\u0644 environment.ts \u0628\u0640 environment.prod.ts
// \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F ng build --configuration production

// \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0641\u064A \u0627\u0644\u0643\u0648\u062F
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiUrl; // \u064A\u062A\u063A\u064A\u0631 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0628\u064A\u0646 \u0627\u0644\u0628\u064A\u0626\u0627\u062A
}`},{type:"heading",text:"\u0627\u0644\u0646\u0634\u0631 \u0639\u0644\u0649 Firebase Hosting"},{type:"code",code:`# 1. \u062A\u062B\u0628\u064A\u062A Firebase CLI
npm install -g firebase-tools

# 2. \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644
firebase login

# 3. \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639
firebase init hosting
# \u0627\u062E\u062A\u0631: "dist/my-app/browser" \u0643\u0645\u062C\u0644\u062F \u0639\u0627\u0645
# \u0627\u062E\u062A\u0631: "No" \u0644\u0640 single-page app (\u0625\u0630\u0627 \u0643\u0646\u062A \u062A\u0633\u062A\u062E\u062F\u0645 SSR)
# \u0627\u062E\u062A\u0631: "Yes" \u0644\u0640 rewrite all URLs to index.html (\u0644\u0640 SPA)

# 4. \u0646\u0634\u0631
ng build && firebase deploy --only hosting

# 5. \u0646\u0634\u0631 \u062A\u0644\u0642\u0627\u0626\u064A \u0645\u0639 GitHub Actions:
# firebase hosting:channel:deploy preview  (\u0644\u0644\u0645\u0639\u0627\u064A\u0646\u0629)
# firebase deploy --only hosting           (\u0644\u0644\u0625\u0646\u062A\u0627\u062C)

# \u0646\u062A\u064A\u062C\u0629: \u0631\u0627\u0628\u0637 \u0645\u062C\u0627\u0646\u064A https://your-app.web.app`},{type:"heading",text:"\u0625\u0639\u062F\u0627\u062F CI/CD \u0645\u0639 GitHub Actions"},{type:"code",code:`# .github/workflows/deploy.yml
name: Deploy Angular

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test -- --watch=false --browsers=ChromeHeadless

      - name: Build
        run: npm run build
        env:
          API_URL: \${{ secrets.API_URL }}

      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: \${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: \${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          channelId: live
          projectId: my-angular-app`},{type:"heading",text:"\u0642\u0627\u0626\u0645\u0629 \u0641\u062D\u0635 \u0645\u0627 \u0642\u0628\u0644 \u0627\u0644\u0625\u0637\u0644\u0627\u0642"},{type:"list",items:["\u2705 ng build --configuration production \u064A\u064F\u0646\u062C\u062D \u062F\u0648\u0646 \u0623\u062E\u0637\u0627\u0621","\u2705 \u062C\u0645\u064A\u0639 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u062A\u0646\u062C\u062D (npm test)","\u2705 environment.prod.ts \u064A\u062D\u062A\u0648\u064A \u0627\u0644\u0631\u0648\u0627\u0628\u0637 \u0627\u0644\u0635\u062D\u064A\u062D\u0629 \u0644\u0644\u0640 API","\u2705 \u0644\u0627 \u062A\u0648\u062C\u062F console.log \u0623\u0648 debugger \u0641\u064A \u0627\u0644\u0643\u0648\u062F","\u2705 error interceptor \u064A\u064F\u0639\u0627\u0644\u062C \u062D\u0627\u0644\u0627\u062A 401 \u0648403 \u0648500","\u2705 NgOptimizedImage \u0644\u0644\u0635\u0648\u0631 \u0627\u0644\u0643\u0628\u064A\u0631\u0629","\u2705 Lazy Loading \u0644\u0644\u0645\u0633\u0627\u0631\u0627\u062A","\u2705 robots.txt \u0648sitemap.xml (\u0644\u0640 SEO)","\u2705 meta tags (title\u060C description) \u0644\u0643\u0644 \u0635\u0641\u062D\u0629","\u2705 HTTPS (\u0627\u0644\u0627\u0633\u062A\u0636\u0627\u0641\u0629 \u062A\u064F\u0641\u0639\u0651\u0644\u0647 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0641\u064A \u0645\u0639\u0638\u0645\u0647\u0627)"]},{type:"qa",question:"\u0644\u0645\u0627\u0630\u0627 \u0646\u0633\u062A\u062E\u062F\u0645 ng build \u0628\u062F\u0644\u0627\u064B \u0645\u0646 ng build --prod \u0641\u064A Angular v15+\u061F",answer:"\u0645\u0646\u0630 Angular v15\u060C \u0623\u0635\u0628\u062D --configuration production \u0647\u0648 \u0627\u0644\u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0644\u0640 ng build. \u0627\u0644\u0640 flag \u0627\u0644\u0642\u062F\u064A\u0645 --prod \u0644\u0627 \u064A\u0632\u0627\u0644 \u064A\u0639\u0645\u0644 \u0643\u0627\u062E\u062A\u0635\u0627\u0631 \u0644\u0643\u0646 \u0627\u0644\u0645\u0648\u0635\u0649 \u0628\u0647 \u0647\u0648 ng build (\u0628\u062F\u0648\u0646 flag) \u0644\u0623\u0646 angular.json \u064A\u064F\u0636\u0628\u0637 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0644\u0625\u0646\u062A\u0627\u062C optimized build."},{type:"qa",question:"\u0645\u0627 \u0627\u0644\u0641\u0631\u0642 \u0628\u064A\u0646 Firebase Hosting \u0648Vercel \u0648Netlify\u061F",answer:"Firebase Hosting: \u0645\u0646 Google\u060C \u0645\u062C\u0627\u0646\u064A \u0644\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0627\u0644\u0635\u063A\u064A\u0631\u0629\u060C \u064A\u062A\u0643\u0627\u0645\u0644 \u0645\u0639 Firebase Auth \u0648 Firestore. Vercel: \u0627\u0644\u0623\u0633\u0631\u0639 \u0641\u064A CI/CD\u060C \u0627\u0644\u0645\u0639\u0627\u064A\u0646\u0627\u062A \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A\u0629 \u0644\u0644\u0640 Pull Requests \u0645\u0645\u062A\u0627\u0632\u0629. Netlify: \u0645\u0634\u0627\u0628\u0647 \u0644\u0640 Vercel \u0645\u0639 \u0645\u064A\u0632\u0627\u062A forms \u0648functions \u0645\u062F\u0645\u062C\u0629. \u0627\u0644\u062B\u0644\u0627\u062B\u0629 \u0645\u062C\u0627\u0646\u064A\u0629 \u0644\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0627\u0644\u0635\u063A\u064A\u0631\u0629."}],contentEn:[{type:"heading",text:"Building for Production"},{type:"code",code:`# Build for production \u2014 automatically compresses and optimizes
ng build

# Or with an explicit configuration
ng build --configuration production

# What ng build production does:
# \u2713 Tree shaking \u2014 removes unused code
# \u2713 Minification \u2014 compresses JS, CSS, and HTML
# \u2713 Ahead-of-Time (AOT) compilation
# \u2713 Automatic code splitting for lazy routes
# \u2713 File hashing for cache busting

# Inspect the output bundle
ls -lh dist/my-app/browser/

# Run locally to test the production build
npx serve dist/my-app/browser`},{type:"heading",text:"Environment Variables in Angular"},{type:"code",code:`// src/environments/environment.ts (development)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
};

// src/environments/environment.prod.ts (production)
export const environment = {
  production: true,
  apiUrl: 'https://api.myapp.com',
};

// angular.json \u2014 auto file replacement
// fileReplacements swaps environment.ts for environment.prod.ts
// automatically when ng build --configuration production

// Usage in code
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiUrl; // changes automatically per environment
}`},{type:"heading",text:"Deploy to Firebase Hosting"},{type:"code",code:`# 1. Install Firebase CLI
npm install -g firebase-tools

# 2. Log in
firebase login

# 3. Initialize the project
firebase init hosting
# Choose: "dist/my-app/browser" as public directory
# Choose: "Yes" to rewrite all URLs to index.html (for SPA)

# 4. Deploy
ng build && firebase deploy --only hosting

# Result: free URL https://your-app.web.app`},{type:"heading",text:"CI/CD with GitHub Actions"},{type:"code",code:`# .github/workflows/deploy.yml
name: Deploy Angular

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test -- --watch=false --browsers=ChromeHeadless

      - name: Build
        run: npm run build

      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: \${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: \${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          channelId: live`},{type:"heading",text:"Pre-Launch Checklist"},{type:"list",items:["\u2705 ng build --configuration production succeeds with no errors","\u2705 All tests pass (npm test)","\u2705 environment.prod.ts has the correct API URLs","\u2705 No console.log or debugger in the code","\u2705 Error interceptor handles 401, 403, and 500","\u2705 NgOptimizedImage for large images","\u2705 Lazy Loading for routes","\u2705 robots.txt and sitemap.xml (for SEO)","\u2705 Meta tags (title, description) on every page","\u2705 HTTPS (most hosting platforms enable it automatically)"]},{type:"qa",question:"Why use ng build instead of ng build --prod in Angular v15+?",answer:"Since Angular v15, --configuration production is the default for ng build. The old --prod flag still works as a shortcut but the recommended command is simply ng build (no flag), since angular.json is already configured to produce an optimized production build."},{type:"qa",question:"What is the difference between Firebase Hosting, Vercel, and Netlify?",answer:"Firebase Hosting: from Google, free for small projects, integrates with Firebase Auth and Firestore. Vercel: fastest CI/CD, excellent automatic Pull Request previews. Netlify: similar to Vercel with built-in forms and functions. All three are free for small projects."}]};export{e as default};
