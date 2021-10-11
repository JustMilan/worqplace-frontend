import {Room} from "./room";
import {TimeSlot} from "./time-slot";

export interface Workplace {
  id: number
  number: number
  timeslots: TimeSlot[]
}
