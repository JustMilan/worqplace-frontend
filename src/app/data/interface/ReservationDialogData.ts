import { Room } from "./Room";

export interface ReservationDialogData {
	room: Room,
	reservationType: string,
	recurringPattern?: string
	workplaceAmount?: number,
}
