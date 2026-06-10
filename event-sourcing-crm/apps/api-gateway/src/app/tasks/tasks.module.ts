import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";
import * as constants from "../constants/constants";
import {CacheModule} from "@nestjs/cache-manager";
import {redisStore} from "cache-manager-redis-store";

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
    CacheModule.register({
      store: redisStore,
      host: constants.REDIS_HOST,
      port: constants.REDIS_PORT,
      ttl: 60,
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
