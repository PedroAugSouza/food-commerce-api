import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entiity';
import { IUsersRepository } from 'src/domain/repositories/users.repository';

@Injectable()
export class InMemoryUsersRepository implements IUsersRepository {
  private readonly users: Map<string, User> = new Map();

  save(input: User): void {
    this.users.set(input.uuid, input);
  }
  findByUuid(uuid: string): User | null {
    const user = Array.from(this.users.values()).filter(
      (user) => user.uuid === uuid,
    )[0];
    return user;
  }
  findByEmail(email: string): User | null {
    const user = Array.from(this.users.values()).filter(
      (user) => user.email === email,
    )[0];
    return user;
  }
  update(input: User): void {
    this.users.set(input.uuid, input);
  }
}
