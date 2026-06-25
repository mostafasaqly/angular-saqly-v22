import"./chunk-JS3ZFT6L.js";var e={id:8,title:"Signals \u0627\u0644\u0645\u062A\u0642\u062F\u0645\u0629",titleEn:"Advanced Signals",level:"\u0645\u062A\u0648\u0633\u0637 \u2013 \u0645\u062A\u0642\u062F\u0645",levelEn:"Intermediate\u2013Advanced",intro:"\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u064A\u0623\u062E\u0630 Signals \u0625\u0644\u0649 \u0645\u0633\u062A\u0648\u0649 \u0623\u0639\u0645\u0642: \u0645\u062F\u062E\u0644\u0627\u062A Signal (input.required\u060C transforms)\u060C model inputs\u060C \u0627\u0633\u062A\u0639\u0644\u0627\u0645\u0627\u062A Signal (viewChild\u060C contentChild)\u060C linkedSignal\u060C \u0648Resource API \u0644\u062C\u0644\u0628 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0634\u0643\u0644 \u062A\u0635\u0631\u064A\u062D\u064A.",introEn:"This section takes Signals deeper: signal inputs (input.required, transforms), model inputs for two-way binding, signal queries (viewChild, contentChild), linkedSignal, and the Resource API for declarative async data fetching.",lessons:["Signal Inputs","input.required and Transforms","model() \u2014 Two-Way Binding","Signal Queries (viewChild, contentChild)","linkedSignal","Resource API \u2014 httpResource()","Async Patterns with Signals","Common Signal Mistakes"],lessonsEn:["Signal Inputs","input.required and Transforms","model() \u2014 Two-Way Binding","Signal Queries (viewChild, contentChild)","linkedSignal","Resource API \u2014 httpResource()","Async Patterns with Signals","Common Signal Mistakes"],content:[{type:"heading",text:"\u0645\u062F\u062E\u0644\u0627\u062A Signal (Signal Inputs)"},{type:"paragraph",text:"\u0628\u062F\u0644\u0627\u064B \u0645\u0646 @Input() \u0627\u0644\u0643\u0644\u0627\u0633\u064A\u0643\u064A\u060C Angular v22 \u064A\u0648\u0641\u0631 input() \u0627\u0644\u0630\u064A \u064A\u064F\u0631\u062C\u0639 Signal \u0645\u0628\u0627\u0634\u0631\u0629\u064B. \u0647\u0630\u0627 \u064A\u064F\u0645\u0643\u0651\u0646\u0643 \u0645\u0646 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0645\u062F\u062E\u0644 \u0641\u064A computed() \u0648effect() \u062F\u0648\u0646 \u0627\u0644\u062D\u0627\u062C\u0629 \u0644\u0640 ngOnChanges."},{type:"code",code:`import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { booleanAttribute, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe],
  template: \`
    <div [class.featured]="featured()">
      <h3>{{ name() }}</h3>
      <p>{{ formattedPrice() }}</p>
      @if (discount() > 0) {
        <span class="badge">{{ discount() }}% \u062E\u0635\u0645</span>
      }
    </div>
  \`
})
export class ProductCardComponent {
  name     = input.required<string>();
  price    = input.required<number>();
  currency = input<string>('USD');
  discount = input(0, { transform: numberAttribute });   // "10" \u2192 10
  featured = input(false, { transform: booleanAttribute }); // "" \u2192 true

  formattedPrice = computed(() =>
    new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: this.currency(),
    }).format(this.price())
  );
}`},{type:"heading",text:"model() \u2014 \u0631\u0628\u0637 \u062B\u0646\u0627\u0626\u064A \u0627\u0644\u0627\u062A\u062C\u0627\u0647"},{type:"paragraph",text:"model() \u0647\u0648 Signal \u062E\u0627\u0635 \u064A\u0645\u0643\u0646 \u0644\u0644\u0623\u0628 \u0631\u0628\u0637\u0647 \u0628\u0635\u064A\u063A\u0629 [( )] (\u062B\u0646\u0627\u0626\u064A \u0627\u0644\u0627\u062A\u062C\u0627\u0647). \u0627\u0644\u0627\u0628\u0646 \u064A\u0642\u0631\u0623\u0647 \u0648\u064A\u0639\u062F\u0651\u0644\u0647\u060C \u0648\u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u062A\u0646\u062A\u0634\u0631 \u0644\u0644\u0623\u0639\u0644\u0649 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B."},{type:"code",code:`import { Component, model, ChangeDetectionStrategy } from '@angular/core';

// \u0645\u0643\u0648\u0651\u0646 \u0627\u0644\u0627\u0628\u0646
@Component({
  selector: 'app-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <button (click)="toggle()" [class.active]="checked()">
      {{ checked() ? '\u062A\u0641\u0639\u064A\u0644' : '\u062A\u0639\u0637\u064A\u0644' }}
    </button>
  \`
})
export class ToggleComponent {
  checked = model(false);   // model Signal \u2014 \u0642\u0627\u0628\u0644 \u0644\u0644\u0642\u0631\u0627\u0621\u0629 \u0648\u0627\u0644\u0643\u062A\u0627\u0628\u0629

  toggle() {
    this.checked.update(v => !v);
  }
}

// \u0645\u0643\u0648\u0651\u0646 \u0627\u0644\u0623\u0628
@Component({
  standalone: true,
  imports: [ToggleComponent],
  template: \`
    <app-toggle [(checked)]="darkMode" />
    <p>\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0644\u064A\u0644\u064A: {{ darkMode() }}</p>
  \`
})
export class SettingsComponent {
  darkMode = signal(false);
}`},{type:"heading",text:"\u0627\u0633\u062A\u0639\u0644\u0627\u0645\u0627\u062A Signal (viewChild\u060C contentChild)"},{type:"paragraph",text:"viewChild() \u0648contentChild() \u0647\u0645\u0627 \u0628\u062F\u064A\u0644 v22 \u0644\u0640 @ViewChild \u0648 @ContentChild \u2014 \u064A\u064F\u0631\u062C\u0639\u0627\u0646 Signals \u0628\u062F\u0644\u0627\u064B \u0645\u0646 \u062E\u0635\u0627\u0626\u0635 \u0639\u0627\u062F\u064A\u0629."},{type:"code",code:`import { Component, viewChild, contentChild, ElementRef,
         AfterViewInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-autofocus',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <input #emailInput type="email" placeholder="\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A" />
    <button (click)="clearAndFocus()">\u0645\u0633\u062D</button>
  \`
})
export class AutofocusComponent implements AfterViewInit {
  // Signal query \u2014 \u064A\u064F\u0631\u062C\u0639 Signal \u064A\u062D\u0645\u0644 \u0627\u0644\u0639\u0646\u0635\u0631
  emailInput = viewChild.required<ElementRef<HTMLInputElement>>('emailInput');

  ngAfterViewInit(): void {
    this.emailInput().nativeElement.focus();
  }

  clearAndFocus(): void {
    const el = this.emailInput().nativeElement;
    el.value = '';
    el.focus();
  }
}`},{type:"heading",text:"linkedSignal"},{type:"paragraph",text:'linkedSignal \u0647\u0648 Signal \u0645\u0631\u062A\u0628\u0637 \u0628\u0640 Signal \u0622\u062E\u0631 \u2014 \u064A\u062A\u062D\u062F\u062B \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u064A\u0629\u060C \u0644\u0643\u0646 \u064A\u0645\u0643\u0646 \u0627\u0644\u0643\u062A\u0627\u0628\u0629 \u0639\u0644\u064A\u0647 \u064A\u062F\u0648\u064A\u0627\u064B \u0623\u064A\u0636\u0627\u064B. \u0645\u062B\u0627\u0644\u064A \u0644\u0640 "\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0639\u064A\u064A\u0646 \u0639\u0646\u062F \u0627\u0644\u062A\u063A\u064A\u064A\u0631".'},{type:"code",code:`import { Component, signal, linkedSignal, computed, ChangeDetectionStrategy } from '@angular/core';

const countries = {
  '\u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629': ['\u0627\u0644\u0631\u064A\u0627\u0636', '\u062C\u062F\u0629', '\u0627\u0644\u062F\u0645\u0627\u0645'],
  '\u0645\u0635\u0631': ['\u0627\u0644\u0642\u0627\u0647\u0631\u0629', '\u0627\u0644\u0625\u0633\u0643\u0646\u062F\u0631\u064A\u0629', '\u0623\u0633\u064A\u0648\u0637'],
  '\u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062A': ['\u062F\u0628\u064A', '\u0623\u0628\u0648\u0638\u0628\u064A', '\u0627\u0644\u0634\u0627\u0631\u0642\u0629'],
};

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <select (change)="selectedCountry.set($any($event.target).value)">
      @for (c of countriesList; track c) {
        <option [value]="c">{{ c }}</option>
      }
    </select>

    <select (change)="selectedCity.set($any($event.target).value)">
      @for (city of filteredCities(); track city) {
        <option [value]="city">{{ city }}</option>
      }
    </select>
  \`
})
export class LocationPickerComponent {
  countriesList = Object.keys(countries);
  selectedCountry = signal('\u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629');

  filteredCities = computed(() => countries[this.selectedCountry() as keyof typeof countries] ?? []);

  // \u064A\u062A\u062D\u062F\u062B \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u062F\u0648\u0644\u0629\u060C \u0644\u0643\u0646 \u064A\u0645\u0643\u0646 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u062A\u0639\u062F\u064A\u0644\u0647
  selectedCity = linkedSignal(() => this.filteredCities()[0]);
}`},{type:"heading",text:"Resource API \u2014 httpResource()"},{type:"paragraph",text:"httpResource() \u0637\u0631\u064A\u0642\u0629 \u062A\u0635\u0631\u064A\u062D\u064A\u0629 \u0644\u062C\u0644\u0628 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A. \u0645\u0631\u0651\u0631 Signal \u064A\u064F\u062D\u062F\u062F \u0627\u0644\u0640 URL\u060C \u0648\u0627\u062D\u0635\u0644 \u0639\u0644\u0649 \u0643\u0627\u0626\u0646 \u0628\u0640 Signals: value\u060C isLoading\u060C error. \u064A\u064F\u0639\u064A\u062F \u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0640 URL."},{type:"code",code:`import { Component, signal, input, ChangeDetectionStrategy } from '@angular/core';
import { httpResource } from '@angular/common/http';

interface Post { id: number; title: string; body: string; }

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <select (change)="userId.set(+$any($event.target).value)">
      @for (id of [1,2,3,4,5]; track id) {
        <option [value]="id">\u0645\u0633\u062A\u062E\u062F\u0645 {{ id }}</option>
      }
    </select>

    @if (posts.isLoading()) {
      <p>\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p>
    } @else if (posts.error()) {
      <p class="error">\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644</p>
    } @else {
      @for (post of posts.value(); track post.id) {
        <div class="post-card">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </div>
      }
    }

    <button (click)="posts.reload()">\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u062D\u0645\u064A\u0644</button>
  \`
})
export class PostsComponent {
  userId = signal(1);

  posts = httpResource<Post[]>(
    () => \`https://jsonplaceholder.typicode.com/posts?userId=\${this.userId()}\`
  );
}`},{type:"tip",text:"httpResource() \u064A\u064F\u0639\u064A\u062F \u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0640 URL Signal. \u0644\u0627 \u062A\u062D\u062A\u0627\u062C \u0644\u0640 subscribe() \u0623\u0648 ngOnInit()."},{type:"heading",text:"\u0627\u0644\u0623\u062E\u0637\u0627\u0621 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0641\u064A Signals"},{type:"list",items:["\u0627\u0633\u062A\u062E\u062F\u0627\u0645 effect() \u0644\u0644\u0642\u064A\u0645 \u0627\u0644\u0645\u0634\u062A\u0642\u0629 \u2014 \u0627\u0633\u062A\u062E\u062F\u0645 computed() \u0628\u062F\u0644\u0627\u064B \u0645\u0646 \u0630\u0644\u0643","\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0635\u0641\u0648\u0641\u0627\u062A \u0641\u064A \u0645\u0643\u0627\u0646\u0647\u0627 (.push) \u0628\u062F\u0644\u0627\u064B \u0645\u0646 \u0625\u0646\u0634\u0627\u0621 \u0645\u0631\u062C\u0639\u064A\u0629 \u062C\u062F\u064A\u062F\u0629","\u0625\u0646\u0634\u0627\u0621 signal() \u062F\u0627\u062E\u0644 \u062A\u0639\u0628\u064A\u0631\u0627\u062A \u0627\u0644\u0642\u0627\u0644\u0628 \u2014 \u0623\u0646\u0634\u0626\u0647\u0627 \u0641\u064A \u0627\u0644\u0641\u0626\u0629","\u0639\u062F\u0645 \u0643\u0634\u0641 Signal \u0644\u0644\u0642\u0631\u0627\u0621\u0629 \u0641\u0642\u0637 \u0645\u0646 Services \u2014 \u0627\u0633\u062A\u062E\u062F\u0645 .asReadonly()","\u0642\u0631\u0627\u0621\u0629 signal \u062F\u0627\u062E\u0644 ngOnInit \u0628\u062F\u0644\u0627\u064B \u0645\u0646 computed() \u0644\u0644\u0642\u064A\u0645 \u0627\u0644\u0645\u0634\u062A\u0642\u0629"]},{type:"qa",question:"\u0645\u0627 \u0627\u0644\u0641\u0631\u0642 \u0628\u064A\u0646 input() \u0648model()\u061F",answer:'input() \u0644\u0644\u0645\u062F\u062E\u0644\u0627\u062A \u0627\u0644\u0648\u0627\u0631\u062F\u0629 \u0641\u0642\u0637 \u2014 \u0627\u0644\u0623\u0628 \u064A\u064F\u0645\u0631\u0651\u0631 \u0642\u064A\u0645\u0629\u060C \u0627\u0644\u0627\u0628\u0646 \u064A\u0642\u0631\u0623\u0647\u0627 (Signal \u0644\u0644\u0642\u0631\u0627\u0621\u0629 \u0641\u0642\u0637). model() \u0644\u0644\u0631\u0628\u0637 \u0627\u0644\u062B\u0646\u0627\u0626\u064A \u2014 \u0627\u0644\u0623\u0628 \u064A\u064F\u0645\u0631\u0651\u0631 \u0642\u064A\u0645\u0629 \u0648\u0627\u0644\u0627\u0628\u0646 \u064A\u0645\u0643\u0646\u0647 \u062A\u0639\u062F\u064A\u0644\u0647\u0627 \u0648\u062A\u0631\u062A\u0641\u0639 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0644\u0644\u0623\u0639\u0644\u0649 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B. \u0627\u0644\u0623\u0628 \u064A\u0633\u062A\u062E\u062F\u0645 [(property)]="signal" \u0645\u0639 model().'},{type:"qa",question:"\u0645\u0627 \u0627\u0644\u0641\u0627\u0626\u062F\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 \u0645\u0646 httpResource() \u0645\u0642\u0627\u0631\u0646\u0629 \u0628\u0640 HttpClient.get()\u061F",answer:"httpResource() \u062A\u0635\u0631\u064A\u062D\u064A \u2014 \u0645\u0631\u0651\u0631 Signal \u0644\u0644\u0640 URL\u060C \u0648\u0627\u062D\u0635\u0644 \u0645\u0628\u0627\u0634\u0631\u0629\u064B \u0639\u0644\u0649 value()\u060C isLoading()\u060C \u0648error() \u0643\u0640 Signals. \u064A\u064F\u0639\u064A\u062F \u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0640 URL. HttpClient.get() \u064A\u064F\u0631\u062C\u0639 Observable \u064A\u062D\u062A\u0627\u062C \u0644\u0640 subscribe \u064A\u062F\u0648\u064A \u0648\u0625\u062F\u0627\u0631\u0629 \u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u0648\u0627\u0644\u0623\u062E\u0637\u0627\u0621 \u0628\u0646\u0641\u0633\u0643."}],contentEn:[{type:"heading",text:"Signal Inputs"},{type:"paragraph",text:"Instead of the classic @Input() decorator, Angular v22 provides input() which returns a Signal directly. This lets you use the input in computed() and effect() without needing ngOnChanges."},{type:"code",code:`import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { booleanAttribute, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <div [class.featured]="featured()">
      <h3>{{ name() }}</h3>
      <p>{{ formattedPrice() }}</p>
      @if (discount() > 0) {
        <span class="badge">{{ discount() }}% off</span>
      }
    </div>
  \`
})
export class ProductCardComponent {
  name     = input.required<string>();
  price    = input.required<number>();
  currency = input<string>('USD');
  discount = input(0, { transform: numberAttribute });     // "10" \u2192 10
  featured = input(false, { transform: booleanAttribute }); // "" \u2192 true

  formattedPrice = computed(() =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: this.currency(),
    }).format(this.price())
  );
}`},{type:"heading",text:"model() \u2014 Two-Way Binding"},{type:"paragraph",text:"model() is a special Signal the parent can bind with [( )] syntax (two-way). The child reads and updates it, and changes propagate upward automatically."},{type:"code",code:`import { Component, model, ChangeDetectionStrategy } from '@angular/core';

// Child component
@Component({
  selector: 'app-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <button (click)="toggle()" [class.active]="checked()">
      {{ checked() ? 'On' : 'Off' }}
    </button>
  \`
})
export class ToggleComponent {
  checked = model(false);   // model Signal \u2014 readable and writable

  toggle() {
    this.checked.update(v => !v);
  }
}

// Parent component
@Component({
  standalone: true,
  imports: [ToggleComponent],
  template: \`
    <app-toggle [(checked)]="darkMode" />
    <p>Dark mode: {{ darkMode() }}</p>
  \`
})
export class SettingsComponent {
  darkMode = signal(false);
}`},{type:"heading",text:"Signal Queries (viewChild, contentChild)"},{type:"paragraph",text:"viewChild() and contentChild() are the v22 replacements for @ViewChild and @ContentChild \u2014 they return Signals instead of plain properties."},{type:"code",code:`import { Component, viewChild, ElementRef,
         AfterViewInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-autofocus',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <input #emailInput type="email" placeholder="Email" />
    <button (click)="clearAndFocus()">Clear</button>
  \`
})
export class AutofocusComponent implements AfterViewInit {
  // Signal query \u2014 returns a Signal holding the element
  emailInput = viewChild.required<ElementRef<HTMLInputElement>>('emailInput');

  ngAfterViewInit(): void {
    this.emailInput().nativeElement.focus();
  }

  clearAndFocus(): void {
    const el = this.emailInput().nativeElement;
    el.value = '';
    el.focus();
  }
}`},{type:"heading",text:"linkedSignal"},{type:"paragraph",text:'linkedSignal is a Signal linked to another Signal \u2014 it auto-updates when the dependency changes, but can also be written to manually. Perfect for "reset on change" patterns.'},{type:"code",code:`import { Component, signal, linkedSignal, computed, ChangeDetectionStrategy } from '@angular/core';

const countries = {
  'Saudi Arabia': ['Riyadh', 'Jeddah', 'Dammam'],
  'Egypt': ['Cairo', 'Alexandria', 'Assiut'],
  'UAE': ['Dubai', 'Abu Dhabi', 'Sharjah'],
};

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <select (change)="selectedCountry.set($any($event.target).value)">
      @for (c of countriesList; track c) {
        <option [value]="c">{{ c }}</option>
      }
    </select>

    <select (change)="selectedCity.set($any($event.target).value)">
      @for (city of filteredCities(); track city) {
        <option [value]="city">{{ city }}</option>
      }
    </select>
  \`
})
export class LocationPickerComponent {
  countriesList = Object.keys(countries);
  selectedCountry = signal('Saudi Arabia');

  filteredCities = computed(() =>
    countries[this.selectedCountry() as keyof typeof countries] ?? []
  );

  // Auto-resets when country changes, but user can still pick any city
  selectedCity = linkedSignal(() => this.filteredCities()[0]);
}`},{type:"heading",text:"Resource API \u2014 httpResource()"},{type:"paragraph",text:"httpResource() is a declarative way to fetch data. Pass a Signal that determines the URL, get back an object with Signals: value, isLoading, error. It auto-reloads when the URL Signal changes."},{type:"code",code:`import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { httpResource } from '@angular/common/http';

interface Post { id: number; title: string; body: string; }

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <select (change)="userId.set(+$any($event.target).value)">
      @for (id of [1,2,3,4,5]; track id) {
        <option [value]="id">User {{ id }}</option>
      }
    </select>

    @if (posts.isLoading()) {
      <p>Loading...</p>
    } @else if (posts.error()) {
      <p class="error">Failed to load</p>
    } @else {
      @for (post of posts.value(); track post.id) {
        <div class="post-card">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </div>
      }
    }

    <button (click)="posts.reload()">Reload</button>
  \`
})
export class PostsComponent {
  userId = signal(1);

  posts = httpResource<Post[]>(
    () => \`https://jsonplaceholder.typicode.com/posts?userId=\${this.userId()}\`
  );
}`},{type:"tip",text:"httpResource() auto-reloads when the URL Signal changes. No subscribe(), no ngOnInit() needed."},{type:"heading",text:"Common Signal Mistakes"},{type:"list",items:["Using effect() for derived values \u2014 use computed() instead","Mutating arrays in place (.push()) instead of creating a new reference","Creating signal() inside template expressions \u2014 create them in the class","Not exposing read-only signals from services \u2014 use .asReadonly()","Reading signals in ngOnInit for derived values \u2014 use computed() instead"]},{type:"qa",question:"What is the difference between input() and model()?",answer:'input() is for incoming data only \u2014 the parent passes a value, the child reads it (read-only Signal). model() is for two-way binding \u2014 the parent passes a value and the child can update it, with changes propagating upward automatically. The parent uses [(property)]="signal" syntax with model().'},{type:"qa",question:"What is the main advantage of httpResource() over HttpClient.get()?",answer:"httpResource() is declarative \u2014 pass a URL Signal, get value(), isLoading(), and error() back as Signals. It auto-reloads when the URL changes. HttpClient.get() returns a cold Observable that needs manual subscribe(), and you must manage loading/error state yourself."}]};export{e as default};
