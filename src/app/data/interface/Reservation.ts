import { Recurrence } from "./Recurrence";

export interface Reservation {
	id?: number,
	date: string,
	startTime: string,
	endTime: string,
	roomId: number,
	workplaceAmount?: number,
	recurrence: Recurrence
}
