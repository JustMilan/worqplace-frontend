import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { MyReservationsRoutingModule } from "./my-reservations-routing.module";

import { MyReservationsComponent } from "./page/my-reservations.component";

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
