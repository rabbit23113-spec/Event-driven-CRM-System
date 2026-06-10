import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {EventsModule} from './events/events.module';
import { UsersModule } from './users/users.module';
import { LeadsModule } from './leads/leads.module';
import { ClientsModule } from './clients/clients.module';
import { DealsModule } from './deals/deals.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [EventsModule, UsersModule, LeadsModule, ClientsModule, DealsModule, NotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
