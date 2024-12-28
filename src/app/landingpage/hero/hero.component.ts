import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  scrollToBottom(): void {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }
}
