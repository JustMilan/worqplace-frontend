import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Event} from "@angular/router";
import {Location} from "../../../data/interface/Location";
import {Recurrence} from "../../../data/interface/Recurrence";
import {Reservation} from "../../../data/interface/Reservation";
import {ReservationResponse} from "../../../data/interface/ReservationResponse";
import {Room} from "../../../data/interface/Room";
import {LocationService} from "../../../data/service/location/location.service";
import {ReservationService} from "../../../data/service/reservation/reservation.service";
import {RoomService} from "../../../data/service/room/room.service";
import {DialogComponent} from "../components/dialog/dialog.component";
import {NotificationService} from "../../../shared/service/notification.service";
import {Subscription} from "rxjs";
import {UiService} from "../service/ui.service";

/**
 * The reservation page component
 * @property locations - the locations
 * @property rooms - the rooms
 * @property reservationResponse - the reservation response
 * @property showTable - the show table boolean
 * @property subscription - the UI service subscription
 */
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

	showTable: boolean = false;
	subscription: Subscription;

	/**
	 * Constructor of the Reservation page component.
	 *
	 * @param roomService - The room service
	 * @param locationService - The location service
	 * @param reservationService - The reservation service
	 * @param dialog - The dialog from angular material dialog
	 * @param notificationService - The notification service
	 * @param uiService - The ui service
	 *
	 * It also sets the subscription to the value that comes from the UI service on toggle subscription
	 */
	constructor(private roomService: RoomService, private locationService: LocationService,
				private reservationService: ReservationService, public dialog: MatDialog,
				private notificationService: NotificationService, private uiService: UiService) {

		this.subscription = this.uiService.onToggle().subscribe(value => {
			this.showTable = value
		});
	}

	/**
	 * Initializes all the locations
	 */
	ngOnInit(): void {
		this.getLocations();
	}

	/**
	 * Method to toggle my reservations table from the UI service
	 */
	toggleTable() {
		this.uiService.toggleTable();
	}

	/**
	 * Method to convert the recurring pattern string to an enum literal for the http request to the back-end
	 *
	 * @param recurringPattern - the recurring pattern string
	 *
	 * @return - the string enum literal or an empty string if invalid
	 */
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

	/**
	 * Method to open the dialog
	 *
	 * @param room - the room for which the dialog has been opened
	 */
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
					recurrencePattern: result.recurringPattern != undefined ? this.convertRecurringPatternToEnumLiteral(result.recurringPattern) : null
				}

				if (this.reservationResponse.type == 'Ruimte') {
					this.reservationService.reserveRoom(this.selectedRoomReservation(room, recurrence)).subscribe(() => {
						this.rooms = this.rooms.filter(r => room.id !== r.id);
					});
				}

				if (this.reservationResponse.type == 'Werkplek') {
					this.reservationService.reserveWorkplace(this.selectedWorkplacesReservation(room, result.workplaceAmount, recurrence)).subscribe(() => {
						if (result.workplaceAmount <= 0) {
							this.notificationService.handleError("The workplace amount is not valid!");
							return;
						}

						const index = this.rooms.findIndex(r => room.id == r.id);

						this.rooms = this.rooms.filter(r => room.id !== r.id);

						let available = room.available -= result.workplaceAmount;

						// create new room object
						const newRoom: Room = {
							id: room.id,
							floor: room.floor,
							capacity: room.capacity,
							available: available
						};

						// check if room has enough workplaces
						if (newRoom.available > 0)
							this.rooms.splice(index, 0, newRoom); // add it to the exact position of the array
					});
				}

				this.notificationService.handleSuccess("The reservation has been placed!");
			}
		});
	}

	/**
	 * Method get all the locations from the location service
	 */
	getLocations(): void {
		this.locationService.getLocations()
			.subscribe(locations => {
				this.locations = locations
			});
	}

	/**
	 * Method to get all the available rooms
	 *
	 * @param locationId - the location id
	 * @param date - the date
	 * @param start - the start time
	 * @param end - the end time
	 */
	getAvailableRooms(locationId: number, date: string, start: string, end: string): void {
		this.roomService.getAvailableFullRooms(locationId, date, start, end)
			.subscribe(rooms => {
				this.rooms = rooms

				if (this.rooms.length == 0) {
					this.notificationService.handleWarning("There are no rooms available!")
				}
			})
	}

	/**
	 * Method to get all the available workplaces grouped by room
	 *
	 * @param locationId - the location id
	 * @param date - the date
	 * @param start - the start time
	 * @param end - the end time
	 */
	getAvailableWorkplacesInRooms(locationId: number, date: string, start: string, end: string): void {
		this.roomService.getAvailableWorkplacesInRooms(locationId, date, start, end)
			.subscribe(rooms => {
				this.rooms = rooms

				if (this.rooms.length == 0) {
					this.notificationService.handleWarning("There are no workplaces available!")
				}
			})
	}

	/**
	 * Method to check the room or workplace availability
	 *
	 * @param reservationResponse - the reservation response
	 */
	checkAvailability(reservationResponse: ReservationResponse): void {
		switch (reservationResponse.type) {
			case 'Ruimte':
				this.getAvailableRooms(reservationResponse.locationId, reservationResponse.date, reservationResponse.time.start, reservationResponse.time.end);
				break
			case 'Werkplek':
				this.getAvailableWorkplacesInRooms(reservationResponse.locationId, reservationResponse.date, reservationResponse.time.start, reservationResponse.time.end);
				break
		}

	}

	/**
	 * Method that validates and handles the reservation response from the reservation form and checks the availability
	 * of the room or workplaces
	 *
	 * @param reservationResponse - the reservation response
	 */
	onSubmit(reservationResponse: ReservationResponse) {
		this.reservationResponse = reservationResponse;

		if (reservationResponse.locationId == undefined || reservationResponse.date == undefined ||
			reservationResponse.time.start == undefined || reservationResponse.time.end == undefined ||
			reservationResponse.type == undefined) {
			this.notificationService.handleError("Niet alle velden zijn ingevuld!");
			return;
		}

		this.checkAvailability(reservationResponse);
	}

	/**
	 * Method that creates a room reservation object
	 *
	 * @param room - the room
	 * @param roomRecurrence - the room recurrence
	 *
	 * @return - the room reservation object
	 */
	selectedRoomReservation(room: Room, roomRecurrence: Recurrence): Reservation {
		return {
			date: this.reservationResponse.date,
			startTime: this.reservationResponse.time.start,
			endTime: this.reservationResponse.time.end,
			// employeeId: 1,
			roomId: room.id,
			recurrence: roomRecurrence
		};
	}

	/**
	 * Method that creates a workplace reservation object
	 *
	 * @param room - the room
	 * @param workplaceAmount - the to be reserved workplaces
	 * @param roomRecurrence - the room recurrence
	 *
	 * @return - the room workplace object
	 */
	selectedWorkplacesReservation(room: Room, workplaceAmount: number, roomRecurrence: Recurrence): Reservation {
		return {
			date: this.reservationResponse.date,
			startTime: this.reservationResponse.time.start,
			endTime: this.reservationResponse.time.end,
			roomId: room.id,
			workplaceAmount: workplaceAmount,
			recurrence: roomRecurrence
		};
	}

	/**
	 * Method that parses the event to a room object and opens the dialog
	 *
	 * @param event - the event with a room object in it
	 */
	book(event: Event) {
		const room: Room = JSON.parse(JSON.stringify(event));

		this.openDialog(room);
	}
}
