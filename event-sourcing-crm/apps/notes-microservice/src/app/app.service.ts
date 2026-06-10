import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {CreateNoteDto} from "./dto/create-note.dto";
import {UpdateNoteDto} from "./dto/update-note.dto";
import {NoteEntity} from "./entities/note.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {RMQ_EVENTS_CLIENT_ID} from "./constants/constants";

@Injectable()
export class AppService {
  constructor(@InjectRepository(NoteEntity) private readonly noteRepo: Repository<NoteEntity>, @Inject(RMQ_EVENTS_CLIENT_ID) private readonly eventsClient: ClientProxy) {
  }

  async findAll(): Promise<NoteEntity[]> {
    return await this.noteRepo.find();
  }

  async findOne(id: string): Promise<NoteEntity> {
    const target = await this.noteRepo.findOneBy({id})
    if (!target) {
      throw new NotFoundException(`NoteEntity with id ${id} not found`);
    }
    return target;
  }

  async findOneByAuthorId(authorId: string): Promise<NoteEntity[]> {
    const target = await this.noteRepo.findBy({authorId});
    if (!target) {
      throw new NotFoundException(`NoteEntities with author id ${authorId} not found`);
    }
    return target;
  }

  async findOneByClientId(clientId: string): Promise<NoteEntity[]> {
    const target = await this.noteRepo.findBy({clientId});
    if (!target) {
      throw new NotFoundException(`NoteEntities with client id ${clientId} not found`);
    }
    return target;
  }

  async findOneByLeadId(leadId: string): Promise<NoteEntity[]> {
    const target = await this.noteRepo.findBy({leadId});
    if (!target) {
      throw new NotFoundException(`NoteEntities with lead id ${leadId} not found`);
    }
    return target;
  }

  async findOneByDealId(dealId: string): Promise<NoteEntity[]> {
    const target = await this.noteRepo.findBy({dealId});
    if (!target) {
      throw new NotFoundException(`NoteEntities with deal id ${dealId} not found`);
    }
    return target;
  }

  async createOne(dto: CreateNoteDto): Promise<NoteEntity> {
    const note = await this.noteRepo.create(dto);
    await this.noteRepo.save(note);
    this.eventsClient.send({ cmd: 'events.microservice: createOne' }, { domain: "note", action: "created", actorId: dto.authorId, subjectId: note.id })
    return note;
  }

  async updateOne(dto: UpdateNoteDto): Promise<void> {
    const {id, content, authorId, clientId, leadId, dealId} = dto;
    const target = await this.findOne(id)
    if (!target) {
      throw new NotFoundException(`NoteEntity with id ${id} not found`);
    }
    this.eventsClient.send({ cmd: 'events.microservice: createOne' }, { domain: "note", action: "updated", actorId: dto.authorId, subjectId: target.id })
    await this.noteRepo.update(id, {content, authorId, clientId, leadId, dealId});
  }

  async deleteOne(id: string): Promise<void> {
    const target = await this.findOne(id);
    if (!target) {
      throw new NotFoundException(`NoteEntity with id ${id} not found`);
    }
    this.eventsClient.send({ cmd: 'events.microservice: createOne' }, { domain: "note", action: "deleted", actorId: target.authorId, subjectId: target.id })
    await this.noteRepo.delete(id);
  }
}
