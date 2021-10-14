import {TimeSlot} from "./time-slot";

export interface ReservationResponse {
  successful: boolean,
  id: number,
  workPlaceNumber: number,
  timeslots: TimeSlot[];
}
