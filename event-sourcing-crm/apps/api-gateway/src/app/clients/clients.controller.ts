import {Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards} from '@nestjs/common';
import { ClientsService } from './clients.service';
import {ApiOperation, ApiParam, ApiResponse} from "@nestjs/swagger";
import {ClientDto} from "../dto/clients/client.dto";
import {CreateClientDto} from "../dto/clients/create-client.dto";
import {UpdateClientDto} from "../dto/clients/update-client.dto";
import {JwtGuard} from "../guards/jwt/jwt.guard";
import {CurrentUser} from "../decorators/current-user.decorator";

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @ApiOperation({summary: "Get all clients"})
  @ApiResponse({status: 200, type: ClientDto, isArray: true})
  @Get("find")
  async findAll(): Promise<ClientDto[]> {
    return await this.clientsService.findAll();
  }

  @ApiOperation({summary: "Get client by id"})
  @ApiResponse({status: 200, type: ClientDto})
  @ApiParam({name: 'id'})
  @Get("find/id/:id")
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<ClientDto> {
    return await this.clientsService.findOne(id);
  }

  @ApiOperation({summary: "Get clients by company name"})
  @ApiResponse({status: 200, type: ClientDto, isArray: true})
  @ApiParam({name: 'company'})
  @Get("find/company/:company")
  async findByCompanyName(@Param('company') company: string): Promise<ClientDto[]> {
    return await this.clientsService.findByCompanyName(company)
  }

  @ApiOperation({summary: "Get client by name"})
  @ApiResponse({status: 200, type: ClientDto})
  @ApiParam({name: 'name'})
  @Get("find/name/:name")
  async findName(@Param('name') name: string): Promise<ClientDto> {
    return await this.clientsService.findOneByName(name);
  }

  @UseGuards(JwtGuard)
  @ApiOperation({summary: "Create client" })
  @ApiResponse({status: 201, type: ClientDto})
  @Post("create")
  async create(@Body() createClientDto: CreateClientDto, @CurrentUser() actorId: string): Promise<ClientDto> {
    return await this.clientsService.createOne(createClientDto, actorId)
  }

  @UseGuards(JwtGuard)
  @ApiOperation({summary: "Update client" })
  @ApiResponse({status: 204})
  @Patch("update")
  async updateOne(@Body() updateClientDto: UpdateClientDto, @CurrentUser() actorId: string): Promise<void> {
    return await this.clientsService.updateOne(updateClientDto, actorId)
  }

  @UseGuards(JwtGuard)
  @ApiOperation({summary: "Delete client" })
  @ApiResponse({status: 204})
  @Delete("delete/:id")
  async deleteOne(@Param('id', new ParseUUIDPipe()) id: string, @CurrentUser() actorId: string): Promise<void> {
    return await this.clientsService.deleteOne(id, actorId)
  }
}
