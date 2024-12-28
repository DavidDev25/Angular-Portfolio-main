import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-why-me',
  imports: [TranslateModule, RouterModule],
  templateUrl: './why-me.component.html',
  styleUrl: './why-me.component.scss',
})
export class WhyMeComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  navigateToSection(fragment: string): void {
    if (
      this.router.url.includes('privacy') ||
      this.router.url.includes('legal')
    ) {
      this.router.navigate(['/'], { fragment: fragment }).then(() => {
        this.scrollToElement(fragment);
      });
    } else {
      this.scrollToElement(fragment);
    }
  }

  private scrollToElement(fragment: string): void {
    setTimeout(() => {
      const element = document.getElementById(fragment);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
}
