import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export class PrismaClientService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
