import { ValidationError } from 'class-validator';

export class ClassValidatorUtil {
  static parseError(errors: ValidationError[], returnObject: object = {}) {
    for (const error of errors) {
      if (error.constraints) {
        returnObject[error.property] = Object.keys(error.constraints).map(
          (key) => {
            const returnObject = { code: error.constraints[key] };
            if (error.contexts) {
              returnObject['args'] = error.contexts[key];
            }
            return returnObject;
          },
        );
      } else {
        returnObject[error.property] = {};
        ClassValidatorUtil.parseError(
          error.children,
          returnObject[error.property],
        );
      }
    }
    return returnObject;
  }
}
