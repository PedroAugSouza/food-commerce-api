import { randomUUID } from 'crypto';
import { RolesUserValueObject } from '../value-objects/roles-user.value-object';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ enum: ['ADMIN', 'COMMOM'] })
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
