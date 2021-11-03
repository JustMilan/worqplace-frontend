export interface Reservation {
  id?: number,
  date:string,
  startTime: string,
  endTime: string,
  employeeId: number,
  roomId?: number,
  recurring?: boolean
}
