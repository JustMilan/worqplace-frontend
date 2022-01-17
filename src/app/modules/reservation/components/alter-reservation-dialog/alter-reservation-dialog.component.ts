import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Reservation} from "../../../../data/interface/Reservation";

@Component({
	selector: 'app-alter-reservation-dialog',
	templateUrl: './alter-reservation-dialog.component.html',
	styleUrls: ['./alter-reservation-dialog.component.css']
})
export class AlterReservationDialogComponent implements OnInit {
	repeatOptions: string[] = ['Geen', 'Dagelijks', 'Wekelijks', '2 Wekelijks', 'Maandelijks'];
	minDate = new Date();
	processedData: Reservation;

	selectedRecurrencePattern: string;
	selectedDate: Date;
	selectedStartTime: string;
	selectedEndTime: string;

	constructor(public dialogRef: MatDialogRef<AlterReservationDialogComponent>,
				@Inject(MAT_DIALOG_DATA) public incomingData: Reservation, public dialog: MatDialog) {
		this.#processIncomingData(incomingData);
	}

	/**
	 * Method to close the reservation-dialog
	 */
	onCancel(): void {
		this.dialogRef.close();
	}

	ngOnInit(): void {
	}

	/**
	 * Function that makes the incoming data usable.
	 * As it's a object that we receive, if we try to get attributes, it will return undefined.
	 *
	 * @param {Reservation} data {@link Reservation}
	 * @private
	 */
	#processIncomingData(data: Reservation): void {
		let dataString = JSON.stringify(data);
		// data always starts with '{"Reservation":{' and ends with '}' this needs to be stripped
		dataString = dataString.slice(15, -1);

		this.processedData = JSON.parse(dataString);
		this.processedData.recurrence = JSON.parse(JSON.stringify(this.processedData.recurrence));

		this.selectedRecurrencePattern = this.#translateRecurrence();
		this.selectedDate = new Date(Date.parse(this.processedData.date));
		this.selectedStartTime = this.processedData.startTime;
		this.selectedEndTime = this.processedData.endTime;
	}

	#translateRecurrence(): string {
		switch (this.processedData.recurrence.recurrencePattern) {
			case 'NONE':
				return this.repeatOptions[0];
			case 'DAILY':
				return this.repeatOptions[1];
			case 'WEEKLY':
				return this.repeatOptions[2];
			case 'BIWEEKLY':
				return this.repeatOptions[3];
			case 'MONTHLY':
				return this.repeatOptions[4];
			default:
				return '';
		}
	}

	confirm() {
		let recurrencePattern = this.#getTranslatedRecurrence();
		let reservation: Reservation = {
			id: this.processedData.id,
			date: this.selectedDate.toISOString(),
			startTime: this.selectedStartTime,
			endTime: this.selectedEndTime,
			roomId: this.processedData.roomId,
			workplaceAmount: this.processedData.workplaceAmount,
			recurrence: {
				active: this.processedData.recurrence.active,
				recurrencePattern: recurrencePattern
			}
		}

		this.dialogRef.close({
			reservation: reservation,
		});
	}

	alterDate(date: Date) {
		this.selectedDate = date;
	}

	alterStartTime(startTime: string) {
		this.selectedStartTime = startTime;
	}

	alterEndTime(endTime: string) {
		this.selectedEndTime = endTime;
	}

	alterRecurrence(recurrence: any) {
		this.selectedRecurrencePattern = recurrence.value;
	}

	#getTranslatedRecurrence(): string {
		switch (this.selectedRecurrencePattern) {
			case 'Geen':
				return 'NONE';
			case 'Dagelijks':
				return 'DAILY';
			case 'Wekelijks':
				return 'WEEKLY';
			case '2 Wekelijks':
				return 'BIWEEKLY';
			case 'Maandelijks':
				return 'MONTHLY';
		}
		return this.selectedRecurrencePattern;
	}
}
