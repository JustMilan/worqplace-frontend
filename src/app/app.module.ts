import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReservationModule } from "./modules/reservation/reservation.module";
import { DataModule } from "./data/data.module";
import { MyReservationsModule } from "./modules/my-reservations/my-reservations.module";
import { SharedModule } from "./shared/shared.module";

import { AppComponent } from './app.component';
import { NavBarComponent } from "./layout/nav-bar/nav-bar.component";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReservationModule,
    DataModule,
    MyReservationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
