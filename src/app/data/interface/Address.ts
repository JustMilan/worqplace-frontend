/**
 * Describes an interface that specifies the configuration of an Address object.
 * @property id - the id of the address
 * @property street - the street of the address
 * @property number - the house number of the address
 * @property postalCode - the postal code of the address
 * @property city - the city of the address
 */
export interface Address {
	id: number,
	street: string,
	number: string,
	postalCode: string,
	city: string
}
