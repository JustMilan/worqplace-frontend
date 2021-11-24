import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from "../../../shared/service/authentication.service";

@Component({
	selector: 'app-login-page',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {
	email: string = '';
	password: string = '';

	constructor(private authenticationService: AuthenticationService) {
	}

	ngOnInit(): void {
	}

	login() {
		(this.authenticationService.authenticate(this.email, this.password).subscribe(
				data => {
					console.log(data);
				},
				error => {
					console.log(error);
				}
			)
		);
	}
}
