import {Status} from "./deal.entity";

export class UpdateDealDto {
  id: string;
  title?: string;
  value?: number;
  status?: Status;
  clientId?: string;
  ownerId?: string;
}
