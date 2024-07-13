import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MagicSetModel} from "./models/magic-set.model";
import {MagicTcgService} from "./services/magic-tcg.service";

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
  protected searchTermArtist: string = '';
  protected magicSets?: MagicSetModel[];
  private magicTcgService = inject(MagicTcgService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.initData();
  }

  private initData(): void {
    this.getMagicSets().then();
  }

  private async getMagicSets(): Promise<void> {
    const res = await this.magicTcgService.getMagicSets();
    this.magicSets = res.data;
  }

  protected onCardClick(set: MagicSetModel): Promise<boolean> {
    return this.router.navigate([`magic/set/${set.id}`]);
  }

  protected goBack(): Promise<boolean> {
    return this.router.navigate([`dashboard`]);
  }

  protected onFilter(set: MagicSetModel, searchTerm: string) {
    return set.name.toLowerCase().includes(searchTerm.toLowerCase())
  }

  protected OnSearchByArtist(searchTermArtist: string): Promise<boolean> {
    return this.router.navigate([`magic/set/${searchTermArtist}`]);
  }
}
