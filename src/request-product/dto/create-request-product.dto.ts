import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';

export class CreateRequestProductDto {
  @IsString()
  @IsNotEmpty()
  titleNeed: string;

  @IsString()
  @MinLength(5)
  details: string;

  @IsNumber()
  @Min(1)
  qauntity: number;

  @IsOptional()
  @IsString()
  Category?: string;
}
