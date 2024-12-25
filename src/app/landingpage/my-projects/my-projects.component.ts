import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-my-projects',
  imports: [TranslateModule],
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.scss',
})
export class MyProjectsComponent {
  redirectJoin() {
    window.open('https://github.com/DavidDev25/DA-Join');
  }

  redirectJoinLive() {
    window.open('http://david-werner.developerakademie.net/Join/index.html');
  }

  redirect() {
    window.open('https://github.com/DavidDev25/El-Pollo-Loco', 'blank');
  }

  redirectPolloLive() {
    window.open(
      'http://david-werner.developerakademie.net/El_Pollo_Loco/index.html'
    );
  }
}
