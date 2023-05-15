import { ClientType } from '@prisma/client';
import {
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsValidClientType', async: false })
class ClientTypeValidator implements ValidatorConstraintInterface {
  validate(type: ClientType): boolean {
    return (
      type === ClientType.LARGE_BUSINESS || type === ClientType.SMALL_BUSINESS
    );
  }
  defaultMessage(): string {
    return 'Insert a valid client type';
  }
}

export const IsValidClientType = () => Validate(ClientTypeValidator);
