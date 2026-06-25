import"./chunk-JS3ZFT6L.js";var t={id:6,title:"\u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0628\u064A\u0646 Components",titleEn:"Components Communication",level:"\u0645\u062A\u0648\u0633\u0637",levelEn:"Intermediate",intro:"\u062A\u0637\u0628\u064A\u0642\u0627\u062A Angular \u0647\u064A \u0623\u0634\u062C\u0627\u0631 \u0645\u0646 Components. \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u064A\u063A\u0637\u064A \u0643\u0644 \u0623\u0646\u0645\u0627\u0637 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0627\u0644\u062A\u064A \u064A\u0648\u0641\u0631\u0647\u0627 Angular v22: \u062A\u0645\u0631\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0623\u0633\u0641\u0644 \u0628\u0640 input()\u060C \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0623\u062D\u062F\u0627\u062B \u0644\u0644\u0623\u0639\u0644\u0649 \u0628\u0640 output()\u060C \u0645\u0634\u0627\u0631\u0643\u0629 \u0627\u0644\u0643\u0627\u0626\u0646\u0627\u062A\u060C Content Projection \u0628\u0640 ng-content\u060C \u0648Components \u0628\u062F\u0648\u0646 \u0645\u062D\u062F\u0650\u0651\u062F (Selectorless).",introEn:"Angular applications are trees of components. This section covers every communication pattern Angular v22 provides: passing data down with input(), sending events up with output(), sharing objects, projecting content with ng-content, and the new v22 selectorless components.",lessons:["\u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0646 \u0627\u0644\u0623\u0628 \u0625\u0644\u0649 \u0627\u0644\u0627\u0628\u0646","@Input \u0648input() \u2014 Signal Input","\u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0646 \u0627\u0644\u0627\u0628\u0646 \u0625\u0644\u0649 \u0627\u0644\u0623\u0628","@Output \u0648output()","EventEmitter","\u062A\u0645\u0631\u064A\u0631 \u0627\u0644\u0643\u0627\u0626\u0646\u0627\u062A \u0628\u064A\u0646 Components","\u062A\u0631\u0643\u064A\u0628 Components","Content Projection \u0628\u0640 ng-content","Components \u0628\u062F\u0648\u0646 \u0645\u062D\u062F\u0650\u0651\u062F (Selectorless) \u2014 \u062C\u062F\u064A\u062F \u0641\u064A v22"],lessonsEn:["Parent to Child Communication","@Input and input() \u2014 Signal Input","Child to Parent Communication","@Output and output()","EventEmitter","Passing Objects Between Components","Component Composition","Content Projection with ng-content","Selectorless Components \u2014 New in v22"],content:[{type:"heading",text:"\u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0646 \u0627\u0644\u0623\u0628 \u0625\u0644\u0649 \u0627\u0644\u0627\u0628\u0646"},{type:"paragraph",text:"\u0623\u0643\u062B\u0631 \u0646\u0645\u0637 \u0634\u064A\u0648\u0639\u0627\u064B \u0641\u064A Angular \u0647\u0648 \u062A\u0645\u0631\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 \u0627\u0644\u0623\u0628 \u0625\u0644\u0649 \u0627\u0644\u0627\u0628\u0646. \u062A\u062F\u0641\u0642 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A Angular \u0627\u062A\u062C\u0627\u0647 \u0648\u0627\u062D\u062F: \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0646\u0632\u0644 (\u0623\u0628 \u2192 \u0627\u0628\u0646) \u0648\u0627\u0644\u0623\u062D\u062F\u0627\u062B \u062A\u0631\u062A\u0641\u0639 (\u0627\u0628\u0646 \u2192 \u0623\u0628)."},{type:"code",code:`// parent.component.ts
@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  template: \`
    <app-child [title]="pageTitle()" [count]="itemCount()" />
  \`
})
export class ParentComponent {
  pageTitle = signal('\u0645\u0631\u062D\u0628\u0627\u064B \u0645\u0646 \u0627\u0644\u0623\u0628');
  itemCount = signal(42);
}`},{type:"heading",text:"@Input \u0648input() \u2014 Signal Input"},{type:"paragraph",text:"Angular v22 \u064A\u064F\u0641\u0636\u0651\u0644 \u062F\u0627\u0644\u0629 input() \u0627\u0644\u062C\u062F\u064A\u062F\u0629 \u0627\u0644\u062A\u064A \u062A\u0631\u062C\u0639 Signal. \u0627\u0644\u0641\u0627\u0626\u062F\u0629: \u064A\u0645\u0643\u0646 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0645\u062F\u062E\u0644 \u0645\u0628\u0627\u0634\u0631\u0629\u064B \u0641\u064A computed() \u0648effect() \u0628\u062F\u0648\u0646 ngOnChanges."},{type:"code",code:`// \u0637\u0631\u064A\u0642\u0629 v22 \u0627\u0644\u0645\u0641\u0636\u0651\u0644\u0629 \u2014 input() \u064A\u064F\u0631\u062C\u0639 Signal
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  template: \`
    <h3>{{ name() }}</h3>       <!-- \u0627\u0633\u062A\u062F\u0639\u0627\u0621 \u0643\u0640 Signal -->
    <p>\u0627\u0644\u0639\u0645\u0631: {{ age() }}</p>
  \`
})
export class UserCardComponent {
  name = input<string>('');          // \u0627\u062E\u062A\u064A\u0627\u0631\u064A \u0645\u0639 \u0642\u064A\u0645\u0629 \u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629
  age  = input.required<number>();   // \u0645\u0637\u0644\u0648\u0628 \u2014 \u062E\u0637\u0623 \u0648\u0642\u062A \u0627\u0644\u0628\u0646\u0627\u0621 \u0625\u0646 \u0644\u0645 \u064A\u064F\u0645\u0631\u064E\u0651\u0631

  // \u064A\u0645\u0643\u0646\u0643 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0645\u062F\u062E\u0644 \u0641\u064A computed \u0645\u0628\u0627\u0634\u0631\u0629\u064B
  greeting = computed(() => \`\u0645\u0631\u062D\u0628\u0627\u064B \${this.name()}\`);
}`},{type:"list",items:["@Input() \u2192 \u062E\u0627\u0635\u064A\u0629 \u0639\u0627\u062F\u064A\u0629\u060C \u062A\u064F\u0642\u0631\u0623 \u0643\u0640 this.name \u0641\u064A \u0627\u0644\u0642\u0627\u0644\u0628: {{ name }}","input() \u2192 Signal\u060C \u062A\u064F\u0642\u0631\u0623 \u0643\u0640 this.name() \u0641\u064A \u0627\u0644\u0642\u0627\u0644\u0628: {{ name() }}","input.required<T>() \u2192 \u0645\u0637\u0644\u0648\u0628\u060C \u062E\u0637\u0623 \u0648\u0642\u062A \u0627\u0644\u0628\u0646\u0627\u0621 \u0625\u0630\u0627 \u0644\u0645 \u064A\u064F\u0645\u0631\u064E\u0651\u0631","input(default, { transform: fn }) \u2192 \u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0648\u0627\u0631\u062F\u0629","Signal inputs \u062A\u0639\u0645\u0644 \u0645\u0639 computed() \u0648 effect() \u0645\u0628\u0627\u0634\u0631\u0629\u064B"]},{type:"heading",text:"\u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0646 \u0627\u0644\u0627\u0628\u0646 \u0625\u0644\u0649 \u0627\u0644\u0623\u0628"},{type:"paragraph",text:"\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0646\u0632\u0644 \u0639\u0628\u0631 Inputs\u060C \u0648\u0627\u0644\u0623\u062D\u062F\u0627\u062B \u062A\u0631\u062A\u0641\u0639 \u0639\u0628\u0631 Outputs. \u0639\u0646\u062F\u0645\u0627 \u064A\u062D\u062F\u062B \u0634\u064A\u0621 \u0641\u064A \u0627\u0644\u0627\u0628\u0646\u060C \u064A\u064F\u062E\u0628\u0631 \u0627\u0644\u0623\u0628 \u0639\u0628\u0631 output()."},{type:"code",code:`// child.component.ts
@Component({
  selector: 'app-like-button',
  standalone: true,
  template: \`<button (click)="like()">\u2764\uFE0F \u0625\u0639\u062C\u0627\u0628</button>\`
})
export class LikeButtonComponent {
  liked = output<void>();   // \u0645\u062E\u0631\u062C v22

  like() {
    this.liked.emit();
  }
}

// parent.component.ts
@Component({
  template: \`
    <p>\u0627\u0644\u0625\u0639\u062C\u0627\u0628\u0627\u062A: {{ likes() }}</p>
    <app-like-button (liked)="onLiked()" />
  \`
})
export class PostComponent {
  likes = signal(0);

  onLiked() {
    this.likes.update(n => n + 1);
  }
}`},{type:"heading",text:"@Output \u0648output()"},{type:"paragraph",text:"output() \u0647\u0648 \u0623\u0633\u0644\u0648\u0628 v22 \u0644\u0644\u0645\u062E\u0631\u062C\u0627\u062A \u2014 \u0623\u0628\u0633\u0637 \u0645\u0646 @Output() + EventEmitter \u0648\u0645\u0639 tree-shaking \u0623\u0641\u0636\u0644."},{type:"code",code:`// \u0627\u0644\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0642\u062F\u064A\u0645\u0629
@Output() quantityChanged = new EventEmitter<number>();

// \u0637\u0631\u064A\u0642\u0629 v22 \u0627\u0644\u0645\u0641\u0636\u0651\u0644\u0629
quantityChanged = output<number>();

// \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0641\u064A \u0627\u0644\u0623\u0628 \u2014 \u0646\u0641\u0633 \u0627\u0644\u0635\u064A\u0627\u063A\u0629 \u0644\u0643\u0644\u062A\u0627 \u0627\u0644\u0637\u0631\u064A\u0642\u062A\u064A\u0646
// <app-qty (quantityChanged)="onQtyChange($event)" />`},{type:"heading",text:"\u062A\u0645\u0631\u064A\u0631 \u0627\u0644\u0643\u0627\u0626\u0646\u0627\u062A \u0628\u064A\u0646 Components"},{type:"paragraph",text:"\u0641\u064A \u0627\u0644\u062A\u0637\u0628\u064A\u0642\u0627\u062A \u0627\u0644\u062D\u0642\u064A\u0642\u064A\u0629 \u062A\u064F\u0645\u0631\u0651\u0631 \u0643\u0627\u0626\u0646\u0627\u062A \u0643\u0627\u0645\u0644\u0629 \u2014 \u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646\u060C \u0645\u0646\u062A\u062C\u0627\u062A\u060C \u0637\u0644\u0628\u0627\u062A. \u0639\u0631\u0651\u0641 \u0627\u0644\u0648\u0627\u062C\u0647\u0627\u062A \u0627\u0644\u0645\u0634\u062A\u0631\u0643\u0629 \u0641\u064A \u0645\u0644\u0641 \u0645\u0646\u0641\u0635\u0644 \u0644\u064A\u062A\u0645\u0643\u0646 \u0627\u0644\u0623\u0628 \u0648\u0627\u0644\u0627\u0628\u0646 \u0645\u0646 \u0627\u0633\u062A\u064A\u0631\u0627\u062F\u0647\u0627."},{type:"code",code:`// models/product.model.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

// child \u2014 \u064A\u0633\u062A\u0642\u0628\u0644 \u0648\u064A\u064F\u0631\u0633\u0644 \u0643\u0627\u0626\u0646\u0627\u064B
export class ProductCardComponent {
  product    = input.required<Product>();
  addedToCart = output<Product>();

  addToCart() {
    this.addedToCart.emit(this.product());
  }
}`},{type:"warning",text:"\u062A\u062D\u062F\u064A\u062B \u0645\u0647\u0645: OnPush (\u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0641\u064A v22) \u064A\u064F\u0644\u0627\u062D\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0641\u0642\u0637 \u0639\u0646\u062F\u0645\u0627 \u062A\u062A\u063A\u064A\u0631 \u0627\u0644\u0645\u0631\u062C\u0639\u064A\u0629. \u0644\u0627 \u062A\u064F\u0639\u062F\u0651\u0644 \u0627\u0644\u0643\u0627\u0626\u0646\u0627\u062A \u0641\u064A \u0645\u0643\u0627\u0646\u0647\u0627 \u2014 \u0627\u0633\u062A\u0628\u062F\u0644\u0647\u0627 \u0628\u0643\u0627\u0626\u0646\u0627\u062A \u062C\u062F\u064A\u062F\u0629: { ...obj, price: 99 }"},{type:"heading",text:"Content Projection \u0628\u0640 ng-content"},{type:"paragraph",text:"Inputs \u062A\u064F\u0645\u0631\u0651\u0631 \u0628\u064A\u0627\u0646\u0627\u062A\u060C \u0644\u0643\u0646 \u0623\u062D\u064A\u0627\u0646\u0627\u064B \u062A\u0631\u064A\u062F \u062A\u0645\u0631\u064A\u0631 \u0647\u064A\u0643\u0644 HTML \u0643\u0627\u0645\u0644. \u0647\u0630\u0627 \u0647\u0648 Content Projection \u0628\u0640 <ng-content>."},{type:"code",code:`// card.component.ts
@Component({
  selector: 'app-card',
  standalone: true,
  template: \`
    <div class="card">
      <ng-content />   <!-- \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u064F\u0645\u0631\u064E\u0651\u0631 \u0645\u0646 \u0627\u0644\u0623\u0628 \u064A\u0638\u0647\u0631 \u0647\u0646\u0627 -->
    </div>
  \`
})
export class CardComponent {}

// \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0641\u064A \u0627\u0644\u0623\u0628
<app-card>
  <h2>\u0645\u0631\u062D\u0628\u0627\u064B!</h2>
  <p>\u0647\u0630\u0627 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u064A\u064F\u0633\u0642\u064E\u0637 \u062F\u0627\u062E\u0644 \u0627\u0644\u0628\u0637\u0627\u0642\u0629.</p>
</app-card>`},{type:"heading",text:"Components \u0628\u062F\u0648\u0646 \u0645\u062D\u062F\u0650\u0651\u062F (Selectorless) \u2014 \u062C\u062F\u064A\u062F \u0641\u064A v22"},{type:"paragraph",text:"\u0641\u064A Angular v22\u060C Components \u0644\u0627 \u062A\u062D\u062A\u0627\u062C selector. \u0645\u0643\u0648\u0651\u0646 \u0628\u062F\u0648\u0646 selector \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0647 \u0643\u0639\u0644\u0627\u0645\u0629 HTML\u060C \u0644\u0643\u0646 \u064A\u0645\u0643\u0646 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0647 \u0641\u064A Routing (Routing) \u0623\u0648 NgComponentOutlet."},{type:"code",code:`// \u0644\u0627 selector \u2014 \u0645\u0643\u0648\u0651\u0646 \u0628\u062F\u0648\u0646 \u0645\u062D\u062F\u0650\u0651\u062F
@Component({
  standalone: true,
  template: \`
    <article>
      <h2>{{ title() }}</h2>
      <p>{{ body() }}</p>
    </article>
  \`
})
export class PostDetailComponent {
  title = input.required<string>();
  body  = input.required<string>();
}

// \u064A\u064F\u0633\u062A\u062E\u062F\u0645 \u0641\u064A Routing \u0628\u0627\u0644\u0645\u0631\u062C\u0639\u064A\u0629\u060C \u0644\u0627 \u0628\u0627\u0644\u0639\u0644\u0627\u0645\u0629
export const routes: Routes = [
  { path: 'posts/:id', component: PostDetailComponent }
];`},{type:"qa",question:"\u0645\u0627 \u0627\u0644\u0641\u0631\u0642 \u0628\u064A\u0646 @Input() \u0648input() \u0641\u064A Angular v22\u061F",answer:"@Input() \u0645\u0648\u062C\u0651\u0647 (decorator) \u064A\u064F\u0639\u064A\u0651\u0646 \u062E\u0627\u0635\u064A\u0629 \u0639\u0627\u062F\u064A\u0629 \u2014 \u062A\u0642\u0631\u0623\u0647\u0627 \u0643\u0640 this.name \u0641\u064A TypeScript \u0648\u0643\u0640 {{ name }} \u0641\u064A \u0627\u0644\u0642\u0627\u0644\u0628. input() \u062F\u0627\u0644\u0629 \u062A\u0631\u062C\u0639 Signal \u2014 \u062A\u0642\u0631\u0623\u0647\u0627 \u0643\u0640 this.name() \u0648\u0643\u0640 {{ name() }}. Signal inputs \u062A\u0639\u0645\u0644 \u0645\u0628\u0627\u0634\u0631\u0629\u064B \u0645\u0639 computed() \u0648effect()."},{type:"qa",question:"\u0645\u062A\u0649 \u062A\u0633\u062A\u062E\u062F\u0645 ng-content \u0628\u062F\u0644\u0627\u064B \u0645\u0646 Inputs\u061F",answer:'\u0627\u0633\u062A\u062E\u062F\u0645 ng-content \u0639\u0646\u062F\u0645\u0627 \u062A\u0628\u0646\u064A \u0645\u0643\u0648\u0651\u0646\u0627\u062A "\u063A\u0644\u0627\u0641" \u0642\u0627\u0628\u0644\u0629 \u0644\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u2014 \u0628\u0637\u0627\u0642\u0627\u062A\u060C \u0646\u0648\u0627\u0641\u0630 \u062D\u0648\u0627\u0631\u064A\u0629\u060C \u0623\u0644\u0633\u0646\u0629\u060C \u0644\u0648\u062D\u0627\u062A \u2014 \u062D\u064A\u062B \u062A\u0631\u064A\u062F \u0623\u0646 \u064A\u0645\u0644\u0623 \u0627\u0644\u0645\u064F\u0633\u062A\u062E\u062F\u0645 \u0625\u0637\u0627\u0631 \u0627\u0644\u062A\u062E\u0637\u064A\u0637 \u0628\u0623\u064A \u0645\u062D\u062A\u0648\u0649 \u064A\u0631\u064A\u062F\u0647. Inputs \u0644\u0644\u0628\u064A\u0627\u0646\u0627\u062A\u060C ng-content \u0644\u0644\u0647\u064A\u0643\u0644.'}],contentEn:[{type:"heading",text:"Parent to Child Communication"},{type:"paragraph",text:"The most common pattern in Angular is a parent component passing data down to a child. Angular's data flow is intentionally one-way: data flows down (parent \u2192 child) and events flow up (child \u2192 parent)."},{type:"code",code:`// parent.component.ts
@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  template: \`
    <app-child [title]="pageTitle()" [count]="itemCount()" />
  \`
})
export class ParentComponent {
  pageTitle = signal('Hello from Parent');
  itemCount = signal(42);
}`},{type:"heading",text:"@Input and input() \u2014 Signal Input"},{type:"paragraph",text:"Angular v22 prefers the new input() function that returns a Signal. Benefit: the input can be used directly in computed() and effect() without ngOnChanges."},{type:"code",code:`// v22 preferred way \u2014 input() returns a Signal
import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  template: \`
    <h3>{{ name() }}</h3>       <!-- called as Signal -->
    <p>Age: {{ age() }}</p>
  \`
})
export class UserCardComponent {
  name = input<string>('');          // optional with default
  age  = input.required<number>();   // required \u2014 compile-time error if missing

  // Use input directly in computed
  greeting = computed(() => \`Hello \${this.name()}\`);
}`},{type:"list",items:["@Input() \u2192 plain property, read as this.name in template: {{ name }}","input() \u2192 Signal, read as this.name() in template: {{ name() }}","input.required<T>() \u2192 required, compile-time error if not passed","input(default, { transform: fn }) \u2192 transform the incoming value","Signal inputs work directly with computed() and effect()"]},{type:"heading",text:"Child to Parent Communication"},{type:"paragraph",text:"Data flows down via inputs, events flow up via outputs. When something happens in a child, it tells the parent via output()."},{type:"code",code:`// child.component.ts
@Component({
  selector: 'app-like-button',
  standalone: true,
  template: \`<button (click)="like()">\u2764\uFE0F Like</button>\`
})
export class LikeButtonComponent {
  liked = output<void>();   // v22 output

  like() {
    this.liked.emit();
  }
}

// parent.component.ts
@Component({
  template: \`
    <p>Likes: {{ likes() }}</p>
    <app-like-button (liked)="onLiked()" />
  \`
})
export class PostComponent {
  likes = signal(0);

  onLiked() {
    this.likes.update(n => n + 1);
  }
}`},{type:"heading",text:"@Output and output()"},{type:"paragraph",text:"output() is the v22 way for outputs \u2014 simpler than @Output() + EventEmitter and with better tree-shaking."},{type:"code",code:`// Old way
@Output() quantityChanged = new EventEmitter<number>();

// v22 preferred way
quantityChanged = output<number>();

// Parent usage \u2014 same syntax for both approaches
// <app-qty (quantityChanged)="onQtyChange($event)" />`},{type:"heading",text:"Passing Objects Between Components"},{type:"paragraph",text:"In real apps you pass entire objects \u2014 users, products, orders. Define shared interfaces in a separate file so both parent and child can import from it."},{type:"code",code:`// models/product.model.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

// Child \u2014 receives and emits an object
export class ProductCardComponent {
  product    = input.required<Product>();
  addedToCart = output<Product>();

  addToCart() {
    this.addedToCart.emit(this.product());
  }
}`},{type:"warning",text:"Important: OnPush (v22 default) only detects changes when the reference changes. Never mutate objects in place \u2014 always replace them: { ...obj, price: 99 }"},{type:"heading",text:"Content Projection with ng-content"},{type:"paragraph",text:"Inputs pass data, but sometimes you want to pass entire HTML structure. That's content projection with <ng-content>."},{type:"code",code:`// card.component.ts
@Component({
  selector: 'app-card',
  standalone: true,
  template: \`
    <div class="card">
      <ng-content />   <!-- projected content appears here -->
    </div>
  \`
})
export class CardComponent {}

// Parent usage
<app-card>
  <h2>Welcome!</h2>
  <p>This content is projected into the card.</p>
</app-card>`},{type:"heading",text:"Selectorless Components \u2014 New in v22"},{type:"paragraph",text:"In Angular v22, components no longer need a selector. A selectorless component can't be used as an HTML tag, but can be used in routing or NgComponentOutlet."},{type:"code",code:`// No selector \u2014 selectorless component
@Component({
  standalone: true,
  template: \`
    <article>
      <h2>{{ title() }}</h2>
      <p>{{ body() }}</p>
    </article>
  \`
})
export class PostDetailComponent {
  title = input.required<string>();
  body  = input.required<string>();
}

// Used in routing by class reference, not by tag
export const routes: Routes = [
  { path: 'posts/:id', component: PostDetailComponent }
];`},{type:"qa",question:"What is the difference between @Input() and input() in Angular v22?",answer:"@Input() is a decorator that sets a plain class property \u2014 read as this.name in TypeScript and {{ name }} in templates. input() is a function that returns a Signal \u2014 read as this.name() and {{ name() }}. Signal inputs work directly with computed() and effect() for reactive derivations."},{type:"qa",question:"When should you use ng-content instead of inputs?",answer:'Use ng-content when building reusable "wrapper" components \u2014 cards, modals, tabs, panels \u2014 where you want consumers to fill in a layout frame with any content they want. Inputs are for data, ng-content is for HTML structure.'}]};export{t as default};
