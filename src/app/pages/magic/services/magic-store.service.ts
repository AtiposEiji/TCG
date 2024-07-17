import {Injectable} from "@angular/core";
import {MagicSetsModel} from "../models/magic-sets.model";
import {BehaviorSubject, map, Observable} from "rxjs";
import {MagicSetModel} from "../models/magic-set.model";
import {MagicArtistModel} from "../models/magic-artists.model";

@Injectable({
  providedIn: "root"
})
export class MagicStoreService {
  private magicSets: BehaviorSubject<MagicSetsModel> = new BehaviorSubject(new MagicSetsModel());
  private magicArtists: BehaviorSubject<MagicArtistModel> = new BehaviorSubject(new MagicArtistModel());

  setMagicSets(magicSets: MagicSetsModel): void {
    return this.magicSets.next(magicSets)
  }

  setMagicArtists(magicArtists: MagicArtistModel): void {
    return this.magicArtists.next(magicArtists)
  }

  retriveMagicSets(): Observable<MagicSetModel[]> {
    return this.magicSets.pipe(map(sets => sets.data));
  }

  retriveMagicArtists(): Observable<string[]> {
    return this.magicArtists.pipe(map(sets => sets.data));
  }
}
