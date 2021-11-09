import { Component, OnInit } from '@angular/core';
import { NotificationService } from "../../service/notification.service";

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
    message: string;
    colorClass: string;

    constructor(private notificationService: NotificationService) {
    }

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
