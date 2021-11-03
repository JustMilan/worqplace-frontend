import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ReservationDialogData } from "../interface/ReservationDialogData";
import { Room } from "../interface/Room";

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.css']
})
export class ReservationDialogComponent {
  repeatOptions: string[] = ['Dagelijks', 'Wekelijks', '2 Wekelijks', 'Maandelijks'];
  room: Room;

  selectedWorkplaceAmount: number;
  selectedRecurringPattern: string;

  constructor(public dialogRef: MatDialogRef<ReservationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ReservationDialogData) {
    this.room = data.room;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmBooking() {
    this.dialogRef.close({
      isConfirmation: true,
      workplaceAmount: this.selectedWorkplaceAmount,
      recurringPattern: this.selectedRecurringPattern
    });
  }
}
