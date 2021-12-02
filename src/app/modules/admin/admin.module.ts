import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { AdminLocationReservationComponent } from "./page/location-reservations/location-reservations.component";
import { AdminRoutingModule } from "./admin-routing.module";
import {AdminLocationReservationsTableComponent} from "./page/location-reservations/location-reservations-table/location-reservations-table.component";

@NgModule({
	declarations: [
		AdminLocationReservationComponent,
		AdminLocationReservationsTableComponent,
	],
	imports: [
		SharedModule,
		AdminRoutingModule
	]
})
export class AdminModule {
}
