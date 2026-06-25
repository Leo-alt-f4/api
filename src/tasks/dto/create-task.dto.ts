import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus } from '@prisma/client';

export class CreateTaskDto {
  @ApiProperty({ example: 'Estudar NestJS', description: 'O título principal da tarefa' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({ example: 'Finalizar os DTOs e validações do projeto', description: 'Uma descrição detalhada sobre a tarefa' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'PENDING', enum: TaskStatus, description: 'O status da tarefa' })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiProperty({ example: '12345-abcde', description: 'O ID do usuário dono desta tarefa' })
  @IsString()
  @IsNotEmpty()
  userId!: string;
}