import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
    message: string;
    colorClass: string;

    constructor() { }

    setErrorMessage(message: string, colorClass: string): void {
        this.message = message;
        this.colorClass = colorClass;
        console.log(message + " " + colorClass + " test")
    }

    ngOnInit(): void {
    }

}
