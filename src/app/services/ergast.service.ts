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
    const seasonResults = this.http.get(`${this.URL}/${year}/results.json?limit=1000`).pipe(map(r =>
      r['MRData'].RaceTable.Races));
    const standings = this.http.get(`${this.URL}/${year}/driverStandings.json`).pipe(map(r =>
      r['MRData'].StandingsTable.StandingsLists[0].DriverStandings[0].Driver.code));

    forkJoin([seasonResults, standings]).subscribe(results =>  {
      this.normalizer(results[0], results[1]);
      this.raceDetailsUpdated.emit(true);
      this.isLoading = false;
    });
  }

  normalizer(results, winnerOfSeason) {
    this.raceDetails = [];
    results.forEach(res => {
      const data = {
        round: res.round,
        grandPrix: {
          name: res.raceName,
          url: res.url
        },
        raceWinner: {
          Driver: res.Results[0].Driver,
          Constructor: res.Results[0].Constructor
        },
        date: res.date,
        location: res.Circuit.Location.country
      };

      if(res.Results[0].Driver.code === winnerOfSeason) {
        data.raceWinner.Driver.isWinner = true;
      }

      this.raceDetails.push(data);
    });
  }

}
