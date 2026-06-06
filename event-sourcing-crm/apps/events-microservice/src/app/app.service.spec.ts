import {Test} from '@nestjs/testing';
import {AppService} from './app.service';
import CreateEventDto, {Action, Domain} from "./dto/create-event.dto";
import {getRepositoryToken} from "@nestjs/typeorm";
import EventEntity from "./entities/event.entity";

describe('AppService', () => {
  let service: AppService;
  const mockRepo = {
    create: jest.fn(),
    save: jest.fn(),
  }

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService, {
        provide: getRepositoryToken(EventEntity),
        useValue: mockRepo
      }],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('createOne', () => {
    it('should return a new event from the database', async () => {
      const dto: CreateEventDto = {
        action: Action.CREATED,
        domain: Domain.LEAD,
        actorId: "aaaa-bbbb-cccc-dddd",
      }
      mockRepo.create.mockReturnValue(dto);
      mockRepo.save.mockResolvedValue(dto)
      const newEvent = await service.createOne(dto);
      expect(newEvent.actorId).toEqual(dto.actorId);
    });
  });
});
