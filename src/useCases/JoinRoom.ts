import { RoomRepository } from "../repositories/RoomRepository";
import { UserRepository } from "../repositories/UserRepository";

export class JoinRoom {
  constructor(
    private roomRepository: RoomRepository,
    private userRepository: UserRepository
  ) {}

  execute(roomId: string, userId: string): boolean {
    const room = this.roomRepository.findById(roomId);
    const user = this.userRepository.findById(userId);

    if (room && user) {
      this.roomRepository.removeUserFromRooms(user.id);
      room.users.set(user.id, user);
      return true;
    }
    return false;
  }
}
