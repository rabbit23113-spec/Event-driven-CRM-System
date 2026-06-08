import {ApiProperty} from "@nestjs/swagger";

export enum Status {
  NEW = "new",
  CONNECTED = "connected",
  QUALIFIED = "qualified",
  CONVERTED = "converted",
  REJECTED = "rejected",
}

export class LeadDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  source: string;

  @ApiProperty({enum: Status})
  status: Status;

  @ApiProperty()
  ownerId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
