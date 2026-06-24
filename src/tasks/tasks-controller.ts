import { Controller, Post, Get, Body } from '@nestjs/common';
import { TasksService } from './tasks-service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: any) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  async findAll() {
    return this.tasksService.findAll();
  }
}