import { NgModule } from '@angular/core';
import { LoginComponent } from "./page/login.component";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		LoginComponent
	]
})
export class LoginModule {
}
