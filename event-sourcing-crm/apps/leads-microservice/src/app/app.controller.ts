import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {EventPattern, MessagePattern, Payload} from "@nestjs/microservices";
import {LeadEntity, Status} from "./entities/lead.entity";
import {UpdateLeadDto} from "./dto/update-lead.dto";
import {CreateLeadDto} from "./dto/create-lead.dto";
import {UpdateStatusDto} from "./dto/update-status.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern({cmd: "leads.microservice: findAll"})
  async findAll(): Promise<LeadEntity[]> {
    return await this.appService.findAll();
  }

  @MessagePattern({cmd: "leads.microservice: findOne"})
  async findOne(@Payload() payload: { id: string }): Promise<LeadEntity> {
    return await this.appService.findOne(payload.id);
  }

  @MessagePattern({cmd: "leads.microservice: findByStatus"})
  async findByStatus(@Payload() payload: { status: Status }): Promise<LeadEntity[]> {
    return await this.appService.findByStatus(payload.status);
  }

  @MessagePattern({cmd: "leads.microservice: findOneByName"})
  async findOneByName(@Payload() payload: { name: string }): Promise<LeadEntity> {
    return await this.appService.findOne(payload.name);
  }

  @MessagePattern({cmd: "leads.microservice: createOne"})
  async create(@Payload() payload: { dto: CreateLeadDto }): Promise<LeadEntity> {
    return await this.appService.createOne(payload.dto);
  }

  @EventPattern({cmd: "leads.microservice: updateOne"})
  async updateOne(@Payload() payload: { dto: UpdateLeadDto }): Promise<void> {
    await this.appService.updateOne(payload.dto)
  }

  @EventPattern({cmd: "leads.microservice: updateStatus"})
  async updateStatus(@Payload() payload: { dto: UpdateStatusDto }): Promise<void> {
    await this.appService.updateStatus(payload.dto)
  }

  @EventPattern({cmd: "leads.microservice: deleteOne"})
  async deleteOne(@Payload() payload: { id: string }): Promise<void> {
    await this.appService.deleteOne(payload.id);
  }
}
