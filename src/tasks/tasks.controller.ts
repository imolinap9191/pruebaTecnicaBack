import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-Task.dto';
import { Task } from './entities/Task.entity';
import { IResponse } from 'src/interface/interface';
import { TaskService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly TaskService: TaskService) {}

  @Post()
  create(
    @Body() newTask: CreateTaskDto,
  ): Promise<HttpException | CreateTaskDto | IResponse> {
    return this.TaskService.create(newTask);
  }

  @Get()
  task(): Promise<HttpException | Task[] | IResponse> {
    return this.TaskService.getTask();
  }

  @Delete(':id')
  deleteTask(
    @Param('id') id: number,
  ): Promise<HttpException | Task | IResponse> {
    return this.TaskService.deleteTask(id);
  }
}
