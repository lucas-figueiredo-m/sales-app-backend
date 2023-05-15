import { IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';
import { CreateEmployee } from '@salesapp/types';

export class CreateEmployeeDto implements CreateEmployee {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('BR')
  phone: string;

  @IsNotEmpty()
  password: string;
}
