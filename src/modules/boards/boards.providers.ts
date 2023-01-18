import { Board } from './entities/board.entity';
import { BOARD_REPOSITORY } from '../../core/constants';

export const boardsProviders = [
  {
    provide: BOARD_REPOSITORY,
    useValue: Board,
  },
];
