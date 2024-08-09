import { IsOptional, IsString, ValidateIf } from 'class-validator';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export class SearchBookDto extends PaginationDto {
  @IsOptional()
  @ValidateIf((o) => o.searchString)
  @IsString()
  searchString?: string;
}
