import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { ClientInterface } from './interfaces';

@Module({
  controllers: [ClientsController],
  providers: [{ provide: ClientInterface, useClass: ClientsService }],
})
export class ClientModule {}
