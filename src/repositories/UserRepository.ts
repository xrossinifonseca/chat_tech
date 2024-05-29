import { User } from "../entities/User";

export class UserRepository {
  private users: Map<string, User> = new Map();

  findById(id: string): User | undefined {
    return this.users.get(id);
  }

  save(user: User): void {
    this.users.set(user.id, user);
  }

  removeById(id: string): void {
    this.users.delete(id);
  }
}
