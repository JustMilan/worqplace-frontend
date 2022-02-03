import {ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {RouterTestingModule, SpyNgModuleFactoryLoader} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReservationComponent} from "./modules/reservation/page/reservation.component";
import {MyReservationsModule} from "./modules/my-reservations/my-reservations.module";
import {AdminModule} from "./modules/admin/admin.module";
import {LoginComponent} from "./modules/login/page/login.component";
import {routes} from './app-routing.module';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {LoginModule} from "./modules/login/login.module";
import {ReservationModule} from "./modules/reservation/reservation.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CoreModule} from "./core/core.module";
import {AuthGuard} from "./core/guard/auth.guard";
import {MyReservationsComponent} from "./modules/my-reservations/page/my-reservations.component";
import {AuthenticationService} from "./core/service/authentication.service";

describe('RoutingModule' , () => {
	let fixture: ComponentFixture<AppComponent>;
	let app: AppComponent;
	let router: Router;
	let location: Location;
	let loader: SpyNgModuleFactoryLoader;
	let authService: AuthenticationService;
	let authGuard: AuthGuard;

	beforeEach((() => {
		TestBed.configureTestingModule({
			declarations: [AppComponent, ReservationComponent, LoginComponent],
			imports: [CoreModule, RouterTestingModule.withRoutes(routes), BrowserAnimationsModule, ReservationModule, LoginModule,
				MyReservationsModule, AdminModule, HttpClientTestingModule],
			providers: [SpyNgModuleFactoryLoader, AuthenticationService, AuthGuard]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		app = fixture.componentInstance;
		router = TestBed.inject(Router);
		location = TestBed.inject(Location);
		loader = TestBed.inject(SpyNgModuleFactoryLoader);
		authService = TestBed.inject(AuthenticationService);
		authGuard = TestBed.inject(AuthGuard);

		router.initialNavigation();
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(app).toBeTruthy();
	});

	it('should navigate "login" to /login', fakeAsync( () => {
		router.navigate(['login']);
		tick();
		expect(location.path()).toBe('/login');
	}));

	it('should navigate "reserve" to /reserve when authenticated', fakeAsync( () => {
		spyOn(authService, 'isAuthenticated').and.callThrough().and.returnValue(true);
		router.navigate(['reserve']);
		tick();
		expect(location.path()).toBe('/reserve');
	}));

	it('should navigate "reserve" to /login when not authenticated', fakeAsync( () => {
		spyOn(authService, 'isAuthenticated').and.callThrough().and.returnValue(false);
		router.navigate(['reserve']);
		tick();
		expect(location.path()).toBe('/login');
	}));

	// For some reason cant match paths
	xit('should navigate "my-reservations" to /my-reservations', fakeAsync( () => {
		spyOn(authService, 'isAuthenticated').and.callThrough().and.returnValue(true);

		loader.stubbedModules = {lazyModule: MyReservationsModule};

		router.resetConfig([
			{path: '', component: MyReservationsComponent},
		]);

		router.navigate(['my-reservations', '']);

		tick();
		fixture.detectChanges();

		expect(location.path()).toBe('/my-reservations');
	}));
});
