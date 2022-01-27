import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { SharedModule } from "../../shared/shared.module";
import { FormComponent } from "./components/form/form.component";

import { OpenCardComponent } from "./components/open-card/open-card.component";
import { ReservationComponent } from "./page/reservation.component";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";

@NgModule({
	declarations: [
		OpenCardComponent,
		FormComponent,
		ReservationComponent,
	],
	imports: [
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		NgxMaterialTimepickerModule,
		BsDatepickerModule.forRoot()
	]
})

export class ReservationModule {
}
