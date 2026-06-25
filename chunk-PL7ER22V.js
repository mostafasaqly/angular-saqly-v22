import"./chunk-JS3ZFT6L.js";var t={id:14,title:"HTTP \u0648\u0627\u0644\u0640 APIs",titleEn:"HTTP and APIs",level:"\u0645\u062A\u0648\u0633\u0637",levelEn:"Intermediate",intro:"\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u064A\u063A\u0637\u064A \u0643\u0644 \u0645\u0627 \u062A\u062D\u062A\u0627\u062C\u0647 \u0644\u0644\u062A\u0639\u0627\u0645\u0644 \u0645\u0639 APIs: \u0625\u0639\u062F\u0627\u062F HttpClient \u0641\u064A Angular v22\u060C \u0639\u0645\u0644\u064A\u0627\u062A CRUD \u0627\u0644\u0643\u0627\u0645\u0644\u0629\u060C httpResource() \u0644\u062C\u0644\u0628 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0635\u0631\u064A\u062D\u064A\u0627\u064B\u060C \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0623\u062E\u0637\u0627\u0621\u060C \u0648\u0627\u0644\u0640 interceptors \u0627\u0644\u0648\u0638\u064A\u0641\u064A\u0629 \u0644\u0625\u0636\u0627\u0641\u0629 Authentication headers.",introEn:"This section covers everything you need to work with APIs: setting up HttpClient in Angular v22, full CRUD operations, httpResource() for declarative data fetching, error handling, and functional interceptors for Authentication headers.",lessons:["\u0625\u0639\u062F\u0627\u062F HttpClient \u0641\u064A v22","GET \u2014 \u062C\u0644\u0628 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A","POST\u060C PUT\u060C PATCH\u060C DELETE","HttpParams \u0648HttpHeaders","httpResource() \u2014 \u0627\u0644\u0623\u0633\u0644\u0648\u0628 \u0627\u0644\u062A\u0635\u0631\u064A\u062D\u064A","\u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0623\u062E\u0637\u0627\u0621","Interceptors \u0627\u0644\u0648\u0638\u064A\u0641\u064A\u0629","\u0646\u0645\u0637 ApiService"],lessonsEn:["HttpClient Setup in v22","GET \u2014 Fetching Data","POST, PUT, PATCH, DELETE","HttpParams and HttpHeaders","httpResource() \u2014 Declarative Approach","Error Handling","Functional Interceptors","ApiService Pattern"],content:[{type:"heading",text:"\u0625\u0639\u062F\u0627\u062F HttpClient \u0641\u064A v22"},{type:"code",code:`// app.config.ts
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withFetch(),                    // \u0627\u0633\u062A\u062E\u062F\u0627\u0645 Fetch API \u0628\u062F\u0644\u0627\u064B \u0645\u0646 XHR (\u0623\u0633\u0631\u0639)
      withInterceptors([authInterceptor, errorInterceptor])
    ),
  ]
};`},{type:"tip",text:"withFetch() \u064A\u0633\u062A\u062E\u062F\u0645 Fetch API \u0627\u0644\u062D\u062F\u064A\u062B\u0629 \u0628\u062F\u0644\u0627\u064B \u0645\u0646 XMLHttpRequest \u2014 Performance \u0623\u0641\u0636\u0644\u060C \u0645\u062A\u0648\u0627\u0641\u0642 \u0645\u0639 SSR\u060C \u0648\u0623\u0633\u0631\u0639 \u0641\u064A \u0627\u0644\u062A\u0634\u063A\u064A\u0644."},{type:"heading",text:"GET \u2014 \u062C\u0644\u0628 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"},{type:"code",code:`import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Post { id: number; title: string; body: string; userId: number; }

@Injectable({ providedIn: 'root' })
export class PostService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  // \u062C\u0644\u0628 \u0627\u0644\u0643\u0644
  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  // \u062C\u0644\u0628 \u0648\u0627\u062D\u062F \u0628\u0627\u0644\u0640 ID
  getOne(id: number): Observable<Post> {
    return this.http.get<Post>(\`\${this.apiUrl}/\${id}\`);
  }

  // \u062C\u0644\u0628 \u0645\u0639 \u0645\u0639\u0627\u0645\u0644\u0627\u062A (query params)
  getByUser(userId: number): Observable<Post[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Post[]>(this.apiUrl, { params });
  }
}`},{type:"heading",text:"POST\u060C PUT\u060C PATCH\u060C DELETE"},{type:"code",code:`// POST \u2014 \u0625\u0646\u0634\u0627\u0621 \u062C\u062F\u064A\u062F
createPost(post: Omit<Post, 'id'>): Observable<Post> {
  return this.http.post<Post>(this.apiUrl, post);
}

// PUT \u2014 \u0627\u0633\u062A\u0628\u062F\u0627\u0644 \u0643\u0627\u0645\u0644
updatePost(id: number, post: Post): Observable<Post> {
  return this.http.put<Post>(\`\${this.apiUrl}/\${id}\`, post);
}

// PATCH \u2014 \u062A\u0639\u062F\u064A\u0644 \u062C\u0632\u0626\u064A (\u0627\u0644\u0623\u0643\u062B\u0631 \u0634\u064A\u0648\u0639\u0627\u064B)
patchPost(id: number, changes: Partial<Post>): Observable<Post> {
  return this.http.patch<Post>(\`\${this.apiUrl}/\${id}\`, changes);
}

// DELETE
deletePost(id: number): Observable<void> {
  return this.http.delete<void>(\`\${this.apiUrl}/\${id}\`);
}

// \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0641\u064A \u0627\u0644\u0645\u0643\u0648\u0651\u0646
export class PostsComponent {
  posts    = inject(PostService);
  isLoading = signal(false);
  error     = signal<string | null>(null);

  deletePost(id: number) {
    this.isLoading.set(true);
    this.posts.deletePost(id).pipe(
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: () => { /* \u0623\u0632\u0644 \u0627\u0644\u0639\u0646\u0635\u0631 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 */ },
      error: (err: HttpErrorResponse) => this.error.set(err.message),
    });
  }
}`},{type:"heading",text:"httpResource() \u2014 \u0627\u0644\u0623\u0633\u0644\u0648\u0628 \u0627\u0644\u062A\u0635\u0631\u064A\u062D\u064A"},{type:"code",code:`import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { httpResource } from '@angular/common/http';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    @if (posts.isLoading()) { <p>\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p> }
    @else if (posts.error()) { <p class="error">\u062D\u062F\u062B \u062E\u0637\u0623</p> }
    @else {
      @for (post of posts.value(); track post.id) {
        <div>{{ post.title }}</div>
      }
    }
    <button (click)="posts.reload()">\u062A\u062D\u062F\u064A\u062B</button>
  \`
})
export class PostsComponent {
  userId = signal(1);

  posts = httpResource<Post[]>(
    () => \`https://jsonplaceholder.typicode.com/posts?userId=\${this.userId()}\`
  );
  // \u064A\u064F\u0639\u064A\u062F \u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 userId()
}`},{type:"heading",text:"Interceptors \u0627\u0644\u0648\u0638\u064A\u0641\u064A\u0629"},{type:"code",code:`import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

// interceptor Authentication \u2014 \u064A\u0636\u064A\u0641 Authorization header
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

// interceptor \u0627\u0644\u0623\u062E\u0637\u0627\u0621 \u2014 \u0645\u0639\u0627\u0644\u062C\u0629 \u0645\u0631\u0643\u0632\u064A\u0629
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
};`},{type:"qa",question:"\u0645\u0627 \u0627\u0644\u0641\u0631\u0642 \u0628\u064A\u0646 HttpClient.get() \u0648httpResource()\u061F",answer:"HttpClient.get() \u064A\u064F\u0631\u062C\u0639 Observable \u0628\u0627\u0631\u062F (cold) \u062A\u062D\u062A\u0627\u062C \u0644\u0640 subscribe \u064A\u062F\u0648\u064A \u0648\u0625\u062F\u0627\u0631\u0629 \u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u0648\u0627\u0644\u0623\u062E\u0637\u0627\u0621 \u0628\u0646\u0641\u0633\u0643. httpResource() \u062A\u0635\u0631\u064A\u062D\u064A \u2014 \u0645\u0631\u0651\u0631 Signal \u0644\u0644\u0640 URL\u060C \u0627\u062D\u0635\u0644 \u0641\u0648\u0631\u0627\u064B \u0639\u0644\u0649 value()\u060C isLoading()\u060C \u0648error() \u0643\u0640 Signals. \u064A\u064F\u0639\u064A\u062F \u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0640 URL."},{type:"qa",question:"\u0645\u0627 \u0627\u0644\u0641\u0631\u0642 \u0628\u064A\u0646 HTTP interceptors \u0627\u0644\u0648\u0638\u064A\u0641\u064A\u0629 (HttpInterceptorFn) \u0648\u0627\u0644\u0643\u0644\u0627\u0633\u064A\u0629\u061F",answer:"\u0627\u0644\u0643\u0644\u0627\u0633\u064A\u0629: \u0641\u0626\u0629 \u062A\u064F\u0646\u0641\u0651\u0630 HttpInterceptor \u0648\u062A\u064F\u0633\u062C\u064E\u0651\u0644 \u0643\u0640 multi-provider. \u0627\u0644\u0648\u0638\u064A\u0641\u064A\u0629 (v15+): \u062F\u0627\u0644\u0629 \u0628\u0633\u064A\u0637\u0629 \u062A\u064F\u0633\u062C\u064E\u0651\u0644 \u0641\u064A withInterceptors([fn]) \u2014 \u0623\u0642\u0644 \u0643\u0648\u062F\u0627\u064B\u060C \u0644\u0627 \u062A\u062D\u062A\u0627\u062C \u0641\u0626\u0629\u060C \u0648\u062A\u062F\u0639\u0645 inject() \u0645\u0628\u0627\u0634\u0631\u0629\u064B."}],contentEn:[{type:"heading",text:"HttpClient Setup in v22"},{type:"code",code:`// app.config.ts
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor, errorInterceptor } from './interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withFetch(),                    // use Fetch API instead of XHR (faster)
      withInterceptors([authInterceptor, errorInterceptor])
    ),
  ]
};`},{type:"tip",text:"withFetch() uses the modern Fetch API instead of XMLHttpRequest \u2014 better performance, SSR-compatible, and faster to initialize."},{type:"heading",text:"GET \u2014 Fetching Data"},{type:"code",code:`import { Injectable, inject } from '@angular/core';
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
}`},{type:"heading",text:"POST, PUT, PATCH, DELETE"},{type:"code",code:`// POST \u2014 create new
createPost(post: Omit<Post, 'id'>): Observable<Post> {
  return this.http.post<Post>(this.apiUrl, post);
}

// PUT \u2014 full replacement
updatePost(id: number, post: Post): Observable<Post> {
  return this.http.put<Post>(\`\${this.apiUrl}/\${id}\`, post);
}

// PATCH \u2014 partial update (most common)
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
}`},{type:"heading",text:"httpResource() \u2014 Declarative Approach"},{type:"code",code:`import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
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
}`},{type:"heading",text:"Functional Interceptors"},{type:"code",code:`import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

// Auth interceptor \u2014 adds Authorization header
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

// Error interceptor \u2014 centralized error handling
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
};`},{type:"qa",question:"What is the difference between HttpClient.get() and httpResource()?",answer:"HttpClient.get() returns a cold Observable that needs manual subscribe() and you must manage loading/error state yourself. httpResource() is declarative \u2014 pass a URL Signal, get value(), isLoading(), and error() back as Signals. It automatically reloads when the URL Signal changes."},{type:"qa",question:"What is the difference between functional interceptors (HttpInterceptorFn) and class-based ones?",answer:"Class-based: a class implementing HttpInterceptor, registered as a multi-provider. Functional (v15+): a simple function registered in withInterceptors([fn]) \u2014 less boilerplate, no class needed, and inject() works directly inside the function."}]};export{t as default};
