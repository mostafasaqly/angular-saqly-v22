// 06-custom-validator.ts
// Custom synchronous and asynchronous validator functions for use with any Angular form strategy.

import { AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

// ============================================================================
// 1. SYNCHRONOUS VALIDATORS
// ============================================================================

// ---------------------------------------------------------------------------
// noSpacesValidator — rejects values that contain whitespace
// ---------------------------------------------------------------------------
export function noSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null; // empty is handled by Validators.required
    const hasSpaces = /\s/.test(control.value as string);
    return hasSpaces ? { noSpaces: { value: control.value } } : null;
  };
}

// ---------------------------------------------------------------------------
// forbiddenWordsValidator — rejects values matching a list of forbidden strings
// ---------------------------------------------------------------------------
export function forbiddenWordsValidator(words: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const lower = (control.value as string).toLowerCase();
    const found = words.find(w => lower.includes(w.toLowerCase()));
    return found ? { forbiddenWord: { word: found } } : null;
  };
}

// Usage:
// new FormControl('', forbiddenWordsValidator(['admin', 'root', 'superuser']))

// ---------------------------------------------------------------------------
// minAgeValidator — rejects dates where the person is younger than minAge
// ---------------------------------------------------------------------------
export function minAgeValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const birthDate  = new Date(control.value as string);
    const today      = new Date();
    const ageInYears = today.getFullYear() - birthDate.getFullYear();
    const hasBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
    const actualAge = hasBirthdayPassed ? ageInYears : ageInYears - 1;
    return actualAge < minAge ? { minAge: { required: minAge, actual: actualAge } } : null;
  };
}

// Usage on a date input:
// new FormControl('', minAgeValidator(18))

// ---------------------------------------------------------------------------
// passwordStrengthValidator — enforces uppercase, digit, and special char
// ---------------------------------------------------------------------------
export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value ?? '';
    const errors: ValidationErrors = {};

    if (!/[A-Z]/.test(value))  errors['noUppercase']  = true;
    if (!/[0-9]/.test(value))  errors['noDigit']      = true;
    if (!/[^A-Za-z0-9]/.test(value)) errors['noSpecialChar'] = true;

    return Object.keys(errors).length ? errors : null;
  };
}

// ---------------------------------------------------------------------------
// passwordMatchValidator — cross-field validator applied to a FormGroup
// ---------------------------------------------------------------------------
export function passwordMatchValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const pw  = group.get('password')?.value;
    const cpw = group.get('confirmPassword')?.value;
    return pw === cpw ? null : { passwordMismatch: true };
  };
}

// Usage:
// new FormGroup({ password: ..., confirmPassword: ... }, { validators: passwordMatchValidator() })


// ============================================================================
// 2. ASYNCHRONOUS VALIDATORS
// ============================================================================

// ---------------------------------------------------------------------------
// uniqueEmailValidator — checks server whether email is already registered
// ---------------------------------------------------------------------------
export function uniqueEmailValidator(http: HttpClient): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = control.value as string;
    if (!email || !email.includes('@')) return of(null); // bail early

    // Debounce 400 ms so we don't flood the API on every keystroke
    return timer(400).pipe(
      switchMap(() =>
        http.get<{ exists: boolean }>(`/api/users/check-email?email=${encodeURIComponent(email)}`)
      ),
      map(res => (res.exists ? { emailTaken: true } : null)),
      catchError(() => of(null)) // never break the form on network error
    );
  };
}

// Usage:
// new FormControl('', {
//   validators: [Validators.required, Validators.email],
//   asyncValidators: [uniqueEmailValidator(inject(HttpClient))],
//   updateOn: 'blur'
// })

// ---------------------------------------------------------------------------
// uniqueUsernameValidator — similar pattern for usernames
// ---------------------------------------------------------------------------
export function uniqueUsernameValidator(http: HttpClient): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const username = control.value as string;
    if (!username || username.length < 3) return of(null);

    return timer(400).pipe(
      switchMap(() =>
        http.get<{ taken: boolean }>(`/api/users/check-username?name=${encodeURIComponent(username)}`)
      ),
      map(res => (res.taken ? { usernameTaken: true } : null)),
      catchError(() => of(null))
    );
  };
}

// ============================================================================
// 3. DIRECTIVE WRAPPER (for use in template-driven forms)
// ============================================================================

import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector:    '[noSpaces]',
  standalone:  true,
  providers: [{ provide: NG_VALIDATORS, useExisting: NoSpacesDirective, multi: true }]
})
export class NoSpacesDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return noSpacesValidator()(control);
  }
}

// Usage in template-driven form:
// <input name="username" ngModel noSpaces />
