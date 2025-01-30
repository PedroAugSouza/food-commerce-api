import { Module } from '@nestjs/common';
import { CommandsModule } from './commands/commands.module';
import { PrismaRepositoriesModule } from 'src/infrastructure/repositories/prisma-repoitories.module';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { QueriesModule } from './queries/queries.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CommandsModule,
    PrismaModule,
    PrismaRepositoriesModule,
    QueriesModule,
    AuthModule,
  ],
})
export class ApplicationModule {}
