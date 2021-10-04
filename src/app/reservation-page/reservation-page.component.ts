import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LocationEnum} from "../locationEnum";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ReservationPageComponent implements OnInit {
  locations: LocationEnum[] = [LocationEnum.Groningen, LocationEnum["Den Haag"]]
  minDate: Date = new Date()

  constructor() {
  }

  ngOnInit(): void {
  }

  onChange() {
    //TODO: implement onchange listener. Every time a form parameter changes search results must be updated
  }
}
