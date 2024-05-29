import { Room } from "../entities/Room";
import { roomsMap } from "../utils/rooms";
import { User } from "../entities/User";

interface RoomCopy extends Omit<Room, "users"> {
  users: User[];
}

export class RoomRepository {
  private rooms: Map<string, Room> = roomsMap;

  findAll(): RoomCopy[] {
    const arrayRooms: RoomCopy[] = [];

    this.rooms.forEach((room) => {
      const usersArray = Array.from(room.users.values());

      const roomCopy: RoomCopy = {
        ...room,
        users: usersArray,
      };

      arrayRooms.push(roomCopy);
    });

    return arrayRooms;
  }

  findById(id: string): Room | undefined {
    return this.rooms.get(id);
  }

  removeUserFromRooms = (userId: string): void => {
    this.rooms.forEach((room) => {
      const user = room.users.has(userId);

      if (user) {
        room.users.delete(userId);
      }
    });
  };
}
