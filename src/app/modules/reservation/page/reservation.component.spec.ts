import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReservationComponent} from './reservation.component';
import {SharedModule} from "../../../shared/shared.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {Room} from "../../../data/interface/Room";
import {ReservationResponse} from "../../../data/interface/ReservationResponse";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Recurrence} from "../../../data/interface/Recurrence";
import {By} from "@angular/platform-browser";
import {of} from "rxjs";
import {LocationService} from "../../../data/service/location/location.service";
import {RoomService} from "../../../data/service/room/room.service";
import {NotificationService} from "../../../shared/service/notification.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ReservationService} from "../../../data/service/reservation/reservation.service";

describe('ReservationPageComponent', () => {
	let component: ReservationComponent;
	let fixture: ComponentFixture<ReservationComponent>;

	let locationsMock: Location[];
	let availableRooms: Room[];
	let roomMock: Room;
	let reservationResponseMock: ReservationResponse;
	let recurrenceMock: Recurrence;
	let workplaceAmountMock: number;

	let dialog: MatDialog;
	let dialogRef: jasmine.SpyObj<MatDialogRef<any>>;

	let notificationService: NotificationService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, RouterTestingModule, SharedModule, BrowserAnimationsModule],
			declarations: [ReservationComponent],
			providers: [{
				provide: LocationService,
				useValue: jasmine.createSpyObj('LocationService', {getLocations: of(locationsMock)})
			}, {
				provide: RoomService,
				useValue: jasmine.createSpyObj('RoomService', {
					getAvailableFullRooms: of(availableRooms),
					getAvailableWorkplacesInRooms: of(availableRooms),
					reserveRoom: of(roomMock)
				})
			}, {
				provide: ReservationService,
				useValue: jasmine.createSpyObj('ReservationService', {
					reserveRoom: of({}),
					reserveWorkplace: of({}),
					getAllReservationsByEmployeeId: of(),
				})
			}, {
				provide: NotificationService
			},
				{
					provide: MatDialogRef,
					useValue: {
						afterClosed: jasmine.createSpy('MatDialogRef.afterClosed()').and.returnValue(of({
							data: {room: roomMock, reservationType: reservationResponseMock}
						}))
					}
				}
			]
		})
			.compileComponents();

	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ReservationComponent);
		component = fixture.componentInstance;

		dialog = TestBed.inject(MatDialog);
		dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<any>>;

		notificationService = TestBed.inject(NotificationService);

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call toggleTable method', () => {
		let spy = spyOn(component, 'toggleTable').and.callThrough();

		component.toggleTable();

		expect(spy).toHaveBeenCalled();
	});

	describe('getting data', () => {

		beforeEach(() => {
			availableRooms = [
				{
					id: 1,
					floor: 0,
					capacity: 8,
					available: 8
				}, {
					id: 2,
					floor: 0,
					capacity: 6,
					available: 6
				},
			];

			roomMock = {
				id: 1,
				floor: 0,
				capacity: 8,
				available: 8
			};

			recurrenceMock = {
				active: false,
				recurrencePattern: 'NONE'
			}

			reservationResponseMock = {
				locationId: 1,
				date: '2021-12-12',
				time: {
					start: '12:00',
					end: '13:00'
				},
				type: 'Ruimte',
				amount: 5,
				recurrence: recurrenceMock
			};

			workplaceAmountMock = 2;

			component.rooms = availableRooms;
			component.reservationResponse = reservationResponseMock;
		});

		it('should convert to room reservation', () => {
			reservationResponseMock.type = 'Ruimte';

			let roomReservation = component.selectedRoomReservation(roomMock, recurrenceMock);

			expect(roomReservation.date).toEqual(reservationResponseMock.date);
			expect(roomReservation.startTime).toEqual(reservationResponseMock.time.start);
			expect(roomReservation.endTime).toEqual(reservationResponseMock.time.end);
			expect(roomReservation.roomId).toEqual(roomMock.id);
			expect(roomReservation.recurrence).toEqual(recurrenceMock);
		});

		it('should convert to workplace reservation', () => {
			reservationResponseMock.type = 'Werkplek';

			let roomReservation = component.selectedWorkplacesReservation(roomMock, workplaceAmountMock, recurrenceMock);

			expect(roomReservation.date).toEqual(reservationResponseMock.date);
			expect(roomReservation.startTime).toEqual(reservationResponseMock.time.start);
			expect(roomReservation.endTime).toEqual(reservationResponseMock.time.end);
			expect(roomReservation.roomId).toEqual(roomMock.id);
			expect(roomReservation.workplaceAmount).toEqual(workplaceAmountMock);
			expect(roomReservation.recurrence).toEqual(recurrenceMock);
		});

		it('should check room availability', () => {
			let spy = spyOn(component, 'checkAvailability').and.callThrough();

			reservationResponseMock.type = 'Ruimte';
			component.checkAvailability(reservationResponseMock);

			expect(spy).toHaveBeenCalled();
		});

		it('should check workplace availability', () => {
			let spy = spyOn(component, 'checkAvailability').and.callThrough();

			reservationResponseMock.type = 'Werkplek';
			component.checkAvailability(reservationResponseMock);

			expect(spy).toHaveBeenCalled();
		});

		it('should reserve room', () => {
			let spy = spyOn(component, "reserveRoom").and.callThrough();

			component.reserveRoom(component.selectedRoomReservation(roomMock, recurrenceMock));

			expect(component.rooms).toHaveSize(1);
			expect(spy).toHaveBeenCalled();
		});

		it('should reserve workplace', () => {
			let spy = spyOn(component, "reserveWorkplace").and.callThrough();

			component.reserveWorkplace(component.selectedWorkplacesReservation(roomMock, workplaceAmountMock, recurrenceMock), roomMock);

			expect(component.rooms).toHaveSize(2);
			expect(spy).toHaveBeenCalled();
		});

		it('should notify when workplace amount is less than 1 when reserving workplace', () => {
			let spy = spyOn(component, "reserveWorkplace").and.callThrough();
			const invalidWorkplaceAmount = 0;

			notificationService.onNotification().subscribe((notification) => {
				expect(notification.message).toEqual('The workplace amount is not valid!');
				expect(notification.colorClass).toEqual('error');
			})

			component.reserveWorkplace(component.selectedWorkplacesReservation(roomMock, workplaceAmountMock, recurrenceMock), roomMock);

			expect(spy).toHaveBeenCalled();
		});

		it('should call onSubmit event from reservation form child component', () => {
			const reservationFormElement = fixture.debugElement.query(By.css('.reservation-form'));
			let spy = spyOn(component, 'onSubmit').and.callThrough();

			reservationFormElement.triggerEventHandler('submit', reservationResponseMock);
			fixture.detectChanges();

			expect(spy).toHaveBeenCalled();
		});

		it('should handle error when reservation response is undefined in onSubmit method', () => {
			let spy = spyOn(component, 'onSubmit').and.callThrough();
			const reservationFormElement = fixture.debugElement.query(By.css('.reservation-form'));

			reservationFormElement.triggerEventHandler('submit', {});
			fixture.detectChanges();

			expect(spy).toHaveBeenCalled();
			expect(component.reservationResponse.locationId).not.toBeDefined();
			expect(component.reservationResponse.date).not.toBeDefined();
			expect(component.reservationResponse.time).not.toBeDefined();
			expect(component.reservationResponse.type).not.toBeDefined();
		});

		it('should call book event from open reservation card component', () => {
			const openReservationCardElement = fixture.debugElement.query(By.css('.reservation-cards'));
			let spy = spyOn(component, 'book').and.callThrough();

			openReservationCardElement.triggerEventHandler('book', roomMock);
			fixture.detectChanges();

			expect(spy).toHaveBeenCalled();
		});
	});

});
