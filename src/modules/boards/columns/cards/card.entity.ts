import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Column as ColumnEntity } from '../column.entity';

@Table
export class Card extends Model<Card> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  order: number;

  @ForeignKey(() => ColumnEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  columnId: number;

  @BelongsTo(() => ColumnEntity)
  column: ColumnEntity;
}
