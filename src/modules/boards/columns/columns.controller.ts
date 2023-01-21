import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { Column } from './column.entity';
import { CreateColumnDto } from './dto/create-column.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guards';
import { BoardsService } from '../boards.service';
import { UpdateColumnDto } from './dto/update-column.dto';

@UseGuards(JwtAuthGuard)
@Controller('columns')
export class ColumnsController {
  constructor(
    private readonly columnService: ColumnsService,
    private readonly boardService: BoardsService,
  ) {}

  @Get('ofboard/:boardId')
  async findAllOfBoard(@Param('boardId') boardId: number, @Request() req) {
    const board = await this.boardService.findOne({ id: boardId });

    if (!board) {
      throw new NotFoundException('Board does not exist');
    }

    if (board.userId !== req.user.id) {
      throw new ForbiddenException('You cannot see columns of this board');
    }

    return await this.columnService.findAll({ boardId });
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Request() req): Promise<Column> {
    const column = await this.columnService.findOne({ id });

    if (!column) {
      throw new NotFoundException('This column does not exist');
    }

    if (column.board.userId !== req.user.id) {
      throw new ForbiddenException('You cannot see columns of this board');
    }

    return column;
  }

  @Post()
  async create(
    @Body() column: CreateColumnDto,
    @Request() req,
  ): Promise<Column> {
    const board = await this.boardService.findOne({ id: column.boardId });

    if (!board) {
      throw new NotFoundException('Board does not exist');
    }

    if (board.userId !== req.user.id) {
      throw new ForbiddenException('You cannot add columns to this board');
    }

    return await this.columnService.create(column);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateColumnData: UpdateColumnDto,
    @Request() req,
  ): Promise<Column> {
    const column = await this.columnService.findOne({ id });

    if (!column) {
      throw new NotFoundException('Column does not exist');
    }

    const board = await this.boardService.findOne({ id: column.boardId });

    if (!board) {
      throw new NotFoundException('Board does not exist');
    }

    if (board.userId !== req.user.id) {
      throw new ForbiddenException('You cannot update columns of this board');
    }

    const { numberOfAffectedRows, updatedColumn } =
      await this.columnService.update(id, updateColumnData);

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException('This column does not exist');
    }

    return updatedColumn;
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    const column = await this.columnService.findOne({ id });

    if (!column) {
      throw new NotFoundException('Column does not exist');
    }

    const board = await this.boardService.findOne({ id: column.boardId });

    if (board.userId !== req.user.id) {
      throw new ForbiddenException('You cannot remove columns from this board');
    }

    const deleted = await this.columnService.delete({ id });

    if (deleted === 0) {
      throw new NotFoundException('This column does not exist');
    }

    return 'Successfully deleted';
  }
}
