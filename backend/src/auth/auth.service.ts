import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
// import { hash } from 'crypto';

type AuthInput = { username: string; password: string };
type SigninData = { userId: number; username: string };
type AuthResult = { accesToken: string; userId: number; username: string };

@Injectable()
export class AuthService {
  // async register(registerDto) {
  //   const { password } = registerDto;
  //  const hashedPassword = await hash(password: 10);
  //  return hashedPassword
  // }

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.signIn(user);
  }

  async validateUser(input: AuthInput): Promise<SigninData | null> {
    const user = await this.usersService.findUserByName(input.username);

    if (user && user.password === input.password) {
      return {
        userId: user.userId,
        username: user.username,
      };
    }

    return null;
  }

  async signIn(user: SigninData): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.userId,
      username: user.username,
    };

    const accesToken = await this.jwtService.signAsync(tokenPayload);

    return { accesToken, username: user.username, userId: user.userId };
  }
}
