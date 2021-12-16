/**
 * Describes an interface that specifies the configuration of a ReservationResponse object.
 * @property locationId - the location id of the reservation response
 * @property date - the date of the reservation response
 * @property time - the time of the reservation response
 * @property start - the start time of the reservation response
 * @property end - the end time of the reservation response
 * @property type - the type of the reservation response
 */
export interface ReservationResponse {
	locationId: number,
	date: string,
	time: {
		start: string,
		end: string
	},
	type: string
}
