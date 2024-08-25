import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entiity';
import { IUsersRepository } from 'src/domain/repositories/users.repository';
import { RolesUserValueObject } from 'src/domain/value-objects/roles-user.value-object';
import { PrismaClientService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class PrismaUsersRepository implements IUsersRepository {
  constructor(private readonly prisma: PrismaClientService) {}

  async save(input: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        ...input,
      },
    });
  }
  async findByUuid(uuid: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        uuid,
      },
    });
    if (!user) {
      return null;
    }
    return new User(
      {
        ...user,
        role: user.role as RolesUserValueObject,
      },
      user.uuid,
    );
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      return null;
    }
    return new User(
      {
        ...user,
        role: user.role as RolesUserValueObject,
      },
      user.uuid,
    );
  }
  async update(input: User): Promise<void> {
    await this.prisma.user.update({
      where: {
        uuid: input.uuid,
      },
      data: {
        ...input,
      },
    });
  }
}
