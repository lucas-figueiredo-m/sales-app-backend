import { ProductCategory } from '@prisma/client';
import {
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsValidCategory', async: false })
class ValidProductCategoryValidator implements ValidatorConstraintInterface {
  validate(category: ProductCategory): boolean {
    return (
      category === ProductCategory.BOVINE ||
      category === ProductCategory.SWINE ||
      category === ProductCategory.GIBLETS ||
      category === ProductCategory.CHICKEN
    );
  }
  defaultMessage(): string {
    return 'Category not valid';
  }
}

export const IsValidProductCategory = () =>
  Validate(ValidProductCategoryValidator);
