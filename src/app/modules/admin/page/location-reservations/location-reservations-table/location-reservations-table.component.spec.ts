import {Reservation} from "../../../../../data/interface/Reservation";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {SharedModule} from "../../../../../shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReservationService} from "../../../../../data/service/reservation/reservation.service";
import {of} from "rxjs";
import {AdminLocationReservationComponent} from "../location-reservations.component";
import {LocationService} from "../../../../../data/service/location/location.service";
import {AdminLocationReservationsTableComponent} from "./location-reservations-table.component";
import {By} from "@angular/platform-browser";

describe('AdminLocationReservationsTableComponent', () => {
	let component: AdminLocationReservationsTableComponent;
	let fixture: ComponentFixture<AdminLocationReservationsTableComponent>;

	let reservationsMock: Reservation[] = [
		{
			id: 1,
			date: '2021-12-31',
			startTime: '12:00',
			endTime: '13:30',
			roomId: 1,
			employeeId: 1,
			recurrence: {
				active: false,
				recurrencePattern: 'NONE'
			}
		}, {
			id: 2,
			date: '2022-01-01',
			startTime: '12:00',
			endTime: '13:30',
			roomId: 1,
			employeeId: 1,
			recurrence: {
				active: false,
				recurrencePattern: 'NONE'
			}
		}, {
			id: 3,
			date: '2022-01-02',
			startTime: '12:00',
			endTime: '13:30',
			roomId: 1,
			employeeId: 1,
			recurrence: {
				active: false,
				recurrencePattern: 'NONE'
			}
		}];

	let locationsMock = [{
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

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, SharedModule, RouterTestingModule, BrowserAnimationsModule],
			declarations: [AdminLocationReservationComponent],
			providers: [{
				provide: ReservationService,
				useValue: jasmine.createSpyObj('ReservationService', {
					getAllReservationsByLocationId: of(reservationsMock),
				})}, {
				provide: LocationService,
				useValue: jasmine.createSpyObj('LocationService', {
					getLocations: of(locationsMock)
				})}
			]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminLocationReservationsTableComponent);
		component = fixture.componentInstance;
		component.allMyReservations = reservationsMock;
		component.allMyReservationsSlice = reservationsMock.slice(0, 3);

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call getLocations method', () => {
		let spy = spyOn(component, 'ngOnInit').and.callThrough();

		component.ngOnInit();

		expect(spy).toHaveBeenCalled();
		expect(component.locations).toHaveSize(2);
	});
});
