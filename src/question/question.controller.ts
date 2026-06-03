import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Questions } from '@prisma/client';
import QuestionService from './question.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  async create(
    @Body() data: { title: string; body: string; userId: number },
  ): Promise<Questions> {
    return this.questionService.createQuestion(data);
  }

  @Get()
  async findAll(): Promise<any[]> {
    return this.questionService.findAllQuestions();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.questionService.findQuestionById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { title?: string; body?: string },
  ): Promise<Questions> {
    return this.questionService.updateQuestion(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Questions> {
    return this.questionService.deleteQuestion(id);
  }
}
