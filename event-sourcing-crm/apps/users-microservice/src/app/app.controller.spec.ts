import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {CreateUserDto} from "./dto/create-user.dto";

describe('AppController', () => {
  let app: TestingModule;
  const appServiceMock = {
    createUser: jest.fn(),
  }

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, {
        provide: AppService,
        useValue: appServiceMock
      }],
    }).compile();
  });

  describe('createUser', () => {
    it('should return a new user from the database', async () => {
      const appController = app.get<AppController>(AppController);
      const dto: CreateUserDto = {
        firstName: "Alex",
        lastName: "Cox",
        email: "alexcox@example.com",
        password: "123456"
      }
      appServiceMock.createUser.mockResolvedValue(dto)
      const newUser = await appController.createUser({dto});
      expect(newUser).toMatchObject(dto);
      expect(appServiceMock.createUser).toHaveBeenCalledWith(dto)
    });
  });
})
