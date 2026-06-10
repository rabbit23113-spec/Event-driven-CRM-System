import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ClientsModule, Transport} from "@nestjs/microservices";
import * as constants from "./constants/constants"
import {TaskEntity} from "./entities/task.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: constants.DATABASE_TYPE,
    host: constants.DATABASE_HOST,
    port: constants.DATABASE_PORT,
    username: constants.DATABASE_USER,
    password: constants.DATABASE_PASSWORD,
    database: constants.DATABASE_NAME,
    synchronize: true,
    entities: [TaskEntity]
  }),
    TypeOrmModule.forFeature([TaskEntity]),
    ClientsModule.register([{
      name: constants.RMQ_EVENTS_CLIENT_ID,
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${constants.RMQ_USER}:${constants.RMQ_PASS}@${constants.RMQ_HOST}:${constants.RMQ_PORT}`],
        queue: constants.RMQ_EVENTS_QUEUE,
        queueOptions: {
          durable: true,
        },
      }
    }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
