import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ReservationDialogData } from "../../../../data/interface/ReservationDialogData";
import { Room } from "../../../../data/interface/Room";

@Component({
    selector: 'app-reservation-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
    repeatOptions: string[] = ['Geen', 'Dagelijks', 'Wekelijks', '2 Wekelijks', 'Maandelijks'];
    room: Room;

    selectedWorkplaceAmount: number;
    selectedRecurringPattern: string = 'Geen';

    constructor(public dialogRef: MatDialogRef<DialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: ReservationDialogData) {
        this.room = data.room;
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    confirmBooking() {
        this.dialogRef.close({
            workplaceAmount: this.selectedWorkplaceAmount,
            recurringPattern: this.selectedRecurringPattern != 'Geen' ? this.selectedRecurringPattern : undefined
        });
    }
}
