import {Component, inject, OnInit} from '@angular/core';
import {MagicTcgService} from "./services/magic-tcg.service";
import {MagicSetModel} from "./models/magic-set.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-magic',
  standalone: true,
  imports: [],
  templateUrl: './magic.component.html',
  styleUrl: './magic.component.css'
})
export class MagicComponent implements OnInit {
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

  protected onCardClick(set: MagicSetModel) {
    return this.router.navigate([`magic/${set.id}`]);
  }
}
