import { IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @Length(2, 30)
  name: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  image?: string;

 
}
