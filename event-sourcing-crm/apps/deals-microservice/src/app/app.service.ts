import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {DealEntity, Status} from "./entities/deal.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {RMQ_EVENTS_CLIENT_ID} from "./constants/constants";
import {Repository} from "typeorm";
import {CreateDealDto} from "./dto/create-deal.dto";
import {UpdateDealDto} from "./dto/update-deal.dto";
import type {Cache} from "cache-manager";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {UpdateStatusDto} from "./dto/update-status.dto";

@Injectable()
export class AppService {
  constructor(@InjectRepository(DealEntity) private readonly dealRepo: Repository<DealEntity>,
              @Inject(RMQ_EVENTS_CLIENT_ID) private readonly eventsClient: ClientProxy,
              @Inject(CACHE_MANAGER) private readonly cache: Cache
  ) {
  }

  async findAll(): Promise<DealEntity[]> {
    const cachedDeals: DealEntity[] | undefined = await this.cache.get("deals:all")
    if (cachedDeals) {
      return cachedDeals;
    }
    const result = await this.dealRepo.find();
    await this.cache.set("deals:all", result);
    return result;
  }

  async findOne(id: string): Promise<DealEntity> {
    const target = await this.dealRepo.findOneBy({id})
    if (!target) {
      throw new NotFoundException(`DealEntity with id ${id} not found`);
    }
    return target;
  }

  async findByStatus(status: Status): Promise<DealEntity[]> {
    const cachedDeal: DealEntity[] | undefined = await this.cache.get(`deals:${status}`);
    if (cachedDeal) {
      return cachedDeal
    }
    const result = await this.dealRepo.findBy({status});
    await this.cache.set(`deals:${status}`, result);
    return result;
  }

  async createOne(dto: CreateDealDto, actorId: string): Promise<DealEntity> {
    const deal = await this.dealRepo.create(dto);
    await this.dealRepo.save(deal);
    this.eventsClient.emit({cmd: 'events.microservice: createOne'}, {
      domain: "deal",
      action: "created",
      actorId,
      subjectId: deal.id
    })
    return deal;
  }

  async updateOne(dto: UpdateDealDto, actorId: string): Promise<void> {
    const {id, title, value, status, clientId, ownerId} = dto;
    const target = await this.findOne(id)
    if (!target) {
      throw new NotFoundException(`DealEntity with id ${id} not found`);
    }
    this.eventsClient.emit({cmd: 'events.microservice: createOne'}, {
      domain: "deal",
      action: "updated",
      actorId,
      subjectId: target.id
    })
    await this.dealRepo.update(id, {title, value, status, clientId, ownerId});
  }

  async updateStatus(dto: UpdateStatusDto, actorId: string): Promise<void> {
    const {id} = dto;
    const target = await this.findOne(id)
    if (!target) {
      throw new NotFoundException(`DealEntity with id ${id} not found`);
    }
    await this.dealRepo.update(id, dto)
    this.eventsClient.emit({cmd: 'events.microservice: createOne'}, {
      domain: "deal",
      action: "status_changed",
      actorId,
      subjectId: target.id
    })
  }

  async deleteOne(id: string, actorId: string): Promise<void> {
    const target = await this.findOne(id);
    if (!target) {
      throw new NotFoundException(`DealEntity with id ${id} not found`);
    }
    this.eventsClient.emit({cmd: 'events.microservice: createOne'}, {
      domain: "deal",
      action: "deleted",
      actorId,
      subjectId: target.id
    })
    await this.dealRepo.delete(id);
  }
}
