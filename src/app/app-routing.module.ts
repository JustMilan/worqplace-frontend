import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyReservationsComponent} from "./my-reservations/my-reservations.component";
import {ReservationPageComponent} from "./reservation-page/reservation-page.component";


const routes: Routes = [
  {path: 'home', component: MyReservationsComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'reserve', component: ReservationPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
