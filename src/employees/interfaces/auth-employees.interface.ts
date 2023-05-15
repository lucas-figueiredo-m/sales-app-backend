import { EmployeeDatabase } from '@salesapp/types';
import { CreateEmployeeDto } from '../dto/create-employee.dto';

export abstract class AuthEmployeesInterface {
  abstract signin(email: string, password: string): Promise<EmployeeDatabase>;
  abstract signup(employeeData: CreateEmployeeDto): Promise<CreateEmployeeDto>;
}
