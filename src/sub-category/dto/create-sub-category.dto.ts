import {
  IsMongoId,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateSubCategoryDto {
  @IsString()
  @Length(3, 20)
  name: string;

  @IsMongoId()
  category: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  image?: string;
}
