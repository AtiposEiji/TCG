import {Routes} from '@angular/router';

export const routes: Routes = [{
  path: '',
  loadComponent: () => import('./pokemon.component').then(c => c.PokemonComponent)
}, {
  path: 'set/:pokemonSetId',
  loadComponent: () => import('./components/cards/cards.component').then(c => c.CardsComponent)
}];
