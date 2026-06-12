import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { DealsService } from './deals.service';
import {ApiOperation, ApiParam, ApiResponse} from "@nestjs/swagger";
import {DealDto, Status} from "../dto/deals/deal.dto";
import {CreateDealDto} from "../dto/deals/create-deal.dto";
import {UpdateDealDto} from "../dto/deals/update-deal.dto";
import {UpdateStatusDto} from "../dto/deals/update-status.dto";
import {CurrentUser} from "../decorators/current-user.decorator";
import {JwtGuard} from "../guards/jwt/jwt.guard";

@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @ApiOperation({summary: "Get all deals"})
  @ApiResponse({status: 200, type: DealDto, isArray: true})
  @Get("find")
  async findAll(): Promise<DealDto[]> {
    return await this.dealsService.findAll();
  }

  @ApiOperation({summary: "Get deal by id"})
  @ApiResponse({status: 200, type: DealDto})
  @ApiParam({name: 'id'})
  @Get("find/id/:id")
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<DealDto> {
    return await this.dealsService.findOne(id);
  }

  @ApiOperation({summary: "Get deals by status"})
  @ApiResponse({status: 200, type: DealDto, isArray: true})
  @ApiParam({name: 'status', enum: Status})
  @Get("find/status/:status")
  async findStatus(@Param('status', new ParseEnumPipe(Status)) status: Status): Promise<DealDto[]> {
    return await this.dealsService.findByStatus(status)
  }

  @UseGuards(JwtGuard)
  @ApiOperation({summary: "Create deal" })
  @ApiResponse({status: 201, type: DealDto})
  @Post("create")
  async create(@Body() createDealDto: CreateDealDto, @CurrentUser() actorId: string): Promise<DealDto> {
    return await this.dealsService.createOne(createDealDto, actorId)
  }

  @UseGuards(JwtGuard)
  @ApiOperation({summary: "Update deal" })
  @ApiResponse({status: 204})
  @Patch("update")
  async updateOne(@Body() dto: UpdateDealDto, @CurrentUser() actorId: string): Promise<void> {
    return await this.dealsService.updateOne(dto, actorId)
  }

  @UseGuards(JwtGuard)
  @ApiOperation({summary: "Update deal by status" })
  @ApiResponse({status: 204})
  @Patch("update/status")
  async updateStatus(@Body() dto: UpdateStatusDto, @CurrentUser() actorId: string): Promise<void> {
    return await this.dealsService.updateStatus(dto, actorId)
  }

  @UseGuards(JwtGuard)
  @ApiOperation({summary: "Delete deal" })
  @ApiResponse({status: 204})
  @Delete("delete/:id")
  async deleteOne(@Param('id', new ParseUUIDPipe()) id: string, @CurrentUser() actorId: string): Promise<void> {
    return await this.dealsService.deleteOne(id, actorId)
  }
}
