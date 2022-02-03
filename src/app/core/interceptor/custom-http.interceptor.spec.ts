import {CustomHttpInterceptor} from "./custom-http.interceptor";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";
import {CoreModule} from "../core.module";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {environment} from "../../../environments/environment";

describe('CustomHttpInterceptor', () => {
	let customHttpInterceptor: CustomHttpInterceptor;
	let httpMock: HttpTestingController;
	let httpClient: HttpClient

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, HttpClientModule, CoreModule],
			providers: [
				{
					provide: HTTP_INTERCEPTORS,
					useClass: CustomHttpInterceptor,
					multi: true
				},
				]
		});

		customHttpInterceptor = TestBed.inject(CustomHttpInterceptor);
		httpMock = TestBed.inject(HttpTestingController);
		httpClient = TestBed.inject(HttpClient);
	});

	afterEach(() => {
		localStorage.removeItem('token');
	});

	it('should create', () => {
		expect(customHttpInterceptor).toBeTruthy();
	});


	it('Should add the token Header if localstorage has a token and url starts with environment variable url',
		() => {
			const baseUrl = 'http://localhost:8080';
			const tokenMock = 'Bearer eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFM1MTIifQ.moyBAKRGSab2nKJL34W-fqPf6aKQlfww3Yg';
			let request;

			localStorage.setItem('token', tokenMock);
			httpClient.get(`${baseUrl}/locations`).subscribe();
			request = httpMock.match({ method: 'get' });

			expect(baseUrl).toEqual(environment.baseUrl);
			expect(request[0].request.headers.has('Authorization')).toEqual(true);
	});

	it('Should not add the token Header if localstorage has a token and url starts with environment variable url',
		() => {
			const baseUrl = 'http://localhost:8080';
			let request;

			httpClient.get(`${baseUrl}/locations`).subscribe();
			request = httpMock.match({ method: 'get' });

			expect(baseUrl).toEqual(environment.baseUrl);
			expect(request[0].request.headers.has('Authorization')).toEqual(false);
	});

	xit('Should catch error', () => {
		const errorEvent = new ErrorEvent('The reservation day could not be before today!');
		const status = 422;
		const statusText = 'Unprocessable Entity';

		const baseUrl = 'http://localhost:8080';
		let request;

		httpClient.get(`${baseUrl}/test`).subscribe(() => {
			console.log('-----------------------------------------------------------------------------------------------------------------------')
			// Next handler should not be called and if it does let it fail
			fail('next handler must not be called');
		}, (error) => {
			// Error handler must be called and inspect the error to match the expectations
			expect(error.error).toEqual(errorEvent);
			expect(error.status).toEqual(status);
			expect(error.statusText).toEqual(statusText);
		},
		() => {
			// Complete handler should not be called and if it does let it fail
			fail('complete handler must not be called');
		});

		request = httpMock.expectOne(`${baseUrl}/test`);

		// Let the request error instead of flush
		request.error(errorEvent, {status: status, statusText: statusText});
	});
});
