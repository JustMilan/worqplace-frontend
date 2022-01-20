import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReservationComponent } from "./modules/reservation/page/reservation.component";
import { LoginComponent } from "./modules/login/page/login.component";
import { AuthGuard } from "./core/guard/auth.guard";
import { AdminAuthGuard } from "./core/guard/admin-auth.guard";

const routes: Routes = [
	{path: '', redirectTo: '/reserve', pathMatch: 'full'},
	{path: 'reserve', component: ReservationComponent, canActivate: [AuthGuard]},
	{
		path: 'my-reservations',
		loadChildren: () => import('./modules/my-reservations/my-reservations.module').then(m => m.MyReservationsModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'admin',
		loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
		canActivate: [AdminAuthGuard]
	},
	{path: 'login', component: LoginComponent},
	{path: '**', component: ReservationComponent, canActivate: [AuthGuard]}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [AdminAuthGuard, AuthGuard]
})

export class AppRoutingModule {

}
