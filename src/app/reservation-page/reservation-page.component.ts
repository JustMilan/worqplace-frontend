import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ReservationService } from "../services/reservation.service";
import { Location } from "../interface/location";
import { Workplace } from "../interface/workplace";
import { LocationService } from "../services/location.service";
import { WorkplaceService } from "../services/workplace.service";

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
      });
  }

  getAvailableWorkplaces(locationId: number, date: string, start: string, end: string): void {
    this.workplaceService.getAvailableWorkplaces(locationId, date, start, end)
      .subscribe(workplaces => this.workplaces = workplaces)
  }

  onSubmit() {
    this.getAvailableWorkplaces(this.selectedLocationId, this.selectedDate, this.selectedStartTime, this.selectedEndTime);
  }

  book(event: Event) {
    let workplace: Workplace = JSON.parse(JSON.stringify(event));
    this.reservationService.reserve(workplace).subscribe((data) => {
      data.successful ? window.alert("Reservation was succesful") : window.alert("Reservation was not succesful")
      this.getAvailableWorkplaces(this.selectedLocationId, this.selectedDate, this.selectedStartTime, this.selectedEndTime);
      window.location.reload(true);
    });
  }

}
