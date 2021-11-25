import { NgModule } from '@angular/core';
import { LoginComponent } from "./page/login.component";
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from "@angular/forms";

@NgModule({
	imports: [
		SharedModule,
		FormsModule
	],
	declarations: [
		LoginComponent
	]
})
export class LoginModule {
}
