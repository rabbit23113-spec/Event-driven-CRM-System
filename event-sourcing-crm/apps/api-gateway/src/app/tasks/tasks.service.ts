import {Inject, Injectable} from '@nestjs/common';
import {RMQ_TASKS_CLIENT_ID} from "../constants/constants";
import {ClientProxy} from "@nestjs/microservices";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import type {Cache} from "cache-manager";
import {firstValueFrom} from "rxjs";
import {Priority, Status, TaskDto} from "../dto/tasks/task.dto";
import {CreateTaskDto} from "../dto/tasks/create-task.dto";
import {UpdateTaskDto} from "../dto/tasks/update-task.dto";

@Injectable()
export class TasksService {
  constructor(@Inject(RMQ_TASKS_CLIENT_ID) private readonly client: ClientProxy, @Inject(CACHE_MANAGER) private readonly cache: Cache) {
  }

  async findAll(): Promise<TaskDto[]> {
    const cachedTasks: TaskDto[] | undefined = await this.cache.get("tasks:all")
    if (cachedTasks) {
      return cachedTasks;
    }
    const response = await firstValueFrom(this.client.send({cmd: "tasks.microservice: findAll"}, {}))
    await this.cache.set("tasks:all", response)
    return response
  }

  async findOne(id: string): Promise<TaskDto> {
    const cachedTask: TaskDto | undefined = await this.cache.get(`tasks:${id}`)
    if (cachedTask) {
      return cachedTask;
    }
    const response = await firstValueFrom(this.client.send({cmd: "tasks.microservice: findOne"}, {id}))
    await this.cache.set(`tasks:${id}`, response)
    return response
  }

  async findByClientId(clientId: string): Promise<TaskDto[]> {
    const cachedTasks: TaskDto[] | undefined = await this.cache.get(`tasks:${clientId}`)
    if (cachedTasks) {
      return cachedTasks;
    }
    const response = await firstValueFrom(this.client.send({cmd: "tasks.microservice: findByClientId"}, {clientId}))
    await this.cache.set(`tasks:${clientId}`, response)
    return response
  }

  async findByLeadId(leadId: string): Promise<TaskDto[]> {
    const cachedTasks: TaskDto[] | undefined = await this.cache.get(`tasks:${leadId}`)
    if (cachedTasks) {
      return cachedTasks;
    }
    const response = await firstValueFrom(this.client.send({cmd: "tasks.microservice: findByLeadId"}, {leadId}))
    await this.cache.set(`tasks:${leadId}`, response)
    return response;
  }

  async findByDealId(dealId: string): Promise<TaskDto[]> {
    const cachedTasks: TaskDto[] | undefined = await this.cache.get(`tasks:${dealId}`)
    if (cachedTasks) {
      return cachedTasks;
    }
    const response = await firstValueFrom(this.client.send({cmd: "tasks.microservice: findByDealId"}, {dealId}))
    await this.cache.set(`tasks:${dealId}`, response)
    return response;
  }

  async findByPriority(priority: Priority): Promise<TaskDto[]> {
    const cachedTasks: TaskDto[] | undefined = await this.cache.get(`tasks:${priority}`)
    if (cachedTasks) {
      return cachedTasks;
    }
    const response = await firstValueFrom(this.client.send({cmd: "tasks.microservice: findByPriority"}, {priority}))
    await this.cache.set(`tasks:${priority}`, response)
    return response;
  }

  async findByStatus(status: Status): Promise<TaskDto[]> {
    const cachedTasks: TaskDto[] | undefined = await this.cache.get(`tasks:${status}`)
    if (cachedTasks) {
      return cachedTasks;
    }
    const response = await firstValueFrom(this.client.send({cmd: "tasks.microservice: findByStatus"}, {status}))
    await this.cache.set(`tasks:${status}`, response)
    return response;
  }

  async createOne(dto: CreateTaskDto): Promise<TaskDto> {
    return await firstValueFrom(this.client.send({cmd: "tasks.microservice: createOne"}, {dto}))
  }

  async updateOne(dto: UpdateTaskDto): Promise<void> {
    return await firstValueFrom(this.client.emit({cmd: "tasks.microservice: updateOne"}, {dto}))
  }

  async deleteOne(id: string): Promise<void> {
    return await firstValueFrom(this.client.emit({cmd: "tasks.microservice: deleteOne"}, {id}))
  }
}
