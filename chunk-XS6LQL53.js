import"./chunk-JS3ZFT6L.js";var e={id:17,title:"\u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u060C \u0627\u0644\u062A\u0635\u0645\u064A\u0645\u060C \u0648\u0625\u0645\u0643\u0627\u0646\u064A\u0629 \u0627\u0644\u0648\u0635\u0648\u0644",titleEn:"UI, Styling, and Accessibility",level:"\u0645\u062A\u0648\u0633\u0637",levelEn:"Intermediate",intro:"\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u064A\u063A\u0637\u064A \u0643\u064A\u0641\u064A\u0629 \u0628\u0646\u0627\u0621 \u0648\u0627\u062C\u0647\u0627\u062A \u062C\u0645\u064A\u0644\u0629 \u0648\u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0641\u064A Angular v22: \u062A\u0636\u0645\u064A\u0646 \u0627\u0644\u062A\u0635\u0645\u064A\u0645 \u0641\u064A \u0627\u0644\u0645\u0643\u0648\u0651\u0646\u060C CSS Variables \u0644\u0644\u0633\u0645\u0627\u062A\u060C Angular Material v3\u060C \u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A\u0627\u062A \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0642\u064A\u0645\u060C \u0648\u0623\u0641\u0636\u0644 \u0645\u0645\u0627\u0631\u0633\u0627\u062A \u0625\u0645\u0643\u0627\u0646\u064A\u0629 \u0627\u0644\u0648\u0635\u0648\u0644 (a11y).",introEn:"This section covers how to build beautiful, accessible UIs in Angular v22: encapsulating styles in components, CSS variables for theming, Angular Material v3, change detection strategies, and accessibility (a11y) best practices.",lessons:["\u062A\u0636\u0645\u064A\u0646 \u0627\u0644\u062A\u0635\u0645\u064A\u0645 \u0641\u064A \u0627\u0644\u0645\u0643\u0648\u0651\u0646","CSS Variables \u0648\u0627\u0644\u0633\u0645\u0627\u062A \u0627\u0644\u062F\u064A\u0646\u0627\u0645\u064A\u0643\u064A\u0629","Angular Material v3","\u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A\u0629 OnPush \u0648\u062A\u062D\u0633\u064A\u0646 \u0627\u0644\u0623\u062F\u0627\u0621","\u0627\u0644\u0623\u0646\u0645\u0627\u0637 \u0627\u0644\u0634\u0631\u0637\u064A\u0629 (Dynamic Classes)","\u0623\u0646\u064A\u0645\u0627\u0634\u0646 Angular","\u0625\u0645\u0643\u0627\u0646\u064A\u0629 \u0627\u0644\u0648\u0635\u0648\u0644 (a11y)","\u062F\u0639\u0645 RTL \u0648\u0627\u0644\u062A\u062F\u0648\u064A\u0644"],lessonsEn:["Component Style Encapsulation","CSS Variables and Dynamic Theming","Angular Material v3","OnPush Strategy and Performance","Dynamic Classes and Styles","Angular Animations","Accessibility (a11y)","RTL Support and Internationalization"],content:[{type:"heading",text:"\u062A\u0636\u0645\u064A\u0646 \u0627\u0644\u062A\u0635\u0645\u064A\u0645 \u0641\u064A \u0627\u0644\u0645\u0643\u0648\u0651\u0646"},{type:"paragraph",text:"Angular \u064A\u064F\u0636\u0645\u0651\u0646 \u062A\u0635\u0645\u064A\u0645 \u0627\u0644\u0645\u0643\u0648\u0651\u0646 \u0628\u0634\u0643\u0644 \u0627\u0641\u062A\u0631\u0627\u0636\u064A (Emulated ViewEncapsulation) \u2014 \u0627\u0644\u0623\u0646\u0645\u0627\u0637 \u0644\u0627 \u062A\u062A\u0633\u0631\u0628 \u0644\u0644\u0645\u0643\u0648\u0651\u0646\u0627\u062A \u0627\u0644\u0623\u062E\u0631\u0649."},{type:"code",code:`import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  // Emulated (\u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A): \u064A\u064F\u0636\u064A\u0641 \u0633\u0645\u0627\u062A \u0641\u0631\u064A\u062F\u0629 \u0644\u0644\u0640 CSS selector
  // None: \u0644\u0627 \u062A\u0636\u0645\u064A\u0646 \u2014 \u0627\u0644\u0623\u0646\u0645\u0627\u0637 \u0639\u0627\u0644\u0645\u064A\u0629
  // ShadowDom: Web Components Shadow DOM \u062D\u0642\u064A\u0642\u064A
  encapsulation: ViewEncapsulation.Emulated,
  styles: [\`
    :host {
      display: block;
      border-radius: 8px;
      padding: 16px;
      box-shadow: var(--shadow-md);
    }

    :host(.featured) {
      border: 2px solid var(--color-primary);
    }

    .title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-text);
    }
  \`],
  template: \`
    <h3 class="title">{{ title }}</h3>
    <ng-content />
  \`,
})
export class CardComponent {
  title = input.required<string>();
}`},{type:"heading",text:"CSS Variables \u0648\u0627\u0644\u0633\u0645\u0627\u062A \u0627\u0644\u062F\u064A\u0646\u0627\u0645\u064A\u0643\u064A\u0629"},{type:"code",code:`/* styles.css \u2014 \u0627\u0644\u0645\u062A\u063A\u064A\u0631\u0627\u062A \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 */
:root {
  --color-primary:   #6366f1;
  --color-bg:        #ffffff;
  --color-text:      #1e293b;
  --color-surface:   #f8fafc;
  --shadow-md:       0 4px 6px -1px rgb(0 0 0 / 0.1);
  --border-radius:   8px;
}

[data-theme="dark"] {
  --color-bg:      #0f172a;
  --color-text:    #f1f5f9;
  --color-surface: #1e293b;
}

/* \u0641\u064A Angular \u2014 \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0633\u0645\u0629 \u062F\u064A\u0646\u0627\u0645\u064A\u0643\u064A\u0627\u064B */
// \u0641\u064A ThemeStore.service.ts:
effect(() => {
  const theme = this._theme();
  document.documentElement.setAttribute('data-theme', theme);
});`},{type:"tip",text:"\u0627\u0633\u062A\u062E\u062F\u0645 CSS Variables \u0628\u062F\u0644\u0627\u064B \u0645\u0646 \u062A\u0639\u0631\u064A\u0641 \u0635\u0641\u0648\u0641 .dark-mode \u0639\u0644\u0649 \u0643\u0644 \u0639\u0646\u0635\u0631. \u0628\u062A\u063A\u064A\u064A\u0631 \u0633\u0645\u0629 data-theme \u0639\u0644\u0649 :root \u064A\u062A\u063A\u064A\u0631 \u0627\u0644\u0645\u0638\u0647\u0631 \u0628\u0627\u0644\u0643\u0627\u0645\u0644 \u0641\u0648\u0631\u0627\u064B."},{type:"heading",text:"\u0627\u0644\u0623\u0646\u0645\u0627\u0637 \u0627\u0644\u0634\u0631\u0637\u064A\u0629 (Dynamic Classes)"},{type:"code",code:`@Component({
  template: \`
    <!-- \u0631\u0628\u0637 \u0635\u0641 \u0648\u0627\u062D\u062F -->
    <div [class.active]="isActive()">\u0645\u062D\u062A\u0648\u0649</div>

    <!-- \u0631\u0628\u0637 \u0643\u0627\u0626\u0646 \u0645\u0646 \u0627\u0644\u0635\u0641\u0648\u0641 -->
    <button
      [ngClass]="{
        'btn-primary': isPrimary(),
        'btn-disabled': isDisabled(),
        'btn-lg': size() === 'large'
      }"
    >\u0632\u0631</button>

    <!-- \u0631\u0628\u0637 \u0627\u0644\u0623\u0646\u0645\u0627\u0637 \u0627\u0644\u0645\u0636\u0645\u0651\u0646\u0629 -->
    <div
      [style.background-color]="color()"
      [style.font-size.px]="fontSize()"
    ></div>

    <!-- \u0643\u0627\u0626\u0646 \u0623\u0646\u0645\u0627\u0637 -->
    <div [ngStyle]="{ color: textColor(), opacity: opacity() }"></div>
  \`
})
export class DemoComponent {
  isActive   = signal(false);
  isPrimary  = signal(true);
  isDisabled = signal(false);
  size       = signal<'small' | 'medium' | 'large'>('medium');
  color      = signal('#6366f1');
  fontSize   = signal(16);
  textColor  = signal('red');
  opacity    = signal(0.8);
}`},{type:"heading",text:"\u0625\u0645\u0643\u0627\u0646\u064A\u0629 \u0627\u0644\u0648\u0635\u0648\u0644 (a11y)"},{type:"list",items:["\u0627\u0633\u062A\u062E\u062F\u0645 \u0639\u0646\u0627\u0635\u0631 HTML \u0627\u0644\u062F\u0644\u0627\u0644\u064A\u0629: <button> \u0648\u0644\u064A\u0633 <div> \u0642\u0627\u0628\u0644 \u0644\u0644\u0646\u0642\u0631","\u0623\u0636\u0641 aria-label \u0644\u0644\u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u0628\u062F\u0648\u0646 \u0646\u0635 \u0648\u0627\u0636\u062D (\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0627\u062A)",'\u0623\u0636\u0641 role="alert" \u0644\u0644\u0631\u0633\u0627\u0626\u0644 \u0627\u0644\u062F\u064A\u0646\u0627\u0645\u064A\u0643\u064A\u0629 \u0627\u0644\u062A\u064A \u062A\u062D\u062A\u0627\u062C \u0642\u0631\u0627\u0621\u0629 \u0645\u0646 \u0642\u0650\u0628\u0644 screen readers','aria-live="polite" \u2014 \u064A\u064F\u0639\u0644\u0646 \u0627\u0644\u062A\u063A\u064A\u064A\u0631 \u0639\u0646\u062F \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0645\u0646 \u0627\u0644\u0642\u0631\u0627\u0621\u0629',"aria-expanded \u0648aria-controls \u0644\u0644\u0642\u0648\u0627\u0626\u0645 \u0627\u0644\u0645\u0646\u0633\u062F\u0644\u0629 \u0648\u0627\u0644\u0623\u0643\u0648\u0631\u062F\u064A\u0648\u0646","\u062A\u0623\u0643\u062F \u0623\u0646 tabIndex \u0635\u062D\u064A\u062D \u2014 \u0627\u0644\u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0641\u064A \u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u0645\u0646\u0637\u0642\u064A","\u0644\u0627 \u062A\u064F\u0632\u064A\u0644 outline \u0639\u0644\u0649 :focus \u2014 \u0627\u0633\u062A\u0628\u062F\u0644\u0647 \u0628\u062A\u0635\u0645\u064A\u0645 \u0645\u062E\u0635\u0635 \u0644\u0643\u0646 \u0644\u0627 \u062A\u064F\u062E\u0641\u064A\u0647"]},{type:"code",code:`@Component({
  template: \`
    <!-- \u0632\u0631 \u0645\u0639 \u0646\u0635 \u0645\u062E\u0641\u064A \u0644\u0644\u0640 screen readers -->
    <button (click)="close()" aria-label="\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629">
      <svg>...</svg>
    </button>

    <!-- \u062A\u0646\u0628\u064A\u0647 \u062F\u064A\u0646\u0627\u0645\u064A\u0643\u064A \u2014 screen reader \u064A\u0642\u0631\u0623\u0647 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B -->
    @if (error()) {
      <div role="alert" aria-live="assertive" class="error">
        {{ error() }}
      </div>
    }

    <!-- \u0642\u0627\u0626\u0645\u0629 \u0645\u0646\u0633\u062F\u0644\u0629 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 -->
    <button
      [attr.aria-expanded]="isOpen()"
      [attr.aria-controls]="'dropdown-' + id"
      (click)="toggle()"
    >\u0627\u0644\u0642\u0627\u0626\u0645\u0629</button>

    <ul [id]="'dropdown-' + id" [hidden]="!isOpen()">
      @for (item of items(); track item.id) {
        <li><a [href]="item.url">{{ item.label }}</a></li>
      }
    </ul>
  \`
})
export class AccessibleMenuComponent { ... }`},{type:"heading",text:"\u062F\u0639\u0645 RTL"},{type:"code",code:`/* CSS \u0645\u0646\u0637\u0642\u064A \u2014 \u064A\u0639\u0645\u0644 \u0645\u0639 \u0643\u0644 \u0645\u0646 RTL \u0648LTR */
.card {
  /* \u0628\u062F\u0644\u0627\u064B \u0645\u0646 margin-left / margin-right */
  margin-inline-start: 16px;  /* \u064A\u0633\u0627\u0631 \u0641\u064A LTR\u060C \u064A\u0645\u064A\u0646 \u0641\u064A RTL */
  margin-inline-end:   16px;

  /* \u0628\u062F\u0644\u0627\u064B \u0645\u0646 padding-left / padding-right */
  padding-inline: 24px;
  padding-block:  16px;

  /* \u0628\u062F\u0644\u0627\u064B \u0645\u0646 border-left */
  border-inline-start: 3px solid var(--color-primary);

  /* \u0628\u062F\u0644\u0627\u064B \u0645\u0646 text-align: left */
  text-align: start;
}

/* \u0641\u064A HTML */
/* <html dir="rtl" lang="ar"> \u0623\u0648 <html dir="ltr" lang="en"> */`},{type:"qa",question:"\u0645\u0627 \u0627\u0644\u0641\u0631\u0642 \u0628\u064A\u0646 ViewEncapsulation.Emulated \u0648ViewEncapsulation.None\u061F",answer:"Emulated (\u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A): Angular \u064A\u064F\u0636\u064A\u0641 \u0633\u0645\u0627\u062A \u0641\u0631\u064A\u062F\u0629 \u0644\u0644\u0639\u0646\u0627\u0635\u0631 \u0648\u0627\u0644\u0640 CSS selectors \u0644\u0636\u0645\u0627\u0646 \u0623\u0646 \u0627\u0644\u0623\u0646\u0645\u0627\u0637 \u062A\u0646\u0637\u0628\u0642 \u0641\u0642\u0637 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0645\u0643\u0648\u0651\u0646. None: \u0644\u0627 \u062A\u0636\u0645\u064A\u0646 \u2014 \u0627\u0644\u0623\u0646\u0645\u0627\u0637 \u062A\u0635\u0628\u062D \u0639\u0627\u0644\u0645\u064A\u0629 \u0648\u0642\u062F \u062A\u062A\u0639\u0627\u0631\u0636 \u0645\u0639 \u0645\u0643\u0648\u0651\u0646\u0627\u062A \u0623\u062E\u0631\u0649. \u0627\u0633\u062A\u062E\u062F\u0645 None \u0641\u0642\u0637 \u0625\u0630\u0627 \u0643\u0646\u062A \u062A\u0631\u064A\u062F \u062A\u0635\u0645\u064A\u0645 \u0639\u0627\u0644\u0645\u064A \u0644\u0645\u0643\u0648\u0651\u0646 \u062C\u0630\u0631\u064A \u0645\u062B\u0644 app-root."},{type:"qa",question:"\u0644\u0645\u0627\u0630\u0627 \u0646\u0641\u0636\u0651\u0644 CSS \u0645\u0646\u0637\u0642\u064A (logical CSS) \u0645\u062B\u0644 margin-inline-start \u0628\u062F\u0644\u0627\u064B \u0645\u0646 margin-left\u061F",answer:'\u0644\u0623\u0646 CSS \u0627\u0644\u0645\u0646\u0637\u0642\u064A \u064A\u062A\u0643\u064A\u0641 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0639 \u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0643\u062A\u0627\u0628\u0629. margin-inline-start \u064A\u0639\u0646\u064A "\u064A\u0633\u0627\u0631 \u0641\u064A \u0627\u062A\u062C\u0627\u0647 LTR" \u0648"\u064A\u0645\u064A\u0646 \u0641\u064A \u0627\u062A\u062C\u0627\u0647 RTL" \u2014 \u062A\u0643\u062A\u0628 \u0627\u0644\u0643\u0648\u062F \u0645\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 \u0648\u064A\u0639\u0645\u0644 \u0641\u064A \u0643\u0644\u0627 \u0627\u0644\u0627\u062A\u062C\u0627\u0647\u064A\u0646 \u062F\u0648\u0646 \u0634\u0631\u0637 @if \u0623\u0648 dir.'}],contentEn:[{type:"heading",text:"Component Style Encapsulation"},{type:"paragraph",text:"Angular encapsulates component styles by default (Emulated ViewEncapsulation) \u2014 styles do not leak to other components."},{type:"code",code:`import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  // Emulated (default): Angular adds unique attributes to CSS selectors
  // None: no encapsulation \u2014 styles become global
  // ShadowDom: real Web Components Shadow DOM
  encapsulation: ViewEncapsulation.Emulated,
  styles: [\`
    :host {
      display: block;
      border-radius: 8px;
      padding: 16px;
      box-shadow: var(--shadow-md);
    }

    :host(.featured) {
      border: 2px solid var(--color-primary);
    }

    .title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-text);
    }
  \`],
  template: \`<h3 class="title">{{ title }}</h3><ng-content />\`,
})
export class CardComponent {
  title = input.required<string>();
}`},{type:"heading",text:"CSS Variables and Dynamic Theming"},{type:"code",code:`/* styles.css \u2014 global variables */
:root {
  --color-primary:   #6366f1;
  --color-bg:        #ffffff;
  --color-text:      #1e293b;
  --color-surface:   #f8fafc;
  --shadow-md:       0 4px 6px -1px rgb(0 0 0 / 0.1);
}

[data-theme="dark"] {
  --color-bg:      #0f172a;
  --color-text:    #f1f5f9;
  --color-surface: #1e293b;
}

/* In Angular \u2014 apply theme dynamically from ThemeStore */
effect(() => {
  const theme = this._theme();
  document.documentElement.setAttribute('data-theme', theme);
});`},{type:"tip",text:"Use CSS Variables instead of adding .dark-mode classes to every element. Changing data-theme on :root instantly switches the entire theme."},{type:"heading",text:"Dynamic Classes and Styles"},{type:"code",code:`@Component({
  template: \`
    <!-- Single class binding -->
    <div [class.active]="isActive()">Content</div>

    <!-- Object of classes -->
    <button
      [ngClass]="{
        'btn-primary':  isPrimary(),
        'btn-disabled': isDisabled(),
        'btn-lg':       size() === 'large'
      }"
    >Button</button>

    <!-- Inline style binding -->
    <div
      [style.background-color]="color()"
      [style.font-size.px]="fontSize()"
    ></div>
  \`
})
export class DemoComponent {
  isActive   = signal(false);
  isPrimary  = signal(true);
  isDisabled = signal(false);
  size       = signal<'small' | 'medium' | 'large'>('medium');
  color      = signal('#6366f1');
  fontSize   = signal(16);
}`},{type:"heading",text:"Accessibility (a11y)"},{type:"list",items:["Use semantic HTML elements: <button> not a clickable <div>","Add aria-label to interactive elements without visible text (icons)",'Add role="alert" to dynamic messages that need to be read by screen readers','aria-live="polite" \u2014 announces changes when the user finishes their current task',"aria-expanded and aria-controls for dropdowns and accordions","Ensure correct tabIndex \u2014 interactive elements must follow logical tab order","Never remove :focus outline \u2014 replace it with a custom style but never hide it"]},{type:"code",code:`@Component({
  template: \`
    <!-- Button with hidden text for screen readers -->
    <button (click)="close()" aria-label="Close dialog">
      <svg>...</svg>
    </button>

    <!-- Dynamic alert \u2014 screen reader reads it automatically -->
    @if (error()) {
      <div role="alert" aria-live="assertive" class="error">
        {{ error() }}
      </div>
    }

    <!-- Accessible dropdown -->
    <button
      [attr.aria-expanded]="isOpen()"
      [attr.aria-controls]="'dropdown-' + id"
      (click)="toggle()"
    >Menu</button>

    <ul [id]="'dropdown-' + id" [hidden]="!isOpen()">
      @for (item of items(); track item.id) {
        <li><a [href]="item.url">{{ item.label }}</a></li>
      }
    </ul>
  \`
})
export class AccessibleMenuComponent { ... }`},{type:"heading",text:"RTL Support"},{type:"code",code:`/* Logical CSS \u2014 works with both RTL and LTR */
.card {
  /* Instead of margin-left / margin-right */
  margin-inline-start: 16px;  /* left in LTR, right in RTL */
  margin-inline-end:   16px;

  /* Instead of padding-left / padding-right */
  padding-inline: 24px;
  padding-block:  16px;

  /* Instead of border-left */
  border-inline-start: 3px solid var(--color-primary);

  /* Instead of text-align: left */
  text-align: start;
}

/* In HTML */
/* <html dir="rtl" lang="ar"> or <html dir="ltr" lang="en"> */`},{type:"qa",question:"What is the difference between ViewEncapsulation.Emulated and ViewEncapsulation.None?",answer:"Emulated (default): Angular adds unique attributes to elements and CSS selectors, ensuring styles only apply to this component. None: no encapsulation \u2014 styles become global and may conflict with other components. Only use None for a root component like app-root that intentionally provides global styles."},{type:"qa",question:"Why prefer logical CSS (margin-inline-start) over margin-left?",answer:'Logical CSS automatically adapts to writing direction. margin-inline-start means "left in LTR" and "right in RTL" \u2014 you write the code once and it works in both directions without @if conditions or dir checks.'}]};export{e as default};
