import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import * as constants from "./constants/constants"
import Event from "./entities/event.entity";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: constants.DATABASE_TYPE,
    host: constants.DATABASE_HOST,
    port: constants.DATABASE_PORT,
    username: constants.DATABASE_USER,
    password: constants.DATABASE_PASSWORD,
    database: constants.DATABASE_NAME,
    synchronize: true,
    entities: [Event]
  }), TypeOrmModule.forFeature([Event])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
