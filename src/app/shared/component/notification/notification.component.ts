import { Component, OnInit } from '@angular/core';
import { NotificationService } from "../../service/notification.service";

/**
 * The notification component
 * @property message - the message to display in the notification
 * @property colorClass - the color class which styles the notification
 */
@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
	message: string;
	colorClass: string;

	/**
	 * Constructor of the Notification component
	 *
	 * @param notificationService - The notification service
	 */
	constructor(private notificationService: NotificationService) {
	}

	/**
	 * Method that initializes the notification message en colorclass en sets a timeout which makes it disappear
	 */
	ngOnInit(): void {
		this.notificationService.onNotification().subscribe(notificationData => {
			this.message = notificationData.message;
			this.colorClass = notificationData.colorClass;

			setTimeout(() => {
				this.message = '';
				this.colorClass = '';
			}, 3000);
		})
	}
}
