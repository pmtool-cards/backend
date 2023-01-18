import { Inject, Injectable } from '@nestjs/common';
import { COLUMN_REPOSITORY } from 'src/core/constants';
import { Column } from './column.entity';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnsService {
  constructor(
    @Inject(COLUMN_REPOSITORY) private readonly columnRepository: typeof Column,
  ) {}

  async create(column: CreateColumnDto): Promise<Column> {
    return await this.columnRepository.create<Column>({ ...column });
  }

  async findAll(where?: {}): Promise<Column[]> {
    return await this.columnRepository.findAll<Column>({ where: where || {} });
  }

  async findOne(where: {}): Promise<Column> {
    return await this.columnRepository.findOne({ where });
  }

  async update(id: number, data: UpdateColumnDto) {
    const [numberOfAffectedRows, [updatedColumn]] =
      await this.columnRepository.update(
        { ...data },
        { where: { id }, returning: true },
      );

    return { numberOfAffectedRows, updatedColumn };
  }

  async delete(where: {}) {
    return await this.columnRepository.destroy({ where });
  }
}
