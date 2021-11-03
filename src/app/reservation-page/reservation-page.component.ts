import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { ReservationService } from "../services/reservation.service";
import { Location } from "../interface/Location";
import { Reservation } from "../interface/Reservation";
import { LocationService } from "../services/location.service";
import { Room } from "../interface/Room";
import { RoomService } from "../services/room.service";
import { MatDialog } from "@angular/material/dialog";
import { ReservationDialogComponent } from "../reservation-dialog/reservation-dialog.component";

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ReservationPageComponent implements OnInit {
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

  constructor(private roomService: RoomService, private locationService: LocationService,
              private reservationService: ReservationService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getLocations();
  }

  openDialog(room: Room): void {
    const dialogRef = this.dialog.open(ReservationDialogComponent, {
      width: '500px',
      data: {room: room, reservationType: this.selectedReservationType}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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
        });
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

    this.getAvailableRooms(this.selectedLocationId, this.selectedDate, this.selectedStartTime, this.selectedEndTime);
    this.errorMessage = "";
  }

  selectedRoomReservation(room: Room): Reservation {
    return {
      date: this.selectedDate,
      startTime: this.selectedStartTime,
      endTime: this.selectedEndTime,
      employeeId: 1,
      roomId: room.id
    };
  }

  book(event: Event) {
      const room: Room = JSON.parse(JSON.stringify(event));
      const reservation = this.selectedRoomReservation(room);

      this.openDialog(room);

      /* this.reservationService.reserveRoom(reservation).subscribe(data => {
        window.alert("reservering voor een ruimte is geboekt!")
        this.getAvailableRooms(this.selectedLocationId, this.selectedDate, this.selectedStartTime, this.selectedEndTime);
      }); */
  }

}
