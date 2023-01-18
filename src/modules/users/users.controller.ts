import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { User as UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserEntity> {
    const user = await this.userService.findOne({ id });

    if (!user) {
      throw new NotFoundException("This user doesn't exist");
    }

    return user;
  }
}
