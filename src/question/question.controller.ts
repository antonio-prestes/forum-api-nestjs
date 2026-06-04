import { Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Body, UseGuards } from '@nestjs/common';
import { Questions } from '@prisma/client';
import QuestionService from './question.service';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateQuestionDto, UpdateQuestionDto } from './dto/question.dto';

@ApiTags('questions')
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new question (post)' })
  async create(
    @Body() data: CreateQuestionDto,
    @CurrentUser() user: { id: number; email: string },
  ): Promise<Questions> {
    return this.questionService.createQuestion({
      ...data,
      userId: user.id,
    });
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a question by ID' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateQuestionDto,
  ): Promise<Questions> {
    return this.questionService.updateQuestion(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a question by ID' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Questions> {
    return this.questionService.deleteQuestion(id);
  }
}
