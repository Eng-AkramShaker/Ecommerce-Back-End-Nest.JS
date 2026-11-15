import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  Expirdate: string;

  @IsNumber()
  @Min(0)
  Discount: number;
}