import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Room } from "../interface/Room";

@Component({
  selector: 'app-open-room-card',
  templateUrl: './open-room-card.component.html',
  styleUrls: ['./open-room-card.component.css']
})
export class OpenRoomCardComponent implements OnInit {
  @Input() rooms: Room[];
  @Input() selectedReservationType: string;
  @Output() book = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  
}
