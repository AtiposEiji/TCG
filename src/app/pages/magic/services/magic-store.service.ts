import {Injectable} from "@angular/core";
import {MagicSetsModel} from "../models/magic-sets.model";
import {BehaviorSubject, map, Observable} from "rxjs";
import {MagicSetModel} from "../models/magic-set.model";

@Injectable({
  providedIn: "root"
})
export class MagicStoreService {
  private magicSets: BehaviorSubject<MagicSetsModel> = new BehaviorSubject(new MagicSetsModel());

  setMagicSets(magicSets: MagicSetsModel): void {
    return this.magicSets.next(magicSets)
  }

  retriveMagicSets(): Observable<MagicSetModel[]> {
    return this.magicSets.pipe(map(sets => sets.data));
  }
}
