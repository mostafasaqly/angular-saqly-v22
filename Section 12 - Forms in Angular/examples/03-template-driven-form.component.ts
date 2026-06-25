// 03-template-driven-form.component.ts
// Demonstrates ngModel, ngForm, and the template-driven approach in Angular v22.

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

interface ContactFormData {
  name:    string;
  email:   string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  template: `
    <h2>Contact Us</h2>

    <!--
      #contactForm="ngForm" — template reference to the NgForm directive.
      Angular auto-applies NgForm to every <form> when FormsModule is imported.
    -->
    <form #contactForm="ngForm" (ngSubmit)="onSubmit(contactForm)">

      <!-- Name -->
      <label>
        Full Name
        <input
          name="name"
          type="text"
          [(ngModel)]="model.name"
          required
          minlength="2"
          #nameField="ngModel"
          placeholder="Alice Smith"
        />
        @if (nameField.invalid && nameField.touched) {
          @if (nameField.errors?.['required']) {
            <span class="error">Name is required.</span>
          }
          @if (nameField.errors?.['minlength']) {
            <span class="error">Name must be at least 2 characters.</span>
          }
        }
      </label>

      <!-- Email -->
      <label>
        Email Address
        <input
          name="email"
          type="email"
          [(ngModel)]="model.email"
          required
          email
          #emailField="ngModel"
          placeholder="alice@example.com"
        />
        @if (emailField.invalid && emailField.touched) {
          @if (emailField.errors?.['required']) {
            <span class="error">Email is required.</span>
          }
          @if (emailField.errors?.['email']) {
            <span class="error">Must be a valid email address.</span>
          }
        }
      </label>

      <!-- Subject (select) -->
      <label>
        Subject
        <select
          name="subject"
          [(ngModel)]="model.subject"
          required
          #subjectField="ngModel"
        >
          <option value="">-- Select a subject --</option>
          <option value="support">Technical Support</option>
          <option value="billing">Billing</option>
          <option value="general">General Enquiry</option>
        </select>
        @if (subjectField.invalid && subjectField.touched) {
          <span class="error">Please select a subject.</span>
        }
      </label>

      <!-- Message (textarea) -->
      <label>
        Message
        <textarea
          name="message"
          [(ngModel)]="model.message"
          required
          minlength="10"
          #messageField="ngModel"
          rows="5"
          placeholder="Type your message here..."
        ></textarea>
        @if (messageField.invalid && messageField.touched) {
          @if (messageField.errors?.['required']) {
            <span class="error">Message is required.</span>
          }
          @if (messageField.errors?.['minlength']) {
            <span class="error">Message must be at least 10 characters.</span>
          }
        }
      </label>

      <!-- Submit -->
      <button type="submit" [disabled]="contactForm.invalid">
        Send Message
      </button>

      <!-- Reset -->
      <button type="button" (click)="reset(contactForm)">Reset</button>
    </form>

    <!-- Success message (shown after submission) -->
    @if (submitted) {
      <p class="success">Message sent! We will reply within 24 hours.</p>
    }
  `
})
export class ContactFormComponent {
  submitted = false;

  // The model object — ngModel two-way-binds to its properties
  model: ContactFormData = {
    name:    '',
    email:   '',
    subject: '',
    message: '',
  };

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    console.log('Contact form submitted:', this.model);
    this.submitted = true;

    // Reset the form (clears values AND resets touched/dirty state)
    form.resetForm({
      name: '', email: '', subject: '', message: ''
    });
  }

  reset(form: NgForm): void {
    form.resetForm();
    this.submitted = false;
  }
}
