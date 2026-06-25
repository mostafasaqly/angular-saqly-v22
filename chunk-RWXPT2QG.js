import"./chunk-JS3ZFT6L.js";var e={id:4,title:"\u0627\u0644\u0642\u0648\u0627\u0644\u0628 \u0648\u0627\u0644\u0631\u0628\u0637",titleEn:"Templates and Binding",level:"\u0645\u0628\u062A\u062F\u0626 \u2013 \u0645\u062A\u0648\u0633\u0637",levelEn:"Beginner\u2013Intermediate",intro:"\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u064A\u063A\u0648\u0635 \u0639\u0645\u064A\u0642\u0627\u064B \u0641\u064A \u0643\u0644 \u0622\u0644\u064A\u0629 \u0631\u0628\u0637 \u0641\u064A \u0644\u063A\u0629 \u0642\u0648\u0627\u0644\u0628 Angular: \u0627\u0644\u0627\u0633\u062A\u064A\u0641\u0627\u0621\u060C \u0631\u0628\u0637 \u0627\u0644\u062E\u0627\u0635\u064A\u0629\u060C \u0631\u0628\u0637 \u0627\u0644\u062D\u062F\u062B\u060C \u0627\u0644\u0631\u0628\u0637 \u0627\u0644\u062B\u0646\u0627\u0626\u064A\u060C \u0645\u062A\u063A\u064A\u0631\u0627\u062A \u0645\u0631\u062C\u0639 \u0627\u0644\u0642\u0627\u0644\u0628\u060C \u0631\u0628\u0637 \u0627\u0644\u0641\u0626\u0629\u060C \u0631\u0628\u0637 \u0627\u0644\u0646\u0645\u0637\u060C \u0648\u0631\u0628\u0637 \u0627\u0644\u062E\u0627\u0635\u064A\u0629. \u0628\u0639\u062F \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0633\u062A\u0642\u062F\u0631 \u062A\u0631\u0628\u0637 \u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0623\u064A \u062C\u0632\u0621 \u0645\u0646 \u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645.",introEn:"This section covers every binding mechanism in Angular's template language \u2014 interpolation, property binding, event binding, two-way binding, template reference variables, class binding, style binding, and attribute binding \u2014 with real examples and the rules that govern each one.",lessons:["\u0627\u0644\u0627\u0633\u062A\u064A\u0641\u0627\u0621 {{ }}","\u0631\u0628\u0637 \u0627\u0644\u062E\u0627\u0635\u064A\u0629 [property]","\u0631\u0628\u0637 \u0627\u0644\u062D\u062F\u062B (event)","\u0627\u0644\u0631\u0628\u0637 \u0627\u0644\u062B\u0646\u0627\u0626\u064A [( )]","\u0645\u062A\u063A\u064A\u0631\u0627\u062A \u0645\u0631\u062C\u0639 \u0627\u0644\u0642\u0627\u0644\u0628 #ref","\u0631\u0628\u0637 \u0627\u0644\u0641\u0626\u0629 [class]","\u0631\u0628\u0637 \u0627\u0644\u0646\u0645\u0637 [style]","\u0631\u0628\u0637 \u0627\u0644\u0645\u0639\u0627\u0645\u0644 [attr]"],lessonsEn:["Interpolation {{ }}","Property Binding [property]","Event Binding (event)","Two-Way Binding [( )]","Template Reference Variables #ref","Class Binding [class]","Style Binding [style]","Attribute Binding [attr]"],content:[{type:"heading",text:"\u0627\u0644\u0627\u0633\u062A\u064A\u0641\u0627\u0621 {{ }}"},{type:"paragraph",text:"\u0627\u0644\u0627\u0633\u062A\u064A\u0641\u0627\u0621 \u064A\u064F\u0636\u0645\u0651\u0646 \u062A\u0639\u0628\u064A\u0631 TypeScript \u0641\u064A \u0627\u0644\u0642\u0627\u0644\u0628 \u0643\u0646\u0635. \u0627\u0644\u0635\u064A\u0627\u063A\u0629 \u0627\u0644\u0645\u0632\u062F\u0648\u062C\u0629 {{ }} \u062A\u062E\u0628\u0631 Angular \u0628\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u062A\u0639\u0628\u064A\u0631 \u0648\u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0646\u062A\u064A\u062C\u0629 \u0625\u0644\u0649 \u0646\u0635."},{type:"code",code:`@Component({
  template: \`
    <h1>{{ title() }}</h1>
    <p>\u0627\u0644\u0639\u0646\u0627\u0635\u0631: {{ items().length }} (\u0645\u0636\u0627\u0639\u0641: {{ items().length * 2 }})</p>
    <p>\u0627\u0644\u062D\u0627\u0644\u0629: {{ isActive() ? '\u0646\u0634\u0637' : '\u063A\u064A\u0631 \u0646\u0634\u0637' }}</p>
    <p>\u0627\u0644\u062A\u0627\u0631\u064A\u062E: {{ today() | date:'longDate' }}</p>
  \`
})
export class ProfileComponent {
  title = signal('\u0645\u0644\u0641\u064A \u0627\u0644\u0634\u062E\u0635\u064A');
  items = signal(['\u0623\u0646\u062C\u0648\u0644\u0627\u0631', 'Signals', 'TypeScript']);
  isActive = signal(true);
  today = signal(new Date());
}`},{type:"warning",text:"\u0627\u0644\u0627\u0633\u062A\u064A\u0641\u0627\u0621 \u0644\u0644\u0642\u0631\u0627\u0621\u0629 \u0641\u0642\u0637 \u2014 \u0644\u0627 \u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u062A\u0639\u064A\u064A\u0646 (count = 5) \u0648\u0644\u0627 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 new \u0648\u0644\u0627 template literals \u062F\u0627\u062E\u0644\u0647."},{type:"heading",text:"\u0631\u0628\u0637 \u0627\u0644\u062E\u0627\u0635\u064A\u0629 [property]"},{type:"paragraph",text:'\u0631\u0628\u0637 \u0627\u0644\u062E\u0627\u0635\u064A\u0629 \u064A\u064F\u0639\u064A\u0651\u0646 \u062E\u0627\u0635\u064A\u0629 DOM \u0644\u0639\u0646\u0635\u0631 HTML \u0623\u0648 \u0645\u062F\u062E\u0644 (input) \u0644\u0645\u0643\u0648\u0651\u0646. \u0627\u0644\u0635\u064A\u0627\u063A\u0629: [property]="expression"'},{type:"code",code:`<!-- \u062E\u0635\u0627\u0626\u0635 DOM -->
<img [src]="user().avatarUrl" [alt]="user().name" />
<button [disabled]="isLoading()">\u0625\u0631\u0633\u0627\u0644</button>
<input [value]="defaultValue()" />

<!-- \u0645\u062F\u062E\u0644\u0627\u062A \u0627\u0644\u0645\u0643\u0648\u0651\u0646 -->
<app-user-card [user]="currentUser()" [showActions]="canEdit()" />`},{type:"tip",text:'\u0627\u0644\u0641\u0631\u0642 \u0627\u0644\u062D\u0627\u0633\u0645: [src]="url" \u064A\u064F\u0639\u064A\u0651\u0646 \u062E\u0627\u0635\u064A\u0629 DOM (\u0635\u062D\u064A\u062D). src="{{ url }}" \u064A\u064F\u0639\u064A\u0651\u0646 HTML attribute (\u0642\u062F \u064A\u0633\u0628\u0628 \u0648\u0645\u064A\u0636\u0627\u064B \u0645\u0624\u0642\u062A\u0627\u064B). \u0627\u0633\u062A\u062E\u062F\u0645 \u062F\u0627\u0626\u0645\u0627\u064B \u0631\u0628\u0637 \u0627\u0644\u062E\u0627\u0635\u064A\u0629 \u0644\u0644\u0642\u064A\u0645 \u0627\u0644\u062F\u064A\u0646\u0627\u0645\u064A\u0643\u064A\u0629.'},{type:"heading",text:"\u0631\u0628\u0637 \u0627\u0644\u062D\u062F\u062B (event)"},{type:"paragraph",text:'\u0631\u0628\u0637 \u0627\u0644\u062D\u062F\u062B \u064A\u0633\u062A\u0645\u0639 \u0644\u0623\u062D\u062F\u0627\u062B DOM \u0648\u064A\u0633\u062A\u062F\u0639\u064A \u062F\u0627\u0644\u0629 \u0641\u064A \u0627\u0644\u0641\u0626\u0629 \u0639\u0646\u062F \u0648\u0642\u0648\u0639\u0647\u0627. \u0627\u0644\u0635\u064A\u0627\u063A\u0629: (eventName)="handler($event)"'},{type:"code",code:`<button (click)="save()">\u062D\u0641\u0638</button>
<input (keydown.enter)="submit()" (keydown.escape)="cancel()" />
<form (submit)="onSubmit($event)">...</form>

// \u0641\u064A \u0627\u0644\u0641\u0626\u0629:
onInput(event: Event): void {
  const value = (event.target as HTMLInputElement).value;
  this.searchTerm.set(value);
}`},{type:"tip",text:"Angular \u064A\u0648\u0641\u0631 \u0641\u0644\u062A\u0631\u0629 \u0627\u062E\u062A\u0635\u0627\u0631\u064A\u0629 \u0644\u0623\u062D\u062F\u0627\u062B \u0644\u0648\u062D\u0629 \u0627\u0644\u0645\u0641\u0627\u062A\u064A\u062D: (keydown.enter)\u060C (keydown.escape)\u060C (keydown.ctrl.s). \u0644\u0627 \u062A\u062D\u062A\u0627\u062C \u0644\u0641\u062D\u0635 event.key \u064A\u062F\u0648\u064A\u0627\u064B."},{type:"heading",text:"\u0627\u0644\u0631\u0628\u0637 \u0627\u0644\u062B\u0646\u0627\u0626\u064A [( )]"},{type:"paragraph",text:'\u0627\u0644\u0631\u0628\u0637 \u0627\u0644\u062B\u0646\u0627\u0626\u064A \u064A\u062C\u0645\u0639 \u0631\u0628\u0637 \u0627\u0644\u062E\u0627\u0635\u064A\u0629 \u0648\u0631\u0628\u0637 \u0627\u0644\u062D\u062F\u062B \u0641\u064A \u0635\u064A\u0627\u063A\u0629 \u0645\u062E\u062A\u0635\u0631\u0629. \u064A\u064F\u0633\u0645\u0651\u0649 "\u0627\u0644\u0645\u0648\u0632\u0629 \u0641\u064A \u0627\u0644\u0635\u0646\u062F\u0648\u0642" \u0628\u0633\u0628\u0628 \u0634\u0643\u0644 \u0627\u0644\u0623\u0642\u0648\u0627\u0633 [()].'},{type:"code",code:`import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],   // \u0645\u0637\u0644\u0648\u0628 \u0644\u0640 ngModel
  template: \`
    <input [(ngModel)]="searchQuery" placeholder="\u0627\u0644\u0628\u062D\u062B..." />
    <p>\u062A\u0628\u062D\u062B \u0639\u0646: {{ searchQuery }}</p>
  \`
})
export class SearchComponent {
  searchQuery = '';   // ngModel \u064A\u0639\u0645\u0644 \u0645\u0639 \u0627\u0644\u062E\u0635\u0627\u0626\u0635 \u0627\u0644\u0639\u0627\u062F\u064A\u0629 \u0648\u0627\u0644\u0640 signals
}`},{type:"tip",text:"\u0641\u064A Angular v22\u060C \u0627\u0633\u062A\u062E\u062F\u0645 Signal Forms \u0644\u0644\u0646\u0645\u0627\u0630\u062C \u0627\u0644\u062D\u0642\u064A\u0642\u064A\u0629. \u0627\u0633\u062A\u062E\u062F\u0645 ngModel \u0641\u0642\u0637 \u0644\u0644\u0631\u0628\u0637 \u0627\u0644\u062B\u0646\u0627\u0626\u064A \u0627\u0644\u0628\u0633\u064A\u0637 \u062E\u0627\u0631\u062C \u0627\u0644\u0646\u0645\u0627\u0630\u062C."},{type:"heading",text:"\u0645\u062A\u063A\u064A\u0631\u0627\u062A \u0645\u0631\u062C\u0639 \u0627\u0644\u0642\u0627\u0644\u0628 #ref"},{type:"paragraph",text:"\u0645\u062A\u063A\u064A\u0631 \u0645\u0631\u062C\u0639 \u0627\u0644\u0642\u0627\u0644\u0628 \u0647\u0648 \u0627\u0633\u0645 \u0645\u0631\u062C\u0639\u064A \u0644\u0639\u0646\u0635\u0631 \u0623\u0648 \u0645\u0643\u0648\u0651\u0646 \u062F\u0627\u062E\u0644 \u0627\u0644\u0642\u0627\u0644\u0628. \u062A\u064F\u0639\u0644\u0646\u0647 \u0628\u0640 #name \u0648\u062A\u0633\u062A\u062E\u062F\u0645\u0647 \u0641\u064A \u0623\u064A \u0645\u0643\u0627\u0646 \u0622\u062E\u0631 \u0628\u0646\u0641\u0633 \u0627\u0644\u0642\u0627\u0644\u0628."},{type:"code",code:`<!-- \u0645\u0631\u062C\u0639 \u0644\u0639\u0646\u0635\u0631 DOM native -->
<input #searchInput type="text" placeholder="\u0628\u062D\u062B..." />
<button (click)="search(searchInput.value)">\u0628\u062D\u062B</button>
<button (click)="searchInput.focus()">\u062A\u0631\u0643\u064A\u0632</button>

<!-- \u0645\u0631\u062C\u0639 \u0644\u0646\u0633\u062E\u0629 \u0627\u0644\u0645\u0643\u0648\u0651\u0646 -->
<app-datepicker #picker />
<button (click)="picker.open()">\u0641\u062A\u062D \u0627\u0644\u062A\u0642\u0648\u064A\u0645</button>`},{type:"heading",text:"\u0631\u0628\u0637 \u0627\u0644\u0641\u0626\u0629 [class]"},{type:"paragraph",text:"\u0631\u0628\u0637 \u0627\u0644\u0641\u0626\u0629 \u064A\u064F\u0636\u064A\u0641 \u0623\u0648 \u064A\u064F\u0632\u064A\u0644 \u0641\u0626\u0627\u062A CSS \u062F\u064A\u0646\u0627\u0645\u064A\u0643\u064A\u0627\u064B \u0639\u0644\u0649 \u0639\u0646\u0635\u0631 DOM."},{type:"code",code:`<!-- \u0641\u0626\u0629 \u0648\u0627\u062D\u062F\u0629: \u062A\u064F\u0636\u0627\u0641 \u0639\u0646\u062F\u0645\u0627 \u062A\u0643\u0648\u0646 \u0627\u0644\u062D\u0627\u0644\u0629 true -->
<div [class.active]="isActive()">\u0646\u0634\u0637</div>

<!-- \u0639\u062F\u0629 \u0641\u0626\u0627\u062A \u062F\u0641\u0639\u0629 \u0648\u0627\u062D\u062F\u0629: \u0643\u0627\u0626\u0646 (\u0645\u0641\u062A\u0627\u062D=\u0627\u0633\u0645 \u0627\u0644\u0641\u0626\u0629\u060C \u0642\u064A\u0645\u0629=\u0634\u0631\u0637) -->
<button [class]="{ loading: isLoading(), error: hasError(), large: isLarge() }">
  \u0625\u0631\u0633\u0627\u0644
</button>

<!-- \u0627\u0644\u0641\u0626\u0627\u062A \u0627\u0644\u062B\u0627\u0628\u062A\u0629 \u0648\u0627\u0644\u062F\u064A\u0646\u0627\u0645\u064A\u0643\u064A\u0629 \u062A\u062A\u0639\u0627\u064A\u0634 -->
<button class="btn btn--primary" [class.btn--loading]="loading()">
  \u062D\u0641\u0638
</button>`},{type:"heading",text:"\u0631\u0628\u0637 \u0627\u0644\u0646\u0645\u0637 [style]"},{type:"paragraph",text:"\u0631\u0628\u0637 \u0627\u0644\u0646\u0645\u0637 \u064A\u064F\u0639\u064A\u0651\u0646 \u0623\u0646\u0645\u0627\u0637 CSS \u0645\u0636\u0645\u0651\u0646\u0629 \u062F\u064A\u0646\u0627\u0645\u064A\u0643\u064A\u0627\u064B."},{type:"code",code:`<!-- \u0646\u0645\u0637 \u0648\u0627\u062D\u062F -->
<div [style.color]="textColor()">\u0646\u0635 \u0645\u0644\u0648\u0651\u0646</div>
<div [style.width.px]="widthPx()">\u0639\u0631\u0636 \u0628\u0627\u0644\u0628\u0643\u0633\u0644</div>
<div [style.opacity]="opacity()">\u0634\u0641\u0627\u0641\u064A\u0629 0-1</div>

<!-- \u0639\u062F\u0629 \u0623\u0646\u0645\u0627\u0637: \u0643\u0627\u0626\u0646 CSS -->
<div [style]="{ color: textColor(), fontSize: fontSize() + 'px' }">
  \u0646\u0635 \u0645\u062A\u0639\u062F\u062F \u0627\u0644\u0623\u0646\u0645\u0627\u0637
</div>`},{type:"tip",text:"\u0627\u0641\u0636\u0651\u0644 \u0631\u0628\u0637 \u0627\u0644\u0641\u0626\u0629 \u0639\u0644\u0649 \u0631\u0628\u0637 \u0627\u0644\u0646\u0645\u0637 \u0644\u0644\u062D\u0627\u0644\u0627\u062A \u0627\u0644\u0645\u0631\u0626\u064A\u0629 (active, disabled, error). \u0627\u062D\u062A\u0641\u0638 \u0628\u0631\u0628\u0637 \u0627\u0644\u0646\u0645\u0637 \u0644\u0644\u0642\u064A\u0645 \u0627\u0644\u0645\u062D\u0633\u0648\u0628\u0629 \u0631\u0642\u0645\u064A\u0627\u064B (\u0639\u0631\u0636\u060C \u0627\u0631\u062A\u0641\u0627\u0639\u060C \u0634\u0641\u0627\u0641\u064A\u0629)."},{type:"heading",text:"\u0631\u0628\u0637 \u0627\u0644\u0645\u0639\u0627\u0645\u0644 [attr]"},{type:"paragraph",text:"\u0628\u0639\u0636 \u0645\u0639\u0627\u0645\u0644\u0627\u062A HTML \u0644\u0627 \u062A\u0645\u0644\u0643 \u062E\u0627\u0635\u064A\u0629 DOM \u0645\u0642\u0627\u0628\u0644\u0629. \u0644\u0647\u0630\u0647 \u0627\u0644\u062D\u0627\u0644\u0627\u062A\u060C \u0627\u0633\u062A\u062E\u062F\u0645 \u0631\u0628\u0637 \u0627\u0644\u0645\u0639\u0627\u0645\u0644 \u0628\u0627\u0644\u0628\u0627\u062F\u0626\u0629 attr."},{type:"code",code:`<!-- \u0645\u0639\u0627\u0645\u0644\u0627\u062A ARIA \u2014 \u0644\u0627 \u062E\u0627\u0635\u064A\u0629 DOM \u0645\u0642\u0627\u0628\u0644\u0629 -->
<button [attr.aria-label]="deleteLabel()">\u062D\u0630\u0641</button>
<div [attr.aria-expanded]="isOpen()" [attr.aria-controls]="panelId">
  \u062A\u0628\u062F\u064A\u0644
</div>

<!-- data-* attributes -->
<li [attr.data-id]="item.id" [attr.data-category]="item.category">
  {{ item.name }}
</li>

<!-- \u0625\u0632\u0627\u0644\u0629 \u0645\u0639\u0627\u0645\u0644: \u0627\u0636\u0628\u0637\u0647 \u0639\u0644\u0649 null -->
<button [attr.aria-controls]="canEdit() ? panelId : null">\u062A\u0639\u062F\u064A\u0644</button>`},{type:"qa",question:'\u0645\u0627 \u0627\u0644\u0641\u0631\u0642 \u0628\u064A\u0646 [src]="url" \u0648 src="{{ url }}" \u0648\u0623\u064A\u0647\u0645\u0627 \u0623\u0641\u0636\u0644 \u0648\u0644\u0645\u0627\u0630\u0627\u061F',answer:'[src]="url" \u064A\u064F\u0639\u064A\u0651\u0646 \u062E\u0627\u0635\u064A\u0629 DOM \u0645\u0628\u0627\u0634\u0631\u0629\u064B \u2014 \u0622\u0645\u0646 \u0648\u062F\u0642\u064A\u0642. src="{{ url }}" \u064A\u064F\u0639\u064A\u0651\u0646 HTML attribute \u0639\u0628\u0631 \u062F\u0645\u062C \u0646\u0635 \u2014 \u0642\u062F \u064A\u0633\u0628\u0628 \u0648\u0645\u064A\u0636\u0627\u064B \u0645\u0624\u0642\u062A\u0627\u064B \u062D\u064A\u062B \u064A\u062D\u0627\u0648\u0644 \u0627\u0644\u0645\u062A\u0635\u0641\u062D \u062A\u062D\u0645\u064A\u0644 "[object Object]" \u0642\u0628\u0644 \u0623\u0646 \u064A\u0639\u0645\u0644 Angular. \u0627\u0633\u062A\u062E\u062F\u0645 \u062F\u0627\u0626\u0645\u0627\u064B [src] \u0644\u0644\u0642\u064A\u0645 \u0627\u0644\u062F\u064A\u0646\u0627\u0645\u064A\u0643\u064A\u0629.'},{type:"qa",question:"\u0645\u062A\u0649 \u062A\u0633\u062A\u062E\u062F\u0645 [attr.x] \u0628\u062F\u0644\u0627\u064B \u0645\u0646 [x]\u061F",answer:"\u0627\u0633\u062A\u062E\u062F\u0645 [attr.x] \u0639\u0646\u062F\u0645\u0627 \u0644\u0627 \u064A\u0643\u0648\u0646 \u0644\u0644\u0645\u0639\u0627\u0645\u0644 \u062E\u0627\u0635\u064A\u0629 DOM \u0645\u0642\u0627\u0628\u0644\u0629 \u2014 \u0623\u0633\u0627\u0633\u0627\u064B: \u0645\u0639\u0627\u0645\u0644\u0627\u062A ARIA (aria-label\u060C aria-expanded)\u060C data-* attributes\u060C colspan (\u0645\u0642\u0627\u0628\u0644 colSpan)\u060C \u0648\u0645\u0639\u0627\u0645\u0644\u0627\u062A SVG. \u0627\u0633\u062A\u062E\u062F\u0645 [x] \u0627\u0644\u0639\u0627\u062F\u064A \u0644\u0643\u0644 \u0645\u0639\u0627\u0645\u0644 \u0644\u0647 \u062E\u0627\u0635\u064A\u0629 DOM \u0645\u0642\u0627\u0628\u0644\u0629."}],contentEn:[{type:"heading",text:"Interpolation {{ }}"},{type:"paragraph",text:"Interpolation embeds a TypeScript expression into a template as text. The double-curly-brace syntax {{ }} tells Angular's template compiler to evaluate the expression and convert the result to a string."},{type:"code",code:`@Component({
  template: \`
    <h1>{{ title() }}</h1>
    <p>Items: {{ items().length }} (doubled: {{ items().length * 2 }})</p>
    <p>Status: {{ isActive() ? 'Active' : 'Inactive' }}</p>
    <p>Date: {{ today() | date:'longDate' }}</p>
  \`
})
export class ProfileComponent {
  title = signal('My Profile');
  items = signal(['Angular', 'Signals', 'TypeScript']);
  isActive = signal(true);
  today = signal(new Date());
}`},{type:"warning",text:"Interpolation is read-only \u2014 no assignment (count = 5), no new keyword, no template literals inside {{ }}."},{type:"heading",text:"Property Binding [property]"},{type:"paragraph",text:`Property binding sets a DOM element's JavaScript property or a component's input to the value of a TypeScript expression. Syntax: [property]="expression"`},{type:"code",code:`<!-- DOM properties -->
<img [src]="user().avatarUrl" [alt]="user().name" />
<button [disabled]="isLoading()">Submit</button>
<input [value]="defaultValue()" />

<!-- Component inputs -->
<app-user-card [user]="currentUser()" [showActions]="canEdit()" />`},{type:"tip",text:'Key distinction: [src]="url" sets the DOM property (correct). src="{{ url }}" sets the HTML attribute (may cause a brief broken-image flash). Always use property binding for dynamic values.'},{type:"heading",text:"Event Binding (event)"},{type:"paragraph",text:'Event binding listens to DOM events and calls a class method when they fire. Syntax: (eventName)="handler($event)"'},{type:"code",code:`<button (click)="save()">Save</button>
<input (keydown.enter)="submit()" (keydown.escape)="cancel()" />
<form (submit)="onSubmit($event)">...</form>

// In the class:
onInput(event: Event): void {
  const value = (event.target as HTMLInputElement).value;
  this.searchTerm.set(value);
}`},{type:"tip",text:"Angular provides keyboard event filters: (keydown.enter), (keydown.escape), (keydown.ctrl.s). No need to check event.key manually."},{type:"heading",text:"Two-Way Binding [( )]"},{type:"paragraph",text:'Two-way binding combines property binding and event binding into one concise syntax. The "banana-in-a-box" [()] keeps a class property and a template input in sync in both directions.'},{type:"code",code:`import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],   // REQUIRED for ngModel
  template: \`
    <input [(ngModel)]="searchQuery" placeholder="Search..." />
    <p>Searching for: {{ searchQuery }}</p>
  \`
})
export class SearchComponent {
  searchQuery = '';   // ngModel works with both plain props and signals
}`},{type:"tip",text:"In Angular v22, use Signal Forms for real forms. Use ngModel only for simple two-way bindings outside of forms."},{type:"heading",text:"Template Reference Variables #ref"},{type:"paragraph",text:"A template reference variable is a named reference to an element or component in the template. Declare with #name and use it anywhere else in the same template."},{type:"code",code:`<!-- Reference to a native DOM element -->
<input #searchInput type="text" placeholder="Search..." />
<button (click)="search(searchInput.value)">Search</button>
<button (click)="searchInput.focus()">Focus</button>

<!-- Reference to a component instance -->
<app-datepicker #picker />
<button (click)="picker.open()">Open Calendar</button>`},{type:"heading",text:"Class Binding [class]"},{type:"paragraph",text:"Class binding conditionally adds or removes CSS classes on a DOM element based on a TypeScript expression."},{type:"code",code:`<!-- Single class: added when condition is true -->
<div [class.active]="isActive()">Active</div>

<!-- Multiple classes at once: object (key=class name, value=boolean) -->
<button [class]="{ loading: isLoading(), error: hasError(), large: isLarge() }">
  Submit
</button>

<!-- Static and dynamic classes coexist -->
<button class="btn btn--primary" [class.btn--loading]="loading()">
  Save
</button>`},{type:"heading",text:"Style Binding [style]"},{type:"paragraph",text:"Style binding sets individual inline CSS styles or multiple styles dynamically."},{type:"code",code:`<!-- Single style -->
<div [style.color]="textColor()">Colored text</div>
<div [style.width.px]="widthPx()">Width in pixels</div>
<div [style.opacity]="opacity()">Opacity 0-1</div>

<!-- Multiple styles: CSS object -->
<div [style]="{ color: textColor(), fontSize: fontSize() + 'px' }">
  Multi-styled text
</div>`},{type:"tip",text:"Prefer class binding over style binding for visual UI states (active, disabled, error). Reserve style binding for computed numeric values (width, height, opacity)."},{type:"heading",text:"Attribute Binding [attr]"},{type:"paragraph",text:"Some HTML attributes don't have a corresponding DOM property. For these, use attribute binding with the attr. prefix."},{type:"code",code:`<!-- ARIA attributes \u2014 no DOM property equivalent -->
<button [attr.aria-label]="deleteLabel()">Delete</button>
<div [attr.aria-expanded]="isOpen()" [attr.aria-controls]="panelId">
  Toggle
</div>

<!-- data-* attributes -->
<li [attr.data-id]="item.id" [attr.data-category]="item.category">
  {{ item.name }}
</li>

<!-- Remove an attribute: set to null -->
<button [attr.aria-controls]="canEdit() ? panelId : null">Edit</button>`},{type:"qa",question:'What is the difference between [src]="url" and src="{{ url }}", and which is correct?',answer:'[src]="url" sets the DOM property directly \u2014 safe and correct. src="{{ url }}" sets the HTML attribute via string concatenation and may cause a brief broken-image flash where the browser tries to load "[object Object]" before Angular runs. Always use [src] for dynamic values.'},{type:"qa",question:"When should you use [attr.x] instead of [x]?",answer:"Use [attr.x] when the attribute has no corresponding DOM JavaScript property \u2014 primarily ARIA attributes (aria-label, aria-expanded), data-* attributes, colspan (vs colSpan), and SVG attributes. Use plain [x] for any attribute that has a DOM property equivalent."}]};export{e as default};
