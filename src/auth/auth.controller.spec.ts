import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    signup: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should signup a user', async () => {
    const data = { name: 'Diego', email: 'diego@example.com', password: 'password123' };
    const mockResult = { id: 1, name: 'Diego', email: 'diego@example.com' };
    mockAuthService.signup.mockResolvedValue(mockResult);

    const result = await controller.signup(data);
    expect(result).toEqual(mockResult);
    expect(mockAuthService.signup).toHaveBeenCalledWith(data);
  });

  it('should login a user', async () => {
    const data = { email: 'diego@example.com', password: 'password123' };
    const mockResult = { access_token: 'jwt-token' };
    mockAuthService.login.mockResolvedValue(mockResult);

    const result = await controller.login(data);
    expect(result).toEqual(mockResult);
    expect(mockAuthService.login).toHaveBeenCalledWith(data);
  });
});
