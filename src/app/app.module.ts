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
import { LoginModule } from "./modules/login/login.module";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { AdminModule } from "./modules/admin/admin.module";
import { CoreModule } from "./core/core.module";

@NgModule({
	declarations: [
		AppComponent,
		NavBarComponent
	],
	imports: [
		// angular
		BrowserModule,
		BrowserAnimationsModule,

		// 3rd party
		NgxMaterialTimepickerModule,

		// app
		ReservationModule,
		LoginModule,
		DataModule,
		CoreModule,
		SharedModule,
		NgxMaterialTimepickerModule,
		AdminModule,
		AppRoutingModule
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
