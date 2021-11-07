import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "./material.module";

import { MyReservationsTableComponent } from "./component/my-reservations-table/my-reservations-table.component";

@NgModule({
  declarations: [
    MyReservationsTableComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    MyReservationsTableComponent,
    MaterialModule
  ]
})
export class SharedModule { }
