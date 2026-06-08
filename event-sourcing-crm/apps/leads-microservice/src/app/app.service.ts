import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {LeadEntity, Status} from "./entities/lead.entity";
import {Repository} from "typeorm";
import {CreateLeadDto} from "./dto/create-lead.dto";
import {UpdateLeadDto} from "./dto/update-lead.dto";
import {RMQ_EVENTS_CLIENT_ID} from "./constants/constants";
import {ClientProxy} from "@nestjs/microservices";

@Injectable()
export class AppService {
  constructor(@InjectRepository(LeadEntity) private readonly leadRepo: Repository<LeadEntity>, @Inject(RMQ_EVENTS_CLIENT_ID) private readonly eventsClient: ClientProxy) {
  }

  async findAll(): Promise<LeadEntity[]> {
    return await this.leadRepo.find();
  }

  async findOne(id: string): Promise<LeadEntity> {
    const target = await this.leadRepo.findOneBy({id})
    if (!target) {
      throw new NotFoundException(`LeadEntity with id ${id} not found`);
    }
    return target;
  }

  async findByStatus(status: Status): Promise<LeadEntity[]> {
    return await this.leadRepo.findBy({status});
  }

  async findOneByName(name: string): Promise<LeadEntity> {
    const target = await this.leadRepo.findOneBy({name});
    if (!target) {
      throw new NotFoundException(`LeadEntity with name ${name} not found`);
    }
    return target;
  }

  async createOne(dto: CreateLeadDto): Promise<LeadEntity> {
    const lead = await this.leadRepo.create(dto);
    await this.leadRepo.save(lead);
    this.eventsClient.send({ cmd: 'events.microservice: createOne' }, { domain: "lead", action: "created", actorId: dto.ownerId })
    return lead;
  }

  async updateOne(dto: UpdateLeadDto): Promise<void> {
    const {id, name, email, phone, status, source, ownerId} = dto;
    const target = await this.findOne(id)
    if (!target) {
      throw new NotFoundException(`LeadEntity with id ${id} not found`);
    }
    this.eventsClient.send({ cmd: 'events.microservice: createOne' }, { domain: "lead", action: "updated", actorId: dto.ownerId })
    await this.leadRepo.update(id, {name, email, phone, status, source, ownerId});
  }

  async deleteOne(id: string): Promise<void> {
    const target = await this.findOne(id);
    if (!target) {
      throw new NotFoundException(`LeadEntity with id ${id} not found`);
    }
    this.eventsClient.send({ cmd: 'events.microservice: createOne' }, { domain: "lead", action: "deleted", actorId: target.ownerId })
    await this.leadRepo.delete(id);
  }
}
