import {Body, Controller, Get, Inject, Post, Req} from '@nestjs/common';
import { EventsService } from './events.service';
import type { Request } from "express"
import {EventDto} from "../dto/events/event.dto";
import {CreateEventDto} from "../dto/events/create-event.dto";
import {ApiOperation, ApiQuery, ApiResponse} from "@nestjs/swagger";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import type {Cache} from "cache-manager";


@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService, @Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  @ApiOperation({ summary: "Get all events or one by id" })
  @ApiQuery({
    name: 'id',
    type: 'string',
    required: false,
  })
  @ApiResponse({ status: 200, type: EventDto, isArray: true })
  @Get("find")
  async findEvents(@Req() req: Request): Promise<EventDto[] | EventDto> {
    const id = req.query.id;
    if (req.query.id) {
      const event: string | undefined = await this.cache.get(`events:${id}`)
      if (event) {
        return JSON.parse(event)
      }
      const result = await this.eventsService.findOne(String(id))
      await this.cache.set(`events:${id}`, JSON.stringify(result))
      return result
    } else {
      const events: string | undefined = await this.cache.get(`events:all`)
      if (events) {
        return JSON.parse(events)
      }
      const result =  await this.eventsService.findAll();
      await this.cache.set(`events:all`, JSON.stringify(result))
      return result
    }
  }

  @ApiOperation({ summary: "Create event" })
  @ApiResponse({ status: 201, type: EventDto })
  @Post("create")
  async createOne(@Body() body: CreateEventDto): Promise<EventDto> {
    return await this.eventsService.createOne(body);
  }
}
