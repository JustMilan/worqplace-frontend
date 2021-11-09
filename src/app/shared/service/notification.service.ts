import { Injectable } from '@angular/core';
import { NotificationComponent } from "../component/notification/notification.component";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notificationComponent: NotificationComponent) { }

	handleError(errorMessage: string) {
	  this.notificationComponent.setErrorMessage(errorMessage, 'error');
	}
}
