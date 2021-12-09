import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { JwtHelperService } from '@auth0/angular-jwt';

export class User {
	constructor(public status: string) {}
}

@Injectable({
	providedIn: "root"
})
export class AuthenticationService {
	constructor(private httpClient: HttpClient, public jwtHelper: JwtHelperService) {}

	// Provide username and password for authentication
	authenticate(email: string, password: string) {
		return this.httpClient
			.post<any>(environment.baseUrl + "/login", { username: email, password }, {observe: "response"})
	}

	isAuthenticated(): boolean {
		let token = localStorage.getItem("token");
		let username = localStorage.getItem('username');

		if (username === null)
			return false;

		if (token !== null) {
			token = this.splitToken(token);

			if (!this.isValidToken(token))
				return false;

			return !this.jwtHelper.isTokenExpired(token);
		}

		return false;
	}

	splitToken(token: string): string {
		if (token.startsWith("Bearer ")){
			return token.substring(7, token.length);
		} else {
			return '';
		}
	}

	isValidToken(token: string): boolean {
		try {
			this.jwtHelper.decodeToken(token);
		} catch (e) {
			return false;
		}

		return true;
	}

	logOut() {
		localStorage.removeItem("username");
		localStorage.removeItem("token");
	}

	getRole() {
		let token = localStorage.getItem("token");

		if (!token) return "";
		let decoded = this.jwtHelper.decodeToken(token);

		return decoded.role[0];
	}
}
