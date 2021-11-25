import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReservationComponent } from "./modules/reservation/page/reservation.component";
import { LoginComponent } from "./modules/login/page/login.component";
import { LoginActivate } from "./core/injectable/login-activate.injectable";

const routes: Routes = [
	{path: '', redirectTo: '/reserve', pathMatch: 'full'},
	{path: 'reserve', component: ReservationComponent, canActivate: [LoginActivate]},
	{
		path: 'my-reservations',
		loadChildren: () => import('./modules/my-reservations/my-reservations.module').then(m => m.MyReservationsModule),
		canActivate: [LoginActivate]
	},
	{path: 'login', component: LoginComponent},
	{path: '**', component: ReservationComponent, canActivate: [LoginActivate]}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [LoginActivate]
})

export class AppRoutingModule {

}
