import {Test, TestingModule} from '@nestjs/testing';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {Action, CreateEventDto, Domain} from "./dto/create-event.dto";

describe('AppController', () => {
  let app: TestingModule;
  const appServiceMock = {
    createOne: jest.fn(),
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

  describe('createOne', () => {
    it('should return a new event from the database', async () => {
      const appController = app.get<AppController>(AppController);
      const dto: CreateEventDto = {
        action: Action.CREATED,
        domain: Domain.LEAD,
        actorId: "aaaa-bbbb-cccc-dddd",
      }
      appServiceMock.createOne.mockResolvedValue(dto)
      const newEvent = await appController.createOne({dto});
      expect(newEvent.actorId).toEqual(dto.actorId);
      expect(appServiceMock.createOne).toHaveBeenCalledWith(dto)
    });
  });
})
;
