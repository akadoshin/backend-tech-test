import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsDate, IsString, MaxLength } from 'class-validator';

/** Interfaces */
import { Task } from '../interface/task.interface';

@Entity()
export class TaskEntity implements Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @MaxLength(50)
  name: string;

  @Column({ default: false })
  @IsBoolean()
  completed: boolean;

  @Column()
  @IsDate()
  createdAt: Date;

  constructor(partial: Partial<TaskEntity>) {
    Object.assign(this, partial);
  }
}
