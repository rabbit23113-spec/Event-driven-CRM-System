import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ClientsModule, Transport} from "@nestjs/microservices";
import * as constants from "./constants/constants"
import {TypeOrmModule} from "@nestjs/typeorm";
import {NoteEntity} from "./entities/note.entity";
import {redisStore} from "cache-manager-redis-store";
import {CacheModule} from "@nestjs/cache-manager";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: constants.DATABASE_TYPE,
    host: constants.DATABASE_HOST,
    port: constants.DATABASE_PORT,
    username: constants.DATABASE_USER,
    password: constants.DATABASE_PASSWORD,
    database: constants.DATABASE_NAME,
    synchronize: true,
    entities: [NoteEntity]
  }),
    TypeOrmModule.forFeature([NoteEntity]),
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
    },
      {
        name: constants.RMQ_USERS_CLIENT_ID,
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${constants.RMQ_USER}:${constants.RMQ_PASS}@${constants.RMQ_HOST}:${constants.RMQ_PORT}`],
          queue: constants.RMQ_USERS_QUEUE,
          queueOptions: {
            durable: true,
          },
        }
      },
      {
        name: constants.RMQ_CLIENTS_CLIENT_ID,
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${constants.RMQ_USER}:${constants.RMQ_PASS}@${constants.RMQ_HOST}:${constants.RMQ_PORT}`],
          queue: constants.RMQ_CLIENTS_QUEUE,
          queueOptions: {
            durable: true,
          },
        }
      },
      {
        name: constants.RMQ_LEADS_CLIENT_ID,
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${constants.RMQ_USER}:${constants.RMQ_PASS}@${constants.RMQ_HOST}:${constants.RMQ_PORT}`],
          queue: constants.RMQ_LEADS_QUEUE,
          queueOptions: {
            durable: true,
          },
        }
      },
      {
        name: constants.RMQ_DEALS_CLIENT_ID,
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${constants.RMQ_USER}:${constants.RMQ_PASS}@${constants.RMQ_HOST}:${constants.RMQ_PORT}`],
          queue: constants.RMQ_DEALS_QUEUE,
          queueOptions: {
            durable: true,
          },
        }
      }
    ]),
    CacheModule.register({
      store: redisStore,
      host: constants.REDIS_HOST,
      port: constants.REDIS_PORT,
      ttl: 15
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
