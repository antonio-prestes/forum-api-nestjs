import { Test, TestingModule } from '@nestjs/testing';
import { QuestionController } from './question.controller';
import QuestionService from './question.service';

describe('QuestionController', () => {
  let controller: QuestionController;

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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a question with userId from token', async () => {
    const data = { title: 'Title', body: 'Body' };
    const user = { id: 1, email: 'test@test.com' };
    const mockQuestion = { id: 1, ...data, userId: 1 };
    mockQuestionService.createQuestion.mockResolvedValue(mockQuestion);

    const result = await controller.create(data, user);
    expect(result).toEqual(mockQuestion);
    expect(mockQuestionService.createQuestion).toHaveBeenCalledWith({
      ...data,
      userId: 1,
    });
  });

  it('should find all questions', async () => {
    const mockQuestions = [{ id: 1, title: 'Title', body: 'Body' }];
    mockQuestionService.findAllQuestions.mockResolvedValue(mockQuestions);

    const result = await controller.findAll();
    expect(result).toEqual(mockQuestions);
  });

  it('should find a question by id', async () => {
    const mockQuestion = { id: 1, title: 'Title', body: 'Body' };
    mockQuestionService.findQuestionById.mockResolvedValue(mockQuestion);

    const result = await controller.findOne(1);
    expect(result).toEqual(mockQuestion);
  });

  it('should update a question', async () => {
    const data = { title: 'Updated' };
    const mockQuestion = { id: 1, title: 'Updated', body: 'Body' };
    mockQuestionService.updateQuestion.mockResolvedValue(mockQuestion);

    const result = await controller.update(1, data);
    expect(result).toEqual(mockQuestion);
  });

  it('should delete a question', async () => {
    const mockQuestion = { id: 1, title: 'Title', body: 'Body' };
    mockQuestionService.deleteQuestion.mockResolvedValue(mockQuestion);

    const result = await controller.delete(1);
    expect(result).toEqual(mockQuestion);
  });
});
