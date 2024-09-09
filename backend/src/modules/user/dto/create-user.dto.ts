import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MinLength(5)
  firstName?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MinLength(5)
  lastName?: string;
}
