import { Module } from '@nestjs/common';
import { CommandsModule } from './commands/commands.module';
import { InMemoryRepositoriesModule } from 'src/infrastructure/repositories/in-memory-repositories.module';

@Module({
  imports: [CommandsModule, InMemoryRepositoriesModule],
})
export class ApplicationModule {}
