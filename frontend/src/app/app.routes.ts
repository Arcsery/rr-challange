import { Routes } from '@angular/router';
import {Partner} from './components/partner/partner';
import {PartnerDetail} from './components/partner/partner-detail/partner-detail';

export const routes: Routes = [
  { path: 'partners', component: Partner },
  { path: 'partners/:id', component: PartnerDetail }
];
