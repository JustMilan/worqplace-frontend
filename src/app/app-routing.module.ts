import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyReservationsComponent } from "./modules/my-reservations/page/my-reservations.component";
import { ReservationComponent } from "./modules/reservation/page/reservation.component";

const routes: Routes = [
  {path: '', redirectTo: '/reserve', pathMatch: 'full'},
  {path: 'reserve', component: ReservationComponent},
  {path: 'my-reservations', component: MyReservationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
