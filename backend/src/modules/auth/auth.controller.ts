import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AccessTokenGuard } from 'src/common/guards/access-token-guard';
import { JwtPayload } from 'src/common/strategy/acces-token-strategy';
import { GetUserFromToken } from 'src/common/decorators/get-users-from-token-decorators';
import { RefreshTokenPayload } from 'src/common/strategy/refresh-token-strategy';
import { RefreshTokenGuard } from 'src/common/guards/refresh-token-guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @HttpCode(200)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh-token')
  refreshToken(@GetUserFromToken() user: RefreshTokenPayload) {
    return this.authService.refreshTokens(user.id, user.refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@GetUserFromToken() user: JwtPayload) {
    return this.authService.logout(user.id);
  }
}
