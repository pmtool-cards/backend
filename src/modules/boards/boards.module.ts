import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { boardsProviders } from './boards.providers';
import { BoardsService } from './boards.service';
import { ColumnsModule } from './columns/columns.module';

@Module({
  imports: [ColumnsModule],
  controllers: [BoardsController],
  providers: [BoardsService, ...boardsProviders],
  exports: [BoardsService, ...boardsProviders],
})
export class BoardsModule {}
