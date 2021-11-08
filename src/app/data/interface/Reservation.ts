import { Recurrence } from "./Recurrence";

export interface Reservation {
	id?: number,
	date: string,
	startTime: string,
	endTime: string,
	employeeId: number,
	roomId: number,
	workplaceAmount?: number,
	recurrence: Recurrence
}
