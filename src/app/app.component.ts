import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: []
})
export class AppComponent {
	title = 'worqplace';

	constructor(private router: Router) {
	}

	hasRoute(route: string) {
		return this.router.url === route;
	}
}
