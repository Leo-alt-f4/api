import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  public client: PrismaClient;

  constructor() {
    const databaseUrl = process.env.DATABASE_URL || "mysql://root:root@localhost:3306/task_manager?allowPublicKeyRetrieval=true";

    const adapter = new PrismaMariaDb(databaseUrl);
    this.client = new PrismaClient({ adapter });
  }

  get user() {
    return this.client.user;
  }

  get task() {
    return this.client.task;
  }

  async onModuleInit() {
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}