import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../../core/service/authentication.service";
import { Observable } from "rxjs";

@Injectable()
export class AdminAuthGuard implements CanActivate {
	constructor(private authService: AuthenticationService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		if (!this.authService.isAuthenticated() || this.authService.getRole() != "ROLE_ADMIN") {
			this.router.navigate(['login']);
		}
		return true;
	}
}
