import {Inject, Injectable} from '@nestjs/common';
import {RMQ_LEADS_CLIENT_ID} from "../constants/constants";
import {ClientProxy} from "@nestjs/microservices";
import {LeadDto, Status} from "../dto/leads/lead.dto";
import {firstValueFrom} from "rxjs";
import {CreateLeadDto} from "../dto/leads/create-lead.dto";
import {UpdateLeadDto} from "../dto/leads/update-lead.dto";
import {UpdateStatusDto} from "../dto/leads/update-status.dto";

@Injectable()
export class LeadsService {
  constructor(@Inject(RMQ_LEADS_CLIENT_ID) private readonly client: ClientProxy) {
  }

  async findAll(): Promise<LeadDto[]> {
    return await firstValueFrom(this.client.send({cmd: "leads.microservice: findAll"}, {}))
  }

  async findOne(id: string): Promise<LeadDto> {
    return await firstValueFrom(this.client.send({cmd: "leads.microservice: findOne"}, {id}))
  }

  async findByStatus(status: Status): Promise<LeadDto[]> {
    return await firstValueFrom(this.client.send({cmd: "leads.microservice: findByStatus"}, {status}))
  }

  async findOneByName(name: string): Promise<LeadDto> {
    return await firstValueFrom(this.client.send({cmd: "leads.microservice: findOneByName"}, {name}))
  }

  async createOne(dto: CreateLeadDto, actorId: string): Promise<LeadDto> {
    return await firstValueFrom(this.client.send({cmd: "leads.microservice: createOne"}, {dto, actorId}))
  }

  async updateOne(dto: UpdateLeadDto, actorId: string): Promise<void> {
    this.client.emit({cmd: "leads.microservice: updateOne"}, {dto, actorId})
  }

  async updateStatus(dto: UpdateStatusDto, actorId: string): Promise<void> {
    this.client.emit({cmd: "leads.microservice: updateStatus"}, {dto, actorId})
  }

  async deleteOne(id: string, actorId: string): Promise<void> {
    this.client.emit({cmd: "leads.microservice: deleteOne"}, {id, actorId})
  }
}
