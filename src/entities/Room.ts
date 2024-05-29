import { Message } from "./Message";
import { User } from "./User";

export interface Room {
  id: string;
  name: string;
  messages: Message[];
  users: Map<string, User>;
}
