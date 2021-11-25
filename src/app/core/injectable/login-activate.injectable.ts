import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../../shared/service/authentication.service";
import { Observable } from "rxjs";

@Injectable()
export class LoginActivate implements CanActivate {
	constructor(private authService: AuthenticationService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean>|Promise<boolean>|boolean {
		if (!this.authService.isUserLoggedIn()) {
			this.router.navigate(['login']);
		}
		return true;
	}
}
