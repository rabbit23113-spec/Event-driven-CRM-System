import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as constants from './constants/constants'
import {TypeOrmModule} from "@nestjs/typeorm";
import {LeadEntity} from "./entities/lead.entity";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: constants.DATABASE_TYPE,
    host: constants.DATABASE_HOST,
    port: constants.DATABASE_PORT,
    username: constants.DATABASE_USER,
    password: constants.DATABASE_PASSWORD,
    database: constants.DATABASE_NAME,
    synchronize: true,
    entities: [LeadEntity]
  }), TypeOrmModule.forFeature([LeadEntity])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
