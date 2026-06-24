import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma-service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
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
        password: true
      }
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        tasks: true 
      },
    });
  }
}