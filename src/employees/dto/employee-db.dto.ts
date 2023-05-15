import { EmployeeDatabase } from '@salesapp/types';

export class EmployeeDbDto implements EmployeeDatabase {
  server_id: number;
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
}
