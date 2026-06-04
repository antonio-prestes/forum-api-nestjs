import { Test, TestingModule } from '@nestjs/testing';
import { QuestionController } from './question.controller';
import QuestionService from './question.service';

describe('QuestionController', () => {
  let controller: QuestionController;
  let service: QuestionService;

  const mockQuestionService = {
    createQuestion: jest.fn(),
    findAllQuestions: jest.fn(),
    findQuestionById: jest.fn(),
    updateQuestion: jest.fn(),
    deleteQuestion: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionController],
      providers: [
        {
          provide: QuestionService,
          useValue: mockQuestionService,
        },
      ],
    }).compile();

    controller = module.get<QuestionController>(QuestionController);
    service = module.get<QuestionService>(QuestionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a question', async () => {
    const data = { title: 'Title', body: 'Body', userId: 1 };
    const mockQuestion = { id: 1, ...data };
    mockQuestionService.createQuestion.mockResolvedValue(mockQuestion);

    const result = await controller.create(data);
    expect(result).toEqual(mockQuestion);
    expect(mockQuestionService.createQuestion).toHaveBeenCalledWith(data);
  });

  it('should find all questions', async () => {
    const mockQuestions = [{ id: 1, title: 'Title', body: 'Body', userId: 1 }];
    mockQuestionService.findAllQuestions.mockResolvedValue(mockQuestions);

    const result = await controller.findAll();
    expect(result).toEqual(mockQuestions);
    expect(mockQuestionService.findAllQuestions).toHaveBeenCalled();
  });

  it('should find a question by id', async () => {
    const mockQuestion = { id: 1, title: 'Title', body: 'Body', userId: 1 };
    mockQuestionService.findQuestionById.mockResolvedValue(mockQuestion);

    const result = await controller.findOne(1);
    expect(result).toEqual(mockQuestion);
    expect(mockQuestionService.findQuestionById).toHaveBeenCalledWith(1);
  });

  it('should update a question', async () => {
    const data = { title: 'Updated Title' };
    const mockQuestion = { id: 1, title: 'Updated Title', body: 'Body', userId: 1 };
    mockQuestionService.updateQuestion.mockResolvedValue(mockQuestion);

    const result = await controller.update(1, data);
    expect(result).toEqual(mockQuestion);
    expect(mockQuestionService.updateQuestion).toHaveBeenCalledWith(1, data);
  });

  it('should delete a question', async () => {
    const mockQuestion = { id: 1, title: 'Title', body: 'Body', userId: 1 };
    mockQuestionService.deleteQuestion.mockResolvedValue(mockQuestion);

    const result = await controller.delete(1);
    expect(result).toEqual(mockQuestion);
    expect(mockQuestionService.deleteQuestion).toHaveBeenCalledWith(1);
  });
});
