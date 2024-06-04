import { Transform } from 'class-transformer';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @Transform(({ value }) => value.trim()) // esta validación es para que no se pueda registrar un usuario con espacios en blanco
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  @IsString()
  readonly password: string;
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
