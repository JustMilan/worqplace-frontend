import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { NotificationService } from "../../shared/service/notification.service";
import { environment } from "../../../environments/environment";

@Injectable({
	providedIn: 'root'
})
export class CustomHttpInterceptor implements HttpInterceptor {

	constructor(private notificationService: NotificationService) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// Check if a session is set and if the end-point of the request is our API.
		if (req.url.startsWith(environment.baseUrl) && (localStorage.getItem('token') !== null)) {
			// Add session header to the request.
			req = req.clone({
				setHeaders: {
					Authorization: localStorage.getItem('token') ?? ''
				}
			})
		}

		return next.handle(req)
			.pipe(
				// Handle errors
				catchError((error: HttpErrorResponse) => {
					const errorMessage = this.setError(error);

					this.notificationService.handleError(errorMessage);

					return throwError(errorMessage);
				})
			)
	}

	setError(error: HttpErrorResponse): string {
		let errorMessage = 'Unknown error occured';

		if (error.error instanceof ErrorEvent) {
			// Client side error
			errorMessage = error.error.message;
		} else {
			// Server side error
			if (error.status !== 0)
				errorMessage = error.error;
		}

		return errorMessage;
	}
}
