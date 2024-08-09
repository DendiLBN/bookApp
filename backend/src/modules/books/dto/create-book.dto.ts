import {
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

const isbnRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
// @IsISBN() from class-validator somehow doesn't work with the regex above

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  author: string;

  @IsNotEmpty()
  @Matches(isbnRegex, { message: 'ISBN must be a valid 10 or 13 digit number' })
  isbn: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  pagesNumber: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  rate: number;
}
