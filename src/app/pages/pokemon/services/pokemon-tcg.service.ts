import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {plainToInstance} from 'class-transformer';
import {environment} from '../../../../assets/env';
import {PokemonSetsModel} from '../models/pokemon-sets.model';
import {PokemonCardsModel} from '../models/pokemon-cards.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonTcgService {
  private readonly http = inject(HttpClient);
  private baseUrl = 'https://api.pokemontcg.io/v2';
  private readonly headers = new HttpHeaders({
    'X-Api-Key': environment.apiKey
  });

  async getPokemonSets(): Promise<PokemonSetsModel> {
    const url = `${this.baseUrl}/sets`;
    const get$ = this.http.get<PokemonSetsModel>(url, {headers: this.headers});
    const res = firstValueFrom(get$);
    return plainToInstance(PokemonSetsModel, res);
  }

  async getPokemonCards(pokemonSetId: string): Promise<PokemonCardsModel> {
    const url = `${this.baseUrl}/cards?q=set.id:${pokemonSetId}`;
    const get$ = this.http.get<PokemonCardsModel>(url, {headers: this.headers});
    const res = firstValueFrom(get$);
    return plainToInstance(PokemonCardsModel, res);
  }

  async getPokemonCardsByArtist(artist: string): Promise<PokemonCardsModel> {
    const url = `${this.baseUrl}/cards?q=artist:"${artist}"`;
    const get$ = this.http.get<PokemonCardsModel>(url, {headers: this.headers});
    const res = firstValueFrom(get$);
    return plainToInstance(PokemonCardsModel, res);
  }
}
