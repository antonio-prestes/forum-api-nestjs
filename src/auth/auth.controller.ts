import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto, LoginDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  async signup(@Body() data: SignupDto) {
    return this.authService.signup(data);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login and receive a JWT token' })
  async login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}
