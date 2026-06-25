import"./chunk-JS3ZFT6L.js";var e={id:21,title:"\u0623\u062F\u0648\u0627\u062A \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0648\u062A\u062C\u0631\u0628\u0629 \u0627\u0644\u0645\u0637\u0648\u0651\u0631",titleEn:"AI Tooling and Developer Experience",level:"\u0645\u0628\u062A\u062F\u0626 \u2013 \u0645\u062A\u0648\u0633\u0637",levelEn:"Beginner\u2013Intermediate",intro:"\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u063A\u064A\u0651\u0631 \u0643\u064A\u0641\u064A\u0629 \u0643\u062A\u0627\u0628\u0629 Angular. \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u064A\u063A\u0637\u064A \u0643\u064A\u0641 \u062A\u0633\u062A\u062E\u062F\u0645 \u0623\u062F\u0648\u0627\u062A \u0645\u062B\u0644 GitHub Copilot \u0648Claude \u0648Cursor \u0644\u062A\u0633\u0631\u064A\u0639 \u062A\u0637\u0648\u064A\u0631\u0643\u060C \u0648\u0623\u0641\u0636\u0644 \u0645\u0645\u0627\u0631\u0633\u0627\u062A \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0647\u0627 \u0641\u064A \u0645\u0634\u0627\u0631\u064A\u0639 Angular v22.",introEn:"AI has transformed how Angular is written. This section covers how to use tools like GitHub Copilot, Claude, and Cursor to speed up your development, and best practices for using them in Angular v22 projects.",lessons:["\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0641\u064A \u062A\u0637\u0648\u064A\u0631 Angular","GitHub Copilot \u2014 \u0627\u0644\u0625\u0639\u062F\u0627\u062F \u0648\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645","Claude \u0641\u064A \u0643\u062A\u0627\u0628\u0629 Components","Cursor IDE \u0648\u0627\u0644\u0640 AI-first workflow","\u0643\u062A\u0627\u0628\u0629 Prompts \u0641\u0639\u0651\u0627\u0644\u0629 \u0644\u0644\u0643\u0648\u062F Angular","\u062A\u0648\u0644\u064A\u062F Tests \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A","\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0643\u0648\u062F \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A","\u062D\u062F\u0648\u062F \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0641\u064A \u0627\u0644\u0628\u0631\u0645\u062C\u0629"],lessonsEn:["AI in Angular Development","GitHub Copilot \u2014 Setup and Usage","Claude for Writing Components","Cursor IDE and AI-First Workflow","Writing Effective Angular Prompts","Generating Tests with AI","AI Code Review","Limits of AI in Programming"],content:[{type:"heading",text:"\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0641\u064A \u062A\u0637\u0648\u064A\u0631 Angular"},{type:"paragraph",text:"\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0644\u0627 \u064A\u0633\u062A\u0628\u062F\u0644 \u0627\u0644\u0645\u0637\u0648\u0651\u0631 \u2014 \u064A\u064F\u0636\u062E\u0651\u0645 \u0642\u062F\u0631\u0627\u062A\u0647. \u0645\u0637\u0648\u0651\u0631 Angular \u064A\u0641\u0647\u0645 \u0627\u0644\u0645\u0641\u0627\u0647\u064A\u0645 + \u064A\u0633\u062A\u062E\u062F\u0645 AI = \u0625\u0646\u062A\u0627\u062C\u064A\u0629 \u0623\u0639\u0644\u0649 \u0628\u0643\u062B\u064A\u0631."},{type:"list",items:["\u062A\u0648\u0644\u064A\u062F Components \u0627\u0644\u0645\u062A\u0643\u0631\u0631\u0629 (forms\u060C cards\u060C tables) \u0628\u0634\u0643\u0644 \u0623\u0633\u0631\u0639","\u0627\u0642\u062A\u0631\u0627\u062D \u0623\u0646\u0645\u0627\u0637 Angular \u0627\u0644\u062D\u062F\u064A\u062B\u0629 (Signals\u060C input()\u060C inject())","\u0643\u062A\u0627\u0628\u0629 Tests \u0627\u0644\u0645\u0645\u0651\u0644\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B","\u0634\u0631\u062D \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0645\u0639\u0642\u0651\u062F \u0648\u0623\u062E\u0637\u0627\u0621 TypeScript","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0647\u064A\u0643\u0644\u0629 (Refactoring) \u0645\u0646 \u0623\u0646\u0645\u0627\u0637 \u0642\u062F\u064A\u0645\u0629 \u0644\u0644\u062D\u062F\u064A\u062B\u0629"]},{type:"heading",text:"\u0643\u062A\u0627\u0628\u0629 Prompts \u0641\u0639\u0651\u0627\u0644\u0629 \u0644\u0644\u0643\u0648\u062F Angular"},{type:"paragraph",text:"\u062C\u0648\u062F\u0629 \u0627\u0644\u0646\u0627\u062A\u062C = \u062C\u0648\u062F\u0629 \u0627\u0644\u0640 Prompt. \u0643\u0648\u0651\u0646 \u0645\u0633\u0627\u0639\u062F\u0643 \u0628\u0627\u0644\u0633\u064A\u0627\u0642 \u0627\u0644\u0635\u062D\u064A\u062D."},{type:"code",code:`// Prompt \u062C\u064A\u062F \u0644\u062A\u0648\u0644\u064A\u062F \u0645\u0643\u0648\u0651\u0646 Angular:
/*
\u0623\u0646\u0634\u0626 \u0645\u0643\u0648\u0651\u0646 Angular v22 standalone \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645:
- ChangeDetectionStrategy.OnPush
- input() \u0648output() \u0648signal() (\u0648\u0644\u064A\u0633 @Input@\u060C @Output)
- inject() \u0628\u062F\u0644\u0627\u064B \u0645\u0646 constructor injection
- @for \u0648@if (\u0648\u0644\u064A\u0633 *ngFor \u0648*ngIf)

\u0627\u0644\u0645\u0643\u0648\u0651\u0646: ProductCardComponent
Inputs: product: Product\u060C showRating: boolean (\u0627\u062E\u062A\u064A\u0627\u0631\u064A\u060C \u0627\u0641\u062A\u0631\u0627\u0636\u064A false)
Outputs: addToCart \u064A\u064F\u0631\u0633\u0644 Product

\u0627\u0644\u0646\u0648\u0639 Product:
interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  imageUrl: string;
}
*/

// Prompt \u0636\u0639\u064A\u0641:
// "\u0623\u0646\u0634\u0626 \u0645\u0643\u0648\u0651\u0646 angular \u0644\u0639\u0631\u0636 \u0645\u0646\u062A\u062C"`},{type:"heading",text:"\u062A\u0648\u0644\u064A\u062F Tests \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A"},{type:"code",code:`// \u0645\u062B\u0627\u0644 \u0639\u0644\u0649 Prompt \u0644\u062A\u0648\u0644\u064A\u062F \u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A:
/*
\u0627\u0643\u062A\u0628 \u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A Jasmine/TestBed \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u0643\u0648\u0651\u0646 Angular v22:

[\u0627\u0644\u0635\u0642 \u0643\u0648\u062F \u0627\u0644\u0645\u0643\u0648\u0651\u0646 \u0647\u0646\u0627]

\u0627\u0643\u062A\u0628 \u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0644\u0640:
1. \u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u0623\u0648\u0644\u064A \u0644\u0644\u0645\u062D\u062A\u0648\u0649
2. \u0627\u0644\u062A\u0641\u0627\u0639\u0644 \u0645\u0639 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 (\u0627\u0644\u0636\u063A\u0637 \u0639\u0644\u0649 \u0627\u0644\u0623\u0632\u0631\u0627\u0631)
3. \u062A\u063A\u064A\u064A\u0631 Inputs \u0648\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0639\u0631\u0636
4. \u062D\u0627\u0644\u0627\u062A \u0627\u0644\u062D\u0627\u0641\u0629 (\u0645\u0635\u0641\u0648\u0641\u0629 \u0641\u0627\u0631\u063A\u0629\u060C \u0642\u064A\u0645 null)

\u0627\u0633\u062A\u062E\u062F\u0645 data-testid \u0644\u0644\u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u0639\u0646 \u0627\u0644\u0639\u0646\u0627\u0635\u0631
*/

// \u0646\u0635\u064A\u062D\u0629: \u0631\u0627\u062C\u0639 Tests \u0627\u0644\u0646\u0627\u062A\u062C\u0629 \u2014 AI \u064A\u064F\u0646\u0634\u0626 \u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A
// \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u062F\u0627\u062E\u0644\u064A \u0623\u062D\u064A\u0627\u0646\u0627\u064B \u0628\u062F\u0644\u0627\u064B \u0645\u0646 \u0627\u0644\u0633\u0644\u0648\u0643 \u0627\u0644\u062E\u0627\u0631\u062C\u064A`},{type:"heading",text:"\u062D\u062F\u0648\u062F \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0641\u064A \u0627\u0644\u0628\u0631\u0645\u062C\u0629"},{type:"list",items:["AI \u0644\u0627 \u064A\u0639\u0631\u0641 \u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0645\u0634\u0631\u0648\u0639\u0643 \u0627\u0644\u062E\u0627\u0635 \u2014 \u062F\u0627\u0626\u0645\u0627\u064B \u0631\u0627\u062C\u0639 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0646\u0627\u062A\u062C","\u0642\u062F \u064A\u064F\u0648\u0644\u0651\u062F \u0623\u0646\u0645\u0627\u0637 Angular \u0642\u062F\u064A\u0645\u0629 \u0625\u0630\u0627 \u0644\u0645 \u062A\u064F\u0648\u0636\u0651\u062D \u0627\u0644\u0625\u0635\u062F\u0627\u0631","\u0644\u0627 \u064A\u0641\u0647\u0645 \u0627\u0644\u0633\u064A\u0627\u0642 \u0627\u0644\u062A\u062C\u0627\u0631\u064A \u2014 \u0642\u062F \u064A\u064F\u0628\u0633\u0651\u0637 \u0627\u0644\u0645\u0646\u0637\u0642 \u0627\u0644\u0645\u0639\u0642\u0651\u062F","Tests \u0627\u0644\u0646\u0627\u062A\u062C\u0629 \u0642\u062F \u062A\u062E\u062A\u0628\u0631 \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0644\u0627 \u0627\u0644\u0633\u0644\u0648\u0643 \u2014 \u0631\u0627\u062C\u0639\u0647\u0627","\u0627\u0644\u062B\u0642\u0629 \u0627\u0644\u0639\u0645\u064A\u0627\u0621 \u0628\u0640 AI \u062A\u064F\u0646\u062A\u062C \u0643\u0648\u062F\u0627\u064B \u064A\u0639\u0645\u0644 \u0644\u0643\u0646 \u0644\u0627 \u064A\u064F\u0635\u0627\u0646","\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0623\u0645\u062B\u0644: AI \u064A\u0643\u062A\u0628\u060C \u0623\u0646\u062A \u062A\u064F\u0631\u0627\u062C\u0639 \u0648\u062A\u064F\u0641\u0643\u0651\u0631"]},{type:"warning",text:"\u0644\u0627 \u062A\u0642\u0628\u0644 \u0643\u0648\u062F \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u062F\u0648\u0646 \u0641\u0647\u0645\u0647 \u0623\u0648\u0644\u0627\u064B. \u0625\u0630\u0627 \u0644\u0645 \u062A\u0641\u0647\u0645 \u0645\u0627 \u064A\u0641\u0639\u0644\u0647 \u0627\u0644\u0643\u0648\u062F\u060C \u0644\u0627 \u064A\u0645\u0643\u0646\u0643 \u062A\u0635\u062D\u064A\u062D\u0647 \u0639\u0646\u062F \u0648\u062C\u0648\u062F \u0645\u0634\u0643\u0644\u0629 \u2014 \u0648\u0633\u062A\u0643\u0648\u0646 \u0647\u0646\u0627\u0643 \u0645\u0634\u0643\u0644\u0629 \u062F\u0627\u0626\u0645\u0627\u064B."},{type:"heading",text:"Angular CLI \u0648\u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0627\u0644\u0645\u062F\u0645\u062C\u0629"},{type:"code",code:`# \u062A\u0648\u0644\u064A\u062F \u0645\u0643\u0648\u0651\u0646 standalone
ng generate component features/product-card --standalone

# \u062A\u0648\u0644\u064A\u062F \u062E\u062F\u0645\u0629
ng generate service core/services/auth

# \u062A\u0648\u0644\u064A\u062F guard
ng generate guard core/guards/auth --functional

# \u062A\u0648\u0644\u064A\u062F pipe
ng generate pipe shared/pipes/truncate

# \u062A\u062D\u062F\u064A\u062B Angular \u0644\u0622\u062E\u0631 \u0625\u0635\u062F\u0627\u0631
ng update @angular/core @angular/cli

# \u062A\u062D\u0644\u064A\u0644 \u062D\u062C\u0645 \u0627\u0644\u0640 bundle
ng build --stats-json
npx webpack-bundle-analyzer dist/my-app/browser/stats.json

# \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 Performance
ng build --configuration production
lighthouse http://localhost:4000 --view`},{type:"qa",question:"\u0643\u064A\u0641 \u062A\u064F\u0648\u0636\u0651\u062D \u0644\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0623\u0646\u0645\u0627\u0637 \u0627\u0644\u062D\u062F\u064A\u062B\u0629 \u0641\u064A Angular v22\u061F",answer:'\u0641\u064A \u0628\u062F\u0627\u064A\u0629 \u0643\u0644 \u0645\u062D\u0627\u062F\u062B\u0629 \u0623\u0648 Prompt\u060C \u0623\u0636\u0641: "\u0627\u0633\u062A\u062E\u062F\u0645 Angular v22 \u0645\u0639: input() \u0648output() \u0648signal() \u0648computed()\u060C \u0648inject() \u0628\u062F\u0644\u0627\u064B \u0645\u0646 constructor\u060C \u0648@if \u0648@for \u0628\u062F\u0644\u0627\u064B \u0645\u0646 *ngIf \u0648*ngFor\u060C \u0648ChangeDetectionStrategy.OnPush \u0639\u0644\u0649 \u0643\u0644 \u0645\u0643\u0648\u0651\u0646." \u0647\u0630\u0627 \u064A\u064F\u0648\u062C\u0651\u0647 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0644\u0644\u0623\u0646\u0645\u0627\u0637 \u0627\u0644\u0635\u062D\u064A\u062D\u0629.'},{type:"qa",question:"\u0645\u0627 \u0647\u0648 \u0627\u0644\u0640 AI-first workflow \u0641\u064A Cursor IDE\u061F",answer:"Cursor \u064A\u064F\u062F\u0645\u062C AI \u0641\u064A \u0627\u0644\u0645\u062D\u0631\u0631 \u0646\u0641\u0633\u0647 \u2014 \u064A\u0645\u0643\u0646\u0643 \u062A\u062D\u062F\u064A\u062F \u0643\u062A\u0644\u0629 \u0643\u0648\u062F \u0648\u0627\u0644\u0636\u063A\u0637 Ctrl+K \u0644\u062A\u0639\u062F\u064A\u0644\u0647\u0627 \u0623\u0648 Ctrl+L \u0644\u0633\u0624\u0627\u0644 AI \u0639\u0646\u0647\u0627. \u064A\u0631\u0649 AI \u0643\u0644 \u0645\u0644\u0641\u0627\u062A \u0645\u0634\u0631\u0648\u0639\u0643 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B. \u0627\u0644\u0641\u0627\u0631\u0642 \u0639\u0646 Copilot: \u064A\u0645\u0643\u0646\u0647 \u0631\u0624\u064A\u0629 \u0627\u0644\u0633\u064A\u0627\u0642 \u0627\u0644\u0643\u0627\u0645\u0644 \u0644\u0644\u0645\u0634\u0631\u0648\u0639 \u0648\u0644\u064A\u0633 \u0641\u0642\u0637 \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u062D\u0627\u0644\u064A."}],contentEn:[{type:"heading",text:"AI in Angular Development"},{type:"paragraph",text:"AI does not replace the developer \u2014 it amplifies their capabilities. An Angular developer who understands the concepts + uses AI = far higher productivity."},{type:"list",items:["Generate repetitive components (forms, cards, tables) much faster","Suggest modern Angular patterns (Signals, input(), inject())","Automatically write tedious tests","Explain complex code and TypeScript errors","Refactor from old patterns to modern ones"]},{type:"heading",text:"Writing Effective Angular Prompts"},{type:"paragraph",text:"Quality output = quality prompt. Prime your AI assistant with the right context."},{type:"code",code:`// Good Angular prompt:
/*
Create a standalone Angular v22 component using:
- ChangeDetectionStrategy.OnPush
- input(), output(), signal() (NOT @Input, @Output)
- inject() instead of constructor injection
- @for and @if (NOT *ngFor and *ngIf)

Component: ProductCardComponent
Inputs: product: Product, showRating: boolean (optional, default false)
Outputs: addToCart emitting Product

Product type:
interface Product {
  id: number; name: string; price: number;
  rating: number; imageUrl: string;
}
*/

// Bad prompt:
// "create an angular component to show a product"`},{type:"heading",text:"Generating Tests with AI"},{type:"code",code:`// Example prompt to generate tests:
/*
Write Jasmine/TestBed tests for this Angular v22 component:

[Paste component code here]

Write tests for:
1. Initial content rendering
2. User interaction (button clicks)
3. Input changes and view updates
4. Edge cases (empty array, null values)

Use data-testid to query elements.
*/

// Note: review AI-generated tests \u2014 AI sometimes writes
// implementation tests instead of behavior tests`},{type:"heading",text:"Limits of AI in Programming"},{type:"list",items:["AI does not know your specific project requirements \u2014 always review generated code","May generate old Angular patterns if you do not specify the version","Does not understand business context \u2014 may oversimplify complex logic","Generated tests may test implementation not behavior \u2014 review them","Blind trust in AI produces code that works but cannot be maintained","Optimal use: AI writes, you review and think"]},{type:"warning",text:"Never accept AI code without understanding it first. If you do not understand what the code does, you cannot fix it when something goes wrong \u2014 and something will always go wrong."},{type:"heading",text:"Angular CLI and Built-in Tooling"},{type:"code",code:`# Generate standalone component
ng generate component features/product-card --standalone

# Generate service
ng generate service core/services/auth

# Generate functional guard
ng generate guard core/guards/auth --functional

# Generate pipe
ng generate pipe shared/pipes/truncate

# Update Angular to the latest version
ng update @angular/core @angular/cli

# Analyze bundle size
ng build --stats-json
npx webpack-bundle-analyzer dist/my-app/browser/stats.json

# Measure performance
ng build --configuration production
lighthouse http://localhost:4000 --view`},{type:"qa",question:"How do you tell AI to use modern Angular v22 patterns?",answer:'At the start of every conversation or prompt, add: "Use Angular v22 with: input(), output(), signal(), computed(), inject() instead of constructor, @if and @for instead of *ngIf and *ngFor, and ChangeDetectionStrategy.OnPush on every component." This guides the model toward the correct patterns.'},{type:"qa",question:"What is the AI-first workflow in Cursor IDE?",answer:"Cursor embeds AI directly into the editor \u2014 you can select a code block and press Ctrl+K to modify it or Ctrl+L to ask AI about it. AI automatically sees all your project files. The key difference from Copilot: it can see the full project context, not just the current file."}]};export{e as default};
