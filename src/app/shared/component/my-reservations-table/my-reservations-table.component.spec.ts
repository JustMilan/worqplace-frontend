import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReservationsTableComponent } from './my-reservations-table.component';

describe('MyReservationsComponent', () => {
  let component: MyReservationsTableComponent;
  let fixture: ComponentFixture<MyReservationsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyReservationsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReservationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
