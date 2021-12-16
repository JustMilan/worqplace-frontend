import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
	let fixture: ComponentFixture<AppComponent>;
	let app: AppComponent;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			declarations: [
				AppComponent
			],
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

	it(`should call hasRoute method`, () => {
		let spy = spyOn(app, 'hasRoute').and.callThrough();

		app.hasRoute('/login');

		expect(spy).toHaveBeenCalled();
	});
});
