import {Component, OnInit} from '@angular/core';
import {ErgastService} from '../../services/ergast.service';
import {Season} from '../../models/season.interface';
import {ChampionDirective} from '../../directives/champion.directive';

@Component({
  selector: 'app-season-table',
  templateUrl: './season-table.component.html',
  styleUrls: ['./season-table.component.scss']
})
export class SeasonTableComponent implements OnInit {
  public races: Array<Season> = [];
  public currentSeason = '2005';
  public readonly SEASON_LIST = ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'];

  constructor(public ergastService: ErgastService) {}

  ngOnInit() {
    this.ergastService.getRaceDetails().then(res => {
      this.races = res;
    });
  }

  selectSeason() {
    this.ergastService.getRaceDetails(this.currentSeason).then(res => {
      this.races = res;
    });
  }

  trackByFn(index, item) {
    return index; // or item.id
  }

}
