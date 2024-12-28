import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  imports: [FormsModule, TranslateModule, CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  placeholdertext: any = 'Your Name ';

  private checkboxRef!: HTMLInputElement;

  http = inject(HttpClient);
  router = inject(Router);

  contactData = {
    name: '',
    email: '',
    message: '',
    nameFocused: true,
    emailFocused: true,
    messageFocused: true,
  };

  mailTest = true;
  isCheckboxChecked = false;
  isFormValidName = true;
  isFormValidEmail = true;
  isFormValidMessage = true;
  isButtonDisabled = true;
  showFeedback = false;

  updateButtonState() {
    this.isButtonDisabled = !(
      this.contactData.name &&
      this.contactData.email &&
      this.contactData.message &&
      this.isCheckboxChecked &&
      this.isFormValidName &&
      this.isFormValidEmail &&
      this.isFormValidMessage
    );
  }

  setFocus(field: string, isFocused: boolean, ngModel: any) {
    if (field === 'name') {
      this.contactData.nameFocused = isFocused;
      this.isFormValidName = ngModel.valid;
      if (!isFocused && !ngModel.valid) {
        this.contactData.name = '';
      }
    } else if (field === 'email') {
      this.contactData.emailFocused = isFocused;
      this.isFormValidEmail = ngModel.valid;
      if (!isFocused && !ngModel.valid) {
        this.contactData.email = '';
      }
    } else if (field === 'message') {
      this.contactData.messageFocused = isFocused;
      this.isFormValidMessage = ngModel.valid;
      if (!isFocused && !ngModel.valid) {
        this.contactData.message = '';
      }
    }
    this.updateButtonState();
  }

  resetInput() {
    this.contactData.name = '';
    this.contactData.email = '';
    this.contactData.message = '';
    this.contactData.nameFocused = true;
    this.contactData.emailFocused = true;
    this.contactData.messageFocused = true;
    this.checkboxRef.checked = false;
    this.isCheckboxChecked = false;
    this.updateButtonState();
  }

  checkCheckbox(event: Event) {
    this.checkboxRef = event.target as HTMLInputElement;
    this.isCheckboxChecked = this.checkboxRef.checked;
    this.updateButtonState();
  }

  post = {
    endPoint: './sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  showFeedbackMessage() {
    this.showFeedback = true;
    setTimeout(() => {
      this.showFeedback = false;
    }, 3000);
  }

  onSubmit(ngForm: NgForm) {
    if (!this.isCheckboxChecked) return;
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http
        .post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            this.resetInput();
            ngForm.resetForm();
            this.showFeedbackMessage();
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      this.resetInput();
      ngForm.resetForm();
      this.showFeedbackMessage();
    }
  }

  navigateToPrivacyPolicy(event: Event) {
    event.preventDefault();
    this.router.navigate(['/privacy-policy']);
  }
}
