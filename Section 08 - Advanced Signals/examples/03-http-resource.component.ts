import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="controls">
      <label>
        User ID:
        <input type="number" [value]="userId()" (input)="setUser($event)" min="1" max="10" />
      </label>
      <button (click)="postsResource.reload()">Reload</button>
    </div>

    @if (postsResource.isLoading()) {
      <p class="loading">Loading posts...</p>
    } @else if (postsResource.error()) {
      <p class="error">Failed to load: {{ postsResource.error() }}</p>
    } @else {
      <ul>
        @for (post of postsResource.value(); track post.id) {
          <li>
            <strong>{{ post.title }}</strong>
            <p>{{ post.body }}</p>
          </li>
        } @empty {
          <li>No posts found.</li>
        }
      </ul>
    }

    <p class="meta">Status: {{ postsResource.status() }}</p>
  `
})
export class PostsComponent {
  userId = signal(1);

  // URL is a signal-returning function — reloads when userId changes
  postsResource = httpResource<Post[]>(
    () => `https://jsonplaceholder.typicode.com/posts?userId=${this.userId()}`
  );

  setUser(event: Event) {
    const val = Number((event.target as HTMLInputElement).value);
    if (val >= 1 && val <= 10) this.userId.set(val);
  }
}
