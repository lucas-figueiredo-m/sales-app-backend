import {
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { validateTaxpayerId } from '@salesapp/utils';

@ValidatorConstraint({ name: 'IsValidTaxpayerId', async: false })
class TaxpayerIdValidator implements ValidatorConstraintInterface {
  validate(taxpayerId: string): boolean {
    return validateTaxpayerId(taxpayerId);
  }
  defaultMessage(): string {
    return 'Taxpayer ID not valid';
  }
}

export const IsValidTaxpayerId = () => Validate(TaxpayerIdValidator);
