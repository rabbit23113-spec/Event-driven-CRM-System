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
import {TasksService} from './tasks.service';
import {Priority, Status, TaskDto} from "../dto/tasks/task.dto";
import {CreateTaskDto} from "../dto/tasks/create-task.dto";
import {UpdateTaskDto} from "../dto/tasks/update-task.dto";
import {ApiOperation, ApiParam, ApiResponse} from "@nestjs/swagger";
import {UpdateStatusDto} from "../dto/tasks/update-status.dto";
import {CurrentUser} from "../decorators/current-user.decorator";
import {JwtGuard} from "../guards/jwt/jwt.guard";
import {HighPermissionsGuard} from "../guards/high-permissions/high-permissions.guard";

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {
  }

  @ApiOperation({summary: "Get tasks"})
  @ApiResponse({status: 200, type: TaskDto, isArray: true})
  @Get("find")
  async findAll(): Promise<TaskDto[]> {
    return await this.tasksService.findAll();
  }

  @ApiOperation({summary: "Get task by id"})
  @ApiParam({name: "id"})
  @ApiResponse({status: 200, type: TaskDto})
  @Get("find/id/:id")
  async findOne(@Param("id", new ParseUUIDPipe()) id: string): Promise<TaskDto> {
    return await this.tasksService.findOne(id);
  }

  @ApiOperation({summary: "Get tasks by client id"})
  @ApiParam({name: "id"})
  @ApiResponse({status: 200, type: TaskDto, isArray: true})
  @Get("find/client/:id")
  async findByClientId(@Param("id", new ParseUUIDPipe()) clientId: string): Promise<TaskDto[]> {
    return await this.tasksService.findByClientId(clientId);
  }

  @ApiOperation({summary: "Get tasks by lead id"})
  @ApiParam({name: "id"})
  @ApiResponse({status: 200, type: TaskDto, isArray: true})
  @Get("find/lead/:id")
  async findByLeadId(@Param("id", new ParseUUIDPipe()) leadId: string): Promise<TaskDto[]> {
    return await this.tasksService.findByLeadId(leadId);
  }

  @ApiOperation({summary: "Get tasks by deal id"})
  @ApiParam({name: "id"})
  @ApiResponse({status: 200, type: TaskDto, isArray: true})
  @Get("find/deal/:id")
  async findByDealId(@Param("id", new ParseUUIDPipe()) dealId: string): Promise<TaskDto[]> {
    return await this.tasksService.findByDealId(dealId);
  }

  @ApiOperation({summary: "Get tasks by priority"})
  @ApiParam({name: "priority"})
  @ApiResponse({status: 200, type: TaskDto, isArray: true})
  @Get("find/priority/:priority")
  async findByPriority(@Param("priority", new ParseEnumPipe(Priority)) priority: Priority): Promise<TaskDto[]> {
    return await this.tasksService.findByPriority(priority);
  }

  @ApiOperation({summary: "Get tasks by status"})
  @ApiParam({name: "status"})
  @ApiResponse({status: 200, type: TaskDto, isArray: true})
  @Get("find/status/:status")
  async findByStatus(@Param("status", new ParseEnumPipe(Status)) status: Status): Promise<TaskDto[]> {
    return await this.tasksService.findByStatus(status);
  }

  @UseGuards(JwtGuard)
  @ApiOperation({summary: "Create task"})
  @ApiResponse({status: 201, type: TaskDto})
  @Post("create")
  async createOne(@Body() dto: CreateTaskDto, @CurrentUser() actorId: string): Promise<TaskDto> {
    return await this.tasksService.createOne(dto, actorId)
  }

  @UseGuards(JwtGuard)
  @ApiOperation({summary: "Update task"})
  @ApiResponse({status: 204})
  @Patch("update")
  async updateOne(@Body() dto: UpdateTaskDto, @CurrentUser() actorId: string): Promise<void> {
    return await this.tasksService.updateOne(dto, actorId)
  }

  @UseGuards(JwtGuard)
  @ApiOperation({summary: "Update task by status"})
  @ApiResponse({status: 204})
  @Patch("update/status")
  async updateStatus(@Body() dto: UpdateStatusDto, @CurrentUser() actorId: string): Promise<void> {
    return await this.tasksService.updateStatus(dto, actorId)
  }

  @UseGuards(JwtGuard)
  @ApiOperation({summary: "Delete task"})
  @ApiResponse({status: 204})
  @Delete("delete/:id")
  async deleteOne(@Param("id", new ParseUUIDPipe()) id: string, @CurrentUser() actorId: string): Promise<void> {
    return await this.tasksService.deleteOne(id, actorId)
  }
}
