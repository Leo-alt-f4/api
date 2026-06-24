import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Leonardo Pereira', description: 'O nome do utilizador' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'leocunha@gmail.com', description: 'O e-mail único do utilizador' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: '123456', description: 'A senha do utilizador (mínimo 6 caracteres)' })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  @IsNotEmpty()
  password!: string;
}