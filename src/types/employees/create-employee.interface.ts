export type EmployeeDatabase = {
  server_id: number;
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
};

export type CreateEmployee = Omit<EmployeeDatabase, 'server_id'>;

export type Employee = Omit<EmployeeDatabase, 'password'> & {
  access_token: string;
};
