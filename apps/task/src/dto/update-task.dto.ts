import { PartialType } from '@nestjs/mapped-types';

/** DTO */
import { CreateTaskDto } from './create-task.dto';

/** Interfaces */
import { Task } from '../interface/task.interface';

export class UpdateTaskDto
  extends PartialType(CreateTaskDto)
  implements Pick<Task, 'completed'>
{
  readonly completed: boolean;
}
