import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {RMQ_EVENTS_CLIENT_ID} from "../constants/constants";
import {firstValueFrom} from "rxjs";
import {EventDto} from "../dto/events/event.dto";
import {Action, CreateEventDto, Domain} from "../dto/events/create-event.dto";
import {EventsGateway} from "./events.gateway";

@Injectable()
export class EventsService {
  constructor(@Inject(RMQ_EVENTS_CLIENT_ID) private readonly client: ClientProxy, private readonly eventsGateway: EventsGateway) {
  }

  async findAll(): Promise<EventDto[]> {
    return await firstValueFrom(this.client.send({cmd: "events.microservice: findAll"}, {}))
  }

  async findOne(id: string): Promise<EventDto> {
    return await firstValueFrom(this.client.send({cmd: "events.microservice: findOne"}, {id}))
  }

  async findByActorId(actorId: string) {
    return await firstValueFrom(this.client.send({cmd: "events.microservice: findByActorId"}, {actorId}))
  }

  async findBySubjectId(subjectId: string) {
    return await firstValueFrom(this.client.send({cmd: "events.microservice: findBySubjectId"}, {subjectId}))
  }

  async findByDomain(domain: Domain) {
    return await firstValueFrom(this.client.send({cmd: "events.microservice: findByDomain"}, {domain}))
  }

  async findByAction(action: Action) {
    return await firstValueFrom(this.client.send({cmd: "events.microservice: findByAction"}, {action}))
  }

  async createOne(dto: CreateEventDto): Promise<EventDto> {
    const event = await firstValueFrom(this.client.send({cmd: "events.microservice: createOne"}, {dto}))
    await this.eventsGateway.handleMessage(event)
    return event
  }
}
