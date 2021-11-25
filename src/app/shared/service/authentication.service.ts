import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {SourceCode} from "eslint";
import Config = SourceCode.Config;

export class User {
	constructor(public status: string) {}
}

@Injectable({
	providedIn: "root"
})
export class AuthenticationService {
	constructor(private httpClient: HttpClient) {}

	// Provide username and password for authentication
	authenticate(email: string, password: string) {
		return this.httpClient
			.post<any>(environment.baseUrl + "/login", { username: email, password }, {observe: "response"})
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
