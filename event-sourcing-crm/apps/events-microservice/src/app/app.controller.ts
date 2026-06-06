import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import CreateEventDto from "./dto/create-event.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern("events.microservice: findAll")
  async findAll() {
    return await this.appService.findAll();
  }

  @MessagePattern("events.microservice: findOne")
  async findOne(@Payload() payload: { id: string }) {
    return await this.appService.findOne(payload.id);
  }

  @MessagePattern("events.microservice: createOne")
  async createOne(@Payload() payload: { dto: CreateEventDto }) {
    return await this.appService.createOne(payload.dto)
  }


}
