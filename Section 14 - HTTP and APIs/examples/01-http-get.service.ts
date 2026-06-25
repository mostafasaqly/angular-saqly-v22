import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface CreatePostDto {
  userId: number;
  title: string;
  body: string;
}

@Injectable({ providedIn: 'root' })
export class PostService {
  private http = inject(HttpClient);
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  // GET all posts
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`);
  }

  // GET with query params — posts by user
  getPostsByUser(userId: number): Observable<Post[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Post[]>(`${this.baseUrl}/posts`, { params });
  }

  // GET single post
  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`);
  }

  // POST — create
  createPost(dto: CreatePostDto): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/posts`, dto);
  }

  // PATCH — update fields
  updatePost(id: number, changes: Partial<Post>): Observable<Post> {
    return this.http.patch<Post>(`${this.baseUrl}/posts/${id}`, changes);
  }

  // DELETE
  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/posts/${id}`);
  }
}
