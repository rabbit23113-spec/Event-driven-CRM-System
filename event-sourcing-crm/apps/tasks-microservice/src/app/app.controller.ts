import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {Priority, Status, TaskEntity} from "./entities/task.entity";
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskDto} from "./dto/update-task.dto";
import {EventPattern, MessagePattern, Payload} from "@nestjs/microservices";
import {UpdateStatusDto} from "./dto/update-status.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern({cmd: "tasks.microservice: findAll"})
  async findAll(): Promise<TaskEntity[]> {
    return await this.appService.findAll();
  }

  @MessagePattern({cmd: "tasks.microservice: findOne"})
  async findOne(@Payload() payload: { id: string }): Promise<TaskEntity> {
    return await this.appService.findOne(payload.id);
  }

  @MessagePattern({cmd: "tasks.microservice: findByClientId"})
  async findByClientId(@Payload() payload: { clientId: string }): Promise<TaskEntity[]> {
    return await this.appService.findByClientId(payload.clientId);
  }

  @MessagePattern({cmd: "tasks.microservice: findByLeadId"})
  async findByLeadId(@Payload() payload: { leadId: string }): Promise<TaskEntity[]> {
    return await this.appService.findByLeadId(payload.leadId);
  }

  @MessagePattern({cmd: "tasks.microservice: findByDealId"})
  async findByDealId(@Payload() payload: { dealId: string }): Promise<TaskEntity[]> {
    return await this.appService.findByDealId(payload.dealId);
  }

  @MessagePattern({cmd: "tasks.microservice: findByPriority"})
  async findByPriority(@Payload() payload: { priority: Priority }): Promise<TaskEntity[]> {
    return await this.appService.findByPriority(payload.priority);
  }

  @MessagePattern({cmd: "tasks.microservice: findByStatus"})
  async findByStatus(@Payload() payload: { status: Status }): Promise<TaskEntity[]> {
    return await this.appService.findByStatus(payload.status);
  }

  @MessagePattern({cmd: "tasks.microservice: createOne"})
  async createOne(@Payload() payload: { dto: CreateTaskDto, actorId: string }): Promise<TaskEntity> {
    return await this.appService.createOne(payload.dto, payload.actorId);
  }

  @EventPattern({cmd: "tasks.microservice: updateOne"})
  async updateOne(@Payload() payload: { dto: UpdateTaskDto, actorId: string }): Promise<void> {
    return await this.appService.updateOne(payload.dto, payload.actorId);
  }

  @EventPattern({cmd: "tasks.microservice: updateStatus"})
  async updateStatus(@Payload() payload: { dto: UpdateStatusDto, actorId: string }): Promise<void> {
    return await this.appService.updateStatus(payload.dto, payload.actorId);
  }

  @EventPattern({cmd: "tasks.microservice: deleteOne"})
  async deleteOne(@Payload() payload: { id: string, actorId: string }): Promise<void> {
    return await this.appService.deleteOne(payload.id, payload.actorId);
  }
}
