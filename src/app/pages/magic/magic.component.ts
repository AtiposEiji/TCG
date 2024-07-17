import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MagicSetModel} from "./models/magic-set.model";
import {MagicTcgService} from "./services/magic-tcg.service";
import {MagicStoreService} from "./services/magic-store.service";
import {take} from "rxjs";

@Component({
  selector: 'app-magic',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './magic.component.html',
  styleUrl: './magic.component.scss'
})
export class MagicComponent implements OnInit {
  protected searchTermSet: string = '';
  protected searchArtist: string = '';
  protected magicSets?: MagicSetModel[];
  protected artists?: string[];
  private readonly magicTcgService = inject(MagicTcgService);
  private readonly magicStoreService = inject(MagicStoreService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.initData().then();
  }

  private async initData(): Promise<void[]> {
    return Promise.all([
      this.getMagicSets(),
      this.getMagicArtists()
    ])
  }

  private async getMagicSets(): Promise<void> {
    this.magicStoreService.retriveMagicSets().pipe(take(1)).subscribe(data => {
      this.magicSets = data;
    });

    if (!this.magicSets || this.magicSets.length === 0) {
      const res = await this.magicTcgService.getMagicSets();
      this.magicStoreService.setMagicSets(res);
      this.magicStoreService.retriveMagicSets().subscribe(data => this.magicSets = data);
    }
  }

  private async getMagicArtists(): Promise<void> {
    this.magicStoreService.retriveMagicArtists().pipe(take(1)).subscribe(data => {
      this.artists = data;
    });

    if (!this.artists || this.artists.length === 0) {
      const res = await this.magicTcgService.getMagicArtist();
      this.magicStoreService.setMagicArtists(res);
      this.magicStoreService.retriveMagicArtists().subscribe(data => this.artists = data);
    }
  }

  protected onCardClick(set: MagicSetModel): Promise<boolean> {
    return this.router.navigate([`magic/set/${set.id}`]);
  }

  protected goBack(): Promise<boolean> {
    return this.router.navigate([`dashboard`]);
  }

  protected onFilter(set: MagicSetModel, searchTerm: string): boolean {
    return set.name.toLowerCase().includes(searchTerm.toLowerCase())
  }

  protected onArtistFilter(artist: string, searchArtist: string): boolean {
    return artist.toLowerCase().includes(searchArtist.toLowerCase())
  }
}
