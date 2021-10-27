import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenRoomCardComponent } from './open-room-card.component';

describe('OpenRoomCardComponent', () => {
  let component: OpenRoomCardComponent;
  let fixture: ComponentFixture<OpenRoomCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenRoomCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenRoomCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
