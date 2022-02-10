import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function IsGreater(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsGreaterConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'IsGreater' })
export class IsGreaterConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    const fromDate = new Date(relatedValue).getTime();
    let diff = 0;
    if (value) {
      const toDate = new Date(value).getTime();
      diff = toDate - fromDate;
    } else {
      diff = 1;
    }
    return diff > 0;
  }
}
