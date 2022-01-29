import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Event } from "@angular/router";
import { Location } from "../../../data/interface/Location";
import { Recurrence } from "../../../data/interface/Recurrence";
import { Reservation } from "../../../data/interface/Reservation";
import { ReservationResponse } from "../../../data/interface/ReservationResponse";
import { Room } from "../../../data/interface/Room";
import { LocationService } from "../../../data/service/location/location.service";
import { ReservationService } from "../../../data/service/reservation/reservation.service";
import { RoomService } from "../../../data/service/room/room.service";
import { NotificationService } from "../../../shared/service/notification.service";
import { Subscription } from "rxjs";
import { UiService } from "../service/ui.service";

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
	 * @param dialog - The reservation-dialog from angular material reservation-dialog
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
	 * @param recurrence - the recurrence
	 */
	getAvailableRooms(locationId: number, date: string, start: string, end: string, recurrence: Recurrence): void {
		this.roomService.getAvailableFullRooms(locationId, date, start, end, recurrence.recurrencePattern)
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
	 * @param amount - the amount
	 * @param recurrence - the recurrence
	 */
	getAvailableWorkplacesInRooms(locationId: number, date: string, start: string, end: string, amount: number,
								  recurrence: Recurrence): void {
		this.roomService.getAvailableWorkplacesInRooms(locationId, date, start, end, amount, recurrence.recurrencePattern)
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
				this.getAvailableRooms(
					reservationResponse.locationId, reservationResponse.date,
					reservationResponse.time.start, reservationResponse.time.end,
					reservationResponse.recurrence
				);
				break
			case 'Werkplek':
				this.getAvailableWorkplacesInRooms(
					reservationResponse.locationId, reservationResponse.date,
					reservationResponse.time.start, reservationResponse.time.end,
					reservationResponse.amount, reservationResponse.recurrence
				);
				break
		}
	}

	/**
	 * Method that tries to reserve a room
	 *
	 * @param roomReservation - the reservation for the room
	 */
	reserveRoom(roomReservation: Reservation): void {
		this.reservationService.reserveRoom(roomReservation).subscribe(() => {
			this.rooms = this.rooms.filter(r => roomReservation.roomId !== r.id);
		});
	}

	/**
	 * Method that tries to reserve a workplace
	 *
	 * @param workplaceReservation - the reservation for the workplace
	 * @param room - the room to reserve
	 */
	reserveWorkplace(workplaceReservation: Reservation, room: Room) {
		this.reservationService.reserveWorkplace(workplaceReservation).subscribe(() => {
			const index = this.rooms.findIndex(r => room.id == r.id);

			this.rooms = this.rooms.filter(r => room.id !== r.id);

			// create new room object
			const newRoom: Room = {
				id: room.id,
				floor: room.floor,
				capacity: room.capacity,
				available: room.available -= workplaceReservation.workplaceAmount!
			};

			// check if room has enough workplaces
			if (newRoom.available > 0)
				this.rooms.splice(index, 0, newRoom); // add it to the exact position of the array
		});
	}


	/**
	 * Method that validates and handles the reservation response from the reservation form and checks the availability
	 * of the room or workplaces
	 *
	 * @param reservationResponse - the reservation response
	 */
	onSubmit(reservationResponse: ReservationResponse) {
		this.reservationResponse = reservationResponse;

		// Check if the fields have a falsy value (so null, undefined, NaN, empty, 0, false)
		if (!(reservationResponse.locationId && reservationResponse.date &&
			reservationResponse.time.start && reservationResponse.time.end && reservationResponse.type)) {

			this.notificationService.handleError("Niet alle velden zijn ingevuld!");
			return;
		}

		switch (reservationResponse.type) {
			case 'Ruimte':
				if (reservationResponse.recurrence.active && reservationResponse.recurrence.recurrencePattern === 'NONE') {
					this.notificationService.handleError("Niet alle velden zijn ingevuld!");
					return;
				}
				break;
			case 'Werkplek':
				if ((reservationResponse.recurrence.active && reservationResponse.recurrence.recurrencePattern === 'NONE')
					|| (!reservationResponse.amount)) {
					this.notificationService.handleError("Niet alle velden zijn ingevuld!");
					return;
				}
				break;
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
			employeeId: null,
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
			employeeId: null,
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

		if (this.reservationResponse.type == 'Ruimte') {
			this.reserveRoom(this.selectedRoomReservation(room, this.reservationResponse.recurrence));
		}

		if (this.reservationResponse.type == 'Werkplek') {
			this.reserveWorkplace(this.selectedWorkplacesReservation(room, this.reservationResponse.amount,
				this.reservationResponse.recurrence), room);
		}

		this.notificationService.handleSuccess("The reservation has been placed!");
	}
}
