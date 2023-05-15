import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { secret } from '../constants/jwtContants';
import { EmployeesModule } from '../employees/employees.module';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    EmployeesModule,
    PassportModule,
    JwtModule.register({ secret: secret }),
  ],
  providers: [JwtStrategy, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AuthModule {}
