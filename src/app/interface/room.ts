import {Workplace} from "./Workplace";
import {LocationEnum} from "../locationEnum";

export interface Room {
  id: number,
  numberOfWorkplaces: number,
  location: LocationEnum,
  floor: string,
  workplaces: Workplace[] | null //TODO: REMOVE NULL
}
