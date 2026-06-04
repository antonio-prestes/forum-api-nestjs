import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import UserService from '../user/user.service';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;

  const mockUserService = {
    user: jest.fn(),
    createUser: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signup', () => {
    it('should throw ConflictException if email already exists', async () => {
      mockUserService.user.mockResolvedValue({ id: 1, email: 'test@test.com' });

      await expect(
        service.signup({ email: 'test@test.com', password: '123456' }),
      ).rejects.toThrow(ConflictException);
    });

    it('should create a user with hashed password', async () => {
      mockUserService.user.mockResolvedValue(null);
      mockUserService.createUser.mockResolvedValue({
        id: 1,
        email: 'test@test.com',
        name: null,
        password: 'hashed',
      });

      const result = await service.signup({ email: 'test@test.com', password: '123456' });
      expect(result).not.toHaveProperty('password');
      expect(mockUserService.createUser).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should throw UnauthorizedException if user not found', async () => {
      mockUserService.user.mockResolvedValue(null);

      await expect(
        service.login({ email: 'test@test.com', password: '123456' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is wrong', async () => {
      const hashedPassword = await bcrypt.hash('correct', 10);
      mockUserService.user.mockResolvedValue({
        id: 1,
        email: 'test@test.com',
        password: hashedPassword,
      });

      await expect(
        service.login({ email: 'test@test.com', password: 'wrong' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return access_token on valid credentials', async () => {
      const hashedPassword = await bcrypt.hash('123456', 10);
      mockUserService.user.mockResolvedValue({
        id: 1,
        email: 'test@test.com',
        password: hashedPassword,
      });
      mockJwtService.sign.mockReturnValue('jwt-token');

      const result = await service.login({ email: 'test@test.com', password: '123456' });
      expect(result).toEqual({ access_token: 'jwt-token' });
    });
  });
});
