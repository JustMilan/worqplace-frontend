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

describe('MyReservationsTableComponent', () => {
	let component: MyReservationsTableComponent;
	let fixture: ComponentFixture<MyReservationsTableComponent>;

	let reservationsMock: Reservation[] = [
		{
			id: 1,
			date: '2021-12-31',
			startTime: '12:00',
			endTime: '13:30',
			roomId: 1,
			recurrence: {
				active: false
			}}];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, RouterTestingModule, SharedModule, BrowserAnimationsModule],
			declarations: [MyReservationsTableComponent],
			providers: [{
				provide: ReservationService,
				useValue: jasmine.createSpyObj('ReservationService', {
					getAllReservationsByEmployeeId: of(reservationsMock),
					deleteReservationById: of(reservationsMock)} )
			}]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MyReservationsTableComponent);

		component = fixture.componentInstance;
		component.showTable = true;
		component.allMyReservations = reservationsMock;
		component.allMyReservationsSlice = reservationsMock.slice(0,3);

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('getting data', () => {
		beforeEach(() => {

		});
	});

	it('should call getAllReservationsByEmployeeId method',  () => {
		let spy = spyOn(component, 'getAllReservationsByEmployeeId').and.callThrough();

		component.getAllReservationsByEmployeeId();

		expect(spy).toHaveBeenCalled();
		expect(component.allMyReservations).toHaveSize(1);
	});

	it('should call deleteReservationByReservationId method',  () => {
		let spy = spyOn(component, 'deleteReservationByReservationId').and.callThrough();
		let reservationId = 1;

		component.deleteReservationByReservationId(reservationId);
		component.allMyReservations = component.allMyReservationsSlice.filter(r => r.id !== reservationId);

		expect(spy).toHaveBeenCalled();
		expect(component.allMyReservations).toHaveSize(0);
	});

	it('should slice allMyReservations in OnPageChange',  () => {
		const paginator = fixture.debugElement.query(By.css('.paginator'));
		let spy = spyOn(component, 'OnPageChange').and.callThrough();

		component.paginator.pageIndex = 1;
		component.paginator.pageSize = 1;
		paginator.triggerEventHandler('page', component.paginator);
		fixture.detectChanges();

		expect(spy).toHaveBeenCalled();
		expect(component.allMyReservationsSlice).toHaveSize(0);
	});

	it('should not slice allMyReservations in OnPageChange',  () => {
		const paginator = fixture.debugElement.query(By.css('.paginator'));
		let spy = spyOn(component, 'OnPageChange').and.callThrough();

		component.paginator.pageIndex = 0;
		component.paginator.pageSize = 1;
		paginator.triggerEventHandler('page', component.paginator);
		fixture.detectChanges();

		expect(spy).toHaveBeenCalled();
		expect(component.allMyReservationsSlice).toHaveSize(1);
	});




});
