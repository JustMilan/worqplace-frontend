import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OpenWorkplace} from "../interface/open-workplace";


@Component({
  selector: 'app-open-workplace-card',
  templateUrl: './open-workplace-card.component.html',
  styleUrls: ['./open-workplace-card.component.css']
})
export class OpenWorkplaceCardComponent implements OnInit {
  @Input() openWorkplaces!: OpenWorkplace[] | null;
  @Output() book = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }
}
