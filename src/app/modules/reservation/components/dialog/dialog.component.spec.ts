import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import { SharedModule } from "../../../../shared/shared.module";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReservationDialogData } from "../../../../data/interface/ReservationDialogData";
import { Room } from "../../../../data/interface/Room";

describe('ReservationDialogComponent', () => {
	let component: DialogComponent;
	let fixture: ComponentFixture<DialogComponent>;
	let data: ReservationDialogData;

	const dialogMock = {
		close: () => { }
	};

	beforeEach( () => {
		TestBed.configureTestingModule({
			imports: [SharedModule, BrowserAnimationsModule],
			declarations: [DialogComponent],
			providers: [
				{ provide: MatDialogRef, useValue: dialogMock },
				{ provide: MAT_DIALOG_DATA, useValue: { data } }
			]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		const room = {
			id: 1,
			floor: 0,
			capacity: 8,
			available: 8
		};

		data = {
			room: room,
			reservationType: 'Room',
			recurringPattern: 'Geen'
		};
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call onCancel method when cancel button is clicked', () => {
		spyOn(component, 'onCancel');

		fixture.detectChanges();

		const button = fixture.debugElement.nativeElement.querySelector('#cancel-button');
		button.click();

		expect(component.onCancel).toHaveBeenCalled();
	});

	it('should call confirmBooking method when confirm button is clicked', () => {
		spyOn(component, 'confirmBooking');

		fixture.detectChanges();

		const button = fixture.debugElement.nativeElement.querySelector('#confirm-booking');
		button.click();

		expect(component.confirmBooking).toHaveBeenCalled();
	});

	it('should close dialog after onCancel()', () => {
		let spy = spyOn(component.dialogRef, 'close').and.callThrough();

		component.onCancel();

		expect(spy).toHaveBeenCalled();
	});

	it('should close dialog after confirm confirmBooking()', () => {
		let spy = spyOn(component.dialogRef, 'close').and.callThrough();

		component.confirmBooking();

		expect(spy).toHaveBeenCalled();
	});

	it('should close dialog with correct repeatOptions after confirm confirmBooking()', () => {
		let spy = spyOn(component.dialogRef, 'close').and.callThrough();

		component.selectedRecurringPattern = 'Wekelijks';
		component.confirmBooking();

		expect(spy).toHaveBeenCalled();
		expect(component.selectedRecurringPattern).toEqual('Wekelijks');
	});
});
