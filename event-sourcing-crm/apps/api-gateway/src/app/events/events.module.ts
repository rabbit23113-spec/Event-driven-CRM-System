import {Module} from '@nestjs/common';
import {EventsService} from './events.service';
import {EventsController} from './events.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";
import * as constants from "../constants/constants"

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
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {
}
