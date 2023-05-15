import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { DecodedJwt } from '@salesapp/types';
import { CurrentEmployee } from '../decorators/current-employee.decorator';
import { CreateClientDto } from './dto';
import { ClientInterface } from './interfaces';

@Controller('clients')
export class ClientsController {
  constructor(private clientsRepository: ClientInterface) {}
  @Get()
  async getAllClients(@CurrentEmployee() employee: DecodedJwt) {
    const client = await this.clientsRepository.getClientsByEmployeeId(
      employee.employee_id,
    );
    return client;
  }

  @Post()
  async createNewClient(
    @Body() body: CreateClientDto,
    @CurrentEmployee() employee: DecodedJwt,
  ) {
    const client = await this.clientsRepository.create(
      employee.employee_id,
      body,
    );
    return client;
  }

  @Patch('/deactivate')
  // TODO: validate if employee_id matches employee_id from request
  async deactivateClient(@Query('server_id') server_id: string) {
    return this.clientsRepository.deactivateClient(parseInt(server_id));
  }

  @Patch('/activate')
  // TODO: validate if employee_id matches employee_id from request
  async activateClient(@Query('server_id') server_id: string) {
    return this.clientsRepository.activateClient(parseInt(server_id));
  }
}
