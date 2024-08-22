import { Module } from '@nestjs/common';
import { CommandsModule } from './commands/commands.module';
import { PrismaRepositoriesModule } from 'src/infrastructure/repositories/prisma-repoitory.module';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';

@Module({
  imports: [CommandsModule, PrismaModule, PrismaRepositoriesModule],
})
export class ApplicationModule {}
