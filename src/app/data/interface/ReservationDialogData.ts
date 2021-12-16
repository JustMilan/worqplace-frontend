import { Room } from "./Room";

/**
 * Describes an interface that specifies the configuration of a ReservationDialogData object.
 * @property room - the room of the reservation dialog data
 * @property reservationType - the reservationType of the reservation dialog data
 * @property recurringPattern - the recurringPattern of the reservation dialog data (optional)
 * @property workplaceAmount - the workplaceAmount of the reservation dialog data (optional)
 *
 * @remarks
 * Use the room object interface with {@link Room}.
 */
export interface ReservationDialogData {
	room: Room,
	reservationType: string,
	recurringPattern?: string
	workplaceAmount?: number,
}
