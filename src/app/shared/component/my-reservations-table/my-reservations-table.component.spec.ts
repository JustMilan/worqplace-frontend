import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReservationsTableComponent } from './my-reservations-table.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { SharedModule } from "../../shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";
import { ReservationService } from "../../../data/service/reservation/reservation.service";
import { Reservation } from "../../../data/interface/Reservation";
import { By } from "@angular/platform-browser";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSelectChange } from "@angular/material/select";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

describe('MyReservationsTableComponent', () => {
	let component: MyReservationsTableComponent;
	let fixture: ComponentFixture<MyReservationsTableComponent>;

	let dialog: MatDialog;
	let dialogRef: jasmine.SpyObj<MatDialogRef<any>>;

	let reservationsMock: Reservation[] = [
		{
			id: 1,
			date: '2021-12-31',
			startTime: '12:00',
			endTime: '13:30',
			roomId: 1,
			recurrence: {
				active: false
			}
		}, {
			id: 2,
			date: '2022-01-01',
			startTime: '12:00',
			endTime: '13:30',
			roomId: 1,
			recurrence: {
				active: false
			}
		}, {
			id: 3,
			date: '2022-01-02',
			startTime: '12:00',
			endTime: '13:30',
			roomId: 1,
			recurrence: {
				active: false
			}
		}
	];

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, RouterTestingModule, SharedModule, BrowserAnimationsModule],
			declarations: [MyReservationsTableComponent],
			providers: [{
				provide: ReservationService,
				useValue: jasmine.createSpyObj('ReservationService', {
					getAllReservationsByEmployeeId: of(reservationsMock),
					getAllReservationsByEmployeeIdAndFilters: of(reservationsMock),
					deleteReservationById: of(reservationsMock)
				})
			}, {
				provide: MatDialogRef,
				useValue: {
					afterClosed: jasmine.createSpy('MatDialogRef.afterClosed()').and.returnValue(of({
						data: {reservation: reservationsMock[0]}
					}))
				}
			}]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MyReservationsTableComponent);

		component = fixture.componentInstance;
		component.showTable = true;
		component.allMyReservations = reservationsMock;
		component.allMyReservationsSlice = reservationsMock.slice(0, 3);

		dialog = TestBed.inject(MatDialog);
		dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<any>>;

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('getting data', () => {
		beforeEach(() => {

		});
	});

	it('should call getAllReservationsByEmployeeId method', () => {
		let spy = spyOn(component, 'getAllReservationsByEmployeeId').and.callThrough();

		component.getAllReservationsByEmployeeId();

		expect(spy).toHaveBeenCalled();
		expect(component.allMyReservations).toHaveSize(3);
	});

	it('should call deleteReservationByReservationId method', () => {
		let spy = spyOn(component, 'deleteReservationByReservationId').and.callThrough();
		let reservationId = 1;

		component.deleteReservationByReservationId(reservationId);
		component.allMyReservations = component.allMyReservationsSlice.filter(r => r.id !== reservationId);

		expect(spy).toHaveBeenCalled();
		expect(component.allMyReservations).toHaveSize(2);
	});

	it('should slice allMyReservations in OnPageChange', () => {
		const paginator = fixture.debugElement.query(By.css('.paginator'));
		let spy = spyOn(component, 'OnPageChange').and.callThrough();

		component.paginator.pageIndex = 1;
		component.paginator.pageSize = 3;
		paginator.triggerEventHandler('page', component.paginator);
		fixture.detectChanges();

		expect(spy).toHaveBeenCalled();
		expect(component.allMyReservationsSlice).toHaveSize(0);
	});

	it('should not slice allMyReservations in OnPageChange', () => {
		const paginator = fixture.debugElement.query(By.css('.paginator'));
		let spy = spyOn(component, 'OnPageChange').and.callThrough();

		component.paginator.pageIndex = 0;
		component.paginator.pageSize = 1;
		paginator.triggerEventHandler('page', component.paginator);
		fixture.detectChanges();

		expect(spy).toHaveBeenCalled();
		expect(component.allMyReservationsSlice).toHaveSize(1);
	});

	it('should call showAlterDialog method', () => {
		let spy = spyOn(dialog, 'open').and.returnValue(dialogRef);

		fixture.detectChanges();
		component.showAlterDialog(reservationsMock[0]);

		expect(spy).toHaveBeenCalled();
	});

	it('should call getAllReservationsByEmployeeIdWithFilters method when location is changed', () => {
		const locFilter = fixture.debugElement.query(By.css('.location-filter'));

		let spy = spyOn(component, 'getAllReservationsByEmployeeIdWithFilters').and.callThrough();

		component.refreshLocation(new MatSelectChange(locFilter.componentInstance, 1));

		fixture.detectChanges();

		expect(spy).toHaveBeenCalled();
		expect(location).toBe(location);
		expect(component.allMyReservations).toHaveSize(1);
	});

	it('should call getAllReservationsByEmployeeIdWithFilters method when date is changed', () => {
		const dateFilter = fixture.debugElement.query(By.css('.date-filter'));

		let spy = spyOn(component, 'getAllReservationsByEmployeeIdWithFilters').and.callThrough();
		let date = new Date();

		let event = new MatDatepickerInputEvent(dateFilter.componentInstance, dateFilter.nativeElement);
		event.value = date;

		component.refreshStartDate(event);

		fixture.detectChanges();

		expect(spy).toHaveBeenCalled();
		expect(component.date).toBe(date);
		expect(component.allMyReservations).toHaveSize(1);
	});

	it("should sort list ascending by date", () => {

		component.getAllReservationsByEmployeeId();
		component.sortReservationsByEmployeeId();
		component.sortReservationsByEmployeeId();

		expect(Date.parse(component.allMyReservations[0].date) - Date.parse(component.allMyReservations[1].date) > 0).toBeTrue();
		expect(Date.parse(component.allMyReservations[1].date) - Date.parse(component.allMyReservations[2].date) > 0).toBeTrue();
	});

	it("should sort list descending by date", () => {

		component.getAllReservationsByEmployeeId();
		component.sortReservationsByEmployeeId();

		expect(Date.parse(component.allMyReservations[0].date) - Date.parse(component.allMyReservations[1].date) > 0).toBeFalse();
		expect(Date.parse(component.allMyReservations[1].date) - Date.parse(component.allMyReservations[2].date) > 0).toBeFalse();
	});
});
