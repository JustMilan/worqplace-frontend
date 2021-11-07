import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReservationService } from "../../../data/service/reservation/reservation.service";
import { Location } from "../../../data/interface/Location";
import { Reservation } from "../../../data/interface/Reservation";
import { LocationService } from "../../../data/service/location/location.service";
import { Room } from "../../../data/interface/Room";
import { RoomService } from "../../../data/service/room/room.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../components/dialog/dialog.component";
import { Recurrence } from "../../../data/interface/Recurrence";
import { ReservationResponse } from "../../../data/interface/ReservationResponse";
import { Event } from "@angular/router";

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ReservationComponent implements OnInit {
  locations: Location[];
  rooms: Room[];
  reservationResponse: ReservationResponse;

  message: string;
  colorClass: string;

  constructor(private roomService: RoomService, private locationService: LocationService,
              private reservationService: ReservationService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getLocations();
    console.log(JSON.parse(JSON.stringify(this.locations)));
  }

  convertRecurringPatternToEnumLiteral(recurringPattern: string): string {
    switch (recurringPattern) {
      case 'Dagelijks':
        return 'DAILY';
      case 'Wekelijks':
        return 'WEEKLY';
      case '2 Wekelijks':
        return 'BIWEEKLY';
      case 'Maandelijks':
        return 'MONTHLY';
    }

    return '';
  }

  openDialog(room: Room): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {room: room, reservationType: this.reservationResponse.type},
      panelClass: 'reservation-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      // check if the confirmation button is clicked in dialog
      if (result != undefined) {
        const recurrence = {
          active: result.recurringPattern != undefined,
          recurrencePattern: result.recurringPattern != undefined? this.convertRecurringPatternToEnumLiteral(result.recurringPattern): null
        }

        if (this.reservationResponse.type == 'Ruimte') {
          this.reservationService.reserveRoom(this.selectedRoomReservation(room, recurrence)).subscribe(data => {
            this.getAvailableRooms(this.reservationResponse.locationId, this.reservationResponse.date, this.reservationResponse.time.start, this.reservationResponse.time.end);
          });
        }

        if (this.reservationResponse.type == 'Werkplek') {
          this.reservationService.reserveWorkplace(this.selectedWorkplacesReservation(room, result.workplaceAmount, recurrence)).subscribe(data => {
            this.getAvailableWorkplacesInRooms(this.reservationResponse.locationId, this.reservationResponse.date, this.reservationResponse.time.start, this.reservationResponse.time.end);
          })
        }

        this.message = 'The reservation is confirmed';
        this.colorClass= 'success';
      }
    });
  }

  getLocations(): void {
    this.locationService.getLocations()
      .subscribe(locations => {
          this.locations = locations
        });
  }

  getAvailableRooms(locationId: number, date: string, start: string, end: string): void {
    this.roomService.getAvailableFullRooms(locationId, date, start, end)
      .subscribe(rooms => {
        this.rooms = rooms
        this.message = "";
        this.colorClass ="";

        if (this.rooms.length == 0) {
          this.message = "There are no rooms available";
          this.colorClass = 'warning';
        }
      }, error => {
        if (error.status == 422) {
          this.message = error.error;
          this.colorClass = 'error';
        }
      })
  }

  getAvailableWorkplacesInRooms(locationId: number, date: string, start: string, end: string): void {
    this.roomService.getAvailableWorkplacesInRooms(locationId, date, start, end)
      .subscribe(rooms => {
        this.rooms = rooms
        this.message = "";
        this.colorClass ="";

        if (this.rooms.length == 0) {
          this.message = "There are no rooms available";
          this.colorClass = 'warning';
        }
      }, error => {
        if (error.status == 422) {
          this.message = error.error;
          this.colorClass = 'error';
        }
      })
  }

  checkAvailability(reservationResponse: ReservationResponse): void {
    switch (reservationResponse.type) {
      case 'Ruimte':
        this.getAvailableRooms(reservationResponse.locationId, reservationResponse.date, reservationResponse.time.start, reservationResponse.time.end);
        break
      case 'Werkplek':
        this.getAvailableWorkplacesInRooms(reservationResponse.locationId, reservationResponse.date, reservationResponse.time.start, reservationResponse.time.end);
        break
    }

    this.message = '';
  }

  onSubmit(reservationResponse: ReservationResponse) {
    this.reservationResponse = reservationResponse;

    if (reservationResponse.locationId == undefined || reservationResponse.date == undefined ||
      reservationResponse.time.start == undefined || reservationResponse.time.end == undefined || reservationResponse.type == undefined) {
      this.message = "Niet alle velden zijn ingevuld!";
    }

    this.checkAvailability(reservationResponse);
  }

  selectedRoomReservation(room: Room, roomRecurrence: Recurrence): Reservation {
    return {
      date: this.reservationResponse.date,
      startTime: this.reservationResponse.time.start,
      endTime: this.reservationResponse.time.end,
      employeeId: 1,
      roomId: room.id,
      recurrence: roomRecurrence
    };
  }

  selectedWorkplacesReservation(room: Room, workplaceAmount: number, roomRecurrence: Recurrence): Reservation {
    return {
      date: this.reservationResponse.date,
      startTime: this.reservationResponse.time.start,
      endTime: this.reservationResponse.time.end,
      employeeId: 1,
      roomId: room.id,
      workplaceAmount: workplaceAmount,
      recurrence: roomRecurrence
    };
  }

  book(event: Event) {
      const room: Room = JSON.parse(JSON.stringify(event));

      this.openDialog(room);
  }

}
