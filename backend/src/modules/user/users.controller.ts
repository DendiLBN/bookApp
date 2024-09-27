import { Controller, Get, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

import { AccessTokenGuard } from '../../common/guards/access-token-guard';
import { JwtPayload } from 'src/common/strategy/acces-token-strategy';
import { GetUserFromToken } from 'src/common/decorators/get-users-from-token-decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AccessTokenGuard)
  @Get('me')
  getMe(@GetUserFromToken() user: JwtPayload) {
    return this.usersService.getUserById(user.id);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('me')
  deleteMe(@GetUserFromToken() user: JwtPayload) {
    return this.usersService.remove(user.id);
  }
}
