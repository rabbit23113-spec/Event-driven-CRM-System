import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";
import { TasksGateway } from './tasks.gateway';
import * as constants from "../constants/constants";

@Module({
  imports: [
    ClientsModule.register([{
      name: constants.RMQ_TASKS_CLIENT_ID,
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${constants.RMQ_USER}:${constants.RMQ_PASS}@${constants.RMQ_HOST}:${constants.RMQ_PORT}`],
        queue: constants.RMQ_TASKS_QUEUE,
        queueOptions: {
          durable: true,
        },
      }
    }]),
  ],
  controllers: [TasksController],
  providers: [TasksService, TasksGateway],
})
export class TasksModule {}
