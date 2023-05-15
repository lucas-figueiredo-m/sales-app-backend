import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService, AuthService],
  exports: [EmployeesService],
  imports: [
    JwtModule.register({
      secret: 'mysupersecret',
    }),
  ],
})
export class EmployeesModule {}
