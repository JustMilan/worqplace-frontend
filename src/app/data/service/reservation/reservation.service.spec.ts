import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';

import { ReservationService } from './reservation.service';
import { Reservation } from "../../interface/Reservation";

describe('ReservationService', () => {
	// Declare the variables which are used through out the test suite
	let service: ReservationService;
	let httpMock: HttpTestingController;
	let apiUrl: string;
	let reservationsMock: Reservation[];

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule]

		});

		// Inject the dependencies in the variables
		service = TestBed.inject(ReservationService);
		httpMock = TestBed.inject(HttpTestingController);
		apiUrl = service.apiUrl;

		reservationsMock = [{
			id: 1,
			date: '2021-12-20',
			startTime: '12:00',
			endTime: '14:00',
			roomId: 1,
			workplaceAmount: 2,
			recurrence: {
				active: false
			}
		}, {
			id: 2,
			date: '2021-12-20',
			startTime: '18:00',
			endTime: '22:00',
			roomId: 1,
			workplaceAmount: 6,
			recurrence: {
				active: false
			}
		}, {
			id: 3,
			date: '2021-12-20',
			startTime: '12:00',
			endTime: '14:00',
			roomId: 1,
			workplaceAmount: 2,
			recurrence: {
				active: false
			}
		}];
	});

	afterEach(() => {
		// After every test, check that there are no more pending requests.
		httpMock.verify();
	});

	it('should create', () => {
		expect(service).toBeTruthy();
	});

	it('should be able to retrieve all reservations by employeeId from the API via GET', () => {
		// Run the getAllReservationsByEmployeeId method and expect the response to match the expectations
		// (when the observable resolves)
		service.getAllReservationsByEmployeeId().subscribe(reservations => {
			expect(reservations.length).toBe(3);
			expect(reservations).toEqual(reservationsMock);
		});

		// When the service function is called, we can expect that there has been made 1 request to the endpoint
		const request = httpMock.expectOne( `${apiUrl}/all`);

		// Check if the type of the request is a GET
		expect(request.request.method).toBe('GET');

		// Respond with the mock data which resolves the observable
		request.flush(reservationsMock);
	});

	it('should be able to reserve a workplace with the API via POST', () => {
		const workplaceReservation: Reservation = {
			id: 4,
			date: '2021-12-20',
			startTime: '16:00',
			endTime: '19:00',
			roomId: 1,
			workplaceAmount: 2,
			recurrence: {
				active: false
			}
		};

		// Run the reserveWorkplace method and expect the response to match the expectations
		// (when the observable resolves)
		service.reserveWorkplace(workplaceReservation).subscribe(reservation => {
			reservationsMock.push(reservation);

			expect(reservationsMock.length).toBe(4);
			expect(reservation).toEqual(workplaceReservation);
		});

		// When the service function is called, we can expect that there has been made 1 request to the endpoint
		const request = httpMock.expectOne( `${apiUrl}/workplaces`);

		// Check if the type of the request is a POST
		expect(request.request.method).toBe('POST');

		// Respond with the mock data which resolves the observable
		request.flush(workplaceReservation);
	});

	it('should be able to reserve a room with the API via POST', () => {
		const roomReservation: Reservation = {
			id: 5,
			date: '2021-12-20',
			startTime: '16:00',
			endTime: '19:00',
			roomId: 1,
			workplaceAmount: 6,
			recurrence: {
				active: false
			}
		};

		// Run the reserveRoom method and expect the response to match the expectations
		// (when the observable resolves)
		service.reserveRoom(roomReservation).subscribe(reservation => {
			reservationsMock.push(reservation);

			expect(reservationsMock.length).toBe(4);
			expect(reservation).toEqual(roomReservation);
		});

		// When the service function is called, we can expect that there has been made 1 request to the endpoint
		const request = httpMock.expectOne( `${apiUrl}/rooms`);

		// Check if the type of the request is a POST
		expect(request.request.method).toBe('POST');

		// Respond with the mock data which resolves the observable
		request.flush(roomReservation);
	});

	it('should error in to a status 422 when date is in the past', () => {
		const roomReservation: Reservation = {
			id: 5,
			date: '2021-12-20',
			startTime: '16:00',
			endTime: '19:00',
			roomId: 1,
			workplaceAmount: 6,
			recurrence: {
				active: false
			}
		};

		const errorEvent = new ErrorEvent('The reservation day could not be before today!');
		const status = 422;
		const statusText = 'Unprocessable Entity';


		service.reserveRoom(roomReservation).subscribe(() => {
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

		const request = httpMock.expectOne( `${apiUrl}/rooms`);

		// Let the request error instead of flush
		request.error(errorEvent, {status: status, statusText: statusText});
	});

	it('should error in to a status 422 when the reservation start time is after the end time', () => {
		const workplaceReservation: Reservation = {
			id: 5,
			date: '2021-12-20',
			startTime: '19:00',
			endTime: '16:00',
			roomId: 1,
			workplaceAmount: 3,
			recurrence: {
				active: false
			}
		};

		const errorEvent = new ErrorEvent('The reservation start time cannot be after the end time!');
		const status = 422;
		const statusText = 'Unprocessable Entity';

		service.reserveWorkplace(workplaceReservation).subscribe(() => {
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

		const request = httpMock.expectOne( `${apiUrl}/workplaces`);

		// Let the request error instead of flush
		request.error(errorEvent, {status: status, statusText: statusText});
	});

});
