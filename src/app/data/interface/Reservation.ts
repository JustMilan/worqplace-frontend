import { Recurrence } from "./Recurrence";

/**
 * Describes an interface that specifies the configuration of a Reservation object.
 * @property id - the id of the reservation (optional)
 * @property date - the date of the reservation
 * @property startTime - the start time of the reservation
 * @property endTime - the end time of the reservation
 * @property roomId - the roomId of the reservation
 * @property workplaceAmount - the workplaceAmount of the reservation (optional)
 * @property recurrence - the recurrence of the reservation
 *
 * @remarks
 * Use the recurrence object interface with {@link Recurrence}.
 */
export interface Reservation {
	id?: number,
	date: string,
	startTime: string,
	endTime: string,
	roomId: number,
	employeeId?: number,
	workplaceAmount?: number,
	recurrence: Recurrence
}
