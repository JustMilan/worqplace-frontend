import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "../../../../shared/material.module";

describe('ReservationFormComponent', () => {
	let component: FormComponent;
	let fixture: ComponentFixture<FormComponent>;
	let formElement: any;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [MaterialModule, BrowserAnimationsModule],
			declarations: [FormComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(FormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		formElement = fixture.debugElement.nativeElement.querySelector('#reservationsForm');
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render the mat-stepper', () => {
		const stepper = formElement.querySelectorAll('mat-stepper');

		expect(stepper.length).toEqual(1);
	});

	it('should have a stepper with in total 5 input fields', () => {
		const selectElements = formElement.querySelectorAll('mat-select');
		const inputElements = formElement.querySelectorAll('input');
		const calendarElements = formElement.querySelectorAll('mat-calendar');

		expect(selectElements.length).toEqual(2);
		expect(inputElements.length).toEqual(2);
		expect(calendarElements.length).toEqual(1);
	});

	it('should have the correct form values in the stepper', () => {
		const reservationFormGroup = component.reservationForm;
		const reservationFormValues = {
			locationDetails: {
				locationFormCtrl: ''
			}, dateDetails: {
				dateFormCtrl: ''
			},
			timeDetails: {
				startTimeFormCtrl: '',
				endTimeFormCtrl: ''
			}, typeDetails: {
				typeFormCtrl: ''}
		};

		expect(reservationFormGroup.value).toEqual(reservationFormValues);
	});

	it('should convert the date from the mat-calendar to the correct time format', () => {
		const event = new Date('Fri Nov 26 2021 00:00:00 GMT+0100 (Midden-Europese standaardtijd)');
		const correctDateFormat = '2021-11-26';

		component.onSelect(event);

		expect(component.selectedDate).toEqual(correctDateFormat);

	});

	it('should submit the correct form data', fakeAsync(() => {
		const locationSelect = formElement.querySelector('#locationSelect');
		const dateSelect = new Date('Fri Nov 26 2021 00:00:00 GMT+0100 (Midden-Europese standaardtijd)');
		const startTimeSelect = formElement.querySelector('#startTimeSelect');
		const endTimeSelect = formElement.querySelector('#endTimeSelect');
		const typeSelect = formElement.querySelector('#typeSelect');

		locationSelect.value = 'Quintor Amersfoort';
		component.onSelect(dateSelect);
		startTimeSelect.value = '10:00';
		endTimeSelect.value = '12:00';
		typeSelect.value = 'Ruimte';

		fixture.detectChanges();
		component.onSubmit();

		fixture.whenStable().then(() => {
			expect(locationSelect.value).toEqual(component.reservationForm.get('locationDetails')!.get('locationFormCtrl')!.value);
			expect(component.selectedDate).toEqual('2021-11-26');
			expect(startTimeSelect.value).toEqual(component.reservationForm.get('timeDetails')!.get('startTimeFormCtrl')!.value);
			expect(endTimeSelect.value).toEqual(component.reservationForm.get('timeDetails')!.get('endTimeFormCtrl')!.value);
			expect(typeSelect.value).toEqual(component.reservationForm.get('typeDetails')!.get('typeFormCtrl')!.value);
		})
	}));

});
