import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {Priority, Status, TaskEntity} from "./entities/task.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {RMQ_EVENTS_CLIENT_ID} from "./constants/constants";
import {UpdateTaskDto} from "./dto/update-task.dto";
import {CreateTaskDto} from "./dto/create-task.dto";
import type {Cache} from "cache-manager";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {UpdateStatusDto} from "./dto/update-status.dto";

@Injectable()
export class AppService {
  constructor(@InjectRepository(TaskEntity) private readonly taskRepo: Repository<TaskEntity>,
              @Inject(RMQ_EVENTS_CLIENT_ID) private readonly eventsClient: ClientProxy,
              @Inject(CACHE_MANAGER) private readonly cache: Cache
  ) {
  }

  async findAll(): Promise<TaskEntity[]> {
    const cachedTasks: TaskEntity[] | undefined = await this.cache.get("tasks:all")
    if (cachedTasks) {
      return cachedTasks;
    }
    const result = await this.taskRepo.find();
    await this.cache.set("tasks:all", result)
    return result
  }

  async findOne(id: string): Promise<TaskEntity> {
    const cachedTask: TaskEntity | undefined = await this.cache.get(`tasks:${id}`)
    if (cachedTask) {
      return cachedTask;
    }
    const target = await this.taskRepo.findOneBy({id})
    if (!target) {
      throw new NotFoundException(`TaskEntity with id ${id} not found`);
    }
    await this.cache.set(`tasks:${id}`, target);
    return target;
  }

  async findByClientId(clientId: string): Promise<TaskEntity[]> {
    const cachedTasks: TaskEntity[] | undefined = await this.cache.get(`tasks:${clientId}`)
    if (cachedTasks) {
      return cachedTasks;
    }
    const target = await this.taskRepo.findBy({relatedClientId: clientId});
    if (!target) {
      throw new NotFoundException(`TaskEntities with client id ${clientId} not found`);
    }
    await this.cache.set(`tasks:${clientId}`, target);
    return target;
  }

  async findByLeadId(leadId: string): Promise<TaskEntity[]> {
    const cachedTasks: TaskEntity[] | undefined = await this.cache.get(`tasks:${leadId}`)
    if (cachedTasks) {
      return cachedTasks;
    }
    const target = await this.taskRepo.findBy({relatedLeadId: leadId});
    if (!target) {
      throw new NotFoundException(`TaskEntities with lead id ${leadId} not found`);
    }
    await this.cache.set(`tasks:${leadId}`, target);
    return target;
  }

  async findByDealId(dealId: string): Promise<TaskEntity[]> {
    const cachedTasks: TaskEntity[] | undefined = await this.cache.get(`tasks:${dealId}`)
    if (cachedTasks) {
      return cachedTasks;
    }
    const target = await this.taskRepo.findBy({relatedDealId: dealId});
    if (!target) {
      throw new NotFoundException(`TaskEntities with deal id ${dealId} not found`);
    }
    await this.cache.set(`tasks:${dealId}`, target);
    return target;
  }

  async findByPriority(priority: Priority): Promise<TaskEntity[]> {
    const cachedTasks: TaskEntity[] | undefined = await this.cache.get(`tasks:${priority}`)
    if (cachedTasks) {
      return cachedTasks;
    }
    const target = await this.taskRepo.findBy({priority});
    if (!target) {
      throw new NotFoundException(`TaskEntities with priority ${priority} not found`);
    }
    await this.cache.set(`tasks:${priority}`, target);
    return target;
  }

  async findByStatus(status: Status): Promise<TaskEntity[]> {
    const cachedTasks: TaskEntity[] | undefined = await this.cache.get(`tasks:${status}`)
    if (cachedTasks) {
      return cachedTasks;
    }
    const target = await this.taskRepo.findBy({status});
    if (!target) {
      throw new NotFoundException(`TaskEntities with status ${status} not found`);
    }
    await this.cache.set(`tasks:${status}`, target);
    return target;
  }

  async createOne(dto: CreateTaskDto): Promise<TaskEntity> {
    const task = await this.taskRepo.create(dto);
    await this.taskRepo.save(task);
    this.eventsClient.emit({cmd: 'events.microservice: createOne'}, {
      domain: "task",
      action: "created",
      actorId: dto.assigneeId,
      subjectId: task.id
    })
    return task;
  }

  async updateOne(dto: UpdateTaskDto): Promise<void> {
    const {id} = dto;
    const target = await this.findOne(id)
    if (!target) {
      throw new NotFoundException(`TaskEntity with id ${id} not found`);
    }
    this.eventsClient.emit({cmd: 'events.microservice: createOne'}, {
      domain: "task",
      action: "updated",
      actorId: dto.assigneeId,
      subjectId: target.id
    })
    await this.taskRepo.update(id, dto)
  }

  async updateStatus(dto: UpdateStatusDto): Promise<void> {
    const {id} = dto;
    const target = await this.findOne(id)
    if (!target) {
      throw new NotFoundException(`TaskEntity with id ${id} not found`);
    }
    await this.taskRepo.update(id, dto)
    this.eventsClient.emit({cmd: 'events.microservice: createOne'}, {
      domain: "task",
      action: "status_changed",
      actorId: "mock",
      subjectId: target.id
    })
  }

  async deleteOne(id: string): Promise<void> {
    const target = await this.findOne(id);
    if (!target) {
      throw new NotFoundException(`TaskEntity with id ${id} not found`);
    }
    this.eventsClient.emit({cmd: 'events.microservice: createOne'}, {
      domain: "task",
      action: "deleted",
      actorId: target.assigneeId,
      subjectId: target.id
    })
    await this.taskRepo.delete(id);
  }
}
