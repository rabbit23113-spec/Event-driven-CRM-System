import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";
import * as constants from "../constants/constants";
import {CacheModule} from "@nestjs/cache-manager";
import {redisStore} from "cache-manager-redis-store";

@Module({
  imports: [
    ClientsModule.register([{
      name: constants.RMQ_LEADS_CLIENT_ID,
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${constants.RMQ_USER}:${constants.RMQ_PASS}@${constants.RMQ_HOST}:${constants.RMQ_PORT}`],
        queue: constants.RMQ_LEADS_QUEUE,
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
  controllers: [LeadsController],
  providers: [LeadsService],
})
export class LeadsModule {}
