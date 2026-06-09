import {Inject, Injectable} from '@nestjs/common';
import {RMQ_DEALS_CLIENT_ID} from "../constants/constants";
import {ClientProxy} from "@nestjs/microservices";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import type {Cache} from "cache-manager";
import {firstValueFrom} from "rxjs";
import {CreateDealDto} from "../dto/deals/create-deal.dto";
import {DealDto, Status} from "../dto/deals/deal.dto";
import {UpdateDealDto} from "../dto/deals/update-deal.dto";

@Injectable()
export class DealsService {
  constructor(@Inject(RMQ_DEALS_CLIENT_ID) private readonly client: ClientProxy, @Inject(CACHE_MANAGER) private readonly cache: Cache) {
  }

  async findAll(): Promise<DealDto[]> {
    const cachedLeads: DealDto[] | undefined = await this.cache.get("deals:all")
    if (cachedLeads) {
      return cachedLeads;
    }
    const deals = await firstValueFrom(this.client.send({cmd: "deals.microservice: findAll"}, {}))
    await this.cache.set("deals:all", deals);
    return deals;
  }

  async findOne(id: string): Promise<DealDto> {
    const cachedLead: DealDto | undefined = await this.cache.get(`deals:${id}`);
    if (cachedLead) {
      return cachedLead
    }
    const lead = await firstValueFrom(this.client.send({cmd: "deals.microservice: findOne"}, {id}))
    await this.cache.set(`deals:${id}`, lead);
    return lead
  }

  async findByStatus(status: Status): Promise<DealDto[]> {
    const cachedLeads: DealDto[] | undefined = await this.cache.get(`deals:${status}`);
    if (cachedLeads) {
      return cachedLeads;
    }
    const deals = await firstValueFrom(this.client.send({cmd: "deals.microservice: findByStatus"}, {status}))
    await this.cache.set(`deals:${status}`, deals);
    return deals
  }

  async createOne(dto: CreateDealDto): Promise<DealDto> {
    return await firstValueFrom(this.client.send({cmd: "deals.microservice: createOne"}, {dto}))
  }

  async updateOne(dto: UpdateDealDto): Promise<void> {
    return await firstValueFrom(this.client.emit({cmd: "deals.microservice: updateOne"}, {dto}))
  }

  async deleteOne(id: string): Promise<void> {
    return await firstValueFrom(this.client.emit({cmd: "deals.microservice: deleteOne"}, {id}))
  }
}
