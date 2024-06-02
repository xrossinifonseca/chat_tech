import express, { Application } from "express";
import { createServer, Server } from "http";
import { Server as Io } from "socket.io";
import { RoomRepository } from "./repositories/RoomRepository";
import { UserRepository } from "./repositories/UserRepository";
import { SocketController } from "./controllers/SocketController";
import { router } from "./routes";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

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

    this.config();
    this.routes();
    this.socket();
  }

  config() {
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: "*",
      })
    );
  }

  routes() {
    this.app.use(router);
  }

  socket() {
    const roomRepository = new RoomRepository();
    const userRepository = new UserRepository();
    new SocketController(this.socketIo, roomRepository, userRepository);
  }
}
