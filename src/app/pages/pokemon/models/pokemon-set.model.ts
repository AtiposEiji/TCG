import {PokemonImagesModel} from './pokemon-images.model';
import {PokemonLegalitiesModel} from './pokemon-legalities.model';

export class PokemonSetModel {
  id!: string;
  name!: string;
  series?: string;
  printedTotal?: number;
  total?: number;
  legalities?: PokemonLegalitiesModel;
  ptcgoCode?: string;
  releaseDate?: string;
  updatedAt?: string;
  images?: PokemonImagesModel;
}
