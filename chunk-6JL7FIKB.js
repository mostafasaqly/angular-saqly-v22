import"./chunk-JS3ZFT6L.js";var e={id:18,title:"Performance \u0648Optimization",titleEn:"Performance and Optimization",level:"\u0645\u062A\u0648\u0633\u0637 \u2013 \u0645\u062A\u0642\u062F\u0645",levelEn:"Intermediate\u2013Advanced",intro:"Angular v22 \u064A\u0623\u062A\u064A \u0628Performance \u0645\u0645\u062A\u0627\u0632 \u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0627\u064B \u0628\u0641\u0636\u0644 Signals \u0648Zoneless. \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u064A\u063A\u0637\u064A \u0623\u0628\u0631\u0632 \u062A\u0642\u0646\u064A\u0627\u062A \u062A\u062D\u0633\u064A\u0646 Performance: OnPush\u060C Lazy Loading\u060C \u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0624\u062C\u0644 \u0644\u0644\u0635\u0648\u0631\u060C \u0648\u062F\u0645\u062C Profiler \u0644\u0642\u064A\u0627\u0633 Performance.",introEn:"Angular v22 delivers excellent performance by default thanks to Signals and Zoneless mode. This section covers the top performance optimization techniques: OnPush, Lazy Loading, deferred image loading, and using the Profiler to measure performance.",lessons:["\u0644\u0645\u0627\u0630\u0627 Signals \u062A\u064F\u062D\u0633\u0651\u0646 Performance\u061F","ChangeDetectionStrategy.OnPush","Zoneless Angular (provideZonelessChangeDetection)","Lazy Loading \u0644\u0644\u0645\u0643\u0648\u0651\u0646\u0627\u062A \u0648Routes","@defer \u2014 \u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0624\u062C\u0644 \u0644\u0644\u0645\u0643\u0648\u0651\u0646\u0627\u062A","NgOptimizedImage \u0644\u0644\u0635\u0648\u0631","trackBy \u0648\u0639\u0645\u0644\u064A\u0627\u062A @for \u0627\u0644\u0641\u0639\u0651\u0627\u0644\u0629","\u0642\u064A\u0627\u0633 Performance \u0628\u0623\u062F\u0648\u0627\u062A \u0627\u0644\u0645\u062A\u0635\u0641\u062D"],lessonsEn:["Why Signals Improve Performance","ChangeDetectionStrategy.OnPush","Zoneless Angular (provideZonelessChangeDetection)","Lazy Loading Components and Routes","@defer \u2014 Deferred Component Loading","NgOptimizedImage for Images","trackBy and Efficient @for","Measuring Performance with Browser Tools"],content:[{type:"heading",text:"\u0644\u0645\u0627\u0630\u0627 Signals \u062A\u064F\u062D\u0633\u0651\u0646 Performance\u061F"},{type:"paragraph",text:"\u0641\u064A Angular \u0627\u0644\u0642\u062F\u064A\u0645\u0629\u060C Zone.js \u064A\u064F\u0634\u063A\u0651\u0644 Change Detection \u0639\u0644\u0649 \u0643\u0644 \u0627\u0644\u0634\u062C\u0631\u0629 \u0639\u0646\u062F \u0623\u064A \u062D\u062F\u062B. \u0645\u0639 Signals:"},{type:"list",items:["Change Detection \u064A\u062D\u062F\u062B \u0641\u0642\u0637 \u0641\u064A Components \u0627\u0644\u062A\u064A \u062A\u0642\u0631\u0623 Signal \u062A\u063A\u064A\u0651\u0631\u062A \u0642\u064A\u0645\u062A\u0647\u0627","\u0644\u0627 \u062D\u0627\u062C\u0629 \u0644\u0640 markForCheck() \u0623\u0648 detectChanges() \u2014 \u0627\u0644\u0625\u0637\u0627\u0631 \u064A\u062A\u0643\u0641\u0644 \u0628\u0643\u0644 \u0634\u064A\u0621","\u0645\u0639 provideZonelessChangeDetection()\u060C \u062A\u062A\u062E\u0644\u0635 \u0645\u0646 Zone.js \u0643\u0644\u064A\u0627\u064B","computed() \u064A\u064F\u0639\u064A\u062F \u062D\u0633\u0627\u0628 \u0642\u064A\u0645\u062A\u0647 \u0641\u0642\u0637 \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 \u0623\u062D\u062F Inputs","\u0627\u0644\u0646\u062A\u064A\u062C\u0629: Performance \u0623\u0633\u0631\u0639 \u0628\u0643\u062B\u064A\u0631 \u0641\u064A \u0627\u0644\u062A\u0637\u0628\u064A\u0642\u0627\u062A \u0627\u0644\u0643\u0628\u064A\u0631\u0629"]},{type:"heading",text:"ChangeDetectionStrategy.OnPush"},{type:"paragraph",text:'OnPush \u064A\u062E\u0628\u0631 Angular: "\u062A\u062D\u0642\u0642 \u0645\u0646 \u0647\u0630\u0627 \u0627\u0644\u0645\u0643\u0648\u0651\u0646 \u0641\u0642\u0637 \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 Inputs \u0623\u0648 \u062D\u062F\u0648\u062B \u062D\u062F\u062B \u062F\u0627\u062E\u0644\u0647 \u0623\u0648 \u0625\u0634\u0627\u0631\u0629 Signal." \u0627\u0644\u0642\u0627\u0639\u062F\u0629: \u0636\u0639\u0647 \u0639\u0644\u0649 \u0643\u0644 \u0645\u0643\u0648\u0651\u0646.'},{type:"code",code:`import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush, // \u2190 \u062F\u0627\u0626\u0645\u0627\u064B
  template: \`
    <div class="card">
      <h3>{{ user().name }}</h3>
      <p>{{ user().email }}</p>
      @if (isExpanded()) {
        <div>{{ user().bio }}</div>
      }
      <button (click)="toggle()">
        {{ isExpanded() ? '\u0623\u062E\u0641\u0650' : '\u0623\u0638\u0647\u0631' }} \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644
      </button>
    </div>
  \`
})
export class UserCardComponent {
  user       = input.required<User>();
  isExpanded = signal(false);

  toggle() { this.isExpanded.update(v => !v); }
}`},{type:"heading",text:"Zoneless Angular"},{type:"code",code:`// app.config.ts \u2014 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0648\u0636\u0639 Zoneless
import { provideZonelessChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    // \u0627\u062D\u0630\u0641 provideZone() \u0625\u0630\u0627 \u0643\u0627\u0646\u062A \u0645\u0648\u062C\u0648\u062F\u0629
  ]
};

// package.json \u2014 \u0627\u062D\u0630\u0641 zone.js \u0645\u0646 polyfills
// angular.json \u2014 \u0623\u0632\u0644 "zone.js" \u0645\u0646 polyfills

// \u0627\u0644\u0646\u062A\u064A\u062C\u0629:
// - \u062D\u0632\u0645\u0629 \u0623\u0635\u063A\u0631 (zone.js \u2248 11KB)
// - \u0628\u062F\u0621 \u062A\u0634\u063A\u064A\u0644 \u0623\u0633\u0631\u0639
// - \u0644\u0627 monkey-patching \u0644\u0644\u0640 browser APIs
// - \u0643\u0634\u0641 \u062A\u063A\u064A\u064A\u0631\u0627\u062A \u062F\u0642\u064A\u0642 \u0641\u0642\u0637 \u0639\u0628\u0631 Signals`},{type:"tip",text:"Zoneless \u0647\u0648 \u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0645\u0633\u062A\u0642\u0628\u0644\u064A \u0644\u0640 Angular. \u0625\u0630\u0627 \u0643\u0627\u0646 \u062A\u0637\u0628\u064A\u0642\u0643 \u064A\u0633\u062A\u062E\u062F\u0645 Signals \u0628\u0634\u0643\u0644 \u0643\u0627\u0645\u0644\u060C \u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0622\u0646 \u0628\u062B\u0642\u0629."},{type:"heading",text:"@defer \u2014 \u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0624\u062C\u0644 \u0644\u0644\u0645\u0643\u0648\u0651\u0646\u0627\u062A"},{type:"code",code:`<!-- \u062A\u062D\u0645\u064A\u0644 \u0645\u0624\u062C\u0644 \u062D\u062A\u0649 \u064A\u064F\u0635\u0628\u062D \u0627\u0644\u0645\u0643\u0648\u0651\u0646 \u0645\u0631\u0626\u064A\u0627\u064B -->
@defer (on viewport) {
  <app-heavy-chart [data]="chartData()" />
} @placeholder {
  <div class="skeleton" style="height: 300px"></div>
} @loading (minimum 500ms) {
  <app-spinner />
} @error {
  <p>\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0631\u0633\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A</p>
}

<!-- \u062A\u062D\u0645\u064A\u0644 \u0639\u0646\u062F \u062A\u0641\u0627\u0639\u0644 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 -->
@defer (on interaction) {
  <app-comments [postId]="postId()" />
} @placeholder {
  <button>\u0639\u0631\u0636 \u0627\u0644\u062A\u0639\u0644\u064A\u0642\u0627\u062A</button>
}

<!-- \u062A\u062D\u0645\u064A\u0644 \u0628\u0639\u062F \u062A\u0623\u062E\u064A\u0631 -->
@defer (on timer(3s)) {
  <app-newsletter-banner />
}`},{type:"heading",text:"NgOptimizedImage \u0644\u0644\u0635\u0648\u0631"},{type:"code",code:`// \u0641\u064A \u0627\u0644\u0645\u0643\u0648\u0651\u0646 \u2014 \u0627\u0633\u062A\u064A\u0631\u0627\u062F NgOptimizedImage
import { NgOptimizedImage } from '@angular/common';

@Component({
  imports: [NgOptimizedImage],
  template: \`
    <!-- \u0635\u0648\u0631\u0629 \u0641\u0648\u0642 \u0627\u0644\u0637\u064A \u2014 \u0623\u0648\u0644\u0648\u064A\u0629 \u0639\u0627\u0644\u064A\u0629 -->
    <img
      ngSrc="/assets/hero.webp"
      width="1200"
      height="600"
      priority
      alt="\u0635\u0648\u0631\u0629 \u0631\u0626\u064A\u0633\u064A\u0629"
    />

    <!-- \u0635\u0648\u0631\u0629 \u062A\u062D\u062A \u0627\u0644\u0637\u064A \u2014 \u062A\u062D\u0645\u064A\u0644 \u0643\u0633\u0648\u0644 -->
    <img
      ngSrc="/assets/product.webp"
      width="400"
      height="300"
      alt="\u0645\u0646\u062A\u062C"
    />
    <!-- Angular \u064A\u064F\u0636\u064A\u0641 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B: loading="lazy", srcset, sizes -->
  \`
})
export class HeroComponent { }`},{type:"qa",question:"\u0644\u0645\u0627\u0630\u0627 \u064A\u064F\u0639\u062F\u0651 @defer \u0623\u0641\u0636\u0644 \u0645\u0646 *ngIf \u0644\u0644\u0645\u0643\u0648\u0651\u0646\u0627\u062A \u0627\u0644\u062B\u0642\u064A\u0644\u0629\u061F",answer:"*ngIf \u064A\u064F\u062E\u0641\u064A \u0623\u0648 \u064A\u064F\u0638\u0647\u0631 \u0627\u0644\u0645\u0643\u0648\u0651\u0646 \u0644\u0643\u0646 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u062E\u0627\u0635 \u0628\u0647 \u064A\u064F\u062D\u0645\u064E\u0651\u0644 \u062F\u0627\u0626\u0645\u0627\u064B \u0641\u064A bundle \u0627\u0644\u0631\u0626\u064A\u0633\u064A. @defer \u064A\u064F\u0642\u0633\u0651\u0645 \u0627\u0644\u0643\u0648\u062F (code splitting) \u0648\u064A\u064F\u062D\u0645\u0651\u0644\u0647 \u0641\u0639\u0644\u064A\u0627\u064B \u0641\u0642\u0637 \u0639\u0646\u062F \u0627\u0644\u062D\u0627\u062C\u0629 \u2014 \u064A\u064F\u0642\u0644\u0651\u0644 \u062D\u062C\u0645 \u0627\u0644\u0640 bundle \u0627\u0644\u0623\u0648\u0644\u064A \u0628\u0634\u0643\u0644 \u0643\u0628\u064A\u0631."},{type:"qa",question:"\u0645\u062A\u0649 \u064A\u062C\u0628 \u0625\u0636\u0627\u0641\u0629 ChangeDetectionStrategy.OnPush\u061F",answer:"\u0639\u0644\u0649 \u0643\u0644 \u0645\u0643\u0648\u0651\u0646 \u0628\u0634\u0643\u0644 \u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0641\u064A v22. \u0645\u0639 Signals\u060C \u0643\u0644 \u0627\u0644\u062A\u062D\u062F\u064A\u062B\u0627\u062A \u062A\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0635\u062D\u064A\u062D \u0645\u0639 OnPush \u062F\u0648\u0646 \u0623\u064A \u062C\u0647\u062F \u0625\u0636\u0627\u0641\u064A. \u0644\u0627 \u064A\u0648\u062C\u062F \u0633\u0628\u0628 \u0644\u0639\u062F\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0647 \u2014 \u0641\u0648\u0627\u0626\u062F\u0647 \u062F\u0627\u0626\u0645\u0627\u064B \u062A\u062A\u062C\u0627\u0648\u0632 \u062A\u0643\u0644\u0641\u062A\u0647 \u0627\u0644\u0635\u0641\u0631\u064A\u0629."}],contentEn:[{type:"heading",text:"Why Signals Improve Performance"},{type:"paragraph",text:"In older Angular, Zone.js triggers change detection on the whole tree for any event. With Signals:"},{type:"list",items:["Change detection only runs on components that read a Signal whose value changed","No need for markForCheck() or detectChanges() \u2014 the framework handles everything","With provideZonelessChangeDetection(), you eliminate Zone.js entirely","computed() only recalculates when one of its inputs changes","Result: significantly faster performance in large applications"]},{type:"heading",text:"ChangeDetectionStrategy.OnPush"},{type:"paragraph",text:'OnPush tells Angular: "only check this component when inputs change, an event occurs inside it, or a Signal it reads changes." Rule: put it on every component.'},{type:"code",code:`import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush, // \u2190 always
  template: \`
    <div class="card">
      <h3>{{ user().name }}</h3>
      <p>{{ user().email }}</p>
      @if (isExpanded()) { <div>{{ user().bio }}</div> }
      <button (click)="toggle()">
        {{ isExpanded() ? 'Hide' : 'Show' }} details
      </button>
    </div>
  \`
})
export class UserCardComponent {
  user       = input.required<User>();
  isExpanded = signal(false);
  toggle()   { this.isExpanded.update(v => !v); }
}`},{type:"heading",text:"Zoneless Angular"},{type:"code",code:`// app.config.ts \u2014 enable Zoneless mode
import { provideZonelessChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
  ]
};

// Remove zone.js from polyfills in angular.json
// Benefits:
// - Smaller bundle (zone.js \u2248 11KB saved)
// - Faster startup
// - No monkey-patching of browser APIs
// - Precise change detection driven purely by Signals`},{type:"tip",text:"Zoneless is the future direction of Angular. If your application uses Signals fully, you can make the switch now with confidence."},{type:"heading",text:"@defer \u2014 Deferred Component Loading"},{type:"code",code:`<!-- Defer until the component enters the viewport -->
@defer (on viewport) {
  <app-heavy-chart [data]="chartData()" />
} @placeholder {
  <div class="skeleton" style="height: 300px"></div>
} @loading (minimum 500ms) {
  <app-spinner />
} @error {
  <p>Failed to load chart</p>
}

<!-- Defer until user interaction -->
@defer (on interaction) {
  <app-comments [postId]="postId()" />
} @placeholder {
  <button>Show comments</button>
}

<!-- Defer with a timer -->
@defer (on timer(3s)) {
  <app-newsletter-banner />
}`},{type:"heading",text:"NgOptimizedImage for Images"},{type:"code",code:`import { NgOptimizedImage } from '@angular/common';

@Component({
  imports: [NgOptimizedImage],
  template: \`
    <!-- Above-the-fold image \u2014 high priority -->
    <img
      ngSrc="/assets/hero.webp"
      width="1200"
      height="600"
      priority
      alt="Hero image"
    />

    <!-- Below-the-fold image \u2014 lazy loaded -->
    <img
      ngSrc="/assets/product.webp"
      width="400"
      height="300"
      alt="Product"
    />
    <!-- Angular automatically adds: loading="lazy", srcset, sizes -->
  \`
})
export class HeroComponent { }`},{type:"qa",question:"Why is @defer better than *ngIf for heavy components?",answer:"*ngIf shows or hides the component but its code is always included in the main bundle. @defer does code splitting \u2014 the component code is only loaded when it is actually needed \u2014 significantly reducing the initial bundle size."},{type:"qa",question:"When should you add ChangeDetectionStrategy.OnPush?",answer:"On every component, by default, in v22. With Signals, all updates work correctly with OnPush without any extra work. There is no reason not to use it \u2014 the benefits always outweigh the zero cost."}]};export{e as default};
