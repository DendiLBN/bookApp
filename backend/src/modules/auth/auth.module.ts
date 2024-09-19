import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccessTokenStrategy } from 'src/common/strategy/acces-token-strategy';
import { RefreshTokenStrategy } from 'src/common/strategy/refresh-token-strategy';
import { UserModule } from '../user/users.module';

@Module({
  imports: [JwtModule.register({}), UserModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
