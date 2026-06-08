import {Inject, Injectable} from '@nestjs/common';
import {RMQ_LEADS_CLIENT_ID} from "../constants/constants";
import {ClientProxy} from "@nestjs/microservices";
import {LeadDto, Status} from "../dto/leads/lead.dto";
import {firstValueFrom} from "rxjs";
import {CreateLeadDto} from "../dto/leads/create-lead.dto";
import {UpdateLeadDto} from "../dto/leads/update-lead.dto";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import type {Cache} from "cache-manager";

@Injectable()
export class LeadsService {
  constructor(@Inject(RMQ_LEADS_CLIENT_ID) private readonly client: ClientProxy, @Inject(CACHE_MANAGER) private readonly cache: Cache) {
  }

  async findAll(): Promise<LeadDto[]> {
    const cachedLeads: LeadDto[] | undefined = await this.cache.get("leads:all")
    if (cachedLeads) {
      return cachedLeads;
    }
    const leads = await firstValueFrom(this.client.send({cmd: "leads.microservice: findAll"}, {}))
    await this.cache.set("leads:all", leads);
    return leads;
  }

  async findOne(id: string): Promise<LeadDto> {
    const cachedLead: LeadDto | undefined = await this.cache.get(`leads:${id}`);
    if (cachedLead) {
      return cachedLead
    }
    const lead = await firstValueFrom(this.client.send({cmd: "leads.microservice: findOne"}, {id}))
    await this.cache.set(`leads:${id}`, lead);
    return lead
  }

  async findByStatus(status: Status): Promise<LeadDto[]> {
    const cachedLeads: LeadDto[] | undefined = await this.cache.get(`leads:${status}`);
    if (cachedLeads) {
      return cachedLeads;
    }
    const leads = await firstValueFrom(this.client.send({cmd: "leads.microservice: findByStatus"}, {status}))
    await this.cache.set(`leads:${status}`, leads);
    return leads
  }

  async findOneByName(name: string): Promise<LeadDto> {
    const cachedLead: LeadDto | undefined = await this.cache.get(`leads:${name}`);
    if (cachedLead) {
      return cachedLead
    }
    const lead = await firstValueFrom(this.client.send({cmd: "leads.microservice: findOneByName"}, {name}))
    await this.cache.set(`leads:${name}`, lead);
    return lead
  }

  async createOne(dto: CreateLeadDto): Promise<LeadDto> {
    return await firstValueFrom(this.client.send({cmd: "leads.microservice: createOne"}, {dto}))
  }

  async updateOne(dto: UpdateLeadDto): Promise<void> {
    return await firstValueFrom(this.client.emit({cmd: "leads.microservice: updateOne"}, {dto}))
  }

  async deleteOne(id: string): Promise<void> {
    return await firstValueFrom(this.client.emit({cmd: "leads.microservice: deleteOne"}, {id}))
  }
}
