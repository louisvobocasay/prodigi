export class NumberUtil {
  static format(value: number, length = 2) {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: length,
      maximumFractionDigits: length,
    });
  }

  static toString(value: number | string, length = 2) {
    let toString = String(value);
    const indexOfDot = toString.indexOf('.');
    if (indexOfDot > 0) {
      toString =
        toString.substring(0, indexOfDot) +
        (toString + '00').substring(indexOfDot, indexOfDot + length + 1);
    } else {
      toString += '.00';
    }
    return toString;
  }
  static toFixed(value: number | string, length = 2) {
    return +this.toString(value, length);
  }
}
