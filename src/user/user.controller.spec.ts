import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import UserService from './user.service';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    user: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return user profile without password', async () => {
    const mockUser = { id: 1, email: 'test@test.com', name: 'Test', password: 'hashed' };
    mockUserService.user.mockResolvedValue(mockUser);

    const result = await controller.getProfile({ id: 1, email: 'test@test.com' });
    expect(result).toEqual({ id: 1, email: 'test@test.com', name: 'Test' });
    expect(result).not.toHaveProperty('password');
  });
});
