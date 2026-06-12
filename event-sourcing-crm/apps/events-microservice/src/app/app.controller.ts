import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {EventPattern, MessagePattern, Payload} from "@nestjs/microservices";
import {CreateEventDto} from "./dto/create-event.dto";

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

  @EventPattern({cmd: "events.microservice: createOne"})
  async createOne(@Payload() payload: CreateEventDto) {
    return await this.appService.createOne(payload)
  }
}
