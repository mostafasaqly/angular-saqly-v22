// Section 24 — Deployment
export default {
  id: 24,
  title: 'النشر والإطلاق',
  titleEn: 'Deployment',
  level: 'متوسط',
  levelEn: 'Intermediate',
  intro: 'هذا القسم يغطي نشر تطبيقات Angular على الاستضافات المختلفة: Firebase Hosting، Vercel، Netlify، وVPS. يشمل أيضاً تهيئة البيئات، إعداد CI/CD، والمتغيرات البيئية.',
  introEn: 'This section covers deploying Angular applications to various hosting platforms: Firebase Hosting, Vercel, Netlify, and VPS. It also covers environment configuration, CI/CD setup, and environment variables.',

  lessons: [
    'بناء التطبيق للإنتاج',
    'المتغيرات البيئية في Angular',
    'النشر على Firebase Hosting',
    'النشر على Netlify',
    'نشر SSR على VPS (Node.js)',
    'إعداد CI/CD مع GitHub Actions',
    'قائمة فحص ما قبل الإطلاق',
  ],
  lessonsEn: [
    'Building for Production',
    'Environment Variables in Angular',
    'Deploy to Firebase Hosting',
    'Deploy to Netlify',
    'Deploy SSR to VPS (Node.js)',
    'CI/CD with GitHub Actions',
    'Pre-Launch Checklist',
  ],

  content: [
    { type: 'heading', text: 'بناء التطبيق للإنتاج' },
    {
      type: 'code',
      code: `# بناء للإنتاج — يُضغّط ويُحسّن تلقائياً
ng build

# أو بإعداد صريح
ng build --configuration production

# ما يفعله ng build production:
# ✓ Tree shaking — إزالة الكود غير المستخدم
# ✓ Minification — ضغط JS وCSS وHTML
# ✓ Ahead-of-Time (AOT) compilation
# ✓ Code splitting تلقائي للمسارات الكسولة
# ✓ Hash للملفات لكسر الـ cache

# فحص الحزمة الناتجة
ls -lh dist/my-app/browser/

# تشغيل محلي لاختبار الإنتاج
npx serve dist/my-app/browser`,
    },

    { type: 'heading', text: 'المتغيرات البيئية في Angular' },
    {
      type: 'code',
      code: `// src/environments/environment.ts (تطوير)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appVersion: '1.0.0',
};

// src/environments/environment.prod.ts (إنتاج)
export const environment = {
  production: true,
  apiUrl: 'https://api.myapp.com',
  appVersion: '1.0.0',
};

// angular.json — ربط الملفات تلقائياً
// fileReplacements تُبدّل environment.ts بـ environment.prod.ts
// تلقائياً عند ng build --configuration production

// الاستخدام في الكود
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiUrl; // يتغير تلقائياً بين البيئات
}`,
    },

    { type: 'heading', text: 'النشر على Firebase Hosting' },
    {
      type: 'code',
      code: `# 1. تثبيت Firebase CLI
npm install -g firebase-tools

# 2. تسجيل الدخول
firebase login

# 3. تهيئة المشروع
firebase init hosting
# اختر: "dist/my-app/browser" كمجلد عام
# اختر: "No" لـ single-page app (إذا كنت تستخدم SSR)
# اختر: "Yes" لـ rewrite all URLs to index.html (لـ SPA)

# 4. نشر
ng build && firebase deploy --only hosting

# 5. نشر تلقائي مع GitHub Actions:
# firebase hosting:channel:deploy preview  (للمعاينة)
# firebase deploy --only hosting           (للإنتاج)

# نتيجة: رابط مجاني https://your-app.web.app`,
    },

    { type: 'heading', text: 'إعداد CI/CD مع GitHub Actions' },
    {
      type: 'code',
      code: `# .github/workflows/deploy.yml
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
          projectId: my-angular-app`,
    },

    { type: 'heading', text: 'قائمة فحص ما قبل الإطلاق' },
    {
      type: 'list',
      items: [
        '✅ ng build --configuration production يُنجح دون أخطاء',
        '✅ جميع الاختبارات تنجح (npm test)',
        '✅ environment.prod.ts يحتوي الروابط الصحيحة للـ API',
        '✅ لا توجد console.log أو debugger في الكود',
        '✅ error interceptor يُعالج حالات 401 و403 و500',
        '✅ NgOptimizedImage للصور الكبيرة',
        '✅ Lazy Loading للمسارات',
        '✅ robots.txt وsitemap.xml (لـ SEO)',
        '✅ meta tags (title، description) لكل صفحة',
        '✅ HTTPS (الاستضافة تُفعّله تلقائياً في معظمها)',
      ],
    },
    {
      type: 'qa',
      question: 'لماذا نستخدم ng build بدلاً من ng build --prod في Angular v15+؟',
      answer: 'منذ Angular v15، أصبح --configuration production هو الإعداد الافتراضي لـ ng build. الـ flag القديم --prod لا يزال يعمل كاختصار لكن الموصى به هو ng build (بدون flag) لأن angular.json يُضبط تلقائياً لإنتاج optimized build.',
    },
    {
      type: 'qa',
      question: 'ما الفرق بين Firebase Hosting وVercel وNetlify؟',
      answer: 'Firebase Hosting: من Google، مجاني للمشاريع الصغيرة، يتكامل مع Firebase Auth و Firestore. Vercel: الأسرع في CI/CD، المعاينات التلقائية للـ Pull Requests ممتازة. Netlify: مشابه لـ Vercel مع ميزات forms وfunctions مدمجة. الثلاثة مجانية للمشاريع الصغيرة.',
    },
  ],

  contentEn: [
    { type: 'heading', text: 'Building for Production' },
    {
      type: 'code',
      code: `# Build for production — automatically compresses and optimizes
ng build

# Or with an explicit configuration
ng build --configuration production

# What ng build production does:
# ✓ Tree shaking — removes unused code
# ✓ Minification — compresses JS, CSS, and HTML
# ✓ Ahead-of-Time (AOT) compilation
# ✓ Automatic code splitting for lazy routes
# ✓ File hashing for cache busting

# Inspect the output bundle
ls -lh dist/my-app/browser/

# Run locally to test the production build
npx serve dist/my-app/browser`,
    },

    { type: 'heading', text: 'Environment Variables in Angular' },
    {
      type: 'code',
      code: `// src/environments/environment.ts (development)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
};

// src/environments/environment.prod.ts (production)
export const environment = {
  production: true,
  apiUrl: 'https://api.myapp.com',
};

// angular.json — auto file replacement
// fileReplacements swaps environment.ts for environment.prod.ts
// automatically when ng build --configuration production

// Usage in code
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiUrl; // changes automatically per environment
}`,
    },

    { type: 'heading', text: 'Deploy to Firebase Hosting' },
    {
      type: 'code',
      code: `# 1. Install Firebase CLI
npm install -g firebase-tools

# 2. Log in
firebase login

# 3. Initialize the project
firebase init hosting
# Choose: "dist/my-app/browser" as public directory
# Choose: "Yes" to rewrite all URLs to index.html (for SPA)

# 4. Deploy
ng build && firebase deploy --only hosting

# Result: free URL https://your-app.web.app`,
    },

    { type: 'heading', text: 'CI/CD with GitHub Actions' },
    {
      type: 'code',
      code: `# .github/workflows/deploy.yml
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
          channelId: live`,
    },

    { type: 'heading', text: 'Pre-Launch Checklist' },
    {
      type: 'list',
      items: [
        '✅ ng build --configuration production succeeds with no errors',
        '✅ All tests pass (npm test)',
        '✅ environment.prod.ts has the correct API URLs',
        '✅ No console.log or debugger in the code',
        '✅ Error interceptor handles 401, 403, and 500',
        '✅ NgOptimizedImage for large images',
        '✅ Lazy Loading for routes',
        '✅ robots.txt and sitemap.xml (for SEO)',
        '✅ Meta tags (title, description) on every page',
        '✅ HTTPS (most hosting platforms enable it automatically)',
      ],
    },
    {
      type: 'qa',
      question: 'Why use ng build instead of ng build --prod in Angular v15+?',
      answer: 'Since Angular v15, --configuration production is the default for ng build. The old --prod flag still works as a shortcut but the recommended command is simply ng build (no flag), since angular.json is already configured to produce an optimized production build.',
    },
    {
      type: 'qa',
      question: 'What is the difference between Firebase Hosting, Vercel, and Netlify?',
      answer: 'Firebase Hosting: from Google, free for small projects, integrates with Firebase Auth and Firestore. Vercel: fastest CI/CD, excellent automatic Pull Request previews. Netlify: similar to Vercel with built-in forms and functions. All three are free for small projects.',
    },
  ],
};
