import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../service/authentication.service";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthenticationService, private router: Router) {
	}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		if (!this.authService.isAuthenticated()) {
			this.router.navigate(['/login']);
		}
		return true;
	}
}
