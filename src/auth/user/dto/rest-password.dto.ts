import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RestPasswordDto {
  @IsEmail()
  email: string;


}
