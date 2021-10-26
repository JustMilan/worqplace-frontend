import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent implements OnInit {


  constructor() {
  }

  ngOnInit(): void {
  }

  //TODO: function that will get the 3 most recent reservations and if there
  // is a fourth enables the empty card with the text and link "See other reservations"
}
