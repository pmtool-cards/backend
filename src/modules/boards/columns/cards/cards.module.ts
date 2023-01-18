import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/modules/users/users.module';
import { BoardsModule } from '../../boards.module';
import { BoardsService } from '../../boards.service';
import { ColumnsModule } from '../columns.module';
import { ColumnsService } from '../columns.service';
import { CardsController } from './cards.controller';
import { cardsProviders } from './cards.providers';
import { CardsService } from './cards.service';

@Module({
  imports: [forwardRef(() => BoardsModule), forwardRef(() => ColumnsModule)],
  controllers: [CardsController],
  providers: [CardsService, ...cardsProviders, ColumnsService, BoardsService],
})
export class CardsModule {}
