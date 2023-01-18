import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/user.entity';
import { Column as ColumnEntity } from '../columns/column.entity';

@Table
export class Board extends Model<Board> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => ColumnEntity)
  columns: ColumnEntity[];
}
