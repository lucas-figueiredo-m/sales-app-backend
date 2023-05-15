import { Client } from '@prisma/client';
import { CreateClientDto } from '../dto';

export abstract class ClientInterface {
  abstract create(
    employee_id: number,
    clientData: CreateClientDto
  ): Promise<{ dto: Client }>;
  abstract getAll(): Promise<{ dto: Client[] }>;
  abstract getClientsByEmployeeId(
    employee_id: number
  ): Promise<{ dto: Client[] }>;
  abstract deactivateClient(client_id: number): Promise<Client>;
  abstract activateClient(client_id: number): Promise<Client>;
}
