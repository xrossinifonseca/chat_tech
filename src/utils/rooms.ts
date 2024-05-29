import { v4 as uuid } from "uuid";
import { Room } from "../entities/Room";

const rooms: Room[] = [
  {
    id: uuid(),
    name: "Ruby on rails",
    messages: [],
    users: new Map(),
  },
  {
    id: uuid(),
    name: "frontend",
    messages: [],
    users: new Map(),
  },
  {
    id: uuid(),
    name: "backend",
    messages: [],
    users: new Map(),
  },
  {
    id: uuid(),
    name: "react",
    messages: [],
    users: new Map(),
  },
  {
    id: uuid(),
    name: "devops",
    messages: [],
    users: new Map(),
  },
  {
    id: uuid(),
    name: "react",
    messages: [],
    users: new Map(),
  },
];

export const roomsMap: Map<string, Room> = new Map(
  rooms.map((room) => [room.id, room])
);
