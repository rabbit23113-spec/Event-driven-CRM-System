import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {DealEntity, Status} from "./entities/deal.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {RMQ_EVENTS_CLIENT_ID} from "./constants/constants";
import {Repository} from "typeorm";
import {CreateDealDto} from "./dto/create-deal.dto";
import {UpdateDealDto} from "./entities/update-deal.dto";

@Injectable()
export class AppService {
  constructor(@InjectRepository(DealEntity) private readonly dealRepo: Repository<DealEntity>, @Inject(RMQ_EVENTS_CLIENT_ID) private readonly eventsClient: ClientProxy) {
  }

  async findAll(): Promise<DealEntity[]> {
    return await this.dealRepo.find();
  }

  async findOne(id: string): Promise<DealEntity> {
    const target = await this.dealRepo.findOneBy({id})
    if (!target) {
      throw new NotFoundException(`DealEntity with id ${id} not found`);
    }
    return target;
  }

  async findByStatus(status: Status): Promise<DealEntity[]> {
    return await this.dealRepo.findBy({status});
  }

  async createOne(dto: CreateDealDto): Promise<DealEntity> {
    const deal = await this.dealRepo.create(dto);
    await this.dealRepo.save(deal);
    this.eventsClient.send({ cmd: 'events.microservice: createOne' }, { domain: "deal", action: "created", actorId: dto.ownerId, subjectId: deal.id })
    return deal;
  }

  async updateOne(dto: UpdateDealDto): Promise<void> {
    const {id, title, value, status, clientId, ownerId} = dto;
    const target = await this.findOne(id)
    if (!target) {
      throw new NotFoundException(`DealEntity with id ${id} not found`);
    }
    this.eventsClient.send({ cmd: 'events.microservice: createOne' }, { domain: "deal", action: "updated", actorId: dto.ownerId, subjectId: target.id })
    await this.dealRepo.update(id, {title, value, status, clientId, ownerId});
  }

  async deleteOne(id: string): Promise<void> {
    const target = await this.findOne(id);
    if (!target) {
      throw new NotFoundException(`DealEntity with id ${id} not found`);
    }
    this.eventsClient.send({ cmd: 'events.microservice: createOne' }, { domain: "deal", action: "deleted", actorId: target.ownerId, subjectId: target.id })
    await this.dealRepo.delete(id);
  }
}
