import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReservationComponent } from "./modules/reservation/page/reservation.component";

const routes: Routes = [
    {path: '', redirectTo: '/reserve', pathMatch: 'full'},
    {path: 'reserve', component: ReservationComponent},
    {
        path: 'my-reservations',
        loadChildren: () => import('./modules/my-reservations/my-reservations.module').then(m => m.MyReservationsModule)
    },
    {path: '**', component: ReservationComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
