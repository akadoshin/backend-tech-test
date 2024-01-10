import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TasksService } from './tasks.service';
import { TaskEntity } from '../entities/task.entity';

describe('TasksService', () => {
  let tasksService: TasksService;
  let taskRepository: Repository<TaskEntity>;

  const mockTask: TaskEntity = {
    id: expect.any(Number),
    name: expect.any(String),
    completed: expect.any(Boolean),
    createdAt: expect.any(Date),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(TaskEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    tasksService = moduleRef.get<TasksService>(TasksService);
    taskRepository = moduleRef.get<Repository<TaskEntity>>(
      getRepositoryToken(TaskEntity),
    );
  });

  it('should be defined', () => {
    expect(tasksService).toBeDefined();
  });

  it('should create a task', async () => {
    const task = new TaskEntity(mockTask);

    jest.spyOn(taskRepository, 'save').mockResolvedValue(task);

    expect(await tasksService.create(task)).toBe(task);
    expect(taskRepository.save).toHaveBeenCalledWith(task);
  });

  it('should find all tasks', async () => {
    const task = new TaskEntity(mockTask);
    jest.spyOn(taskRepository, 'find').mockResolvedValue([task]);

    expect(await tasksService.findAll()).toEqual([task]);
    expect(taskRepository.find).toHaveBeenCalled();
  });

  it('should find one task', async () => {
    const task = new TaskEntity(mockTask);
    jest.spyOn(taskRepository, 'findOne').mockResolvedValue(task);

    expect(await tasksService.findOne(1)).toBe(task);
    expect(taskRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should update a task', async () => {
    const task = new TaskEntity(mockTask);
    jest.spyOn(taskRepository, 'findOne').mockResolvedValue(task);
    jest.spyOn(taskRepository, 'save').mockResolvedValue(task);

    expect(await tasksService.update(1, task)).toBe(task);
    expect(taskRepository.save).toHaveBeenCalledWith(task);
  });

  it('should delete a task', async () => {
    jest
      .spyOn(taskRepository, 'delete')
      .mockResolvedValue({ raw: [], affected: 1 });

    expect(await tasksService.delete(1)).toEqual({ raw: [], affected: 1 });
    expect(taskRepository.delete).toHaveBeenCalledWith(1);
  });
});
