import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'Please enter a correct email address' })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
