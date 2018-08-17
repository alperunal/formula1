import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ErgastService} from './services/ergast.service';
import {SeasonTableComponent} from './components/season-table/season-table.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { ChampionDirective } from './directives/champion.directive';

@NgModule({
  declarations: [
    AppComponent,
    SeasonTableComponent,
    ChampionDirective
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
