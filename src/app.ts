import express, { Application } from "express";
import { createServer, Server } from "http";
import { Server as Io, Socket } from "socket.io";
import { RoomRepository } from "./repositories/RoomRepository";
import { UserRepository } from "./repositories/UserRepository";
import { SocketController } from "./controllers/SocketController";

export class App {
  public app: Application;
  public server: Server;
  private socketIo: Io;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.socketIo = new Io(this.server, {
      cors: {
        origin: "*",
      },
    });

    const roomRepository = new RoomRepository();
    const userRepository = new UserRepository();

    new SocketController(this.socketIo, roomRepository, userRepository);
  }
}
