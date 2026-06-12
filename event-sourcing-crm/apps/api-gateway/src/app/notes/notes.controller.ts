import {Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards} from '@nestjs/common';
import {NotesService} from './notes.service';
import {NoteDto} from "../dto/notes/note.dto";
import {CreateNoteDto} from "../dto/notes/create-note.dto";
import {UpdateNoteDto} from "../dto/notes/update-note.dto";
import {ApiOperation, ApiParam, ApiResponse} from "@nestjs/swagger";
import {JwtGuard} from "../guards/jwt/jwt.guard";
import {CurrentUser} from "../decorators/current-user.decorator";

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {
  }

  @ApiOperation({summary: "Get notes"})
  @ApiResponse({status: 200, type: NoteDto, isArray: true})
  @Get("find")
  async findAll(): Promise<NoteDto[]> {
    return await this.notesService.findAll();
  }

  @ApiOperation({summary: "Get note by id"})
  @ApiParam({name: "id"})
  @ApiResponse({status: 200, type: NoteDto})
  @Get("find/id/:id")
  async findOne(@Param("id", new ParseUUIDPipe()) id: string): Promise<NoteDto> {
    return await this.notesService.findOne(id);
  }

  @ApiOperation({summary: "Get notes by author id"})
  @ApiParam({name: "id"})
  @ApiResponse({status: 200, type: NoteDto, isArray: true})
  @Get("find/author/:id")
  async findByAuthorId(@Param("id", new ParseUUIDPipe()) authorId: string): Promise<NoteDto[]> {
    return await this.notesService.findByAuthorId(authorId);
  }

  @ApiOperation({summary: "Get notes by client id"})
  @ApiParam({name: "id"})
  @ApiResponse({status: 200, type: NoteDto, isArray: true})
  @Get("find/client/:id")
  async findByClientId(@Param("id", new ParseUUIDPipe()) clientId: string): Promise<NoteDto[]> {
    return await this.notesService.findByClientId(clientId);
  }

  @ApiOperation({summary: "Get notes by lead id"})
  @ApiParam({name: "id"})
  @ApiResponse({status: 200, type: NoteDto, isArray: true})
  @Get("find/lead/:id")
  async findByLeadId(@Param("id", new ParseUUIDPipe()) leadId: string): Promise<NoteDto[]> {
    return await this.notesService.findByLeadId(leadId);
  }

  @ApiOperation({summary: "Get notes by deal id"})
  @ApiParam({name: "id"})
  @ApiResponse({status: 200, type: NoteDto, isArray: true})
  @Get("find/deal/:id")
  async findByDealId(@Param("id", new ParseUUIDPipe()) dealId: string): Promise<NoteDto[]> {
    return await this.notesService.findByDealId(dealId);
  }

  @UseGuards(JwtGuard)
  @ApiOperation({summary: "Create note"})
  @ApiResponse({status: 201, type: NoteDto})
  @Post("create")
  async createOne(@Body() dto: CreateNoteDto, @CurrentUser() actorId: string): Promise<NoteDto> {
    return await this.notesService.createOne(dto, actorId)
  }

  @UseGuards(JwtGuard)
  @ApiOperation({summary: "Update note"})
  @ApiResponse({status: 204})
  @Patch("update")
  async updateOne(@Body() dto: UpdateNoteDto, @CurrentUser() actorId: string): Promise<void> {
    return await this.notesService.updateOne(dto, actorId)
  }

  @UseGuards(JwtGuard)
  @ApiOperation({summary: "Delete note"})
  @ApiResponse({status: 204})
  @Delete("delete/:id")
  async deleteOne(@Param("id", new ParseUUIDPipe()) id: string, @CurrentUser() actorId: string): Promise<void> {
    return await this.notesService.deleteOne(id, actorId);
  }
}
