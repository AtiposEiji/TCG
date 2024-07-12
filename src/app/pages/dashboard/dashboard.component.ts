import {Component, inject} from '@angular/core';
import {tcgList} from "../utils/constants";
import {TcgModel} from "../models/tcg.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  protected tcgList: TcgModel[] = tcgList.tcgList;
  private readonly router = inject(Router);

  protected onTCGClick(setName: string): Promise<boolean> {
    return this.router.navigate([`/${setName}`]);
  }
}
