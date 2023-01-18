import {
  Controller,
  Post,
  UseGuards,
  Req,
  Body,
  Res,
  Get,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response, Request } from 'express';
import { DoesUserExist } from 'src/core/guards/doesUserExist.guard';
import { UserDto } from '../users/dto/user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guards';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { user, token } = await this.authService.login(req.user);

    const frontendDomain = this.configService.get<string>('FRONTEND_DOMAIN');
    res.cookie('jwt', token, { httpOnly: true, domain: frontendDomain });

    return { message: 'Authentication successful', user };
  }

  @UseGuards(DoesUserExist)
  @Post('signup')
  async signUp(
    @Body() userData: UserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, token } = await this.authService.create(userData);

    res.cookie('jwt', token, { httpOnly: true });

    return { message: 'Registration successful', user };
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async user(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    return { message: 'Logout successful' };
  }
}
