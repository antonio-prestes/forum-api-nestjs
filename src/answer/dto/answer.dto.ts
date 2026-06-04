import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty({ example: 'This is my comment or answer.' })
  @IsString()
  @IsNotEmpty()
  body: string;
}

export class UpdateAnswerDto {
  @ApiProperty({ example: 'Updated comment or answer content.' })
  @IsString()
  @IsNotEmpty()
  body: string;
}
