import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-form',
  imports: [FormsModule, TranslateModule, CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent implements OnInit {
  placeholdertext: any = 'Your Name ';

  http = inject(HttpClient);

  contactData = {
    name: '',
    email: '',
    message: '',
  };

  mailTest = true;
  isFormValid = false;
  isCheckboxChecked = false;

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

  ngOnInit() {
    this.checkFormValidity();
  }

  checkFormValidity() {
    this.isFormValid =
      this.contactData.name.trim() !== '' &&
      this.contactData.email.trim() !== '' &&
      this.contactData.message.trim() !== '' &&
      this.isCheckboxChecked;
  }

  onCheckboxChange(event: any) {
    this.isCheckboxChecked = event.target.checked;
    this.checkFormValidity();
  }

  onInputChange() {
    this.checkFormValidity();
  }

  onSubmit(ngForm: NgForm) {
    if (this.isFormValid && !this.mailTest) {
      this.http
        .post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            ngForm.resetForm();
            this.isCheckboxChecked = false;
            this.checkFormValidity();
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (this.isFormValid && this.mailTest) {
      ngForm.resetForm();
      this.isCheckboxChecked = false;
      this.checkFormValidity();
    }
  }
}
