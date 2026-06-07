import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {RMQ_EVENTS_CLIENT_ID} from "../constants/constants";
import {firstValueFrom} from "rxjs";
import {EventDto} from "../dto/events/event.dto";
import {CreateEventDto} from "../dto/events/create-event.dto";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import type {Cache} from "cache-manager";

@Injectable()
export class EventsService {
  constructor(@Inject(RMQ_EVENTS_CLIENT_ID) private readonly client: ClientProxy, @Inject(CACHE_MANAGER) private readonly cache: Cache) {
  }

  async findAll(): Promise<EventDto[]> {
    const result: EventDto[] | undefined = await this.cache.get("events:all")
    if (result) {
      return result
    }
    const response: EventDto[] = await firstValueFrom(this.client.send({cmd: "events.microservice: findAll"}, {}))
    await this.cache.set("events:all", response)
    return response
  }

  async findOne(id: string): Promise<EventDto> {
    const result: EventDto | undefined = await this.cache.get(`events:${id}`)
    if (result) {
      return result
    }
    const response: EventDto = await firstValueFrom(this.client.send({cmd: "events.microservice: findOne"}, {id}))
    await this.cache.set(`events:${id}`, response)
    return response
  }

  async createOne(dto: CreateEventDto): Promise<EventDto> {
    return await firstValueFrom(this.client.send({cmd: "events.microservice: createOne"}, {dto}))
  }
}
