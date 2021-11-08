import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MyReservationsTableComponent } from "./component/my-reservations-table/my-reservations-table.component";
import { MaterialModule } from "./material.module";

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
export class SharedModule {
}
