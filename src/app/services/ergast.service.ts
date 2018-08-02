import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, pipe, forkJoin} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable()
export class ErgastService {
  private readonly URL: string = 'http://ergast.com/api/f1';
  public raceDetails: Array<object> = [];
  public raceDetailsUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();
  public isLoading = false;

  constructor(private http: HttpClient) {}

  public getRaceDetails(year: string = '2005') {
    this.isLoading = true;
    const seasons = this.http.get(`${this.URL}/${year}.json`).pipe(map(r => r));
    const drivers = this.http.get(`${this.URL}/${year}/results.json?limit=1000`).pipe(map(r => r));
    const standings = this.http.get(`${this.URL}/${year}/driverStandings.json`).pipe(map(r => r));

    forkJoin([seasons, drivers, standings]).subscribe(results =>  {
      this.raceDetails = results[0]['MRData'].RaceTable.Races;
      const winnerOfSeason = results[2]['MRData'].StandingsTable.StandingsLists[0].DriverStandings[0].Driver.code;
      for(let i=0; i<this.raceDetails.length; i++) {
        const races = results[1]['MRData'].RaceTable.Races;
        if(races[i].Results[0].Driver.code === winnerOfSeason) {
            races[i].Results[0].Driver.isWinner = true;
        }
        this.raceDetails[i] = races[i];
      }

      this.raceDetailsUpdated.emit(true);
      this.isLoading = false;
    });
  }

}
