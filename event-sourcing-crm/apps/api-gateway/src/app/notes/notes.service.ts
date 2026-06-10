import {Inject, Injectable} from '@nestjs/common';
import {RMQ_NOTES_CLIENT_ID} from "../constants/constants";
import {ClientProxy} from "@nestjs/microservices";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import type {Cache} from "cache-manager";
import {NoteDto} from "../dto/notes/note.dto";
import {CreateNoteDto} from "../dto/notes/create-note.dto";
import {UpdateNoteDto} from "../dto/notes/update-note.dto";
import {firstValueFrom} from "rxjs";

@Injectable()
export class NotesService {
  constructor(@Inject(RMQ_NOTES_CLIENT_ID) private readonly client: ClientProxy, @Inject(CACHE_MANAGER) private readonly cache: Cache) {
  }

  async findAll(): Promise<NoteDto[]> {
    const cachedNotes: NoteDto[] | undefined = await this.cache.get("notes:all")
    if (cachedNotes) {
      return cachedNotes
    }
    const response = await firstValueFrom(this.client.send({cmd: "notes.microservice: findAll"}, {}))
    await this.cache.set("notes:all", response)
    return response;
  }

  async findOne(id: string): Promise<NoteDto> {
    const cachedNote: NoteDto | undefined = await this.cache.get(`notes:${id}`);
    if (cachedNote) {
      return cachedNote;
    }
    const response = await firstValueFrom(this.client.send({cmd: "notes.microservice: findOne"}, {id}))
    await this.cache.set(`notes:${id}`, response)
    return response;
  }

  async findByAuthorId(authorId: string): Promise<NoteDto[]> {
    const cachedNotes: NoteDto[] | undefined = await this.cache.get(`notes:${authorId}`);
    if (cachedNotes) {
      return cachedNotes;
    }
    const response = await firstValueFrom(this.client.send({cmd: "notes.microservice: findByAuthorId"}, {authorId}))
    await this.cache.set(`notes:${authorId}`, response)
    return response;
  }

  async findByClientId(clientId: string): Promise<NoteDto[]> {
    const cachedNotes: NoteDto[] | undefined = await this.cache.get(`notes:${clientId}`);
    if (cachedNotes) {
      return cachedNotes;
    }
    const response = await firstValueFrom(this.client.send({cmd: "notes.microservice: findByClientId"}, {clientId}))
    await this.cache.set(`notes:${clientId}`, response)
    return response;
  }

  async findByLeadId(leadId: string): Promise<NoteDto[]> {
    const cachedNotes: NoteDto[] | undefined = await this.cache.get(`notes:${leadId}`);
    if (cachedNotes) {
      return cachedNotes;
    }
    const response = await firstValueFrom(this.client.send({cmd: "notes.microservice: findByLeadId"}, {leadId}));
    await this.cache.set(`notes:${leadId}`, response)
    return response;
  }

  async findByDealId(dealId: string): Promise<NoteDto[]> {
    const cachedNotes: NoteDto[] | undefined = await this.cache.get(`notes:${dealId}`);
    if (cachedNotes) {
      return cachedNotes;
    }
    const response = await firstValueFrom(this.client.send({cmd: "notes.microservice: findByDealId"}, {dealId}))
    await this.cache.set(`notes:${dealId}`, response)
    return response;
  }

  async createOne(dto: CreateNoteDto): Promise<NoteDto> {
    return await firstValueFrom(this.client.send({cmd: "notes.microservice: createOne"}, {dto}))
  }

  async updateOne(dto: UpdateNoteDto): Promise<void> {
    this.client.emit({cmd: "notes.microservice: updateOne"}, {dto})
  }

  async deleteOne(id: string): Promise<void> {
    this.client.emit({cmd: "notes.microservice: deleteOne"}, {id})
  }
}
