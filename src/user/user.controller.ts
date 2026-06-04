import { Controller, Get, UseGuards } from '@nestjs/common';
import UserService from './user.service';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the currently authenticated user profile' })
  async getProfile(@CurrentUser() user: { id: number; email: string }) {
    const found = await this.userService.user({ id: user.id });
    if (found) {
      const { password, ...result } = found;
      return result;
    }
    return null;
  }
}
