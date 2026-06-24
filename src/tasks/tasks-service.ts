import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma-service';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    const body = Array.isArray(data) ? data[0] : data;
    const userExists = await this.prisma.user.findUnique({
      where: { id: String(body.userId) },
    });

    if (!userExists) throw new NotFoundException(`Usuário com ID ${body.userId} não encontrado.`);

    return this.prisma.task.create({
      data: {
        title: body.title,
        description: body.description || null,
        status: body.status || 'PENDING',
        userId: String(body.userId),
      },
    });
  }

  async findAll() {
    return this.prisma.task.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id: String(id) },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (!task) throw new NotFoundException(`Tarefa com ID ${id} não encontrada.`);

    return task;
  }

  async update(id: string, data: any) {
    return this.prisma.task.update({
      where: { id: String(id) },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.task.delete({
      where: { id: String(id) },
    });
  }
}