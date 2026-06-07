import { Test } from '@nestjs/testing';
import { AppService } from './app.service';
import {CreateUserDto} from "./dto/create-user.dto";
import {UserEntity} from "./entities/user.entity";
import {getRepositoryToken} from "@nestjs/typeorm";

describe('AppService', () => {
  let service: AppService;
  const mockRepo = {
    create: jest.fn(),
    save: jest.fn(),
  }

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService, {
        provide: getRepositoryToken(UserEntity),
        useValue: mockRepo
      }],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('createOne', () => {
    it('should return a new user from the database', async () => {
      const dto: CreateUserDto = {
        firstName: "Alex",
        lastName: "Cox",
        email: "alexcox@example.com",
        password: "123456"
      }
      mockRepo.create.mockReturnValue(dto);
      mockRepo.save.mockResolvedValue(dto)
      const newUser = await service.createUser(dto);
      expect(newUser).toMatchObject(dto);
    });
  });
});
