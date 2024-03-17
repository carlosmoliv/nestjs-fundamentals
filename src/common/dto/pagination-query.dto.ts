import { IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  offset: number;

  @IsOptional()
  limit: number;
}
