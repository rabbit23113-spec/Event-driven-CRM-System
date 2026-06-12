import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {EventsModule} from './events/events.module';
import { UsersModule } from './users/users.module';
import { LeadsModule } from './leads/leads.module';
import { ClientsModule } from './clients/clients.module';
import { DealsModule } from './deals/deals.module';
import { NotesModule } from './notes/notes.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import {JwtModule} from "@nestjs/jwt";
import * as constants from "./constants/constants";

@Module({
  imports: [EventsModule, UsersModule, LeadsModule, ClientsModule, DealsModule, NotesModule, TasksModule, AuthModule,
    JwtModule.register({
      global: true,
      secret: constants.JWT_SECRET,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
