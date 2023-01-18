import {
  DataType,
  Model,
  Table,
  Column as ColumnDecorator,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Board } from '../entities/board.entity';
import { Card } from './cards/card.entity';

@Table
export class Column extends Model<Column> {
  @ColumnDecorator({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ColumnDecorator({
    type: DataType.INTEGER,
    allowNull: false,
  })
  order: number;

  @ForeignKey(() => Board)
  @ColumnDecorator({
    type: DataType.INTEGER,
    allowNull: false,
  })
  boardId: number;

  @BelongsTo(() => Board)
  board: Board;

  @HasMany(() => Card)
  cards: Card[];
}
