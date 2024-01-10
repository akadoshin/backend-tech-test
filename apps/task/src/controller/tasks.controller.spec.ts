import { Test } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { TasksController } from './tasks.controller';
import { TasksService } from '../service/tasks.service';

import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task } from '../interface/task.interface';

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  const mockTask: Task = {
    id: expect.any(Number),
    name: expect.any(String),
    completed: expect.any(Boolean),
    createdAt: expect.any(Date),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
        { provide: CACHE_MANAGER, useValue: {} },
      ],
    }).compile();

    tasksController = moduleRef.get<TasksController>(TasksController);
    tasksService = moduleRef.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(tasksController).toBeDefined();
  });

  it('should create a task', async () => {
    const createTaskDto = new CreateTaskDto();
    jest.spyOn(tasksService, 'create').mockResolvedValue(mockTask);

    expect(await tasksController.create(createTaskDto)).toBe(mockTask);
    expect(tasksService.create).toHaveBeenCalledWith(createTaskDto);
  });

  it('should find all tasks', async () => {
    jest.spyOn(tasksService, 'findAll').mockResolvedValue([mockTask]);

    expect(await tasksController.findAll()).toEqual([mockTask]);
    expect(tasksService.findAll).toHaveBeenCalled();
  });

  it('should find one task', async () => {
    jest.spyOn(tasksService, 'findOne').mockResolvedValue(mockTask);

    expect(await tasksController.findOne(1)).toBe(mockTask);
    expect(tasksService.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a task', async () => {
    const updateTaskDto = new UpdateTaskDto();
    jest.spyOn(tasksService, 'update').mockResolvedValue(mockTask);

    expect(await tasksController.update(1, updateTaskDto)).toBe(mockTask);
    expect(tasksService.update).toHaveBeenCalledWith(1, updateTaskDto);
  });
});
