import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/** DTO */
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

/** Entities */
import { TaskEntity } from '../entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity) private taskEntity: Repository<TaskEntity>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = new TaskEntity(createTaskDto);
    task.createdAt = new Date();

    return await this.taskEntity.save(task);
  }

  async findAll() {
    return await this.taskEntity.find();
  }

  async findOne(id: number) {
    const task = await this.taskEntity.findOne({ where: { id } });
    return task || {};
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);
    if (task) {
      return await this.taskEntity.save({
        ...task,
        ...updateTaskDto,
      });
    }
    return null;
  }

  async delete(id: number) {
    return await this.taskEntity.delete(id);
  }
}
