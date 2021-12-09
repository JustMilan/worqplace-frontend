import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLocationReservationComponent } from "./page/location-reservations/location-reservations.component";

const routes: Routes = [
	{ path: 'location', component: AdminLocationReservationComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule {
}
