import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {EventPattern, MessagePattern, Payload} from "@nestjs/microservices";
import {DealEntity, Status} from "./entities/deal.entity";
import {UpdateDealDto} from "./dto/update-deal.dto";
import {CreateDealDto} from "./dto/create-deal.dto";
import {UpdateStatusDto} from "./dto/update-status.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern({cmd: "deals.microservice: findAll"})
  async findAll(): Promise<DealEntity[]> {
    return await this.appService.findAll();
  }

  @MessagePattern({cmd: "deals.microservice: findOne"})
  async findOne(@Payload() payload: { id: string }): Promise<DealEntity> {
    return await this.appService.findOne(payload.id);
  }

  @MessagePattern({cmd: "deals.microservice: findByStatus"})
  async findByStatus(@Payload() payload: { status: Status }): Promise<DealEntity[]> {
    return await this.appService.findByStatus(payload.status);
  }

  @MessagePattern({cmd: "deals.microservice: findOneByName"})
  async findOneByName(@Payload() payload: { name: string }): Promise<DealEntity> {
    return await this.appService.findOne(payload.name);
  }

  @MessagePattern({cmd: "deals.microservice: createOne"})
  async create(@Payload() payload: { dto: CreateDealDto, actorId: string }): Promise<DealEntity> {
    return await this.appService.createOne(payload.dto, payload.actorId);
  }

  @EventPattern({cmd: "deals.microservice: updateOne"})
  async updateOne(@Payload() payload: { dto: UpdateDealDto, actorId: string }): Promise<void> {
    await this.appService.updateOne(payload.dto, payload.actorId)
  }

  @EventPattern({cmd: "deals.microservice: updateStatus"})
  async updateStatus(@Payload() payload: { dto: UpdateStatusDto, actorId: string }): Promise<void> {
    await this.appService.updateStatus(payload.dto, payload.actorId)
  }

  @EventPattern({cmd: "deals.microservice: deleteOne"})
  async deleteOne(@Payload() payload: { id: string, actorId: string }): Promise<void> {
    await this.appService.deleteOne(payload.id, payload.actorId);
  }
}
