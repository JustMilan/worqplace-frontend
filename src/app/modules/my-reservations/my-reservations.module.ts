import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";

import { MyReservationsComponent } from "./page/my-reservations.component";

@NgModule({
  declarations: [
    MyReservationsComponent,
  ],
  imports: [
    SharedModule
  ]
})
export class MyReservationsModule { }
