import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-Task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/Task.entity';
import { Repository } from 'typeorm';
import { IResponse } from 'src/interface/interface';


@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  async create(
    task: CreateTaskDto,
  ): Promise<HttpException | CreateTaskDto | IResponse> {
    try {
      const taskTitle = await this.taskRepository.findOne({
        where: { title: task.title },
      });

      if (taskTitle) {
        throw new HttpException(
          `La Task con el título ${task.title} ya existe en la base de datos`,
          HttpStatus.CONFLICT,
        );
      }
      const newTask = this.taskRepository.create(task);
      const savedTask = await this.taskRepository.save(newTask);
      if (savedTask) {
        return {
          message: `La Task ha sido creado exitosamente`,
          data: savedTask,
          statusCode: HttpStatus.CREATED,
        };
      }
    } catch (error) {
      if (error.status === HttpStatus.CONFLICT) {
        throw error;
      }
      throw new HttpException(
        'Error del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTask(): Promise<HttpException | Task[] | IResponse> {
    try {
      const task = await this.taskRepository.find();

      if (!task.length)
        throw new HttpException(
          "No existen Tasks registradas",
          HttpStatus.NOT_FOUND,
        );
      else {
        return {
          message: 'La lista de Tasks está compuesta por:',
          data: task,
          statusCode: HttpStatus.OK,
        };
      }
    }  catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error
      }
      throw new HttpException(
        "Error del servidor",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
  async deleteTask(
    id: number,
  ): Promise<HttpException | Task | IResponse> {
    try {
      const task = await this.taskRepository.findOne({
        where: { id: id },
      });
      if (!task) {
        throw new HttpException(
          `La Task con nro id ${task.id} no existe en la base de datos`,
          HttpStatus.NOT_FOUND,
        );
      }
      await this.taskRepository.delete({ id: id });
      return {
        message: `Se ha eliminado la Task con el id nro: ${task.id}: `,
        statusCode: HttpStatus.OK,
      }
    } catch (error) {
      if (error.status ===  HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        'Error del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
