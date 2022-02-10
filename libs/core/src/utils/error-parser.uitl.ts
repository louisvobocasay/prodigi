import { ValidationError } from 'class-validator';

export const parseValidationErrors = (errors: ValidationError[]) => {
  const push = (
    constraints: any,
    ref: any[],
    contexts: any,
    property: string,
  ) => {
    for (const key in constraints) {
      const message: any = { code: constraints[key] };
      if (contexts && contexts[key]) {
        message.args = contexts[key];
      } else {
        message.args = { property };
      }

      ref.push(message);
    }
  };

  return errors.map((err) => {
    const e: any = {
      name: err.property,
      messages: [],
    };
    if (err.constraints) {
      push(err.constraints, e.messages, err.contexts, err.property);
    } else {
      e.children = {};
      let isObject = false;

      for (const child of err.children) {
        if (child.children.length) {
          e.children[err.property] = parseValidationErrors(child.children);
        } else {
          isObject = true;
          break;
        }
      }

      if (isObject) {
        e.children[err.property] = parseValidationErrors(err.children);
      }
    }

    return e;
  });
};
