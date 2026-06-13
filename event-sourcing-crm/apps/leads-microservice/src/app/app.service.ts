import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {LeadEntity, Status} from "./entities/lead.entity";
import {Repository} from "typeorm";
import {CreateLeadDto} from "./dto/create-lead.dto";
import {UpdateLeadDto} from "./dto/update-lead.dto";
import {RMQ_EVENTS_CLIENT_ID} from "./constants/constants";
import {ClientProxy} from "@nestjs/microservices";
import type {Cache} from "cache-manager";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {UpdateStatusDto} from "./dto/update-status.dto";
import {RMQ_USERS_CLIENT_ID} from "./constants/constants";
import {firstValueFrom} from "rxjs";

@Injectable()
export class AppService {
  constructor(@InjectRepository(LeadEntity) private readonly leadRepo: Repository<LeadEntity>,
              @Inject(RMQ_EVENTS_CLIENT_ID) private readonly eventsClient: ClientProxy,
              @Inject(CACHE_MANAGER) private readonly cache: Cache,
              @Inject(RMQ_USERS_CLIENT_ID) private readonly usersClient: ClientProxy,

  ) {
  }

  async findAll(): Promise<LeadEntity[]> {
    const cachedLeads: LeadEntity[] | undefined = await this.cache.get("leads:all")
    if (cachedLeads) {
      return cachedLeads;
    }
    const result = await this.leadRepo.find();
    await this.cache.set("leads:all", result);
    return result;
  }

  async findOne(id: string): Promise<LeadEntity> {
    const cachedLead: LeadEntity | undefined = await this.cache.get(`leads:${id}`);
    if (cachedLead) {
      return cachedLead
    }
    const target = await this.leadRepo.findOneBy({id})
    if (!target) {
      throw new NotFoundException(`LeadEntity with id ${id} not found`);
    }
    await this.cache.set(`leads:${id}`, target);
    return target;
  }

  async findByStatus(status: Status): Promise<LeadEntity[]> {
    const cachedLeads: LeadEntity[] | undefined = await this.cache.get(`leads:${status}`);
    if (cachedLeads) {
      return cachedLeads;
    }
    const result = await this.leadRepo.findBy({status});
    await this.cache.set(`leads:${status}`, result);
    return result;
  }

  async findOneByName(name: string): Promise<LeadEntity> {
    const cachedLead: LeadEntity | undefined = await this.cache.get(`leads:${name}`);
    if (cachedLead) {
      return cachedLead
    }
    const target = await this.leadRepo.findOneBy({name});
    if (!target) {
      throw new NotFoundException(`LeadEntity with name ${name} not found`);
    }
    await this.cache.set(`leads:${name}`, target);
    return target;
  }

  async createOne(dto: CreateLeadDto, actorId: string): Promise<LeadEntity> {
    const user = await firstValueFrom(this.usersClient.send({cmd: "users.microservice: findOne"}, {id: dto.ownerId}))
    if (!user) {
      throw new NotFoundException("Incorrect owner id")
    }
    const lead = await this.leadRepo.create(dto);
    await this.leadRepo.save(lead);
    this.eventsClient.emit({cmd: 'events.microservice: createOne'}, {
      domain: "lead",
      action: "created",
      actorId,
      subjectId: lead.id
    })
    return lead;
  }

  async updateOne(dto: UpdateLeadDto, actorId: string): Promise<void> {
    const {id} = dto;
    const target = await this.findOne(id)
    if (!target) {
      throw new NotFoundException(`LeadEntity with id ${id} not found`);
    }
    if (dto.ownerId) {
      const user = await firstValueFrom(this.usersClient.send({cmd: "users.microservice: findOne"}, {id: dto.ownerId}))
      if (!user) {
        throw new NotFoundException("Incorrect owner id")
      }
    }
    this.eventsClient.emit({cmd: 'events.microservice: createOne'}, {
      domain: "lead",
      action: "updated",
      actorId,
      subjectId: target.id
    })
    await this.leadRepo.update(id, dto)
  }

  async updateStatus(dto: UpdateStatusDto, actorId: string): Promise<void> {
    const {id} = dto;
    const target = await this.findOne(id)
    if (!target) {
      throw new NotFoundException(`LeadEntity with id ${id} not found`);
    }
    this.eventsClient.emit({cmd: 'events.microservice: createOne'}, {
      domain: "lead",
      action: "status_changed",
      actorId,
      subjectId: target.id
    })
    await this.leadRepo.update(id, {status: dto.status});
  }

  async deleteOne(id: string, actorId: string): Promise<void> {
    const target = await this.findOne(id);
    if (!target) {
      throw new NotFoundException(`LeadEntity with id ${id} not found`);
    }
    this.eventsClient.emit({cmd: 'events.microservice: createOne'}, {
      domain: "lead",
      action: "deleted",
      actorId,
      subjectId: target.id
    })
    await this.leadRepo.delete(id);
  }
}
