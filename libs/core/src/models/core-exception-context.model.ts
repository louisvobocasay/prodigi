export class CoreExceptionContextModel {
  constructor(
    public readonly dataType: 'number' | 'boolean' | 'positive number',
  ) {}
}

export class CoreExceptionContextWithEnumModel<
  T,
> extends CoreExceptionContextModel {
  /**
   *
   */
  constructor(type: T) {
    super(Object.values(type).join('|')  as any);
  }
}

export class CoreExceptionContextWithLengthModel {
  /**
   *
   */
  constructor(fieldName: 'min' | 'max', public length: number) {
    this[fieldName] = length;
  }
}
