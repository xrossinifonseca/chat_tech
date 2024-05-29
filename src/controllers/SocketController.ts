import { Server as Io, Socket } from "socket.io";
import { JoinRoom } from "../useCases/JoinRoom";
import { SendMessage } from "../useCases/SendMessage";
import { RoomRepository } from "../repositories/RoomRepository";
import { UserRepository } from "../repositories/UserRepository";

interface SocketWithUserId extends Socket {
  user_id?: string;
}

export class SocketController {
  constructor(
    private io: Io,
    private roomRepository: RoomRepository,
    private userRepository: UserRepository
  ) {
    this.io.on("connection", this.handleConnection.bind(this));
  }

  private handleConnection(socket: SocketWithUserId) {
    socket.emit("roomList", this.roomRepository.findAll());

    socket.on("username", (user) => {
      socket.user_id = user.id;
      this.userRepository.save(user);
    });

    socket.on("joinRoom", (roomId, userId) => {
      const joinRoom = new JoinRoom(this.roomRepository, this.userRepository);

      if (joinRoom.execute(roomId, userId)) {
        socket.join(roomId);
        socket.emit(
          "roomMessages",
          this.roomRepository.findById(roomId)?.messages
        );
        this.io.emit("roomList", this.roomRepository.findAll());
      }
    });

    socket.on("sendMessage", ({ roomId, message }) => {
      const sendMessage = new SendMessage(this.roomRepository);

      if (sendMessage.execute(roomId, message)) {
        this.io.to(roomId).emit("newMessage", { roomId, message });
      }
    });

    socket.on("disconnect", () => {
      if (socket.user_id) {
        const user = this.userRepository.findById(socket.user_id);

        if (user) {
          this.roomRepository.removeUserFromRooms(user.id);
          this.io.emit("roomList", this.roomRepository.findAll());
          this.userRepository.removeById(user.id);
        }
      }
    });
  }
}
