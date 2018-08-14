import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Season} from '../models/season.interface';

@Injectable()
export class ErgastService {
  private readonly URL: string = 'http://ergast.com/api/f1';
  public raceDetailsUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();
  private _isLoading = false;

  constructor(private http: HttpClient) {}

  public getIsLoading(): boolean {
    return this._isLoading;
  }

  private setIsLoading(value: boolean) {
    this._isLoading = value;
  }

  /*public getRaceDetails(year: string = '2005'): Observable<Array<Season>> {
    this.setIsLoading(true);
    const seasonResults = this.http.get(`${this.URL}/${year}/results.json?limit=1000`).pipe(map(r =>
      r['MRData'].RaceTable.Races));
    const standings = this.http.get(`${this.URL}/${year}/driverStandings.json`).pipe(map(r =>
      r['MRData'].StandingsTable.StandingsLists[0].DriverStandings[0].Driver.code));

    const res = forkJoin([seasonResults, standings]).subscribe(results =>  {
      const raceDetails = this.normalizer(results[0], results[1]);
      this.raceDetailsUpdated.emit(true);
      this.setIsLoading(false);
      return null;
    }, (err: HttpErrorResponse) => {
      if(err instanceof Error) {
        alert('Error! Please check your internet connection.');
      }
    });

  }*/

  public getRaceDetails(year: string = '2005'): Promise<any> {
    return new Promise((resolve, reject) => {
      this.setIsLoading(true);
      const seasonResults = this.http.get(`${this.URL}/${year}/results.json?limit=1000`).pipe(map(r =>
        r['MRData'].RaceTable.Races));
      const standings = this.http.get(`${this.URL}/${year}/driverStandings.json`).pipe(map(r =>
        r['MRData'].StandingsTable.StandingsLists[0].DriverStandings[0].Driver.code));

      forkJoin([seasonResults, standings]).subscribe(results =>  {
        const raceDetails = this.normalizer(results[0], results[1]);
        this.raceDetailsUpdated.emit(true);
        this.setIsLoading(false);
        resolve(raceDetails);
      }, (err: HttpErrorResponse) => {
        if(err instanceof Error) {
          reject(err);
        }
      });
    });
  }

  private normalizer(results, winnerOfSeason): Array<Season> {
    const raceDetails: Array<Season> = [];
    results.forEach(res => {
      const data: Season = {
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

      raceDetails.push(data);
    });

    return raceDetails;
  }

}
