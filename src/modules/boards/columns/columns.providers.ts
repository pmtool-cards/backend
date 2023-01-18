import { Column } from './column.entity';
import { COLUMN_REPOSITORY } from '../../../core/constants';

export const columnsProviders = [
  {
    provide: COLUMN_REPOSITORY,
    useValue: Column,
  },
];
