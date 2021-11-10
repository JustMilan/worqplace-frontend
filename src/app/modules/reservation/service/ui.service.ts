import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UiService {
    private showTable: boolean;
    private subject = new Subject<any>();

    constructor() {
    }

    onToggle(): Observable<any> {
        return this.subject.asObservable();
    }

    toggleTable(): void {
        this.showTable = !this.showTable;
        this.subject.next(this.showTable);
    }
}
