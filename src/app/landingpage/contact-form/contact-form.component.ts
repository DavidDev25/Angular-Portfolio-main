import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

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
  }

  checkCheckbox(event: Event) {
    this.checkboxRef = event.target as HTMLInputElement;
    this.isCheckboxChecked = this.checkboxRef.checked;
  }

  post = {
    endPoint: 'https://deineDomain.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    if (!this.isCheckboxChecked) return;
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http
        .post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            this.resetInput();
            ngForm.resetForm();
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      console.log('send post complete (test)');
      this.resetInput();
      ngForm.resetForm();
    }
  }
}
