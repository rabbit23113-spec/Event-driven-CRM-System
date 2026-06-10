import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {Priority, Status, TaskEntity} from "./entities/task.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {RMQ_EVENTS_CLIENT_ID} from "./constants/constants";
import {UpdateTaskDto} from "./dto/update-task.dto";
import {CreateTaskDto} from "./dto/create-task.dto";

@Injectable()
export class AppService {
  constructor(@InjectRepository(TaskEntity) private readonly taskRepo: Repository<TaskEntity>, @Inject(RMQ_EVENTS_CLIENT_ID) private readonly eventsClient: ClientProxy) {
  }

  async findAll(): Promise<TaskEntity[]> {
    return await this.taskRepo.find();
  }

  async findOne(id: string): Promise<TaskEntity> {
    const target = await this.taskRepo.findOneBy({id})
    if (!target) {
      throw new NotFoundException(`TaskEntity with id ${id} not found`);
    }
    return target;
  }

  async findByClientId(clientId: string): Promise<TaskEntity[]> {
    const target = await this.taskRepo.findBy({relatedClientId: clientId});
    if (!target) {
      throw new NotFoundException(`TaskEntities with client id ${clientId} not found`);
    }
    return target;
  }

  async findByLeadId(leadId: string): Promise<TaskEntity[]> {
    const target = await this.taskRepo.findBy({relatedLeadId: leadId});
    if (!target) {
      throw new NotFoundException(`TaskEntities with lead id ${leadId} not found`);
    }
    return target;
  }

  async findByDealId(dealId: string): Promise<TaskEntity[]> {
    const target = await this.taskRepo.findBy({relatedDealId: dealId});
    if (!target) {
      throw new NotFoundException(`TaskEntities with deal id ${dealId} not found`);
    }
    return target;
  }

  async findByPriority(priority: Priority): Promise<TaskEntity[]> {
    const target = await this.taskRepo.findBy({priority});
    if (!target) {
      throw new NotFoundException(`TaskEntities with priority ${priority} not found`);
    }
    return target;
  }

  async findByStatus(status: Status): Promise<TaskEntity[]> {
    const target = await this.taskRepo.findBy({status});
    if (!target) {
      throw new NotFoundException(`TaskEntities with status ${status} not found`);
    }
    return target;
  }

  async createOne(dto: CreateTaskDto): Promise<TaskEntity> {
    const task = await this.taskRepo.create(dto);
    await this.taskRepo.save(task);
    this.eventsClient.send({ cmd: 'events.microservice: createOne' }, { domain: "task", action: "created", actorId: dto.assigneeId, subjectId: task.id })
    return task;
  }

  async updateOne(dto: UpdateTaskDto): Promise<void> {
    const {id, title, description, status, priority, dueDate, assigneeId, relatedLeadId, relatedClientId, relatedDealId} = dto;
    const target = await this.findOne(id)
    if (!target) {
      throw new NotFoundException(`TaskEntity with id ${id} not found`);
    }
    this.eventsClient.send({ cmd: 'events.microservice: createOne' }, { domain: "task", action: "updated", actorId: dto.assigneeId, subjectId: target.id })
    await this.taskRepo.update(id, {title, description, status, priority, dueDate, assigneeId, relatedLeadId, relatedClientId, relatedDealId});
  }

  async deleteOne(id: string): Promise<void> {
    const target = await this.findOne(id);
    if (!target) {
      throw new NotFoundException(`TaskEntity with id ${id} not found`);
    }
    this.eventsClient.send({ cmd: 'events.microservice: createOne' }, { domain: "task", action: "deleted", actorId: target.assigneeId, subjectId: target.id })
    await this.taskRepo.delete(id);
  }
}
