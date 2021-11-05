import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenReservationCardComponent } from './open-reservation-card.component';

describe('OpenRoomCardComponent', () => {
  let component: OpenReservationCardComponent;
  let fixture: ComponentFixture<OpenReservationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenReservationCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenReservationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
