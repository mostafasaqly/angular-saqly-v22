/**
 * Section 9 — Example 02: Custom Attribute Directive
 *
 * Demonstrates:
 *  - @Directive with standalone: true
 *  - inject(ElementRef) and inject(Renderer2) — SSR-safe DOM access
 *  - @HostListener for DOM events
 *  - @Input alias that matches the selector
 *  - @HostBinding for property binding on the host element
 *
 * Angular v22 · standalone: true
 */

import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';

// ─── 1. Simple Highlight Directive ────────────────────────────────────────────

/**
 * Usage:
 *   <p appHighlight>Hover me</p>
 *   <p appHighlight="lightblue">Hover me (blue)</p>
 *   <p [appHighlight]="dynamicColor">Hover me</p>
 */
@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective implements OnInit {
  private el       = inject(ElementRef);
  private renderer = inject(Renderer2);

  /** The colour to apply on hover.  Empty string → use default. */
  @Input('appHighlight') highlightColor = '';

  private readonly defaultColor = 'lightyellow';

  ngOnInit(): void {
    // Nothing applied at rest — only on hover
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.applyBg(this.highlightColor || this.defaultColor);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.applyBg('');
  }

  private applyBg(color: string): void {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }
}

// ─── 2. Focus Ring Directive ──────────────────────────────────────────────────

/**
 * Usage:
 *   <input appFocusRing />
 *   <textarea appFocusRing color="#f59e0b"></textarea>
 */
@Directive({
  selector: '[appFocusRing]',
  standalone: true,
})
export class FocusRingDirective {
  private el       = inject(ElementRef);
  private renderer = inject(Renderer2);

  @Input() color = '#6366f1'; // default indigo ring

  @HostListener('focus')
  onFocus(): void {
    this.renderer.setStyle(
      this.el.nativeElement,
      'outline',
      `3px solid ${this.color}`
    );
    this.renderer.setStyle(this.el.nativeElement, 'outline-offset', '2px');
  }

  @HostListener('blur')
  onBlur(): void {
    this.renderer.removeStyle(this.el.nativeElement, 'outline');
    this.renderer.removeStyle(this.el.nativeElement, 'outline-offset');
  }
}

// ─── 3. Tooltip Directive (using @HostBinding) ────────────────────────────────

/**
 * Adds a native browser tooltip by setting the title attribute.
 *
 * Usage:
 *   <button appTooltip="Save changes">Save</button>
 */
@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnChanges {
  @Input('appTooltip') text = '';

  // @HostBinding binds to a property/attribute on the host element
  @HostBinding('attr.title')
  get title(): string {
    return this.text;
  }

  ngOnChanges(): void {
    // text is already read via getter — nothing extra needed
  }
}

// ─── 4. Click-Outside Directive ──────────────────────────────────────────────

/**
 * Emits an event when the user clicks outside the host element.
 *
 * Usage:
 *   <div appClickOutside (clickOutside)="closeMenu()">…</div>
 */
import { Directive as Dir2, Output, EventEmitter } from '@angular/core';

@Dir2({
  selector: '[appClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  private el = inject(ElementRef);

  @Output() clickOutside = new EventEmitter<void>();

  // Listen on the document, not just the host
  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: HTMLElement): void {
    const inside = this.el.nativeElement.contains(target);
    if (!inside) {
      this.clickOutside.emit();
    }
  }
}

// ─── 5. Usage Component showing all four directives ──────────────────────────

import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-directives-showcase',
  standalone: true,
  imports: [
    HighlightDirective,
    FocusRingDirective,
    TooltipDirective,
    ClickOutsideDirective,
  ],
  template: `
    <h2>Custom Attribute Directives</h2>

    <!-- 1. Highlight -->
    <p appHighlight>Hover over me — default yellow highlight</p>
    <p appHighlight="lightcoral">Hover over me — coral highlight</p>
    <p [appHighlight]="highlightColor()">Hover over me — signal-driven colour</p>
    <button (click)="toggleColor()">Toggle colour</button>

    <hr />

    <!-- 2. Focus ring -->
    <label>
      Indigo focus ring
      <input appFocusRing type="text" placeholder="Click to focus" />
    </label>
    <label>
      Amber focus ring
      <input appFocusRing color="#f59e0b" type="text" placeholder="Click to focus" />
    </label>

    <hr />

    <!-- 3. Tooltip -->
    <button appTooltip="Save your progress">💾 Save</button>
    <button appTooltip="Delete this item — cannot be undone">🗑️ Delete</button>

    <hr />

    <!-- 4. Click outside -->
    <div
      appClickOutside
      (clickOutside)="menuOpen.set(false)"
      style="display:inline-block; position:relative;"
    >
      <button (click)="menuOpen.update(v => !v)">Menu ▾</button>
      @if (menuOpen()) {
        <ul style="position:absolute; background:#fff; border:1px solid #e5e7eb; padding:8px; list-style:none;">
          <li>Profile</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      }
    </div>
    <p>Click outside the menu to close it.</p>
  `,
})
export class DirectivesShowcaseComponent {
  highlightColor = signal('lightgreen');
  menuOpen       = signal(false);

  toggleColor(): void {
    this.highlightColor.update(c =>
      c === 'lightgreen' ? 'lightsalmon' : 'lightgreen'
    );
  }
}
