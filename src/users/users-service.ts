import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma-service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    const body = Array.isArray(data) ? data[0] : data;

    return this.prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }
}