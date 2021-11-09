import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
	private subject = new Subject<any>();

	constructor() { }

	onNotification(): Observable<any> {
		return this.subject.asObservable();
	}

	handleError(errorMessage: string) {
		this.subject.next({ message: errorMessage, colorClass: 'error' });
	}

	handleWarning(warningMessage: string) {
		this.subject.next({ message: warningMessage, colorClass: 'warning' });
	}

	handleSucces(successMessage: string) {
		this.subject.next({ message: successMessage, colorClass: 'success' });
	}
}
