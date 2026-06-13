import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {Priority, Status, TaskEntity} from "./entities/task.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {
  RMQ_CLIENTS_CLIENT_ID,
  RMQ_DEALS_CLIENT_ID,
  RMQ_EVENTS_CLIENT_ID, RMQ_LEADS_CLIENT_ID,
  RMQ_USERS_CLIENT_ID
} from "./constants/constants";
import {UpdateTaskDto} from "./dto/update-task.dto";
import {CreateTaskDto} from "./dto/create-task.dto";
import type {Cache} from "cache-manager";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {UpdateStatusDto} from "./dto/update-status.dto";
import {firstValueFrom} from "rxjs";

@Injectable()
export class AppService {
  constructor(@InjectRepository(TaskEntity) private readonly taskRepo: Repository<TaskEntity>,
              @Inject(RMQ_EVENTS_CLIENT_ID) private readonly eventsClient: ClientProxy,
              @Inject(CACHE_MANAGER) private readonly cache: Cache,
              @Inject(RMQ_USERS_CLIENT_ID) private readonly usersClient: ClientProxy,
              @Inject(RMQ_CLIENTS_CLIENT_ID) private readonly clientsClient: ClientProxy,
              @Inject(RMQ_LEADS_CLIENT_ID) private readonly leadsClient: ClientProxy,
              @Inject(RMQ_DEALS_CLIENT_ID) private readonly dealsClient: ClientProxy,
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

  async findByClientId(relatedClientId: string): Promise<TaskEntity[]> {
    const cachedTasks: TaskEntity[] | undefined = await this.cache.get(`tasks:${relatedClientId}`)
    if (cachedTasks) {
      return cachedTasks;
    }
    const target = await this.taskRepo.findBy({relatedClientId: relatedClientId});
    if (!target) {
      throw new NotFoundException(`TaskEntities with client id ${relatedClientId} not found`);
    }
    await this.cache.set(`tasks:${relatedClientId}`, target);
    return target;
  }

  async findByLeadId(relatedLeadId: string): Promise<TaskEntity[]> {
    const cachedTasks: TaskEntity[] | undefined = await this.cache.get(`tasks:${relatedLeadId}`)
    if (cachedTasks) {
      return cachedTasks;
    }
    const target = await this.taskRepo.findBy({relatedLeadId: relatedLeadId});
    if (!target) {
      throw new NotFoundException(`TaskEntities with lead id ${relatedLeadId} not found`);
    }
    await this.cache.set(`tasks:${relatedLeadId}`, target);
    return target;
  }

  async findByDealId(relatedDealId: string): Promise<TaskEntity[]> {
    const cachedTasks: TaskEntity[] | undefined = await this.cache.get(`tasks:${relatedDealId}`)
    if (cachedTasks) {
      return cachedTasks;
    }
    const target = await this.taskRepo.findBy({relatedDealId: relatedDealId});
    if (!target) {
      throw new NotFoundException(`TaskEntities with deal id ${relatedDealId} not found`);
    }
    await this.cache.set(`tasks:${relatedDealId}`, target);
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

  async createOne(dto: CreateTaskDto, actorId: string): Promise<TaskEntity> {
    const {assigneeId, relatedClientId, relatedLeadId, relatedDealId} = dto;
    if (assigneeId) {
      const user = await firstValueFrom(this.usersClient.send({cmd: "users.microservice: findOne"}, {id: assigneeId}));
      if (!user) {
        throw new NotFoundException(`User with id ${assigneeId} not found`);
      }
    }
    if (relatedClientId) {
      const client = await firstValueFrom(this.clientsClient.send({cmd: "clients.microservice: findOne"}, {id: relatedClientId}));
      if (!client) {
        throw new NotFoundException(`Client with id ${relatedClientId} not found`);
      }
    }
    if (relatedLeadId) {
      const lead = await firstValueFrom(this.leadsClient.send({cmd: "leads.microservice: findOne"}, {id: relatedLeadId}));
      if (!lead) {
        throw new NotFoundException(`Lead with id ${relatedLeadId} not found`);
      }
    }
    if (relatedDealId) {
      const deal = await firstValueFrom(this.dealsClient.send({cmd: "deals.microservice: findOne"}, {id: relatedDealId}));
      if (!deal) {
        throw new NotFoundException(`Deal with id ${relatedDealId} not found`);
      }
    }
    const task = await this.taskRepo.create(dto);
    await this.taskRepo.save(task);
    this.eventsClient.emit({cmd: 'events.microservice: createOne'}, {
      domain: "task",
      action: "created",
      actorId,
      subjectId: task.id,
    })
    return task;
  }

  async updateOne(dto: UpdateTaskDto, actorId: string): Promise<void> {
    const {id, assigneeId, relatedClientId, relatedLeadId, relatedDealId} = dto;
    if (assigneeId) {
      const user = await firstValueFrom(this.usersClient.send({cmd: "users.microservice: findOne"}, {id: assigneeId}));
      if (!user) {
        throw new NotFoundException(`User with id ${assigneeId} not found`);
      }
    }
    if (relatedClientId) {
      const client = await firstValueFrom(this.clientsClient.send({cmd: "clients.microservice: findOne"}, {id: relatedClientId}));
      if (!client) {
        throw new NotFoundException(`Client with id ${relatedClientId} not found`);
      }
    }
    if (relatedLeadId) {
      const lead = await firstValueFrom(this.leadsClient.send({cmd: "leads.microservice: findOne"}, {id: relatedLeadId}));
      if (!lead) {
        throw new NotFoundException(`Lead with id ${relatedLeadId} not found`);
      }
    }
    if (relatedDealId) {
      const deal = await firstValueFrom(this.dealsClient.send({cmd: "deals.microservice: findOne"}, {id: relatedDealId}));
      if (!deal) {
        throw new NotFoundException(`Deal with id ${relatedDealId} not found`);
      }
    }
    const target = await this.findOne(id)
    if (!target) {
      throw new NotFoundException(`TaskEntity with id ${id} not found`);
    }
    this.eventsClient.emit({cmd: 'events.microservice: createOne'}, {
      domain: "task",
      action: "updated",
      actorId,
      subjectId: target.id,
    })
    await this.taskRepo.update(id, dto)
  }

  async updateStatus(dto: UpdateStatusDto, actorId: string): Promise<void> {
    const {id} = dto;
    const target = await this.findOne(id)
    if (!target) {
      throw new NotFoundException(`TaskEntity with id ${id} not found`);
    }
    await this.taskRepo.update(id, dto)
    this.eventsClient.emit({cmd: 'events.microservice: createOne'}, {
      domain: "task",
      action: "status_changed",
      actorId,
      subjectId: target.id,
    })
  }

  async deleteOne(id: string, actorId: string): Promise<void> {
    const target = await this.findOne(id);
    if (!target) {
      throw new NotFoundException(`TaskEntity with id ${id} not found`);
    }
    this.eventsClient.emit({cmd: 'events.microservice: createOne'}, {
      domain: "task",
      action: "deleted",
      actorId,
      subjectId: target.id,
    })
    await this.taskRepo.delete(id);
  }
}
