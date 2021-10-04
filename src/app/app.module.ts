import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {MyReservationsComponent} from "./my-reservations/my-reservations.component";
import {OpenWorkplaceCardComponent} from './open-workplace-card/open-workplace-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MyReservationsComponent,
    OpenWorkplaceCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
