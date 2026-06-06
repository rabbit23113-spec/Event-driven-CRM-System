import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import EventEntity from "./entities/event.entity";
import {Repository} from "typeorm";
import CreateEventDto from "./dto/create-event.dto";

@Injectable()
export class AppService {
  constructor(@InjectRepository(EventEntity) private readonly eventsRepo: Repository<EventEntity>) {
  }

  async findAll(): Promise<EventEntity[]> {
    const events: EventEntity[] = await this.eventsRepo.find()
    if (!events) throw new NotFoundException("No events found");
    return events;
  }

  async findOne(id: string): Promise<EventEntity> {
    const target: EventEntity | null = await this.eventsRepo.findOneBy({id})
    if (!target) throw new NotFoundException("Not found");
    return target;
  }

  async createOne(dto: CreateEventDto): Promise<EventEntity> {
    const target: EventEntity = this.eventsRepo.create(dto);
    await this.eventsRepo.save(target);
    return target
  }
}
