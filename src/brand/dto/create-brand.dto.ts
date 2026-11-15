import {
  IsString,
  IsNotEmpty,
  Length,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;

  @IsOptional()
  @IsUrl()
  image?: string;
}