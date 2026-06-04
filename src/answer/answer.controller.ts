import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { Answers } from '@prisma/client';
import AnswerService from './answer.service';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateAnswerDto, UpdateAnswerDto } from './dto/answer.dto';

@ApiTags('answers')
@Controller()
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post('questions/:questionId/answers')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create an answer for a question' })
  async create(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Body() data: CreateAnswerDto,
    @CurrentUser() user: { id: number; email: string },
  ): Promise<Answers> {
    return this.answerService.createAnswer({
      body: data.body,
      userId: user.id,
      questionId,
    });
  }

  @Put('answers/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an answer by ID' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateAnswerDto,
  ): Promise<Answers> {
    return this.answerService.updateAnswer(id, data);
  }

  @Delete('answers/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an answer by ID' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Answers> {
    return this.answerService.deleteAnswer(id);
  }
}
