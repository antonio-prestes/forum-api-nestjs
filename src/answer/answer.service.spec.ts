import { Test, TestingModule } from '@nestjs/testing';
import AnswerService from './answer.service';
import { PrismaService } from '../database/prisma.service';

describe('AnswerService', () => {
  let service: AnswerService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    answers: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnswerService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<AnswerService>(AnswerService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an answer', async () => {
    const data = { body: 'Answer body', userId: 1, questionId: 1 };
    const mockAnswer = { id: 1, ...data, crearedAt: new Date(), updatedAt: new Date() };
    mockPrismaService.answers.create.mockResolvedValue(mockAnswer);

    const result = await service.createAnswer(data);
    expect(result).toEqual(mockAnswer);
    expect(mockPrismaService.answers.create).toHaveBeenCalledWith({ data });
  });

  it('should update an answer', async () => {
    const data = { body: 'Updated body' };
    const mockAnswer = { id: 1, body: 'Updated body', userId: 1, questionId: 1 };
    mockPrismaService.answers.update.mockResolvedValue(mockAnswer);

    const result = await service.updateAnswer(1, data);
    expect(result).toEqual(mockAnswer);
    expect(mockPrismaService.answers.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data,
    });
  });

  it('should delete an answer', async () => {
    const mockAnswer = { id: 1, body: 'Answer body', userId: 1, questionId: 1 };
    mockPrismaService.answers.delete.mockResolvedValue(mockAnswer);

    const result = await service.deleteAnswer(1);
    expect(result).toEqual(mockAnswer);
    expect(mockPrismaService.answers.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
