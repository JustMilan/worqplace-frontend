import {TimeSlot} from "./time-slot";

export interface OpenWorkplace {
  id: number
  workPlaceNumber: number
  roomId: number
  timeslots: TimeSlot[]
}
