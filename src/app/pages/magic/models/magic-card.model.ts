import {MagicImagesUrlModel} from "./magic-images-url.model";

export class MagicCard {
  artist?: string;
  artist_ids?: string;
  collector_number!: string;
  full_art!: boolean;
  id!: string
  illustration_id!: string;
  image_uris?: MagicImagesUrlModel;
  name!: string;
  prices!: number;
  variation!: boolean;
}
