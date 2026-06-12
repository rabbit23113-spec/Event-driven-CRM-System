import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import {EventPattern, MessagePattern, Payload} from "@nestjs/microservices";
import {ClientEntity} from "./entities/client.entity";
import {UpdateClientDto} from "./dto/update-client.dto";
import {CreateClientDto} from "./dto/create-client.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({cmd: "clients.microservice: findAll"})
  async findAll(): Promise<ClientEntity[]> {
    return await this.appService.findAll();
  }

  @MessagePattern({cmd: "clients.microservice: findOne"})
  async findOne(@Payload() payload: { id: string }): Promise<ClientEntity> {
    return await this.appService.findOne(payload.id);
  }

  @MessagePattern({cmd: "clients.microservice: findByCompanyName"})
  async findByCompanyName(@Payload() payload: { companyName: string }): Promise<ClientEntity[]> {
    return await this.appService.findByCompanyName(payload.companyName);
  }

  @MessagePattern({cmd: "clients.microservice: findOneByName"})
  async findOneByName(@Payload() payload: { name: string }): Promise<ClientEntity> {
    return await this.appService.findOne(payload.name);
  }

  @MessagePattern({cmd: "clients.microservice: createOne"})
  async create(@Payload() payload: { dto: CreateClientDto, actorId: string }): Promise<ClientEntity> {
    return await this.appService.createOne(payload.dto, payload.actorId);
  }

  @EventPattern({cmd: "clients.microservice: updateOne"})
  async updateOne(@Payload() payload: { dto: UpdateClientDto, actorId: string }): Promise<void> {
    await this.appService.updateOne(payload.dto, payload.actorId)
  }

  @EventPattern({cmd: "clients.microservice: deleteOne"})
  async deleteOne(@Payload() payload: { id: string, actorId: string }): Promise<void> {
    await this.appService.deleteOne(payload.id, payload.actorId);
  }
}
