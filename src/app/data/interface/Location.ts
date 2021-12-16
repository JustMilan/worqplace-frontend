import { Address } from "./Address";

/**
 * Describes an interface that specifies the configuration of a Location object.
 * @property id - the id of the location
 * @property name - the name of the location
 * @property address - the address of the location
 *
 * @remarks
 * Use the address object interface with {@link Address}.
 */
export interface Location {
	id: number
	name: string
	address: Address
}
