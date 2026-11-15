import { IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @Length(3, 30)
  name?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  image?: string;

 
}
