import"./chunk-JS3ZFT6L.js";var e={id:3,title:"\u0623\u0633\u0627\u0633\u064A\u0627\u062A Angular",titleEn:"Angular Fundamentals",level:"\u0645\u0628\u062A\u062F\u0626",levelEn:"Beginner",intro:"\u0628\u0639\u062F \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0628\u064A\u0626\u0629\u060C \u062D\u0627\u0646 \u0648\u0642\u062A \u0643\u062A\u0627\u0628\u0629 \u0643\u0648\u062F Angular \u062D\u0642\u064A\u0642\u064A. \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u064A\u063A\u0637\u064A \u0627\u0644\u0644\u0628\u0646\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0644\u0643\u0644 \u062A\u0637\u0628\u064A\u0642 Angular: Components\u060C \u0627\u0644\u0642\u0648\u0627\u0644\u0628\u060C \u0627\u0644\u0623\u0646\u0645\u0627\u0637\u060C \u0627\u0644\u0645\u064F\u062D\u062F\u0650\u0651\u062F\u0627\u062A (Selectors)\u060C \u0648Data Binding. \u0633\u062A\u0641\u0647\u0645 \u0643\u064A\u0641 \u064A\u062D\u0648\u0651\u0644 Angular \u0641\u0626\u0629 TypeScript \u0648\u0642\u0627\u0644\u0628 HTML \u0625\u0644\u0649 \u0648\u0627\u062C\u0647\u0629 \u0645\u0633\u062A\u062E\u062F\u0645 \u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u062D\u064A\u0629.",introEn:"Now that your environment is ready, it's time to write real Angular code. This section covers the core building blocks of every Angular application: components, templates, styles, selectors, and data binding. By the end you'll understand how Angular turns a TypeScript class and an HTML template into living, reactive UI.",lessons:["\u0645\u0627 \u0647\u0648 Angular\u061F","Components \u0641\u064A Angular","Standalone Components","Component Metadata","Templates","Styles","Selectors","\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629 \u0639\u0644\u0649 Data Binding"],lessonsEn:["What is Angular?","Components in Angular","Standalone Components","Component Metadata","Templates","Styles","Selectors","Data Binding Overview"],content:[{type:"heading",text:"\u0645\u0627 \u0647\u0648 Angular\u061F"},{type:"paragraph",text:"Angular \u0625\u0637\u0627\u0631 \u0639\u0645\u0644 \u0645\u062A\u0643\u0627\u0645\u0644 (Full Framework) \u0645\u0646 Google \u0644\u0628\u0646\u0627\u0621 \u062A\u0637\u0628\u064A\u0642\u0627\u062A \u0648\u064A\u0628. \u064A\u0623\u062A\u064A \u0628\u0643\u0644 \u0634\u064A\u0621 \u062C\u0627\u0647\u0632\u0627\u064B: Router\u060C Forms\u060C HTTP Client\u060C DI\u060C \u0648CLI \u2014 \u0628\u062F\u0648\u0646 \u0627\u0644\u062D\u0627\u062C\u0629 \u0644\u062A\u062C\u0645\u064A\u0639 \u0645\u0643\u062A\u0628\u0627\u062A \u062E\u0627\u0631\u062C\u064A\u0629."},{type:"paragraph",text:"\u0646\u0645\u0648\u0630\u062C Angular \u0627\u0644\u0630\u0647\u0646\u064A: \u0643\u0644 \u062A\u0637\u0628\u064A\u0642 Angular \u0647\u0648 \u0634\u062C\u0631\u0629 \u0645\u0646 Components. \u0641\u064A \u0627\u0644\u0642\u0645\u0629 \u064A\u0648\u062C\u062F AppComponent\u060C \u0648\u0643\u0644 \u062C\u0632\u0621 \u0645\u0646 \u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0647\u0648 \u0645\u0643\u0648\u0651\u0646 \u0641\u0631\u0639\u064A (child) \u0645\u062A\u062F\u0627\u062E\u0644 \u0628\u062F\u0627\u062E\u0644\u0647."},{type:"tip",text:"Angular v22 \u0641\u064A \u062C\u0645\u0644\u0629 \u0648\u0627\u062D\u062F\u0629: \u0625\u0637\u0627\u0631 \u0639\u0645\u0644 signal-first\u060C zoneless\u060C standalone-by-default \u2014 \u062D\u064A\u062B \u0643\u0644 \u0645\u0643\u0648\u0651\u0646 \u062C\u062F\u064A\u062F \u064A\u0633\u062A\u062E\u062F\u0645 OnPush \u0648\u064A\u062A\u0641\u0627\u0639\u0644 \u0645\u0639 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0639\u0628\u0631 Signals."},{type:"heading",text:"Components \u0641\u064A Angular"},{type:"paragraph",text:"\u0627\u0644\u0645\u0643\u0648\u0651\u0646 \u0647\u0648 \u0627\u0644\u0644\u0628\u0646\u0629 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0641\u064A Angular. \u0643\u0644 \u0645\u0643\u0648\u0651\u0646 \u0644\u0647 \u062B\u0644\u0627\u062B\u0629 \u0623\u062C\u0632\u0627\u0621: \u0641\u0626\u0629 TypeScript (\u0627\u0644\u0645\u0646\u0637\u0642 \u0648\u0627\u0644\u062D\u0627\u0644\u0629)\u060C \u0642\u0627\u0644\u0628 HTML (\u0645\u0627 \u064A\u0631\u0627\u0647 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645)\u060C \u0648\u0623\u0646\u0645\u0627\u0637 CSS (\u0627\u0644\u062A\u0635\u0645\u064A\u0645 \u0627\u0644\u0645\u062D\u062F\u062F \u0644\u0644\u0645\u0643\u0648\u0651\u0646)."},{type:"code",code:`import { Component, signal, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-greeting',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <h1>\u0645\u0631\u062D\u0628\u0627\u064B\u060C {{ name() }}!</h1>
    <p>\u0623\u0647\u0644\u0627\u064B \u0628\u0643 \u0641\u064A Angular v22.</p>
  \`,
  styles: [\`h1 { color: #dd0031; }\`]
})
export class GreetingComponent {
  name = signal('Angular');
}`},{type:"tip",text:"\u0644\u0627\u062D\u0638 signal() \u0628\u062F\u0644\u0627\u064B \u0645\u0646 \u0627\u0644\u0645\u062A\u063A\u064A\u0631\u0627\u062A \u0627\u0644\u0639\u0627\u062F\u064A\u0629 \u2014 \u0647\u0630\u0627 \u0647\u0648 \u0623\u0633\u0644\u0648\u0628 Angular v22 \u0644State Management \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629."},{type:"heading",text:"Components \u0627\u0644\u0645\u0633\u062A\u0642\u0644\u0629 (Standalone)"},{type:"paragraph",text:"\u0642\u0628\u0644 Angular v15\u060C \u0643\u0627\u0646 \u0643\u0644 \u0645\u0643\u0648\u0651\u0646 \u064A\u062D\u062A\u0627\u062C \u0625\u0644\u0649 NgModule. \u0641\u064A Angular v22\u060C standalone \u0647\u0648 \u0627\u0644\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0648\u062D\u064A\u062F\u0629 \u2014 \u0627\u0644\u0645\u0643\u0648\u0651\u0646 \u064A\u064F\u0639\u0644\u0646 \u0639\u0646 \u0627\u0639\u062A\u0645\u0627\u062F\u064A\u0627\u062A\u0647 \u0645\u0628\u0627\u0634\u0631\u0629\u064B \u0641\u064A decorator @Component."},{type:"code",code:`@Component({
  selector: 'app-product-card',
  standalone: true,               // \u062F\u0627\u0626\u0645\u0627\u064B true \u0641\u064A v22
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DatePipe], // \u0628\u062F\u0644\u0627\u064B \u0645\u0646 NgModule
  template: \`
    <div class="card">
      <h2>{{ product().name }}</h2>
      <a [routerLink]="['/products', product().id]">\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644</a>
    </div>
  \`
})
export class ProductCardComponent {
  product = signal({ id: 1, name: '\u0643\u062A\u0627\u0628 Angular v22' });
}`},{type:"heading",text:"\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0639\u0631\u064A\u0641 (Component Metadata)"},{type:"paragraph",text:"decorator @Component \u064A\u0642\u0628\u0644 \u0643\u0627\u0626\u0646 \u0628\u064A\u0627\u0646\u0627\u062A \u064A\u064F\u0639\u0631\u0651\u0641 \u0633\u0644\u0648\u0643 \u0627\u0644\u0645\u0643\u0648\u0651\u0646. \u0623\u0647\u0645 \u0627\u0644\u062D\u0642\u0648\u0644:"},{type:"code",code:`@Component({
  selector: 'app-user-card',       // \u0627\u0644\u0639\u0644\u0627\u0645\u0629 HTML \u0627\u0644\u0645\u062E\u0635\u0635\u0629
  standalone: true,                 // \u062F\u0627\u0626\u0645\u0627\u064B true \u0641\u064A v22
  template: \`<p>\u0645\u062D\u062A\u0648\u0649 \u0645\u0636\u0645\u0651\u0646</p>\`,  // \u0623\u0648 templateUrl \u0644\u0645\u0644\u0641 \u062E\u0627\u0631\u062C\u064A
  styles: [\`p { color: red; }\`],   // \u0623\u0648 styleUrl \u0644\u0645\u0644\u0641 CSS \u062E\u0627\u0631\u062C\u064A
  imports: [RouterLink, DatePipe],  // \u0645\u0643\u0648\u0651\u0646\u0627\u062A/\u0645\u0648\u062C\u0651\u0647\u0627\u062A/\u0623\u0646\u0627\u0628\u064A\u0628 \u0645\u0633\u062A\u062E\u062F\u0645\u0629
  changeDetection: ChangeDetectionStrategy.OnPush,  // \u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0641\u064A v22
})
export class UserCardComponent { ... }`},{type:"heading",text:"\u0627\u0644\u0642\u0648\u0627\u0644\u0628 (Templates)"},{type:"paragraph",text:"\u0642\u0627\u0644\u0628 Angular \u0647\u0648 HTML \u0645\u0639\u0632\u0651\u0632 \u0628\u0635\u064A\u0627\u063A\u0629 \u062E\u0627\u0635\u0629. \u064A\u064F\u062A\u0631\u062C\u064E\u0645 \u0648\u0642\u062A \u0627\u0644\u0628\u0646\u0627\u0621 \u0625\u0644\u0649 \u062A\u0639\u0644\u064A\u0645\u0627\u062A DOM \u0641\u0639\u0651\u0627\u0644\u0629 \u2014 \u0644\u0627 virtual DOM."},{type:"code",code:`<!-- \u0627\u0633\u062A\u064A\u0641\u0627\u0621 \u0627\u0644\u0646\u0635 -->
<p>{{ title() }}</p>

<!-- Property Binding -->
<img [src]="imageUrl()" [alt]="imageAlt()" />

<!-- Event Binding -->
<button (click)="handleClick()">\u0627\u0636\u063A\u0637 \u0647\u0646\u0627</button>

<!-- Control Flow -->
@if (isLoggedIn()) {
  <p>\u0623\u0647\u0644\u0627\u064B\u060C {{ user().name }}!</p>
} @else {
  <a href="/login">\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644</a>
}

@for (item of items(); track item.id) {
  <li>{{ item.name }}</li>
}`},{type:"warning",text:"\u0627\u0644\u0642\u0627\u0644\u0628 \u0645\u0643\u062A\u0648\u0628 \u0628\u0640 TypeScript \u0628\u0627\u0644\u0643\u0627\u0645\u0644 \u2014 \u0623\u062E\u0637\u0627\u0621 \u0627\u0644\u062E\u0627\u0635\u064A\u0627\u062A \u062A\u064F\u0643\u062A\u0634\u0641 \u0648\u0642\u062A \u0627\u0644\u0628\u0646\u0627\u0621\u060C \u0644\u0627 \u0648\u0642\u062A \u0627\u0644\u062A\u0634\u063A\u064A\u0644. \u0647\u0630\u0647 \u0645\u0646 \u0623\u0642\u0648\u0649 \u0645\u064A\u0632\u0627\u062A Angular."},{type:"heading",text:"\u0627\u0644\u0623\u0646\u0645\u0627\u0637 (Styles)"},{type:"paragraph",text:"Angular \u064A\u0648\u0641\u0631 \u062B\u0644\u0627\u062B\u0629 \u0645\u0633\u062A\u0648\u064A\u0627\u062A \u0644\u0644\u0623\u0646\u0645\u0627\u0637: \u0623\u0646\u0645\u0627\u0637 \u0639\u0627\u0645\u0629 (styles.css)\u060C \u0623\u0646\u0645\u0627\u0637 \u0645\u062D\u062F\u0648\u062F\u0629 \u0646\u0637\u0627\u0642 \u0627\u0644\u0645\u0643\u0648\u0651\u0646 (\u0627\u0641\u062A\u0631\u0627\u0636\u064A)\u060C \u0648Shadow DOM \u062D\u0642\u064A\u0642\u064A."},{type:"code",code:`/* styles.css \u2014 \u064A\u064F\u0637\u0628\u0651\u0642 \u0639\u0644\u0649 \u0643\u0627\u0645\u0644 \u0627\u0644\u062A\u0637\u0628\u064A\u0642 */
:root {
  --color-primary: #dd0031;
}

/* \u0641\u064A \u0627\u0644\u0645\u0643\u0648\u0651\u0646 \u2014 \u0645\u062D\u062F\u0648\u062F\u0629 \u0627\u0644\u0646\u0637\u0627\u0642 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B */
@Component({
  styles: [\`
    .card { border-radius: 8px; padding: 16px; }
    /* \u0647\u0630\u0627 \u0627\u0644\u0646\u0645\u0637 \u0644\u0646 \u064A\u0624\u062B\u0631 \u0639\u0644\u0649 .card \u0641\u064A \u0645\u0643\u0648\u0651\u0646\u0627\u062A \u0623\u062E\u0631\u0649 */
  \`]
})`},{type:"tip",text:"\u0627\u0633\u062A\u062E\u062F\u0645 :host \u0644\u062A\u0635\u0645\u064A\u0645 \u0639\u0646\u0635\u0631 \u0627\u0644\u0645\u0643\u0648\u0651\u0646 \u0646\u0641\u0633\u0647 (\u0639\u0644\u0627\u0645\u0629 <app-card>). \u0645\u062B\u0627\u0644: :host { display: block; margin-bottom: 16px; }"},{type:"heading",text:"\u0627\u0644\u0645\u064F\u062D\u062F\u0650\u0651\u062F\u0627\u062A (Selectors)"},{type:"paragraph",text:"\u0627\u0644\u0645\u064F\u062D\u062F\u0650\u0651\u062F \u0641\u064A @Component \u064A\u062D\u062F\u062F \u0643\u064A\u0641 \u062A\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0645\u0643\u0648\u0651\u0646 \u0641\u064A \u0627\u0644\u0642\u0648\u0627\u0644\u0628. Angular \u064A\u062F\u0639\u0645 \u062B\u0644\u0627\u062B\u0629 \u0623\u0646\u0648\u0627\u0639:"},{type:"list",items:['\u0645\u064F\u062D\u062F\u0650\u0651\u062F \u0627\u0644\u0639\u0646\u0635\u0631 (\u0627\u0644\u0623\u0643\u062B\u0631 \u0634\u064A\u0648\u0639\u0627\u064B): selector: "app-hero-card" \u2192 <app-hero-card />','\u0645\u064F\u062D\u062F\u0650\u0651\u062F \u0627\u0644\u062E\u0627\u0635\u064A\u0629: selector: "[appHighlight]" \u2192 <div appHighlight>','\u0645\u064F\u062D\u062F\u0650\u0651\u062F \u0627\u0644\u0641\u0626\u0629: selector: ".card-widget" \u2192 <div class="card-widget"> (\u0646\u0627\u062F\u0631)']},{type:"tip",text:"\u0627\u0633\u062A\u062E\u062F\u0645 \u062F\u0627\u0626\u0645\u0627\u064B \u0628\u0627\u062F\u0626\u0629 (app- \u0623\u0648 \u0627\u0633\u0645 \u0627\u0644\u0645\u0634\u0631\u0648\u0639) \u0644\u062A\u062C\u0646\u0628 \u0627\u0644\u062A\u0639\u0627\u0631\u0636 \u0645\u0639 \u0639\u0646\u0627\u0635\u0631 HTML \u0627\u0644\u0642\u064A\u0627\u0633\u064A\u0629."},{type:"heading",text:"\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629 \u0639\u0644\u0649 Data Binding"},{type:"paragraph",text:"Data Binding \u0647\u0648 \u0627\u0644\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u064A \u064A\u0631\u0628\u0637 \u0628\u0647\u0627 Angular \u0641\u0626\u0629 TypeScript \u0628\u0642\u0627\u0644\u0628 HTML. \u0623\u0631\u0628\u0639\u0629 \u0623\u0646\u0648\u0627\u0639:"},{type:"list",items:["{{ expr }} \u2014 \u0627\u0633\u062A\u064A\u0641\u0627\u0621: \u0645\u0646 \u0627\u0644\u0641\u0626\u0629 \u0625\u0644\u0649 \u0627\u0644\u0642\u0627\u0644\u0628 \u0643\u0646\u0635",'[property]="expr" \u2014 Property Binding: \u0645\u0646 \u0627\u0644\u0641\u0626\u0629 \u0625\u0644\u0649 \u0627\u0644\u0642\u0627\u0644\u0628 (DOM property)','(event)="fn()" \u2014 Event Binding: \u0645\u0646 \u0627\u0644\u0642\u0627\u0644\u0628 \u0625\u0644\u0649 \u0627\u0644\u0641\u0626\u0629','[(ngModel)]="val" \u2014 \u0631\u0628\u0637 \u062B\u0646\u0627\u0626\u064A \u0627\u0644\u0627\u062A\u062C\u0627\u0647: \u0641\u064A \u0643\u0644\u0627 \u0627\u0644\u0627\u062A\u062C\u0627\u0647\u064A\u0646']},{type:"qa",question:"\u0645\u0627 \u0627\u0644\u0641\u0631\u0642 \u0627\u0644\u0631\u0626\u064A\u0633\u064A \u0628\u064A\u0646 Angular v22 \u0648\u0625\u0635\u062F\u0627\u0631\u0627\u062A Angular \u0627\u0644\u0642\u062F\u064A\u0645\u0629 \u0645\u0646 \u062D\u064A\u062B \u0647\u064A\u0643\u0644 Components\u061F",answer:"\u0641\u064A v22\u060C Components standalone \u0628\u0627\u0644\u0643\u0627\u0645\u0644 \u2014 \u0644\u0627 NgModule\u060C \u0644\u0627 zone.js. \u0643\u0644 \u0645\u0643\u0648\u0651\u0646 \u064A\u064F\u0639\u0644\u0646 \u0639\u0646 \u0627\u0639\u062A\u0645\u0627\u062F\u064A\u0627\u062A\u0647 \u0645\u0628\u0627\u0634\u0631\u0629\u064B \u0641\u064A @Component\u060C \u0648\u064A\u0633\u062A\u062E\u062F\u0645 OnPush \u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0627\u064B \u0645\u0639 Signals \u0644\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629."},{type:"qa",question:"\u0645\u0627 \u0627\u0644\u062B\u0644\u0627\u062B\u0629 \u0623\u062C\u0632\u0627\u0621 \u0627\u0644\u062A\u064A \u064A\u062A\u0643\u0648\u0646 \u0645\u0646\u0647\u0627 \u0643\u0644 \u0645\u0643\u0648\u0651\u0646 Angular\u061F",answer:"\u0641\u0626\u0629 TypeScript (\u0627\u0644\u0645\u0646\u0637\u0642 \u0648\u0627\u0644\u062D\u0627\u0644\u0629)\u060C \u0642\u0627\u0644\u0628 HTML (\u0645\u0627 \u064A\u0631\u0627\u0647 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645)\u060C \u0648\u0623\u0646\u0645\u0627\u0637 CSS (\u0627\u0644\u062A\u0635\u0645\u064A\u0645 \u0627\u0644\u0645\u062D\u062F\u0648\u062F \u0646\u0637\u0627\u0642 \u0627\u0644\u0645\u0643\u0648\u0651\u0646)."}],contentEn:[{type:"heading",text:"What is Angular?"},{type:"paragraph",text:"Angular is a complete, opinionated front-end framework built by Google. Unlike React (a library) or Vue (a progressive framework), Angular ships with everything you need: Router, Forms, HTTP Client, DI, and CLI \u2014 no library shopping required."},{type:"paragraph",text:"Angular mental model: every Angular app is a tree of components. At the top sits AppComponent, and every piece of UI is a child component nested inside it \u2014 directly or through the router."},{type:"tip",text:"Angular v22 in one sentence: a signal-first, zoneless, standalone-by-default framework where every new component uses OnPush and reacts to state changes through Signals."},{type:"heading",text:"Components in Angular"},{type:"paragraph",text:"A component is the fundamental building block of Angular UI. Every component has three parts: a TypeScript class (logic and state), an HTML template (what the user sees), and CSS styles (scoped visual presentation)."},{type:"code",code:`import { Component, signal, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-greeting',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <h1>Hello, {{ name() }}!</h1>
    <p>Welcome to Angular v22.</p>
  \`,
  styles: [\`h1 { color: #dd0031; }\`]
})
export class GreetingComponent {
  name = signal('Angular');
}`},{type:"tip",text:"Notice signal() instead of a plain property \u2014 this is the Angular v22 way to manage reactive state."},{type:"heading",text:"Standalone Components"},{type:"paragraph",text:"Before Angular v15, every component had to be declared inside an NgModule. In Angular v22, standalone is the only way \u2014 the component declares its own dependencies directly in the @Component decorator."},{type:"code",code:`@Component({
  selector: 'app-product-card',
  standalone: true,               // always true in v22
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DatePipe], // instead of NgModule
  template: \`
    <div class="card">
      <h2>{{ product().name }}</h2>
      <a [routerLink]="['/products', product().id]">View details</a>
    </div>
  \`
})
export class ProductCardComponent {
  product = signal({ id: 1, name: 'Angular v22 Book' });
}`},{type:"heading",text:"Component Metadata"},{type:"paragraph",text:"The @Component decorator accepts a metadata object that configures how the component behaves. The most important fields:"},{type:"code",code:`@Component({
  selector: 'app-user-card',       // Custom HTML tag
  standalone: true,                 // Always true in v22
  template: \`<p>Inline HTML</p>\`,  // or templateUrl for external file
  styles: [\`p { color: red; }\`],   // or styleUrl for external CSS
  imports: [RouterLink, DatePipe],  // components/directives/pipes used
  changeDetection: ChangeDetectionStrategy.OnPush,  // v22 default
})
export class UserCardComponent { ... }`},{type:"heading",text:"Templates"},{type:"paragraph",text:"An Angular template is HTML enhanced with Angular's binding syntax. It compiles at build time to efficient DOM instructions \u2014 no virtual DOM diffing required."},{type:"code",code:`<!-- Interpolation: render value as text -->
<p>{{ title() }}</p>

<!-- Property binding: set a DOM property -->
<img [src]="imageUrl()" [alt]="imageAlt()" />

<!-- Event binding: call method on DOM events -->
<button (click)="handleClick()">Click me</button>

<!-- Control flow blocks -->
@if (isLoggedIn()) {
  <p>Welcome, {{ user().name }}!</p>
} @else {
  <a href="/login">Log in</a>
}

@for (item of items(); track item.id) {
  <li>{{ item.name }}</li>
}`},{type:"warning",text:"Templates are strongly typed \u2014 accessing a property that doesn't exist on a Signal's value is a compile-time error, not a runtime crash. This is one of Angular's biggest advantages."},{type:"heading",text:"Styles"},{type:"paragraph",text:"Angular provides three levels of styling: global styles (styles.css), component-scoped styles (default \u2014 Emulated encapsulation), and real Shadow DOM."},{type:"code",code:`/* styles.css \u2014 applied to the entire application */
:root {
  --color-primary: #dd0031;
}

/* Inside a component \u2014 automatically scoped */
@Component({
  styles: [\`
    .card { border-radius: 8px; padding: 16px; }
    /* This .card rule won't affect .card in other components */
  \`]
})`},{type:"tip",text:"Use :host to style the component's own host element (the <app-card> tag itself). Example: :host { display: block; margin-bottom: 16px; }"},{type:"heading",text:"Selectors"},{type:"paragraph",text:"The selector in @Component determines how you use the component in templates. Angular supports three types:"},{type:"list",items:['Element selector (most common): selector: "app-hero-card" \u2192 <app-hero-card />','Attribute selector: selector: "[appHighlight]" \u2192 <div appHighlight>','Class selector: selector: ".card-widget" \u2192 <div class="card-widget"> (rare)']},{type:"tip",text:"Always use a prefix (app- or your project name) to avoid collisions with standard HTML elements."},{type:"heading",text:"Data Binding Overview"},{type:"paragraph",text:"Data binding connects your TypeScript class to the HTML template. Four types:"},{type:"list",items:["{{ expr }} \u2014 Interpolation: class to template as text (read-only)",'[property]="expr" \u2014 Property binding: class to template (DOM property)','(event)="fn()" \u2014 Event binding: template to class','[(ngModel)]="val" \u2014 Two-way binding: both directions']},{type:"qa",question:"What is the main architectural difference between Angular v22 and older Angular versions?",answer:"In v22, components are fully standalone \u2014 no NgModule, no zone.js. Every component declares its own dependencies directly in @Component, uses OnPush by default, and manages state with Signals for fine-grained reactivity."},{type:"qa",question:"What are the three parts every Angular component is made of?",answer:"A TypeScript class (logic and state), an HTML template (what the user sees), and CSS styles (visual presentation scoped to the component)."}]};export{e as default};
