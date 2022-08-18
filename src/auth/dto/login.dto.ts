import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNumberString()
  @IsOptional()
  telephone?: string;

  @IsNotEmpty()
  password: string;
}
