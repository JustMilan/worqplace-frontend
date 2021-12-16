/**
 * Describes an interface that specifies the configuration of a Room object.
 * @property id - the id of the room
 * @property floor - the floor of the room
 * @property capacity - the capacity of the room
 * @property available - the availability of the room
 */
export interface Room {
	id: number,
	floor: number,
	capacity: number,
	available: number
}
