import {Inject, Injectable} from '@nestjs/common';
import {RMQ_TASKS_CLIENT_ID} from "../constants/constants";
import {ClientProxy} from "@nestjs/microservices";
import {firstValueFrom} from "rxjs";
import {Priority, Status, TaskDto} from "../dto/tasks/task.dto";
import {CreateTaskDto} from "../dto/tasks/create-task.dto";
import {UpdateTaskDto} from "../dto/tasks/update-task.dto";
import {UpdateStatusDto} from "../dto/tasks/update-status.dto";

@Injectable()
export class TasksService {
  constructor(@Inject(RMQ_TASKS_CLIENT_ID) private readonly client: ClientProxy) {
  }

  async findAll(): Promise<TaskDto[]> {
    return await firstValueFrom(this.client.send({cmd: "tasks.microservice: findAll"}, {}))
  }

  async findOne(id: string): Promise<TaskDto> {
    return await firstValueFrom(this.client.send({cmd: "tasks.microservice: findOne"}, {id}))
  }

  async findByClientId(clientId: string): Promise<TaskDto[]> {
    return await firstValueFrom(this.client.send({cmd: "tasks.microservice: findByClientId"}, {clientId}))
  }

  async findByLeadId(leadId: string): Promise<TaskDto[]> {
    return await firstValueFrom(this.client.send({cmd: "tasks.microservice: findByLeadId"}, {leadId}))
  }

  async findByDealId(dealId: string): Promise<TaskDto[]> {
    return await firstValueFrom(this.client.send({cmd: "tasks.microservice: findByDealId"}, {dealId}))
  }

  async findByPriority(priority: Priority): Promise<TaskDto[]> {
    return await firstValueFrom(this.client.send({cmd: "tasks.microservice: findByPriority"}, {priority}))
  }

  async findByStatus(status: Status): Promise<TaskDto[]> {
    return await firstValueFrom(this.client.send({cmd: "tasks.microservice: findByStatus"}, {status}))
  }

  async createOne(dto: CreateTaskDto, actorId: string): Promise<TaskDto> {
    return await firstValueFrom(this.client.send({cmd: "tasks.microservice: createOne"}, {dto, actorId}))
  }

  async updateOne(dto: UpdateTaskDto, actorId: string): Promise<void> {
    this.client.emit({cmd: "tasks.microservice: updateOne"}, {dto, actorId})
  }

  async updateStatus(dto: UpdateStatusDto, actorId: string): Promise<void> {
    this.client.emit({cmd: "tasks.microservice: updateStatus"}, {dto, actorId})
  }

  async deleteOne(id: string, actorId: string): Promise<void> {
    this.client.emit({cmd: "tasks.microservice: deleteOne"}, {id, actorId})
  }
}
