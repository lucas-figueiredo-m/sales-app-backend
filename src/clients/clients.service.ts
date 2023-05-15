import { Client, Prisma } from '@prisma/client';
import { PrismaService } from '../services';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ClientInterface } from './interfaces/client.interface';
import { CreateClientDto } from './dto';

@Injectable()
export class ClientsService implements ClientInterface {
  constructor(private prisma: PrismaService) {}
  async create(
    employee_id: number,
    clientData: CreateClientDto
  ): Promise<{ dto: Client }> {
    try {
      const client = await this.prisma.client.create({
        data: {
          employee_id,
          ...clientData,
        },
      });

      return {
        dto: client,
      };
    } catch (error) {
      if (!(error instanceof Prisma.PrismaClientKnownRequestError)) throw error;

      if (error.code !== 'P2002') throw error;

      throw new BadRequestException('Client already exists');
    }
  }

  async getAll(): Promise<{ dto: Client[] }> {
    const clients = await this.prisma.client.findMany();

    return {
      dto: clients,
    };
  }

  async getClientsByEmployeeId(
    employee_id: number
  ): Promise<{ dto: Client[] }> {
    const clients = await this.prisma.client.findMany({
      where: { employee_id },
      orderBy: { trade_name: 'asc' },
    });

    return {
      dto: clients,
    };
  }

  async deactivateClient(client_id: number) {
    return await this.prisma.client.update({
      where: { server_id: client_id },
      data: { active: false },
    });
  }

  async activateClient(client_id: number) {
    return await this.prisma.client.update({
      where: { server_id: client_id },
      data: { active: true },
    });
  }
}
