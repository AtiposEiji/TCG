import {Component, inject, OnInit} from '@angular/core';
import {MagicTcgService} from "../../services/magic-tcg.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MagicCard} from "../../models/magic-card.model";
import {MagicStoreService} from "../../services/magic-store.service";
import {MagicSetModel} from "../../models/magic-set.model";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  protected displayedCards?: MagicCard[];
  protected magicSetId!: string | null;
  private cards?: MagicCard[];
  private searchURI?: string;
  private currentIndex: number = 0;
  private filteredSet?: MagicSetModel;
  private readonly magicStoreService = inject(MagicStoreService);
  private readonly magicTcgService = inject(MagicTcgService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);


  constructor() {
    this.magicSetId = this.activatedRoute.snapshot.paramMap.get('magicSetId');
  }

  ngOnInit(): void {
    this.initData().then();
  }

  private async initData(): Promise<void> {
    this.searchURI = await this.getMagicSet();
    return this.getCards();
  }

  private async getMagicSet(): Promise<string | undefined> {
    this.magicStoreService.retriveMagicSets().subscribe(data => {
      if(!data) {
        return;
      }
      this.filteredSet = data.find(set => set.id === this.magicSetId);
    })

    if (!this.filteredSet) {
      const res = await this.magicTcgService.getMagicSets();
      this.magicStoreService.setMagicSets(res);
      this.magicStoreService.retriveMagicSets().subscribe(data => {
        this.filteredSet = data.find(set => set.id === this.magicSetId);
      });
    }
    return this.filteredSet?.search_uri
  }

  private async getCards(): Promise<void> {
    if (!this.searchURI) {
      return;
    }
    const res = await this.magicTcgService.getMagicCardsList(this.searchURI);
    const uniqueCards: MagicCard[] = [];
    const seenIds = new Set();

    for (const card of res.data) {
      if (!seenIds.has(card.name)) {
        uniqueCards.push(card);
        seenIds.add(card.name);
      }
    }

    this.cards = uniqueCards;
    this.updateDisplayedCards();
  }

  private updateDisplayedCards(): void {
    if (!this.cards) {
      return;
    }
    this.displayedCards = this.cards.slice(this.currentIndex, this.currentIndex + 18);
  }

  protected onPrevious(): void {
    if (this.currentIndex > 0) {
      this.currentIndex -= 18;
      this.updateDisplayedCards();
    }
  }

  protected onNext(): void {
    if (this.cards && this.currentIndex < this.cards.length - 18) {
      this.currentIndex += 18;
      this.updateDisplayedCards();
    }
  }

  protected goBack(): Promise<boolean> {
    return this.router.navigate([`magic`]);
  }

  protected async onSearchByAuthor(artist: string): Promise<void> {
    const res = await this.magicTcgService.getMagicCardsByArtist(artist);
    const uniqueCards: MagicCard[] = [];
    const seenIds = new Set();

    for (const card of res.data) {
      if (!seenIds.has(card.name)) {
        uniqueCards.push(card);
        seenIds.add(card.name);
      }
    }

    this.cards = uniqueCards;
    this.updateDisplayedCards();
  }
}
