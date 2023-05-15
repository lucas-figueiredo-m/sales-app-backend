import { Injectable } from '@nestjs/common';
import { EmployeeDatabase } from '@salesapp/types';
import { PrismaService } from '../services';
import { CreateEmployeeDto } from './dto';
import { EmployeesInterface } from './interfaces';

@Injectable()
export class EmployeesService implements EmployeesInterface {
  constructor(private prisma: PrismaService) {}

  findByEmail(email: string): Promise<EmployeeDatabase> {
    return this.prisma.employee.findUnique({ where: { email } });
  }

  create(employeeData: CreateEmployeeDto): Promise<CreateEmployeeDto> {
    return this.prisma.employee.create({ data: employeeData });
  }
}
