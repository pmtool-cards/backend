import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findOne({ email });

    if (!user) {
      return null;
    }

    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }

    const { password, ...result } = user['dataValues'];
    return result;
  }

  public async login(user) {
    const token = await this.generateToken(user);
    return { user, token };
  }

  public async create(user) {
    const pass = await this.hashPassword(user.password);
    const newUser = await this.userService.create({ ...user, password: pass });
    const { password, ...result } = newUser['dataValues'];
    const token = await this.generateToken(result);

    return { user: result, token };
  }

  private async generateToken(user) {
    return await this.jwtService.signAsync(user);
  }

  private async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  private async comparePassword(enteredPassword, dbPassword) {
    return await bcrypt.compare(enteredPassword, dbPassword);
  }
}
