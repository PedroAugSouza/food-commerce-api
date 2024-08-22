import { Global, Module } from '@nestjs/common';
import { PrismaClientService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaClientService],
  exports: [PrismaClientService],
})
export class PrismaModule {}
