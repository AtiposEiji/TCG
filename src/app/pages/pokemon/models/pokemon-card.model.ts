import {PokemonCardImagesModel} from './pokemon-card-images.model';
import {PokemonCardCardmarketModel} from './pokemon-card-cardmarket.model';

export class PokemonCardModel {
  id!: string;
  name!: string;
  artist!: string;
  images!: PokemonCardImagesModel;
  cardmarket!: PokemonCardCardmarketModel;
}
