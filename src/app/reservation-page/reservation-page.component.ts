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
import { Recurrence } from "../interface/Recurrence";

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
    const dialogRef = this.dialog.open(ReservationDialogComponent, {
      width: '500px',
      data: {room: room, reservationType: this.selectedReservationType},
      panelClass: 'reservation-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      // check if the confirmation button is clicked
      if (result != undefined && result.isConfirmation) {

        const recurrence = {
          active: result.recurringPattern != undefined,
          recurrencePattern: result.recurringPattern != undefined? this.convertRecurringPatternToEnumLiteral(result.recurringPattern): null
        }

        console.log(recurrence.active + " active");
        console.log(recurrence.recurrencePattern + " recurrence");

        if (this.selectedReservationType == 'Ruimte') {
          this.reservationService.reserveRoom(this.selectedRoomReservation(room, recurrence)).subscribe(data => {
            this.getAvailableRooms(this.selectedLocationId, this.selectedDate, this.selectedStartTime, this.selectedEndTime);
          });
        }

        if (this.selectedReservationType == 'Werkplek') {
          this.reservationService.reserveWorkplace(this.selectedWorkplacesReservation(room, result.workplaceAmount, recurrence)).subscribe(data => {
            this.getAvailableWorkplacesInRooms(this.selectedLocationId, this.selectedDate, this.selectedStartTime, this.selectedEndTime);
          })
        }
      }
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
    this.roomService.getAvailableFullRooms(locationId, date, start, end)
      .subscribe(rooms => {
        this.rooms = rooms
        this.errorMessage = "";
      }, error => {
        if (error.status == 422) {
          this.errorMessage = error.error;
        }
      })
  }

  getAvailableWorkplacesInRooms(locationId: number, date: string, start: string, end: string): void {
    this.roomService.getAvailableWorkplacesInRooms(locationId, date, start, end)
      .subscribe(rooms => {
        this.rooms = rooms
        this.errorMessage = "";
      }, error => {
        if (error.status == 422) {
          this.errorMessage = error.error;
        }
      })
  }

  checkAvailability(type: string): void {
    switch (type) {
      case 'Ruimte':
        this.getAvailableRooms(this.selectedLocationId, this.selectedDate, this.selectedStartTime, this.selectedEndTime);
        break
      case 'Werkplek':
        this.getAvailableWorkplacesInRooms(this.selectedLocationId, this.selectedDate, this.selectedStartTime, this.selectedEndTime);
        break
    }

    this.errorMessage = '';
  }

  onSubmit() {
    if (this.selectedLocationId == undefined || this.selectedDate == undefined ||
      this.selectedStartTime == undefined || this.selectedEndTime == undefined || this.selectedReservationType == undefined) {
      this.errorMessage = "Niet alle velden zijn ingevuld!";
    }

    this.checkAvailability(this.selectedReservationType);
  }

  selectedRoomReservation(room: Room, roomRecurrence: Recurrence): Reservation {
    return {
      date: this.selectedDate,
      startTime: this.selectedStartTime,
      endTime: this.selectedEndTime,
      employeeId: 1,
      roomId: room.id,
      recurrence: roomRecurrence
    };
  }

  selectedWorkplacesReservation(room: Room, workplaceAmount: number, roomRecurrence: Recurrence): Reservation {
    return {
      date: this.selectedDate,
      startTime: this.selectedStartTime,
      endTime: this.selectedEndTime,
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
