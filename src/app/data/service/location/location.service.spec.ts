import { TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Location } from "../../interface/Location";

describe('LocationService', () => {
	let service: LocationService;
	let httpMock: HttpTestingController;
	let apiUrl: string;
	let locationsMock: Location[];

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule]

		});

		service = TestBed.inject(LocationService);
		httpMock = TestBed.inject(HttpTestingController);
		apiUrl = service.apiUrl;

		locationsMock = [{
			id: 1,
			name: 'Quintor Amersfoort',
			address: {
				id: 1,
				street: 'Maanlander',
				number: '14',
				postalCode: '3824 MP',
				city: 'Amersfoort'
			}
		}, {
			id: 2,
			name: 'Quintor Den Bosch',
			address: {
				id: 2,
				street: 'Havensingel',
				number: '1',
				postalCode: '5211 TX',
				city: 'Den Bosch'
			}
		}];
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should create', () => {
		expect(service).toBeTruthy();
	});

	it('should be able to retrieve locations from the API via GET', () => {

		// Run the getLocations method and expect the response to match the expectations
		// (when the observable resolves)
		service.getLocations().subscribe(locations => {
			expect(locations.length).toBe(2);
			expect(locations).toEqual(locationsMock);
		});

		// When the service function is called, we can expect that there has been made 1 request to the endpoint
		const request = httpMock.expectOne(`${apiUrl}`);

		// Check if the type of the request is a GET
		expect(request.request.method).toBe('GET');

		// Respond with the mock data which resolves the observable
		request.flush(locationsMock);
	});

});
