import {Component, Inject, Input} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ReservationDialogData } from "../interface/ReservationDialogData";

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.css']
})
export class ReservationDialogComponent {
  reservationType = this.data.reservationType;
  repeatOptions: string[] = ['Dagelijks', 'Wekelijks', '2 Wekelijks', 'Maandelijks'];

  selectedRepeat: string;

  constructor(public dialogRef: MatDialogRef<ReservationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ReservationDialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
