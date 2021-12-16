import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenCardComponent } from './open-card.component';

describe('OpenRoomCardComponent', () => {
	let component: OpenCardComponent;
	let fixture: ComponentFixture<OpenCardComponent>;

	const rooms = [{
		id: 1,
		floor: 0,
		capacity: 8,
		available: 8
	}];

	const reservationResponse = {
		locationId: 1,
		date: '2021-12-12',
		time: {
			start: '12:00',
			end: '13:00'
		},
		type: 'Ruimte'
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [OpenCardComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(OpenCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have 2 uls with 4 list items total when checking for room availability', () => {
		component.rooms = rooms;
		reservationResponse.type = 'Ruimte';
		component.reservationResponse = reservationResponse;

		fixture.detectChanges();

		const cardElement = fixture.debugElement.nativeElement.querySelector('.open-card');
		const ulElement = cardElement.querySelectorAll('ul');
		const liElement = cardElement.querySelectorAll('li');

		expect(ulElement.length).toEqual(2);
		expect(liElement.length).toEqual(4);
	});

	it('should have 2 uls with 6 list items total when checking for workplace availability', () => {
		component.rooms = rooms;
		reservationResponse.type = 'Werkplek';
		component.reservationResponse = reservationResponse;

		fixture.detectChanges();

		const cardElement = fixture.debugElement.nativeElement.querySelector('.open-card');
		const ulElement = cardElement.querySelectorAll('ul');
		const liElement = cardElement.querySelectorAll('li');

		expect(ulElement.length).toEqual(2);
		expect(liElement.length).toEqual(6);
	});

	it('should render correct room information', () => {
		component.rooms = rooms;
		reservationResponse.type = 'Ruimte';
		component.reservationResponse = reservationResponse;

		fixture.detectChanges();

		const cardElement = fixture.debugElement.nativeElement.querySelector('.open-card');
		const floor = cardElement.querySelector('#floor-result').getAttribute('value');
		const capacity = cardElement.querySelector('#capacity-result').getAttribute('value');

		expect(parseInt(floor)).toEqual(rooms[0].floor);
		expect(parseInt(capacity)).toEqual(rooms[0].capacity);
	});

	it('should render correct workplace information', () => {
		component.rooms = rooms;
		reservationResponse.type = 'Werkplek';
		component.reservationResponse = reservationResponse;

		fixture.detectChanges();

		const cardElement = fixture.debugElement.nativeElement.querySelector('.open-card');
		const floor = cardElement.querySelector('#floor-result').getAttribute('value');
		const availability = cardElement.querySelector('#availability-result').getAttribute('value');
		const capacity = cardElement.querySelector('#capacity-result').getAttribute('value');

		expect(parseInt(floor)).toEqual(rooms[0].floor);
		expect(parseInt(availability)).toEqual(rooms[0].available);
		expect(parseInt(capacity)).toEqual(rooms[0].capacity);
	});
});
