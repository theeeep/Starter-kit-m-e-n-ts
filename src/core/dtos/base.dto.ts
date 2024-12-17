import { Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class BaseDTO {
  @Expose()
  @IsOptional()
  @Transform(({ value }) => value && new Date(value))
  createdAt?: Date;

  @Expose()
  @IsOptional()
  @Transform(({ value }) => value && new Date(value))
  updatedAt?: Date;
}
