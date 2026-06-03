import { Inject, Injectable } from '@nestjs/common';
import { Prisma, Questions } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export default class QuestionService {
  @Inject()
  private readonly prisma: PrismaService;

  async createQuestion(data: Prisma.QuestionsUncheckedCreateInput): Promise<Questions> {
    return this.prisma.questions.create({ data });
  }

  async findAllQuestions(): Promise<any[]> {
    return this.prisma.questions.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            answers: true,
          },
        },
      },
      orderBy: {
        crearedAt: 'desc',
      },
    });
  }

  async findQuestionById(id: number): Promise<any> {
    return this.prisma.questions.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        answers: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: {
            crearedAt: 'asc',
          },
        },
      },
    });
  }

  async updateQuestion(id: number, data: Prisma.QuestionsUpdateInput): Promise<Questions> {
    return this.prisma.questions.update({
      where: { id },
      data,
    });
  }

  async deleteQuestion(id: number): Promise<Questions> {
    return this.prisma.questions.delete({
      where: { id },
    });
  }
}
