import { Sequelize } from 'sequelize-typescript';
import { Board } from 'src/modules/boards/entities/board.entity';
import { Card } from 'src/modules/boards/columns/cards/card.entity';
import { Column } from 'src/modules/boards/columns/column.entity';
import { User } from 'src/modules/users/user.entity';
import { SEQUELIZE, DEVELOPMENT, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Board, Column, Card]);
      await sequelize.sync({ alter: true });
      return sequelize;
    },
  },
];
