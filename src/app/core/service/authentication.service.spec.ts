import { TestBed } from "@angular/core/testing";
import { AuthenticationService } from "./authentication.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CoreModule } from "../core.module";
import { environment } from "../../../environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";

describe('AuthenticationService', () => {
	let authenticationService: AuthenticationService;
	let jwtHelperService: JwtHelperService;
	let httpMock: HttpTestingController;

	let apiUrl = `${environment.baseUrl}`;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, CoreModule],
			providers: [AuthenticationService]
		});

		authenticationService = TestBed.inject(AuthenticationService);
		httpMock = TestBed.inject(HttpTestingController);
		jwtHelperService = TestBed.inject(JwtHelperService);
	});

	afterEach(() => {
		// After every test, check that there are no more pending requests.
		httpMock.verify();

		localStorage.removeItem('token');
	});

	it('should be created', () => {
		expect(authenticationService).toBeTruthy();
	});

	it('should authenticate with username and password to API via POST ', () => {
		const username = "test";
		const password = "test123";

		// Run the authenticate method and expect the response to match the expectations
		// (when the observable resolves)
		authenticationService.authenticate(username, password).subscribe((data) => {
			expect(data.status).toBe(200);
		});

		// When the service function is called, we can expect that there has been made 1 request to the endpoint
		const request = httpMock.expectOne(`${apiUrl}/login`);

		// Check if the type of the request is a POST
		expect(request.request.method).toBe('POST');

		// Respond with the mock data which resolves the observable
		request.flush('', {status: 200, statusText: 'Logged in'});
	});

	it('should return false if not authenticated with token', () => {
		let spy = spyOn(authenticationService, 'isAuthenticated').and.callThrough();

		let isAuthenticated = authenticationService.isAuthenticated();

		expect(spy).toHaveBeenCalled();
		expect(isAuthenticated).toBeFalsy();
	});

	it('should return false if not authenticated with valid token', () => {
		let spy = spyOn(authenticationService, 'isAuthenticated').and.callThrough();
		let jwtHelperServiceSpy = spyOn(jwtHelperService, 'decodeToken').and.throwError("Error while decoding token");

		localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
		let isAuthenticated = authenticationService.isAuthenticated();

		expect(spy).toHaveBeenCalled();
		expect(jwtHelperServiceSpy).toHaveBeenCalled();
		expect(isAuthenticated).toBeFalsy();
	});

	it('should return false if not authenticated with expired token', () => {
		let spy = spyOn(authenticationService, 'isAuthenticated').and.callThrough();
		let jwtHelperServiceSpy = spyOn(jwtHelperService, 'isTokenExpired').and.returnValue(true);

		localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
		let isAuthenticated = authenticationService.isAuthenticated();

		expect(spy).toHaveBeenCalled();
		expect(jwtHelperServiceSpy).toHaveBeenCalled();
		expect(isAuthenticated).toBeFalsy();
	});

	it('should return false if not authenticated with expired token', () => {
		let spy = spyOn(authenticationService, 'isAuthenticated').and.callThrough();
		let jwtHelperServiceSpy = spyOn(jwtHelperService, 'isTokenExpired').and.returnValue(false);

		localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
		let isAuthenticated = authenticationService.isAuthenticated();

		expect(spy).toHaveBeenCalled();
		expect(jwtHelperServiceSpy).toHaveBeenCalled();
		expect(isAuthenticated).toBeTruthy();
	});

	it('should split the token on Bearer keyword', () => {
		let spy = spyOn(authenticationService, 'splitToken').and.callThrough();

		localStorage.setItem('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
		let token = localStorage.getItem('token');
		let splittedToken = authenticationService.splitToken(token!);

		expect(spy).toHaveBeenCalled();
		expect(splittedToken).toEqual('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
	});

	it('should get the role out of the jwt token ', () => {
		let spy = spyOn(authenticationService, "getRole").and.callThrough();
		let jwtHelperServiceSpy = spyOn(jwtHelperService, 'decodeToken').and.returnValue({role: ["ROLE_ADMIN"]});

		localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
		let role = authenticationService.getRole();

		expect(spy).toHaveBeenCalled();
		expect(jwtHelperServiceSpy).toHaveBeenCalled();
		expect(role).toEqual("ROLE_ADMIN");
	});

	it('should get the role out of the jwt token ', () => {
		let spy = spyOn(authenticationService, "getRole").and.callThrough();

		localStorage.removeItem('token');
		let role = authenticationService.getRole();

		expect(spy).toHaveBeenCalled();
		expect(role).toEqual("");
	});

	it('should remove token and username from localstorage when logging out', () => {
		let spy = spyOn(authenticationService, "logOut").and.callThrough();

		localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
		localStorage.setItem('username', 'kees');

		authenticationService.logOut();

		let token = localStorage.getItem('token');
		let username = localStorage.getItem('username');

		expect(spy).toHaveBeenCalled();
		expect(token).toBeNull();
		expect(username).toBeNull();
	});
});
