import { User } from '../entities/user.entiity';

export interface IUsersRepository {
  save(input: User): Promise<void> | void;
  findByUuid(uuid: string): Promise<User | null> | User | null;
  findByEmail(email: string): Promise<User | null> | User | null;
  update(input: User): Promise<void> | void;
}
