import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CustomHttpInterceptor } from "./core/interceptor/custom-http.interceptor";
import { DataModule } from "./data/data.module";
import { NavBarComponent } from "./layout/nav-bar/nav-bar.component";

import { ReservationModule } from "./modules/reservation/reservation.module";
import { SharedModule } from "./shared/shared.module";
import { NotificationService } from "./shared/service/notification.service";

@NgModule({
	declarations: [
		AppComponent,
		NavBarComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		ReservationModule,
		DataModule,
		SharedModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: CustomHttpInterceptor,
			multi: true
		},
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
