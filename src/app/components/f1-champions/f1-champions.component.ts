import { Component, OnInit } from '@angular/core';
import {ErgastService} from '../../services/ergast.service';

@Component({
  selector: 'app-f1-champions',
  templateUrl: './f1-champions.component.html',
  styleUrls: ['./f1-champions.component.scss']
})
export class F1ChampionsComponent {

  constructor(private ergastService: ErgastService) { }

  public currentSeason = '2005';
  public readonly SEASON_LIST = ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'];

  selectSeason() {
    this.ergastService.getRaceDetails(this.currentSeason);
  }

}
