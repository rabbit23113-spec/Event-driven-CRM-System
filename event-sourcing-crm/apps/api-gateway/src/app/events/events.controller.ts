import {Body, Controller, Get, Param, ParseEnumPipe, ParseUUIDPipe, Post} from '@nestjs/common';
import {EventsService} from './events.service';
import {EventDto} from "../dto/events/event.dto";
import {Action, CreateEventDto, Domain} from "../dto/events/create-event.dto";
import {ApiOperation, ApiParam, ApiResponse} from "@nestjs/swagger";


@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {
  }

  @ApiOperation({summary: "Get events"})
  @ApiResponse({status: 200, type: EventDto, isArray: true})
  @Get("find")
  async findEvents(): Promise<EventDto[]> {
    return await this.eventsService.findAll()
  }

  @ApiOperation({summary: "Get event by id"})
  @ApiParam({
    name: 'id',
  })
  @ApiResponse({status: 200, type: EventDto})
  @Get("find/id/:id")
  async findOne(@Param("id", new ParseUUIDPipe()) id: string): Promise<EventDto> {
    return await this.eventsService.findOne(id)
  }

  @ApiOperation({summary: "Get events by actor id"})
  @ApiParam({
    name: 'actorId',
  })
  @Get("find/actor/:actor")
  async findByActorId(@Param("actor", new ParseUUIDPipe()) actorId: string): Promise<EventDto[]> {
    return await this.eventsService.findByActorId(actorId);
  }

  @Get("find/subject/:subject")
  @ApiOperation({summary: "Get events by subject id"})
  @ApiParam({
    name: 'subjectId',
  })
  async findBySubjectId(@Param("subject", new ParseUUIDPipe()) subjectId: string): Promise<EventDto[]> {
    return await this.eventsService.findByActorId(subjectId)
  }

  @Get("find/domain/:domain")
  @ApiOperation({summary: "Get events by domain"})
  @ApiParam({
    name: 'domain',
    enum: Domain,
  })
  async findByDomain(@Param("domain", new ParseEnumPipe(Domain)) domain: Domain): Promise<EventDto[]> {
    return await this.eventsService.findByDomain(domain);
  }

  @Get("find/action/:action")
  @ApiOperation({summary: "Get events by action"})
  @ApiParam({
    name: 'action',
    enum: Action,
  })
  async findByAction(@Param("action", new ParseEnumPipe(Action)) action: Action): Promise<EventDto[]> {
    return await this.eventsService.findByAction(action)
  }

  @ApiOperation({summary: "Create event"})
  @ApiResponse({status: 201})
  @Post("create")
  async createOne(@Body() body: CreateEventDto): Promise<EventDto> {
    return await this.eventsService.createOne(body);
  }
}
