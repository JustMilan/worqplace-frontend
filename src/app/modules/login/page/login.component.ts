import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from "../../../core/service/authentication.service";
import { Router } from '@angular/router';
import { NotificationService } from "../../../shared/service/notification.service";
import { DOCUMENT } from "@angular/common";


@Component({
	selector: 'app-login-page',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit, OnDestroy {
	username: string = '';
	password: string = '';

	constructor(private authenticationService: AuthenticationService, private router: Router,
				private notificationService: NotificationService, @Inject(DOCUMENT) private document: any) {

	}

	ngOnInit(): void {
		this.document.body.classList.add('login-body');
	}

	ngOnDestroy(): void {
		this.document.body.classList.remove('login-body');
	}

	login() {
		this.authenticationService.authenticate(this.username, this.password).subscribe(
			(data) => {
				localStorage.setItem("token", <string>data.headers.get("authorization"));
				localStorage.setItem("username", this.username);

				this.router.navigateByUrl("/");
			}, () => {
				this.notificationService.handleError("Verkeerd email of wachtwoord")
			}
		);
	}
}
