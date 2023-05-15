import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'node:crypto';
import { promisify } from 'node:util';
import { CreateEmployeeDto } from '../employees/dto';
import { EmployeesService } from '../employees/employees.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private employeesService: EmployeesService) {}

  async signup(employeeData: CreateEmployeeDto) {
    const employee = await this.employeesService.findByEmail(
      employeeData.email
    );

    if (employee) throw new BadRequestException('E-mail already in use!');
    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(employeeData.password, salt, 32)) as Buffer;

    const hashedPassword = salt + '.' + hash.toString('hex');

    const newEmployee = await this.employeesService.create({
      ...employeeData,
      password: hashedPassword,
    });

    return newEmployee;
  }

  async signin(email: string, password: string) {
    const employee = await this.employeesService.findByEmail(email);

    if (!employee) throw new UnauthorizedException('Invalid password');

    const [salt, storedHash] = employee.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex'))
      throw new UnauthorizedException('Invalid password');

    return employee;
  }
}
