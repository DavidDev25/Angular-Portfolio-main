import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../../../public/i18n/translation.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [TranslateModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  translate = inject(TranslationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isMenuOpen = false;

  disableScroll() {
    document.body.style.overflow = 'hidden';
  }

  enableScroll() {
    document.body.style.overflow = '';
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.disableScroll();
    } else {
      this.enableScroll();
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.enableScroll();
  }

  navigateToSection(fragment: string): void {
    this.closeMenu();
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
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - 70,
          behavior: 'smooth',
        });
      }
    }, 100);
  }

  scrollToTop(): void {
    this.closeMenu();
    if (
      this.router.url.includes('privacy') ||
      this.router.url.includes('legal')
    ) {
      this.router.navigate(['/']);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
