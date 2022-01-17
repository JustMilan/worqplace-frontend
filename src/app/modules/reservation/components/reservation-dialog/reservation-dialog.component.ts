import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ReservationDialogData } from "../../../../data/interface/ReservationDialogData";
import { Room } from "../../../../data/interface/Room";

/**
 * The reservation reservation-dialog component
 * @property repeatOptions - the hardcoded repeat options string array
 * @property room - the room
 * @property selectedWorkplaceAmount - the selected workplace amount
 * @property selectedRecurringPattern - the selected recurring pattern
 */
@Component({
	selector: 'app-reservation-dialog',
	templateUrl: './reservation-dialog.component.html',
	styleUrls: ['./reservation-dialog.component.css']
})
export class ReservationDialogComponent {
	repeatOptions: string[] = ['Geen', 'Dagelijks', 'Wekelijks', '2 Wekelijks', 'Maandelijks'];
	room: Room;

	selectedWorkplaceAmount: number;
	selectedRecurringPattern: string = 'Geen';

	/**
	 * Constructor of the ReservationDialogComponent component.
	 *
	 * @param dialogRef - The reference to the reservation-dialog
	 * @param data - The data from the reservation-dialog
	 *
	 * It also sets the room property with the data param
	 */
	constructor(public dialogRef: MatDialogRef<ReservationDialogComponent>,
				@Inject(MAT_DIALOG_DATA) public data: ReservationDialogData) {
		this.room = data.room;
	}

	/**
	 * Method to close the reservation-dialog
	 */
	onCancel(): void {
		this.dialogRef.close();
	}

	/**
	 * Method to close the reservation-dialog. It also gives back a data object from the results of the reservation-dialog.
	 */
	confirmBooking() {
		this.dialogRef.close({
			workplaceAmount: this.selectedWorkplaceAmount,
			recurringPattern: this.selectedRecurringPattern != 'Geen' ? this.selectedRecurringPattern : undefined
		});
	}
}
