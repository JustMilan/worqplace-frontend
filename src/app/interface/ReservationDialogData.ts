import { Room } from "./Room";

export interface ReservationDialogData {
  room: Room,
  recurringIntervalInDays?: number
}
