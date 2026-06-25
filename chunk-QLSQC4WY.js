import"./chunk-JS3ZFT6L.js";var e={id:9,title:"\u0627\u0644\u0645\u0648\u062C\u0651\u0647\u0627\u062A \u0648\u0627\u0644\u0623\u0646\u0627\u0628\u064A\u0628",titleEn:"Directives and Pipes",level:"\u0645\u062A\u0648\u0633\u0637",levelEn:"Intermediate",intro:"\u0627\u0644\u0645\u0648\u062C\u0651\u0647\u0627\u062A \u062A\u064F\u0636\u064A\u0641 \u0633\u0644\u0648\u0643\u0627\u064B \u0639\u0644\u0649 \u0639\u0646\u0627\u0635\u0631 DOM \u0645\u0648\u062C\u0648\u062F\u0629. \u0627\u0644\u0623\u0646\u0627\u0628\u064A\u0628 \u062A\u062D\u0648\u0651\u0644 \u0627\u0644\u0642\u064A\u0645 \u0641\u064A \u0627\u0644\u0642\u0648\u0627\u0644\u0628. \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u064A\u063A\u0637\u064A \u0627\u0644\u0645\u0648\u062C\u0651\u0647\u0627\u062A \u0627\u0644\u0645\u062F\u0645\u062C\u0629 (NgClass\u060C NgStyle)\u060C \u0625\u0646\u0634\u0627\u0621 \u0645\u0648\u062C\u0651\u0647\u0627\u062A \u0645\u062E\u0635\u0635\u0629 (\u0633\u0645\u0627\u062A \u0648\u0647\u064A\u0643\u0644\u064A\u0629)\u060C \u0648\u0627\u0644\u0623\u0646\u0627\u0628\u064A\u0628 \u0627\u0644\u0645\u062F\u0645\u062C\u0629 \u0648\u0627\u0644\u0645\u062E\u0635\u0635\u0629.",introEn:"Directives add behavior to existing DOM elements. Pipes transform values in templates. This section covers built-in directives (NgClass, NgStyle), creating custom directives (attribute and structural), and built-in and custom pipes.",lessons:["\u0645\u0627 \u0647\u064A \u0627\u0644\u0645\u0648\u062C\u0651\u0647\u0627\u062A\u061F","\u0627\u0644\u0645\u0648\u062C\u0651\u0647\u0627\u062A \u0627\u0644\u0633\u0645\u0629 \u0627\u0644\u0645\u062F\u0645\u062C\u0629","\u0625\u0646\u0634\u0627\u0621 \u0645\u0648\u062C\u0651\u0647 \u0633\u0645\u0629 \u0645\u062E\u0635\u0635","\u0627\u0644\u0645\u0648\u062C\u0651\u0647\u0627\u062A \u0627\u0644\u0647\u064A\u0643\u0644\u064A\u0629 \u0627\u0644\u0645\u062E\u0635\u0635\u0629","\u0645\u0627 \u0647\u064A \u0627\u0644\u0623\u0646\u0627\u0628\u064A\u0628\u061F","\u0627\u0644\u0623\u0646\u0627\u0628\u064A\u0628 \u0627\u0644\u0645\u062F\u0645\u062C\u0629","\u0625\u0646\u0634\u0627\u0621 \u0623\u0646\u0628\u0648\u0628 \u0645\u062E\u0635\u0635","\u0627\u0644\u0623\u0646\u0627\u0628\u064A\u0628 \u0627\u0644\u0646\u0642\u064A\u0629 \u0645\u0642\u0627\u0628\u0644 \u063A\u064A\u0631 \u0627\u0644\u0646\u0642\u064A\u0629"],lessonsEn:["What are Directives?","Built-in Attribute Directives","Creating a Custom Attribute Directive","Custom Structural Directives","What are Pipes?","Built-in Pipes","Creating a Custom Pipe","Pure vs Impure Pipes"],content:[{type:"heading",text:"\u0645\u0627 \u0647\u064A \u0627\u0644\u0645\u0648\u062C\u0651\u0647\u0627\u062A\u061F"},{type:"paragraph",text:"\u0627\u0644\u0645\u0648\u062C\u0651\u0647 \u0647\u0648 \u0641\u0626\u0629 TypeScript \u0645\u0632\u064A\u0651\u0646\u0629 \u0628\u0640 @Directive \u062A\u064F\u0636\u064A\u0641 \u0633\u0644\u0648\u0643\u0627\u064B \u0623\u0648 \u0648\u0638\u064A\u0641\u0629 \u0644\u0639\u0646\u0635\u0631 DOM \u0623\u0648 \u0645\u0643\u0648\u0651\u0646. \u0644\u0627 \u062A\u0645\u0644\u0643 \u0642\u0627\u0644\u0628\u0627\u064B \u062E\u0627\u0635\u0627\u064B \u2014 \u062A\u064F\u063A\u064A\u0651\u0631 \u0627\u0644\u0639\u0646\u0635\u0631 \u0627\u0644\u0630\u064A \u062A\u064F\u0637\u0628\u064E\u0651\u0642 \u0639\u0644\u064A\u0647."},{type:"list",items:["\u0645\u0648\u062C\u0651\u0647\u0627\u062A \u0627\u0644\u0633\u0645\u0629 (Attribute) \u2014 \u062A\u064F\u063A\u064A\u0651\u0631 \u0645\u0638\u0647\u0631 \u0623\u0648 \u0633\u0644\u0648\u0643 \u0639\u0646\u0635\u0631: NgClass\u060C NgStyle\u060C \u0648\u0627\u0644\u0645\u062E\u0635\u0635\u0629","\u0627\u0644\u0645\u0648\u062C\u0651\u0647\u0627\u062A \u0627\u0644\u0647\u064A\u0643\u0644\u064A\u0629 (Structural) \u2014 \u062A\u064F\u0636\u064A\u0641 \u0623\u0648 \u062A\u064F\u0632\u064A\u0644 \u0639\u0646\u0627\u0635\u0631 \u0645\u0646 DOM: *ngIf\u060C *ngFor (\u0627\u0644\u0622\u0646 @if\u060C @for)","\u0645\u0648\u062C\u0651\u0647\u0627\u062A \u0627\u0644\u0645\u0643\u0648\u0651\u0646 (Component) \u2014 \u0627\u0644\u0645\u0643\u0648\u0651\u0646\u0627\u062A \u0646\u0641\u0633\u0647\u0627 \u0647\u064A \u0646\u0648\u0639 \u062E\u0627\u0635 \u0645\u0646 \u0627\u0644\u0645\u0648\u062C\u0651\u0647\u0627\u062A"]},{type:"heading",text:"\u0627\u0644\u0645\u0648\u062C\u0651\u0647\u0627\u062A \u0627\u0644\u0633\u0645\u0629 \u0627\u0644\u0645\u062F\u0645\u062C\u0629"},{type:"code",code:`import { NgClass, NgStyle } from '@angular/common';

@Component({
  imports: [NgClass, NgStyle],
  template: \`
    <!-- NgClass: \u0625\u0636\u0627\u0641\u0629/\u0625\u0632\u0627\u0644\u0629 \u0641\u0626\u0627\u062A CSS -->
    <div [ngClass]="{ active: isActive(), highlighted: isHighlighted() }">
      \u0645\u062D\u062A\u0648\u0649
    </div>

    <!-- NgStyle: \u0623\u0646\u0645\u0627\u0637 CSS \u0645\u0636\u0645\u0651\u0646\u0629 \u062F\u064A\u0646\u0627\u0645\u064A\u0643\u064A\u0629 -->
    <div [ngStyle]="{ color: textColor(), 'font-size': fontSize() + 'px' }">
      \u0646\u0635 \u0645\u0644\u0648\u0651\u0646
    </div>
  \`
})
// \u0645\u0644\u0627\u062D\u0638\u0629: \u0641\u064A v22\u060C \u064A\u064F\u0641\u0636\u064E\u0651\u0644 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 [class] \u0648[style] \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u064E\u064A\u0646 \u0628\u062F\u0644\u0627\u064B \u0645\u0646 NgClass/NgStyle
// [class]="{ active: isActive() }" \u0628\u062F\u0644\u0627\u064B \u0645\u0646 [ngClass]`},{type:"heading",text:"\u0625\u0646\u0634\u0627\u0621 \u0645\u0648\u062C\u0651\u0647 \u0633\u0645\u0629 \u0645\u062E\u0635\u0635"},{type:"code",code:`import { Directive, ElementRef, HostListener, input, effect } from '@angular/core';

@Directive({
  selector: '[appHighlight]',   // \u064A\u064F\u0637\u0628\u064E\u0651\u0642 \u0639\u0644\u0649 \u0623\u064A \u0639\u0646\u0635\u0631 \u0628\u0647\u0630\u0647 \u0627\u0644\u0633\u0645\u0629
  standalone: true,
})
export class HighlightDirective {
  appHighlight = input<string>('yellow');   // \u0644\u0648\u0646 \u0627\u0644\u0625\u0628\u0631\u0627\u0632 \u2014 \u0645\u062F\u062E\u0644 Signal

  constructor(private el: ElementRef<HTMLElement>) {
    effect(() => {
      this.el.nativeElement.style.setProperty(
        '--highlight-color',
        this.appHighlight()
      );
    });
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = this.appHighlight();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}

// \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0641\u064A \u0627\u0644\u0642\u0627\u0644\u0628:
// <p appHighlight="lightblue">\u0645\u0631\u062D\u0628\u0627\u064B \u0628\u0627\u0644\u0645\u0648\u062C\u0651\u0647\u0627\u062A!</p>`},{type:"heading",text:"\u0645\u0627 \u0647\u064A \u0627\u0644\u0623\u0646\u0627\u0628\u064A\u0628\u061F"},{type:"paragraph",text:"\u0627\u0644\u0623\u0646\u0628\u0648\u0628 \u0647\u0648 \u062F\u0627\u0644\u0629 TypeScript \u0645\u0632\u064A\u0651\u0646\u0629 \u0628\u0640 @Pipe \u062A\u062D\u0648\u0651\u0644 \u0642\u064A\u0645\u0629 \u0625\u0644\u0649 \u062A\u0645\u062B\u064A\u0644 \u0645\u062E\u062A\u0644\u0641 \u0641\u064A \u0627\u0644\u0642\u0627\u0644\u0628. \u062A\u064F\u0633\u062A\u062E\u062F\u0645 \u0628\u0635\u064A\u0627\u063A\u0629 | \u0641\u064A \u0627\u0644\u062A\u0639\u0628\u064A\u0631\u0627\u062A."},{type:"code",code:`<!-- \u0635\u064A\u0627\u063A\u0629 \u0627\u0644\u0623\u0646\u0628\u0648\u0628: value | pipeName:arg1:arg2 -->
<p>{{ today() | date:'yyyy/MM/dd' }}</p>
<p>{{ price() | currency:'SAR':'symbol':'1.2-2' }}</p>
<p>{{ name() | uppercase }}</p>
<p>{{ text() | slice:0:100 }}</p>
<p>{{ longText() | slice:0:50 }}...</p>`},{type:"heading",text:"\u0627\u0644\u0623\u0646\u0627\u0628\u064A\u0628 \u0627\u0644\u0645\u062F\u0645\u062C\u0629"},{type:"list",items:['DatePipe \u2014 | date:"yyyy-MM-dd" \u2014 \u062A\u0646\u0633\u064A\u0642 \u0627\u0644\u062A\u0648\u0627\u0631\u064A\u062E','CurrencyPipe \u2014 | currency:"USD" \u2014 \u062A\u0646\u0633\u064A\u0642 \u0627\u0644\u0639\u0645\u0644\u0627\u062A','DecimalPipe \u2014 | number:"1.2-2" \u2014 \u062A\u0646\u0633\u064A\u0642 \u0627\u0644\u0623\u0631\u0642\u0627\u0645',"UpperCasePipe \u2014 | uppercase \u2014 \u062A\u062D\u0648\u064A\u0644 \u0644\u0644\u062D\u0631\u0648\u0641 \u0627\u0644\u0643\u0628\u064A\u0631\u0629","LowerCasePipe \u2014 | lowercase \u2014 \u062A\u062D\u0648\u064A\u0644 \u0644\u0644\u062D\u0631\u0648\u0641 \u0627\u0644\u0635\u063A\u064A\u0631\u0629","TitleCasePipe \u2014 | titlecase \u2014 \u0623\u0648\u0644 \u062D\u0631\u0641 \u0643\u0628\u064A\u0631 \u0644\u0643\u0644 \u0643\u0644\u0645\u0629","SlicePipe \u2014 | slice:0:10 \u2014 \u062A\u0642\u0637\u064A\u0639 \u0627\u0644\u0645\u0635\u0641\u0648\u0641\u0627\u062A \u0648\u0627\u0644\u0646\u0635\u0648\u0635","JsonPipe \u2014 | json \u2014 \u062A\u062D\u0648\u064A\u0644 \u0643\u0627\u0626\u0646 \u0625\u0644\u0649 JSON \u0644\u0644\u0639\u0631\u0636 (\u0644\u0644\u062A\u0637\u0648\u064A\u0631)","AsyncPipe \u2014 | async \u2014 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0643 \u0641\u064A Observable / Promise","KeyValuePipe \u2014 | keyvalue \u2014 \u062A\u062D\u0648\u064A\u0644 \u0643\u0627\u0626\u0646 \u0625\u0644\u0649 \u0645\u0635\u0641\u0648\u0641\u0629 [{key, value}]"]},{type:"heading",text:"\u0625\u0646\u0634\u0627\u0621 \u0623\u0646\u0628\u0648\u0628 \u0645\u062E\u0635\u0635"},{type:"code",code:`import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
  pure: true,   // \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u2014 \u064A\u064F\u062D\u0633\u0628 \u0641\u0642\u0637 \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0645\u062F\u062E\u0644
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, maxLength: number = 50, suffix: string = '...'): string {
    if (!value) return '';
    if (value.length <= maxLength) return value;
    return value.slice(0, maxLength) + suffix;
  }
}

// \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645:
// <p>{{ longText() | truncate:100:'...' }}</p>
// <p>{{ title() | truncate }}</p>  \u2190 \u064A\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 50`},{type:"heading",text:"\u0627\u0644\u0623\u0646\u0627\u0628\u064A\u0628 \u0627\u0644\u0646\u0642\u064A\u0629 \u0645\u0642\u0627\u0628\u0644 \u063A\u064A\u0631 \u0627\u0644\u0646\u0642\u064A\u0629"},{type:"list",items:["\u0627\u0644\u0623\u0646\u0628\u0648\u0628 \u0627\u0644\u0646\u0642\u064A (pure: true\u060C \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A): \u064A\u064F\u062D\u0633\u0628 \u0641\u0642\u0637 \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 \u0645\u0631\u062C\u0639\u064A\u0629 \u0627\u0644\u0645\u062F\u062E\u0644 \u2014 \u0623\u062F\u0627\u0621 \u0645\u0645\u062A\u0627\u0632","\u0627\u0644\u0623\u0646\u0628\u0648\u0628 \u063A\u064A\u0631 \u0627\u0644\u0646\u0642\u064A (pure: false): \u064A\u064F\u062D\u0633\u0628 \u0641\u064A \u0643\u0644 \u062F\u0648\u0631\u0629 \u062A\u063A\u064A\u064A\u0631 \u2014 \u0627\u0633\u062A\u062E\u062F\u0645 \u0628\u062D\u0630\u0631 \u0634\u062F\u064A\u062F","AsyncPipe \u0647\u0648 \u0645\u062B\u0627\u0644 \u0639\u0644\u0649 \u0623\u0646\u0628\u0648\u0628 \u063A\u064A\u0631 \u0646\u0642\u064A \u2014 \u064A\u062D\u062A\u0627\u062C \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0643\u0644 \u062F\u0648\u0631\u0629","\u0625\u0630\u0627 \u0643\u0646\u062A \u062A\u062D\u062A\u0627\u062C \u0644\u062A\u062D\u0648\u064A\u0644 \u0645\u0635\u0641\u0648\u0641\u0629 \u062A\u062A\u063A\u064A\u0631 \u0645\u062D\u062A\u0648\u064A\u0627\u062A\u0647\u0627\u060C \u0627\u0633\u062A\u062E\u062F\u0645 computed() \u0628\u062F\u0644\u0627\u064B \u0645\u0646 \u0623\u0646\u0628\u0648\u0628 \u063A\u064A\u0631 \u0646\u0642\u064A"]},{type:"qa",question:"\u0645\u0627 \u0627\u0644\u0641\u0631\u0642 \u0628\u064A\u0646 \u0627\u0644\u0645\u0648\u062C\u0651\u0647 (Directive) \u0648\u0627\u0644\u0645\u0643\u0648\u0651\u0646 (Component)\u061F",answer:"\u0627\u0644\u0645\u0643\u0648\u0651\u0646 \u064A\u0645\u062A\u0644\u0643 \u0642\u0627\u0644\u0628 HTML \u062E\u0627\u0635 \u0628\u0647 \u2014 \u064A\u064F\u0646\u0634\u0626 \u0648\u0627\u062C\u0647\u0629 \u0645\u0633\u062A\u062E\u062F\u0645. \u0627\u0644\u0645\u0648\u062C\u0651\u0647 \u0644\u0627 \u064A\u0645\u0644\u0643 \u0642\u0627\u0644\u0628\u0627\u064B \u2014 \u064A\u064F\u0636\u064A\u0641 \u0633\u0644\u0648\u0643\u0627\u064B \u0623\u0648 \u062A\u062D\u0648\u064A\u0644\u0627\u064B \u0644\u0639\u0646\u0635\u0631 DOM \u0645\u0648\u062C\u0648\u062F. \u0645\u0646 \u0627\u0644\u0646\u0627\u062D\u064A\u0629 \u0627\u0644\u062A\u0642\u0646\u064A\u0629\u060C \u0627\u0644\u0645\u0643\u0648\u0651\u0646 \u0647\u0648 \u0645\u0648\u062C\u0651\u0647 \u0645\u0639 \u0642\u0627\u0644\u0628."},{type:"qa",question:"\u0645\u062A\u0649 \u064A\u064F\u0639\u064A\u062F Angular \u062D\u0633\u0627\u0628 \u0627\u0644\u0623\u0646\u0628\u0648\u0628 \u0627\u0644\u0646\u0642\u064A (pure pipe)\u061F",answer:"\u0641\u0642\u0637 \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 \u0645\u0631\u062C\u0639\u064A\u0629 \u0627\u0644\u0645\u062F\u062E\u0644 (\u0644\u0644\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0628\u062F\u0627\u0626\u064A\u0629: \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0642\u064A\u0645\u0629. \u0644\u0644\u0643\u0627\u0626\u0646\u0627\u062A \u0648\u0627\u0644\u0645\u0635\u0641\u0648\u0641\u0627\u062A: \u0645\u0631\u062C\u0639\u064A\u0629 \u062C\u062F\u064A\u062F\u0629). \u0644\u0647\u0630\u0627 \u064A\u062C\u0628 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 .update() \u0645\u0639 \u0627\u0644\u0645\u0635\u0641\u0648\u0641\u0627\u062A \u0628\u062F\u0644\u0627\u064B \u0645\u0646 .push() \u2014 \u0648\u0625\u0644\u0627 \u0644\u0646 \u064A\u064F\u062D\u0633\u0628 \u0627\u0644\u0623\u0646\u0628\u0648\u0628 \u0645\u0646 \u062C\u062F\u064A\u062F."}],contentEn:[{type:"heading",text:"What are Directives?"},{type:"paragraph",text:"A directive is a TypeScript class decorated with @Directive that adds behavior or functionality to an existing DOM element or component. It has no template of its own \u2014 it modifies the element it's applied to."},{type:"list",items:["Attribute directives \u2014 change appearance or behavior: NgClass, NgStyle, and custom ones","Structural directives \u2014 add or remove DOM elements: *ngIf, *ngFor (now @if, @for)","Component directives \u2014 components themselves are a special type of directive with a template"]},{type:"heading",text:"Built-in Attribute Directives"},{type:"code",code:`import { NgClass, NgStyle } from '@angular/common';

@Component({
  imports: [NgClass, NgStyle],
  template: \`
    <!-- NgClass: conditionally add/remove CSS classes -->
    <div [ngClass]="{ active: isActive(), highlighted: isHighlighted() }">
      Content
    </div>

    <!-- NgStyle: dynamic inline CSS styles -->
    <div [ngStyle]="{ color: textColor(), 'font-size': fontSize() + 'px' }">
      Styled text
    </div>
  \`
})
// Note: In v22, prefer direct [class] and [style] bindings over NgClass/NgStyle
// [class]="{ active: isActive() }" instead of [ngClass]`},{type:"heading",text:"Creating a Custom Attribute Directive"},{type:"code",code:`import { Directive, ElementRef, HostListener, input, effect } from '@angular/core';

@Directive({
  selector: '[appHighlight]',   // applied to any element with this attribute
  standalone: true,
})
export class HighlightDirective {
  appHighlight = input<string>('yellow');   // highlight color \u2014 signal input

  constructor(private el: ElementRef<HTMLElement>) {
    effect(() => {
      this.el.nativeElement.style.setProperty(
        '--highlight-color',
        this.appHighlight()
      );
    });
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = this.appHighlight();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}

// Usage in template:
// <p appHighlight="lightblue">Hello Directives!</p>`},{type:"heading",text:"What are Pipes?"},{type:"paragraph",text:"A pipe is a TypeScript class decorated with @Pipe that transforms a value into a different representation in templates. Used with the | syntax in expressions."},{type:"code",code:`<!-- Pipe syntax: value | pipeName:arg1:arg2 -->
<p>{{ today() | date:'yyyy/MM/dd' }}</p>
<p>{{ price() | currency:'USD':'symbol':'1.2-2' }}</p>
<p>{{ name() | uppercase }}</p>
<p>{{ text() | slice:0:100 }}</p>`},{type:"heading",text:"Built-in Pipes"},{type:"list",items:['DatePipe \u2014 | date:"yyyy-MM-dd" \u2014 format dates','CurrencyPipe \u2014 | currency:"USD" \u2014 format currency','DecimalPipe \u2014 | number:"1.2-2" \u2014 format numbers',"UpperCasePipe \u2014 | uppercase \u2014 convert to uppercase","LowerCasePipe \u2014 | lowercase \u2014 convert to lowercase","TitleCasePipe \u2014 | titlecase \u2014 first letter uppercase per word","SlicePipe \u2014 | slice:0:10 \u2014 slice arrays or strings","JsonPipe \u2014 | json \u2014 object to JSON string (for debugging)","AsyncPipe \u2014 | async \u2014 subscribe to Observable / Promise","KeyValuePipe \u2014 | keyvalue \u2014 convert object to [{key, value}] array"]},{type:"heading",text:"Creating a Custom Pipe"},{type:"code",code:`import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
  pure: true,   // default \u2014 only recomputes when input reference changes
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, maxLength: number = 50, suffix: string = '...'): string {
    if (!value) return '';
    if (value.length <= maxLength) return value;
    return value.slice(0, maxLength) + suffix;
  }
}

// Usage:
// <p>{{ longText() | truncate:100:'...' }}</p>
// <p>{{ title() | truncate }}</p>  \u2190 uses default of 50`},{type:"heading",text:"Pure vs Impure Pipes"},{type:"list",items:["Pure pipe (pure: true, default): only recomputes when the input reference changes \u2014 great performance","Impure pipe (pure: false): recomputes every change detection cycle \u2014 use sparingly","AsyncPipe is an example of an impure pipe \u2014 it needs to check every cycle for new emissions","If you need to transform an array whose contents change, use computed() instead of an impure pipe"]},{type:"qa",question:"What is the difference between a Directive and a Component?",answer:"A Component has its own HTML template \u2014 it creates UI. A Directive has no template \u2014 it adds behavior or transformation to an existing DOM element. Technically, a Component is a Directive with a template."},{type:"qa",question:"When does Angular recompute a pure pipe?",answer:"Only when the input reference changes (for primitives: value change; for objects/arrays: new reference). This is why you must use .update(arr => [...arr, item]) with arrays instead of .push() \u2014 otherwise the pipe won't recompute."}]};export{e as default};
