import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-me',
  imports: [TranslateModule],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss',
})
export class ContactMeComponent {
  private router = inject(Router);

  scrollToTop(): void {
    if (
      this.router.url.includes('privacy') ||
      this.router.url.includes('legal')
    ) {
      this.router.navigate(['/']);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openMailTo() {
    const email = 'david.werner@david-werner.dev';
    const subject = encodeURIComponent('Kontaktanfrage');
    const body = encodeURIComponent(
      'Hallo David,\n\nIch möchte gerne Kontakt aufnehmen.'
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }
}
