import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

/**
 * Safe wrappers for browser-only APIs that break in SSR.
 * Use this service instead of accessing window/localStorage directly.
 */
@Injectable({ providedIn: 'root' })
export class PlatformService {
  private platformId = inject(PLATFORM_ID);

  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  get isServer(): boolean {
    return isPlatformServer(this.platformId);
  }

  // Safe localStorage access (no-ops on the server)
  getItem(key: string): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    if (!this.isBrowser) return;
    localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    if (!this.isBrowser) return;
    localStorage.removeItem(key);
  }

  // Safe window access
  getWindowWidth(): number {
    if (!this.isBrowser) return 0;
    return window.innerWidth;
  }

  matchMedia(query: string): boolean {
    if (!this.isBrowser) return false;
    return window.matchMedia(query).matches;
  }
}
