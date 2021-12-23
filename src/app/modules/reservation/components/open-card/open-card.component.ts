import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Room } from "../../../../data/interface/Room";

/**
 * The reservation open-card component
 * @property rooms - the rooms
 * @property reservationResponse - the reservation response
 * @property book - the book event emitter
 */
@Component({
	selector: 'app-open-reservation-card',
	templateUrl: './open-card.component.html',
	styleUrls: ['./open-card.component.css']
})
export class OpenCardComponent {
	@Input() rooms: Room[];
	@Input() reservationResponse: any;

	@Output() book = new EventEmitter();

	constructor() {
		// this is intentional
	}
}
