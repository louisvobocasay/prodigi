import { ValueTransformer } from 'typeorm';

class TransformNumber implements ValueTransformer {
  to(value: string) {
    return value;
  }
  from(value: string) {
    if (value !== null) return Number(value);
    return value;
  }
}

export const transformer = new TransformNumber();
