import {Status} from "../entities/deal.entity";

export class CreateDealDto {
  title: string;
  value: number;
  status: Status;
  clientId: string;
  ownerId: string;
}
