import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'segurancaTotal@teste.com', description: 'O e-mail cadastrado do usuário' })
  @IsEmail({}, { message: 'Formato de e-mail inválido' })
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'senhaSuperSecreta123', description: 'A senha do usuário' })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @IsNotEmpty()
  password!: string;
}