import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LocationEnum} from "../locationEnum";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ReservationPageComponent implements OnInit {
  locations: LocationEnum[] = [LocationEnum.Groningen, LocationEnum["Den Haag"], LocationEnum.Amersfoort, LocationEnum["'s-Hertogenbosch"]]
  minDate
    :
    Date = new Date()
  selectedDate = new Date(this.minDate);
  maxDate = new Date(new Date().setDate(new Date().getDay() + 14));
  DayAndDate: string | null = null;

  locationsControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);

  constructor() {
  }

  ngOnInit(): void {
    this.onSelect(this.selectedDate);
  }

  onSelect(event: any) {
    this.selectedDate = event;
    const dateString = event.toDateString();
    const dateValue = dateString.split(' ');
    this.DayAndDate = dateValue[0] + ',' + ' ' + dateValue[1] + ' ' + dateValue[2];
  }

  myDateFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  onChange() {
  }
}
