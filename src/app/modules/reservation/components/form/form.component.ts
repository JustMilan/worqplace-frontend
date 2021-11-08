import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Location } from "../../../../data/interface/Location";
import { ReservationResponse } from "../../../../data/interface/ReservationResponse";

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

	onSelect(event: any) {
		let date = new Date(event);

		let day = ('0' + date.getDate()).slice(-2);
		let month = ('0' + (date.getMonth() + 1)).slice(-2);
		let year = date.getFullYear();

		this.selectedDate = `${year}-${month}-${day}`;
	}

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
