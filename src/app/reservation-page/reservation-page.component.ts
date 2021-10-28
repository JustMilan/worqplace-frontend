import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { ReservationService } from "../services/reservation.service";
import { Location } from "../interface/location";
import { Workplace } from "../interface/workplace";
import { Reservation } from "../interface/reservation";
import { LocationService } from "../services/location.service";
import { WorkplaceService } from "../services/workplace.service";
import { Room } from "../interface/room";
import { RoomService } from "../services/room.service";

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ReservationPageComponent implements OnInit {
  locations: Location[];
  workplaces: Workplace[];
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

  constructor(private workplaceService: WorkplaceService, private roomService: RoomService,
              private locationService: LocationService, private reservationService: ReservationService) {
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
  }

  getLocations(): void {
    this.locationService.getLocations()
      .subscribe(locations => {
          this.locations = locations
        },
        error => {
          console.log()
        });
  }

  getAvailableWorkplaces(locationId: number, date: string, start: string, end: string): void {
    this.workplaceService.getAvailableWorkplaces(locationId, date, start, end)
      .subscribe(workplaces => {
        this.workplaces = workplaces
        this.errorMessage = "";
      }, error => {
        if (error.status == 422) {
          this.errorMessage = error.error;
        }
      })
  }

  getAvailableRooms(locationId: number, date: string, start: string, end: string): void {
    this.roomService.getAvailableRooms(locationId, date, start, end)
      .subscribe(rooms => {
        this.rooms = rooms
        this.errorMessage = "";
      }, error => {
        if (error.status == 422) {
          this.errorMessage = error.error;
        }
      })
  }

  onSubmit() {
    if (this.selectedLocationId == undefined || this.selectedDate == undefined ||
      this.selectedStartTime == undefined || this.selectedEndTime == undefined || this.selectedReservationType == undefined) {
      this.errorMessage = "Niet alle velden zijn ingevuld!";
    }

    if (this.selectedReservationType === 'Ruimte') {
      this.workplaces = [];
      this.getAvailableRooms(this.selectedLocationId, this.selectedDate, this.selectedStartTime, this.selectedEndTime);
      this.errorMessage = "";
    }
    if (this.selectedReservationType === 'Werkplek') {
      this.rooms = [];
      this.getAvailableWorkplaces(this.selectedLocationId, this.selectedDate, this.selectedStartTime, this.selectedEndTime);
      this.errorMessage = "";
    }
  }

  selectedWorkplaceReservation(workplace: Workplace): Reservation {
    return {
      date: this.selectedDate,
      startTime: this.selectedStartTime,
      endTime: this.selectedEndTime,
      employeeId: 1,
      workplaceId: workplace.id,
      recurring: (<HTMLInputElement> document.getElementById('check-' + workplace.id)).checked
    };
  }

  selectedRoomReservation(room: Room): Reservation {
    return {
      date: this.selectedDate,
      startTime: this.selectedStartTime,
      endTime: this.selectedEndTime,
      employeeId: 1,
      roomId: room.id,
      recurring: (<HTMLInputElement> document.getElementById('check-' + room.id)).checked
    };
  }

  book(event: Event) {

    if (this.selectedReservationType === "Ruimte") {
      const room: Room = JSON.parse(JSON.stringify(event));
      const reservation = this.selectedRoomReservation(room);

      this.reservationService.reserveRoom(reservation).subscribe(data => {
        window.alert("reservering voor een ruimte is geboekt!")
        this.getAvailableRooms(this.selectedLocationId, this.selectedDate, this.selectedStartTime, this.selectedEndTime);
      });
    } else {
      const workplace: Workplace = JSON.parse(JSON.stringify(event));
      const reservation: Reservation = this.selectedWorkplaceReservation(workplace);

      this.reservationService.reserveWorkplace(reservation).subscribe(data => {
        window.alert("reservering voor een werkplek is geboekt!")
        this.getAvailableWorkplaces(this.selectedLocationId, this.selectedDate, this.selectedStartTime, this.selectedEndTime);
      });
    }
  }

}
