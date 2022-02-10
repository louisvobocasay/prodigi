export class CoreFilterConditions<T = Record<string, unknown>> {
  /**
   *
   */
  constructor(
    public readonly condition: T,
    public readonly index: number,
    public readonly pageSize: number,
    public readonly sort: [string, 'ASC' | 'DESC'] = ['updated_at', 'DESC'],
  ) {}
}
