import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(user: UserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async findAll(where?: {}): Promise<User[]> {
    return await this.userRepository.findAll<User>({
      where: where || {},
      attributes: { exclude: ['password'] },
    });
  }

  async findOne(where: {}): Promise<User> {
    return await this.userRepository.findOne<User>({ where });
  }

  async update(id: number, data) {
    const [numberOfAffectedRows, [updatedUser]] =
      await this.userRepository.update(
        { ...data },
        { where: { id }, returning: true },
      );

    return { numberOfAffectedRows, updatedUser };
  }

  async delete(where: {}) {
    return await this.userRepository.destroy({ where });
  }
}
