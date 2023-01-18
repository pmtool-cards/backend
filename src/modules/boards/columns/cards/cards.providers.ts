import { Card } from './card.entity';
import { CARD_REPOSITORY } from '../../../../core/constants';

export const cardsProviders = [
  {
    provide: CARD_REPOSITORY,
    useValue: Card,
  },
];
