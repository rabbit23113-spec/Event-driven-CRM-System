import {Module} from '@nestjs/common';
import {EventsService} from './events.service';
import {EventsController} from './events.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";
import * as constants from "../constants/constants"
import {redisStore} from "cache-manager-redis-store";
import {CacheModule} from "@nestjs/cache-manager";

@Module({
  imports: [
    ClientsModule.register([{
      name: constants.RMQ_EVENTS_CLIENT_ID,
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${constants.RMQ_USER}:${constants.RMQ_PASS}@${constants.RMQ_HOST}:${constants.RMQ_PORT}`],
        queue: constants.RMQ_QUEUE,
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
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {
}
