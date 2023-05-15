import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { randomBytes, scrypt as _scrypt } from 'node:crypto';
import { promisify } from 'node:util';
import { CreateEmployeeDto } from './dto';
import { JwtService } from '@nestjs/jwt';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private employeesService: EmployeesService,
    private jwtService: JwtService
  ) {}

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

    if (!employee) throw new NotFoundException('Employee not found');

    const [salt, storedHash] = employee.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex'))
      throw new UnauthorizedException('Bad password');

    const access_token = this.jwtService.sign({
      employee_id: employee.server_id,
      first_name: employee.first_name,
      last_name: employee.last_name,
    });

    return { ...employee, access_token };
  }
}
