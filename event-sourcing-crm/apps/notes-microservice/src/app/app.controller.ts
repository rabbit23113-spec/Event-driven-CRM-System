import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {NoteEntity} from "./entities/note.entity";
import {CreateNoteDto} from "./dto/create-note.dto";
import {UpdateNoteDto} from "./dto/update-note.dto";
import {EventPattern, MessagePattern, Payload} from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern({cmd: "notes.microservice: findAll"})
  async findAll(): Promise<NoteEntity[]> {
    return await this.appService.findAll();
  }

  @MessagePattern({cmd: "notes.microservice: findOne"})
  async findOne(@Payload() payload: { id: string }): Promise<NoteEntity> {
    return await this.appService.findOne(payload.id);
  }

  @MessagePattern({cmd: "notes.microservice: findByAuthorId"})
  async findByAuthorId(@Payload() payload: { authorId: string }): Promise<NoteEntity[]> {
    return await this.appService.findByAuthorId(payload.authorId);
  }

  @MessagePattern({cmd: "notes.microservice: findByClientId"})
  async findByClientId(@Payload() payload: { clientId: string }): Promise<NoteEntity[]> {
    return await this.appService.findByClientId(payload.clientId);
  }

  @MessagePattern({cmd: "notes.microservice: findByLeadId"})
  async findByLeadId(@Payload() payload: { leadId: string }): Promise<NoteEntity[]> {
    return await this.appService.findByLeadId(payload.leadId);
  }

  @MessagePattern({cmd: "notes.microservice: findByDealId"})
  async findByDealId(@Payload() payload: { dealId: string }): Promise<NoteEntity[]> {
    return await this.appService.findByDealId(payload.dealId);
  }

  @MessagePattern({cmd: "notes.microservice: createOne"})
  async createOne(@Payload() payload: { dto: CreateNoteDto, actorId: string }): Promise<NoteEntity> {
    return await this.appService.createOne(payload.dto, payload.actorId);
  }

  @EventPattern({cmd: "notes.microservice: updateOne"})
  async updateOne(@Payload() payload: { dto: UpdateNoteDto, actorId: string }): Promise<void> {
    return await this.appService.updateOne(payload.dto, payload.actorId);
  }

  @EventPattern({cmd: "notes.microservice: deleteOne"})
  async deleteOne(@Payload() payload: { id: string, actorId: string }): Promise<void> {
    return await this.appService.deleteOne(payload.id, payload.actorId);
  }
}
