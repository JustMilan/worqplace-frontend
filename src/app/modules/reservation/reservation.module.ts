import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { SharedModule } from "../../shared/shared.module";
import { DialogComponent } from "./components/dialog/dialog.component";
import { FormComponent } from "./components/form/form.component";

import { OpenCardComponent } from "./components/open-card/open-card.component";
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
export class ReservationModule {
}
