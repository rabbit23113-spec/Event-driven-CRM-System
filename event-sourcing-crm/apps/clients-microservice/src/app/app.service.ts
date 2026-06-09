import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ClientEntity} from "./entities/client.entity";
import {RMQ_EVENTS_CLIENT_ID} from "./constants/constants";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateClientDto} from "./dto/create-client.dto";
import {UpdateClientDto} from "./dto/update-client.dto";

@Injectable()
export class AppService {
  constructor(@InjectRepository(ClientEntity) private readonly leadRepo: Repository<ClientEntity>, @Inject(RMQ_EVENTS_CLIENT_ID) private readonly eventsClient: ClientProxy) {
  }

  async findAll(): Promise<ClientEntity[]> {
    return await this.leadRepo.find();
  }

  async findOne(id: string): Promise<ClientEntity> {
    const target = await this.leadRepo.findOneBy({id})
    if (!target) {
      throw new NotFoundException(`ClientEntity with id ${id} not found`);
    }
    return target;
  }

  async findByCompanyName(companyName: string): Promise<ClientEntity[]> {
    return await this.leadRepo.findBy({companyName});
  }

  async findOneByName(name: string): Promise<ClientEntity> {
    const target = await this.leadRepo.findOneBy({name});
    if (!target) {
      throw new NotFoundException(`ClientEntity with name ${name} not found`);
    }
    return target;
  }

  async createOne(dto: CreateClientDto): Promise<ClientEntity> {
    const lead = await this.leadRepo.create(dto);
    await this.leadRepo.save(lead);
    this.eventsClient.send({ cmd: 'events.microservice: createOne' }, { domain: "client", action: "created", actorId: dto.ownerId, subjectId: lead.id })
    return lead;
  }

  async updateOne(dto: UpdateClientDto): Promise<void> {
    const {id, name, email, phone, companyName, ownerId} = dto;
    const target = await this.findOne(id)
    if (!target) {
      throw new NotFoundException(`ClientEntity with id ${id} not found`);
    }
    this.eventsClient.send({ cmd: 'events.microservice: createOne' }, { domain: "client", action: "updated", actorId: dto.ownerId, subjectId: target.id })
    await this.leadRepo.update(id, {name, email, phone, companyName, ownerId});
  }

  async deleteOne(id: string): Promise<void> {
    const target = await this.findOne(id);
    if (!target) {
      throw new NotFoundException(`ClientEntity with id ${id} not found`);
    }
    this.eventsClient.send({ cmd: 'events.microservice: createOne' }, { domain: "client", action: "deleted", actorId: target.ownerId, subjectId: target.id })
    await this.leadRepo.delete(id);
  }
}
