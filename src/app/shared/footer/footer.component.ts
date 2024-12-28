import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  RouterLink,
  RouterModule,
  ActivatedRoute,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  redirectGithub() {
    window.open('https://github.com/DavidDev25');
  }

  redirectLinkedIn() {
    window.open('www.linkedin.com/in/david-werner-01a88032a');
  }

  mailTo() {
    window.location.href = 'mailto:${email}?subject=${subject}&body=${body}';
  }

  scrollToTop(): void {
    if (
      this.router.url.includes('privacy') ||
      this.router.url.includes('legal')
    ) {
      this.router.navigate(['/']);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
