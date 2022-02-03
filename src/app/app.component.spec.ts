import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {Router} from "@angular/router";

describe('AppComponent', () => {
	let fixture: ComponentFixture<AppComponent>;
	let app: AppComponent;
	let routerMock = { navigate: jasmine.createSpy('navigate') };

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [],
			declarations: [ AppComponent ],
			providers: [ { provide: Router, useValue: { url: '/login' } } ]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		app = fixture.componentInstance;

		fixture.detectChanges();
	});

	it('should create the app', () => {
		expect(app).toBeTruthy();
	});

	it(`should have as title 'worqplace'`, () => {
		expect(app.title).toEqual('worqplace');
	});

	it(`should return true when hasRoute method is called on the correct route`, () => {
		let spy = spyOn(app, 'hasRoute').and.callThrough();
		let hasRoute = app.hasRoute('/login')

		expect(spy).toHaveBeenCalled();
		expect(hasRoute).toBeTruthy();
	});

	it(`should return false when hasRoute method is called on the wrong route`, () => {
		let spy = spyOn(app, 'hasRoute').and.callThrough();
		let hasRoute = app.hasRoute('/reserve')

		expect(spy).toHaveBeenCalled();
		expect(hasRoute).toBeFalsy();
	});
});
