export interface ReservationResponse {
	locationId: number,
	date: string,
	time: {
		start: string,
		end: string
	},
	type: string
}
