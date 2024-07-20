import {PokemonSetModel} from './pokemon-set.model';

export class PokemonSetsModel {
  data!: PokemonSetModel[];
  page?: number;
  pageSize?: number;
  count?: number;
  totalCount?: number;
}
