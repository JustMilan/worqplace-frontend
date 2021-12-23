import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";

/**
 * The UI service
 * @property showTable - the show table boolean
 * @property subject - the subject
 */
@Injectable({
    providedIn: 'root'
})
export class UiService {
    private showTable: boolean;
    private subject = new Subject<any>();

    constructor() {
		// this is intentional
    }

    /**
     * Method that allows for multiple observers
     *
     * @return - an observable from the subject
     */
    onToggle(): Observable<any> {
        return this.subject.asObservable();
    }

    /**
     * Method that toggles the my reservations table
     */
    toggleTable(): void {
        this.showTable = !this.showTable;
        this.subject.next(this.showTable);
    }
}
