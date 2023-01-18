import { forwardRef, Module } from '@nestjs/common';
import { BoardsModule } from '../boards.module';
import { BoardsService } from '../boards.service';
import { CardsModule } from './cards/cards.module';
import { ColumnsController } from './columns.controller';
import { columnsProviders } from './columns.providers';
import { ColumnsService } from './columns.service';

@Module({
  imports: [CardsModule, forwardRef(() => BoardsModule)],
  controllers: [ColumnsController],
  providers: [ColumnsService, ...columnsProviders, BoardsService],
  exports: [ColumnsService, ...columnsProviders],
})
export class ColumnsModule {}
