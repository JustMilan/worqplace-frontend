import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';

import { OpenCardComponent } from "./components/open-card/open-card.component";
import { DialogComponent } from "./components/dialog/dialog.component";
import { FormComponent } from "./components/form/form.component";
import { ReservationComponent } from "./page/reservation.component";

@NgModule({
  declarations: [
    OpenCardComponent,
    FormComponent,
    ReservationComponent,
    DialogComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ReservationModule { }
