import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterReservationDialogComponent } from './alter-reservation-dialog.component';

describe('AlterReservationDialogComponent', () => {
  let component: AlterReservationDialogComponent;
  let fixture: ComponentFixture<AlterReservationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlterReservationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterReservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
