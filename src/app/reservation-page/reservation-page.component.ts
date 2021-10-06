import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ReservationService} from "../reservation.service";
import {Location} from "../interface/location";
import {OpenWorkplace} from "../interface/open-workplace";

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ReservationPageComponent implements OnInit {
  locations: Location[] | null = null;
  minDate: Date = new Date();
  selectedDate = new Date(this.minDate);
  maxDate = new Date(new Date().setDate(new Date().getDay() + 14));
  DayAndDate: string | null = null;
  openWorkplaces: OpenWorkplace[] | null = null;

  locationsControl = new FormControl('', Validators.required);

  constructor(private reservationService: ReservationService) {
  }

  ngOnInit(): void {
    this.onSelect(this.selectedDate);
    this.getLocations();
    this.getOpenReservations();
  }

  onSelect(event: any) {
    this.selectedDate = event;
    const dateString = event.toDateString();
    const dateValue = dateString.split(' ');
    this.DayAndDate = dateValue[0] + ',' + ' ' + dateValue[1] + ' ' + dateValue[2];
  }

  dateFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  getLocations() {
    this.reservationService.getLocations()
      .subscribe(locations => {
        this.locations = locations
      });
  }

  getOpenReservations() {
    this.reservationService.getAllAvailableWorkplaces().subscribe(openReservations => {
      this.openWorkplaces = openReservations;
    })
  }
}
