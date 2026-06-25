import"./chunk-JS3ZFT6L.js";var e={id:5,title:"\u0627\u0644\u062A\u062D\u0643\u0645 \u0641\u064A \u0627\u0644\u062A\u062F\u0641\u0642",titleEn:"Control Flow in Angular",level:"\u0645\u0628\u062A\u062F\u0626 \u2013 \u0645\u062A\u0648\u0633\u0637",levelEn:"Beginner\u2013Intermediate",intro:"Angular v17 \u0627\u0633\u062A\u0628\u062F\u0644 \u0627\u0644\u0645\u0648\u062C\u0651\u0647\u0627\u062A \u0627\u0644\u0647\u064A\u0643\u0644\u064A\u0629 \u0627\u0644\u0642\u062F\u064A\u0645\u0629 (*ngIf\u060C *ngFor\u060C *ngSwitch) \u0628\u0635\u064A\u0627\u063A\u0629 \u062A\u062D\u0643\u0645 \u0645\u0628\u0646\u064A\u0629 \u0639\u0644\u0649 \u0643\u062A\u0644 \u0645\u0628\u0627\u0634\u0631\u0629 \u0641\u064A \u0627\u0644\u0642\u0627\u0644\u0628. \u0627\u0644\u0635\u064A\u0627\u063A\u0629 \u0627\u0644\u062C\u062F\u064A\u062F\u0629 \u0623\u0643\u062B\u0631 \u0642\u0627\u0628\u0644\u064A\u0629 \u0644\u0644\u0642\u0631\u0627\u0621\u0629\u060C \u0648\u0623\u0633\u0631\u0639 (\u0627\u0644\u0645\u062A\u0631\u062C\u0645 \u064A\u064F\u062D\u0633\u0651\u0646\u0647\u0627 \u062B\u0627\u0628\u062A\u064A\u0627\u064B)\u060C \u0648\u0644\u0627 \u062A\u062D\u062A\u0627\u062C \u0644\u0623\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F\u0627\u062A.",introEn:"Angular v17 replaced old structural directives (*ngIf, *ngFor, *ngSwitch) with built-in block-based control flow syntax that lives directly in the template. The new syntax is more readable, faster (the compiler can optimize it statically), and requires no imports.",lessons:["\u0645\u0642\u062F\u0645\u0629 \u0644\u0644\u062A\u062D\u0643\u0645 \u0641\u064A \u062A\u062F\u0641\u0642 Angular","@if \u2014 \u0627\u0644\u062A\u062D\u0643\u0645 \u0627\u0644\u0634\u0631\u0637\u064A","@else \u0648 @else if","@for \u2014 \u0627\u0644\u062A\u0643\u0631\u0627\u0631","track \u0641\u064A @for","@empty \u2014 \u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0641\u0627\u0631\u063A\u0629","@switch \u2014 \u0627\u0644\u062A\u0628\u062F\u064A\u0644","\u0627\u0644\u062A\u0631\u062D\u064A\u0644 \u0645\u0646 *ngIf \u0648 *ngFor"],lessonsEn:["Introduction to Angular Control Flow","@if \u2014 Conditional Rendering","@else and @else if","@for \u2014 Iteration","track in @for","@empty \u2014 Empty State","@switch \u2014 Switch Statement","Migrating from *ngIf and *ngFor"],content:[{type:"heading",text:"\u0645\u0642\u062F\u0645\u0629 \u0644\u0644\u062A\u062D\u0643\u0645 \u0641\u064A \u062A\u062F\u0641\u0642 Angular"},{type:"paragraph",text:"\u0642\u0628\u0644 Angular v17\u060C \u0643\u0627\u0646 \u0627\u0644\u062A\u062D\u0643\u0645 \u0627\u0644\u0634\u0631\u0637\u064A \u0648\u062A\u0643\u0631\u0627\u0631 \u0627\u0644\u0642\u0648\u0627\u0626\u0645 \u064A\u062A\u0637\u0644\u0628\u0627\u0646 \u0645\u0648\u062C\u0651\u0647\u0627\u062A \u0647\u064A\u0643\u0644\u064A\u0629 \u062E\u0627\u0635\u0629 \u062A\u0628\u062F\u0623 \u0628\u0640 *. \u0627\u0644\u0635\u064A\u0627\u063A\u0629 \u0627\u0644\u062C\u062F\u064A\u062F\u0629 \u062A\u064F\u0632\u064A\u0644 \u0643\u0644 \u0630\u0644\u0643."},{type:"code",code:`<!-- \u0627\u0644\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0642\u062F\u064A\u0645\u0629 (\u0644\u0627 \u062A\u0632\u0627\u0644 \u062A\u0639\u0645\u0644 \u0644\u0643\u0646 \u063A\u064A\u0631 \u0645\u0634\u062C\u0651\u0639\u0629) -->
<div *ngIf="isLoggedIn">\u0645\u0631\u062D\u0628\u0627\u064B!</div>
<li *ngFor="let item of items; trackBy: trackById">{{ item.name }}</li>

<!-- \u0627\u0644\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062C\u062F\u064A\u062F\u0629 (v17+\u060C \u0625\u0644\u0632\u0627\u0645\u064A\u0629 \u0641\u064A v22) -->
@if (isLoggedIn()) {
  <div>\u0645\u0631\u062D\u0628\u0627\u064B!</div>
}
@for (item of items(); track item.id) {
  <li>{{ item.name }}</li>
}`},{type:"list",items:["\u0644\u0627 \u064A\u0648\u062C\u062F \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u0637\u0644\u0648\u0628 \u2014 \u0627\u0644\u0635\u064A\u0627\u063A\u0629 \u0645\u062F\u0645\u062C\u0629 \u0641\u064A \u0627\u0644\u0645\u062A\u0631\u062C\u0645","\u062A\u062D\u0644\u064A\u0644 \u062B\u0627\u0628\u062A \u0623\u0641\u0636\u0644 \u0645\u0646 \u0627\u0644\u0645\u062A\u0631\u062C\u0645","\u062A\u0636\u064A\u064A\u0642 \u0623\u0646\u0648\u0627\u0639 TypeScript \u0627\u0644\u0643\u0627\u0645\u0644 \u062F\u0627\u062E\u0644 \u0627\u0644\u0643\u062A\u0644","\u062F\u0639\u0645 @empty \u0645\u062F\u0645\u062C (\u0644\u0627 \u064A\u062D\u062A\u0627\u062C \u0644\u0640 *ngIf \u0645\u0646\u0641\u0635\u0644)"]},{type:"heading",text:"@if \u2014 \u0627\u0644\u062A\u062D\u0643\u0645 \u0627\u0644\u0634\u0631\u0637\u064A"},{type:"paragraph",text:"@if \u064A\u064F\u0635\u064A\u0651\u0631 \u0645\u062D\u062A\u0648\u0627\u0647 \u0639\u0646\u062F\u0645\u0627 \u064A\u0643\u0648\u0646 \u0627\u0644\u0634\u0631\u0637 \u0635\u062D\u064A\u062D\u0627\u064B (truthy)."},{type:"code",code:`@if (isLoggedIn()) {
  <div class="banner">\u0645\u0631\u062D\u0628\u0627\u064B\u060C {{ username() }}!</div>
}

@if (items().length > 0) {
  <p>\u0644\u062F\u064A\u0643 {{ items().length }} \u0639\u0646\u0635\u0631</p>
}

@if (product()?.inStock) {
  <button>\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629</button>
}`},{type:"tip",text:"@if \u064A\u064F\u0636\u064A\u0651\u0642 \u0623\u0646\u0648\u0627\u0639 TypeScript \u062F\u0627\u062E\u0644 \u0627\u0644\u0643\u062A\u0644\u0629 \u062A\u0645\u0627\u0645\u0627\u064B \u0645\u062B\u0644 \u062C\u0645\u0644\u0629 if \u0627\u0644\u0639\u0627\u062F\u064A\u0629. \u0625\u0630\u0627 \u0643\u0627\u0646 \u0627\u0644\u0646\u0648\u0639 User | null\u060C \u0641\u062F\u0627\u062E\u0644 @if \u0633\u064A\u0639\u0631\u0641\u0647 Angular \u0643\u0640 User."},{type:"heading",text:"@else \u0648 @else if"},{type:"paragraph",text:"\u0627\u0633\u062A\u062E\u062F\u0645 @else if \u0644\u0633\u0644\u0633\u0644\u0629 \u0627\u0644\u0634\u0631\u0648\u0637 \u0648 @else \u0643\u062D\u0627\u0644\u0629 \u0627\u062D\u062A\u064A\u0627\u0637\u064A\u0629."},{type:"code",code:`@if (status() === 'loading') {
  <app-spinner />
} @else if (status() === 'error') {
  <app-error-message [message]="errorMessage()" />
} @else if (status() === 'empty') {
  <p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C.</p>
} @else {
  <app-results [data]="results()" />
}`},{type:"heading",text:"@for \u2014 \u0627\u0644\u062A\u0643\u0631\u0627\u0631"},{type:"paragraph",text:"@for \u064A\u0643\u0631\u0631 \u0639\u0628\u0631 \u0645\u0635\u0641\u0648\u0641\u0629 (\u0623\u0648 \u0623\u064A iterable) \u0648\u064A\u064F\u0635\u064A\u0651\u0631 \u0643\u062A\u0644\u0629 \u0627\u0644\u0642\u0627\u0644\u0628 \u0644\u0643\u0644 \u0639\u0646\u0635\u0631."},{type:"code",code:`@for (product of products(); track product.id) {
  <div class="card">{{ product.name }}</div>
}

<!-- \u0645\u062A\u063A\u064A\u0631\u0627\u062A \u0627\u0644\u0633\u064A\u0627\u0642 \u0627\u0644\u0645\u062A\u0627\u062D\u0629 -->
@for (item of items(); track item.id; let i = $index, last = $last) {
  <div [class.last]="last">
    {{ i + 1 }}. {{ item.name }}
  </div>
}`},{type:"list",items:["$index \u2014 \u0627\u0644\u0641\u0647\u0631\u0633 (\u064A\u0628\u062F\u0623 \u0645\u0646 0)","$first \u2014 true \u0644\u0644\u0639\u0646\u0635\u0631 \u0627\u0644\u0623\u0648\u0644","$last \u2014 true \u0644\u0644\u0639\u0646\u0635\u0631 \u0627\u0644\u0623\u062E\u064A\u0631","$even \u2014 true \u0639\u0646\u062F\u0645\u0627 \u064A\u0643\u0648\u0646 $index \u0632\u0648\u062C\u064A\u0627\u064B","$odd \u2014 true \u0639\u0646\u062F\u0645\u0627 \u064A\u0643\u0648\u0646 $index \u0641\u0631\u062F\u064A\u0627\u064B","$count \u2014 \u0625\u062C\u0645\u0627\u0644\u064A \u0639\u062F\u062F \u0627\u0644\u0639\u0646\u0627\u0635\u0631"]},{type:"heading",text:"track \u0641\u064A @for"},{type:"paragraph",text:"track \u064A\u064F\u062E\u0628\u0631 Angular \u0643\u064A\u0641 \u064A\u064F\u0639\u0631\u0651\u0641 \u0643\u0644 \u0639\u0646\u0635\u0631 \u0639\u0628\u0631 \u0625\u0639\u0627\u062F\u0627\u062A \u0627\u0644\u0631\u0633\u0645. \u0625\u0646\u0647 \u0645\u0637\u0644\u0648\u0628 \u0641\u064A @for (\u0627\u062E\u062A\u064A\u0627\u0631\u064A \u0643\u0627\u0646 \u0641\u064A *ngFor). \u0628\u062F\u0648\u0646\u0647 \u064A\u0639\u064A\u062F Angular \u0625\u0646\u0634\u0627\u0621 \u0643\u0644 \u0639\u0642\u062F DOM \u0645\u0639 \u0643\u0644 \u062A\u063A\u064A\u064A\u0631."},{type:"code",code:`<!-- \u0633\u064A\u0621: track \u0628\u0627\u0644\u0641\u0647\u0631\u0633 \u2014 \u064A\u064F\u0639\u064A\u062F \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0639\u0646\u0627\u0635\u0631 \u0639\u0646\u062F \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0631\u062A\u064A\u0628 -->
@for (item of items(); track $index) { ... }

<!-- \u062C\u064A\u062F: track \u0628\u0645\u0639\u0631\u0651\u0641 \u0645\u0633\u062A\u0642\u0631 -->
@for (item of items(); track item.id) { ... }

<!-- \u0625\u0630\u0627 \u0644\u0645 \u064A\u0643\u0646 \u0644\u0644\u0639\u0646\u0627\u0635\u0631 id\u060C \u0627\u0633\u062A\u062E\u062F\u0645 \u062D\u0642\u0644\u0627\u064B \u0641\u0631\u064A\u062F\u0627\u064B \u0622\u062E\u0631 -->
@for (user of users(); track user.email) { ... }`},{type:"heading",text:"@empty \u2014 \u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0641\u0627\u0631\u063A\u0629"},{type:"paragraph",text:'@empty \u0647\u0648 \u0643\u062A\u0644\u0629 \u0627\u062E\u062A\u064A\u0627\u0631\u064A\u0629 \u062F\u0627\u062E\u0644 @for \u062A\u064F\u0635\u064A\u0651\u0631 \u0639\u0646\u062F\u0645\u0627 \u062A\u0643\u0648\u0646 \u0627\u0644\u0645\u0635\u0641\u0648\u0641\u0629 \u0641\u0627\u0631\u063A\u0629. \u064A\u0633\u062A\u0628\u062F\u0644 \u0646\u0645\u0637 *ngIf="items.length === 0" \u0627\u0644\u0634\u0627\u0626\u0639.'},{type:"code",code:`@for (item of cartItems(); track item.id) {
  <app-cart-item [item]="item" />
} @empty {
  <p class="empty-state">\u0633\u0644\u062A\u0643 \u0641\u0627\u0631\u063A\u0629. <a routerLink="/shop">\u062A\u0633\u0648\u0651\u0642 \u0627\u0644\u0622\u0646</a></p>
}`},{type:"heading",text:"@switch \u2014 \u0627\u0644\u062A\u0628\u062F\u064A\u0644"},{type:"paragraph",text:"@switch \u064A\u064F\u0635\u064A\u0651\u0631 \u0623\u062D\u062F \u0627\u0644\u0641\u0631\u0648\u0639 \u0628\u0646\u0627\u0621\u064B \u0639\u0644\u0649 \u0642\u064A\u0645\u0629 \u2014 \u0645\u0643\u0627\u0641\u0626 \u0644\u062C\u0645\u0644\u0629 switch \u0641\u064A JavaScript."},{type:"code",code:`@switch (order().status) {
  @case ('pending') {
    <span class="badge badge-yellow">\u0641\u064A \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631</span>
  }
  @case ('processing') {
    <span class="badge badge-blue">\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629</span>
  }
  @case ('shipped') {
    <span class="badge badge-purple">\u062A\u0645 \u0627\u0644\u0634\u062D\u0646</span>
  }
  @case ('delivered') {
    <span class="badge badge-green">\u062A\u0645 \u0627\u0644\u062A\u0633\u0644\u064A\u0645</span>
  }
  @default {
    <span class="badge badge-gray">\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641</span>
  }
}`},{type:"tip",text:"\u0627\u0633\u062A\u062E\u062F\u0645 @switch \u0639\u0646\u062F\u0645\u0627 \u062A\u0642\u0627\u0631\u0646 \u0645\u062A\u063A\u064A\u0631\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0628\u0639\u062F\u0629 \u0642\u064A\u0645 \u062B\u0627\u0628\u062A\u0629. \u0627\u0633\u062A\u062E\u062F\u0645 @if / @else if \u0639\u0646\u062F\u0645\u0627 \u0644\u0643\u0644 \u0641\u0631\u0639 \u0634\u0631\u0637 \u0645\u062E\u062A\u0644\u0641."},{type:"heading",text:"\u0627\u0644\u062A\u0631\u062D\u064A\u0644 \u0645\u0646 *ngIf \u0648 *ngFor"},{type:"paragraph",text:"Angular \u064A\u0648\u0641\u0631 schematic \u0622\u0644\u064A\u0627\u064B \u0644\u062A\u0631\u062D\u064A\u0644 \u0627\u0644\u0642\u0648\u0627\u0644\u0628 \u0627\u0644\u0642\u062F\u064A\u0645\u0629."},{type:"code",code:`# \u0623\u0645\u0631 \u0627\u0644\u062A\u0631\u062D\u064A\u0644 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A
ng generate @angular/core:control-flow

# \u0645\u0631\u062C\u0639 \u064A\u062F\u0648\u064A:
# *ngIf="cond"                  \u2192  @if (cond) { }
# *ngIf="cond; else tpl"        \u2192  @if (cond) { } @else { }
# *ngFor="let x of arr"         \u2192  @for (x of arr; track x.id) { }
# *ngSwitch + *ngSwitchCase     \u2192  @switch + @case`},{type:"qa",question:"\u0645\u0627 \u0627\u0644\u0641\u0631\u0642 \u0627\u0644\u0631\u0626\u064A\u0633\u064A \u0628\u064A\u0646 @for \u0648 *ngFor \u0641\u064A\u0645\u0627 \u064A\u062E\u0635 \u0627\u0644\u062A\u062A\u0628\u0639 (tracking)\u061F",answer:"\u0641\u064A @for\u060C track \u0645\u0637\u0644\u0648\u0628. \u0641\u064A *ngFor\u060C \u0643\u0627\u0646 trackBy \u0627\u062E\u062A\u064A\u0627\u0631\u064A\u0627\u064B (\u0648\u0625\u0646 \u0643\u0627\u0646 \u0645\u0648\u0635\u0649 \u0628\u0647). \u0645\u062A\u0631\u062C\u0645 Angular \u064A\u064F\u062C\u0628\u0631 \u0627\u0644\u062A\u062A\u0628\u0639 \u0641\u064A @for \u0644\u0645\u0646\u0639 \u0623\u062E\u0637\u0627\u0621 \u0627\u0644\u0623\u062F\u0627\u0621 \u063A\u064A\u0631 \u0627\u0644\u0645\u0642\u0635\u0648\u062F\u0629."},{type:"qa",question:"\u0645\u0627\u0630\u0627 \u064A\u0633\u062A\u0628\u062F\u0644 @empty \u0641\u064A \u0627\u0644\u0623\u0633\u0644\u0648\u0628 \u0627\u0644\u0642\u062F\u064A\u0645\u061F",answer:'\u064A\u0633\u062A\u0628\u062F\u0644 \u0646\u0645\u0637 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 *ngIf="items.length === 0" \u0628\u062C\u0627\u0646\u0628 *ngFor \u0645\u0646\u0641\u0635\u0644\u0627\u064B. \u0645\u0639 @empty\u060C \u062D\u0627\u0644\u0629 \u0627\u0644\u0641\u0631\u0627\u063A \u0645\u0648\u062C\u0648\u062F\u0629 \u0645\u0639 \u0627\u0644\u062D\u0644\u0642\u0629 \u0645\u0628\u0627\u0634\u0631\u0629\u064B \u0645\u0645\u0627 \u064A\u062C\u0639\u0644 \u0627\u0644\u0642\u0627\u0644\u0628 \u0623\u0643\u062B\u0631 \u0642\u0627\u0628\u0644\u064A\u0629 \u0644\u0644\u0642\u0631\u0627\u0621\u0629 \u0648\u0623\u0642\u0644 \u0639\u0631\u0636\u0629 \u0644\u0644\u0623\u062E\u0637\u0627\u0621.'}],contentEn:[{type:"heading",text:"Introduction to Angular Control Flow"},{type:"paragraph",text:"Before Angular v17, conditional and list rendering required structural directives \u2014 special attributes prefixed with * that were syntactic sugar over <ng-template>. The new block syntax removes all of that."},{type:"code",code:`<!-- Old way (still works but discouraged) -->
<div *ngIf="isLoggedIn">Welcome!</div>
<li *ngFor="let item of items; trackBy: trackById">{{ item.name }}</li>

<!-- New way (v17+, required in v22) -->
@if (isLoggedIn()) {
  <div>Welcome!</div>
}
@for (item of items(); track item.id) {
  <li>{{ item.name }}</li>
}`},{type:"list",items:["No imports required \u2014 syntax is built into the compiler","Better static analysis by the compiler","Full TypeScript type narrowing inside blocks","Built-in @empty support (no separate *ngIf needed)"]},{type:"heading",text:"@if \u2014 Conditional Rendering"},{type:"paragraph",text:"@if renders its content when the condition is truthy."},{type:"code",code:`@if (isLoggedIn()) {
  <div class="banner">Welcome, {{ username() }}!</div>
}

@if (items().length > 0) {
  <p>You have {{ items().length }} items</p>
}

@if (product()?.inStock) {
  <button>Add to Cart</button>
}`},{type:"tip",text:"@if narrows TypeScript types inside the block just like a regular if statement. If a type is User | null, inside @if Angular knows it as User."},{type:"heading",text:"@else and @else if"},{type:"paragraph",text:"Chain conditions with @else if and provide a fallback with @else."},{type:"code",code:`@if (status() === 'loading') {
  <app-spinner />
} @else if (status() === 'error') {
  <app-error-message [message]="errorMessage()" />
} @else if (status() === 'empty') {
  <p>No results found.</p>
} @else {
  <app-results [data]="results()" />
}`},{type:"heading",text:"@for \u2014 Iteration"},{type:"paragraph",text:"@for iterates over an array (or any iterable) and renders the template block for each item."},{type:"code",code:`@for (product of products(); track product.id) {
  <div class="card">{{ product.name }}</div>
}

<!-- Available context variables -->
@for (item of items(); track item.id; let i = $index, last = $last) {
  <div [class.last]="last">
    {{ i + 1 }}. {{ item.name }}
  </div>
}`},{type:"list",items:["$index \u2014 zero-based index of current item","$first \u2014 true for the first item","$last \u2014 true for the last item","$even \u2014 true when $index is even","$odd \u2014 true when $index is odd","$count \u2014 total number of items"]},{type:"heading",text:"track in @for"},{type:"paragraph",text:"track tells Angular how to identify each item across re-renders. It is REQUIRED in @for (was optional in *ngFor). Without it, Angular re-creates all DOM nodes on every change."},{type:"code",code:`<!-- BAD: track by index \u2014 re-creates items on reorder -->
@for (item of items(); track $index) { ... }

<!-- GOOD: track by stable unique ID -->
@for (item of items(); track item.id) { ... }

<!-- If items have no id, use another unique field -->
@for (user of users(); track user.email) { ... }`},{type:"heading",text:"@empty \u2014 Empty State"},{type:"paragraph",text:'@empty is an optional block inside @for that renders when the iterable is empty. It replaces the common *ngIf="items.length === 0" pattern.'},{type:"code",code:`@for (item of cartItems(); track item.id) {
  <app-cart-item [item]="item" />
} @empty {
  <p class="empty-state">Your cart is empty. <a routerLink="/shop">Start shopping</a></p>
}`},{type:"heading",text:"@switch \u2014 Switch Statement"},{type:"paragraph",text:"@switch renders one of several branches based on a value \u2014 equivalent to a JavaScript switch statement."},{type:"code",code:`@switch (order().status) {
  @case ('pending') {
    <span class="badge badge-yellow">Pending</span>
  }
  @case ('processing') {
    <span class="badge badge-blue">Processing</span>
  }
  @case ('shipped') {
    <span class="badge badge-purple">Shipped</span>
  }
  @case ('delivered') {
    <span class="badge badge-green">Delivered</span>
  }
  @default {
    <span class="badge badge-gray">Unknown</span>
  }
}`},{type:"tip",text:"Use @switch when comparing a single value against multiple constants. Use @if / @else if when each branch has a different condition."},{type:"heading",text:"Migrating from *ngIf and *ngFor"},{type:"paragraph",text:"Angular ships a built-in schematic to migrate templates automatically."},{type:"code",code:`# Automatic migration
ng generate @angular/core:control-flow

# Manual reference:
# *ngIf="cond"                  \u2192  @if (cond) { }
# *ngIf="cond; else tpl"        \u2192  @if (cond) { } @else { }
# *ngFor="let x of arr"         \u2192  @for (x of arr; track x.id) { }
# *ngSwitch + *ngSwitchCase     \u2192  @switch + @case`},{type:"qa",question:"What is the key difference between @for and *ngFor regarding tracking?",answer:"In @for, track is REQUIRED. In *ngFor, trackBy was optional (though recommended). Angular's compiler enforces tracking in @for to prevent accidental performance bugs from re-creating all DOM nodes on every change."},{type:"qa",question:"What does the @empty block replace from the old approach?",answer:'It replaces the pattern of using a separate *ngIf="items.length === 0" element alongside *ngFor. With @empty, the empty state is co-located with the loop, making the template more readable and less error-prone.'}]};export{e as default};
