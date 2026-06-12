import {Inject, Injectable} from '@nestjs/common';
import {RMQ_DEALS_CLIENT_ID} from "../constants/constants";
import {ClientProxy} from "@nestjs/microservices";
import {firstValueFrom} from "rxjs";
import {CreateDealDto} from "../dto/deals/create-deal.dto";
import {DealDto, Status} from "../dto/deals/deal.dto";
import {UpdateDealDto} from "../dto/deals/update-deal.dto";
import {UpdateStatusDto} from "../dto/deals/update-status.dto";

@Injectable()
export class DealsService {
  constructor(@Inject(RMQ_DEALS_CLIENT_ID) private readonly client: ClientProxy) {
  }

  async findAll(): Promise<DealDto[]> {
    return await firstValueFrom(this.client.send({cmd: "deals.microservice: findAll"}, {}))
  }

  async findOne(id: string): Promise<DealDto> {
    return await firstValueFrom(this.client.send({cmd: "deals.microservice: findOne"}, {id}))
  }

  async findByStatus(status: Status): Promise<DealDto[]> {
    return await firstValueFrom(this.client.send({cmd: "deals.microservice: findByStatus"}, {status}))
  }

  async createOne(dto: CreateDealDto): Promise<DealDto> {
    return await firstValueFrom(this.client.send({cmd: "deals.microservice: createOne"}, {dto}))
  }

  async updateOne(dto: UpdateDealDto): Promise<void> {
    return await firstValueFrom(this.client.emit({cmd: "deals.microservice: updateOne"}, {dto}))
  }

  async updateStatus(dto: UpdateStatusDto): Promise<void> {
    return await firstValueFrom(this.client.emit({cmd: "deals.microservice: updateStatus"}, {dto}))
  }

  async deleteOne(id: string): Promise<void> {
    return await firstValueFrom(this.client.emit({cmd: "deals.microservice: deleteOne"}, {id}))
  }
}
