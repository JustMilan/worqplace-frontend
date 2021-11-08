import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Room } from "../../../../data/interface/Room";

@Component({
	selector: 'app-open-reservation-card',
	templateUrl: './open-card.component.html',
	styleUrls: ['./open-card.component.css']
})
export class OpenCardComponent implements OnInit {
	@Input() rooms: Room[];
	@Input() reservationResponse: any;

	@Output() book = new EventEmitter();

	constructor() {
	}

	ngOnInit(): void {
	}
}
