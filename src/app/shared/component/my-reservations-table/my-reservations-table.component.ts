import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Reservation} from "../../../data/interface/Reservation";
import {ReservationService} from "../../../data/service/reservation/reservation.service";
import {Subscription} from "rxjs";
import {UiService} from "../../../modules/reservation/service/ui.service";
import {Router} from "@angular/router";
import {MatTable} from "@angular/material/table";
import {Location} from "../../../data/interface/Location";
import {LocationService} from "../../../data/service/location/location.service";
import {MatSelectChange} from "@angular/material/select";

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

	locations: Location[];
	location: number;

	showTable: boolean;
	subscription: Subscription;

	selectedDate: Date = new Date();

	/**
	 * Constructor of the my reservation table component
	 *
	 * @param reservationService - The reservation service
	 * @param locationService - The location service
	 * @param uiService - The ui service
	 * @param router - The router
	 *
	 * It also sets the subscription to the value that comes from the UI service on toggle subscription
	 */
	constructor(private reservationService: ReservationService,
				private locationService: LocationService,
				private uiService: UiService, private router: Router) {

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
	 * @return - a boolean
	 */
	hasRoute(route: string) {
		return this.router.url === route;
	}

	/**
	 * Method that gets all the reservations by the given employeeId from the reservations service
	 *
	 * @return - an observable of the reservations array
	 */
	getAllReservationsByEmployeeId() {
		this.reservationService.getAllReservationsByEmployeeId().subscribe(reservations => {
			this.allMyReservations = reservations
			this.allMyReservationsSlice = this.allMyReservations.slice(0, 3);
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
		const startIndex = event.pageIndex * event.pageSize;
		let endIndex = startIndex + event.pageSize;
		if (endIndex > this.allMyReservations.length) {
			endIndex = this.allMyReservations.length;
		}
		this.allMyReservationsSlice = this.allMyReservations.slice(startIndex, endIndex)
	}

	refreshLocation($event: MatSelectChange) {
		// TODO: Add logic to get the right reservations
	}

	refreshStartDate($event: MatSelectChange) {
		// TODO: Add logic to get the right reservations
	}
}
