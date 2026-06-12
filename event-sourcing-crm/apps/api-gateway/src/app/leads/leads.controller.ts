import {Body, Controller, Delete, Get, Param, ParseEnumPipe, ParseUUIDPipe, Patch, Post} from '@nestjs/common';
import {LeadsService} from './leads.service';
import {LeadDto, Status} from "../dto/leads/lead.dto";
import {CreateLeadDto} from "../dto/leads/create-lead.dto";
import {UpdateLeadDto} from "../dto/leads/update-lead.dto";
import {ApiOperation, ApiParam, ApiResponse} from "@nestjs/swagger";

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {
  }

  @ApiOperation({summary: "Get all leads"})
  @ApiResponse({status: 200, type: LeadDto, isArray: true})
  @Get("find")
  async findAll(): Promise<LeadDto[]> {
    return await this.leadsService.findAll();
  }

  @ApiOperation({summary: "Get lead by id"})
  @ApiResponse({status: 200, type: LeadDto})
  @ApiParam({name: 'id'})
  @Get("find/id/:id")
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<LeadDto> {
    return await this.leadsService.findOne(id);
  }

  @ApiOperation({summary: "Get leads by status"})
  @ApiResponse({status: 200, type: LeadDto, isArray: true})
  @ApiParam({name: 'status', enum: Status})
  @Get("find/status/:status")
  async findStatus(@Param('status', new ParseEnumPipe(Status)) status: Status): Promise<LeadDto[]> {
    return await this.leadsService.findByStatus(status)
  }

  @ApiOperation({summary: "Get lead by name"})
  @ApiResponse({status: 200, type: LeadDto})
  @ApiParam({name: 'name'})
  @Get("find/name/:name")
  async findName(@Param('name') name: string): Promise<LeadDto> {
    return await this.leadsService.findOneByName(name);
  }

  @ApiOperation({summary: "Create lead" })
  @ApiResponse({status: 201, type: LeadDto})
  @Post("create")
  async create(@Body() createLeadDto: CreateLeadDto): Promise<LeadDto> {
    return await this.leadsService.createOne(createLeadDto)
  }

  @ApiOperation({summary: "Update lead" })
  @ApiResponse({status: 204})
  @Patch("update")
  async updateOne(@Body() updateLeadDto: UpdateLeadDto): Promise<void> {
    return await this.leadsService.updateOne(updateLeadDto)
  }

  @ApiOperation({summary: "Delete lead" })
  @ApiResponse({status: 204})
  @Delete("delete/:id")
  async deleteOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return await this.leadsService.deleteOne(id)
  }
}
