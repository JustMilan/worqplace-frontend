import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Room } from "../interface/Room";

@Component({
  selector: 'app-open-reservation-card',
  templateUrl: './open-reservation-card.component.html',
  styleUrls: ['./open-reservation-card.component.css']
})
export class OpenReservationCardComponent implements OnInit {
  @Input() rooms: Room[];
  @Input() selectedReservationType: string;
  @Output() book = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }


}
