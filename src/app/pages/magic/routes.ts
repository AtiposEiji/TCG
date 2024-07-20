import {Routes} from '@angular/router';

export const routes: Routes = [{
  path: '',
  loadComponent: () => import('../../pages/magic/magic.component').then(c => c.MagicComponent)
}, {
  path: 'set/:magicSetId',
  loadComponent: () => import('../../pages/magic/components/card/card.component').then(c => c.CardComponent)
}];
