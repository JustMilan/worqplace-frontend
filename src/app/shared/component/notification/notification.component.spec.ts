import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import { of } from "rxjs";
import { NotificationService } from "../../service/notification.service";

describe('NotificationComponent', () => {
	let component: NotificationComponent;
	let fixture: ComponentFixture<NotificationComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [NotificationComponent],
			providers: [
				{
					provide: NotificationService,
					useValue: jasmine.createSpyObj('NotificationService', {
						onNotification: of({message: 'Verkeerde email', colorClass: 'error'})
					})
				}
			]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(NotificationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should show correct message and colorclass', () => {
		component.ngOnInit();

		expect(component.message).toEqual('Verkeerde email');
		expect(component.colorClass).toEqual('error');
	});

	it('should make error message and colorclass dissapear', fakeAsync(() => {
		component.ngOnInit();
		tick(3000);

		expect(component.message).toEqual('');
		expect(component.colorClass).toEqual('');

	}));

});
