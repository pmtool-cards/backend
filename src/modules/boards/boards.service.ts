import { Injectable, Inject } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { BoardDto } from './dto/board.dto';
import { User } from '../users/user.entity';
import { BOARD_REPOSITORY } from '../../core/constants';
import { Column } from './columns/column.entity';
import { Card } from './columns/cards/card.entity';

@Injectable()
export class BoardsService {
  constructor(
    @Inject(BOARD_REPOSITORY) private readonly boardRepository: typeof Board,
  ) {}

  async create(board: BoardDto, userId): Promise<Board> {
    return await this.boardRepository.create<Board>({ ...board, userId });
  }

  async findAll(where?: {}): Promise<Board[]> {
    return await this.boardRepository.findAll<Board>({
      where: where || {},
      include: [
        { model: User, attributes: { exclude: ['password'] } },
        { model: Column, include: [{ model: Card }] },
      ],
    });
  }

  async findOne(where: {}): Promise<Board> {
    return await this.boardRepository.findOne({
      where,
      include: [
        { model: User, attributes: { exclude: ['password'] } },
        {
          model: Column,
          separate: true,
          order: [['order', 'ASC']],
          include: [{ model: Card, order: [['order', 'ASC']] }],
        },
      ],
    });
  }

  async update(id: number, data: BoardDto, userId: number) {
    const [numberOfAffectedRows, [updatedBoard]] =
      await this.boardRepository.update(
        { ...data },
        { where: { id, userId }, returning: true },
      );

    return { numberOfAffectedRows, updatedBoard };
  }

  async delete(where: {}) {
    return await this.boardRepository.destroy({ where });
  }
}
