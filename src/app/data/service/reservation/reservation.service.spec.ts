import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';

import { ReservationService } from './reservation.service';

describe('ReservationService', () => {
	let service: ReservationService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule,],

		});
		service = TestBed.inject(ReservationService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
