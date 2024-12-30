import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-hero',
  imports: [RouterModule, TranslateModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  scrollToWhyMe(): void {
    const whyMeSection = document.getElementById('whyMe');
    if (whyMeSection) {
      whyMeSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

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
