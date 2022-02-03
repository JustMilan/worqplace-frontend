import { TestBed } from "@angular/core/testing";
import { AuthenticationService } from "../service/authentication.service";
import { CoreModule } from "../core.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Router } from "@angular/router";
import {AdminAuthGuard} from "./admin-auth.guard";

describe('AdminAuthGuard', () => {
	let adminAuthGuard: AdminAuthGuard;
	let authService: AuthenticationService;
	let routeMock: any = { snapshot: {}, };
	let routeStateMock: any = { snapshot: {}, url: '/admin/locations'};
	let routerMock = { navigate: jasmine.createSpy('navigate') };

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, CoreModule],
			providers: [ AuthenticationService, AdminAuthGuard, { provide: Router, useValue: routerMock }]
		});

		adminAuthGuard = TestBed.inject(AdminAuthGuard);
		authService = TestBed.inject(AuthenticationService);
	});

	it('should be created', () => {
		expect(adminAuthGuard).toBeTruthy();
	});

	it('should redirect an unauthenticated admin to the login route', () => {
		expect(adminAuthGuard.canActivate(routeMock, routeStateMock)).toEqual(false);
		expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
	});

	it('should allow the authenticated admin with role admin to access the admin/locations path', () => {
		spyOn(authService, 'isAuthenticated').and.returnValue(true);
		spyOn(authService, 'getRole').and.returnValue('ROLE_ADMIN');
		expect(adminAuthGuard.canActivate(routeMock, routeStateMock)).toEqual(true);
	});

});
