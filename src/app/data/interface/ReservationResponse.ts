import {Recurrence} from "./Recurrence";

/**
 * Describes an interface that specifies the configuration of a ReservationResponse object.
 * @property type - the type of the reservation response
 * @property locationId - the location id of the reservation response
 * @property date - the date of the reservation response
 * @property time - the time of the reservation response
 * @property start - the start time of the reservation response
 * @property end - the end time of the reservation response
 * @property amount - the amount of workplaces of the reservation response
 * @property recurrence - the recurrence of the reservation response
 *
 * @remarks
 * Use the recurrence object interface with {@link Recurrence}.
 */

export interface ReservationResponse {
	type: string,
	locationId: number,
	date: string,
	time: {
		start: string,
		end: string
	},
	amount: number,
	recurrence: Recurrence
}
