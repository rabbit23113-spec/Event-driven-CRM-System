import {Body, Controller, Get, Post, Req} from '@nestjs/common';
import { EventsService } from './events.service';
import type { Request } from "express"
import {EventDto} from "../dto/events/event.dto";
import {CreateEventDto} from "../dto/events/create-event.dto";
import {ApiOperation, ApiQuery, ApiResponse} from "@nestjs/swagger";


@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

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
      return await this.eventsService.findOne(String(id))
    } else {
      return await this.eventsService.findAll();
    }
  }

  @ApiOperation({ summary: "Create event" })
  @ApiResponse({ status: 201, type: EventDto })
  @Post("create")
  async createOne(@Body() body: CreateEventDto): Promise<EventDto> {
    return await this.eventsService.createOne(body);
  }
}
