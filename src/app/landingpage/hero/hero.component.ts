import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [RouterModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  scrollToBottom(): void {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
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
