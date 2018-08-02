import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ErgastService} from './services/ergast.service';
import {SeasonDetailTableComponent} from './components/season-detail-table/season-detail-table.component';
import {HttpClientModule} from '@angular/common/http';
import { F1ChampionsComponent } from './components/f1-champions/f1-champions.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SeasonDetailTableComponent,
    F1ChampionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ErgastService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
