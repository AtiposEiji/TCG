import {MagicImagesUrlModel} from './magic-images-url.model';
import {MagicCardPricesModel} from './magic-card-prices.model';

export class MagicCard {
  artist?: string;
  artist_ids?: string;
  collector_number!: string;
  full_art!: boolean;
  id!: string
  illustration_id!: string;
  image_uris?: MagicImagesUrlModel;
  name!: string;
  prices!: MagicCardPricesModel;
  variation!: boolean;
}
