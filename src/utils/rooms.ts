import { v4 as uuidv4 } from "uuid";
import { Room } from "../entities/Room";

const rooms: Room[] = [
  {
    id: "123",
    name: "Ruby on rails",
    messages: [],
    users: new Map(),
  },
  {
    id: uuidv4(),
    name: "frontend",
    messages: [],
    users: new Map(),
  },
  {
    id: uuidv4(),
    name: "backend",
    messages: [],
    users: new Map(),
  },
  {
    id: uuidv4(),
    name: "react",
    messages: [],
    users: new Map(),
  },
  {
    id: uuidv4(),
    name: "devops",
    messages: [],
    users: new Map(),
  },
  {
    id: uuidv4(),
    name: "react",
    messages: [],
    users: new Map(),
  },
];

export const roomsMap: Map<string, Room> = new Map(
  rooms.map((room) => [room.id, room])
);
