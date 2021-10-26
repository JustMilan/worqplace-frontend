import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ReservationService} from "../services/reservation.service";
import {Location} from "../interface/location";
import {Workplace} from "../interface/workplace";
import {Reservation} from "../interface/reservation";
import {LocationService} from "../services/location.service";
import {WorkplaceService} from "../services/workplace.service";

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ReservationPageComponent implements OnInit {
  locations: Location[];
  workplaces: Workplace[];
  reservationType: string[] = ['Ruimte', 'Werkplek'];

  selectedLocationId: number;
  selectedDate: string;
  selectedStartTime: string;
  selectedEndTime: string;
  selectedReservationType: string;

  reservationTypeControl = new FormControl('', Validators.required);
  locationsControl = new FormControl('', Validators.required);
  floatLabelControl = new FormControl('auto');

  constructor(private workplaceService: WorkplaceService, private locationService: LocationService,
              private reservationService: ReservationService) {
  }

  ngOnInit(): void {
    this.getLocations();

  }

  onSelect(event: any) {
    let date = new Date(event);

    let day = ('0' + date.getDate()).slice(-2);
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();

    this.selectedDate = `${year}-${month}-${day}`;

    console.log(this.selectedDate);
  }

  getLocations(): void {
    this.locationService.getLocations()
      .subscribe(locations => {
        this.locations = locations
      },
        error => {
        console.log(error.errorMessage)
        });
  }

  getAvailableWorkplaces(locationId: number, date: string, start: string, end: string): void {
    this.workplaceService.getAvailableWorkplaces(locationId, date, start, end)
      .subscribe(workplaces => this.workplaces = workplaces)
  }

  onSubmit() {
    this.getAvailableWorkplaces(this.selectedLocationId, this.selectedDate, this.selectedStartTime, this.selectedEndTime);
  }

  selectedReservation(workplaceId: number): Reservation {
    return {
      date: this.selectedDate,
      startTime: this.selectedStartTime,
      endTime: this.selectedEndTime,
      employeeId: 1,
      workplaceId: workplaceId
    };
  }

  book(event: Event) {
    const workplaceId: number = JSON.parse(JSON.stringify(event));
    const reservation: Reservation = this.selectedReservation(workplaceId);

    console.log("-----------------------------------------------------------")
    console.log(workplaceId);
    console.log(reservation);
    this.reservationService.reserveWorkplace(reservation).subscribe((data) => {

    });
  }

}
