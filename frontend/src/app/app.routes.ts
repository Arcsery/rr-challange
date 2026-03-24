import { Routes } from '@angular/router';
import {Partner} from './components/partner/partner';
import {PartnerDetail} from './components/partner/partner-detail/partner-detail';
import {ActivityResponsibleReport} from './components/activity/activity-responsible-report/activity-responsible-report';

export const routes: Routes = [
  { path: 'partners', component: Partner },
  { path: 'partners/:id', component: PartnerDetail },
  { path: 'activity-responsible-report', component: ActivityResponsibleReport },
];
