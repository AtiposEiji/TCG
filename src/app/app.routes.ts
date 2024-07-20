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
  loadChildren: () => import('./pages/magic/routes').then(r => r.routes)
}, {
  path: "pokemon",
  loadChildren: () => import('./pages/pokemon/routes').then(r => r.routes)
}];
