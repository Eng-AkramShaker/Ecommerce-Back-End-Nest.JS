import {
  IsString,
  IsNotEmpty,
  IsUrl,
} from 'class-validator';

export class CreateSuppliersDto {
  @IsString()
  @IsNotEmpty()
  Name: string;

  @IsUrl({ require_tld: true })
  website: string;
}