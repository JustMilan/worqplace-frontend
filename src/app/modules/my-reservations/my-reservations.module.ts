import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";

import { MyReservationsComponent } from "./page/my-reservations.component";
import { MyReservationsRoutingModule } from "./my-reservations-routing.module";

@NgModule({
  declarations: [
    MyReservationsComponent,
  ],
  imports: [
    SharedModule,
    MyReservationsRoutingModule
  ]
})
export class MyReservationsModule { }
