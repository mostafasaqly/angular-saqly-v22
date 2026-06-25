// 05-form-array.component.ts
// Demonstrates FormArray for dynamic lists of fields (add/remove at runtime).

import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';

interface Skill {
  name:  string;
  level: 'beginner' | 'intermediate' | 'expert';
}

interface ProfileFormValue {
  fullName: string;
  skills:   Skill[];
}

@Component({
  selector: 'app-form-array',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    <h2>Developer Profile — FormArray Demo</h2>

    <form [formGroup]="form" (ngSubmit)="onSubmit()">

      <!-- Simple text field -->
      <label>
        Full Name
        <input formControlName="fullName" />
      </label>

      <!-- FormArray for skills -->
      <fieldset formArrayName="skills">
        <legend>Skills</legend>

        @for (skill of skillsArray.controls; track $index; let i = $index) {
          <div [formGroupName]="i" class="skill-row">

            <label>
              Skill Name
              <input formControlName="name" placeholder="e.g. Angular" />
              @if (getSkillControl(i, 'name').invalid && getSkillControl(i, 'name').touched) {
                <span class="error">Skill name is required.</span>
              }
            </label>

            <label>
              Level
              <select formControlName="level">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
            </label>

            <!-- Can only remove if there's more than one skill -->
            @if (skillsArray.length > 1) {
              <button type="button" (click)="removeSkill(i)">Remove</button>
            }
          </div>
        }

        <button type="button" (click)="addSkill()">+ Add Skill</button>
      </fieldset>

      <button type="submit" [disabled]="form.invalid">Save Profile</button>
    </form>

    <pre>{{ form.value | json }}</pre>
  `
})
export class FormArrayComponent {
  form = new FormGroup({
    fullName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    skills:   new FormArray([this.buildSkillGroup()]),
  });

  // Typed getter — avoids repeated casting in template
  get skillsArray(): FormArray {
    return this.form.get('skills') as FormArray;
  }

  // Helper to access a specific control inside a skill group
  getSkillControl(index: number, field: keyof Skill): FormControl {
    return (this.skillsArray.at(index) as FormGroup).get(field) as FormControl;
  }

  // Factory — creates a new skill FormGroup with default values
  private buildSkillGroup(name = '', level: Skill['level'] = 'beginner'): FormGroup {
    return new FormGroup({
      name:  new FormControl(name,  { nonNullable: true, validators: [Validators.required] }),
      level: new FormControl(level, { nonNullable: true }),
    });
  }

  addSkill(): void {
    this.skillsArray.push(this.buildSkillGroup());
  }

  removeSkill(index: number): void {
    this.skillsArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const value = this.form.getRawValue() as ProfileFormValue;
    console.log('Profile:', value);
  }
}
