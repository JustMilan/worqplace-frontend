import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenWorkplaceCardComponent } from './open-workplace-card.component';

describe('OpenWorkplaceCardComponent', () => {
  let component: OpenWorkplaceCardComponent;
  let fixture: ComponentFixture<OpenWorkplaceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenWorkplaceCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenWorkplaceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
