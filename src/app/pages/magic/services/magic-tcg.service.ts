import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {plainToInstance} from "class-transformer";
import {MagicSetsModel} from "../models/magic-sets.model";
import {MagicCardListModel} from "../models/magic-card-list.model";
import {MagicArtistModel} from "../models/magic-artists.model";

@Injectable({
  providedIn: 'root'
})
export class MagicTcgService {
  private readonly http = inject(HttpClient);
  private baseUrl = "https://api.scryfall.com"

  async getMagicSets(): Promise<MagicSetsModel> {
    const url = `${this.baseUrl}/sets`;
    const get$ = this.http.get<MagicSetsModel>(url);
    const res = firstValueFrom(get$);
    return plainToInstance(MagicSetsModel, res);
  }

  async getMagicCardsList(url: string): Promise<MagicCardListModel> {
    const get$ = this.http.get<MagicCardListModel>(url);
    const res = firstValueFrom(get$);
    return plainToInstance(MagicCardListModel, res);
  }

  async getMagicCardsByArtist(artistName: string): Promise<MagicCardListModel> {
    const url = `${this.baseUrl}/cards/search?q=artist%3A%22${artistName}%22`
    const get$ = this.http.get<MagicCardListModel>(url);
    const res = firstValueFrom(get$);
    return plainToInstance(MagicCardListModel, res);
  }

  async getMagicArtist(): Promise<MagicArtistModel> {
    const url = `${this.baseUrl}/catalog/artist-names`
    const get$ = this.http.get<MagicArtistModel>(url);
    const res = firstValueFrom(get$);
    return plainToInstance(MagicArtistModel, res);
  }
}
