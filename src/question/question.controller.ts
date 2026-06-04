import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Questions } from '@prisma/client';
import QuestionService from './question.service';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';

class CreateQuestionDto {
  @ApiProperty({ example: 'How to use NestJS?' })
  title: string;

  @ApiProperty({ example: 'I am new to NestJS, how do I create a module?' })
  body: string;

  @ApiProperty({ example: 1 })
  userId: number;
}

class UpdateQuestionDto {
  @ApiProperty({ example: 'How to use NestJS? (Updated)', required: false })
  title?: string;

  @ApiProperty({ example: 'Updated body content...', required: false })
  body?: string;
}

@ApiTags('questions')
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new question (post)' })
  async create(
    @Body() data: CreateQuestionDto,
  ): Promise<Questions> {
    return this.questionService.createQuestion(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all questions with answer count' })
  async findAll(): Promise<any[]> {
    return this.questionService.findAllQuestions();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a question by ID along with its answers' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.questionService.findQuestionById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a question by ID' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateQuestionDto,
  ): Promise<Questions> {
    return this.questionService.updateQuestion(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a question by ID' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Questions> {
    return this.questionService.deleteQuestion(id);
  }
}
