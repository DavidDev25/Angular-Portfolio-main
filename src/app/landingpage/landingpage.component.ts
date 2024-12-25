import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { WhyMeComponent } from './why-me/why-me.component';
import { MySkillsComponent } from './my-skills/my-skills.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

@Component({
  selector: 'app-landingpage',
  imports: [
    HeroComponent,
    WhyMeComponent,
    MySkillsComponent,
    MyProjectsComponent,
    TestimonialsComponent,
    ContactMeComponent,
    ContactFormComponent,
  ],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss',
})
export class LandingpageComponent {}
