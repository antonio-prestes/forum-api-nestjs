import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Answers } from '@prisma/client';
import AnswerService from './answer.service';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  async create(
    @Body() data: { body: string; userId: number; questionId: number },
  ): Promise<Answers> {
    return this.answerService.createAnswer(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { body: string },
  ): Promise<Answers> {
    return this.answerService.updateAnswer(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Answers> {
    return this.answerService.deleteAnswer(id);
  }
}
