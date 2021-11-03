import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MatNativeDateModule, MatOptionModule } from "@angular/material/core";
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from '@angular/material/table';

import {AppComponent} from './app.component';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {MyReservationsComponent} from "./my-reservations/my-reservations.component";
import {OpenWorkplaceCardComponent} from './open-workplace-card/open-workplace-card.component';
import {ReservationPageComponent} from './reservation-page/reservation-page.component';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatStepperModule } from "@angular/material/stepper";
import {MatGridListModule} from '@angular/material/grid-list';
import { OpenRoomCardComponent } from './open-room-card/open-room-card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MyReservationsComponent,
    OpenWorkplaceCardComponent,
    ReservationPageComponent,
    OpenRoomCardComponent,
  ],
    imports: [
        MatTableModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
        ReactiveFormsModule,
        MatOptionModule,
        MatSelectModule,
        HttpClientModule,
        MatIconModule,
        MatButtonModule,
        MatStepperModule,
        MatGridListModule,
        MatPaginatorModule,
        MatSortModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
