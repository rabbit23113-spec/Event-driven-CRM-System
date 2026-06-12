import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ClientEntity} from "./entities/client.entity";
import {RMQ_EVENTS_CLIENT_ID} from "./constants/constants";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateClientDto} from "./dto/create-client.dto";
import {UpdateClientDto} from "./dto/update-client.dto";
import type {Cache} from "cache-manager";
import {CACHE_MANAGER} from "@nestjs/cache-manager";

@Injectable()
export class AppService {
  constructor(@InjectRepository(ClientEntity) private readonly clientRepo: Repository<ClientEntity>,
              @Inject(RMQ_EVENTS_CLIENT_ID) private readonly eventsClient: ClientProxy,
              @Inject(CACHE_MANAGER) private readonly cache: Cache
  ) {
  }

  async findAll(): Promise<ClientEntity[]> {
    const cachedClients: ClientEntity[] | undefined = await this.cache.get("clients:all")
    if (cachedClients) {
      return cachedClients;
    }
    const result = await this.clientRepo.find();
    await this.cache.set("clients:all", result);
    return result
  }

  async findOne(id: string): Promise<ClientEntity> {
    const cachedClient: ClientEntity | undefined = await this.cache.get(`clients:${id}`);
    if (cachedClient) {
      return cachedClient
    }
    const target = await this.clientRepo.findOneBy({id})
    if (!target) {
      throw new NotFoundException(`ClientEntity with id ${id} not found`);
    }
    await this.cache.set(`clients:${id}`, cachedClient);
    return target;
  }

  async findByCompanyName(companyName: string): Promise<ClientEntity[]> {
    const cachedClients: ClientEntity[] | undefined = await this.cache.get(`clients:${companyName}`);
    if (cachedClients) {
      return cachedClients;
    }
    const result = await this.clientRepo.findBy({companyName});
    await this.cache.set(`clients:${companyName}`, result);
    return result
  }

  async findOneByName(name: string): Promise<ClientEntity> {
    const cachedClient: ClientEntity | undefined = await this.cache.get(`clients:${name}`);
    if (cachedClient) {
      return cachedClient
    }
    const target = await this.clientRepo.findOneBy({name});
    if (!target) {
      throw new NotFoundException(`ClientEntity with name ${name} not found`);
    }
    await this.cache.set(`clients:${name}`, cachedClient);
    return target;
  }

  async createOne(dto: CreateClientDto, actorId: string): Promise<ClientEntity> {
    const client = await this.clientRepo.create(dto);
    await this.clientRepo.save(client);
    this.eventsClient.emit({cmd: 'events.microservice: createOne'}, {
      domain: "client",
      action: "created",
      actorId,
      subjectId: client.id
    })
    return client;
  }

  async updateOne(dto: UpdateClientDto, actorId: string): Promise<void> {
    const {id, name, email, phone, companyName, ownerId} = dto;
    const target = await this.findOne(id)
    if (!target) {
      throw new NotFoundException(`ClientEntity with id ${id} not found`);
    }
    this.eventsClient.emit({cmd: 'events.microservice: createOne'}, {
      domain: "client",
      action: "updated",
      actorId,
      subjectId: target.id
    })
    await this.clientRepo.update(id, {name, email, phone, companyName, ownerId});
  }

  async deleteOne(id: string, actorId: string): Promise<void> {
    const target = await this.findOne(id);
    if (!target) {
      throw new NotFoundException(`ClientEntity with id ${id} not found`);
    }
    this.eventsClient.emit({cmd: 'events.microservice: createOne'}, {
      domain: "client",
      action: "deleted",
      actorId,
      subjectId: target.id
    })
    await this.clientRepo.delete(id);
  }
}
