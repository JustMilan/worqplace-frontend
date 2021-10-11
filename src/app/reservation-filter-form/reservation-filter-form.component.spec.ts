import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationFilterFormComponent } from './reservation-filter-form.component';

describe('ReservationFilterFormComponent', () => {
  let component: ReservationFilterFormComponent;
  let fixture: ComponentFixture<ReservationFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationFilterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
