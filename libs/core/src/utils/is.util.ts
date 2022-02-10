export class Is {
  static notNullOrUndefined<T>(value: T) {
    return value !== null && value !== undefined
  }
  static nullOrUndefined<T>(value: T) {
    return value === null || value === undefined
  }
}