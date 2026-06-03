import { Inject, Injectable } from '@nestjs/common';
import { Answers, Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export default class AnswerService {
  @Inject()
  private readonly prisma: PrismaService;

  async createAnswer(data: Prisma.AnswersUncheckedCreateInput): Promise<Answers> {
    return this.prisma.answers.create({ data });
  }

  async updateAnswer(id: number, data: Prisma.AnswersUpdateInput): Promise<Answers> {
    return this.prisma.answers.update({
      where: { id },
      data,
    });
  }

  async deleteAnswer(id: number): Promise<Answers> {
    return this.prisma.answers.delete({
      where: { id },
    });
  }
}
