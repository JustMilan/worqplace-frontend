import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "../../../../shared/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('ReservationFormComponent', () => {
	let component: FormComponent;
	let fixture: ComponentFixture<FormComponent>;
	let formElement: any;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [MaterialModule, BrowserAnimationsModule, ReactiveFormsModule, FormsModule],
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

	it('should convert the date from the datepicker to the correct date format', () => {
		const date = new Date('Fri Nov 26 2021 00:00:00 GMT+0100 (Midden-Europese standaardtijd)');
		const correctDateFormat = '2021-11-26';

		expect(component.dateConverter(date)).toEqual(correctDateFormat);

	});

	xit('should submit the correct form data', fakeAsync(() => {
		const date = new Date('Fri Nov 26 2021 00:00:00 GMT+0100 (Midden-Europese standaardtijd)');

		const locationSelect = formElement.querySelector('#location-select');
		const dateSelect = formElement.querySelector('#datepicker-input');
		const startTimeSelect = formElement.querySelector('#start-time-select');
		const endTimeSelect = formElement.querySelector('#end-time-select');
		const typeSelect = formElement.querySelector('#typeSelect');

		locationSelect.setValue('Quintor Amersfoort');
		dateSelect.value = date;
		startTimeSelect.value = '10:00';
		endTimeSelect.value = '12:00';
		typeSelect.value = 'Ruimte';

		component.onSubmit();
		fixture.detectChanges();
		console.log(component.reservationForm.controls['location'].value)

		fixture.whenStable().then(() => {
			expect(locationSelect.value).toEqual(component.reservationForm.controls['location'].value);
			expect(component.dateConverter(date)).toEqual(component.reservationForm.controls['date'].value);
			expect(startTimeSelect.value).toEqual(component.reservationForm.controls['startTime'].value);
			expect(endTimeSelect.value).toEqual(component.reservationForm.controls['endTime'].value);
			expect(typeSelect.value).toEqual(component.reservationForm.get('typeDetails')!.get('typeFormCtrl')!.value);
		})
	}));

	it('should have a form with 5 interaction elements', () => {
		const inputElements = formElement.querySelectorAll('input');
		const selectElements = formElement.querySelectorAll('select');
		const liElements = formElement.querySelectorAll('li');

		expect(inputElements.length).toEqual(3);
		expect(selectElements.length).toEqual(1);
		expect(liElements.length).toEqual(2);
	});

	it('should add active class correctly when type is ruimte', () => {
		const liWorkplace = formElement.querySelector('#Werkplek');
		const liRoom = formElement.querySelector('#Ruimte');

		component.onTypeChange('Ruimte');

		expect(liWorkplace).not.toHaveClass('active');
		expect(liRoom).toHaveClass('active');
	});

	it('should add active class correctly when type is werkplek', () => {
		const liWorkplace = formElement.querySelector('#Werkplek');
		const liRoom = formElement.querySelector('#Ruimte');

		component.onTypeChange('Werkplek');

		expect(liWorkplace).toHaveClass('active');
		expect(liRoom).not.toHaveClass('active');
	});
});
