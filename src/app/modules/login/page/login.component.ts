import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from "../../../shared/service/authentication.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {NotificationService} from "../../../shared/service/notification.service";


@Component({
	selector: 'app-login-page',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {
	email: string = '';
	password: string = '';

	constructor(private authenticationService: AuthenticationService, private router: Router,
				private notificationService: NotificationService) {

	}

	ngOnInit(): void {
	}

	login() {
		this.authenticationService.authenticate(this.email, this.password).subscribe(
			(data) => {
				sessionStorage.setItem("token", <string>data.headers.get("authorization"));
				sessionStorage.setItem("username", this.email);

				this.router.navigateByUrl("/");
			}, (error) => {
				this.notificationService.handleError("Verkeerd email of wachtwoord")
			}
		);
	}
}
