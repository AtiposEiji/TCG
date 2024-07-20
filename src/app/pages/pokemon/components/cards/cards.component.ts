import {Component, inject, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PokemonTcgService} from '../../services/pokemon-tcg.service';
import {PokemonCardModel} from '../../models/pokemon-card.model';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit {
  @Input() pokemonSetId!: string;
  protected pokemonCards?: PokemonCardModel[];
  private currentIndex: number = 0;
  private readonly pokemonTcgService = inject(PokemonTcgService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.initData().then();
  }

  private async initData(): Promise<void[]> {
    return Promise.all([
      this.getCards()
    ]);
  }

  private async getCards(): Promise<void> {
    if (!this.pokemonSetId) {
      return;
    }
    const res = await this.pokemonTcgService.getPokemonCards(this.pokemonSetId);
    this.pokemonCards = res.data;
  }

  private updateDisplayedCards(): void {
    if (!this.pokemonCards) {
      return;
    }
    this.pokemonCards = this.pokemonCards.slice(this.currentIndex, this.currentIndex + 18);
  }

  protected onPrevious(): void {
    if (this.currentIndex > 0) {
      this.currentIndex -= 18;
      this.updateDisplayedCards();
    }
  }

  protected onNext(): void {
    if (this.pokemonCards && this.currentIndex < this.pokemonCards.length - 18) {
      this.currentIndex += 18;
      this.updateDisplayedCards();
    }
  }

  protected goBack(): Promise<boolean> {
    return this.router.navigate([`pokemon`]);
  }

  protected async onSearchByAuthor(artist: string): Promise<void> {
    const res = await this.pokemonTcgService.getPokemonCardsByArtist(artist);
    this.pokemonCards = res.data;
    this.updateDisplayedCards();
  }
}
