/**
 * Describes an interface that specifies the configuration of a Recurrence object.
 * @property active - checks if the recurrence is active
 * @property recurrencePattern - the recurrence pattern
 */
export interface Recurrence {
	active: boolean,
	recurrencePattern: string
}
