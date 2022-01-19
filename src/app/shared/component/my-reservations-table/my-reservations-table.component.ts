import { Component, OnInit, ViewChild } from '@angular/core';
import {  MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTable } from "@angular/material/table";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Reservation } from "../../../data/interface/Reservation";
import { ReservationResponse } from "../../../data/interface/ReservationResponse";
import { ReservationService } from "../../../data/service/reservation/reservation.service";
import { UiService } from "../../../modules/reservation/service/ui.service";
import { Location } from "../../../data/interface/Location";
import { LocationService } from "../../../data/service/location/location.service";
import { MatDialog } from "@angular/material/dialog";
import { NotificationService } from "../../service/notification.service";
import {AlterReservationDialogComponent } from "../../../modules/reservation/components/alter-reservation-dialog/alter-reservation-dialog.component";
import { MatSelectChange } from "@angular/material/select";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

/**
 * The my reservation table component
 * @property allMyReservations - all the reservations
 * @property allMyReservationsSlice - A slice of all the reservations
 * @property columnsToDisplay - the columns to display
 * @property showTable - the show table boolean
 * @property subscription - the UI service subscription
 */
@Component({
	selector: 'app-my-reservations-table',
	templateUrl: './my-reservations-table.component.html',
	styleUrls: ['./my-reservations-table.component.css']
})
export class MyReservationsTableComponent implements OnInit {

	@ViewChild('myTable') myTable: MatTable<any>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	public allMyReservations: Reservation[];
	public allMyReservationsSlice: Reservation[];
	columnsToDisplay = ['id', 'date', 'tijd', 'roomId', 'workplaceAmount', 'recurrence', 'action'];
	private dateSortCounter: number = 0;
	private paginatorStartIndex: number = 0;
	private paginatorEndIndex: number = 3;

	locations: Location[];
	location: number;

	selectedDate: Date = new Date();
	date: Date | null;

	showTable: boolean;
	subscription: Subscription;
	reservationResponse: ReservationResponse;

	/**
	 * Constructor of the my reservation table component
	 * It also sets the subscription to the value that comes from the UI service on toggle subscription
	 * @param reservationService - The reservation service
	 * @param locationService - The location service
	 * @param uiService - The ui service
	 * @param router - The router
	 * @param dialog
	 * @param notificationService
	 */
	constructor(private reservationService: ReservationService,
				private locationService: LocationService,
				private uiService: UiService, private router: Router,
				public dialog: MatDialog, private notificationService: NotificationService) {

		this.subscription = this.uiService.onToggle().subscribe(value => this.showTable = value);
	}

	/**
	 * Initializes all the reservations by employeeId and get the first slice of 3 reservations.
	 * Also loads all the locations into the selector.
	 */
	ngOnInit(): void {
		this.getAllReservationsByEmployeeId();
		this.locationService.getLocations()
			.subscribe(locations => {
				this.locations = locations
			});
	}

	/**
	 * Method that compares the given route with the current url route
	 *
	 * @param route - the route you want to compare
	 * @return - if the url is the same as the route
	 */
	hasRoute(route: string): boolean {
		return this.router.url === route;
	}

	/**
	 * Method that gets all the reservations by the given employeeId from the reservations service and sorts them by date ascending
	 *
	 * @return - an observable of the reservations array
	 */
	getAllReservationsByEmployeeId() {
		this.reservationService.getAllReservationsByEmployeeId().subscribe(reservations => {
			this.allMyReservations = reservations;
			this.sortReservationsByEmployeeId();
			this.allMyReservationsSlice = this.allMyReservations.slice(this.paginatorStartIndex, this.paginatorEndIndex);
		});
	}

