import { Test, TestingModule } from '@nestjs/testing';
import { AnswerController } from './answer.controller';
import AnswerService from './answer.service';

describe('AnswerController', () => {
  let controller: AnswerController;
  let service: AnswerService;

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
    service = module.get<AnswerService>(AnswerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an answer', async () => {
    const data = { body: 'Answer body', userId: 1, questionId: 1 };
    const mockAnswer = { id: 1, ...data };
    mockAnswerService.createAnswer.mockResolvedValue(mockAnswer);

    const result = await controller.create(data);
    expect(result).toEqual(mockAnswer);
    expect(mockAnswerService.createAnswer).toHaveBeenCalledWith(data);
  });

  it('should update an answer', async () => {
    const data = { body: 'Updated body' };
    const mockAnswer = { id: 1, body: 'Updated body', userId: 1, questionId: 1 };
    mockAnswerService.updateAnswer.mockResolvedValue(mockAnswer);

    const result = await controller.update(1, data);
    expect(result).toEqual(mockAnswer);
    expect(mockAnswerService.updateAnswer).toHaveBeenCalledWith(1, data);
  });

  it('should delete an answer', async () => {
    const mockAnswer = { id: 1, body: 'Answer body', userId: 1, questionId: 1 };
    mockAnswerService.deleteAnswer.mockResolvedValue(mockAnswer);

    const result = await controller.delete(1);
    expect(result).toEqual(mockAnswer);
    expect(mockAnswerService.deleteAnswer).toHaveBeenCalledWith(1);
  });
});
