import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {CreateNoteDto} from "./dto/create-note.dto";
import {UpdateNoteDto} from "./dto/update-note.dto";
import {NoteEntity} from "./entities/note.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {RMQ_EVENTS_CLIENT_ID} from "./constants/constants";
import type {Cache} from "cache-manager";
import {CACHE_MANAGER} from "@nestjs/cache-manager";

@Injectable()
export class AppService {
  constructor(@InjectRepository(NoteEntity) private readonly noteRepo: Repository<NoteEntity>,
              @Inject(RMQ_EVENTS_CLIENT_ID) private readonly eventsClient: ClientProxy,
              @Inject(CACHE_MANAGER) private readonly cache: Cache
  ) {
  }

  async findAll(): Promise<NoteEntity[]> {
    const cachedNotes: NoteEntity[] | undefined = await this.cache.get("notes:all")
    if (cachedNotes) {
      return cachedNotes
    }
    const result = await this.noteRepo.find();
    await this.cache.set("notes:all", result);
    return result
  }

  async findOne(id: string): Promise<NoteEntity> {
    const cachedNote: NoteEntity | undefined = await this.cache.get(`notes:${id}`);
    if (cachedNote) {
      return cachedNote;
    }
    const target = await this.noteRepo.findOneBy({id})
    if (!target) {
      throw new NotFoundException(`NoteEntity with id ${id} not found`);
    }
    await this.cache.set(`notes:${id}`, target)
    return target;
  }

  async findByAuthorId(authorId: string): Promise<NoteEntity[]> {
    const cachedNotes: NoteEntity[] | undefined = await this.cache.get(`notes:${authorId}`);
    if (cachedNotes) {
      return cachedNotes;
    }
    const target = await this.noteRepo.findBy({authorId});
    if (!target) {
      throw new NotFoundException(`NoteEntities with author id ${authorId} not found`);
    }
    await this.cache.set(`notes:${authorId}`, target)
    return target;
  }

  async findByClientId(clientId: string): Promise<NoteEntity[]> {
    const cachedNotes: NoteEntity[] | undefined = await this.cache.get(`notes:${clientId}`);
    if (cachedNotes) {
      return cachedNotes;
    }
    const target = await this.noteRepo.findBy({clientId});
    if (!target) {
      throw new NotFoundException(`NoteEntities with client id ${clientId} not found`);
    }
    await this.cache.set(`notes:${clientId}`, target)
    return target;
  }

  async findByLeadId(leadId: string): Promise<NoteEntity[]> {
    const cachedNotes: NoteEntity[] | undefined = await this.cache.get(`notes:${leadId}`);
    if (cachedNotes) {
      return cachedNotes;
    }
    const target = await this.noteRepo.findBy({leadId});
    if (!target) {
      throw new NotFoundException(`NoteEntities with lead id ${leadId} not found`);
    }
    await this.cache.set(`notes:${leadId}`, target)
    return target;
  }

  async findByDealId(dealId: string): Promise<NoteEntity[]> {
    const cachedNotes: NoteEntity[] | undefined = await this.cache.get(`notes:${dealId}`);
    if (cachedNotes) {
      return cachedNotes;
    }
    const target = await this.noteRepo.findBy({dealId});
    if (!target) {
      throw new NotFoundException(`NoteEntities with deal id ${dealId} not found`);
    }
    await this.cache.set(`notes:${dealId}`, target)
    return target;
  }

  async createOne(dto: CreateNoteDto): Promise<NoteEntity> {
    const note = await this.noteRepo.create(dto);
    await this.noteRepo.save(note);
    this.eventsClient.emit({cmd: 'events.microservice: createOne'}, {
      domain: "note",
      action: "created",
      actorId: dto.authorId,
      subjectId: note.id
    })
    return note;
  }

  async updateOne(dto: UpdateNoteDto): Promise<void> {
    const {id, content, authorId, clientId, leadId, dealId} = dto;
    const target = await this.findOne(id)
    if (!target) {
      throw new NotFoundException(`NoteEntity with id ${id} not found`);
    }
    this.eventsClient.emit({cmd: 'events.microservice: createOne'}, {
      domain: "note",
      action: "updated",
      actorId: dto.authorId,
      subjectId: target.id
    })
    await this.noteRepo.update(id, {content, authorId, clientId, leadId, dealId});
  }

  async deleteOne(id: string): Promise<void> {
    const target = await this.findOne(id);
    if (!target) {
      throw new NotFoundException(`NoteEntity with id ${id} not found`);
    }
    this.eventsClient.emit({cmd: 'events.microservice: createOne'}, {
      domain: "note",
      action: "deleted",
      actorId: target.authorId,
      subjectId: target.id
    })
    await this.noteRepo.delete(id);
  }
}
