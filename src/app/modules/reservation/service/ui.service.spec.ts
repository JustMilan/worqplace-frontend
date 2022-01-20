import { TestBed } from '@angular/core/testing';

import { UiService } from './ui.service';

describe('UiService', () => {
	let uiService: UiService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [UiService]
		});
		uiService = TestBed.inject(UiService);
	});

	it('should be created', () => {
		expect(uiService).toBeTruthy();
	});

	it('should emit table toggle to subject property', () => {
		uiService.onToggle().subscribe((data) => {
			expect(data).toBeTruthy();
		})

		uiService.toggleTable();
	});

});
