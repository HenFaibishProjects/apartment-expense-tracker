import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  fullName: string | undefined;

  @IsEmail()
  email: string | undefined;

  @IsNotEmpty()
  phone: string | undefined;

  @IsNotEmpty()
  password: string | undefined;
}
