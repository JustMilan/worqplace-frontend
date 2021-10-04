import {TimeSlot} from "./time-slot";

export interface OpenWorkplace {
  id: number
  workplaceNumber: number
  roomNumber: number
  floor: string
  timeslots: TimeSlot[]
}
