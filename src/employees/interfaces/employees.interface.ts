import { EmployeeDatabase } from '@salesapp/types';
import { CreateEmployeeDto } from '../dto/create-employee.dto';

export abstract class EmployeesInterface {
  abstract findByEmail(email: string): Promise<EmployeeDatabase>;
  abstract create(employeeData: CreateEmployeeDto): Promise<CreateEmployeeDto>;
}
