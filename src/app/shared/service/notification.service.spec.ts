import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
	let notificationService: NotificationService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [NotificationService]
		});
		notificationService = TestBed.inject(NotificationService);
	});

	it('should be created', () => {
		expect(notificationService).toBeTruthy();
	});

	it('should emit error message to subject property', () => {
		notificationService.onNotification().subscribe((message) => {
			expect(message.message).toEqual('Verkeerde email');
			expect(message.colorClass).toEqual('error');
		})

		notificationService.handleError('Verkeerde email');
	});

	it('should emit warning message to subject property', () => {
		notificationService.onNotification().subscribe((message) => {
			expect(message.message).toEqual('De ruimte is niet beschikbaar');
			expect(message.colorClass).toEqual('warning');
		})

		notificationService.handleWarning('De ruimte is niet beschikbaar');
	});

	it('should emit success message to subject property', () => {
		notificationService.onNotification().subscribe((message) => {
			expect(message.message).toEqual('Boeking geplaatst');
			expect(message.colorClass).toEqual('success');
		})

		notificationService.handleSuccess('Boeking geplaatst');
	});
});
