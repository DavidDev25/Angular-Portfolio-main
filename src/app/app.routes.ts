import { Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';

export const routes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'privacy-Policy', component: PrivacyPolicyComponent },
  { path: 'legal-notice', component: LegalNoticeComponent },
];