	/**
	 * Method that sorts the list by date either ascending or descending
	 *
	 * @return - sorted list
	 */
	sortReservationsByEmployeeId() {
		this.reservationService.getAllReservationsByEmployeeId().subscribe(reservations => {
			this.allMyReservations = reservations
			if (this.dateSortCounter == 0) {
				this.allMyReservations.sort(function (reservering1, reservering2) {
					return Date.parse(reservering1.date) - Date.parse(reservering2.date)
				});
				this.dateSortCounter = 1;
				document.getElementById("Datebutton")!.classList.remove("rotate");
			} else if (this.dateSortCounter == 1) {
				this.allMyReservations.sort(function (reservering1, reservering2) {
					return Date.parse(reservering2.date) - Date.parse(reservering1.date)
				});
				this.dateSortCounter = 0;
				document.getElementById("Datebutton")!.classList.add("rotate");
			}
			this.allMyReservationsSlice = this.allMyReservations.slice(this.paginatorStartIndex, this.paginatorEndIndex);
		});
	}

	/**
	 * Method that deletes the reservations by the reservation object from the reservations service
	 *
	 * @param reservationId - reservation id of the object to delete
	 *
	 * @return - an observable of the reservations array
	 */
	deleteReservationByReservationId(reservationId: number) {
		this.reservationService.deleteReservationById(reservationId).subscribe()
		this.myTable.renderRows()
	}

	/**
	 * Method that updates the reservations table
	 *
	 * @param event - the page event
	 */
	OnPageChange(event: PageEvent) {
		this.paginatorStartIndex = event.pageIndex * event.pageSize;
		this.paginatorEndIndex = this.paginatorStartIndex + event.pageSize;
		if (this.paginatorEndIndex > this.allMyReservations.length) {
			this.paginatorEndIndex = this.allMyReservations.length;
		}
		this.allMyReservationsSlice = this.allMyReservations.slice(this.paginatorStartIndex, this.paginatorEndIndex)
	}

	/**
	 * Method that shows the alter reservation-dialog from the selected reservation and
	 * updates the reservation if any properties have been changed.
	 *
	 * @param selectedReservation selected reservation
	 */
	showAlterDialog(selectedReservation: Reservation): void {
		const dialogRef = this.dialog.open(AlterReservationDialogComponent, {
			width: '500px',
			data: {reservation: selectedReservation},
			panelClass: 'reservation-reservation-dialog'
		});

		dialogRef.afterClosed().subscribe(result => {
			// 	check if there are any changed values
			if (result != undefined) {
				result = JSON.parse(JSON.stringify(result));

				// Check if values have changed
				if (!(selectedReservation.id === result.reservation.id &&
					selectedReservation.date === result.reservation.date &&
					selectedReservation.startTime === result.reservation.startTime &&
					selectedReservation.endTime === result.reservation.endTime &&
					selectedReservation.recurrence.recurrencePattern === result.reservation.recurrence.recurrencePattern)) {
					this.#requestUpdateReservation(result);
				}
			}
		});
	}

	/**
	 * Function that calls the {@link reservationService.updateReservation updateReservation} method in order
	 * to try to update the reservation.
	 *
	 * @param reservation {@link Reservation} object.
	 * @private
	 */
	#requestUpdateReservation(reservation: Reservation): void {
		//TODO: handle possible errors, can only be done when backend is done.
		this.reservationService.updateReservation(reservation).subscribe(() => {
		});
	}

	/**
	 * Method that gets all the reservations by the given employeeId from the reservations service
	 * including searchparams for filters.
	 *
	 * @return - an observable of the reservations array
	 */
	getAllReservationsByEmployeeIdWithFilters() {
		this.reservationService.getAllReservationsByEmployeeIdAndFilters(this.date, this.location).subscribe(reservations => {
			this.allMyReservations = reservations
			this.allMyReservationsSlice = this.allMyReservations.slice(0, 3);
		});
	}

	refreshLocation($event: MatSelectChange) {
		this.location = $event.value;
		this.getAllReservationsByEmployeeIdWithFilters();
	}

	refreshStartDate($event: MatDatepickerInputEvent<any>) {
		this.date = $event.value;
		this.getAllReservationsByEmployeeIdWithFilters();
	}
}
