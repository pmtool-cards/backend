import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../modules/users/users.service';

@Injectable()
export class DoesUserExist implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    if (!request.body.email) {
      throw new BadRequestException('Email field is required');
    }
    const userExists = await this.userService.findOne({
      email: request.body.email,
    });

    if (userExists) {
      throw new ForbiddenException('User with this email already exists');
    }
    return true;
  }
}
