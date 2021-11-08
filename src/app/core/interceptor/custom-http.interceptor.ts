import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class CustomHttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // TODO: Here goes the modification of the request (e.g. add bearer token for auth)

        return next.handle(req)
            .pipe(
                // Handle errors
                catchError((error: HttpErrorResponse) => {
                    // TODO: Add error handling logic here
                    const errorMessage = this.setError(error);
                    alert(errorMessage);
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
