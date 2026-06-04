import { Test, TestingModule } from '@nestjs/testing';
import QuestionService from './question.service';
import { PrismaService } from '../database/prisma.service';

describe('QuestionService', () => {
  let service: QuestionService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    questions: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a question', async () => {
    const data = { title: 'Title', body: 'Body', userId: 1 };
    const mockQuestion = { id: 1, ...data, crearedAt: new Date(), updatedAt: new Date() };
    mockPrismaService.questions.create.mockResolvedValue(mockQuestion);

    const result = await service.createQuestion(data);
    expect(result).toEqual(mockQuestion);
    expect(mockPrismaService.questions.create).toHaveBeenCalledWith({ data });
  });

  it('should find all questions', async () => {
    const mockQuestions = [{ id: 1, title: 'Title', body: 'Body', userId: 1 }];
    mockPrismaService.questions.findMany.mockResolvedValue(mockQuestions);

    const result = await service.findAllQuestions();
    expect(result).toEqual(mockQuestions);
    expect(mockPrismaService.questions.findMany).toHaveBeenCalled();
  });

  it('should find a question by id', async () => {
    const mockQuestion = { id: 1, title: 'Title', body: 'Body', userId: 1 };
    mockPrismaService.questions.findUnique.mockResolvedValue(mockQuestion);

    const result = await service.findQuestionById(1);
    expect(result).toEqual(mockQuestion);
    expect(mockPrismaService.questions.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: expect.any(Object),
    });
  });

  it('should update a question', async () => {
    const data = { title: 'Updated Title' };
    const mockQuestion = { id: 1, title: 'Updated Title', body: 'Body', userId: 1 };
    mockPrismaService.questions.update.mockResolvedValue(mockQuestion);

    const result = await service.updateQuestion(1, data);
    expect(result).toEqual(mockQuestion);
    expect(mockPrismaService.questions.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data,
    });
  });

  it('should delete a question', async () => {
    const mockQuestion = { id: 1, title: 'Title', body: 'Body', userId: 1 };
    mockPrismaService.questions.delete.mockResolvedValue(mockQuestion);

    const result = await service.deleteQuestion(1);
    expect(result).toEqual(mockQuestion);
    expect(mockPrismaService.questions.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
