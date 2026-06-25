// Section 14 — HTTP and APIs
export default {
  id: 14,
  title: 'HTTP والـ APIs',
  titleEn: 'HTTP and APIs',
  level: 'متوسط',
  levelEn: 'Intermediate',
  intro: 'هذا القسم يغطي كل ما تحتاجه للتعامل مع APIs: إعداد HttpClient في Angular v22، عمليات CRUD الكاملة، httpResource() لجلب البيانات تصريحياً، معالجة الأخطاء، والـ interceptors الوظيفية لإضافة Authentication headers.',
  introEn: 'This section covers everything you need to work with APIs: setting up HttpClient in Angular v22, full CRUD operations, httpResource() for declarative data fetching, error handling, and functional interceptors for Authentication headers.',

  lessons: [
    'إعداد HttpClient في v22',
    'GET — جلب البيانات',
    'POST، PUT، PATCH، DELETE',
    'HttpParams وHttpHeaders',
    'httpResource() — الأسلوب التصريحي',
    'معالجة الأخطاء',
    'Interceptors الوظيفية',
    'نمط ApiService',
  ],
  lessonsEn: [
    'HttpClient Setup in v22',
    'GET — Fetching Data',
    'POST, PUT, PATCH, DELETE',
    'HttpParams and HttpHeaders',
    'httpResource() — Declarative Approach',
    'Error Handling',
    'Functional Interceptors',
    'ApiService Pattern',
  ],

  content: [
    { type: 'heading', text: 'إعداد HttpClient في v22' },
    {
      type: 'code',
      code: `// app.config.ts
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withFetch(),                    // استخدام Fetch API بدلاً من XHR (أسرع)
      withInterceptors([authInterceptor, errorInterceptor])
    ),
  ]
};`,
    },
    { type: 'tip', text: 'withFetch() يستخدم Fetch API الحديثة بدلاً من XMLHttpRequest — أداء أفضل، متوافق مع SSR، وأسرع في التشغيل.' },

    { type: 'heading', text: 'GET — جلب البيانات' },
    {
      type: 'code',
      code: `import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Post { id: number; title: string; body: string; userId: number; }

@Injectable({ providedIn: 'root' })
export class PostService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  // جلب الكل
  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  // جلب واحد بالـ ID
  getOne(id: number): Observable<Post> {
    return this.http.get<Post>(\`\${this.apiUrl}/\${id}\`);
  }

  // جلب مع معاملات (query params)
  getByUser(userId: number): Observable<Post[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Post[]>(this.apiUrl, { params });
  }
}`,
    },

    { type: 'heading', text: 'POST، PUT، PATCH، DELETE' },
    {
      type: 'code',
      code: `// POST — إنشاء جديد
createPost(post: Omit<Post, 'id'>): Observable<Post> {
  return this.http.post<Post>(this.apiUrl, post);
}

// PUT — استبدال كامل
updatePost(id: number, post: Post): Observable<Post> {
  return this.http.put<Post>(\`\${this.apiUrl}/\${id}\`, post);
}

// PATCH — تعديل جزئي (الأكثر شيوعاً)
patchPost(id: number, changes: Partial<Post>): Observable<Post> {
  return this.http.patch<Post>(\`\${this.apiUrl}/\${id}\`, changes);
}

// DELETE
deletePost(id: number): Observable<void> {
  return this.http.delete<void>(\`\${this.apiUrl}/\${id}\`);
}

// الاستخدام في المكوّن
export class PostsComponent {
  posts    = inject(PostService);
  isLoading = signal(false);
  error     = signal<string | null>(null);

  deletePost(id: number) {
    this.isLoading.set(true);
    this.posts.deletePost(id).pipe(
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: () => { /* أزل العنصر من القائمة */ },
      error: (err: HttpErrorResponse) => this.error.set(err.message),
    });
  }
}`,
    },

    { type: 'heading', text: 'httpResource() — الأسلوب التصريحي' },
    {
      type: 'code',
      code: `import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { httpResource } from '@angular/common/http';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    @if (posts.isLoading()) { <p>جارٍ التحميل...</p> }
    @else if (posts.error()) { <p class="error">حدث خطأ</p> }
    @else {
      @for (post of posts.value(); track post.id) {
        <div>{{ post.title }}</div>
      }
    }
    <button (click)="posts.reload()">تحديث</button>
  \`
})
export class PostsComponent {
  userId = signal(1);

  posts = httpResource<Post[]>(
    () => \`https://jsonplaceholder.typicode.com/posts?userId=\${this.userId()}\`
  );
  // يُعيد التحميل تلقائياً عند تغيير userId()
}`,
    },

    { type: 'heading', text: 'Interceptors الوظيفية' },
    {
      type: 'code',
      code: `import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

// interceptor المصادقة — يضيف Authorization header
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth_token');

  if (token && req.url.startsWith('/api')) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', \`Bearer \${token}\`)
    });
    return next(authReq);
  }

  return next(req);
};

// interceptor الأخطاء — معالجة مركزية
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        localStorage.removeItem('auth_token');
        router.navigate(['/login'], { queryParams: { session: 'expired' } });
      }
      if (err.status === 403) {
        router.navigate(['/forbidden']);
      }
      return throwError(() => err);
    })
  );
};`,
    },
    {
      type: 'qa',
      question: 'ما الفرق بين HttpClient.get() وhttpResource()؟',
      answer: 'HttpClient.get() يُرجع Observable بارد (cold) تحتاج لـ subscribe يدوي وإدارة حالة التحميل والأخطاء بنفسك. httpResource() تصريحي — مرّر Signal للـ URL، احصل فوراً على value()، isLoading()، وerror() كـ Signals. يُعيد التحميل تلقائياً عند تغيير الـ URL.',
    },
    {
      type: 'qa',
      question: 'ما الفرق بين HTTP interceptors الوظيفية (HttpInterceptorFn) والكلاسية؟',
      answer: 'الكلاسية: فئة تُنفّذ HttpInterceptor وتُسجَّل كـ multi-provider. الوظيفية (v15+): دالة بسيطة تُسجَّل في withInterceptors([fn]) — أقل كوداً، لا تحتاج فئة، وتدعم inject() مباشرةً.',
    },
  ],

  contentEn: [
    { type: 'heading', text: 'HttpClient Setup in v22' },
    {
      type: 'code',
      code: `// app.config.ts
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor, errorInterceptor } from './interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withFetch(),                    // use Fetch API instead of XHR (faster)
      withInterceptors([authInterceptor, errorInterceptor])
    ),
  ]
};`,
    },
    { type: 'tip', text: 'withFetch() uses the modern Fetch API instead of XMLHttpRequest — better performance, SSR-compatible, and faster to initialize.' },

    { type: 'heading', text: 'GET — Fetching Data' },
    {
      type: 'code',
      code: `import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Post { id: number; title: string; body: string; userId: number; }

@Injectable({ providedIn: 'root' })
export class PostService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  // Fetch all
  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  // Fetch one by ID
  getOne(id: number): Observable<Post> {
    return this.http.get<Post>(\`\${this.apiUrl}/\${id}\`);
  }

  // Fetch with query parameters
  getByUser(userId: number): Observable<Post[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Post[]>(this.apiUrl, { params });
  }
}`,
    },

    { type: 'heading', text: 'POST, PUT, PATCH, DELETE' },
    {
      type: 'code',
      code: `// POST — create new
createPost(post: Omit<Post, 'id'>): Observable<Post> {
  return this.http.post<Post>(this.apiUrl, post);
}

// PUT — full replacement
updatePost(id: number, post: Post): Observable<Post> {
  return this.http.put<Post>(\`\${this.apiUrl}/\${id}\`, post);
}

// PATCH — partial update (most common)
patchPost(id: number, changes: Partial<Post>): Observable<Post> {
  return this.http.patch<Post>(\`\${this.apiUrl}/\${id}\`, changes);
}

// DELETE
deletePost(id: number): Observable<void> {
  return this.http.delete<void>(\`\${this.apiUrl}/\${id}\`);
}

// Usage in a component
export class PostsComponent {
  postService = inject(PostService);
  isLoading   = signal(false);
  error       = signal<string | null>(null);

  deletePost(id: number) {
    this.isLoading.set(true);
    this.postService.deletePost(id).pipe(
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next:  () => { /* remove from list */ },
      error: (err: HttpErrorResponse) => this.error.set(err.message),
    });
  }
}`,
    },

    { type: 'heading', text: 'httpResource() — Declarative Approach' },
    {
      type: 'code',
      code: `import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { httpResource } from '@angular/common/http';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    @if (posts.isLoading()) { <p>Loading...</p> }
    @else if (posts.error()) { <p class="error">An error occurred</p> }
    @else {
      @for (post of posts.value(); track post.id) {
        <div>{{ post.title }}</div>
      }
    }
    <button (click)="posts.reload()">Refresh</button>
  \`
})
export class PostsComponent {
  userId = signal(1);

  posts = httpResource<Post[]>(
    () => \`https://jsonplaceholder.typicode.com/posts?userId=\${this.userId()}\`
  );
  // automatically reloads when userId() changes
}`,
    },

    { type: 'heading', text: 'Functional Interceptors' },
    {
      type: 'code',
      code: `import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

// Auth interceptor — adds Authorization header
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth_token');

  if (token && req.url.startsWith('/api')) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', \`Bearer \${token}\`)
    });
    return next(authReq);
  }

  return next(req);
};

// Error interceptor — centralized error handling
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        localStorage.removeItem('auth_token');
        router.navigate(['/login'], { queryParams: { session: 'expired' } });
      }
      if (err.status === 403) {
        router.navigate(['/forbidden']);
      }
      return throwError(() => err);
    })
  );
};`,
    },
    {
      type: 'qa',
      question: 'What is the difference between HttpClient.get() and httpResource()?',
      answer: 'HttpClient.get() returns a cold Observable that needs manual subscribe() and you must manage loading/error state yourself. httpResource() is declarative — pass a URL Signal, get value(), isLoading(), and error() back as Signals. It automatically reloads when the URL Signal changes.',
    },
    {
      type: 'qa',
      question: 'What is the difference between functional interceptors (HttpInterceptorFn) and class-based ones?',
      answer: 'Class-based: a class implementing HttpInterceptor, registered as a multi-provider. Functional (v15+): a simple function registered in withInterceptors([fn]) — less boilerplate, no class needed, and inject() works directly inside the function.',
    },
  ],
};
