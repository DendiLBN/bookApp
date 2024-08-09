import { IsInt, IsNotEmpty } from 'class-validator';

export class PaginationDto {
  @IsNotEmpty()
  @IsInt()
  page: number;

  @IsNotEmpty()
  @IsInt()
  perPage: number;
}
