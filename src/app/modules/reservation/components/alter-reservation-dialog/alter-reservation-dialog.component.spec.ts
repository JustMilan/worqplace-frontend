import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterReservationDialogComponent } from './alter-reservation-dialog.component';
import { Reservation } from "../../../../data/interface/Reservation";
import { SharedModule } from "../../../../shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

describe('AlterReservationDialogComponent', () => {
		let component: AlterReservationDialogComponent;
		let fixture: ComponentFixture<AlterReservationDialogComponent>;
		let reservation: Reservation = {
			id: 1,
			date: '2023-12-12',
			startTime: '12:00:00',
			endTime: '13:00:00',
			roomId: 1,
			workplaceAmount: 2,
			recurrence: {
				active: false,
				recurrencePattern: 'NONE'
			}
		};

		const dialogMock = {
			close: () => {
			}
		};

		beforeEach(() => {
			TestBed.configureTestingModule({
				imports: [SharedModule, BrowserAnimationsModule],
				declarations: [AlterReservationDialogComponent],
				providers: [
					{provide: MatDialogRef, useValue: dialogMock},
					{provide: MAT_DIALOG_DATA, useValue: {reservation}}
				]
			})
				.compileComponents();
		});

		beforeEach(() => {
			fixture = TestBed.createComponent(AlterReservationDialogComponent);
			component = fixture.componentInstance;
			fixture.detectChanges();
		});

		it('should create', () => {
			expect(component).toBeTruthy();
		});

		it('should call onCancel method when cancel button is clicked', () => {
			spyOn(component, 'onCancel');

			fixture.detectChanges();

			const button = fixture.debugElement.nativeElement.querySelector('#cancelButton');
			button.click();

			expect(component.onCancel).toHaveBeenCalled();
		});

		it('should call confirm method when confirm button is clicked', () => {
			spyOn(component, 'confirm');

			fixture.detectChanges();

			const button = fixture.debugElement.nativeElement.querySelector('#confirmButton');
			button.click();

			expect(component.confirm).toHaveBeenCalled();
		});

		it('should close alter-reservation-dialog after onCancel()', () => {
			let spy = spyOn(component.dialogRef, 'close').and.callThrough();

			component.onCancel();

			expect(spy).toHaveBeenCalled();
		});

		it('should close alter-reservation-dialog after confirm()', () => {
			let spy = spyOn(component.dialogRef, 'close').and.callThrough();

			component.confirm();

			expect(spy).toHaveBeenCalled();
		});

		it('should close reservation-dialog with correct repeatOptions after confirm()', () => {
			let spy = spyOn(component.dialogRef, 'close').and.callThrough();

			component.selectedRecurrencePattern = 'Wekelijks';
			component.confirm();

			expect(spy).toHaveBeenCalled();
		});

		it('should translate recurrence correctly - Weekly', () => {
			reservation = {
				id: 1,
				date: '2023-12-12',
				startTime: '12:00:00',
				endTime: '13:00:00',
				roomId: 1,
				workplaceAmount: 2,
				recurrence: {
					active: false,
					recurrencePattern: 'WEEKLY'
				}
			};

			component.processIncomingData(reservation);

			expect(component.selectedRecurrencePattern).toEqual('Wekelijks');
		});

		it('should translate recurrence correctly - Daily', () => {
			reservation = {
				id: 1,
				date: '2023-12-12',
				startTime: '12:00:00',
				endTime: '13:00:00',
				roomId: 1,
				workplaceAmount: 2,
				recurrence: {
					active: false,
					recurrencePattern: 'DAILY'
				}
			};

			component.processIncomingData(reservation);

			expect(component.selectedRecurrencePattern).toEqual('Dagelijks')
		});

		it('should translate recurrence correctly - Biweekly', () => {
			reservation = {
				id: 1,
				date: '2023-12-12',
				startTime: '12:00:00',
				endTime: '13:00:00',
				roomId: 1,
				workplaceAmount: 2,
				recurrence: {
					active: false,
					recurrencePattern: 'BIWEEKLY'
				}
			};

			component.processIncomingData(reservation);

			expect(component.selectedRecurrencePattern).toEqual('2 Wekelijks');
		});

		it('should translate recurrence correctly - Monthly', () => {
			reservation = {
				id: 1,
				date: '2023-12-12',
				startTime: '12:00:00',
				endTime: '13:00:00',
				roomId: 1,
				workplaceAmount: 2,
				recurrence: {
					active: false,
					recurrencePattern: 'MONTHLY'
				}
			};

			component.processIncomingData(reservation);

			expect(component.selectedRecurrencePattern).toEqual('Maandelijks');
		});

		it('should translate recurrence correctly  - Geberish', () => {
			reservation = {
				id: 1,
				date: '2023-12-12',
				startTime: '12:00:00',
				endTime: '13:00:00',
				roomId: 1,
				workplaceAmount: 2,
				recurrence: {
					active: false,
					recurrencePattern: 'SOMETHING'
				}
			};

			component.processIncomingData(reservation);

			expect(component.selectedRecurrencePattern).toEqual('');
		});

		it('should alter date correctly', () => {
			let alteredDate: Date = new Date(new Date(2025, 3, 8));
			component.alterDate(alteredDate);
			expect(component.selectedDate).toEqual(alteredDate);
		});

		it('should alter start time correctly', () => {
			component.alterStartTime('03:00:00')
			expect(component.selectedStartTime).toEqual('03:00:00');
		});

		it('should alter end time correctly', () => {
			component.alterEndTime('23:00:00')
			expect(component.selectedEndTime).toEqual('23:00:00');
		});

		it('should alter recurrence pattern time correctly - Geen', () => {
			component.alterRecurrence({value: component.repeatOptions[0]});
			expect(component.selectedRecurrencePattern).toEqual('Geen');
		});

		it('should alter recurrence pattern time correctly - Dagelijks', () => {
			component.alterRecurrence({value: component.repeatOptions[1]});
			expect(component.selectedRecurrencePattern).toEqual('Dagelijks');
		});

		it('should alter recurrence pattern time correctly - Wekelijks', () => {
			component.alterRecurrence({value: component.repeatOptions[2]});
			expect(component.selectedRecurrencePattern).toEqual('Wekelijks');
		});

		it('should alter recurrence pattern time correctly - 2 Wekelijks', () => {
			component.alterRecurrence({value: component.repeatOptions[3]});
			expect(component.selectedRecurrencePattern).toEqual('2 Wekelijks');
		});

		it('should alter recurrence pattern time correctly - Maandelijks', () => {
			component.alterRecurrence({value: component.repeatOptions[4]});
			expect(component.selectedRecurrencePattern).toEqual('Maandelijks');
		});

		it('should get translated recurrence correctly - Geen', () => {
			reservation = {
				id: 1,
				date: '2023-12-12',
				startTime: '12:00:00',
				endTime: '13:00:00',
				roomId: 1,
				workplaceAmount: 2,
				recurrence: {
					active: false,
					recurrencePattern: 'NONE'
				}
			};

			component.processIncomingData(reservation);
			component.confirm();

			expect(component.getTranslatedRecurrence()).toEqual('NONE');
		});

	it('should get translated recurrence correctly - Geen', () => {
		reservation = {
			id: 1,
			date: '2023-12-12',
			startTime: '12:00:00',
			endTime: '13:00:00',
			roomId: 1,
			workplaceAmount: 2,
			recurrence: {
				active: false,
				recurrencePattern: 'NONE'
			}
		};

		component.processIncomingData(reservation);
		component.confirm();

		expect(component.getTranslatedRecurrence()).toEqual('NONE');
	});

	it('should get translated recurrence correctly - Dagelijks', () => {
		reservation = {
			id: 1,
			date: '2023-12-12',
			startTime: '12:00:00',
			endTime: '13:00:00',
			roomId: 1,
			workplaceAmount: 2,
			recurrence: {
				active: false,
				recurrencePattern: 'DAILY'
			}
		};

		component.processIncomingData(reservation);
		component.confirm();

		expect(component.getTranslatedRecurrence()).toEqual('DAILY');
	});

	it('should get translated recurrence correctly - 2 Wekelijks', () => {
		reservation = {
			id: 1,
			date: '2023-12-12',
			startTime: '12:00:00',
			endTime: '13:00:00',
			roomId: 1,
			workplaceAmount: 2,
			recurrence: {
				active: false,
				recurrencePattern: 'BIWEEKLY'
			}
		};

		component.processIncomingData(reservation);
		component.confirm();

		expect(component.getTranslatedRecurrence()).toEqual('BIWEEKLY');
	});

	it('should get translated recurrence correctly - Maandelijks', () => {
		reservation = {
			id: 1,
			date: '2023-12-12',
			startTime: '12:00:00',
			endTime: '13:00:00',
			roomId: 1,
			workplaceAmount: 2,
			recurrence: {
				active: false,
				recurrencePattern: 'MONTHLY'
			}
		};

		component.processIncomingData(reservation);
		component.confirm();

		expect(component.getTranslatedRecurrence()).toEqual('MONTHLY');
	});

	it('should get translated recurrence correctly - Maandelijks', () => {
		reservation = {
			id: 1,
			date: '2023-12-12',
			startTime: '12:00:00',
			endTime: '13:00:00',
			roomId: 1,
			workplaceAmount: 2,
			recurrence: {
				active: false,
				recurrencePattern: 'SpellingMistakes'
			}
		};

		component.processIncomingData(reservation);
		component.confirm();

		expect(component.getTranslatedRecurrence()).toEqual('ERROR in getTranslatedRecurrence');
	});
	}
);
