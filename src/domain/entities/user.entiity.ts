import { randomUUID } from 'crypto';
import { RolesUserValueObject } from '../value-objects/roles-user.value-object';

export class User {
  uuid: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role: RolesUserValueObject;

  constructor(props: Omit<User, 'uuid'>, uuid?: string) {
    Object.assign(this, props);

    if (!uuid) {
      this.uuid = randomUUID();
      return;
    }
    this.uuid = uuid;
  }
}
