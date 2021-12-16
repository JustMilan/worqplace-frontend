import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";

/**
 * The notification service
 *
 * @property subject - the subject
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
	private subject = new Subject<any>();

	constructor() { }

	/**
	 * Method that allows for multiple observers
	 *
	 * @return - an observable from the subject
	 */
	onNotification(): Observable<any> {
		return this.subject.asObservable();
	}

	/**
	 * Method that sends the error message and the error color class to all listening observables
	 *
	 * @param errorMessage - the error message
	 */
	handleError(errorMessage: string) {
		this.subject.next({ message: errorMessage, colorClass: 'error' });
	}

	/**
	 * Method that sends the warning message and the warning color class to all listening observables
	 *
	 * @param warningMessage - the warning message
	 */
	handleWarning(warningMessage: string) {
		this.subject.next({ message: warningMessage, colorClass: 'warning' });
	}

	/**
	 * Method that sends the success message and the success color class to all listening observables
	 *
	 * @param successMessage - the success message
	 */
	handleSuccess(successMessage: string) {
		this.subject.next({ message: successMessage, colorClass: 'success' });
	}
}
