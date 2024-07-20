import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {PokemonSetsModel} from '../models/pokemon-sets.model';
import {PokemonSetModel} from '../models/pokemon-set.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonStoreService {
  private pokemonSets: BehaviorSubject<PokemonSetsModel> = new BehaviorSubject(new (PokemonSetsModel));

  setPokemonSets(pokemonSets: PokemonSetsModel): void {
    return this.pokemonSets.next(pokemonSets);
  }

  retrivePokemonSets(): Observable<PokemonSetModel[]> {
    return this.pokemonSets.pipe(map(sets => sets.data));
  }
}
