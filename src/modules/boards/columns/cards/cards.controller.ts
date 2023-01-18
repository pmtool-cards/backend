import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guards';
import { BoardsService } from '../../boards.service';
import { ColumnsService } from '../columns.service';
import { Card } from './card.entity';
import { CardsService } from './cards.service';
import { CardDto } from './dto/card.dto';

@UseGuards(JwtAuthGuard)
@Controller('cards')
export class CardsController {
  constructor(
    private readonly cardService: CardsService,
    private readonly columnService: ColumnsService,
    private readonly boardService: BoardsService,
  ) {}

  @Get('ofcolumn/:columnId')
  async findAllOfBoard(@Param('columnId') columnId: number, @Request() req) {
    const column = await this.columnService.findOne({ id: columnId });

    if (!column) {
      throw new NotFoundException('Column does not exist');
    }

    if (column.board.userId !== req.user.id) {
      throw new ForbiddenException('You cannot see cards of this board');
    }

    return await this.cardService.findAll({ columnId });
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Request() req): Promise<Card> {
    const card = await this.cardService.findOne({ id });

    if (!card) {
      throw new NotFoundException('This card does not exist');
    }

    if (card.column.board.userId !== req.user.id) {
      throw new ForbiddenException('You cannot see cards of this board');
    }

    return card;
  }

  @Post()
  async create(@Body() cardData: CardDto, @Request() req): Promise<Card> {
    const column = await this.columnService.findOne({ id: cardData.columnId });

    if (!column) {
      throw new NotFoundException('Column does not exist');
    }

    const board = await this.boardService.findOne({ id: column.boardId });

    if (!board) {
      throw new NotFoundException('Board does not exist');
    }

    if (board.userId !== req.user.id) {
      throw new ForbiddenException('You cannot add cards to this board');
    }

    return await this.cardService.create(cardData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCardData: CardDto,
    @Request() req,
  ): Promise<Card> {
    const card = await this.cardService.findOne({ id });

    if (!card) {
      throw new NotFoundException('Card does not exist');
    }

    const board = await this.boardService.findOne({ id: card.column.boardId });

    if (!board) {
      throw new NotFoundException('Board does not exist');
    }

    if (board.userId !== req.user.id) {
      throw new ForbiddenException('You cannot update cards of this board');
    }

    const { numberOfAffectedRows, updatedCard } = await this.cardService.update(
      id,
      updateCardData,
    );

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException('This card does not exist');
    }

    return updatedCard;
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    const card = await this.cardService.findOne({ id });

    if (!card) {
      throw new NotFoundException('Card does not exist');
    }

    if (card.column.board.userId !== req.user.id) {
      throw new ForbiddenException('You cannot remove cards from this board');
    }

    const deleted = await this.cardService.delete({ id });

    if (deleted === 0) {
      throw new NotFoundException('This card does not exist');
    }

    return 'Successfully deleted';
  }
}
