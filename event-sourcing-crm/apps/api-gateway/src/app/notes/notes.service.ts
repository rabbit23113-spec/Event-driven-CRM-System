import {Inject, Injectable} from '@nestjs/common';
import {RMQ_NOTES_CLIENT_ID} from "../constants/constants";
import {ClientProxy} from "@nestjs/microservices";
import {NoteDto} from "../dto/notes/note.dto";
import {CreateNoteDto} from "../dto/notes/create-note.dto";
import {UpdateNoteDto} from "../dto/notes/update-note.dto";
import {firstValueFrom} from "rxjs";

@Injectable()
export class NotesService {
  constructor(@Inject(RMQ_NOTES_CLIENT_ID) private readonly client: ClientProxy) {
  }

  async findAll(): Promise<NoteDto[]> {
    return await firstValueFrom(this.client.send({cmd: "notes.microservice: findAll"}, {}))
  }

  async findOne(id: string): Promise<NoteDto> {
    return await firstValueFrom(this.client.send({cmd: "notes.microservice: findOne"}, {id}))
  }

  async findByAuthorId(authorId: string): Promise<NoteDto[]> {
    return await firstValueFrom(this.client.send({cmd: "notes.microservice: findByAuthorId"}, {authorId}))
  }

  async findByClientId(clientId: string): Promise<NoteDto[]> {
    return await firstValueFrom(this.client.send({cmd: "notes.microservice: findByClientId"}, {clientId}))
  }

  async findByLeadId(leadId: string): Promise<NoteDto[]> {
    return await firstValueFrom(this.client.send({cmd: "notes.microservice: findByLeadId"}, {leadId}));
  }

  async findByDealId(dealId: string): Promise<NoteDto[]> {
    return await firstValueFrom(this.client.send({cmd: "notes.microservice: findByDealId"}, {dealId}))
  }

  async createOne(dto: CreateNoteDto, actorId: string): Promise<NoteDto> {
    return await firstValueFrom(this.client.send({cmd: "notes.microservice: createOne"}, {dto, actorId}))
  }

  async updateOne(dto: UpdateNoteDto, actorId: string): Promise<void> {
    this.client.emit({cmd: "notes.microservice: updateOne"}, {dto, actorId})
  }

  async deleteOne(id: string, actorId: string): Promise<void> {
    this.client.emit({cmd: "notes.microservice: deleteOne"}, {id, actorId})
  }
}
