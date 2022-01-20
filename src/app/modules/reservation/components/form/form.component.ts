import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Location } from "../../../../data/interface/Location";
import { ReservationResponse } from "../../../../data/interface/ReservationResponse";

/**
 * The reservation form component
 * @property reservationForm - the formgroup for a reservation
 * @property submit - a submit event emitter
 * @property locations - the locations array
 * @property reservationType - the hardcoded reservation types
 * @property minDate - the minimum date
 */
@Component({
	selector: 'app-reservation-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
	@Output() submit = new EventEmitter();
	@Input() locations: Location[];

	reservationForm: FormGroup;
	reservationType: string[] = ['Ruimte', 'Werkplek'];
	minDate: Date = new Date(Date.now());

	selectedReservationType: string = 'Ruimte';

	constructor(private fb: FormBuilder) {

	}

	onTypeChange(reservationType: string): void {
		this.selectedReservationType = reservationType;

		document.getElementById(reservationType)!.classList.add('active');

		this.reservationType.forEach(type => {
			if (type !== reservationType) {
				document.getElementById(type)!.classList.remove('active');
			}
		})
	}

	/**
	 * Initializes the reservation form group with multiple form groups.
	 */
	ngOnInit(): void {
		this.reservationForm = this.fb.group({
			type: ['', Validators.required],
			location: ['', Validators.required],
			date: ['', Validators.required],
			startTime: ['', Validators.required],
			endTime: ['', Validators.required]
		});
	}

	/**
	 * Converts a date object to the date format YYYY/MM/DD and returns the converted date
	 *
	 * @param date - the to convert date
	 * @returns - the converted date
	 */
	dateConverter(date: Date): string {
		let day = ('0' + date.getDate()).slice(-2);
		let month = ('0' + (date.getMonth() + 1)).slice(-2);
		let year = date.getFullYear();

		return `${year}-${month}-${day}`;
	}

	/**
	 * Emits the reservations form data to the submit event emitter
	 */
	onSubmit() {
		const reservation: ReservationResponse = {
			locationId: this.reservationForm.value.location,
			date: this.reservationForm.value.date ? this.dateConverter(this.reservationForm.value.date) : undefined!,
			time: {
				start: this.reservationForm.value.startTime,
				end: this.reservationForm.value.endTime
			},
			type: this.selectedReservationType
		}

		this.submit.emit(reservation);
	}
}
