import { Test, TestingModule } from '@nestjs/testing';
import { AnswerController } from './answer.controller';
import AnswerService from './answer.service';

describe('AnswerController', () => {
  let controller: AnswerController;

  const mockAnswerService = {
    createAnswer: jest.fn(),
    updateAnswer: jest.fn(),
    deleteAnswer: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswerController],
      providers: [
        {
          provide: AnswerService,
          useValue: mockAnswerService,
        },
      ],
    }).compile();

    controller = module.get<AnswerController>(AnswerController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an answer with userId from token and questionId from param', async () => {
    const data = { body: 'Answer body' };
    const user = { id: 1, email: 'test@test.com' };
    const mockAnswer = { id: 1, body: 'Answer body', userId: 1, questionId: 2 };
    mockAnswerService.createAnswer.mockResolvedValue(mockAnswer);

    const result = await controller.create(2, data, user);
    expect(result).toEqual(mockAnswer);
    expect(mockAnswerService.createAnswer).toHaveBeenCalledWith({
      body: 'Answer body',
      userId: 1,
      questionId: 2,
    });
  });

  it('should update an answer', async () => {
    const data = { body: 'Updated body' };
    const mockAnswer = { id: 1, body: 'Updated body', userId: 1, questionId: 2 };
    mockAnswerService.updateAnswer.mockResolvedValue(mockAnswer);

    const result = await controller.update(1, data);
    expect(result).toEqual(mockAnswer);
  });

  it('should delete an answer', async () => {
    const mockAnswer = { id: 1, body: 'Answer body', userId: 1, questionId: 2 };
    mockAnswerService.deleteAnswer.mockResolvedValue(mockAnswer);

    const result = await controller.delete(1);
    expect(result).toEqual(mockAnswer);
  });
});
