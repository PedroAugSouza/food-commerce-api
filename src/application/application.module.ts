import { Module } from '@nestjs/common';
import { CommandsModule } from './commands/commands.module';
import { PrismaRepositoriesModule } from 'src/infrastructure/repositories/prisma-repoitory.module';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { QueriesModule } from './queries/queries.module';

@Module({
  imports: [
    CommandsModule,
    PrismaModule,
    PrismaRepositoriesModule,
    QueriesModule,
  ],
})
export class ApplicationModule {}
