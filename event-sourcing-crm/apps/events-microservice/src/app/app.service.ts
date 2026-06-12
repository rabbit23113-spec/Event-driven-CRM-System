import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import EventEntity from "./entities/event.entity";
import {Repository} from "typeorm";
import {Action, CreateEventDto, Domain} from "./dto/create-event.dto";
import type {Cache} from "cache-manager";
import {CACHE_MANAGER} from "@nestjs/cache-manager";


@Injectable()
export class AppService {
  constructor(@InjectRepository(EventEntity) private readonly eventsRepo: Repository<EventEntity>, @Inject(CACHE_MANAGER) private readonly cache: Cache) {
  }

  async findAll(): Promise<EventEntity[]> {
    const result: EventEntity[] | undefined = await this.cache.get("events:all")
    if (result) {
      return result
    }
    const events: EventEntity[] = await this.eventsRepo.find()
    if (!events) throw new NotFoundException("No events found");
    await this.cache.set("events:all", events);
    return events;
  }

  async findOne(id: string): Promise<EventEntity> {
    const result: EventEntity | undefined = await this.cache.get(`events:${id}`)
    if (result) {
      return result
    }
    const target: EventEntity | null = await this.eventsRepo.findOneBy({id})
    if (!target) throw new NotFoundException("Not found");
    await this.cache.set(`events:${id}`, target);
    return target;
  }

  async findByActorId(actorId: string): Promise<EventEntity[]> {
    const cachedEvents: EventEntity[] | undefined = await this.cache.get(`events:${actorId}`);
    if (cachedEvents) {
      return cachedEvents;
    }
    const result = await this.eventsRepo.findBy({actorId});
    if (!result) {
      throw new NotFoundException("Not found");
    }
    await this.cache.set(`events:${actorId}`, result);
    return result;
  }

  async findByDomain(domain: Domain): Promise<EventEntity[]> {
    const cachedEvents: EventEntity[] | undefined = await this.cache.get(`events:${domain}`);
    if (cachedEvents) {
      return cachedEvents;
    }
    const result = await this.eventsRepo.findBy({domain});
    if (!result) {
      throw new NotFoundException("Not found");
    }
    await this.cache.set(`events:${domain}`, result);
    return result;
  }

  async findByAction(action: Action): Promise<EventEntity[]> {
    const cachedEvents: EventEntity[] | undefined = await this.cache.get(`events:${action}`);
    if (cachedEvents) {
      return cachedEvents;
    }
    const result = await this.eventsRepo.findBy({action});
    if (!result) {
      throw new NotFoundException("Not found");
    }
    await this.cache.set(`events:${action}`, result);
    return result;
  }

  async findBySubjectId(subjectId: string): Promise<EventEntity[]> {
    const cachedEvents: EventEntity[] | undefined = await this.cache.get(`events:${subjectId}`);
    if (cachedEvents) {
      return cachedEvents;
    }
    const result = await this.eventsRepo.findBy({subjectId});
    if (!result) {
      throw new NotFoundException("Not found");
    }
    await this.cache.set(`events:${subjectId}`, result);
    return result;
  }

  async createOne(dto: CreateEventDto): Promise<EventEntity> {
    const target: EventEntity = this.eventsRepo.create(dto);
    await this.eventsRepo.save(target);
    return target
  }
}
