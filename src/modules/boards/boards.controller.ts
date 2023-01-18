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
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board as BoardEntity } from './entities/board.entity';
import { BoardDto } from './dto/board.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';

@UseGuards(JwtAuthGuard)
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardService: BoardsService) {}

  @Get()
  async findAllOfUser(@Request() req) {
    return await this.boardService.findAll({ userId: req.user.id });
  }

  @Get(':id')
  async findOneOfUser(
    @Param('id') id: number,
    @Request() req,
  ): Promise<BoardEntity> {
    const board = await this.boardService.findOne({ id, userId: req.user.id });

    if (!board) {
      throw new NotFoundException('This board does not exist');
    }

    return board;
  }

  @Post()
  async create(@Body() board: BoardDto, @Request() req): Promise<BoardEntity> {
    return await this.boardService.create(board, req.user.id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() board: BoardDto,
    @Request() req,
  ): Promise<BoardEntity> {
    const { numberOfAffectedRows, updatedBoard } =
      await this.boardService.update(id, board, req.user.id);

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException('This board does not exist');
    }

    return updatedBoard;
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    const deleted = await this.boardService.delete({ id, userId: req.user.id });

    if (deleted === 0) {
      throw new NotFoundException('This board does not exist');
    }

    return 'Successfully deleted';
  }
}
