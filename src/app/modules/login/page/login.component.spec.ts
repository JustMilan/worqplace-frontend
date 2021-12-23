import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { SharedModule } from "../../../shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NotificationService } from "../../../shared/service/notification.service";
import { LoginComponent } from "./login.component";
import { AuthenticationService } from "../../../core/service/authentication.service";
import { of, throwError } from "rxjs";
import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { CoreModule } from "../../../core/core.module";

describe('LoginPageComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authService: AuthenticationService;
    let notificationService: NotificationService;

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

    const headerMock: HttpHeaders = new HttpHeaders({
        'authorization': token
    });

    beforeEach( () => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule, SharedModule, BrowserAnimationsModule, CoreModule],
            declarations: [LoginComponent],
            providers: [{
                provide: AuthenticationService
            }, {
                provide: NotificationService
            }]
        })
            .compileComponents();

    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;

        authService = TestBed.inject(AuthenticationService);
        notificationService = TestBed.inject(NotificationService);
        fixture.detectChanges();
    });

    it('should create ',  () => {
        expect(component).toBeTruthy();
    });

    it('should store the token in the local storage when login is successful', () => {
        let loginComponentSpy = spyOn(component, "login").and.callThrough();
        let authServiceSpy = spyOn(authService, 'authenticate').and.callFake(() => {
            return of( new HttpResponse ({ headers: headerMock}) )
        });

        component.username = "test";
        component.password = "test123";
        component.login();

        expect(loginComponentSpy).toHaveBeenCalled();
        expect(authServiceSpy).toHaveBeenCalled();
        expect(localStorage.getItem('token')).toEqual(token);
    });

    it('should notify when login is not successful', () => {
        let message = 'Verkeerde gebruikersnaam of wachtwoord';
        let loginComponentSpy = spyOn(component, "login").and.callThrough();
        let authServiceSpy = spyOn(authService, 'authenticate').and.callFake(() => {
            return throwError(new Error(message))
        });

        // expect there to be a notification with the correct message and colorclass
        // component.login makes the observable resolve
        notificationService.onNotification().subscribe((notification) => {
            expect(notification.message).toEqual(message);
            expect(notification.colorClass).toEqual('error');
        })

        component.username = "test";
        component.password = "wrongpassword123";
        component.login();

        expect(loginComponentSpy).toHaveBeenCalled();
        expect(authServiceSpy).toHaveBeenCalled();
    });
});
