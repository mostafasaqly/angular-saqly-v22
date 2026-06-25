// 07-dynamic-form.component.ts
// Demonstrates programmatically adding/removing form fields at runtime,
// including a schema-driven approach for data-configurable forms.

import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

// ---------------------------------------------------------------------------
// Schema definition — in real apps this often comes from an API
// ---------------------------------------------------------------------------
interface FieldSchema {
  key:       string;
  label:     string;
  type:      'text' | 'email' | 'number' | 'textarea' | 'select';
  required?: boolean;
  options?:  string[];          // for <select>
  min?:      number;            // for number inputs
  max?:      number;
}

const CONTACT_SCHEMA: FieldSchema[] = [
  { key: 'name',    label: 'Full Name',    type: 'text',     required: true },
  { key: 'email',   label: 'Email',        type: 'email',    required: true },
  { key: 'phone',   label: 'Phone',        type: 'text',     required: false },
  { key: 'role',    label: 'Role',         type: 'select',   required: true,
    options: ['Developer', 'Designer', 'Manager', 'QA'] },
  { key: 'message', label: 'Message',      type: 'textarea', required: true },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <h2>Dynamic Form Demo</h2>

    <!-- PART A: Schema-driven form -->
    <section>
      <h3>Part A — Schema-driven form</h3>
      <form [formGroup]="schemaForm" (ngSubmit)="onSchemaSubmit()">
        @for (field of schema; track field.key) {
          <label>
            {{ field.label }} {{ field.required ? '*' : '' }}

            @if (field.type === 'textarea') {
              <textarea [formControlName]="field.key" rows="4"></textarea>
            } @else if (field.type === 'select') {
              <select [formControlName]="field.key">
                <option value="">-- Select --</option>
                @for (opt of field.options; track opt) {
                  <option [value]="opt">{{ opt }}</option>
                }
              </select>
            } @else {
              <input [type]="field.type" [formControlName]="field.key" />
            }

            @if (getControl(field.key).invalid && getControl(field.key).touched) {
              <span class="error">{{ field.label }} is required.</span>
            }
          </label>
        }
        <button type="submit" [disabled]="schemaForm.invalid">Send</button>
      </form>
    </section>

    <!-- PART B: Add/remove email addresses dynamically -->
    <section>
      <h3>Part B — Dynamic email list (FormArray)</h3>
      <form [formGroup]="emailListForm" (ngSubmit)="onEmailSubmit()">

        <div formArrayName="emails">
          @for (ctrl of emailControls.controls; track $index; let i = $index) {
            <div class="email-row">
              <input
                [formControlName]="i"
                type="email"
                [placeholder]="'Email #' + (i + 1)"
              />
              <button
                type="button"
                (click)="removeEmail(i)"
                [disabled]="emailControls.length === 1"
              >
                Remove
              </button>
              @if (emailControls.at(i).invalid && emailControls.at(i).touched) {
                <span class="error">Valid email required.</span>
              }
            </div>
          }
        </div>

        <button type="button" (click)="addEmail()">+ Add Email</button>
        <button type="submit" [disabled]="emailListForm.invalid">Submit Emails</button>
      </form>
    </section>

    <!-- Debug output -->
    <pre>Schema form value: {{ schemaForm.value | json }}</pre>
    <pre>Email list: {{ emailListForm.value | json }}</pre>
  `
})
export class DynamicFormComponent implements OnInit {
  schema = CONTACT_SCHEMA;

  // --- Schema-driven form ---
  schemaForm!: FormGroup;

  // --- Dynamic email list ---
  emailListForm = new FormGroup({
    emails: new FormArray([
      new FormControl('', [Validators.required, Validators.email])
    ])
  });

  get emailControls(): FormArray {
    return this.emailListForm.get('emails') as FormArray;
  }

  ngOnInit(): void {
    this.schemaForm = this.buildFormFromSchema(this.schema);
  }

  // Build a FormGroup dynamically from the schema array
  private buildFormFromSchema(fields: FieldSchema[]): FormGroup {
    const controls: Record<string, FormControl> = {};

    for (const field of fields) {
      const validators = field.required ? [Validators.required] : [];
      if (field.type === 'email') validators.push(Validators.email);
      if (field.min !== undefined) validators.push(Validators.min(field.min));
      if (field.max !== undefined) validators.push(Validators.max(field.max));

      controls[field.key] = new FormControl('', validators);
    }

    return new FormGroup(controls);
  }

  // Shortcut to access a control by key (avoids template verbosity)
  getControl(key: string): AbstractControl {
    return this.schemaForm.get(key)!;
  }

  // --- Email list actions ---
  addEmail(): void {
    this.emailControls.push(
      new FormControl('', [Validators.required, Validators.email])
    );
  }

  removeEmail(index: number): void {
    this.emailControls.removeAt(index);
  }

  // --- Submit handlers ---
  onSchemaSubmit(): void {
    if (this.schemaForm.valid) {
      console.log('Schema form value:', this.schemaForm.value);
    }
  }

  onEmailSubmit(): void {
    if (this.emailListForm.valid) {
      console.log('Emails:', this.emailListForm.value);
    }
  }
}
