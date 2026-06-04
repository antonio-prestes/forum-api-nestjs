import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Answers } from '@prisma/client';
import AnswerService from './answer.service';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';

class CreateAnswerDto {
  @ApiProperty({ example: 'This is my comment or answer.' })
  body: string;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 1 })
  questionId: number;
}

class UpdateAnswerDto {
  @ApiProperty({ example: 'Updated comment or answer content.' })
  body: string;
}

@ApiTags('answers')
@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new answer (comment)' })
  async create(
    @Body() data: CreateAnswerDto,
  ): Promise<Answers> {
    return this.answerService.createAnswer(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an answer by ID' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateAnswerDto,
  ): Promise<Answers> {
    return this.answerService.updateAnswer(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an answer by ID' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Answers> {
    return this.answerService.deleteAnswer(id);
  }
}
