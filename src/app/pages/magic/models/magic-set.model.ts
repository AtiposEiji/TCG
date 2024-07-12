import {Type} from 'class-transformer';

export class MagicSetModel {
  object!: string;
  id!: string;
  code!: string;
  mtgo_code?: string;
  arena_code?: string;
  tcgplayer_id?: number;
  name!: string;
  set_type!: string;
  @Type(() => Date)
  released_at?: Date;
  block_code?: string;
  block?: string;
  parent_set_code?: string;
  card_count!: number
  printed_size?: number
  digital!: boolean;
  foil_only!: boolean;
  nonfoil_only!: boolean;
  scryfall_uri!: string;
  uri!: string;
  icon_svg_uri!: string;
  search_uri!: string;
}
