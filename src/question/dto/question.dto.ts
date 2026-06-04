import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty({ example: 'How to use NestJS?' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'I am new to NestJS, how do I create a module?' })
  @IsString()
  @IsNotEmpty()
  body: string;
}

export class UpdateQuestionDto {
  @ApiProperty({ example: 'How to use NestJS? (Updated)', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: 'Updated body content...', required: false })
  @IsOptional()
  @IsString()
  body?: string;
}
