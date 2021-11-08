import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyReservationsComponent } from "./page/my-reservations.component";

const routes: Routes = [
    {path: '', component: MyReservationsComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyReservationsRoutingModule {
}
