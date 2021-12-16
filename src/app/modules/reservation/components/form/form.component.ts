import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Location } from "../../../../data/interface/Location";
import { ReservationResponse } from "../../../../data/interface/ReservationResponse";

/**
 * The reservation form component
 * @property reservationForm - the formgroup for a reservation
 * @property submit - a submit event emitter
 * @property locations - the locations array
 * @property reservationType - the hardcoded reservation types
 * @property minDate - the minimum date
 * @property selectedDate - the selected date
 * @property reservationTypeControl - the reservation type form control
 * @property locationsControl - the location form control
 * @property floatLabelControl - the float label form control
 */
@Component({
	selector: 'app-reservation-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
	reservationForm: FormGroup;

	@Output() submit = new EventEmitter();
	@Input() locations: Location[];

	reservationType: string[] = ['Ruimte', 'Werkplek'];
	minDate: Date = new Date(Date.now());
	selectedDate: string;

	reservationTypeControl = new FormControl('', Validators.required);
	locationsControl = new FormControl('', Validators.required);
	floatLabelControl = new FormControl('auto');

	constructor() {
	}

	/**
	 * Initializes the reservation form group with multiple form groups.
	 */
	ngOnInit(): void {
		this.reservationForm = new FormGroup({
			'locationDetails': new FormGroup({
				'locationFormCtrl': new FormControl('', Validators.required)
			}),
			'dateDetails': new FormGroup({
				'dateFormCtrl': new FormControl('', Validators.required)
			}),
			'timeDetails': new FormGroup({
				'startTimeFormCtrl': new FormControl('', Validators.required),
				'endTimeFormCtrl': new FormControl('', Validators.required)
			}),
			'typeDetails': new FormGroup({
				'typeFormCtrl': new FormControl('', Validators.required)
			})
		});
	}

	/**
	 * Converts a date object from the event to the date format YYYY/MM/DD and sets the selectedDate property
	 *
	 * @param event - the date event from the calendar
	 */
	onSelect(event: any) {
		let date = new Date(event);

		let day = ('0' + date.getDate()).slice(-2);
		let month = ('0' + (date.getMonth() + 1)).slice(-2);
		let year = date.getFullYear();

		this.selectedDate = `${year}-${month}-${day}`;
	}

	/**
	 * Emits the reservations form data to the submit event emitter
	 */
	onSubmit() {
		const reservation: ReservationResponse = {
			locationId: this.reservationForm.get('locationDetails')!.get('locationFormCtrl')!.value,
			date: this.selectedDate,
			time: {
				start: this.reservationForm.get('timeDetails')!.get('startTimeFormCtrl')!.value,
				end: this.reservationForm.get('timeDetails')!.get('endTimeFormCtrl')!.value
			},
			type: this.reservationForm.get('typeDetails')!.get('typeFormCtrl')!.value
		}

		this.submit.emit(reservation);
	}
}
