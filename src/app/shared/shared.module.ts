import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MyReservationsTableComponent } from "./component/my-reservations-table/my-reservations-table.component";
import { MaterialModule } from "./material.module";
import { NotificationComponent } from './component/notification/notification.component';
import { NotificationService } from "./service/notification.service";

@NgModule({
	declarations: [
		MyReservationsTableComponent,
		NotificationComponent,
	],
	imports: [
		CommonModule,
		MaterialModule
	],
	exports: [
		CommonModule,
		MyReservationsTableComponent,
		MaterialModule,
		NotificationComponent
	],
	providers: [NotificationService, NotificationComponent],
})
export class SharedModule {
}
