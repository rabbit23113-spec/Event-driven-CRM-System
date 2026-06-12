import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {EventPattern, MessagePattern, Payload} from "@nestjs/microservices";
import {Action, CreateEventDto, Domain} from "./dto/create-event.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern({cmd: "events.microservice: findAll"})
  async findAll() {
    return await this.appService.findAll();
  }

  @MessagePattern({cmd: "events.microservice: findOne"})
  async findOne(@Payload() payload: { id: string }) {
    return await this.appService.findOne(payload.id);
  }

  @MessagePattern({cmd: "events.microservice: findByActorId"})
  async findByActorId(@Payload() payload: { actorId: string }) {
    return await this.appService.findByActorId(payload.actorId);
  }

  @MessagePattern({cmd: "events.microservice: findBySubjectId"})
  async findBySubjectId(@Payload() payload: { subjectId: string }) {
    return await this.appService.findBySubjectId(payload.subjectId);
  }

  @MessagePattern({cmd: "events.microservice: findByDomain"})
  async findByDomain(@Payload() payload: { domain: Domain }) {
    return await this.appService.findByDomain(payload.domain);
  }

  @MessagePattern({cmd: "events.microservice: findByAction"})
  async findByAction(@Payload() payload: { action: Action }) {
    return await this.appService.findByAction(payload.action);
  }

  @EventPattern({cmd: "events.microservice: createOne"})
  async createOne(@Payload() payload: CreateEventDto) {
    return await this.appService.createOne(payload)
  }
}
