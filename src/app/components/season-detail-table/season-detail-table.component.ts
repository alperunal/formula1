import {Component, OnInit} from '@angular/core';
import {ErgastService} from '../../services/ergast.service';

@Component({
  selector: 'app-season-detail-table',
  templateUrl: './season-detail-table.component.html',
  styleUrls: ['./season-detail-table.component.scss']
})
export class SeasonDetailTableComponent implements OnInit {
  public races: Array<any> = [];

  constructor(public ergastService: ErgastService) {}

  ngOnInit() {
    this.ergastService.raceDetailsUpdated.subscribe(val => {
      this.races = this.ergastService.raceDetails;
    });

    this.ergastService.getRaceDetails();
  }

  trackByFn(index, item) {
    return index; // or item.id
  }

}
