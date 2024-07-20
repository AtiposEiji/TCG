import {Component, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MagicSetModel} from './models/magic-set.model';
import {MagicTcgService} from './services/magic-tcg.service';
import {MagicStoreService} from './services/magic-store.service';
import {take} from 'rxjs';

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
  protected magicSets?: MagicSetModel[];
  private readonly magicTcgService = inject(MagicTcgService);
  private readonly magicStoreService = inject(MagicStoreService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.initData().then();
  }

  private async initData(): Promise<void[]> {
    return Promise.all([
      this.getMagicSets()
    ])
  }

  private async getMagicSets(): Promise<void> {
    this.magicStoreService.retriveMagicSets().pipe(take(1)).subscribe(data => {
      if(!data) {
        return;
      }
      this.magicSets = data;
    });

    if (!this.magicSets || this.magicSets.length === 0) {
      const res = await this.magicTcgService.getMagicSets();
      this.magicStoreService.setMagicSets(res);
      this.magicStoreService.retriveMagicSets().subscribe(data => this.magicSets = data);
    }
  }

  protected onSetClick(set: MagicSetModel): Promise<boolean> {
    return this.router.navigate([`magic/set/${set.id}`]);
  }

  protected goBack(): Promise<boolean> {
    return this.router.navigate([`dashboard`]);
  }

  protected onFilter(set: MagicSetModel, searchTerm: string): boolean {
    return set.name.toLowerCase().includes(searchTerm.toLowerCase())
  }
}
