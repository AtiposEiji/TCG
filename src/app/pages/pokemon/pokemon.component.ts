import {Component, inject, OnInit} from '@angular/core';
import {PokemonTcgService} from './services/pokemon-tcg.service';
import {Router} from '@angular/router';
import {PokemonStoreService} from './services/pokemon-store.service';
import {PokemonSetModel} from './models/pokemon-set.model';
import {take} from 'rxjs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss'
})
export class PokemonComponent implements OnInit {
  protected searchTermSet: string = '';
  protected pokemonSets?: PokemonSetModel[];
  private readonly router = inject(Router);
  private readonly pokemonStoreService = inject(PokemonStoreService);
  private readonly pokemonTcgService = inject(PokemonTcgService);

  ngOnInit(): void {
    this.initData().then();
  }

  private async initData(): Promise<void[]> {
    return Promise.all([
      this.getPokemonSets()
    ]);
  }

  private async getPokemonSets(): Promise<void> {
    this.pokemonStoreService.retrivePokemonSets().pipe(take(1)).subscribe(data => {
      if (!data) {
        return;
      }
      this.pokemonSets = data;
    });
    if (!this.pokemonSets || this.pokemonSets.length === 0) {
      const res = await this.pokemonTcgService.getPokemonSets();
      this.pokemonStoreService.setPokemonSets(res);
      this.pokemonStoreService.retrivePokemonSets().subscribe(data => this.pokemonSets = data);
    }
  }

  protected goBack(): Promise<boolean> {
    return this.router.navigate([`dashboard`]);
  }

  protected onFilter(set: PokemonSetModel, searchTermSet: string): boolean {
    return set.name.toLowerCase().includes(searchTermSet.toLowerCase());
  }

  protected onSetClick(set: PokemonSetModel): Promise<boolean> {
    return this.router.navigate([`pokemon/set/${set.id}`]);
  }
}
