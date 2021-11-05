import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationPageComponent } from './reservation-page.component';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ReservationService } from "../services/reservation.service";
import { Type } from "@angular/core";

describe('ReservationPageComponent', () => {
  let component: ReservationPageComponent;
  let fixture: ComponentFixture<ReservationPageComponent>;
  let app: ReservationPageComponent;
  let httpMock: HttpTestingController;
  let baseURL: string = "http://localhost:8080";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,],
      declarations: [ReservationPageComponent],
      providers: [ReservationService,],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReservationPageComponent);
    app = fixture.componentInstance;
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
