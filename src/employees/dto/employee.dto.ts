import { Expose } from 'class-transformer';
import { Employee } from '@salesapp/types';

export class EmployeeDto implements Employee {
  @Expose()
  server_id: number;

  @Expose()
  id: string;

  @Expose()
  first_name: string;

  @Expose()
  last_name: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  access_token: string;
}
