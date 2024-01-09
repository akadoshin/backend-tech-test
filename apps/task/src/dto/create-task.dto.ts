import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

/** Interfaces */
import { Task } from '../interface/task.interface';

export class CreateTaskDto implements Pick<Task, 'name'> {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  readonly name: string;
}
