import {Component, inject, OnInit} from '@angular/core';
import {MagicTcgService} from "../../services/magic-tcg.service";
import {ActivatedRoute} from "@angular/router";
import {MagicCard} from "../../models/magic-card.model";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  protected cards?: MagicCard[];
  protected magicSetId!: string | null;
  private searchURI?: string;
  private magicTcgService = inject(MagicTcgService);
  private readonly activatedRoute = inject(ActivatedRoute);

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
    const res = await this.magicTcgService.getMagicSets();
    const filteredSet = res.data.find(set => set.id === this.magicSetId);
    return filteredSet?.search_uri
  }

  private async getCards(): Promise<void> {
    if (!this.searchURI) {
      return;
    }
    const res = await this.magicTcgService.getMagicCardsList(this.searchURI);
    this.cards = res.data;
  }
}
