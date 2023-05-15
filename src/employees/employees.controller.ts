import { Body, Controller, Get, Post } from '@nestjs/common';
import { PublicEndpoint } from '../decorators/public.decorator';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CreateEmployeeDto } from './dto';
import { EmployeeSignInDto } from './dto/employee-signin.dto';
import { EmployeeDto } from './dto/employee.dto';
import { EmployeesService } from './employees.service';

@Serialize(EmployeeDto)
@Controller('employee')
export class EmployeesController {
  constructor(
    private employeesService: EmployeesService,
    private authService: AuthService
  ) {}

  @PublicEndpoint()
  @Post('/signin')
  signIn(@Body() body: EmployeeSignInDto) {
    return this.authService.signin(body.email, body.password);
  }

  @PublicEndpoint()
  @Post('/signup')
  signUp(@Body() body: CreateEmployeeDto) {
    return this.authService.signup(body);
  }

  @Get('/profile')
  profile() {
    return this.employeesService.findByEmail('test@test.com');
  }
}
