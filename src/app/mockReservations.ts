import {Workplace} from "./interface/Workplace";
import {Room} from "./interface/room";
import {OpenWorkplace} from "./interface/open-workplace";
import {TimeSlot} from "./interface/time-slot";
import {LocationEnum} from "./locationEnum";


const ROOM: Room = {
  id: 1,
  numberOfWorkplaces: 2,
  location: LocationEnum.Groningen,
  floor: "ATTIC",
  workplaces: null
}


const ROOM1: Room = {
  id: 2,
  numberOfWorkplaces: 3,
  location: LocationEnum.Groningen,
  floor: "FIRST",
  workplaces: null
}

const WORKPLACES: Workplace[] = [{id: 1, number: 1, room: ROOM}, {id: 2, number: 2, room: ROOM1}]
const WORKPLACES1: Workplace[] = [{id: 3, number: 3, room: ROOM1}, {id: 4, number: 4, room: ROOM1}]


const TIMESLOT: TimeSlot[] = [
  {from: "9:00", to: "10:00", date: "21-01-12"},
  {from: "10:00", to: "11:00", date: "12-12-12"}
];

export const MockReservations: OpenWorkplace[] = [{
  id: 1,
  workplaceNumber: WORKPLACES[0].number,
  roomNumber: ROOM.id,
  floor: ROOM.floor,
  timeslots: TIMESLOT
}, {id: 2, workplaceNumber: WORKPLACES1[0].number, roomNumber: ROOM1.id, floor: ROOM1.floor, timeslots: TIMESLOT}]
