import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { Reservation } from "../../../../../data/interface/Reservation";
import { ReservationService } from "../../../../../data/service/reservation/reservation.service";
import { LocationService } from "../../../../../data/service/location/location.service";
import { Location } from "../../../../../data/interface/Location";
import { MatSelectChange } from "@angular/material/select";

@Component({
	selector: 'app-admin-location-reservations-table',
	templateUrl: './location-reservations-table.component.html',
	styleUrls: ['./location-reservations-table.component.css']
})
export class AdminLocationReservationsTableComponent implements OnInit {

	@ViewChild(MatPaginator) paginator: MatPaginator;
	public allMyReservations: Reservation[];
	public allMyReservationsSlice: Reservation[];
	columnsToDisplay = ['id', 'date', 'tijd', 'roomId', 'workplaceAmount', 'recurrence', 'employee'];

	locations: Location[];
	location: number;

	constructor(private reservationService: ReservationService,
				private locationService: LocationService) {
	}

	getAllReservationsByLocationId(locationId: number) {
		this.reservationService.getAllReservationsByLocationId(locationId).subscribe(reservations => {
			this.allMyReservations = reservations;
			this.allMyReservationsSlice = this.allMyReservations.slice(0, 3);
		});
	}

	refresh($event: MatSelectChange) {
		this.getAllReservationsByLocationId($event.value);
	}

	OnPageChange(event: PageEvent) {
		const startIndex = event.pageIndex * event.pageSize;
		let endIndex = startIndex + event.pageSize;
		if (endIndex > this.allMyReservations.length) {
			endIndex = this.allMyReservations.length;
		}
		this.allMyReservationsSlice = this.allMyReservations.slice(startIndex, endIndex)
	}

	ngOnInit(): void {
		this.locationService.getLocations()
			.subscribe(locations => {
				this.locations = locations
			});
	}
}
