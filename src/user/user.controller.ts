import { Body, Controller, Post } from '@nestjs/common';
import UserService from './user.service';
import { User as UserModel } from '@prisma/client';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';

class CreateUserDto {
  @ApiProperty({ example: 'Diego', required: false })
  name?: string;

  @ApiProperty({ example: 'diego@example.com' })
  email: string;

  @ApiProperty({ example: 'password123' })
  password: string;
}

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  @ApiOperation({ summary: 'Create a new user (signup)' })
  async signupUser(
    @Body() userData: CreateUserDto,
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
