import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReservationComponent } from "./modules/reservation/page/reservation.component";
import { LoginComponent } from "./modules/login/page/login.component";
import { LoginActivate } from "./core/injectable/login-activate.injectable";
import { AdminLoginActivate } from "./core/injectable/admin-login-activate.injectable";

const routes: Routes = [
	{path: '', redirectTo: '/reserve', pathMatch: 'full'},
	{path: 'reserve', component: ReservationComponent, canActivate: [LoginActivate]},
	{
		path: 'my-reservations',
		loadChildren: () => import('./modules/my-reservations/my-reservations.module').then(m => m.MyReservationsModule),
		canActivate: [LoginActivate]
	},
	{
		path: 'admin',
		loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
	 	canActivate: [AdminLoginActivate]
	},
	{path: 'login', component: LoginComponent},
	{path: '**', component: ReservationComponent, canActivate: [LoginActivate]}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [LoginActivate, AdminLoginActivate]
})

export class AppRoutingModule {

}
