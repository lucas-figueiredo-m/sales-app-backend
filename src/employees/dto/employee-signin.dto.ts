import { IsNotEmpty, IsEmail } from 'class-validator';
import { EmployeeSignIn } from '@salesapp/types';

export class EmployeeSignInDto implements EmployeeSignIn {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
