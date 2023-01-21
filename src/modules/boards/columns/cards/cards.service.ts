import { Inject, Injectable } from '@nestjs/common';
import { CARD_REPOSITORY } from 'src/core/constants';
import { Card } from './card.entity';
import { CardDto } from './dto/card.dto';

@Injectable()
export class CardsService {
  constructor(
    @Inject(CARD_REPOSITORY) private readonly cardRepository: typeof Card,
  ) {}

  async create(card: CardDto): Promise<Card> {
    return await this.cardRepository.create<Card>({ ...card });
  }

  async findAll(where?: {}): Promise<Card[]> {
    return await this.cardRepository.findAll<Card>({
      where: where || {},
      order: [['order', 'ASC']],
    });
  }

  async findOne(where: {}): Promise<Card> {
    return await this.cardRepository.findOne({ where });
  }

  async update(id: number, data: CardDto) {
    const [numberOfAffectedRows, [updatedCard]] =
      await this.cardRepository.update(
        { ...data },
        { where: { id }, returning: true },
      );

    return { numberOfAffectedRows, updatedCard };
  }

  async delete(where: {}) {
    return await this.cardRepository.destroy({ where });
  }
}
