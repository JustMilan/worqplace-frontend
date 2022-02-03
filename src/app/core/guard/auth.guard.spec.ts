import { TestBed } from "@angular/core/testing";
import { AuthenticationService } from "../service/authentication.service";
import { AuthGuard } from "./auth.guard";
import { CoreModule } from "../core.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Router } from "@angular/router";

describe('AuthGuard', () => {
	let authGuard: AuthGuard;
	let authService: AuthenticationService;
	let routeMock: any = { snapshot: {}, };
	let routeStateMock: any = { snapshot: {}, url: '/reserve'};
	let routerMock = { navigate: jasmine.createSpy('navigate') }

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, CoreModule],
			providers: [ AuthenticationService, AuthGuard, { provide: Router, useValue: routerMock }]
		});

		authGuard = TestBed.inject(AuthGuard);
		authService = TestBed.inject(AuthenticationService);
	});

	it('should be created', () => {
		expect(authGuard).toBeTruthy();
	});

	it('should redirect an unauthenticated user to the login route', () => {
		expect(authGuard.canActivate(routeMock, routeStateMock)).toEqual(false);
		expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
	});

	it('should allow the authenticated user to access app', () => {
		spyOn(authService, 'isAuthenticated').and.returnValue(true);
		expect(authGuard.canActivate(routeMock, routeStateMock)).toEqual(true);
	});

});
