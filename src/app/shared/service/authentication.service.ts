import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import {environment} from "../../../environments/environment";

export class User {
	constructor(public status: string) {}
}

@Injectable({
	providedIn: "root"
})
export class AuthenticationService {
	constructor(private httpClient: HttpClient) {}
	// Provide username and password for authentication, and once authentication is successful,
	// store JWT token in session
	authenticate(email: string, password: string) {
		return this.httpClient
			.post<any>(environment.baseUrl + "/login", { email, password })
			.pipe(
				map(userData => {
					sessionStorage.setItem("username", email);
					let tokenStr = "Bearer " + userData.token;
					sessionStorage.setItem("token", tokenStr);
					return userData;
				})
			);
	}

	isUserLoggedIn() {
		let user = sessionStorage.getItem("username");
		console.log(!(user === null));
		return !(user === null);
	}

	logOut() {
		sessionStorage.removeItem("username");
		sessionStorage.removeItem("token");
	}
}
