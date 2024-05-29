import { Message } from "../entities/Message";
import { RoomRepository } from "../repositories/RoomRepository";

export class SendMessage {
  constructor(private roomRepository: RoomRepository) {}

  execute(roomId: string, message: Message): boolean {
    const room = this.roomRepository.findById(roomId);

    if (room) {
      room.messages.push(message);
      return true;
    }

    return false;
  }
}
