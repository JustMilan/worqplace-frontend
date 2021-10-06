import {Workplace} from "./workplace";
import {Location} from "./location";

export interface Room {
  id: number,
  numberOfWorkplaces: number,
  location: Location,
  floor: string,
  workplaces: Workplace[] | null //TODO: REMOVE NULL
}
