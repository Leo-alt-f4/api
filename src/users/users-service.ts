import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma-service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const body = Array.isArray(data) ? data[0] : data;
    const rounds = 10;
    const hashedPassword = await bcrypt.hash(body.password, rounds);

    return this.prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword, 
      },

      select: {
        id: true,
        name: true,
        email: true,
      }
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        tasks: true 
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: String(id) },
      select: {
        id: true,
        name: true,
        email: true,
        tasks: true,
      },
    });

    if (!user) throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    const updateData = { ...data };

    if (updateData.password) {
      const rounds = 10;
      updateData.password = await bcrypt.hash(updateData.password, rounds);
    }

    return this.prisma.user.update({
      where: { id: String(id) },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id: String(id) },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }
}