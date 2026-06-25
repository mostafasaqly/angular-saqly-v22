export default {
  id: 2,
  title: 'إعداد بيئة التطوير',
  titleEn: 'Development Environment Setup',
  level: 'مبتدئ',
  levelEn: 'Beginner',
  intro: 'قبل أن نكتب سطراً واحداً من كود Angular، نحتاج إلى تثبيت الأدوات الصحيحة. سنثبت Node.js v22، وTypeScript v6، وAngular CLI، وإضافات VS Code، ونُشغّل أول مشروع Angular v22 حقيقي على جهازك.',
  introEn: 'Before we write a single line of Angular code, we need the right tools in place. We\'ll install Node.js v22, TypeScript v6, the Angular CLI, the essential VS Code extensions, and run a real Angular v22 project on your machine.',

  lessons: [
    'تثبيت Node.js (الإصدار v22+ مطلوب)',
    'متطلب TypeScript v6',
    'تثبيت Angular CLI',
    'إنشاء مشروع Angular v22 جديد',
    'فهم Angular Workspace',
    'هيكل مجلدات المشروع',
    'تشغيل خادم التطوير',
    'إضافات VS Code الموصى بها',
    'إعداد Angular MCP Server وAI Skills',
  ],
  lessonsEn: [
    'Installing Node.js (v22+ required)',
    'TypeScript v6 Requirement',
    'Installing Angular CLI',
    'Creating a New Angular v22 Project',
    'Understanding Angular Workspace',
    'Project Folder Structure',
    'Running the Development Server',
    'Recommended VS Code Extensions',
    'Setting Up the Angular MCP Server and AI Skills',
  ],

  content: [
    { type: 'heading', text: 'تثبيت Node.js (v22+ مطلوب)' },
    { type: 'paragraph', text: 'Angular v22 يتطلب Node.js الإصدار 22 أو أحدث. الإصدار v20 لم يعد مدعوماً من Angular CLI. تحقق من إصدارك الحالي أولاً.' },
    {
      type: 'code',
      code: `node -v
# يجب أن يظهر v22.x.x أو أحدث

npm -v
# يجب أن يظهر 10.x.x أو أحدث`,
    },
    { type: 'tip', text: 'إن كنت تعمل على مشاريع متعددة بإصدارات Node مختلفة، استخدم مدير الإصدارات nvm — يتيح لك التبديل بين الإصدارات بأمر واحد.' },
    {
      type: 'code',
      code: `# تثبيت Node v22 عبر nvm
nvm install 22
nvm use 22
node -v   # v22.x.x ✓`,
    },

    { type: 'heading', text: 'متطلب TypeScript v6' },
    { type: 'paragraph', text: 'Angular v22 يشتغل مع TypeScript v6 كـ peer dependency. لا تحتاج لتثبيته يدوياً — Angular CLI سيثبت الإصدار الصحيح تلقائياً عند إنشاء المشروع.' },
    { type: 'warning', text: 'لا تثبت TypeScript بشكل global لمشاريع Angular. اتركه يُدار بواسطة CLI داخل node_modules لتجنب تعارض الإصدارات.' },
    {
      type: 'code',
      code: `# التحقق من إصدار TypeScript داخل المشروع (بعد الإنشاء)
npx tsc -v
# Version 6.x.x`,
    },

    { type: 'heading', text: 'تثبيت Angular CLI' },
    { type: 'paragraph', text: 'Angular CLI هي أداة سطر الأوامر التي تتحكم في كل شيء: إنشاء المشاريع، توليد Components، تشغيل خادم التطوير، والبناء للإنتاج.' },
    {
      type: 'code',
      code: `# تثبيت CLI عالمياً
npm install -g @angular/cli@latest

# التحقق من التثبيت
ng version`,
    },
    { type: 'tip', text: 'إن كان لديك CLI قديم، قم بإلغاء تثبيته أولاً: npm uninstall -g @angular/cli ثم أعد التثبيت.' },

    { type: 'heading', text: 'إنشاء مشروع Angular v22 جديد' },
    { type: 'paragraph', text: 'أمر واحد يكفي لإنشاء مشروع كامل مع كل الإعدادات.' },
    {
      type: 'code',
      code: `ng new my-angular-app

# CLI سيسألك:
# ؟ Which stylesheet format? → CSS
# ؟ Enable Server-Side Rendering? → No

cd my-angular-app
code .`,
    },
    { type: 'tip', text: 'مشاريع Angular v22 تعمل بـ Zoneless بشكل افتراضي وتستخدم Standalone Components — بدون NgModule، بدون zone.js. هذا هو الأسلوب الحديث.' },

    { type: 'heading', text: 'فهم Angular Workspace' },
    { type: 'paragraph', text: 'الـ Workspace هو المجلد الجذري الذي ينشئه ng new. يحتوي على ملف الإعدادات angular.json، وملف الحزم package.json، وإعدادات TypeScript.' },
    {
      type: 'code',
      code: `my-angular-app/
├── angular.json      ← إعدادات workspace
├── package.json      ← حزم npm
├── tsconfig.json     ← إعدادات TypeScript الأساسية
└── src/              ← كود التطبيق الفعلي`,
    },
    { type: 'warning', text: 'لا تعدّل angular.json يدوياً حتى تفهم كل حقل فيه. استخدم أوامر ng generate و ng config بدلاً من ذلك.' },

    { type: 'heading', text: 'هيكل مجلدات المشروع' },
    {
      type: 'code',
      code: `src/
├── app/
│   ├── app.ts           ← Root Component (TypeScript)
│   ├── app.html         ← قالب المكون الجذري
│   ├── app.css          ← أنماط المكون الجذري
│   └── app.config.ts    ← Providers (Router, HTTP…)
├── index.html           ← نقطة الدخول الوحيدة
├── main.ts              ← Bootstrap
└── styles.css           ← أنماط عامة`,
    },
    {
      type: 'code',
      code: `// main.ts — بوابة تشغيل التطبيق
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig);`,
    },
    {
      type: 'code',
      code: `// app.config.ts — providers على مستوى التطبيق
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ]
};`,
    },
    {
      type: 'code',
      code: `// app.ts — المكون الجذري
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'my-angular-app';
}`,
    },
    { type: 'tip', text: 'لاحظ غياب NgModule تماماً. Angular v22 يعتمد Standalone Components بشكل كامل.' },

    { type: 'heading', text: 'تشغيل خادم التطوير' },
    {
      type: 'code',
      code: `ng serve

# ✔ Compiled successfully in 312ms
# ➜ Local:  http://localhost:4200/`,
    },
    { type: 'paragraph', text: 'Angular CLI يستخدم esbuild تحت الغطاء منذ الإصدار v17. HMR (Hot Module Replacement) مفعّل افتراضياً — المتصفح يتحدث بالملي ثانية بدون إعادة تحميل كامل.' },
    {
      type: 'list',
      items: [
        'ng serve --open → يفتح المتصفح تلقائياً',
        'ng serve --port 3000 → تغيير البورت',
        'ng serve --host 0.0.0.0 → الوصول من شبكة محلية (للاختبار على الموبايل)',
      ],
    },
    { type: 'warning', text: 'ابقِ الـ terminal مفتوحاً أثناء التطوير. ng serve يراقب الملفات ويعيد التجميع عند كل حفظ. اضغط Ctrl+C للإيقاف.' },

    { type: 'heading', text: 'إضافات VS Code الموصى بها' },
    {
      type: 'list',
      items: [
        'Angular Language Service (بواسطة Angular) — الأهم: تكملة تلقائية وكشف أخطاء في القوالب',
        'Angular Snippets (بواسطة John Papa) — snippets سريعة',
        'ESLint (بواسطة Microsoft) — يُعدّها Angular CLI تلقائياً',
        'Prettier — تنسيق الكود',
        'EditorConfig — ثبات المسافات البادئة',
        'Angular DevTools (Chrome Extension) — يعرض Signal graph وشجرة Components',
      ],
    },
    { type: 'tip', text: 'ثبّت Angular DevTools كـ Chrome Extension (مش VS Code). ستجد تبويب "Angular" في Chrome DevTools يعرض لك Signal dependencies بشكل مرئي.' },

    { type: 'heading', text: 'إعداد Angular MCP Server وAI Skills' },
    { type: 'paragraph', text: 'Angular MCP Server هو أداة اختيارية تتيح لمساعدي الذكاء الاصطناعي (مثل Claude) فهم مشروعك Angular بشكل حقيقي — توليد مكونات، شرح أخطاء، والتعامل مع Signal graph.' },
    {
      type: 'code',
      code: `# تثبيت Angular MCP Server
npm install -g @angular/mcp@latest`,
    },
    {
      type: 'code',
      code: `// .claude/mcp.json — إضافته لمشروعك
{
  "mcpServers": {
    "angular": {
      "command": "ng-mcp",
      "args": ["--project", "."]
    }
  }
}`,
    },
    {
      type: 'code',
      code: `# Angular AI Skills
ng ai skills list          # عرض المهارات المتاحة
ng ai skills add --all     # إضافة كل مهارات Angular`,
    },
    { type: 'tip', text: 'مع MCP Server مشغّل، يستطيع Claude توليد كود Angular v22 صحيح ومتوافق مع conventions المشروع من أول محاولة.' },

    {
      type: 'qa',
      question: 'ما هو الحد الأدنى لإصدار Node.js المطلوب لـ Angular v22، ولماذا لم يعد v20 مدعوماً؟',
      answer: 'Node.js v22 أو أحدث مطلوب. تم إسقاط دعم v20 لأنه وصل إلى نهاية عمره الافتراضي (End of Life) ولم يعد يتلقى تحديثات أمنية.',
    },
    {
      type: 'qa',
      question: 'ما الفرق بين ng serve و ng build؟',
      answer: 'ng serve يشغّل خادم تطوير محلي مع HMR ومراقبة الملفات — للتطوير فقط. ng build يُنتج ملفات محسّنة جاهزة للـ production في مجلد dist/ — لا يشغّل خادماً.',
    },
  ],

  contentEn: [
    { type: 'heading', text: 'Installing Node.js (v22+ Required)' },
    { type: 'paragraph', text: 'Angular v22 requires Node.js v22 or higher. Node v20 reached end-of-life and is no longer supported by the Angular CLI. Check your version before starting.' },
    {
      type: 'code',
      code: `node -v
# Must print v22.x.x or higher

npm -v
# Must print 10.x.x or higher`,
    },
    { type: 'tip', text: 'If you work on multiple Node projects, use nvm (Node Version Manager) — it lets you switch versions with a single command.' },
    {
      type: 'code',
      code: `# Install Node v22 via nvm
nvm install 22
nvm use 22
node -v   # v22.x.x ✓`,
    },

    { type: 'heading', text: 'TypeScript v6 Requirement' },
    { type: 'paragraph', text: 'Angular v22 ships TypeScript v6 as a peer dependency. You don\'t install it manually — the Angular CLI installs the correct version automatically when you create a project.' },
    { type: 'warning', text: 'Never install TypeScript globally for Angular projects. Let the CLI manage it inside node_modules to avoid version conflicts.' },
    {
      type: 'code',
      code: `# Check TypeScript version inside the project (after creation)
npx tsc -v
# Version 6.x.x`,
    },

    { type: 'heading', text: 'Installing Angular CLI' },
    { type: 'paragraph', text: 'The Angular CLI (ng) is the command-line tool for everything: creating projects, generating components, running the dev server, and building for production.' },
    {
      type: 'code',
      code: `# Install CLI globally
npm install -g @angular/cli@latest

# Verify installation
ng version`,
    },
    { type: 'tip', text: 'If you have an older CLI, uninstall it first: npm uninstall -g @angular/cli, then reinstall.' },

    { type: 'heading', text: 'Creating a New Angular v22 Project' },
    { type: 'paragraph', text: 'One command scaffolds a complete project with all configuration.' },
    {
      type: 'code',
      code: `ng new my-angular-app

# CLI will ask:
# ? Which stylesheet format? → CSS
# ? Enable Server-Side Rendering? → No

cd my-angular-app
code .`,
    },
    { type: 'tip', text: 'Angular v22 projects are Zoneless by default and use Standalone Components — no NgModule, no zone.js. This is the modern Angular way.' },

    { type: 'heading', text: 'Understanding Angular Workspace' },
    { type: 'paragraph', text: 'The workspace is the root folder created by ng new. It holds angular.json (build config), package.json (dependencies), and the base TypeScript config.' },
    {
      type: 'code',
      code: `my-angular-app/
├── angular.json      ← workspace configuration
├── package.json      ← npm dependencies
├── tsconfig.json     ← TypeScript base config
└── src/              ← the actual application code`,
    },
    { type: 'warning', text: 'Don\'t edit angular.json manually until you understand each field. Use ng generate and ng config commands instead.' },

    { type: 'heading', text: 'Project Folder Structure' },
    {
      type: 'code',
      code: `src/
├── app/
│   ├── app.ts           ← Root Component (TypeScript class)
│   ├── app.html         ← Root component template
│   ├── app.css          ← Root component styles
│   └── app.config.ts    ← App-wide providers (Router, HTTP…)
├── index.html           ← Single HTML entry point
├── main.ts              ← Bootstrap — calls bootstrapApplication()
└── styles.css           ← Global styles`,
    },
    {
      type: 'code',
      code: `// main.ts — app entry point
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig);`,
    },
    {
      type: 'code',
      code: `// app.config.ts — app-wide providers
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ]
};`,
    },
    {
      type: 'code',
      code: `// app.ts — root component
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'my-angular-app';
}`,
    },
    { type: 'tip', text: 'Notice: no NgModule anywhere. Angular v22 is fully standalone-first.' },

    { type: 'heading', text: 'Running the Development Server' },
    {
      type: 'code',
      code: `ng serve

# ✔ Compiled successfully in 312ms
# ➜ Local:  http://localhost:4200/`,
    },
    { type: 'paragraph', text: 'Angular CLI uses esbuild under the hood (since v17). HMR (Hot Module Replacement) is enabled by default — the browser updates in milliseconds without a full page reload.' },
    {
      type: 'list',
      items: [
        'ng serve --open → opens browser automatically',
        'ng serve --port 3000 → change the port',
        'ng serve --host 0.0.0.0 → expose on local network for mobile testing',
      ],
    },
    { type: 'warning', text: 'Keep the terminal open while developing. ng serve watches files and recompiles on every save. Press Ctrl+C to stop.' },

    { type: 'heading', text: 'Recommended VS Code Extensions' },
    {
      type: 'list',
      items: [
        'Angular Language Service (by Angular) — most important: autocomplete and error detection in templates',
        'Angular Snippets (by John Papa) — fast code snippets',
        'ESLint (by Microsoft) — Angular CLI configures this automatically',
        'Prettier — code formatting',
        'EditorConfig — consistent indentation',
        'Angular DevTools (Chrome Extension) — inspect Signal graph and component tree',
      ],
    },
    { type: 'tip', text: 'Install Angular DevTools as a Chrome Extension (not VS Code). It adds an "Angular" tab in Chrome DevTools showing your live Signal dependency graph.' },

    { type: 'heading', text: 'Setting Up the Angular MCP Server and AI Skills' },
    { type: 'paragraph', text: 'The Angular MCP Server is an optional tool that lets AI assistants (like Claude) understand your Angular project in real time — generating components, explaining errors, and reasoning about your Signal graph.' },
    {
      type: 'code',
      code: `# Install Angular MCP Server
npm install -g @angular/mcp@latest`,
    },
    {
      type: 'code',
      code: `// .claude/mcp.json — add to your project root
{
  "mcpServers": {
    "angular": {
      "command": "ng-mcp",
      "args": ["--project", "."]
    }
  }
}`,
    },
    {
      type: 'code',
      code: `# Angular AI Skills
ng ai skills list          # list available skills
ng ai skills add --all     # add all Angular skills`,
    },
    { type: 'tip', text: 'With the MCP Server running, Claude generates correct, idiomatic Angular v22 code on the first try — it knows your component names, services, and routes.' },

    {
      type: 'qa',
      question: 'What is the minimum Node.js version required for Angular v22, and why was v20 dropped?',
      answer: 'Node.js v22 or higher is required. v20 was dropped because it reached End of Life — it no longer receives security updates, making it unsafe to build on.',
    },
    {
      type: 'qa',
      question: 'What is the difference between ng serve and ng build?',
      answer: 'ng serve starts a local development server with HMR and file watching — for development only. ng build produces optimized production-ready files in the dist/ folder — it does not start a server.',
    },
  ],
};
