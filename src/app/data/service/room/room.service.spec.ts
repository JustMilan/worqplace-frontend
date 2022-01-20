import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Room } from "../../interface/Room";
import { RoomService } from "./room.service";
import { TestBed } from "@angular/core/testing";

describe('RoomService', () => {
	// Declare the variables which are used through out the test suite
	let service: RoomService;
	let httpMock: HttpTestingController;
	let apiUrl: string;
	let availableRoomMock: Room[];
	let availableWorkplaceMock: Room[];

	const locationId = 1;
	const date = '2021-12-20';
	const startTime = '12:00';
	const endTime = '14:00';

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule]

		});

		// Inject the dependencies in the variables
		service = TestBed.inject(RoomService);
		httpMock = TestBed.inject(HttpTestingController);
		apiUrl = service.apiUrl;

		availableRoomMock = [{
			id: 1,
			floor: 0,
			capacity: 8,
			available: 8
		}, {
			id: 2,
			floor: 0,
			capacity: 6,
			available: 6
		}];

		availableWorkplaceMock = [{
			id: 1,
			floor: 0,
			capacity: 5,
			available: 8
		}, {
			id: 2,
			floor: 0,
			capacity: 5,
			available: 6
		}];

	});

	afterEach(() => {
		// After every test, check that there are no more pending requests.
		httpMock.verify();
	});

	it('should create', () => {
		expect(service).toBeTruthy();
	});

	it('should be able to retrieve all the available workplaces from the API via GET', () => {
		// Run the getAvailableWorkplacesInRooms method and expect the response to match the expectations
		// (when the observable resolves)
		service.getAvailableWorkplacesInRooms(locationId, date, startTime, endTime).subscribe(availableWorkplaces => {
			expect(availableWorkplaces.length).toBe(2);
			expect(availableWorkplaces).toEqual(availableWorkplaceMock);
		});

		// When the service function is called, we can expect that there has been made 1 request to the endpoint
		const request = httpMock.expectOne(`${apiUrl}/availability/workplaces?locationId=${locationId}&date=${date}&start=${startTime}&end=${endTime}`);

		// Check if the type of the request is a GET
		expect(request.request.method).toBe('GET');

		// Respond with the mock data which resolves the observable
		request.flush(availableWorkplaceMock);
	});

	it('should be able to retrieve all the available rooms from the API via GET', () => {
		// Run the getAvailableFullRooms method and expect the response to match the expectations
		// (when the observable resolves)
		service.getAvailableFullRooms(locationId, date, startTime, endTime).subscribe(availableRooms => {
			expect(availableRooms.length).toBe(2);
			expect(availableRooms).toEqual(availableRoomMock);
		});

		// When the service function is called, we can expect that there has been made 1 request to the endpoint
		const request = httpMock.expectOne(`${apiUrl}/availability?locationId=${locationId}&date=${date}&start=${startTime}&end=${endTime}`);

		// Check if the type of the request is a GET
		expect(request.request.method).toBe('GET');

		// Respond with the mock data which resolves the observable
		request.flush(availableRoomMock);
	});

	it('should error in to a status 422 when date is in the past', () => {
		const errorEvent = new ErrorEvent('The reservation day could not be before today!');
		const status = 422;
		const statusText = 'Unprocessable Entity';


		service.getAvailableWorkplacesInRooms(locationId, date, startTime, endTime).subscribe(() => {
				// Next handler should not be called and if it does let it fail
				fail('next handler must not be called');
			}, (error) => {
				// Error handler must be called and inspect the error to match the expectations
				expect(error.error).toBe(errorEvent);
				expect(error.status).toBe(status);
				expect(error.statusText).toBe(statusText);
			},
			() => {
				// Complete handler should not be called and if it does let it fail
				fail('complete handler must not be called');
			});

		const request = httpMock.expectOne(`${apiUrl}/availability/workplaces?locationId=${locationId}&date=${date}&start=${startTime}&end=${endTime}`);

		// Let the request error instead of flush
		request.error(errorEvent, {status: status, statusText: statusText});
	});

	it('should error in to a status 422 when the reservation start time is after the end time', () => {
		const errorEvent = new ErrorEvent('The reservation start time cannot be after the end time!');
		const status = 422;
		const statusText = 'Unprocessable Entity';

		service.getAvailableFullRooms(locationId, date, startTime, endTime).subscribe(() => {
				// Next handler should not be called and if it does let it fail
				fail('next handler must not be called');
			},
			(error) => {
				// Error handler must be called and inspect the error to match the expectations
				expect(error.error).toBe(errorEvent);
				expect(error.status).toBe(status);
				expect(error.statusText).toBe(statusText);
			},
			() => {
				// Complete handler should not be called and if it does let it fail
				fail('complete handler must not be called');
			});

		const request = httpMock.expectOne(`${apiUrl}/availability?locationId=${locationId}&date=${date}&start=${startTime}&end=${endTime}`);

		// Let the request error instead of flush
		request.error(errorEvent, {status: status, statusText: statusText});
	});

});
