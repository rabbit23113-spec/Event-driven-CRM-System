import {Action, Domain} from "./create-event.dto";
import {ApiProperty} from "@nestjs/swagger";

export class EventDto {
  @ApiProperty()
  id: string;
  @ApiProperty({enum: Domain})
  domain: Domain;
  @ApiProperty({enum: Action})
  action: Action;
  @ApiProperty()
  actorId: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
