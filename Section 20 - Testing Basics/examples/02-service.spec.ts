import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Example service to test
interface Todo { id: number; title: string; completed: boolean; }

@Injectable({ providedIn: 'root' })
class TodoService {
  private http = inject(HttpClient);

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>('/api/todos');
  }

  create(title: string): Observable<Todo> {
    return this.http.post<Todo>('/api/todos', { title, completed: false });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`/api/todos/${id}`);
  }
}

// --- Signal-only service test (no HTTP) ---
@Injectable({ providedIn: 'root' })
class CounterService {
  private _count = signal(0);
  count = this._count.asReadonly();
  double = computed(() => this._count() * 2);

  increment() { this._count.update(v => v + 1); }
  reset() { this._count.set(0); }
}

describe('CounterService (signals)', () => {
  let service: CounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterService);
  });

  it('starts at 0', () => expect(service.count()).toBe(0));
  it('increments', () => { service.increment(); expect(service.count()).toBe(1); });
  it('computes double', () => { service.increment(); service.increment(); expect(service.double()).toBe(4); });
  it('resets', () => { service.increment(); service.reset(); expect(service.count()).toBe(0); });
});

describe('TodoService (HTTP)', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should GET todos', () => {
    const mockTodos: Todo[] = [
      { id: 1, title: 'Buy groceries', completed: false }
    ];

    service.getAll().subscribe(todos => {
      expect(todos.length).toBe(1);
      expect(todos[0].title).toBe('Buy groceries');
    });

    const req = httpMock.expectOne('/api/todos');
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);
  });

  it('should POST to create a todo', () => {
    const created: Todo = { id: 42, title: 'Learn Angular', completed: false };

    service.create('Learn Angular').subscribe(todo => {
      expect(todo.id).toBe(42);
      expect(todo.title).toBe('Learn Angular');
    });

    const req = httpMock.expectOne('/api/todos');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.title).toBe('Learn Angular');
    req.flush(created);
  });

  it('should handle 404 on delete', () => {
    service.delete(999).subscribe({
      next: () => fail('expected error'),
      error: err => expect(err.status).toBe(404)
    });

    const req = httpMock.expectOne('/api/todos/999');
    req.flush('Not found', { status: 404, statusText: 'Not Found' });
  });
});
