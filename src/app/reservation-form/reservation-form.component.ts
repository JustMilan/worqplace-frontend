import { Component, OnInit } from '@angular/core';
import { Location } from "../interface/Location";
import { Room } from "../interface/Room";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup;
  locationFormGroup: FormGroup;

  locations: Location[];
  rooms: Room[];
  reservationType: string[] = ['Ruimte', 'Werkplek'];

  minDate: Date = new Date(Date.now());

  selectedLocationId: number;
  selectedDate: string;
  selectedStartTime: string;
  selectedEndTime: string;
  selectedReservationType: string;

  reservationTypeControl = new FormControl('', Validators.required);
  locationsControl = new FormControl('', Validators.required);
  floatLabelControl = new FormControl('auto');

  errorMessage: string;

  constructor() { }

  ngOnInit(): void {
    this.reservationForm = new FormGroup({
      'locationDetails': new FormGroup({
        'locationFormCtrl': new FormControl('', Validators.required),
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

  }

}
