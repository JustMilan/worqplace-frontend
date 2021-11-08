import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Type } from "@angular/core";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationService } from "../../../data/service/reservation/reservation.service";

import { ReservationComponent } from './reservation.component';

describe('ReservationPageComponent', () => {
  let component: ReservationComponent;
  let fixture: ComponentFixture<ReservationComponent>;
  let app: ReservationComponent;
  let httpMock: HttpTestingController;
  let baseURL: string = "http://localhost:8080";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,],
      declarations: [ReservationComponent],
      providers: [ReservationService,],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReservationComponent);
    app = fixture.componentInstance;
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
