import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ReservationDialogData } from "../../../../data/interface/ReservationDialogData";
import { Room } from "../../../../data/interface/Room";

/**
 * The reservation dialog component
 * @property repeatOptions - the hardcoded repeat options string array
 * @property room - the room
 * @property selectedWorkplaceAmount - the selected workplace amount
 * @property selectedRecurringPattern - the selected recurring pattern
 */
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

	/**
	 * Constructor of the DialogComponent component.
	 *
	 * @param dialogRef - The reference to the dialog
	 * @param data - The data from the dialog
	 *
	 * It also sets the room property with the data param
	 */
	constructor(public dialogRef: MatDialogRef<DialogComponent>,
				@Inject(MAT_DIALOG_DATA) public data: ReservationDialogData) {
		this.room = data.room;
	}

	/**
	 * Method to close the dialog
	 */
	onCancel(): void {
		this.dialogRef.close();
	}

	/**
	 * Method to close the dialog. It also gives back a data object from the results of the dialog.
	 */
	confirmBooking() {
		this.dialogRef.close({
			workplaceAmount: this.selectedWorkplaceAmount,
			recurringPattern: this.selectedRecurringPattern != 'Geen' ? this.selectedRecurringPattern : undefined
		});
	}
}
