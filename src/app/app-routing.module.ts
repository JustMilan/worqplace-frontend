import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyReservationsComponent } from "./my-reservations/my-reservations.component";
import { ReservationPageComponent } from "./reservation-page/reservation-page.component";


const routes: Routes = [
  {path: '', redirectTo: '/reserve', pathMatch: 'full'},
  {path: 'reserve', component: ReservationPageComponent},
  {path: 'my-reservations', component: MyReservationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
