import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {MyReservationsComponent} from "./my-reservations/my-reservations.component";
import {OpenWorkplaceCardComponent} from './open-workplace-card/open-workplace-card.component';
import {ReservationPageComponent} from './reservation-page/reservation-page.component';
import {ReservationFilterFormComponent} from './reservation-filter-form/reservation-filter-form.component';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MyReservationsComponent,
    OpenWorkplaceCardComponent,
    ReservationPageComponent,
    ReservationFilterFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
