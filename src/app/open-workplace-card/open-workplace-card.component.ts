import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Workplace }  from "../interface/workplace";


@Component({
  selector: 'app-open-workplace-card',
  templateUrl: './open-workplace-card.component.html',
  styleUrls: ['./open-workplace-card.component.css']
})
export class OpenWorkplaceCardComponent implements OnInit {
  @Input() workplaces!: Workplace[] | null;
  @Output() book = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }
}
