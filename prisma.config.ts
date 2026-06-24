import { defineConfig } from '@prisma/config';

export default defineConfig({
  engine: 'classic',
  datasource: {
    url: process.env.DATABASE_URL || "mysql://root:root@localhost:3306/task_manager",
  },
});