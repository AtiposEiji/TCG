import {Routes} from '@angular/router';

export const routes: Routes = [{
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full'
}, {
  path: 'dashboard',
  loadComponent: () => import('./pages/dashboard/dashboard.component').then(c => c.DashboardComponent)
}, {
  path: "magic",
  loadComponent: () => import('./pages/magic/magic.component').then(c => c.MagicComponent),
}, {
    path: "magic/:magicSetId",
    loadComponent: () => import("./pages/magic/components/card/card.component").then(c => c.CardComponent)
}];
